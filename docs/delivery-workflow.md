# Design and Development Delivery Workflow

This document records the implementation workflow and the approval gates that remain before production release.

| Step | Activity | Deliverable / approval gate | Current status |
| --- | --- | --- | --- |
| 1 | Kick-off and discovery | Confirmed scope, audience, launch services, goals and decision makers | Partially documented; management sign-off pending |
| 2 | Content and sitemap approval | Approved navigation, routes, page objectives and CTA map | Prototype sitemap and navigation implemented; management sign-off pending |
| 3 | Competitor and visual research | Moodboard, references, image direction and brand proposal | Working visual direction implemented; formal brand approval pending |
| 4 | Low-fidelity wireframes | Homepage, aviation, Club, franchise, contact and mobile navigation | Responsive templates implemented; formal Figma sign-off pending |
| 5 | UI design system | Figma styles, tokens, components and interaction states | Code design tokens and reusable patterns implemented; Figma library pending |
| 6 | High-fidelity page designs | Desktop, tablet and mobile P0 templates | Responsive code templates implemented; management approval pending |
| 7 | Prototype review | Clickable prototype and management sign-off | Prototype approval gate pending |
| 8 | Front-end build | Reusable React components, responsive templates, forms and routes | Implemented; CMS integration and final content remain pending |
| 9 | API and CRM integration | Lead routing, analytics consent, CRM and acknowledgements | Server validation, storage and routing implemented; CRM, CAPTCHA and acknowledgements pending |
| 10 | QA and UAT | Functional, responsive, browser, accessibility, SEO, security and performance checks | Automated build and strict type checking pass; real-device, Lighthouse, UAT and security testing pending |
| 11 | Content loading | Approved copy, assets, policies, metadata and redirects | Content freeze documented; approved copy and licensed assets pending |
| 12 | Launch and handover | Production deployment, credentials, documentation, training and support plan | Docker, migration and CI validation prepared; production environment and handover pending |

## Approval Owners

The project owner must confirm scope and final management sign-off. Content owners and approvers should be assigned separately for:

- Brand and legal entity
- Aviation and Compliance
- Membership and Finance
- Franchise and Legal
- Global services and Partnerships
- Travel operations
- Human resources and Leadership
- Marketing and image rights
- Operations and customer escalation

No draft price, franchise earnings or investment projection, operator claim, partner badge or membership benefit may be published without written approval.

## Project Governance

Sanatan management must nominate one project owner who is authorized to approve scope, design, content and change requests. The project owner remains accountable for final decisions and must keep the following registers current:

- Page content owner and approver
- Asset owner and licence/usage approval
- Integration owner and security approver
- Change-request owner, impact, cost and approval
- Milestone dependencies and delivery dates
- Named technical, legal and business contacts

Feedback for the design and build must be consolidated in Figma comments or the approved issue tracker. Informal chat messages do not replace documented decisions or acceptance records.

### Change Control

Any new page, portal, integration or workflow outside the approved brief requires written change control describing:

- Requested scope and objective
- Business, legal and technical impact
- Required budget and recurring cost
- Dependencies and target schedule
- Security, privacy and data requirements
- Project-owner, Legal and technical approvals

Work must not begin on out-of-scope items without written approval.

### Account Custody

The company must control accounts for:

- Domain and DNS
- Hosting and production infrastructure
- Source repository
- Analytics and marketing measurement
- CMS and media library
- Figma/design files
- CRM and email services
- Payment and security providers, if later approved

All administrator credentials and MFA recovery codes must be transferred to the company. A freelancer or agency must not retain personal ownership of production assets or administrative access. Accounts must use company-controlled emails and least-privilege roles. Any temporary access must be logged and revoked after handover.

## Publishing Approval

The following assets require written approval before publication:

- Aircraft and aviation photographs
- Operator names and identities
- Certificates and regulatory claims
- Client, partner or institutional logos
- Testimonials and endorsements
- Revenue, profit, ROI, payback or investment claims
- Membership, franchise or service financial promises

## Launch Readiness Summary

The following remain launch blockers:

- Approved final copy and licensed media
- Approved logo, colours and brand rules
- Approved policies and service disclaimers
- CRM delivery and customer acknowledgement
- CAPTCHA or equivalent abuse protection
- Shared production rate limits
- Approved privacy and consent configuration
- CMS publishing workflow
- HTTPS, secrets, backups and monitoring
- Staging/UAT, real-device and Core Web Vitals evidence
- Production credentials and rollback plan

## Proposed First 10 Working-Day Design Plan

This is a planning sequence, not a fixed delivery commitment. The designer must confirm realistic timing after kick-off and content review.

| Day | Proposed activity | Main dependency | Expected output |
| --- | --- | --- | --- |
| 1 | Kick-off, business understanding, target audience and competitor references | One nominated project owner and discovery participants | Scope notes, audience assumptions and reference set |
| 2 | Sitemap, navigation, CTA mapping and content inventory | Approved service scope and page owners | Route map, navigation structure and content gaps |
| 3 | Homepage low-fidelity wireframe | Sitemap and approved homepage objectives | Desktop/mobile wireframe draft |
| 4 | Aviation and International Club wireframes | Service availability and membership terms status | P0 wireframe review set |
| 5 | Global Services, Franchise and Contact wireframes | Business-owner inputs and franchise/partner constraints | P0 wireframe review set |
| 6 | Brand moodboard, colour, typography and design system | Brand references and approved management direction | Moodboard, token proposal and component direction |
| 7 | Homepage high-fidelity desktop and mobile design | Wireframe approval and working brand direction | Review-ready homepage designs |
| 8 | Key service, membership and franchise page designs | Approved P0 wireframes and content status | High-fidelity key-page designs |
| 9 | Clickable prototype and responsive review | Component library and management feedback channel | Prototype, desktop/tablet/mobile review states |
| 10 | Management presentation, feedback closure and sign-off plan | Consolidated feedback owner and issue tracker | Decision log and formal sign-off/next-step plan |

Timetable changes may be required for missing brand assets, unapproved commercial terms, legal disclaimers, approved operator claims or unavailable content owners. All feedback should be recorded in Figma or the approved issue tracker rather than in scattered chat messages.
