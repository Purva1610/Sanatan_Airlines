/**
 * Sanatan Airlines — Supported Languages
 * dir: 'ltr' | 'rtl'
 * script: used to load the right font family
 */
export const LANGUAGES = [
  { code: 'en', label: 'English',      nativeLabel: 'English',       dir: 'ltr', script: 'latin'      },
  { code: 'hi', label: 'Hindi',        nativeLabel: 'हिन्दी',         dir: 'ltr', script: 'devanagari' },
  { code: 'bn', label: 'Bengali',      nativeLabel: 'বাংলা',          dir: 'ltr', script: 'bengali'    },
  { code: 'te', label: 'Telugu',       nativeLabel: 'తెలుగు',         dir: 'ltr', script: 'telugu'     },
  { code: 'mr', label: 'Marathi',      nativeLabel: 'मराठी',          dir: 'ltr', script: 'devanagari' },
  { code: 'ta', label: 'Tamil',        nativeLabel: 'தமிழ்',          dir: 'ltr', script: 'tamil'      },
  { code: 'gu', label: 'Gujarati',     nativeLabel: 'ગુજરાતી',        dir: 'ltr', script: 'gujarati'   },
  { code: 'kn', label: 'Kannada',      nativeLabel: 'ಕನ್ನಡ',          dir: 'ltr', script: 'kannada'    },
  { code: 'ml', label: 'Malayalam',    nativeLabel: 'മലയാളം',         dir: 'ltr', script: 'malayalam'  },
  { code: 'pa', label: 'Punjabi',      nativeLabel: 'ਪੰਜਾਬੀ',         dir: 'ltr', script: 'gurmukhi'   },
  { code: 'or', label: 'Odia',         nativeLabel: 'ଓଡ଼ିଆ',           dir: 'ltr', script: 'odia'       },
  { code: 'as', label: 'Assamese',     nativeLabel: 'অসমীয়া',         dir: 'ltr', script: 'bengali'    },
  { code: 'ur', label: 'Urdu',         nativeLabel: 'اردو',            dir: 'rtl', script: 'arabic'     },
  { code: 'sa', label: 'Sanskrit',     nativeLabel: 'संस्कृतम्',       dir: 'ltr', script: 'devanagari' },
];

export const DEFAULT_LANG = 'en';

/** Font families per script — loaded via Google Fonts in the layout */
export const SCRIPT_FONTS = {
  latin:      "'Manrope', 'DM Sans', sans-serif",
  devanagari: "'Noto Sans Devanagari', 'Hind', sans-serif",
  bengali:    "'Noto Sans Bengali', sans-serif",
  telugu:     "'Noto Sans Telugu', sans-serif",
  tamil:      "'Noto Sans Tamil', sans-serif",
  gujarati:   "'Noto Sans Gujarati', sans-serif",
  kannada:    "'Noto Sans Kannada', sans-serif",
  malayalam:  "'Noto Sans Malayalam', sans-serif",
  gurmukhi:   "'Noto Sans Gurmukhi', sans-serif",
  odia:       "'Noto Sans Oriya', sans-serif",
  arabic:     "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif",
};
