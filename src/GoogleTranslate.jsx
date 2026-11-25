'use client';

/*
 * Site-wide machine translation via the Google Translate website element.
 *
 * - The visitor picks a language; we store Google's own `googtrans` cookie (/en/<code>) and
 *   reload, and Google translates every page from then on. Picking English clears it.
 * - Google's script is loaded ONLY when a non-English language is active, so English visitors
 *   send nothing to Google and download nothing extra.
 * - Google rewrites text nodes, which can crash React when it later updates those nodes; the
 *   small DOM patch below is the standard workaround and is installed only while translating.
 * - Machine translation is not authoritative: legal, membership and plan terms prevail in English
 *   (brief: translate legal / plan terms professionally).
 */

import { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';

export const TRANSLATE_LANGUAGES = [
  ['en', 'English'],
  ['hi', 'हिन्दी (Hindi)'],
  ['mr', 'मराठी (Marathi)'],
  ['gu', 'ગુજરાતી (Gujarati)'],
  ['bn', 'বাংলা (Bengali)'],
  ['ta', 'தமிழ் (Tamil)'],
  ['te', 'తెలుగు (Telugu)'],
  ['kn', 'ಕನ್ನಡ (Kannada)'],
  ['ml', 'മലയാളം (Malayalam)'],
  ['pa', 'ਪੰਜਾਬੀ (Punjabi)'],
  ['or', 'ଓଡ଼ିଆ (Odia)'],
  ['ur', 'اردو (Urdu)'],
  ['ne', 'नेपाली (Nepali)'],
  ['ar', 'العربية (Arabic)'],
  ['fr', 'Français (French)'],
  ['de', 'Deutsch (German)'],
  ['es', 'Español (Spanish)'],
];
const CODES = TRANSLATE_LANGUAGES.map(([code]) => code);

function readLanguage() {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/;]*\/([^;]+)/);
  const code = match ? decodeURIComponent(match[1]) : 'en';
  return CODES.includes(code) ? code : 'en';
}

function writeLanguage(code) {
  const host = window.location.hostname;
  const domains = [''];
  if (host.includes('.')) domains.push(`; domain=.${host.replace(/^www\./, '')}`, `; domain=${host}`);
  domains.forEach((domain) => {
    document.cookie = code === 'en'
      ? `googtrans=; path=/; max-age=0${domain}`
      : `googtrans=/en/${code}; path=/; max-age=31536000; SameSite=Lax${domain}`;
  });
}

function patchDomForTranslation() {
  if (window.__sanatanTranslatePatch) return;
  window.__sanatanTranslatePatch = true;
  const { removeChild, insertBefore } = Node.prototype;
  Node.prototype.removeChild = function patchedRemoveChild(child) {
    if (child.parentNode !== this) return child;
    return removeChild.apply(this, arguments);
  };
  Node.prototype.insertBefore = function patchedInsertBefore(node, reference) {
    if (reference && reference.parentNode !== this) return node;
    return insertBefore.apply(this, arguments);
  };
}

function loadGoogleTranslate() {
  if (window.__sanatanTranslateLoading) return;
  window.__sanatanTranslateLoading = true;
  if (!document.getElementById('google_translate_element')) {
    const holder = document.createElement('div');
    holder.id = 'google_translate_element';
    holder.setAttribute('aria-hidden', 'true');
    document.body.appendChild(holder);
  }
  window.googleTranslateElementInit = () => {
    // eslint-disable-next-line no-new
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: CODES.filter((c) => c !== 'en').join(','), autoDisplay: false },
      'google_translate_element',
    );
  };
  const script = document.createElement('script');
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);
}

export default function GoogleTranslate({ variant = 'bar' }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const current = readLanguage();
    setLanguage(current);
    if (current !== 'en') {
      patchDomForTranslation();
      loadGoogleTranslate();
    }
  }, []);

  const change = (code) => {
    if (code === language) return;
    writeLanguage(code);
    window.location.reload();
  };

  const id = `sa-translate-${variant}`;
  return (
    <div className={`sa-translate sa-translate-${variant} notranslate`} translate="no">
      <label htmlFor={id} className="sa-translate-label">
        <Languages size={14} aria-hidden="true" />
        <span className="sr-only">Translate this website</span>
      </label>
      <select id={id} value={language} onChange={(event) => change(event.target.value)} title="Translate this website (Google Translate)">
        {TRANSLATE_LANGUAGES.map(([code, label]) => <option key={code} value={code}>{label}</option>)}
      </select>
      {language !== 'en' && (
        <button type="button" className="sa-translate-reset" onClick={() => change('en')} title="Machine translation by Google. Legal and membership terms are authoritative in English.">
          Auto-translated · View in English
        </button>
      )}
    </div>
  );
}
