import { createHash, createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import net from 'node:net';
import { config } from './config.js';

export function hashIp(ip) {
  if (!ip) return null;
  return createHmac('sha256', config.ipHashSecret).update(ip).digest('hex');
}

export function safeTokenEqual(provided, expected) {
  if (!provided || !expected) return false;
  const a = createHash('sha256').update(provided).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}

export function sanitizeUserAgent(value) {
  return String(value || '').replace(/[\r\n]/g, ' ').slice(0, 512) || null;
}

const emailHits = new Map();

export function isEmailRateLimited(email) {
  if (!email) return false;
  const now = Date.now();
  const { emailWindowMs, emailMax } = config.rateLimits;
  const recent = (emailHits.get(email) || []).filter((time) => now - time < emailWindowMs);
  if (recent.length >= emailMax) {
    emailHits.set(email, recent);
    return true;
  }
  recent.push(now);
  emailHits.set(email, recent);
  if (emailHits.size > 1000) {
    for (const [key, times] of emailHits) {
      if (!times.some((time) => now - time < emailWindowMs)) emailHits.delete(key);
    }
  }
  return false;
}

const CV_TYPES = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

const DOC_SIGNATURE = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);

export function validateCvFile(file) {
  const originalName = basename(String(file.originalname || '')).slice(0, 255);
  const extension = extname(originalName).toLowerCase();
  const mimeType = CV_TYPES[extension];
  if (!mimeType) return { ok: false, reason: 'unsupported_type' };

  const declared = String(file.mimetype || '').toLowerCase();
  if (declared && declared !== mimeType && declared !== 'application/octet-stream') {
    return { ok: false, reason: 'unsupported_type' };
  }

  const buffer = file.buffer;
  if (!buffer || buffer.length === 0) return { ok: false, reason: 'empty_file' };

  const matches = extension === '.pdf'
    ? buffer.subarray(0, 5).toString('latin1') === '%PDF-'
    : extension === '.doc'
      ? buffer.subarray(0, 8).equals(DOC_SIGNATURE)
      : buffer.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04]));

  if (!matches) return { ok: false, reason: 'content_mismatch' };

  return {
    ok: true,
    originalName,
    extension,
    mimeType,
    sha256: createHash('sha256').update(buffer).digest('hex'),
  };
}

export function scanWithClamav(buffer) {
  return new Promise((resolve, reject) => {
    const { host, port } = config.clamav;
    const socket = net.createConnection({ host, port });
    let response = '';
    let settled = false;

    const finish = (error, result) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      socket.destroy();
      if (error) reject(error);
      else resolve(result);
    };

    const timeout = setTimeout(() => finish(new Error('clamav_timeout')), 15000);

    socket.on('connect', () => {
      socket.write('zINSTREAM\0');
      const chunkSize = 64 * 1024;
      for (let offset = 0; offset < buffer.length; offset += chunkSize) {
        const chunk = buffer.subarray(offset, offset + chunkSize);
        const header = Buffer.alloc(4);
        header.writeUInt32BE(chunk.length, 0);
        socket.write(header);
        socket.write(chunk);
      }
      socket.write(Buffer.alloc(4));
    });

    socket.on('data', (data) => {
      response += data.toString('utf8');
      if (/FOUND\0?$/.test(response) || /OK\0?$/.test(response)) {
        const signature = response.match(/stream: (.+?) FOUND/)?.[1] || null;
        finish(null, { infected: /FOUND/.test(response), signature });
      }
    });

    socket.on('error', (error) => finish(error));
    socket.on('close', () => {
      if (settled) return;
      if (/FOUND/.test(response)) {
        const signature = response.match(/stream: (.+?) FOUND/)?.[1] || null;
        finish(null, { infected: true, signature });
      } else if (/OK/.test(response)) {
        finish(null, { infected: false, signature: null });
      } else {
        finish(new Error('clamav_unexpected_response'));
      }
    });
  });
}

export async function persistCv(buffer, extension) {
  await mkdir(config.uploadsDir, { recursive: true, mode: 0o700 });
  const storedName = `${Date.now()}-${randomUUID()}${extension}`;
  await writeFile(join(config.uploadsDir, storedName), buffer, { mode: 0o600 });
  return storedName;
}

export async function removeStoredCv(storedName) {
  if (!storedName) return;
  const { rm } = await import('node:fs/promises');
  await rm(join(config.uploadsDir, storedName), { force: true }).catch(() => {});
}
