/**
 * Replace emoji characters in JSX files with Lucide React icon components.
 * Run: node scripts/replace-emojis.cjs
 */
const fs = require('fs');
const path = require('path');

// Emoji → Lucide component name mapping
const EMOJI_TO_ICON = {
  '👑': 'Crown',
  '💼': 'Briefcase',
  '⭐': 'Star',
  '✈️': 'Plane',
  '✈': 'Plane',
  '🧳': 'Luggage',
  '♿': 'Accessibility',
  '📦': 'Package',
  'ℹ️': 'Info',
  'ℹ': 'Info',
  '🏆': 'Trophy',
  '🎯': 'Target',
  '🌟': 'Sparkles',
  '👤': 'User',
  '🌿': 'Leaf',
  '🛡': 'Shield',
  '🛡️': 'Shield',
  '🌐': 'Globe',
  '🚀': 'Rocket',
  '💡': 'Lightbulb',
  '🎨': 'Palette',
  '🔒': 'Lock',
  '📱': 'Smartphone',
  '💳': 'CreditCard',
  '🎁': 'Gift',
  '🏦': 'Landmark',
  '🚗': 'Car',
  '🌱': 'Sprout',
  '📄': 'FileText',
  '🍪': 'Cookie',
  '⚠️': 'AlertTriangle',
  '⚠': 'AlertTriangle',
  '💬': 'MessageCircle',
  '☰': 'Menu',
  '☎': 'Phone',
  '☎️': 'Phone',
  '📞': 'Phone',
  '📧': 'Mail',
  '✅': 'CheckCircle',
  '❌': 'XCircle',
  '🔥': 'Flame',
  '💰': 'DollarSign',
  '🎵': 'Music',
  '🎸': 'Music2',
  '⚽': 'CircleDot',
  '🏊': 'Waves',
  '🎿': 'Mountain',
  '🚴': 'Bike',
  '🐾': 'PawPrint',
  '🐕': 'Dog',
  '🐈': 'Cat',
  '🌍': 'Globe2',
  '🗺️': 'Map',
  '🗺': 'Map',
  '🏖️': 'UmbrellaOff',
  '🏔': 'Mountain',
  '🏔️': 'Mountain',
  '🏙': 'Building2',
  '🏙️': 'Building2',
  '🌆': 'Sunset',
  '📊': 'BarChart2',
  '📋': 'ClipboardList',
  '📺': 'Tv',
  '🎬': 'Film',
  '🍽️': 'UtensilsCrossed',
  '🍽': 'UtensilsCrossed',
  '🛄': 'BaggageClaim',
  '💺': 'Armchair',
  '🔌': 'Plug',
  '🧑‍💼': 'UserCheck',
  '👥': 'Users',
  '🏖': 'Umbrella',
  '🏖️': 'Umbrella',
  '📚': 'BookOpen',
};

// Files to process
const BASE = path.join(__dirname, '..', 'src', 'airline');
const DIRS = [
  path.join(BASE, 'pages'),
  BASE,
  path.join(BASE, 'legalPages'),
  path.join(__dirname, '..', 'app', 'airline', 'enquiry'),
];

const LUCIDE_IMPORT_MARKER = "from 'lucide-react'";

function getUsedIcons(src) {
  const used = new Set();
  for (const [emoji, icon] of Object.entries(EMOJI_TO_ICON)) {
    if (src.includes(emoji)) used.add(icon);
  }
  return used;
}

function replaceEmojis(src) {
  let out = src;
  // Sort by length descending to avoid partial replacement (e.g. ✈️ before ✈)
  const sorted = Object.entries(EMOJI_TO_ICON).sort((a, b) => b[0].length - a[0].length);
  for (const [emoji, icon] of sorted) {
    // Replace emoji used as JSX string in icon prop: { icon: '🏆', ... }
    // Replace inline emoji in JSX text nodes: >🏆<  or  {'🏆'}
    // Replace as standalone string in arrays: ['🏆', ...]
    // We replace them all with a <Icon /> component
    const escaped = [...emoji].map(c => {
      const cp = c.codePointAt(0).toString(16).toUpperCase().padStart(4,'0');
      return `\\u${cp.length <= 4 ? cp : `{${c.codePointAt(0).toString(16)}}`}`;
    }).join('');

    // Pattern 1: in icon object property { icon: '🏆' }  -> { icon: <Trophy size={20}/> }
    out = out.split(`'${emoji}'`).join(`<${icon} size={20}/>`);
    out = out.split(`"${emoji}"`).join(`<${icon} size={20}/>`);

    // Pattern 2: standalone in JSX  {' 🏆 '} or {'🏆'} or just the char in JSX
    out = out.split(`{'${emoji}'}`).join(`<${icon} size={20}/>`);
    out = out.split(`{"${emoji}"}`).join(`<${icon} size={20}/>`);

    // Pattern 3: raw in JSX text between tags  >🏆<
    // Replace remaining occurrences of the emoji character with the icon component
    out = out.split(emoji).join(`<${icon} size={20}/>`);
  }
  return out;
}

function ensureLucideImport(src, icons) {
  if (icons.size === 0) return src;

  // Find existing lucide-react import line
  const importRegex = /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/;
  const match = src.match(importRegex);

  if (match) {
    // Add missing icons to existing import
    const existing = new Set(match[1].split(',').map(s => s.trim()).filter(Boolean));
    for (const icon of icons) existing.add(icon);
    const sorted = [...existing].sort().join(', ');
    return src.replace(importRegex, `import { ${sorted} } from 'lucide-react'`);
  } else {
    // Add new import after 'use client' or at top
    const sorted = [...icons].sort().join(', ');
    const importLine = `import { ${sorted} } from 'lucide-react';\n`;
    if (src.startsWith("'use client'")) {
      return src.replace("'use client';\n", `'use client';\n${importLine}`);
    }
    return importLine + src;
  }
}

let totalPatched = 0;

for (const dir of DIRS) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') || f.endsWith('.tsx'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    const src = fs.readFileSync(filePath, 'utf8');

    const usedIcons = getUsedIcons(src);
    if (usedIcons.size === 0) continue;

    let out = replaceEmojis(src);
    out = ensureLucideImport(out, usedIcons);

    if (out !== src) {
      fs.writeFileSync(filePath, out, 'utf8');
      console.log(`  ✓ ${file}  (replaced: ${[...usedIcons].join(', ')})`);
      totalPatched++;
    }
  }
}

console.log(`\nDone. Patched ${totalPatched} files.`);
