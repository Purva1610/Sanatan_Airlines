# Lead Capture Integration

## Current Behavior

Forms validate in the browser with Zod and emit PII-free lifecycle events as `sanatan:lead-event`. The repository now includes a Node.js/Express backend (`server/`) that validates and stores submissions in MySQL. The browser only transmits when both `NEXT_PUBLIC_LEAD_API_URL` is configured and `NEXT_PUBLIC_PRIVACY_POLICY_APPROVED=true`. The Privacy Policy route is currently a pre-launch notice, not an approved legal policy, so the transmission gate must remain closed until that route is replaced with approved policy content.

The configured URL is public browser configuration, not a secret. The API stores leads in MySQL; CRM forwarding and customer acknowledgements are separate deployment integrations.

## Request Contract

Standard submissions use JSON with this shape:

```json
{
  "schemaVersion": "1.0",
  "formType": "general_enquiry",
  "destinationTeam": "central_customer_support",
  "submittedAt": "ISO-8601 timestamp",
  "source": {
    "path": "/",
    "referrerOrigin": "",
    "campaign": {}
  },
  "consent": {
    "accepted": true,
    "acceptedAt": "ISO-8601 timestamp"
  },
  "data": {}
}
```

A successful endpoint returns HTTP 200, 201 or 202 and may return `{ "reference": "..." }`. The endpoint is responsible for sending any customer acknowledgement. A rejected request should return a non-2xx response with a generic, non-sensitive error.

When a CV is attached, the request is `multipart/form-data`: `lead` contains the JSON envelope above and `cv` contains one PDF, DOC or DOCX file. The client limits CV files to 5 MB; the server must enforce the same limit, inspect content rather than trusting extension/MIME, scan for malware, restrict access and define retention.

## Form Types and Routing

| `formType` | `destinationTeam` | `data` fields |
| --- | --- | --- |
| `general_enquiry` | `central_customer_support` | `serviceCategory`, `name`, `phone`, `email`, `location`, `message` |
| `jet_charter` | `aviation_desk` | `origin`, `destination`, `tripType`, `travelDate`, `flexibleDate`, `passengers`, `luggage`, `aircraftPreference`, `company`, `requirements`, contact fields, `additionalNotes` |
| `helicopter` | `aviation_desk` | `pickup`, `dropoff`, `dateTime`, `passengers`, `purpose`, `landingDetails`, contact fields, `additionalNotes` |
| `air_ambulance` | `trained_coordinator` | `origin`, `destination`, `conditionCategory`, `urgency`, `groundAmbulance`, `attendants`, `hospitalContact`, requester contact fields, `additionalNotes` |
| `aviation_enquiry`, `aircraft_advisory`, `aircraft_leasing`, `aviation_concierge`, `international_charter` | `aviation_desk` | Service-specific fields are defined on each route; the request path identifies the service. |
| `membership` | `membership_sales` | `plan`, `travellers`, `destinations`, `frequency`, `startDate`, contact fields |
| `franchise` | `franchise_team` | `applicantName`, `company`, `cityState`, `territory`, `experience`, `investmentRange`, `premises`, contact fields |
| `global_services` | `global_services_team` | Service-specific intake fields are defined on each `/global-services/*` route; the request path identifies the service. |
| `partner_enquiry` | `partnerships_team` | `organization`, `country`, `serviceCategory`, `credentialsSummary`, contact fields, `message` |
| `career_application` | `hr_recruitment` | `role`, `name`, `email`, `phone`; optional `cv` uses multipart upload. |

Contact fields use `name`/`contactName`, `email`/`contactEmail`, and `phone`/`contactPhone` according to the form. Consent is represented in the envelope and is not included in `data`.

## Backend Implementation

The repository includes an Express API in `server/` backed by MySQL. See the README for setup. Public leads are retained in MySQL; CRM forwarding and customer acknowledgements still require a deployment integration.

### Endpoints

| Method | Path | Access | Behavior |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Public | Returns `200` when MySQL responds, `503` otherwise |
| `POST` | `/api/leads` | Public | JSON envelope or `multipart/form-data` (`lead` + optional `cv`); returns `201 { reference, receivedAt }` |
| `GET` | `/api/admin/leads` | Bearer token | Paginated summaries; `status`, `team`, `formType`, `q`, `page`, `limit` |
| `GET` | `/api/admin/leads/:id` | Bearer token | Full envelope, notes and attachment metadata |
| `PATCH` | `/api/admin/leads/:id` | Bearer token | Update `status` and/or `adminNotes` |

Admin requests use `Authorization: Bearer $ADMIN_API_TOKEN`, compared in constant time. Admin endpoints return `503` when no token is configured and `Cache-Control: no-store`.

### Server Controls

- Re-validates the envelope, form type, destination-team mapping, required fields, email, phone and consent with the shared Zod schema in `src/leadSchemas.js`, plus a per-form field allowlist.
- Rejects honeypot hits, unexpected fields, campaign keys other than UTM parameters, payloads over 64 KB and Luhn-valid payment-card numbers.
- Applies per-IP limits (default 10 per 10 minutes) and per-contact-email limits (default 5 per hour). The default store is in memory; multi-instance deployments need a shared store.
- Applies an origin allowlist from `CORS_ORIGINS` and security headers from Helmet.
- Stores receipt time, pseudonymised client IP (HMAC-SHA256 with `IP_HASH_SECRET`), user agent, source path, campaign data, team and status (`new`).
- CV files: PDF/DOC/DOCX only, 5 MB maximum, with extension, declared MIME and magic-byte checks. Files are scanned through ClamAV `INSTREAM` (`CLAMAV_HOST`, `CLAMAV_PORT`); uploads are rejected with `503` while scanning is unconfigured and `422` when infected. Clean files are stored with random names and restrictive permissions; no public download route exists.
- Still required before production: CAPTCHA or equivalent abuse challenge, CRM delivery/acknowledgement, retention and deletion jobs, shared rate-limit storage, backups and least-privilege database credentials.

### Database

`npm run db:migrate` creates the configured database and applies ordered files from `server/sql/` once each, tracked in `schema_migrations`.

| Table | Purpose |
| --- | --- |
| `leads` | Envelope JSON, extracted contact/team columns, status, notes, timestamps, pseudonymised IP |
| `lead_attachments` | CV metadata, SHA-256 digest and scan status linked to a lead |
| `schema_migrations` | Applied migration versions |

All tables are InnoDB with `utf8mb4`. `reference` is unique; indexes cover status, team, form type and receipt time.

## Lifecycle Events

The browser emits `sanatan:lead-event` with event name, form type, destination team, source path and timestamp. Supported events are `form_start`, `form_step`, `form_abandon`, `form_submit`, `form_submit_success` and `form_submit_failure`. Events contain no field values or other form PII. An analytics integration may listen for this event and apply its own consent and retention rules.

## Deployment Gate

1. Provision MySQL, run `npm run db:migrate`, and start the API with `server/.env` configured. Use TLS, a least-privilege database user and an approved `ADMIN_API_TOKEN`, `IP_HASH_SECRET` and `CORS_ORIGINS`.
2. Set `CLAMAV_HOST`/`CLAMAV_PORT` if career applications with CVs will be accepted; keep CV uploads disabled until scanning and file retention are approved.
3. Replace `/privacy-policy` with the approved policy and data-controller contact details.
4. Set `NEXT_PUBLIC_LEAD_API_URL` to the public HTTPS lead endpoint and `NEXT_PUBLIC_PRIVACY_POLICY_APPROVED=true` in the frontend deployment environment.
5. Exercise every form against staging and confirm routing, references, MySQL retention, admin access, file scanning, CAPTCHA and CRM acknowledgement before production. Add backups, deletion jobs and a shared rate-limit store for multi-instance deployments.
