# Initial Public Website Scope

The initial release is an information, lead-generation and consultation website. It does not provide live bookings, operational systems or guaranteed service outcomes.

## Included

- Public corporate, aviation, International Club, global-services and franchise information pages
- Service-specific enquiry and consultation forms
- Lead validation, routing and confirmed receipt references
- Partner and legal disclosures
- Sitemap, breadcrumbs, canonical metadata and 404 handling
- Responsive public navigation and mobile enquiry actions
- Static public content and server-side lead storage

## Not Included

The following require separately approved scope, budget, legal review and backend architecture:

- Full airline reservation or ticketing engine
- Live aircraft inventory or guaranteed instant charter quotations
- Flight operations, dispatch, crew scheduling or aircraft maintenance
- Medical case management or emergency dispatch
- Membership wallet, points, redemption or long-term liability accounting
- Franchise ERP, commission, payout or accounting systems
- Investment marketplace, job-placement or property-transaction platform
- Native Android or iOS applications

## Routing Boundary

Legacy `/airline/*` development routes are outside the initial public release:

- `/airline` redirects to `/`
- `/airline/*` redirects to `/aviation`

These routes are excluded from the public sitemap and must not be presented as live reservation, ticketing or flight-operation systems.

## Future Product Gate

No future product may be enabled from the public lead website until management approves written requirements covering scope, legal obligations, integrations, authentication, security, commercial terms, data retention, testing and operational ownership.
