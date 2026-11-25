import { existsSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { resolve } from 'node:path';

function loadEnvironment() {
  for (const file of ['server/.env', '.env']) {
    if (!existsSync(file)) continue;
    process.loadEnvFile(file);
    return file;
  }
  return null;
}

loadEnvironment();

const isProduction = process.env.NODE_ENV === 'production';

function asInt(value, fallback) {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function asList(value, fallback) {
  const items = String(value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length > 0 ? items : fallback;
}

function readIpHashSecret() {
  const value = (process.env.IP_HASH_SECRET || '').trim();
  if (value.length >= 32) return value;
  if (isProduction) {
    throw new Error('IP_HASH_SECRET must be set to at least 32 characters in production.');
  }
  return randomBytes(32).toString('hex');
}

const database = (process.env.MYSQL_DATABASE || 'sanatan').trim();
if (!/^[A-Za-z0-9_]+$/.test(database)) {
  throw new Error('MYSQL_DATABASE may only contain letters, numbers and underscores.');
}

const devOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
const siteUrl = (process.env.SITE_URL || '').trim().replace(/\/+$/, '');
const defaultOrigins = siteUrl ? [siteUrl] : (isProduction ? [] : devOrigins);
const corsOrigins = asList(process.env.CORS_ORIGINS, defaultOrigins);

export const config = Object.freeze({
  env: process.env.NODE_ENV || 'development',
  isProduction,
  host: process.env.HOST || '127.0.0.1',
  port: asInt(process.env.PORT, 4000),
  trustProxy: process.env.TRUST_PROXY === 'true' ? 1 : Number.parseInt(process.env.TRUST_PROXY || '0', 10) || false,
  database: {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: asInt(process.env.MYSQL_PORT, 3306),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database,
    connectionLimit: asInt(process.env.MYSQL_CONNECTION_LIMIT, 10),
  },
  corsOrigins,
  adminToken: (process.env.ADMIN_API_TOKEN || '').trim(),
  ipHashSecret: readIpHashSecret(),
  uploadsDir: resolve(process.cwd(), process.env.UPLOAD_DIR || 'server/uploads/cv'),
  maxCvBytes: 5 * 1024 * 1024,
  clamav: {
    host: (process.env.CLAMAV_HOST || '').trim(),
    port: asInt(process.env.CLAMAV_PORT, 3310),
  },
  rateLimits: {
    leadWindowMs: asInt(process.env.LEAD_RATE_LIMIT_WINDOW_MS, 10 * 60 * 1000),
    leadMax: asInt(process.env.LEAD_RATE_LIMIT_MAX, 10),
    emailWindowMs: asInt(process.env.EMAIL_RATE_LIMIT_WINDOW_MS, 60 * 60 * 1000),
    emailMax: asInt(process.env.EMAIL_RATE_LIMIT_MAX, 5),
    adminWindowMs: asInt(process.env.ADMIN_RATE_LIMIT_WINDOW_MS, 60 * 1000),
    adminMax: asInt(process.env.ADMIN_RATE_LIMIT_MAX, 120),
  },
});
