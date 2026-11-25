'use client';
import { AlertTriangle, CheckCircle, MessageCircle } from 'lucide-react';
import { useState, useId } from 'react';
import { useI18n } from './i18n/I18nContext.jsx';

// ─── Service catalogue ────────────────────────────────────────
const SERVICE_KEYS = [
  'svc.flightBooking',
  'svc.groupTravel',
  'svc.charter',
  'svc.corporate',
  'svc.cargo',
  'svc.specialAssist',
  'svc.petTravel',
  'svc.loyalty',
  'svc.other',
];

// Which extra fields to show per service key
const DYNAMIC_FIELDS = {
  'svc.flightBooking': ['depCity', 'arrCity', 'travelDate', 'returnDate', 'cabin', 'pax'],
  'svc.charter':       ['depCity', 'arrCity', 'travelDate', 'pax', 'aircraftPref'],
  'svc.groupTravel':   ['depCity', 'arrCity', 'travelDate', 'groupSize'],
  'svc.corporate':     ['companyName', 'depCity', 'arrCity', 'annualSpend'],
  'svc.cargo':         ['depCity', 'arrCity', 'cargoWeight', 'cargoType'],
  'svc.petTravel':     ['depCity', 'arrCity', 'travelDate', 'petSpecies', 'petWeight'],
  'svc.specialAssist': ['depCity', 'arrCity', 'travelDate'],
  'svc.loyalty':       [],
  'svc.other':         [],
};

const CABIN_KEYS = ['cabin.economy', 'cabin.premEco', 'cabin.business', 'cabin.first'];

const COUNTRY_CODES = [
  { code: '+91', label: '🇮🇳 +91' },
  { code: '+1',  label: '🇺🇸 +1'  },
  { code: '+44', label: '🇬🇧 +44' },
  { code: '+971',label: '🇦🇪 +971'},
  { code: '+65', label: '🇸🇬 +65' },
  { code: '+61', label: '🇦🇺 +61' },
  { code: '+81', label: '🇯🇵 +81' },
];

function genRef() {
  return 'SA' + Date.now().toString(36).toUpperCase().slice(-6);
}

function validateForm(fields, t) {
  const errors = {};
  if (!fields.name.trim()) errors.name = t('enq.err.name');
  if (!/^\d{10}$/.test(fields.mobile.replace(/\s/g, ''))) errors.mobile = t('enq.err.mobile');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = t('enq.err.email');
  if (!fields.service) errors.service = t('enq.err.service');
  if (fields.details.trim().length < 10) errors.details = t('enq.err.details');
  if (!fields.consent) errors.consent = t('enq.err.consent');
  return errors;
}

function buildWhatsAppMessage(fields, t) {
  const service = t(fields.service);
  const lines = [
    `*Sanatan Airlines Enquiry*`,
    `Service: ${service}`,
    `Name: ${fields.name}`,
    `Mobile: ${fields.countryCode}${fields.mobile}`,
    `Email: ${fields.email}`,
    fields.depCity ? `From: ${fields.depCity}` : null,
    fields.arrCity ? `To: ${fields.arrCity}` : null,
    fields.travelDate ? `Date: ${fields.travelDate}` : null,
    fields.pax ? `Passengers: ${fields.pax}` : null,
    fields.cabin ? `Cabin: ${t(fields.cabin)}` : null,
    fields.groupSize ? `Group size: ${fields.groupSize}` : null,
    fields.companyName ? `Company: ${fields.companyName}` : null,
    fields.cargoWeight ? `Cargo weight: ${fields.cargoWeight} kg` : null,
    fields.cargoType ? `Cargo type: ${fields.cargoType}` : null,
    fields.petSpecies ? `Pet: ${fields.petSpecies}` : null,
    `Details: ${fields.details}`,
  ].filter(Boolean);
  return encodeURIComponent(lines.join('\n'));
}

// ─── Main enquiry form ────────────────────────────────────────
/**
 * variant: 'full' | 'sidebar' | 'modal' | 'sticky'
 * defaultService: pre-select a service key (optional)
 * onClose: callback for modal/sticky close button
 */
export function EnquiryForm({ variant = 'full', defaultService = '', onClose }) {
  const { t, lang, currentLangMeta } = useI18n();
  const id = useId();

  const configuredWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || '';
  const WHATSAPP_NUMBER = configuredWhatsApp.length >= 8 && configuredWhatsApp.length <= 15 ? configuredWhatsApp : '';

  const initFields = () => ({
    name: '', mobile: '', email: '', countryCode: '+91',
    service: defaultService, details: '', consent: false,
    // dynamic
    depCity: '', arrCity: '', travelDate: '', returnDate: '',
    cabin: '', pax: '', groupSize: '', aircraftPref: '',
    cargoWeight: '', cargoType: '', petSpecies: '', petWeight: '',
    companyName: '', annualSpend: '',
    // honeypot
    _hp: '',
  });

  const [fields, setFields] = useState(initFields);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [ref, setRef] = useState('');

  const dynamicKeys = DYNAMIC_FIELDS[fields.service] || [];
  const isRTL = currentLangMeta?.dir === 'rtl';

  function set(key, value) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Honeypot check
    if (fields._hp) return;
    const errs = validateForm(fields, t);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('submitting');
    try {
      const payload = {
        ...fields,
        _hp: undefined,
        lang,
        ref: genRef(),
        submittedAt: new Date().toISOString(),
      };
      // POST to our API route
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('server');
      const data = await res.json();
      setRef(data.ref || payload.ref);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  function handleWhatsApp() {
    const msg = buildWhatsAppMessage(fields, t);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener');
  }

  function reset() { setFields(initFields()); setErrors({}); setStatus('idle'); setRef(''); }

  // ── Style helpers ────────────────────────────────────────────
  const isCompact = variant === 'sidebar' || variant === 'sticky';
  const wrapStyle = {
    background: '#fff',
    borderRadius: variant === 'sticky' ? '12px 12px 0 0' : 12,
    padding: isCompact ? '20px' : '36px 40px',
    boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
    border: '1.5px solid #f0ece2',
    direction: isRTL ? 'rtl' : 'ltr',
    fontFamily: 'var(--al-body-font, Manrope, sans-serif)',
    position: 'relative',
  };

  // ── Success state ────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div style={wrapStyle}>
        {onClose && <CloseBtn onClose={onClose} />}
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}><CheckCircle size={20}/></div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#2134ae', marginBottom: 10 }}>
            {t('enq.success.h')}
          </h3>
          <p style={{ color: '#4e545e', lineHeight: 1.7, marginBottom: 8 }}>{t('enq.success.body')}</p>
          {ref && (
            <p style={{ fontSize: 13, fontWeight: 700, color: '#c0480c' }}>
              {t('enq.success.ref')} <span style={{ background: '#fbf8f2', padding: '2px 8px', borderRadius: 4 }}>{ref}</span>
            </p>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
            {WHATSAPP_NUMBER && <button
              onClick={handleWhatsApp}
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
            >
              <span><MessageCircle size={20}/></span> {t('enq.whatsapp')}
            </button>}
            <button onClick={reset} style={{ background: 'none', border: '1.5px solid #f0ece2', borderRadius: 8, padding: '12px 20px', fontWeight: 600, cursor: 'pointer', fontSize: 14, color: '#2134ae' }}>
              {t('ui.back')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────
  return (
    <div style={wrapStyle}>
      {onClose && <CloseBtn onClose={onClose} />}

      {!isCompact && (
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 700, color: '#0e1547', marginBottom: 6 }}>
            {t('enq.heading')}
          </h2>
          <p style={{ fontSize: 14, color: '#4e545e' }}>{t('enq.sub')}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot — hidden from humans */}
        <input
          type="text"
          name="_hp"
          value={fields._hp}
          onChange={(e) => set('_hp', e.target.value)}
          style={{ position: 'absolute', left: -9999, opacity: 0, height: 1 }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div style={{ display: 'grid', gridTemplateColumns: isCompact ? '1fr' : '1fr 1fr', gap: 16 }}>

          {/* Service selection */}
          <Field id={`${id}-svc`} label={t('enq.service')} error={errors.service} style={{ gridColumn: '1/-1' }}>
            <select
              id={`${id}-svc`}
              value={fields.service}
              onChange={(e) => set('service', e.target.value)}
              style={selectStyle(!!errors.service)}
            >
              <option value="">{t('enq.service.ph') || t('enq.service')}</option>
              {SERVICE_KEYS.map((k) => (
                <option key={k} value={k}>{t(k)}</option>
              ))}
            </select>
          </Field>

          {/* Dynamic fields */}
          {dynamicKeys.includes('depCity') && (
            <Field id={`${id}-dep`} label={t('enq.depCity')} error={errors.depCity}>
              <input id={`${id}-dep`} value={fields.depCity} onChange={(e) => set('depCity', e.target.value)} style={inputStyle(false)} placeholder="e.g. Mumbai (BOM)" />
            </Field>
          )}
          {dynamicKeys.includes('arrCity') && (
            <Field id={`${id}-arr`} label={t('enq.arrCity')} error={errors.arrCity}>
              <input id={`${id}-arr`} value={fields.arrCity} onChange={(e) => set('arrCity', e.target.value)} style={inputStyle(false)} placeholder="e.g. London (LHR)" />
            </Field>
          )}
          {dynamicKeys.includes('travelDate') && (
            <Field id={`${id}-date`} label={t('enq.travelDate')} error={errors.travelDate}>
              <input type="date" id={`${id}-date`} value={fields.travelDate} onChange={(e) => set('travelDate', e.target.value)} style={inputStyle(false)} />
            </Field>
          )}
          {dynamicKeys.includes('returnDate') && (
            <Field id={`${id}-ret`} label={t('enq.returnDate')} error={errors.returnDate}>
              <input type="date" id={`${id}-ret`} value={fields.returnDate} onChange={(e) => set('returnDate', e.target.value)} style={inputStyle(false)} />
            </Field>
          )}
          {dynamicKeys.includes('cabin') && (
            <Field id={`${id}-cab`} label={t('enq.cabin')} error={errors.cabin}>
              <select id={`${id}-cab`} value={fields.cabin} onChange={(e) => set('cabin', e.target.value)} style={selectStyle(false)}>
                <option value="">—</option>
                {CABIN_KEYS.map((k) => <option key={k} value={k}>{t(k)}</option>)}
              </select>
            </Field>
          )}
          {dynamicKeys.includes('pax') && (
            <Field id={`${id}-pax`} label={t('enq.pax')} error={errors.pax}>
              <select id={`${id}-pax`} value={fields.pax} onChange={(e) => set('pax', e.target.value)} style={selectStyle(false)}>
                <option value="">—</option>
                {['1','2','3','4','5','6–10','11–20','20+'].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </Field>
          )}
          {dynamicKeys.includes('groupSize') && (
            <Field id={`${id}-gs`} label={t('enq.groupSize')} error={errors.groupSize}>
              <input type="number" min={10} id={`${id}-gs`} value={fields.groupSize} onChange={(e) => set('groupSize', e.target.value)} style={inputStyle(false)} placeholder="10+" />
            </Field>
          )}
          {dynamicKeys.includes('aircraftPref') && (
            <Field id={`${id}-ac`} label={t('enq.aircraftPref')} error={errors.aircraftPref}>
              <select id={`${id}-ac`} value={fields.aircraftPref} onChange={(e) => set('aircraftPref', e.target.value)} style={selectStyle(false)}>
                <option value="">—</option>
                {['Boeing 787','Airbus A350','Airbus A320neo','Boeing 777','No preference'].map((a) => <option key={a}>{a}</option>)}
              </select>
            </Field>
          )}
          {dynamicKeys.includes('cargoWeight') && (
            <Field id={`${id}-cw`} label={t('enq.cargoWeight')} error={errors.cargoWeight}>
              <input type="number" id={`${id}-cw`} value={fields.cargoWeight} onChange={(e) => set('cargoWeight', e.target.value)} style={inputStyle(false)} placeholder="kg" />
            </Field>
          )}
          {dynamicKeys.includes('cargoType') && (
            <Field id={`${id}-ct`} label={t('enq.cargoType')} error={errors.cargoType}>
              <input id={`${id}-ct`} value={fields.cargoType} onChange={(e) => set('cargoType', e.target.value)} style={inputStyle(false)} placeholder="e.g. Perishables, Electronics" />
            </Field>
          )}
          {dynamicKeys.includes('petSpecies') && (
            <Field id={`${id}-ps`} label={t('enq.petSpecies')} error={errors.petSpecies}>
              <input id={`${id}-ps`} value={fields.petSpecies} onChange={(e) => set('petSpecies', e.target.value)} style={inputStyle(false)} placeholder="e.g. Labrador, 5 kg" />
            </Field>
          )}
          {dynamicKeys.includes('companyName') && (
            <Field id={`${id}-co`} label={t('enq.companyName')} error={errors.companyName} style={{ gridColumn: '1/-1' }}>
              <input id={`${id}-co`} value={fields.companyName} onChange={(e) => set('companyName', e.target.value)} style={inputStyle(false)} />
            </Field>
          )}
          {dynamicKeys.includes('annualSpend') && (
            <Field id={`${id}-as`} label={t('enq.annualSpend')} error={errors.annualSpend}>
              <select id={`${id}-as`} value={fields.annualSpend} onChange={(e) => set('annualSpend', e.target.value)} style={selectStyle(false)}>
                <option value="">—</option>
                {['₹25L–₹1Cr','₹1Cr–₹5Cr','₹5Cr–₹25Cr','₹25Cr+'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
          )}

          {/* Core fields */}
          <Field id={`${id}-name`} label={t('enq.name')} required error={errors.name}>
            <input
              id={`${id}-name`}
              value={fields.name}
              onChange={(e) => set('name', e.target.value)}
              style={inputStyle(!!errors.name)}
              placeholder={t('enq.name.ph') || ''}
              autoComplete="name"
            />
          </Field>

          {/* Mobile with country code */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <label htmlFor={`${id}-mob`} style={labelStyle}>
              {t('enq.mobile')} <span style={{ color: '#c0480c' }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <select
                value={fields.countryCode}
                onChange={(e) => set('countryCode', e.target.value)}
                style={{ ...selectStyle(false), width: 100, flexShrink: 0 }}
                aria-label="Country code"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
              <input
                id={`${id}-mob`}
                type="tel"
                value={fields.mobile}
                onChange={(e) => set('mobile', e.target.value.replace(/\D/g, ''))}
                style={{ ...inputStyle(!!errors.mobile), flex: 1 }}
                placeholder={t('enq.mobile.ph') || '98765 43210'}
                maxLength={10}
                autoComplete="tel"
              />
            </div>
            {errors.mobile && <ErrorMsg>{errors.mobile}</ErrorMsg>}
          </div>

          <Field id={`${id}-email`} label={t('enq.email')} required error={errors.email} style={{ gridColumn: isCompact ? undefined : '1/-1' }}>
            <input
              id={`${id}-email`}
              type="email"
              value={fields.email}
              onChange={(e) => set('email', e.target.value)}
              style={inputStyle(!!errors.email)}
              placeholder={t('enq.email.ph') || 'you@example.com'}
              autoComplete="email"
            />
          </Field>

          <Field id={`${id}-det`} label={t('enq.details')} required error={errors.details} style={{ gridColumn: '1/-1' }}>
            <textarea
              id={`${id}-det`}
              value={fields.details}
              onChange={(e) => set('details', e.target.value)}
              style={{ ...inputStyle(!!errors.details), minHeight: isCompact ? 72 : 100, resize: 'vertical' }}
              placeholder={t('enq.details.ph') || ''}
            />
          </Field>

          {/* Consent */}
          <div style={{ gridColumn: '1/-1' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={fields.consent}
                onChange={(e) => set('consent', e.target.checked)}
                style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0, cursor: 'pointer', accentColor: '#2134ae' }}
              />
              <span style={{ fontSize: 13, lineHeight: 1.6, color: '#4e545e' }}>
                {t('enq.consent')}{' '}
                <a href="/privacy-policy" style={{ color: '#2134ae', fontWeight: 600 }} target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.consent && <ErrorMsg style={{ marginTop: 4 }}>{errors.consent}</ErrorMsg>}
          </div>

          {/* Buttons */}
          <div style={{ gridColumn: '1/-1', display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
            <button
              type="submit"
              disabled={status === 'submitting'}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#2134ae', color: '#fff',
                border: 'none', borderRadius: 8,
                padding: '13px 24px', fontWeight: 700,
                fontSize: isCompact ? 14 : 15,
                cursor: status === 'submitting' ? 'wait' : 'pointer',
                opacity: status === 'submitting' ? 0.7 : 1,
                transition: 'background 0.15s',
                flex: isCompact ? 1 : undefined,
                justifyContent: 'center',
              }}
            >
              {status === 'submitting' ? '…' : t('enq.submit')} {status !== 'submitting' && '→'}
            </button>
            {WHATSAPP_NUMBER && <button
              type="button"
              onClick={handleWhatsApp}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#25D366', color: '#fff',
                border: 'none', borderRadius: 8,
                padding: '13px 20px', fontWeight: 700,
                fontSize: isCompact ? 14 : 15,
                cursor: 'pointer',
                flex: isCompact ? 1 : undefined,
                justifyContent: 'center',
              }}
            >
              <span><MessageCircle size={20}/></span> {t('enq.whatsapp')}
            </button>}
          </div>

          {status === 'error' && (
            <div style={{ gridColumn: '1/-1', background: '#fbf8f2', border: '1px solid #c0480c', borderRadius: 6, padding: '10px 14px', fontSize: 14, color: '#a0390d' }}>
              {t('enq.error.generic')}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

// ─── Variants ─────────────────────────────────────────────────

/** Full-page section wrapper */
export function EnquirySection({ defaultService }) {
  return (
    <section style={{ padding: '72px 0', background: '#faf9f8' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <EnquiryForm variant="full" defaultService={defaultService} />
      </div>
    </section>
  );
}

/** Sidebar panel — fixed width, compact */
export function EnquirySidebar({ defaultService }) {
  return (
    <aside style={{ width: '100%', maxWidth: 340 }}>
      <EnquiryForm variant="sidebar" defaultService={defaultService} />
    </aside>
  );
}

/** Modal — centred overlay */
export function EnquiryModal({ open, onClose, defaultService }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        backdropFilter: 'blur(3px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto', borderRadius: 12 }}>
        <EnquiryForm variant="modal" defaultService={defaultService} onClose={onClose} />
      </div>
    </div>
  );
}

/** Bottom sticky bar — collapses to a button, expands to form */
export function EnquirySticky({ defaultService }) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      zIndex: 400,
      boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
    }}>
      {expanded ? (
        <div style={{ maxHeight: '75vh', overflowY: 'auto' }}>
          <EnquiryForm variant="sticky" defaultService={defaultService} onClose={() => setExpanded(false)} />
        </div>
      ) : (
        <div style={{
          background: '#2134ae', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '14px 24px',
        }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>
            <MessageCircle size={20}/> {t('enq.heading')}
          </span>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setExpanded(true)}
              style={{ background: '#c0480c', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
            >
              {t('enq.submit')}
            </button>
            {WHATSAPP_NUMBER && <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 700, cursor: 'pointer', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <MessageCircle size={20}/> WhatsApp
            </a>}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────
function Field({ id, label, required, error, children, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, ...style }}>
      <label htmlFor={id} style={labelStyle}>
        {label}{required && <span style={{ color: '#c0480c', marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  );
}

function ErrorMsg({ children, style }) {
  return (
    <span role="alert" style={{ fontSize: 12, color: '#dc2626', fontWeight: 600, ...style }}>
      <AlertTriangle size={20}/> {children}
    </span>
  );
}

function CloseBtn({ onClose }) {
  return (
    <button
      onClick={onClose}
      aria-label="Close"
      style={{
        position: 'absolute', top: 12, right: 12,
        background: 'none', border: 'none', cursor: 'pointer',
        fontSize: 20, color: '#a1a9b5', lineHeight: 1,
      }}
    >✕</button>
  );
}

const labelStyle = {
  fontSize: 12, fontWeight: 700,
  letterSpacing: '0.06em', textTransform: 'uppercase',
  color: '#4e545e',
};

function inputStyle(hasError) {
  return {
    border: `1.5px solid ${hasError ? '#dc2626' : '#f0ece2'}`,
    borderRadius: 6,
    padding: '10px 12px',
    fontSize: 14, color: '#0e1547',
    fontFamily: 'inherit',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.15s',
    background: '#fff',
  };
}

function selectStyle(hasError) {
  return { ...inputStyle(hasError), cursor: 'pointer' };
}
