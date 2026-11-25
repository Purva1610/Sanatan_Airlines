import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';
import { config } from '../src/config.js';

const { database, ...connectionOptions } = config.database;
const sqlDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../sql');

let connection;
try {
  connection = await mysql.createConnection({ ...connectionOptions, multipleStatements: true });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await connection.query(`USE \`${database}\``);
  await connection.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version VARCHAR(100) NOT NULL,
      applied_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      PRIMARY KEY (version)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const [rows] = await connection.query('SELECT version FROM schema_migrations');
  const applied = new Set(rows.map((row) => row.version));
  const files = (await readdir(sqlDirectory)).filter((file) => file.endsWith('.sql')).sort();

  let count = 0;
  for (const file of files) {
    if (applied.has(file)) {
      console.log(`[migrate] skip ${file}`);
      continue;
    }
    const sql = await readFile(join(sqlDirectory, file), 'utf8');
    await connection.query(sql);
    await connection.execute('INSERT INTO schema_migrations (version) VALUES (?)', [file]);
    console.log(`[migrate] applied ${file}`);
    count += 1;
  }
  console.log(count === 0 ? '[migrate] database is up to date.' : `[migrate] applied ${count} migration(s).`);
} catch (error) {
  console.error(`[migrate] failed: ${error?.code || error?.message || 'unknown error'}`);
  process.exitCode = 1;
} finally {
  await connection?.end().catch(() => {});
}
