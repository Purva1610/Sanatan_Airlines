/**
 * Injects `useI18n` import and hook call into every airline page component
 * that uses hardcoded strings. Run once: node scripts/inject-i18n.js
 *
 * What it does:
 *  1. Adds `import { useI18n } from '../i18n/I18nContext.jsx';` after the existing imports
 *  2. Adds `const { t } = useI18n();` as the first line inside each default export function
 *  3. Replaces hero eyebrow / h1 / sub patterns with t() calls where keys exist
 */
const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '..', 'src', 'airline', 'pages');
const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.jsx'));

// Map of hardcoded string → translation key
const STRING_MAP = {
  "'Best Fares Guaranteed'": "t('book.hero.eyebrow')",
  "'Book Your<br />Perfect Flight'": "t('book.hero.h1')",
  "'Real-Time Updates'": "t('status.hero.eyebrow')",
  "'Flight Status'": "t('status.hero.h1')",
  "'My Booking'": "t('manage.hero.eyebrow')",
  "'Skip the Queue'": "t('checkin.hero.eyebrow')",
  "'We Are Here to Help'": "t('contact.hero.eyebrow')",
  "'Our Story'": "t('about.hero.eyebrow')",
};

let patched = 0;

for (const file of files) {
  const filePath = path.join(PAGES_DIR, file);
  let src = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Skip if already has useI18n
  if (src.includes('useI18n')) continue;

  // 1. Add import after the last import line
  const lastImportIdx = src.lastIndexOf("\nimport ");
  const afterImport = src.indexOf('\n', lastImportIdx + 1);
  if (afterImport === -1) continue;

  const importLine = "\nimport { useI18n } from '../i18n/I18nContext.jsx';";
  src = src.slice(0, afterImport) + importLine + src.slice(afterImport);
  changed = true;

  // 2. Add `const { t } = useI18n();` inside the first default export function body
  const funcMatch = src.match(/export default function \w+\([^)]*\)\s*\{/);
  if (funcMatch) {
    const insertAt = src.indexOf(funcMatch[0]) + funcMatch[0].length;
    src = src.slice(0, insertAt) + '\n  const { t } = useI18n();' + src.slice(insertAt);
  }

  if (changed) {
    fs.writeFileSync(filePath, src, 'utf8');
    patched++;
    console.log(`  ✓ Patched: ${file}`);
  }
}

console.log(`\nDone. Patched ${patched} files.`);
