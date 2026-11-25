# Advanced Features Readiness

## Implemented in the Frontend

- Desktop hover/click mega menus and mobile accordion navigation.
- Three-step, service-aware enquiry wizard at `/enquire`; the original route-specific forms remain available.
- Node.js/Express lead API (`server/`) with MySQL persistence, server-side validation, origin allowlisting, per-IP and per-email rate limits, admin read/update endpoints and health checks. See `docs/lead-capture.md`.
- Sticky page headers, scroll progress on content routes, reduced-motion support and keyboard/focus styling.
- Next.js App Router statically renders public pages and emits route-specific titles, descriptions, canonicals, Open Graph metadata and WebPage JSON-LD. `NEXT_PUBLIC_SITE_URL` should be set to the approved HTTPS production origin.
- Secondary static routes include accessible visible breadcrumbs and `BreadcrumbList` JSON-LD. Unrecognized paths use a custom 404.
- Dynamic `/sitemap.xml` and `/robots.txt` metadata routes. The sitemap uses `SITE_URL`/`NEXT_PUBLIC_SITE_URL` when set, otherwise the request host, and excludes noindex routes.
- Config-gated WhatsApp click-to-chat. It remains hidden until `NEXT_PUBLIC_WHATSAPP_NUMBER` is set to an approved Business number in international digits without `+`. Messages are contextual and contain no user-entered data.
- Analytics adapter for `sanatan:lead-event`, GA4 loading only after explicit analytics consent and approved policy configuration. Visitors can revise their choice in Privacy settings. Events contain no form values.
- Destination filters for region, trip style and season. They show no results until `NEXT_PUBLIC_CONFIRMED_DESTINATIONS` contains approved partner-supported entries.
- Grounded AI assistant at `/api/assistant`. Questions are matched against a local retrieval index of published site pages, then answered by an OpenAI-compatible chat model when `AI_API_KEY` is configured. Without a key it returns the matched published information as a site guide. Emergency questions receive an immediate emergency-services reply; the endpoint applies source allowlisting, response length limits and per-IP rate limiting. The widget requires consent before sending to a configured AI service.
- Membership comparison is interactive and does not calculate savings or availability.
- Editorial images use Next.js Image optimization, responsive `sizes`, lazy loading for below-the-fold media and preload for route hero images.

## Required Configuration

See `.env.example`. `NEXT_PUBLIC_*` values are public client configuration; never put API keys or secrets there.

- `SITE_URL`: approved HTTPS origin for sitemap generation.
- `NEXT_PUBLIC_SITE_URL`: runtime canonical/structured-data origin.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: approved WhatsApp Business number.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: GA4 measurement ID. Analytics also requires explicit user consent and `NEXT_PUBLIC_PRIVACY_POLICY_APPROVED=true`.
- `NEXT_PUBLIC_LEAD_API_URL`: public URL of the lead API. Forms remain blocked without this and approved privacy-policy configuration. Backend settings live in `server/.env`; see `server/.env.example` and `docs/lead-capture.md`.
- `AI_ASSISTANT_ENABLED`, `AI_API_KEY`, `AI_BASE_URL`, `AI_MODEL`: server-side AI assistant configuration. The API key must never be exposed with a `NEXT_PUBLIC_*` variable. The endpoint uses an OpenAI-compatible `/chat/completions` service, grounds replies in a local index of published site pages and falls back to published-information answers if the provider is unavailable or unconfigured. Legal review of the Privacy Policy is required before enabling a third-party provider in production.
- `NEXT_PUBLIC_CONFIRMED_DESTINATIONS`: JSON array of records shaped like `{"name":"...","region":"...","styles":["..."],"seasons":["..."]}`. Only verified partner-supported entries may be added.

## Not Available in This Workspace

- **CMS:** no CMS provider, API or authentication service exists. Role-based publishing, drafts, previews and media management must be implemented in a secured CMS/backend, not browser-local storage.
- **CRM delivery:** leads are validated and stored in MySQL by `server/`. No CRM credentials or delivery integration are configured, and no customer acknowledgement is sent automatically. CAPTCHA, shared rate-limit storage for multiple API instances, retention jobs and CRM mapping remain deployment work.
- **File scanning:** the backend accepts PDF/DOC/DOCX CVs up to 5 MB after signature validation and a ClamAV `INSTREAM` scan; uploads are rejected while `CLAMAV_HOST` is unset. Approved storage access controls, rescanning and retention still require operational sign-off before enabling CV uploads in production.
- **Approved privacy policy:** `/privacy-policy` is a pre-launch notice. Lead submission and GA remain gated until approved policy content is published. AI transmission requires explicit visitor consent and should only be enabled after privacy approval.
- **AI model credentials:** the assistant endpoint, retrieval index and provider integration are implemented, but no model API key is present in this workspace. Without `AI_API_KEY`, answers come from the published-information guide. Production use requires an approved provider, data-processing terms and legal review.
- **Multilingual content:** the site remains English-only; Hindi and Marathi should not be enabled without reviewed translations.
- **Content typing:** the App Router shell is TypeScript, while existing page components remain JSX/JavaScript with `allowJs`; strict TypeScript coverage is not yet complete.
- **Performance evidence:** static build and responsive image handling are verified, but Lighthouse, real-device tests and 75th-percentile field Core Web Vitals have not been measured. CDN, field monitoring and uptime/error reporting require deployment services.
- **Image licensing:** Next Image optimization is configured for Unsplash, but production must use approved/licensed assets. A CMS media library is not available.
- **Deployment environments:** `docker compose up -d --build` runs nginx, the frontend, API and MySQL together with automatic migrations; nginx is the only published entry point and proxies lead/admin traffic to the API. The bundled Compose defaults and secrets are for local evaluation only. TLS must still be added at an AWS ALB/CloudFront or with the bundled `nginx/tls.conf.example`. This workspace has no staging/production environment, CI/CD or rollback pipeline. Production needs a managed MySQL instance, secret management, `TRUST_PROXY` configured behind the TLS proxy and a shared rate-limit store if the API runs on multiple instances.

Member, franchise and partner portals, payments, checkout, live charter quoting and booking remain out of scope and are not exposed.
