import { NextRequest, NextResponse } from 'next/server';

/** Minimal field sanitiser — strips HTML tags */
function sanitise(val: unknown): string {
  if (typeof val !== 'string') return '';
  return val.replace(/<[^>]*>/g, '').trim().slice(0, 2000);
}

function genRef(): string {
  return 'SA' + Date.now().toString(36).toUpperCase().slice(-6);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check
    if (body._hp) {
      return NextResponse.json({ ok: true, ref: genRef() }); // silent discard
    }

    // Rate-limit hint via CF-Connecting-IP (works behind Cloudflare / Vercel)
    // Full rate limiting belongs in middleware; here we just validate
    const ref = body.ref || genRef();
    const lead = {
      ref,
      submittedAt: new Date().toISOString(),
      lang:         sanitise(body.lang),
      service:      sanitise(body.service),
      name:         sanitise(body.name),
      mobile:       sanitise(body.countryCode) + sanitise(body.mobile),
      email:        sanitise(body.email),
      details:      sanitise(body.details),
      depCity:      sanitise(body.depCity),
      arrCity:      sanitise(body.arrCity),
      travelDate:   sanitise(body.travelDate),
      returnDate:   sanitise(body.returnDate),
      cabin:        sanitise(body.cabin),
      pax:          sanitise(body.pax),
      groupSize:    sanitise(body.groupSize),
      aircraftPref: sanitise(body.aircraftPref),
      cargoWeight:  sanitise(body.cargoWeight),
      cargoType:    sanitise(body.cargoType),
      petSpecies:   sanitise(body.petSpecies),
      petWeight:    sanitise(body.petWeight),
      companyName:  sanitise(body.companyName),
      annualSpend:  sanitise(body.annualSpend),
    };

    // ── 1. Webhook (configure ENQUIRY_WEBHOOK_URL in .env) ──────
    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      }).catch(() => {}); // non-blocking, fail silently
    }

    // ── 2. Email notification (configure ENQUIRY_NOTIFY_EMAIL) ─
    // Uses a simple mailto-style log for now; swap in Resend/SendGrid/NodeMailer
    // by replacing this block with the appropriate SDK call.
    const notifyEmail = process.env.ENQUIRY_NOTIFY_EMAIL;
    if (notifyEmail) {
      // Placeholder: log to console in production until email provider is set
      console.log('[Enquiry lead]', JSON.stringify(lead));
    }

    // ── 3. HubSpot (configure HUBSPOT_API_KEY + HUBSPOT_PORTAL_ID) ─
    const hubspotKey = process.env.HUBSPOT_API_KEY;
    if (hubspotKey) {
      await fetch('https://api.hsforms.com/submissions/v3/integration/submit/' +
        (process.env.HUBSPOT_PORTAL_ID || '') + '/' + (process.env.HUBSPOT_FORM_ID || ''), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [
            { name: 'firstname', value: lead.name },
            { name: 'email',     value: lead.email },
            { name: 'phone',     value: lead.mobile },
            { name: 'message',   value: `[${lead.service}] ${lead.details}` },
          ],
        }),
      }).catch(() => {});
    }

    // ── 4. Zoho CRM (configure ZOHO_LEADS_WEBHOOK) ─────────────
    const zohoWebhook = process.env.ZOHO_LEADS_WEBHOOK;
    if (zohoWebhook) {
      await fetch(zohoWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Last_Name: lead.name,
          Email:     lead.email,
          Phone:     lead.mobile,
          Description: `[${lead.service}] ${lead.details}`,
          Lead_Source: 'Website Enquiry Form',
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true, ref });

  } catch (err) {
    console.error('[Enquiry API error]', err);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
