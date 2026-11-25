'use client';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useI18n } from './i18n/I18nContext.jsx';

export default function LanguageSwitcher({ compact = false }) {
  const { lang, setLang, t, languages } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    function onOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        // WCAG 2.5.3 label-in-name: the accessible name must include the visible language name.
        aria-label={`${t('nav.language') || 'Language'}: ${current?.nativeLabel || current?.label || ''}`}
        aria-expanded={open}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: open ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: 6,
          color: '#fff',
          cursor: 'pointer',
          fontSize: compact ? 12 : 13,
          fontWeight: 600,
          padding: compact ? '4px 10px' : '6px 12px',
          transition: 'background 0.15s',
          whiteSpace: 'nowrap',
        }}
      >
        <Globe size={compact ? 12 : 14} style={{ opacity: 0.85, flexShrink: 0 }} />
        <span style={{ maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {current.nativeLabel}
        </span>
        {open
          ? <ChevronUp size={10} style={{ opacity: 0.6, flexShrink: 0 }} />
          : <ChevronDown size={10} style={{ opacity: 0.6, flexShrink: 0 }} />}
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          right: 0,
          background: '#fff',
          borderRadius: 10,
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
          minWidth: 210,
          maxHeight: 400,
          overflowY: 'auto',
          zIndex: 700,
          padding: '8px 0',
          border: '1px solid #f1ece1',
        }}>
          <div style={{
            fontSize: 10, fontWeight: 800, letterSpacing: '0.13em',
            textTransform: 'uppercase', color: '#a1a9b5',
            padding: '6px 16px 8px',
            display: 'flex', alignItems: 'center', gap: 6,
            borderBottom: '1px solid #faf9f5',
            marginBottom: 4,
          }}>
            <Globe size={10} /> {t('nav.language') || 'Select Language'}
          </div>
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%',
                background: l.code === lang ? '#faf9f5' : 'none',
                border: 'none', cursor: 'pointer',
                padding: '9px 16px',
                fontSize: 14, fontWeight: l.code === lang ? 700 : 500,
                color: l.code === lang ? '#2134ae' : '#131e63',
                textAlign: l.dir === 'rtl' ? 'right' : 'left',
                direction: l.dir,
                transition: 'background 0.1s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#faf9f5'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = l.code === lang ? '#faf9f5' : 'none'; }}
            >
              <span>{l.nativeLabel}</span>
              {l.code === lang && (
                <Check size={13} style={{ color: '#c0480c', flexShrink: 0 }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
