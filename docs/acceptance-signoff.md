# Acceptance Testing and Sign-Off

This checklist is for final release acceptance. Mark an item complete only after evidence is attached or reviewed.

| Test | Current implementation evidence | Acceptance status | Evidence / sign-off |
| --- | --- | --- | --- |
| Approved pages exist and navigation works | Public routes, sitemap and redirects implemented | Pending live-route UAT | |
| CTAs route correctly | Service, enquiry, phone, email and WhatsApp configuration implemented | Pending approved contact and journey testing | |
| Forms validate and route to the correct team | Zod schema, team mapping and Express API implemented | Pending CRM/staging end-to-end test | |
| Customer receives confirmation | UI success state and backend reference response implemented | Pending production/CRM acknowledgement test | |
| Mobile menu and sticky CTAs do not cover content | Responsive menu and mobile action bar implemented | Pending real-device UAT | |
| Common mobile/tablet/desktop breakpoints work | Responsive CSS and breakpoints implemented | Pending visual test matrix | |
| Images are licensed, optimized and have alt text | Next Image and alt attributes implemented | Pending asset-rights and media audit | |
| Titles, descriptions, canonicals and sitemap | Route metadata and sitemap implemented | Pending approved HTTPS origin and crawl test | |
| Core Web Vitals targets | No field or Lighthouse evidence yet | Blocked on production/staging measurement | |
| Keyboard, focus and form accessibility | Skip links, focus styling and form feedback implemented | Pending keyboard/screen-reader audit | |
| Privacy consent and policy links | Consent gate and policy route implemented | Blocked on approved policy and cookie consent | |
| No unapproved pricing, claims, logos or guarantees | Content freeze and disclosure patterns implemented | Pending management and legal sign-off | |
| 404, error and loading states | Custom 404 and form loading/error feedback implemented | Pending route and service-state UAT | |
| Analytics and conversion goals | PII-free event adapter implemented | Blocked on consent, measurement ID and goal test | |
| Production deployment, backups, rollback and monitoring | Docker and migration setup documented | Blocked on production environment and drills | |
| Source, Figma, assets and documentation handed over | Source and documentation exist | Blocked on company-controlled repository, Figma and credentials | |

## Automated Checks

The following are available as repeatable acceptance evidence:

- `npm run typecheck`
- `npm run validate`
- `npm run build`
- GitHub Actions workflow for push and pull-request validation
- Next.js production route and sitemap generation
- Server lead validation and team routing

The build is not sufficient on its own to mark the release complete.

## Manual UAT Evidence

Record actual evidence rather than a verbal approval:

- Route and link test log
- Device and browser matrix
- Screen-reader and keyboard test log
- Lighthouse/Lab and Core Web Vitals field reports
- Form submission and CRM routing evidence
- Acknowledgement email/SMS or CRM task evidence
- Privacy/cookie consent and revoke test
- Production deployment and rollback record
- Backup and restore test
- Monitoring and alert test
- Asset licence and approval register
- Figma/source/account handover receipt

## Sign-Off

The final release sign-off should identify:

- Sanatan project owner
- Technical approver
- Content approver
- Legal and compliance approver
- Test evidence references
- Known limitations or accepted exceptions
- Approval date
- Go-live target
- Post-launch support period
