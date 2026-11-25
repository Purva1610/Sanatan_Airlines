/*
 * Leadership profiles — published ONLY with authorisation (brief §7: "approved names,
 * photographs, roles, biographies and consent"; "do not publish personal mobile
 * numbers or leadership information without authorization").
 *
 * A profile renders on /leadership only when BOTH are recorded:
 *   approval.approvedBy + approval.date   — management sign-off on the content
 *   consent.signed === true + consent.date — the individual's written consent (name, photo, bio)
 *
 * There is intentionally NO field for phone numbers or personal e-mail: contact the
 * company through the role addresses in src/contactConfig.js instead.
 *
 * Photo: place an approved, licensed portrait in /public/images/leadership/ (4:5, ≥ 800×1000).
 *
 * Example:
 * {
 *   name: 'Full Name',
 *   role: 'Managing Director',
 *   photo: '/images/leadership/full-name.jpg',
 *   photoAlt: 'Portrait of Full Name',
 *   bio: ['First paragraph of the approved biography.', 'Second paragraph.'],
 *   linkedin: 'https://www.linkedin.com/in/…',        // optional, only with consent
 *   approval: { approvedBy: 'Board of Directors', date: '2026-12-01' },
 *   consent: { signed: true, date: '2026-12-01' },
 * }
 */

export const leadershipProfiles = [];

const isDate = (value) => typeof value === 'string' && !Number.isNaN(Date.parse(value));

export function getPublishedLeaders() {
  return leadershipProfiles.filter((p) => p
    && typeof p.name === 'string' && typeof p.role === 'string'
    && p.approval && typeof p.approval.approvedBy === 'string' && isDate(p.approval.date)
    && p.consent && p.consent.signed === true && isDate(p.consent.date));
}
