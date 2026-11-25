/*
 * Single source of truth for public contact details and global CTAs.
 *
 * Contact values come from NEXT_PUBLIC_* environment variables (see .env.example)
 * so that no placeholder phone numbers or e-mail addresses ship to production.
 * Every control that depends on a value is rendered ONLY when the value is set —
 * the brief forbids dead buttons. Note: NEXT_PUBLIC_* must be referenced literally
 * for Next.js to inline them in client bundles.
 */

export const OFFICE_ADDRESS = 'Office No. 309, Elixa Park, Old Pune–Bangalore Highway, Shahupuri, Kolhapur, Maharashtra – 416001';
export const LEGAL_NAME = 'Sanatan Airlines Private Limited';
export const MAP_QUERY = 'Elixa Park, Old Pune-Bangalore Highway, Shahupuri, Kolhapur, Maharashtra 416001';
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
export const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;

/* Plain-text values (hours, officer name, registration numbers) — trimmed, length-capped, shown only when set. */
const text = (value, max = 160) => {
  const v = value?.trim() || '';
  return v && v.length <= max ? v : null;
};

/* Header CTAs — each opens a dedicated page/section (never a dead button). */
export const HEADER_CTAS = {
  charter: { label: 'Request a Charter Quote', href: '/aviation/private-jet-charter#enquiry' },
  membership: { label: 'Explore Membership', href: '/club' },
  franchise: { label: 'Franchise Enquiry', href: '/franchise/apply' },
};

/* In-page enquiry sections, in priority order; the mobile "Enquire" action jumps to the first one present. */
export const ENQUIRY_ANCHORS = ['enquiry', 'club-enquiry', 'yatra-enquiry', 'global-enquiry', 'franchise-application', 'consultation'];
export const FALLBACK_ENQUIRY_HREF = '/enquire';

function toPhone(raw) {
  const digits = raw.replace(/\D/g, '');
  if (digits.length < 8 || digits.length > 15) return null;
  return { label: raw, href: `tel:${raw.startsWith('+') ? '+' : ''}${digits}` };
}

function email() {
  const value = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || '';
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : null;
}

function whatsappNumber() {
  const digits = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || '';
  return digits.length >= 8 && digits.length <= 15 ? digits : null;
}

/* Member login must be an internal route or an HTTPS URL (secure login route). */
function memberLogin() {
  const value = process.env.NEXT_PUBLIC_MEMBER_LOGIN_URL?.trim() || '';
  if (value.startsWith('/') && !value.startsWith('//')) return value;
  try { return new URL(value).protocol === 'https:' ? value : null; } catch { return null; }
}

function httpsUrl(value) {
  try { return new URL(value?.trim() || '').protocol === 'https:' ? value.trim() : null; } catch { return null; }
}

/* Optional 24/7 medical-flight desk shown in the air ambulance emergency notice — set ONLY if genuinely staffed round the clock. */
export function getContact() {
  return {
    phone: toPhone(process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || ''),
    emergencyLine: toPhone(process.env.NEXT_PUBLIC_AIR_AMBULANCE_PHONE?.trim() || ''),
    email: email(),
    whatsapp: whatsappNumber(),
    memberLogin: memberLogin(),
    // e.g. "Monday–Saturday, 10:00–18:00 IST" — publish only the hours the office actually keeps
    hours: text(process.env.NEXT_PUBLIC_BUSINESS_HOURS),
    // Grievance / escalation: a ROLE mailbox (not a personal address); the officer's name only with their consent
    grievance: {
      email: (() => { const v = process.env.NEXT_PUBLIC_GRIEVANCE_EMAIL?.trim() || ''; return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? v : null; })(),
      officer: text(process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_NAME, 80),
    },
    company: {
      cin: text(process.env.NEXT_PUBLIC_COMPANY_CIN, 30),
      gstin: text(process.env.NEXT_PUBLIC_COMPANY_GSTIN, 20),
    },
    social: [
      ['Instagram', httpsUrl(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM)],
      ['Facebook', httpsUrl(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK)],
      ['LinkedIn', httpsUrl(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN)],
      ['YouTube', httpsUrl(process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE)],
    ].filter(([, href]) => href),
  };
}

/* Context-aware, pre-filled WhatsApp message (approved deep link: wa.me). */
export function whatsappMessage(pathname = '/') {
  if (pathname === '/aviation/air-ambulance') return 'I have a non-emergency air ambulance enquiry. I understand WhatsApp is not emergency dispatch.';
  if (pathname.startsWith('/aviation')) return 'I have an aviation service enquiry. Please let me know what details are needed.';
  if (pathname.startsWith('/club')) return 'I have an International Club membership enquiry.';
  if (pathname.startsWith('/franchise')) return 'I have a franchise enquiry.';
  if (pathname.startsWith('/global-services')) return 'I have a Global Services enquiry.';
  if (pathname.startsWith('/tirth-yatra')) return 'I have a Tirth Yatra enquiry.';
  return 'I have a general enquiry for Sanatan Airlines.';
}

export function whatsappHref(number, pathname) {
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(whatsappMessage(pathname))}` : null;
}
