# Content, Legal, Security and Governance Readiness

## Content Freeze

The site is a development prototype. Do not treat visible copy, component marks, example imagery or service descriptions as final approved brand or legal material. Replace or approve each item before production publishing.

| Content or asset | Approval owner | Status / gate |
| --- | --- | --- |
| Final logo files and variants | Management / Brand | Pending. Current S-mark is a temporary code-rendered mark. |
| Brand tokens and usage rules | Management / Brand | Palette is implemented from the working direction; formal approval pending. |
| Legal entity, company profile and verified contacts | Management / Legal / Admin | Pending. No unverified company details are invented. |
| Exact service list and launch availability | Business heads | Pending. Availability is stated as requiring individual confirmation. |
| Club pricing, benefits, entitlements and contract | Membership / Legal / Finance | Pending. No draft price or guaranteed benefit is published. |
| Aviation operator identity and approved claims | Aviation / Compliance | Pending. No operator ownership, NSOP or live availability claim is made. |
| Partner names, logos and permissions | Partnership / Legal | Pending. No partner logo or endorsement is shown. |
| Leadership details and approved portraits | Management / HR | Pending. No leadership profiles are fabricated. |
| Office address, phone, email and photographs | Admin | The Kolhapur address from the supplied project brief is displayed. Phone, email and office photography remain pending approval. |
| Franchise terms and investment figures | Franchise / Legal / Finance | Pending. Components are separated; amounts and earnings claims are omitted. |
| Destinations and supplier agreements | Travel team | Pending. Destination discovery has no results until approved coverage data is configured. |
| Policies and customer escalation details | Legal / Operations | Pending. `/privacy-policy` is a pre-launch notice, not an approved policy. |
| Social accounts and brand handles | Marketing | Pending. No social links are invented. |
| Image rights and licenses | Marketing / Legal | Pending. Current Unsplash images are development visuals; secure usage rights before launch. |

## Security Controls in the Frontend

- `NEXT_PUBLIC_*` environment values are public configuration only. API and CRM secrets must remain server-side.
- Next.js sends `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` and `Cross-Origin-Opener-Policy` headers.
- HSTS is disabled by default. Set `ENABLE_HSTS=true` only when the production site is confirmed HTTPS-only and the value is included at build time.
- Lead forms require explicit consent and are blocked until the approved Privacy Policy flag and secure endpoint are configured.
- Zod validation runs in the browser. The receiving server must repeat validation, sanitize values, enforce CSRF protections where relevant, and apply rate limits and bot protection.
- Optional CVs are restricted in the browser to PDF, DOC or DOCX under 5 MB. No upload endpoint exists; server-side content inspection, malware scanning, access control and retention are launch blockers.
- Forms do not request payment-card details, passport scans or medical records. Air-ambulance forms are not emergency dispatch and warn against sharing medical records.
- No CSP is enabled yet. A nonce-based policy must be designed with the production analytics, font and AI endpoint requirements before enforcing CSP.
- No payment flow or card data storage is implemented.

## Approval and Release Gates

1. Management, Legal, Finance, service owners and Marketing approve content, figures, image rights, partner identities and policy wording.
2. Legal publishes the final Privacy Policy, terms and service-specific disclaimers, including the data controller, purposes, retention, recipients, rights and privacy contact.
3. A server-side CRM endpoint is implemented and security-tested for schema validation, routing, timestamps, customer acknowledgement, rate limits, CAPTCHA policy, CSRF, secure upload scanning and retention.
4. Confirm the production HTTPS domain and set `SITE_URL`, `NEXT_PUBLIC_SITE_URL` and `ENABLE_HSTS=true` only for the HTTPS deployment.
5. Configure company-controlled hosting, repository, CMS, analytics, backups, rollback, CI/CD, monitoring and administrator MFA/roles.
6. Complete browser, keyboard, screen-reader, WCAG 2.2 AA, Lighthouse, real-device and Core Web Vitals checks before launch.
7. Deliver the approved sitemap, user journeys, Figma system/prototype, CMS guide, API map, QA report and access handover through company-controlled accounts.

## Production Content Freeze Checklist

Do not publish or enable a release until the following sign-offs are complete:

- [ ] Management and the Brand team approve the final SVG/PNG/monochrome logo and brand usage rules.
- [ ] Management and Legal approve the legal entity profile, CIN/GST details and exact office address.
- [ ] Business heads approve the launch service list and exact availability statement.
- [ ] Membership, Legal and Finance approve prices, inclusions, exclusions, validity and contract terms.
- [ ] Aviation and Compliance approve operator names, aircraft claims and permitted aviation disclosures.
- [ ] The Partnership team and Legal approve partner names, logos and written usage permissions.
- [ ] Management and HR approve leadership names, roles, biographies and portraits with individual consent.
- [ ] Admin approves office photographs and verified public contact details.
- [ ] Franchise, Legal and Finance approve territory terms, investment components, disclaimers and legally reviewed projections.
- [ ] Travel operations approve destination coverage, accommodation categories and supplier agreements.
- [ ] Operations approves FAQs and complaint/escalation procedures.
- [ ] Legal counsel approves Privacy, Terms, Membership, Refund/Cancellation, Franchise and Aviation documents.
- [ ] Marketing approves social handles and photography/video licence records.

Draft benefit tables, franchise ROI calculations, operator badges and guaranteed membership promises must remain unpublished until every responsible approver signs the exact wording and commercial terms.

## Governance

One company project owner should approve scope and content. Each page needs a named content owner and approver. Any new portal, payment, integration, or workflow requires written change control. Publishing authority, credentials, Figma, source, hosting and analytics ownership must remain with Sanatan.
