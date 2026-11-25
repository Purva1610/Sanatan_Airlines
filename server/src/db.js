import mysql from 'mysql2/promise';
import { randomInt } from 'node:crypto';
import { config } from './config.js';

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      ...config.database,
      waitForConnections: true,
      queueLimit: 0,
      charset: 'utf8mb4',
      timezone: 'Z',
      dateStrings: true,
    });
    pool.on('connection', (connection) => {
      connection.query("SET time_zone = '+00:00'");
    });
  }
  return pool;
}

export async function verifyConnection() {
  const [rows] = await getPool().query('SELECT 1 AS ok');
  return rows[0]?.ok === 1;
}

export async function closePool() {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}

const REFERENCE_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

function createReference(now = new Date()) {
  const date = now.toISOString().slice(2, 10).replaceAll('-', '');
  let suffix = '';
  for (let index = 0; index < 6; index += 1) {
    suffix += REFERENCE_ALPHABET[randomInt(REFERENCE_ALPHABET.length)];
  }
  return `SAN-${date}-${suffix}`;
}

function toMysqlDate(value, fallback = new Date()) {
  const date = value ? new Date(value) : fallback;
  if (Number.isNaN(date.getTime())) return toMysqlDate(null, fallback);
  return date.toISOString().replace('T', ' ').replace('Z', '');
}

function parseJson(value) {
  if (value === null || value === undefined) return null;
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function mapLead(row, { includePayload = false } = {}) {
  if (!row) return null;
  const lead = {
    id: Number(row.id),
    reference: row.reference,
    schemaVersion: row.schema_version,
    formType: row.form_type,
    team: row.team,
    status: row.status,
    name: row.name,
    email: row.email,
    phone: row.phone,
    serviceCategory: row.service_category,
    sourcePath: row.source_path,
    referrerOrigin: row.referrer_origin,
    campaign: parseJson(row.campaign),
    consentAt: row.consent_at,
    submittedAt: row.submitted_at,
    receivedAt: row.received_at,
    updatedAt: row.updated_at,
    adminNotes: row.admin_notes,
  };
  if (includePayload) lead.payload = parseJson(row.payload);
  return lead;
}

function isDuplicateEntry(error) {
  return error?.code === 'ER_DUP_ENTRY';
}

export async function createLead(lead, attachment) {
  const connection = await getPool().getConnection();
  try {
    let insertId;
    let reference;
    let lastError;
    for (let attempt = 0; attempt < 4; attempt += 1) {
      reference = createReference();
      try {
        await connection.beginTransaction();
        const [result] = await connection.execute(
          `INSERT INTO leads
            (reference, schema_version, form_type, team, status, name, email, phone, service_category,
             source_path, referrer_origin, campaign, payload, consent_at, submitted_at, ip_hash, user_agent)
           VALUES (?, ?, ?, ?, 'new', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            reference,
            lead.schemaVersion,
            lead.formType,
            lead.team,
            lead.name,
            lead.email,
            lead.phone,
            lead.serviceCategory,
            lead.sourcePath,
            lead.referrerOrigin || null,
            lead.campaign && Object.keys(lead.campaign).length > 0 ? JSON.stringify(lead.campaign) : null,
            JSON.stringify(lead.rawPayload),
            toMysqlDate(lead.consentAt),
            toMysqlDate(lead.submittedAt),
            lead.ipHash,
            lead.userAgent || null,
          ],
        );
        insertId = result.insertId;
        if (attachment) {
          await connection.execute(
            `INSERT INTO lead_attachments (lead_id, original_name, stored_name, mime_type, byte_size, sha256, scan_status)
             VALUES (?, ?, ?, ?, ?, ?, 'clean')`,
            [insertId, attachment.originalName, attachment.storedName, attachment.mimeType, attachment.byteSize, attachment.sha256],
          );
        }
        await connection.commit();
        return { id: Number(insertId), reference };
      } catch (error) {
        await connection.rollback();
        lastError = error;
        if (!isDuplicateEntry(error)) throw error;
      }
    }
    throw lastError;
  } finally {
    connection.release();
  }
}

const LEAD_COLUMNS = `id, reference, schema_version, form_type, team, status, name, email, phone,
  service_category, source_path, referrer_origin, campaign, consent_at, submitted_at, received_at,
  updated_at, admin_notes`;

function escapeLike(value) {
  return value.replace(/[\\%_]/g, '\\$&');
}

export async function listLeads({ status, team, formType, query, page, limit }) {
  const where = [];
  const params = [];
  if (status) {
    where.push('status = ?');
    params.push(status);
  }
  if (team) {
    where.push('team = ?');
    params.push(team);
  }
  if (formType) {
    where.push('form_type = ?');
    params.push(formType);
  }
  if (query) {
    const like = `%${escapeLike(query)}%`;
    where.push('(reference LIKE ? OR name LIKE ? OR email LIKE ? OR phone LIKE ? OR service_category LIKE ?)');
    params.push(like, like, like, like, like);
  }
  const condition = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';
  const offset = (page - 1) * limit;

  const [[countRow]] = await getPool().query(`SELECT COUNT(*) AS total FROM leads ${condition}`, params);
  const [rows] = await getPool().query(
    `SELECT ${LEAD_COLUMNS} FROM leads ${condition} ORDER BY received_at DESC, id DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset],
  );

  const total = Number(countRow.total);
  return {
    leads: rows.map((row) => mapLead(row)),
    pagination: { page, limit, total, pages: Math.max(1, Math.ceil(total / limit)) },
  };
}

export async function getLead(id) {
  const [rows] = await getPool().query(`SELECT ${LEAD_COLUMNS}, payload FROM leads WHERE id = ? LIMIT 1`, [id]);
  if (rows.length === 0) return null;
  const [attachments] = await getPool().query(
    `SELECT id, original_name, stored_name, mime_type, byte_size, sha256, scan_status, created_at
     FROM lead_attachments WHERE lead_id = ? ORDER BY id ASC`,
    [id],
  );
  return {
    ...mapLead(rows[0], { includePayload: true }),
    attachments: attachments.map((row) => ({
      id: Number(row.id),
      originalName: row.original_name,
      storedName: row.stored_name,
      mimeType: row.mime_type,
      byteSize: Number(row.byte_size),
      sha256: row.sha256,
      scanStatus: row.scan_status,
      createdAt: row.created_at,
    })),
  };
}

export async function updateLead(id, { status, adminNotes }) {
  const assignments = [];
  const params = [];
  if (status !== undefined) {
    assignments.push('status = ?');
    params.push(status);
  }
  if (adminNotes !== undefined) {
    assignments.push('admin_notes = ?');
    params.push(adminNotes);
  }
  if (assignments.length === 0) return false;
  params.push(id);
  const [result] = await getPool().execute(`UPDATE leads SET ${assignments.join(', ')} WHERE id = ?`, params);
  return result.affectedRows > 0;
}
