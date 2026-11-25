# Sanatan Airlines Website

Next.js App Router frontend with a Node.js/Express lead API and MySQL database.

## Requirements

- Node.js 20.9 or later (Node 24 is currently used in this workspace)
- npm
- MySQL 8 (or Docker for the bundled `docker-compose.yml`)

## Run the Full Stack with Docker

```sh
docker compose up -d --build
```

Open **http://localhost** (change with `HTTP_PORT`). nginx is the only public entry point: it serves the site and proxies lead, admin and health requests to the Express API.

This builds two images and starts five containers:

| Service | Image | Address |
| --- | --- | --- |
| `nginx` | `nginx:1.27-alpine` | http://localhost (public entry point) |
| `web` | `sanatan-web:local` (Next.js standalone) | 127.0.0.1:3000 (internal) |
| `api` | `sanatan-api:local` (Express) | 127.0.0.1:4000 (internal) |
| `mysql` | `mysql:8.4` | 127.0.0.1:3316 |
| `migrate` | `sanatan-api:local` | one-shot schema migration, exits when done |

Startup order is enforced: MySQL healthcheck, then migrations, then the API healthcheck, then frontend and nginx. Lead data persists in the `mysql-data` volume and CV uploads in the `uploads` volume.

```sh
docker compose ps
docker compose logs -f nginx web api
docker compose down          # stop, keep data
docker compose down -v       # stop and delete database + uploads
```

The Compose defaults are for local evaluation only:

- `NEXT_PUBLIC_PRIVACY_POLICY_APPROVED=true` so forms can be exercised without a published policy. Set it explicitly to `false` until the approved policy is live, and never ship this default to production.
- `ADMIN_API_TOKEN=local-admin-token-change-me-32chars` and a fixed `IP_HASH_SECRET` are placeholders. Replace them.
- `NEXT_PUBLIC_LEAD_API_URL=/api/leads` is compiled into the browser bundle and stays same-origin through nginx, so the host can change without a CORS rebuild. If you override it with an absolute URL, also set `CORS_ORIGINS` to the page origin and rebuild.
- Only nginx, on `HTTP_PORT` (80 by default), is reachable from outside the host. MySQL, the API and the web server are published on `127.0.0.1` for debugging.

Ports can be changed with `HTTP_PORT`, `WEB_PORT`, `API_PORT` and `MYSQL_PORT`. Replace database passwords with `MYSQL_*` variables or a root `.env` file. For a production deployment, provide strong secrets, configure `CLAMAV_HOST` for CV uploads and publish the approved Privacy Policy before enabling submissions.

### Deploy on AWS EC2

1. Launch an Ubuntu 24.04 instance (t3.small or larger; add swap on 1 GB instances), then install Docker Engine and the Compose plugin.
2. Security group inbound rules: SSH (22) from your IP only, HTTP (80) and HTTPS (443) from anywhere. Do **not** open 3000, 4000 or 3316 — those ports are bound to the instance loopback.
3. Clone the repository on the instance and create a `.env` file at the repository root:

```sh
SITE_URL=https://sanatan.example.com
NEXT_PUBLIC_SITE_URL=https://sanatan.example.com
NEXT_PUBLIC_LEAD_API_URL=/api/leads
NEXT_PUBLIC_CONTACT_PHONE=                         # approved public number
NEXT_PUBLIC_CONTACT_EMAIL=                        # approved public address
NEXT_PUBLIC_WHATSAPP_NUMBER=                      # approved WhatsApp Business number
NEXT_PUBLIC_GA_MEASUREMENT_ID=                    # approved GA4 measurement ID
NEXT_PUBLIC_PRIVACY_POLICY_APPROVED=true   # only after the approved policy is published
ENABLE_HSTS=false                          # direct Nginx TLS config adds HSTS at the edge
CORS_ORIGINS=https://sanatan.example.com
MYSQL_ROOT_PASSWORD=replace-with-a-strong-password
MYSQL_PASSWORD=replace-with-a-strong-password
ADMIN_API_TOKEN=replace-with-32-plus-random-characters
IP_HASH_SECRET=replace-with-32-plus-random-characters
AI_API_KEY=
CLAMAV_HOST=
HTTP_PORT=80
```

`SITE_URL` is used as the default allowed CORS origin for same-origin form posts; set `CORS_ORIGINS` explicitly only when additional origins must be accepted. Use the instance's public DNS name instead of the example domain while testing without DNS.

4. Start and verify:

```sh
docker compose up -d --build
curl -fsS http://localhost/healthz
curl -fsS http://localhost/api/health
docker compose ps
```

5. Point your DNS `A` record at the instance (or an Elastic IP).

`NEXT_PUBLIC_*` values are compiled into the browser bundle at build time: after changing one, rebuild with `docker compose up -d --build web`.

### HTTPS

- Recommended: terminate TLS at an AWS Application Load Balancer or CloudFront, forward to the instance on port 80, then set `SITE_URL`/`NEXT_PUBLIC_SITE_URL` to the `https://` URL and `ENABLE_HSTS=true`. Traffic then passes through two proxies, so also set `TRUST_PROXY=2` (add one for each additional trusted proxy) so rate limits and IP hashing use the real client address.
- Directly on the instance: obtain a certificate for the approved domain (for example with certbot), copy `fullchain.pem` and `privkey.pem` into `nginx/certs/`, replace `nginx/conf.d/default.conf` with `nginx/tls.conf.example` (edit both `server_name` directives), uncomment the 443 port mapping and certificate volume in `docker-compose.yml`, then run `docker compose up -d --build`. The TLS configuration redirects HTTP to HTTPS and applies HSTS; do not enable HSTS until HTTPS is confirmed working.

## Local Development

1. Start MySQL and apply the schema:

```sh
docker compose up -d mysql
cp server/.env.example server/.env
npm install
npm run db:migrate
```

The bundled Compose file publishes MySQL on `3316` by default to avoid a host MySQL service on `3306`; change it with `MYSQL_PORT` and set the same value in `server/.env`. For the containerized API and frontend, use `docker compose up -d --build` instead of the manual steps below.

2. Start the lead API:

```sh
npm run server
```

The API listens on `http://127.0.0.1:4000`; `GET /api/health` reports database connectivity.

3. Start the frontend, enabling the lead endpoint only after the approved Privacy Policy is published:

```sh
NEXT_PUBLIC_LEAD_API_URL=http://127.0.0.1:4000/api/leads NEXT_PUBLIC_PRIVACY_POLICY_APPROVED=true npm run dev
```

Open http://localhost:3000. Without `NEXT_PUBLIC_LEAD_API_URL`, or with `NEXT_PUBLIC_PRIVACY_POLICY_APPROVED` unset, forms validate but do not transmit.

## Production Build

```sh
npm run build
npm start
```

Run the lead API as a separate process (`npm run server`) behind the same TLS-terminating reverse proxy, and set `TRUST_PROXY=1` so rate limiting and IP pseudonymisation use the real client address.

The build prerenders the configured public routes. `/sitemap.xml` and `/robots.txt` are generated by App Router metadata routes and use the explicitly configured `SITE_URL`/`NEXT_PUBLIC_SITE_URL`; there is no request-host fallback. If the production origin is missing, the sitemap is empty and production `robots.txt` disallows crawling until configuration is corrected. No blog articles are currently published, so there are no article URLs to include yet.

## Configuration

Copy `.env.example` for the frontend and `server/.env.example` for the backend. `NEXT_PUBLIC_*` values are shipped to browsers and must never contain secrets; database credentials, `ADMIN_API_TOKEN`, `IP_HASH_SECRET` and `CLAMAV_HOST` belong only in `server/.env`.

Server-only values to set in production:

- `MYSQL_*`: database connection.
- `CORS_ORIGINS`: exact HTTPS site origin(s) allowed to submit forms.
- `ADMIN_API_TOKEN`: at least 32 random characters; required for `/api/admin/*`.
- `IP_HASH_SECRET`: at least 32 characters; used to pseudonymise client IPs.
- `CLAMAV_HOST`/`CLAMAV_PORT`: enables CV malware scanning. CV attachments are rejected while unset.
- `TRUST_PROXY`: number of trusted proxies (for example `1`).

See [docs/lead-capture.md](docs/lead-capture.md) for the request contract, endpoints and server controls, and [docs/advanced-features-readiness.md](docs/advanced-features-readiness.md) for launch dependencies.
See [docs/delivery-workflow.md](docs/delivery-workflow.md) for the 12-step design and development workflow and current release status.
See [docs/handover-deliverables.md](docs/handover-deliverables.md) for the expected source, design, QA and operational handover package.
See [docs/initial-release-scope.md](docs/initial-release-scope.md) for features outside the initial public release.
See [docs/delivery-workflow.md](docs/delivery-workflow.md) for project ownership, change control and account-custody requirements.
See [docs/standards-reference.md](docs/standards-reference.md) for the official Core Web Vitals, WCAG 2.2 and SEO standards used as acceptance references.
See [docs/acceptance-signoff.md](docs/acceptance-signoff.md) for the release acceptance and evidence checklist.

## Backend API

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Public | Database health check |
| `POST` | `/api/leads` | Public, rate limited | Accepts the lead envelope as JSON or as `multipart/form-data` with an optional `cv` file |
| `GET` | `/api/admin/leads` | Bearer `ADMIN_API_TOKEN` | Paginated list; filters `status`, `team`, `formType`, `q`, `page`, `limit` |
| `GET` | `/api/admin/leads/:id` | Bearer | Full payload and CV metadata |
| `PATCH` | `/api/admin/leads/:id` | Bearer | Update `status` and/or `adminNotes` |

Submissions return `201` with `{ reference, receivedAt }`. Invalid input, disallowed origins, honeypot hits, payment-card data, oversized payloads and rate limits receive generic JSON errors. Uploaded CVs are only stored after signature validation and a clean ClamAV scan.

## Architecture

- `app/`: typed Next App Router layouts, static route generation, metadata, sitemap/robots metadata routes, the grounded assistant API and a custom 404.
- `src/`: interactive React page components, shared form capture/validation utilities and the assistant knowledge index.
- `server/`: Express lead API, MySQL access, server-side validation, security controls, migrations and SQL schema.
- `Dockerfile`, `server/Dockerfile`, `docker-compose.yml`: multi-stage images and the full frontend/API/MySQL stack.

Content pages are statically prerendered. Interactive forms, menus and utilities are client components. Leads are stored in MySQL; CRM forwarding and customer acknowledgements remain deployment integrations.

