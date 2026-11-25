import { config } from './config.js';
import { createApp } from './app.js';
import { closePool, verifyConnection } from './db.js';

const app = createApp();

try {
  await verifyConnection();
} catch (error) {
  console.error(`[backend] MySQL connection failed (${error?.code || error?.message || 'unknown'}).`);
  console.error('[backend] Check MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD and MYSQL_DATABASE, then run npm run db:migrate.');
  process.exit(1);
}

const server = app.listen(config.port, config.host, () => {
  console.log(`[backend] Sanatan lead API listening on http://${config.host}:${config.port}`);
  if (!config.adminToken) console.warn('[backend] ADMIN_API_TOKEN is empty; admin endpoints will return 503.');
  if (!config.clamav.host) console.warn('[backend] CLAMAV_HOST is empty; CV uploads will be rejected until scanning is configured.');
  if (config.isProduction && config.corsOrigins.length === 0) {
    console.warn('[backend] CORS_ORIGINS is empty; browser requests will be rejected in production.');
  }
});

let shuttingDown = false;
async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`[backend] ${signal} received, shutting down.`);
  const force = setTimeout(() => process.exit(1), 10000);
  force.unref();
  server.close(async () => {
    await closePool().catch(() => {});
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
