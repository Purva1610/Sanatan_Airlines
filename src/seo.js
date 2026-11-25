const titles = {
  '/': 'Home',
  '/aviation': 'Aviation Services',
  '/aviation/private-jet-charter': 'Private Jet Charter Coordination',
  '/aviation/helicopter-charter': 'Helicopter Charter Coordination',
  '/aviation/air-ambulance': 'Air Ambulance & Medical Flight Coordination',
  '/aviation/aircraft-advisory': 'Aircraft Advisory & Leasing Coordination',
  '/aviation/aircraft-leasing': 'Aircraft Leasing Coordination',
  '/aviation/aviation-concierge': 'Aviation Concierge',
  '/aviation/international-charter': 'International Charter',
  '/aviation/concierge': 'Aviation Concierge',
  '/tirth-yatra': 'Tirth Yatra Coordination',
  '/tirth-yatra/enquiry': 'Tirth Yatra Enquiry',
  '/club': 'Sanatan International Club',
  '/club/membership': 'Membership Enquiry',
  '/club/single': 'Single Membership',
  '/club/couple': 'Couple Membership',
  '/club/family': 'Family Membership',
  '/club/benefits': 'Membership Benefits',
  '/club/destinations': 'Membership Destinations',
  '/club/how-it-works': 'How Membership Works',
  '/club/faqs': 'Membership FAQs',
  '/club/terms': 'Membership Terms',
  '/global-services': 'Global Services',
  '/global-services/tours': 'Tours & Yatra',
  '/global-services/education': 'Overseas Education',
  '/global-services/employment': 'Overseas Employment Assistance',
  '/global-services/business': 'Business Setup',
  '/global-services/property': 'Property Coordination',
  '/global-services/investment': 'Investment Facilitation',
  '/global-services/pr': 'PR & Branding',
  '/global-services/trade': 'Trade & Import-Export',
  '/franchise': 'Franchise',
  '/franchise/opportunity': 'Franchise Opportunity',
  '/franchise/investment': 'Franchise Investment Overview',
  '/franchise/support': 'Franchise Support',
  '/franchise/apply': 'Franchise Application',
  '/franchise/faqs': 'Franchise FAQs',
  '/franchise/disclaimer': 'Franchise Disclaimer',
  '/membership-terms': 'Membership Terms',
  '/terms-and-conditions': 'Terms and Conditions',
  '/cancellation-refund-policy': 'Cancellation and Refund Policy',
  '/franchise-disclaimer': 'Franchise Disclaimer',
  '/aviation-disclaimer': 'Aviation Disclaimer',
  '/grievance-redressal': 'Grievance and Complaints',
  '/about': 'About Sanatan Airlines',
  '/leadership': 'Leadership',
  '/contact': 'Contact Sanatan Airlines',
  '/partners': 'Partners & Credentials',
  '/compliance': 'Governance & Compliance',
  '/insights': 'Insights',
  '/faqs': 'Frequently Asked Questions',
  '/terms': 'Terms of Use',
  '/cookie-policy': 'Cookie Policy',
  '/cancellation-refund': 'Cancellation & Refund',
  '/aviation/disclaimer': 'Aviation Disclaimer',
  '/accessibility': 'Accessibility',
  '/grievance': 'Grievance & Complaints',
  '/partners/enquiry': 'Partner Enquiry',
  '/careers': 'Careers',
  '/privacy-policy': 'Privacy Policy',
  '/enquire': 'Start an Enquiry',
};

export function getRouteMetadata(pathname) {
  const title = titles[pathname] || 'Sanatan Airlines';
  let description = 'Personal coordination across aviation, international membership and global services.';
  if (pathname === '/aviation') description = 'Private jet, helicopter and air ambulance coordination, aircraft advisory and leasing — arranged through licensed operators, with no live booking.';
  else if (pathname === '/about') description = 'About Sanatan Airlines Private Limited: our story, mission, operating model, service principles and governance, from our office in Kolhapur.';
  else if (pathname === '/aviation/private-jet-charter') description = 'Confidential private jet charter coordination for business, family and pilgrimage journeys. Subject to route, aircraft availability and licensed operator confirmation.';
  else if (pathname === '/aviation/helicopter-charter') description = 'Helicopter charter coordination for remote access, yatra support and short transfers — subject to landing permissions, weather and operator confirmation.';
  else if (pathname === '/aviation/air-ambulance') description = 'Non-emergency air ambulance and medical flight coordination enquiry, handled with care and confidentiality. This website is not an emergency dispatch channel.';
  else if (pathname === '/aviation/aircraft-advisory') description = 'Independent advisory for buying, selling or leasing an aircraft, through verified partners. Sanatan coordinates and does not own or operate aircraft.';
  else if (pathname === '/aviation/aircraft-leasing') description = 'Aircraft leasing coordination through verified partners, subject to counterparty, due diligence and contract confirmation.';
  else if (pathname.startsWith('/aviation/')) description = `${title} information and service-specific enquiry. Availability, operators and terms require individual confirmation.`;
  else if (pathname === '/tirth-yatra') description = 'Tirth Yatra coordination for Char Dham, Jyotirlinga, Shaktipeeth and Ashtavinayak journeys — arranged through partners, subject to availability.';
  else if (pathname === '/tirth-yatra/enquiry') description = 'Request a Tirth Yatra enquiry and speak with a coordinator about possible pilgrimage options. Final arrangements depend on partner availability and temple schedules.';
  else if (pathname === '/club') description = 'Sanatan International Club: travel membership for individuals, couples and families, with pilgrimage guidance and international trip coordination.';
  else if (pathname === '/club/membership') description = 'Request International Club membership information — travel coordination and pilgrimage guidance for individuals, couples and families.';
  else if (pathname.startsWith('/club')) description = `${title} information for Sanatan International Club. Plan terms, pricing and entitlements remain subject to approval.`;
  else if (pathname === '/global-services/tours') description = 'Domestic and international tours, yatra itineraries and cultural travel, coordinated with partners and subject to availability and local rules.';
  else if (pathname === '/global-services/education') description = 'Course and country guidance, application support and documentation coordination for overseas study. Admissions and visas are decided by institutions and authorities.';
  else if (pathname === '/global-services/employment') description = 'Guidance and coordination for overseas employment enquiries, including profile and documentation support. Employers make hiring decisions; no job or visa is guaranteed.';
  else if (pathname === '/global-services/business') description = 'Market entry and business setup coordination through local partners, subject to local laws, partner availability and regulatory approvals.';
  else if (pathname === '/global-services/property') description = 'Property search coordination, due-diligence support and transaction guidance through partners. Sanatan does not sell property or guarantee a transaction.';
  else if (pathname === '/global-services/investment') description = 'General investment opportunity awareness and introductory coordination only. No investment advice or return guarantees; all investments carry risk.';
  else if (pathname === '/global-services/pr') description = 'Brand positioning, media coordination and reputation support through partners. Outcomes depend on market conditions and partner execution.';
  else if (pathname === '/global-services/trade') description = 'Trade and import-export market linkage, documentation guidance and partner coordination, subject to international regulations and compliance requirements.';
  else if (pathname.startsWith('/global-services')) description = `${title} information and enquiry. Sanatan coordinates and facilitates only; services are subject to partner availability, local regulations and final confirmation.`;
  else if (pathname.startsWith('/franchise')) description = `${title} information. Financial terms are pending approval; no earnings or returns are guaranteed.`;
  else if (pathname === '/contact') description = 'Contact Sanatan Airlines at its Kolhapur office or send a general service enquiry.';
  else if (pathname === '/leadership') description = 'Leadership profiles will be published after approval.';
  else if (pathname === '/partners') description = 'Partner names and credentials are shared only when verified and approved for publication.';
  else if (pathname === '/compliance') description = 'Service boundaries, partner disclosures and governance information for Sanatan Airlines.';
  else if (pathname === '/insights') description = 'Aviation explainers, travel guides and company updates, published after editorial review.';
  else if (pathname === '/faqs') description = 'Answers about Sanatan Airlines aviation, membership and global services — how enquiries work, what is confirmed and what is not.';
  else if (pathname === '/terms' || pathname === '/cookie-policy' || pathname === '/cancellation-refund' || pathname === '/aviation/disclaimer' || pathname === '/accessibility' || pathname === '/grievance') description = `${title} information is pending approval by the appropriate Sanatan owner and reviewer.`;
  else if (pathname === '/privacy-policy') description = 'Pre-launch privacy notice. The approved Privacy Policy is pending publication.';
  else if (pathname === '/careers') description = 'Career enquiries for Sanatan Airlines. Applications do not guarantee employment.';
  else if (pathname === '/partners/enquiry') description = 'Partner enquiries for Sanatan Airlines. Partner status and authorization require verification.';
  else if (pathname === '/enquire') description = 'Start a service-specific enquiry with Sanatan Airlines.';

  return { title, description };
}

export const publicRoutes = Object.keys(titles);

export const airlineRoutes = [
  '/airline',
  '/airline/about',
  '/airline/airport-lounges',
  '/airline/baggage',
  '/airline/book-flight',
  '/airline/business-class',
  '/airline/car-rental',
  '/airline/cargo-services',
  '/airline/check-in',
  '/airline/contact',
  '/airline/corporate-travel',
  '/airline/dangerous-goods',
  '/airline/destinations',
  '/airline/economy-class',
  '/airline/enquiry',
  '/airline/excess-baggage',
  '/airline/express-cargo',
  '/airline/extra-legroom',
  '/airline/first-class',
  '/airline/flexible-fares',
  '/airline/flight-status',
  '/airline/gift-vouchers',
  '/airline/group-travel',
  '/airline/hotel-flight',
  '/airline/in-flight-dining',
  '/airline/in-flight-entertainment',
  '/airline/live-animals-cargo',
  '/airline/manage-booking',
  '/airline/medical-clearance',
  '/airline/military-fares',
  '/airline/multi-city',
  '/airline/musical-instruments',
  '/airline/our-fleet',
  '/airline/pet-travel',
  '/airline/premium-economy',
  '/airline/round-the-world',
  '/airline/seat-selection',
  '/airline/senior-fares',
  '/airline/skynova-rewards',
  '/airline/special-assistance',
  '/airline/sports-equipment',
  '/airline/student-fares',
  '/airline/sustainability',
  '/airline/travel-insurance',
  '/airline/unaccompanied-minors',
  '/airline/wheelchair-assistance',
];

/* Permanently redirected to their canonical page (next.config.mjs) — never listed in the sitemap. */
export const redirectedRoutes = ['/terms', '/grievance', '/cancellation-refund', '/aviation/disclaimer', '/franchise/disclaimer', '/aviation/aviation-concierge'];

export const noIndexRoutes = [
  '/partners/enquiry',
  '/careers',
  '/leadership',
  '/partners',
  '/insights',
  '/enquire',
  '/airline/book-flight',
  '/airline/check-in',
  '/airline/enquiry',
  '/airline/flight-status',
  '/airline/manage-booking',
];
