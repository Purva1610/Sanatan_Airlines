/*
 * CRM webhook forwarding (brief: "CRM lead integration — secure API/webhook integration,
 * lead source, campaign and status tracking").
 *
 * Every lead is stored in MySQL first (the system of record, with status tracking via the
 * admin API). If CRM_WEBHOOK_URL is set, the lead is ALSO forwarded to the CRM:
 *   - HTTPS only; 5 s timeout; fire-and-forget — a CRM outage never loses or blocks a lead.
 *   - Signed: X-Sanatan-Timestamp + X-Sanatan-Signature = "sha256=" + HMAC-SHA256(secret, `${timestamp}.${body}`).
 *     The receiver should recompute the HMAC and reject requests older than ~5 minutes.
 *   - No CV file, IP hash or user agent is sent; CVs stay on the lead server.
 */

import { createHmac } from 'node:crypto';

const url = (() => {
  const value = (process.env.CRM_WEBHOOK_URL || '').trim();
  try { return new URL(value).protocol === 'https:' ? value : ''; } catch { return ''; }
})();
const secret = (process.env.CRM_WEBHOOK_SECRET || '').trim();

export const crmEnabled = Boolean(url && secret.length >= 32);

if (url && !crmEnabled) {
  console.warn('[crm] CRM_WEBHOOK_URL is set but CRM_WEBHOOK_SECRET is missing or shorter than 32 characters — forwarding disabled.');
}

export function buildCrmPayload(lead, reference, hasAttachment) {
  const data = { ...(lead.rawPayload?.data || {}) };
  return {
    event: 'lead.created',
    reference,
    status: 'new',
    formType: lead.formType,
    team: lead.team,
    submittedAt: lead.submittedAt,
    consentAt: lead.consentAt,
    source: { path: lead.sourcePath, referrerOrigin: lead.referrerOrigin, campaign: lead.campaign || {} },
    contact: { name: lead.name, email: lead.email, phone: lead.phone },
    serviceCategory: lead.serviceCategory,
    fields: data,
    hasCvAttachment: Boolean(hasAttachment),
  };
}

export async function forwardLeadToCrm(lead, reference, hasAttachment) {
  if (!crmEnabled) return;
  const body = JSON.stringify(buildCrmPayload(lead, reference, hasAttachment));
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Sanatan-Timestamp': timestamp,
        'X-Sanatan-Signature': `sha256=${signature}`,
        'X-Sanatan-Event': 'lead.created',
      },
      body,
      signal: controller.signal,
    });
    if (!response.ok) console.warn(`[crm] forwarding ${reference} failed with HTTP ${response.status}`);
  } catch (error) {
    console.warn(`[crm] forwarding ${reference} failed: ${error.name}`);
  } finally {
    clearTimeout(timer);
  }
}
