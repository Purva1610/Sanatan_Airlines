import { getRouteMetadata, publicRoutes } from './seo.js';

const CURATED = [
  {
    path: '/about',
    title: 'About Sanatan Airlines',
    text: 'Sanatan Airlines Private Limited coordinates three connected areas: aviation facilitation, an International Club membership concept and global services. Each service starts with a clear brief and confirmed next steps; eligibility, availability and terms always require individual confirmation.',
    keywords: ['company', 'about', 'who', 'sanatan', 'three', 'services'],
  },
  {
    path: '/contact',
    title: 'Contact and office',
    text: 'The registered office shown on the website is Office No. 309, Elixa Park, Old Pune-Bangalore Highway, Shahupuri, Kolhapur, Maharashtra 416001, India. Public phone and email details are pending approval; use the enquiry or contact form on the website.',
    keywords: ['contact', 'address', 'office', 'kolhapur', 'phone', 'email', 'location'],
  },
  {
    path: '/enquire',
    title: 'How the enquiry process works',
    text: 'The enquiry form has three steps: choose a service, share relevant details, then add contact information and consent. It is a conversation request, not a booking. Progress is not saved and no price, availability or outcome is confirmed by submitting.',
    keywords: ['enquiry', 'enquire', 'form', 'process', 'steps', 'contact', 'start'],
  },
  {
    path: '/',
    title: 'Enquiry journey',
    text: 'The service journey is: enquire with your brief, a consultation to clarify timing and requirements, confirmation of suitable options, partners and terms, then fulfilment with coordination. No stage implies a guaranteed booking or outcome.',
    keywords: ['process', 'consultation', 'confirmation', 'fulfilment', 'next steps'],
  },
  {
    path: '/aviation',
    title: 'Aviation services offered',
    text: 'Aviation services include private jet charter, helicopter charter, non-emergency air ambulance coordination, aircraft advisory, aircraft leasing, aviation concierge and international charter. All flights are subject to operator licensing, route, availability and confirmation.',
    keywords: ['aviation', 'jet', 'helicopter', 'ambulance', 'charter', 'leasing', 'concierge', 'aircraft', 'services'],
  },
  {
    path: '/aviation',
    title: 'Pricing and availability',
    text: 'Live aircraft availability, instant charter pricing, membership prices and franchise figures are not published. Operator identity, aircraft, availability and commercial terms are confirmed individually after an enquiry.',
    keywords: ['price', 'pricing', 'cost', 'quote', 'availability', 'live', 'how much', 'fee'],
  },
  {
    path: '/compliance',
    title: 'Service boundaries',
    text: 'Sanatan Airlines does not guarantee bookings, visas, jobs, admissions, investment returns, franchise earnings or any other service outcome. Decisions rest with operators, employers, institutions, authorities or approved partners. Regulated services require appropriately authorised providers.',
    keywords: ['guarantee', 'promise', 'outcome', 'visa', 'job', 'admission', 'return', 'earnings'],
  },
  {
    path: '/aviation/air-ambulance',
    title: 'Air ambulance and emergencies',
    text: 'Air ambulance support is for non-emergency medical transfer enquiries only. This website is not emergency dispatch. For urgent symptoms or an emergency, call local emergency services immediately. Do not send medical records, and clinical or operator suitability must be confirmed.',
    keywords: ['emergency', 'ambulance', 'medical', 'urgent', 'patient', 'hospital', 'symptom', 'critical'],
  },
  {
    path: '/aviation/private-jet-charter',
    title: 'Private jet charter',
    text: 'Private jet charter enquiries ask for departure and destination, trip type, travel date, passenger count and any aircraft preference. Aircraft, operator, availability and price are confirmed only after review, subject to licensing and route permissions.',
    keywords: ['jet', 'private', 'charter', 'flight', 'aircraft', 'departure', 'destination', 'passengers'],
  },
  {
    path: '/aviation/helicopter-charter',
    title: 'Helicopter charter',
    text: 'Helicopter charter enquiries ask for pickup and drop-off locations, date and time, passenger count and purpose. Local availability, landing permissions and operator confirmation are required before any service is agreed.',
    keywords: ['helicopter', 'rotorcraft', 'pickup', 'dropoff', 'landing', 'charter'],
  },
  {
    path: '/aviation/aircraft-advisory',
    title: 'Aircraft advisory',
    text: 'Aircraft advisory covers acquisition, sale and related advisory conversations. The site does not publish valuations, listings or transaction terms, and no transaction outcome is guaranteed.',
    keywords: ['aircraft', 'advisory', 'buy', 'sell', 'acquisition', 'valuation'],
  },
  {
    path: '/aviation/aircraft-leasing',
    title: 'Aircraft leasing',
    text: 'Aircraft leasing information covers potential lease structures and intended use. Terms depend on lessors, credit and regulatory approvals, due diligence and final agreements.',
    keywords: ['leasing', 'lease', 'aircraft', 'lessor', 'terms'],
  },
  {
    path: '/aviation/aviation-concierge',
    title: 'Aviation concierge',
    text: 'Aviation concierge helps coordinate aviation-related requests around an itinerary. Support depends on approved partners, location and availability, and is confirmed case by case.',
    keywords: ['concierge', 'coordination', 'itinerary', 'ground', 'support'],
  },
  {
    path: '/aviation/international-charter',
    title: 'International charter',
    text: 'International charter covers cross-border charter enquiries. Routes, permissions, operator approvals and applicable regulations must be confirmed individually before any service is agreed.',
    keywords: ['international', 'cross-border', 'charter', 'route', 'permission'],
  },
  {
    path: '/club',
    title: 'International Club overview',
    text: 'The International Club is a membership concept for individuals, couples and families planning international travel with personal coordination. Benefits, eligibility, destinations, pricing and final terms are still being finalised and are not published or guaranteed.',
    keywords: ['club', 'membership', 'international', 'travel', 'plan', 'benefits'],
  },
  {
    path: '/club/membership',
    title: 'Membership formats',
    text: 'Membership formats are Single for one traveller, Couple for two travellers and Family for a household. Pricing, inclusions and final terms are pending approval; no entitlement exists until confirmed in writing.',
    keywords: ['membership', 'single', 'couple', 'family', 'plan', 'price', 'format'],
  },
  {
    path: '/club/benefits',
    title: 'Membership benefits',
    text: 'Membership benefits and included services are not yet approved or published. The site does not promise savings, discounts, upgrades or destination availability.',
    keywords: ['benefits', 'included', 'savings', 'discount', 'upgrade'],
  },
  {
    path: '/club/destinations',
    title: 'Membership destinations',
    text: 'No live destination or coverage map is published. Destinations, partner support and entitlements are checked individually and are only confirmed after approval.',
    keywords: ['destinations', 'coverage', 'map', 'countries', 'places'],
  },
  {
    path: '/club/how-it-works',
    title: 'How membership works',
    text: 'Membership steps and terms are explained on the site, but final eligibility, inclusions and conditions remain subject to approval. Nothing is activated until terms are confirmed and agreed.',
    keywords: ['membership', 'how', 'works', 'eligibility', 'terms'],
  },
  {
    path: '/club/terms',
    title: 'Membership terms',
    text: 'Membership terms are pending approval. No final pricing, cancellation, transfer or entitlement terms are currently published.',
    keywords: ['membership', 'terms', 'cancellation', 'transfer', 'entitlement'],
  },
  {
    path: '/global-services',
    title: 'Global services overview',
    text: 'Global services provide information, consultation and carefully scoped introductions for international tours, education, employment assistance, business setup, property, investment facilitation, PR and branding, and trade. Outcomes depend on partners, eligibility and applicable regulations.',
    keywords: ['global', 'services', 'international', 'abroad', 'overseas', 'introductions'],
  },
  {
    path: '/global-services/tours',
    title: 'International tours',
    text: 'International tours assistance covers trip planning and itinerary enquiries, subject to partner availability. No live packages or prices are published and no booking is guaranteed.',
    keywords: ['tours', 'travel', 'trip', 'itinerary', 'holiday', 'packages'],
  },
  {
    path: '/global-services/education',
    title: 'Overseas education',
    text: 'Overseas education assistance offers initial guidance for international study enquiries. Admissions, scholarships and visas are decided by institutions and authorities and are not guaranteed.',
    keywords: ['education', 'study', 'university', 'admission', 'college', 'student', 'visa'],
  },
  {
    path: '/global-services/employment',
    title: 'Overseas employment assistance',
    text: 'Overseas employment assistance provides information and introductions where appropriate. Jobs, work permits and visas are not guaranteed; employers and authorities make those decisions.',
    keywords: ['employment', 'job', 'work', 'career', 'visa', 'work permit'],
  },
  {
    path: '/global-services/business',
    title: 'International business services',
    text: 'International business services explore cross-border setup questions. The site does not provide legal, tax or regulatory advice and does not guarantee incorporation or approvals.',
    keywords: ['business', 'setup', 'company', 'incorporation', 'cross-border'],
  },
  {
    path: '/global-services/property',
    title: 'International property assistance',
    text: 'Property assistance is an initial conversation about overseas property interests. No listings, valuations, legal advice or purchase outcomes are provided or guaranteed.',
    keywords: ['property', 'real estate', 'house', 'apartment', 'buy', 'overseas'],
  },
  {
    path: '/global-services/investment',
    title: 'Investment facilitation',
    text: 'Investment facilitation is enquiry-only. No return, profit or payback is promised, and the site does not provide regulated investment or financial advice. Consult a suitably registered professional.',
    keywords: ['investment', 'return', 'profit', 'roi', 'payback', 'financial advice'],
  },
  {
    path: '/global-services/pr',
    title: 'PR and branding',
    text: 'PR and branding support discusses communications for international audiences. No media coverage, placement or outcome is guaranteed.',
    keywords: ['pr', 'branding', 'media', 'public relations', 'communications'],
  },
  {
    path: '/global-services/trade',
    title: 'Trade and import-export',
    text: 'Trade and import-export discussions cover partner requirements and cross-border enquiries. No trade volume, approval or outcome is guaranteed.',
    keywords: ['trade', 'import', 'export', 'customs', 'supplier', 'partner'],
  },
  {
    path: '/franchise',
    title: 'Franchise overview',
    text: 'Franchise information covers the local business concept, applicant profile, responsibilities and application stages. Territory availability, investment figures, fees, support commitments and earnings are not published or guaranteed.',
    keywords: ['franchise', 'territory', 'opportunity', 'business', 'investment', 'earnings'],
  },
  {
    path: '/franchise/opportunity',
    title: 'Franchise opportunity',
    text: 'The franchise opportunity describes a local business concept and expected applicant profile. Commercial terms and support commitments are not published until approved.',
    keywords: ['franchise', 'opportunity', 'applicant', 'profile', 'concept'],
  },
  {
    path: '/franchise/investment',
    title: 'Franchise investment',
    text: 'Franchise investment figures and components are not published. Any financial information is subject to final review and a written agreement, with no earnings or return guaranteed.',
    keywords: ['franchise', 'investment', 'fees', 'cost', 'money', 'return'],
  },
  {
    path: '/franchise/support',
    title: 'Franchise support',
    text: 'Franchise support, training and marketing commitments are not yet final. Approved terms will be shared before any commitment is made.',
    keywords: ['franchise', 'support', 'training', 'marketing', 'help'],
  },
  {
    path: '/franchise/apply',
    title: 'Franchise application',
    text: 'The franchise application asks for city and state, preferred territory, business experience and contact details. Submitting an application does not guarantee approval or territory allocation.',
    keywords: ['franchise', 'apply', 'application', 'territory', 'city', 'experience'],
  },
  {
    path: '/franchise/disclaimer',
    title: 'Franchise disclaimer',
    text: 'No earnings or investment returns are guaranteed. Financial information is subject to final review and written agreement, and any figures shown elsewhere are not an offer.',
    keywords: ['franchise', 'disclaimer', 'guarantee', 'earnings', 'returns'],
  },
  {
    path: '/careers',
    title: 'Careers',
    text: 'The careers page accepts expressions of interest. Roles may not yet be approved or published, and an application does not guarantee employment or a response timeline.',
    keywords: ['careers', 'jobs', 'apply', 'employment', 'hiring', 'work with us'],
  },
  {
    path: '/partners',
    title: 'Partners and credentials',
    text: 'Partner names, operator identities and credentials are shared only when relevant, verified and approved for publication. The site does not display unapproved logos or endorsements.',
    keywords: ['partners', 'credentials', 'operators', 'verified', 'endorsement'],
  },
  {
    path: '/partners/enquiry',
    title: 'Partner enquiries',
    text: 'Partnership enquiries are reviewed individually. Partner status and authorisation require verification; submitting an enquiry does not create a partnership.',
    keywords: ['partner', 'enquiry', 'partnership', 'collaboration'],
  },
  {
    path: '/faqs',
    title: 'General FAQs',
    text: 'The FAQs explain general services and the enquiry process. Specific pricing, operator details, availability and entitlements are confirmed individually rather than published.',
    keywords: ['faq', 'questions', 'answers', 'help'],
  },
  {
    path: '/leadership',
    title: 'Leadership',
    text: 'Leadership profiles are not published yet and will appear after approval.',
    keywords: ['leadership', 'team', 'management', 'directors', 'founders'],
  },
  {
    path: '/insights',
    title: 'Insights',
    text: 'Editorial articles and insights are being prepared. No articles are currently published.',
    keywords: ['insights', 'articles', 'blog', 'journal', 'news'],
  },
  {
    path: '/privacy-policy',
    title: 'Privacy and data',
    text: 'The Privacy Policy is a pre-launch notice; the approved policy is pending publication. Do not submit medical records, passport copies or financial account information through the site. Form data is not transmitted until secure endpoints and approvals are configured.',
    keywords: ['privacy', 'data', 'personal', 'gdpr', 'consent', 'records', 'passport'],
  },
  {
    path: '/terms',
    title: 'Terms of use',
    text: 'Terms of Use, Cookie Policy, Cancellation and Refund, Accessibility and Grievance content are pending approval. No final legal terms or refund policy are published.',
    keywords: ['terms', 'legal', 'cookie', 'refund', 'cancellation', 'accessibility', 'grievance'],
  },
  {
    path: '/accessibility',
    title: 'Accessibility',
    text: 'Accessibility information and feedback channels are pending approval. Until then, use the contact page to raise an accessibility request.',
    keywords: ['accessibility', 'disability', 'feedback', 'support'],
  },
  {
    path: '/grievance',
    title: 'Grievances',
    text: 'Grievance contact details are pending approval. Use the contact page in the meantime; no response time is guaranteed yet.',
    keywords: ['grievance', 'complaint', 'feedback', 'issue'],
  },
];

const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'do', 'does', 'for', 'from', 'has', 'have',
  'how', 'i', 'if', 'in', 'is', 'it', 'me', 'my', 'of', 'on', 'or', 'our', 'please', 'tell', 'that',
  'the', 'their', 'there', 'this', 'to', 'was', 'we', 'what', 'when', 'where', 'which', 'who', 'why',
  'will', 'with', 'you', 'your', 'about', 'any', 'need', 'want',
]);

function tokenize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .map((term) => term.replace(/-/g, ''))
    .filter((term) => term.length > 2 && !STOPWORDS.has(term))
    .map((term) => (term.length > 4 && term.endsWith('s') ? term.slice(0, -1) : term));
}

const curatedPaths = new Set(CURATED.map((chunk) => chunk.path));

// Route descriptions are generic for many pages, so they only fill gaps the curated set does not cover.
const routeChunks = publicRoutes
  .filter((path) => !curatedPaths.has(path))
  .map((path) => {
    const page = getRouteMetadata(path);
    return { path, title: page.title, text: page.description, keywords: tokenize(`${page.title} ${page.description}`) };
  });

const chunks = [
  ...CURATED.map((chunk) => ({ ...chunk, curated: true })),
  ...routeChunks.map((chunk) => ({ ...chunk, curated: false })),
]
  .filter((chunk) => publicRoutes.includes(chunk.path))
  .map((chunk) => ({ ...chunk, terms: tokenize(`${chunk.title} ${chunk.text} ${(chunk.keywords || []).join(' ')}`) }));

const documentFrequency = new Map();
for (const chunk of chunks) {
  for (const term of new Set(chunk.terms)) documentFrequency.set(term, (documentFrequency.get(term) || 0) + 1);
}

export function retrieveKnowledge(question, page = '/', limit = 4) {
  const queryTerms = [...new Set(tokenize(question))];
  if (queryTerms.length === 0) return [];

  const scored = chunks.map((chunk) => {
    const counts = new Map();
    for (const term of chunk.terms) counts.set(term, (counts.get(term) || 0) + 1);
    let score = 0;
    for (const term of queryTerms) {
      const frequency = counts.get(term) || 0;
      if (!frequency) continue;
      const idf = Math.log(1 + chunks.length / (1 + (documentFrequency.get(term) || 1)));
      score += (1 + Math.log(frequency)) * idf;
    }
    if (score === 0) return { path: chunk.path, title: chunk.title, text: chunk.text, score: 0 };
    if (chunk.curated) score += 1.5;
    if (chunk.path === page) score += 1.5;
    const titleTerms = new Set(tokenize(chunk.title));
    if (queryTerms.some((term) => titleTerms.has(term))) score += 1;
    return { path: chunk.path, title: chunk.title, text: chunk.text, score };
  }).filter((chunk) => chunk.score > 0.4);

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

export function sourcePaths(matches) {
  return [...new Set(matches.map((match) => match.path))].slice(0, 3);
}

export const assistantKnowledgeSize = chunks.length;
