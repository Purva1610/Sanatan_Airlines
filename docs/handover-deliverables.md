# Handover Deliverables

## Delivery Status

| Deliverable | Status | Location / gate |
| --- | --- | --- |
| Sitemap and user journey diagram | Prototype implemented | [sitemap.xml](/sitemap.xml), [delivery-workflow.md](delivery-workflow.md); final diagram and management approval pending |
| Homepage and mobile wireframes | Implemented as responsive code | [src/App.jsx](../src/App.jsx), [src/home.css](../src/home.css); formal Figma approval pending |
| All P0 page wireframes and designs | Implemented for P0 route templates | `app/[...slug]/page.tsx` and `src/`; management and Figma sign-off pending |
| Figma component library and tokens | Code tokens implemented | [src/brand.css](../src/brand.css), [src/chrome.css](../src/chrome.css); Figma library not created |
| Clickable prototype | Pending | Requires approved Figma file and account |
| Desktop, tablet and mobile variants | Implemented responsively | Breakpoints, responsive CSS and mobile menu/actions exist; real-device UAT pending |
| Interaction states and responsive notes | Partially implemented | Default, hover, active, focus, disabled, loading and feedback states exist; final Figma notes pending |
| Exported brand / web assets | Pending | No approved final logo or licensed asset pack; temporary code mark and development imagery are in use |
| Front-end source code | Implemented | Company-controlled Git repository and credential ownership required |
| Setup, build and deployment documentation | Implemented | [README.md](../README.md), Docker and nginx configuration |
| Third-party library, licence and cost register | Partially implemented below | Licence review and recurring-cost approval pending |
| API integration map and form specification | Implemented | [lead-capture.md](lead-capture.md) |
| QA, Lighthouse and accessibility summary | Automated build only | Real-browser, Lighthouse, WCAG 2.2 AA and UAT reports pending |
| CMS editor guide and training | Pending | No CMS provider or editor exists |
| Post-launch support period | Pending | Must be defined in a signed support/warranty agreement |

## Repository and Source

- Front end: Next.js App Router and React components
- Lead API: Node.js and Express
- Database: MySQL
- Validation: Zod
- Styling: documented CSS/component system
- Deployment: Docker Compose, nginx, Next.js standalone and Express

The repository, build systems, secrets, domains, analytics and admin accounts must be owned and controlled by Sanatan.

## Dependency and Licence Register

The versions below are recorded in [package.json](../package.json). Recipients must run a final licence/SBOM review before production acceptance.

| Package | Purpose | Licence / recurring cost gate |
| --- | --- | --- |
| `next` | App framework and static rendering | Confirm SPDX licence and framework support terms |
| `react`, `react-dom` | UI rendering | Confirm SPDX licences |
| `typescript` | Type checking | Confirm SPDX licence |
| `zod` | Schema validation | Confirm SPDX licence |
| `lucide-react` | Interface icons | Confirm icon licence and package terms |
| `express`, `cors`, `helmet`, `express-rate-limit` | Lead API, middleware and limits | Confirm SPDX licences |
| `multer` | Multipart CV uploads | Confirm SPDX licence |
| `mysql2` | MySQL driver | Confirm SPDX licence |

Deployment/platform costs are not approved until the selected host, database, CDN, malware scanner, monitoring, CRM and AI provider are chosen.

## API and Form Integration Map

- Public lead route: `POST /api/leads`
- Health route: `GET /api/health`
- Admin lead routes: `GET/PATCH /api/admin/leads`
- Form team routing: central support, aviation desk, trained coordinator, membership sales, franchise, global services, partnerships and HR
- Front-end contract and required fields: [lead-capture.md](lead-capture.md)
- Source, consent, timestamp and PII-free lifecycle events are recorded by the lead integration

## QA and Acceptance

Automated acceptance currently includes:

- Strict TypeScript checking
- Next.js production build
- Static route generation
- Server-side lead schema and field allowlisting
- Honeypot, origin, rate-limit and CV file controls

Not yet evidenced:

- Chrome, Safari, Firefox and Edge matrix
- iOS Safari and Android Chrome testing
- Keyboard and screen-reader testing
- WCAG 2.2 AA review
- Lighthouse desktop/mobile reports
- Field Core Web Vitals monitoring
- Real-service UAT
- Security penetration testing
- CMS and CRM end-to-end acceptance
- Rollback and disaster-recovery drills

## CMS Handover

No CMS is currently integrated. Before handover, Sanatan must approve a provider and receive:

- Role and permission matrix
- Draft, preview and publishing workflow
- Audit log expectations
- Media library and naming rules
- Training and editor guide
- MFA for administrative accounts
- Content backup, restore and export procedures

## Release Handover Acceptance

The production handover is complete only after the project owner verifies:

- [ ] Approved content and asset package
- [ ] Approved legal policies and disclosures
- [ ] Production domains and HTTPS certificates
- [ ] Secrets and environment inventory
- [ ] CRM routing and acknowledgement tests
- [ ] Admin access and MFA
- [ ] Backups, monitoring and rollback
- [ ] Browser, accessibility and performance reports
- [ ] CMS training and editor credentials
- [ ] Signed bug-fix and support period

The handover acceptance record must confirm that:

- One Sanatan project owner has approved scope and content.
- Page-level content owners and approvers are recorded.
- Figma comments and issue-tracker decisions are the single feedback source.
- Written change control exists for any out-of-scope item.
- Domain, hosting, repository, analytics, CMS and Figma ownership is held by company accounts.
- MFA and administrator credentials have been transferred and freelancer access revoked.
- Aircraft photos, operator identities, certificates, logos, testimonials and financial claims have documented approvals.
