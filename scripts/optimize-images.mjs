/*
 * Image pipeline (brief: "Performance image pipeline — responsive images, WebP/AVIF, optimized hero image").
 *
 * <Image> (next/image) already serves resized AVIF/WebP automatically. CSS background photos
 * (page-skin heroes, decorative panels) bypass that pipeline, so this script pre-builds a
 * WebP copy of every JPEG/PNG under public/images — max 2000px wide, quality 74 — next to the
 * original. CSS and src/PageSkin.jsx reference the .webp; originals stay for next/image.
 *
 * Run after adding or replacing photos:   npm run images:optimize
 * Only regenerates when the source is newer than its .webp.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('public/images');
const MAX_WIDTH = 2000;
const QUALITY = 74;

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) yield full;
  }
}

let built = 0; let skipped = 0; let before = 0; let after = 0;
for await (const source of walk(ROOT)) {
  const target = source.replace(/\.(jpe?g|png)$/i, '.webp');
  const [src, dst] = await Promise.all([fs.stat(source), fs.stat(target).catch(() => null)]);
  if (dst && dst.mtimeMs >= src.mtimeMs) { skipped++; continue; }
  await sharp(source).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: QUALITY, effort: 5 }).toFile(target);
  const out = await fs.stat(target);
  before += src.size; after += out.size; built++;
}
const kb = (n) => `${Math.round(n / 1024)} KB`;
console.log(`webp: ${built} built, ${skipped} up to date${built ? ` — ${kb(before)} → ${kb(after)} (${Math.round((1 - after / before) * 100)}% smaller)` : ''}`);
