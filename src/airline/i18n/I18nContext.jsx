'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { LANGUAGES, DEFAULT_LANG, SCRIPT_FONTS } from './languages.js';
import BASE_TRANSLATIONS, { enquiryPatch } from './translations.js';
import { legalPatch } from './legalTranslations.js';

// Merge all patches into base translations at module level
const TRANSLATIONS = {};
const ALL_LANGS = new Set([
  ...Object.keys(BASE_TRANSLATIONS),
  ...Object.keys(enquiryPatch),
  ...Object.keys(legalPatch),
]);
for (const lang of ALL_LANGS) {
  TRANSLATIONS[lang] = {
    ...(BASE_TRANSLATIONS[lang] || {}),
    ...(enquiryPatch[lang] || {}),
    ...(legalPatch[lang] || {}),
  };
}

function resolve(lang, key) {
  const dict = TRANSLATIONS[lang];
  if (dict && dict[key] !== undefined) return dict[key];
  const en = TRANSLATIONS['en'];
  if (en && en[key] !== undefined) return en[key];
  return key;
}

const I18nContext = createContext(null);

export function I18nProvider({ children, initialLang }) {
  const [lang, setLangState] = useState(initialLang || DEFAULT_LANG);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sa_lang');
      if (stored && LANGUAGES.find((l) => l.code === stored)) {
        setLangState(stored);
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    const meta = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
    const html = document.documentElement;
    html.lang = lang;
    html.dir = meta.dir;
    html.style.setProperty('--al-body-font', SCRIPT_FONTS[meta.script] || SCRIPT_FONTS.latin);
    if (meta.script === 'arabic') {
      html.classList.add('lang-rtl');
    } else {
      html.classList.remove('lang-rtl');
    }
  }, [lang]);

  function setLang(code) {
    if (!LANGUAGES.find((l) => l.code === code)) return;
    setLangState(code);
    try { localStorage.setItem('sa_lang', code); } catch (_) {}
  }

  function t(key) { return resolve(lang, key); }

  const currentLangMeta = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <I18nContext.Provider value={{ lang, setLang, t, currentLangMeta, languages: LANGUAGES }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
