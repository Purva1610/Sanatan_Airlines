/*
 * Performance split (brief §12.1): src/pages-premium.css (373 KB) loaded on every page,
 * but almost all of it styles the /airline/* pages only. This moves every rule that can
 * never match a live (non-airline) page into src/airline/airline-premium.css, imported only
 * by app/airline/layout.tsx.
 *
 * A selector "can never match a live page" when it requires a class that never appears in
 * live code. Live classes are collected generously (over-inclusion is safe — it only keeps
 * more CSS shared):
 *   - every word inside every string literal of every source file EXCEPT the airline-only
 *     page components (src/airline/pages, AirlineLayout, AirlineFooter);
 *   - optionally, class attributes from rendered live pages (pass a server URL).
 * `data-skin="airline…"` selectors are airline-only by definition. @keyframes always stay.
 *
 * Usage: node scripts/split-airline-css.mjs [http://127.0.0.1:3124]   (idempotent)
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const postcss = require('../node_modules/next/node_modules/postcss');

const SOURCE = 'src/pages-premium.css';
const TARGET = 'src/airline/airline-premium.css';
const AIRLINE_ONLY_CODE = [path.join('src', 'airline', 'pages'), path.join('src', 'airline', 'AirlineLayout.jsx'), path.join('src', 'airline', 'AirlineFooter.jsx')];

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
const live = new Set();
for (const file of [...walk('src'), ...walk('app')].filter((f) => /\.(jsx?|tsx?)$/.test(f))) {
  if (AIRLINE_ONLY_CODE.some((p) => file.startsWith(p))) continue;
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/(["'`])((?:\\.|(?!\1).)*)\1/gs)) m[2].split(/[^A-Za-z0-9_-]+/).forEach((w) => w && live.add(w));
}
const server = process.argv[2];
if (server) {
  const sitemap = await (await fetch(`${server}/sitemap.xml`)).text();
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname).concat(['/enquire', '/careers', '/partners', '/insights', '/leadership', '/partners/enquiry', '/404-check']);
  for (const p of paths) {
    const html = await (await fetch(server + p)).text();
    for (const m of html.matchAll(/class="([^"]*)"/g)) m[1].split(/\s+/).forEach((c) => c && live.add(c));
  }
}

const neverLive = (selector) => {
  if (selector.includes('data-skin="airline')) return true;
  const classes = [...selector.matchAll(/\.([A-Za-z_-][\w-]*)/g)].map((m) => m[1]);
  return classes.some((c) => !live.has(c));
};
const airlineOnly = (rule) => rule.selectors?.length && rule.selectors.every(neverLive);

const root = postcss.parse(fs.readFileSync(SOURCE, 'utf8'));
const out = postcss.root();
let moved = 0;
root.each((node) => {
  if (node.type === 'rule' && airlineOnly(node)) {
    out.append(node.clone()); node.remove(); moved++;
  } else if (node.type === 'atrule' && ['media', 'supports', 'container', 'scope', 'layer'].includes(node.name) && node.nodes) {
    const clone = node.clone({ nodes: [] });
    node.each((child) => { if (child.type === 'rule' && airlineOnly(child)) { clone.append(child.clone()); child.remove(); moved++; } });
    if (clone.nodes.length) out.append(clone);
    if (!node.nodes.length) node.remove();
  }
});

const header = '/* Airline-only page-skin rules, split from src/pages-premium.css by scripts/split-airline-css.mjs.\n   Imported only by app/airline/layout.tsx so other pages do not download or match them. */\n';
const existing = fs.existsSync(TARGET) ? fs.readFileSync(TARGET, 'utf8') : header;
fs.writeFileSync(TARGET, existing + (moved ? `\n${out.toString()}\n` : ''));
fs.writeFileSync(SOURCE, root.toString());
const kb = (f) => Math.round(fs.statSync(f).size / 1024);
console.log(`live classes: ${live.size}; moved ${moved} rules — ${SOURCE}: ${kb(SOURCE)} KB, ${TARGET}: ${kb(TARGET)} KB`);
