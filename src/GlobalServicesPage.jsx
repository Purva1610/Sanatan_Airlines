'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AlertTriangle, ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, BriefcaseBusiness, Building2, Compass, ExternalLink, GraduationCap, Globe2, Handshake, Info, Megaphone, MessagesSquare, ShieldCheck, Ship, UsersRound } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { LeadFeedback, LeadHoneypot, useLeadCapture } from './useLeadCapture.js';
import { SiteFooter, SiteHeader } from './SiteChrome.jsx';
import { FaqStructuredData } from './SeoStructuredData.jsx';
import WhyChooseSanatan from './WhyChooseSanatan.jsx';
import { partnerDisclosure } from './globalPartners.js';

const contactFields = [
  { name: 'contactName', label: 'Name', required: true, autocomplete: 'name' },
  { name: 'contactPhone', label: 'Mobile / WhatsApp number', type: 'tel', required: true, autocomplete: 'tel', defaultValue: '+91 ', pattern: '\\+?[0-9][0-9\\s.\\x2d]{6,19}', title: 'Enter an international phone number, including country code' },
  { name: 'contactEmail', label: 'Email address', type: 'email', required: true, autocomplete: 'email' },
];

/* Business / trade enquiries: a named business contact (brief: "business contact"). */
const businessContactFields = [
  { name: 'companyName', label: 'Company name', required: true, autocomplete: 'organization' },
  { name: 'contactName', label: 'Contact person', required: true, autocomplete: 'name' },
  { name: 'designation', label: 'Role / designation', optional: true, autocomplete: 'organization-title' },
  { name: 'contactEmail', label: 'Business email', type: 'email', required: true, autocomplete: 'email' },
  { name: 'contactPhone', label: 'Business phone / WhatsApp', type: 'tel', required: true, autocomplete: 'tel', defaultValue: '+91 ', pattern: '\\+?[0-9][0-9\\s.\\x2d]{6,19}', title: 'Enter an international phone number, including country code' },
  // Not "website": that name is the spam honeypot in useLeadCapture and would reject the enquiry.
  { name: 'companyWebsite', label: 'Company website', type: 'url', optional: true, autocomplete: 'url', placeholder: 'https://' },
];

/*
 * Brief: each page must clearly distinguish information, consultation and actual
 * regulated service delivery — and who is responsible for each.
 */
const STAGES = [
  { key: 'information', icon: Info, label: 'Information', who: 'This website', role: 'General information only — no advice, no commitment.' },
  { key: 'consultation', icon: MessagesSquare, label: 'Consultation', who: 'A Sanatan coordinator', role: 'Clarifies your needs and the right next step. Not legal, financial, immigration or other regulated advice.' },
  { key: 'delivery', icon: Handshake, label: 'Service delivery', who: 'An authorised partner', role: 'Any regulated service is delivered by a licensed or registered provider, named to you before you engage.' },
];

const services = {
  tours: {
    title: 'Tours & Yatra',
    heroLine: 'Journeys with meaning.',
    image: '/images/tours.jpg',
    imageAlt: 'International tours and pilgrimage journeys',
    short: 'Explore a destination and trip style before discussing arrangements.',
    information: 'Share the destinations and style of travel you are considering. This page provides an enquiry path, not a confirmed itinerary or destination recommendation.',
    consultation: 'A consultation can clarify travel preferences, dates and practical requirements. Any itinerary details should be checked against current official guidance.',
    delivery: 'Travel fulfilment is subject to partner availability and applicable regulations. Providers, inclusions and terms must be confirmed before you proceed.',
    details: [
      { title: 'Personalized journeys', copy: 'Share your dates, travel style and group needs to shape a considered enquiry.' },
      { title: 'Spiritual itineraries', copy: 'Explore pilgrimage routes and temple visits, with timing checked before arrangements.' },
      { title: 'Cultural experiences', copy: 'Discuss heritage, local experiences and practical travel preferences.' },
      { title: 'Thoughtful coordination', copy: 'Review proposed details with relevant partners before making a decision.' },
    ],
    process: [
      { title: 'Share your journey', copy: 'Tell us where you hope to go, when, and who will be travelling.' },
      { title: 'Discuss your priorities', copy: 'A coordinator listens to your pace, interests and practical needs.' },
      { title: 'Explore possibilities', copy: 'Potential routes and partner availability are checked for your enquiry.' },
      { title: 'Confirm arrangements', copy: 'Schedules, services and terms are confirmed with providers before you proceed.' },
    ],
    audience: ['Leisure travel planning', 'Small-group or family trip enquiries', 'Cultural and special-interest travel ideas', 'Early-stage destination research'],
    fields: [
      { name: 'destinations', label: 'Preferred destination or region', required: true },
      { name: 'tripStyle', label: 'Trip style', type: 'select', required: true, options: ['Culture and heritage', 'Nature and outdoors', 'City and leisure', 'Family travel', 'Other / to be discussed'] },
      { name: 'travelDates', label: 'Preferred travel dates or season' },
      { name: 'travellers', label: 'Number of travellers', type: 'number', min: 1 },
      { name: 'tripNotes', label: 'What would you like to explore?', type: 'textarea', span: 2 },
    ],
    faqs: [
      ['Are destinations or tours guaranteed?', 'No. Any itinerary, partner, destination service and availability must be confirmed for your dates and requirements.'],
      ['Are flights, hotels or activities included?', 'No inclusions are implied on this page. Confirmed components and costs must be stated by the provider before you commit.'],
      ['What should I share first?', 'A destination or region, preferred travel period, group size and broad trip style are useful starting points.'],
      ['Can temple schedules or local conditions change a plan?', 'Yes. Temple schedules, weather, local conditions and partner availability can change; details must be reconfirmed before travel.'],
    ],
    related: ['education', 'property', 'pr'],
    icon: Compass,
    notice: 'Temple schedules, partner availability and local conditions can affect travel arrangements.',
  },
  education: {
    title: 'Overseas Education',
    heroLine: 'A clearer path to study.',
    image: '/images/oversea-edu.jpg',
    imageAlt: 'Students pursuing overseas education',
    short: 'Organize your study enquiry before speaking with institutions or authorized partners.',
    information: 'Share your intended course level, subject and destination. Admission requirements and decisions are set by the relevant institution; immigration decisions are made by the appropriate authorities.',
    consultation: 'A consultation can help clarify your course interests, target intake and the type of admission assistance you are seeking. No admission or visa outcome is guaranteed.',
    delivery: 'Institution or service-partner details are named only where approved. Any assistance, fees and responsibilities must be explained before you engage a provider.',
    details: [
      { title: 'Course and country guidance', copy: 'Organize your subject interests, study level and preferred destinations.' },
      { title: 'Application process support', copy: 'Understand common application steps and questions to raise with institutions.' },
      { title: 'Documentation coordination', copy: 'Prepare a checklist of materials to discuss with the relevant institution or partner.' },
      { title: 'Partner introductions', copy: 'Where suitable and available, explore a disclosed introduction before engaging a provider.' },
    ],
    process: [
      { title: 'Share your study plans', copy: 'Outline your subject, course level, destination and intended intake.' },
      { title: 'Clarify the brief', copy: 'A coordinator helps organize your questions and information needs.' },
      { title: 'Coordinate next steps', copy: 'Application support or partner availability is explored where appropriate.' },
      { title: 'Apply through the institution', copy: 'The institution reviews your application; authorities decide any visa application.' },
    ],
    audience: ['Students exploring an overseas course', 'Applicants comparing study destinations', 'Families planning an education pathway', 'People seeking information about application steps'],
    fields: [
      { name: 'courseLevel', label: 'Course level', type: 'select', required: true, options: ['Foundation / pathway', 'Undergraduate', 'Postgraduate (Master’s)', 'Doctoral (PhD)', 'Diploma / vocational', 'Short course / language', 'Other'] },
      { name: 'subject', label: 'Subject or course area', required: true, placeholder: 'e.g. Computer science, Nursing, MBA' },
      { name: 'destination', label: 'Preferred destination', required: true, placeholder: 'e.g. UK, Canada, Germany' },
      { name: 'intake', label: 'Target intake', required: true, placeholder: 'e.g. September 2027' },
      { name: 'budget', label: 'Annual budget (tuition + living)', type: 'select', optional: true, options: ['Under ₹15 lakh', '₹15–30 lakh', '₹30–50 lakh', 'Above ₹50 lakh', 'Looking for scholarships', 'Prefer to discuss'] },
      { name: 'assistance', label: 'Admission assistance needed', type: 'select', required: true, options: ['Course and institution shortlisting', 'Application and documentation support', 'Scholarship information', 'Visa documentation checklist (not immigration advice)', 'Pre-departure guidance', 'Not sure yet'] },
      { name: 'institution', label: 'Institutions you are already considering', optional: true, span: 2, placeholder: 'Helps us avoid suggesting the same options twice' },
    ],
    faqs: [
      ['Can you guarantee admission?', 'No. Admission decisions are made by each institution and depend on its requirements and assessment.'],
      ['Can you guarantee a student visa?', 'No. Visa decisions are made by the relevant government authority. Check official requirements for your circumstances.'],
      ['Will institution partners be named?', 'Institution or partner names will be provided only where the details are approved for disclosure.'],
      ['Do you make admission decisions?', 'No. Sanatan can coordinate guidance and documentation discussions; institutions assess applications and set their own requirements.'],
    ],
    related: ['employment', 'tours', 'business'],
    icon: GraduationCap,
    notice: 'Admissions are decided by institutions and visas by authorities; Sanatan provides coordination only.',
  },
  employment: {
    title: 'Overseas Employment Assistance',
    heroLine: 'Move forward with clarity.',
    image: '/images/employeement.jpg',
    imageAlt: 'Professionals exploring overseas employment opportunities',
    short: 'Share your experience and job interests for an information-led first conversation.',
    information: 'This intake gathers a high-level profile to understand your job category, target country and experience. It does not represent a job offer, recruitment decision or immigration assessment.',
    consultation: 'A consultation may clarify the type of information or referral you are seeking. No job, placement, work authorization or visa is promised.',
    delivery: 'No authorized recruitment partner is identified on this page. Any recruitment partner and applicable authorization must be disclosed and verified before recruitment activity begins.',
    details: [
      { title: 'Opportunity awareness', copy: 'Explore general information about job categories and overseas work pathways.' },
      { title: 'Profile guidance', copy: 'Organize your experience and qualifications for a relevant first discussion.' },
      { title: 'Documentation coordination', copy: 'Understand common document questions to raise with an authorized recruiter.' },
      { title: 'Responsible introductions', copy: 'Any recruitment partner and relevant authorization must be disclosed and checked.' },
    ],
    process: [
      { title: 'Share your profile', copy: 'Outline your experience, qualifications, job category and target country.' },
      { title: 'Clarify your questions', copy: 'A coordinator helps frame the information or process guidance you need.' },
      { title: 'Check the next step', copy: 'If appropriate, partner fit, availability and authorization are reviewed.' },
      { title: 'Decide independently', copy: 'Employers make hiring decisions; you can review any terms before engaging.' },
    ],
    audience: ['People researching overseas work options', 'Applicants identifying relevant job categories', 'Workers seeking information on experience requirements', 'People preparing questions for an authorized recruiter'],
    fields: [
      { name: 'jobCategory', label: 'Job category', type: 'select', required: true, options: ['Healthcare & nursing', 'Engineering & technical', 'Construction & skilled trades', 'Hospitality & catering', 'IT & software', 'Driving & logistics', 'Care & domestic work', 'Office & administration', 'Other'] },
      { name: 'country', label: 'Target country', required: true, placeholder: 'e.g. UAE, Germany, Canada' },
      { name: 'experience', label: 'Years of relevant experience', type: 'select', required: true, options: ['Less than 1 year', '1–3 years', '3–5 years', '5–10 years', 'More than 10 years'] },
      { name: 'qualification', label: 'Highest relevant qualification', type: 'select', required: true, options: ['Below 10th', '10th pass', '12th pass', 'ITI / diploma', 'Graduate', 'Postgraduate', 'Professional licence / certification'] },
      { name: 'experienceDetails', label: 'Roles and skills', type: 'textarea', optional: true, span: 2, placeholder: 'Recent job titles, trade certificates, languages' },
      { name: 'cv', label: 'CV', type: 'file', optional: true, span: 2 },
    ],
    extraConsent: { name: 'profileSharingConsent', text: 'I consent to my profile and CV being shared only with an authorised recruitment partner named to me in advance. I understand no job, interview or visa is guaranteed and I should never pay to secure a job offer.' },
    faqs: [
      ['Can you guarantee a job or interview?', 'No. Employment outcomes depend on employers and other relevant parties. This enquiry is not a job offer or placement.'],
      ['Can you guarantee a work visa?', 'No. Visa decisions are made by the relevant government authority. No immigration outcome is promised.'],
      ['Who is the recruitment partner?', 'No authorized recruitment partner is identified here. Any partner’s identity and authorization must be verified before recruitment services are provided.'],
      ['Should I pay to secure a role?', 'Do not pay or share original documents based on an enquiry. Independently verify any recruiter, authorization, terms and applicable local rules.'],
    ],
    related: ['education', 'business', 'tours'],
    icon: UsersRound,
    notice: 'Employers decide hiring; no job or visa is guaranteed, and recruitment partners must be verified.',
    heroNotice: 'No job, interview or visa is guaranteed. Never pay anyone to secure an overseas job offer, and only deal with recruiting agents registered with the Ministry of External Affairs.',
  },
  business: {
    title: 'Business Setup',
    heroLine: 'Build your next market thoughtfully.',
    image: '/images/bussiness.jpg',
    imageAlt: 'Business setup and cross-border planning',
    short: 'Describe a cross-border business requirement for an initial discussion.',
    information: 'Share your industry, target country and the type of support you are exploring. Requirements vary by jurisdiction and business activity.',
    consultation: 'A consultation can help define the enquiry and identify what specialist or local information may be relevant. It is not legal, tax or regulated professional advice.',
    delivery: 'Company formation, legal, tax, licensing and other regulated work must be provided by appropriately authorized professionals. Partner availability and applicable regulations apply.',
    details: [
      { title: 'Market entry guidance', copy: 'Frame your target market, business activity and early information needs.' },
      { title: 'Entity setup coordination', copy: 'Coordinate process questions with suitable local service partners, where available.' },
      { title: 'Local compliance support', copy: 'Identify topics to discuss with appropriately qualified local professionals.' },
      { title: 'Partner introductions', copy: 'Explore relevant introductions after fit, credentials and scope are reviewed.' },
    ],
    process: [
      { title: 'Describe your plans', copy: 'Share your industry, target country and intended business activity.' },
      { title: 'Clarify requirements', copy: 'A coordinator helps define the information and professional support you may need.' },
      { title: 'Explore local support', copy: 'Partner availability, scope and credentials are checked before any introduction.' },
      { title: 'Confirm with specialists', copy: 'Local professionals and authorities confirm requirements and approvals.' },
    ],
    audience: ['Businesses exploring a new market', 'Founders researching business setup', 'Companies seeking trade or market introductions', 'Teams clarifying cross-border support needs'],
    fields: [
      { name: 'industry', label: 'Industry', required: true, placeholder: 'e.g. Food processing, IT services' },
      { name: 'targetCountry', label: 'Target country', required: true },
      { name: 'serviceRequired', label: 'Service required', type: 'select', required: true, options: ['Market entry information', 'Company formation enquiry', 'Local partner / distributor introduction', 'Office or banking set-up guidance', 'Other'] },
      { name: 'timeline', label: 'Estimated timeline', type: 'select', optional: true, options: ['Within 3 months', 'Within 6 months', 'Within 12 months', 'Researching'] },
      { name: 'companyProfile', label: 'Company profile', type: 'textarea', required: true, span: 2, placeholder: 'What the company does, size, current markets and what you want to set up' },
    ],
    contact: 'business',
    faqs: [
      ['Do you provide legal or tax advice?', 'This enquiry page provides general information only. Regulated or professional advice must come from an appropriately qualified and authorized adviser.'],
      ['Can you guarantee company registration?', 'No. Outcomes depend on jurisdictional requirements and relevant authorities or service providers.'],
      ['Will a local partner be introduced?', 'Any introduction depends on fit, due diligence, partner availability and applicable regulations.'],
      ['What should I prepare?', 'A brief company profile, target market, business activity and intended timeline can help frame an initial discussion.'],
    ],
    related: ['trade', 'investment', 'property'],
    icon: BriefcaseBusiness,
    notice: 'Setup depends on local laws, partner availability and regulatory approvals.',
  },
  property: {
    title: 'Property',
    heroLine: 'Explore property with care.',
    image: '/images/property.jpg',
    imageAlt: 'International property and real estate planning',
    short: 'Outline a property enquiry without assuming availability or purchase outcomes.',
    information: 'Tell us the country, property type and whether you are researching a purchase or investment. This page does not list verified properties or provide a purchase recommendation.',
    consultation: 'An initial discussion can clarify your location and property criteria. Property, tax, legal and investment decisions require independent, appropriately qualified advice.',
    delivery: 'Local partner identities and authorizations must be verified before any service is provided. No property availability, title, suitability or transaction outcome is guaranteed.',
    details: [
      { title: 'Property search coordination', copy: 'Share your location, property type and criteria to frame a search enquiry.' },
      { title: 'Due-diligence support', copy: 'Coordinate questions for independent review of title, ownership and relevant records.' },
      { title: 'Transaction guidance', copy: 'Understand process checkpoints with appropriately qualified local partners.' },
      { title: 'Verified introductions', copy: 'Partner identity and credentials are checked before a service introduction is considered.' },
    ],
    process: [
      { title: 'Set your criteria', copy: 'Outline the location, property type, use and broad requirements.' },
      { title: 'Discuss the search', copy: 'A coordinator helps clarify the information and local expertise you are seeking.' },
      { title: 'Coordinate due diligence', copy: 'Relevant checks and professional introductions are explored through partners.' },
      { title: 'Review before deciding', copy: 'You and your independent advisers review all property details and legal terms.' },
    ],
    audience: ['People researching residential property abroad', 'Businesses exploring commercial property', 'Buyers clarifying their criteria', 'Investors seeking a general referral or introduction'],
    fields: [
      { name: 'country', label: 'Country of interest', required: true, placeholder: 'e.g. UAE, UK, India' },
      { name: 'propertyType', label: 'Residential or commercial', type: 'select', required: true, options: ['Residential', 'Commercial', 'Land', 'Not sure'] },
      { name: 'intent', label: 'Buyer or investor intent', type: 'select', required: true, options: ['Buying for personal / family use', 'Buying for business use', 'Investing — rental', 'Investing — long-term hold', 'Researching'] },
      { name: 'budget', label: 'Budget range (INR equivalent)', type: 'select', optional: true, options: ['Under ₹1 crore', '₹1–3 crore', '₹3–10 crore', 'Above ₹10 crore', 'Prefer to discuss'] },
      { name: 'localPartner', label: 'Local agent or developer already in contact', optional: true, span: 2, placeholder: 'Name, if any — we can tell you what registration to check' },
      { name: 'propertyNotes', label: 'Other criteria', type: 'textarea', optional: true, span: 2, placeholder: 'Location, size, timing' },
    ],
    faqs: [
      ['Are listed properties verified or available?', 'No live listings are shown. Any property and its availability, title and terms must be independently verified before consideration.'],
      ['Do you provide property investment advice?', 'No. Property and investment decisions should be reviewed with appropriately qualified and authorized professionals.'],
      ['Will local partner details be supplied?', 'Only after identity, relevant authorization and suitability have been checked for the specific request.'],
      ['Does Sanatan sell property?', 'No. Sanatan coordinates enquiries only; any property transaction is between the relevant parties and subject to legal processes.'],
    ],
    related: ['investment', 'business', 'tours'],
    icon: Building2,
    notice: 'Sanatan does not sell property; transactions remain between parties and subject to legal processes.',
  },
  investment: {
    title: 'Investment Facilitation',
    heroLine: 'Make informed introductions.',
    image: '/images/destination-mountains.jpg',
    imageAlt: 'A star-filled mountain sky above a quiet landscape',
    short: 'General information and referral enquiries, without return promises or regulated advice.',
    information: 'This page supports general information requests and potential introductions only. It does not assess an investment or recommend a product, strategy or transaction.',
    consultation: 'A conversation can clarify what information or type of introduction you are seeking. Do not share account details or confidential financial documents through this form.',
    delivery: 'Only a suitably registered entity may provide regulated investment advice. Any referral depends on due diligence, suitability and applicable regulations.',
    details: [
      { title: 'Opportunity awareness', copy: 'Explore general information about sectors or markets without a product recommendation.' },
      { title: 'Introductory coordination', copy: 'Share the kind of professional or business introduction you are seeking.' },
      { title: 'Process guidance', copy: 'Organize questions for independent due diligence and qualified advice.' },
      { title: 'Responsible referrals', copy: 'Any introduction depends on suitability checks, partner availability and local rules.' },
    ],
    process: [
      { title: 'Describe your interest', copy: 'Share a market or sector and the type of information you are seeking.' },
      { title: 'Clarify the request', copy: 'A coordinator confirms whether information or an introduction is appropriate.' },
      { title: 'Explore a referral', copy: 'Potential partners and their relevant credentials are checked where available.' },
      { title: 'Complete due diligence', copy: 'Seek independent regulated advice and review risks before making any decision.' },
    ],
    audience: ['People seeking general market information', 'Businesses exploring potential introductions', 'Individuals identifying the right category of adviser', 'Applicants requesting a non-advisory referral'],
    fields: [
      { name: 'investorRole', label: 'You are', type: 'select', required: true, options: ['An individual looking to invest', 'A business seeking investment', 'A business seeking a co-investor or partner', 'Other'] },
      { name: 'targetCountry', label: 'Country or market of interest', required: true },
      { name: 'sector', label: 'Sector or topic', required: true, placeholder: 'e.g. Renewable energy, hospitality' },
      { name: 'requestType', label: 'What you are looking for', type: 'select', required: true, options: ['General information', 'Introduction to a SEBI-registered / licensed adviser', 'Business or co-investor introduction', 'Other'] },
      { name: 'context', label: 'Brief context', type: 'textarea', optional: true, span: 2, placeholder: 'Do not include account numbers, statements or other financial documents' },
    ],
    extraConsent: { name: 'notAdviceAcknowledged', text: 'I understand Sanatan Airlines does not give investment advice, does not assess suitability and makes no promise about returns. Any regulated advice must come from a registered adviser.' },
    faqs: [
      ['Do you provide investment advice?', 'No. This page is for general information and referral or introduction enquiries. Regulated advice must come from a suitably registered entity.'],
      ['Are returns or performance guaranteed?', 'No. No investment return, outcome or performance is promised or represented.'],
      ['Can I share financial documents?', 'Do not submit account details or confidential financial documents through this website form.'],
      ['Are all investment opportunities suitable?', 'No suitability is assessed or implied here. Carry out your own due diligence and consult an appropriately registered adviser.'],
    ],
    related: ['business', 'property', 'trade'],
    icon: BadgeCheck,
    notice: 'No investment advice or return guarantees; all investments carry risk and require due diligence.',
    heroNotice: 'Not investment advice. Sanatan Airlines is not a registered investment adviser and promises no returns. This service is limited to general information and introductions.',
  },
  pr: {
    title: 'PR & Branding',
    heroLine: 'Tell your story with intention.',
    image: '/images/pr-brand.jpg',
    imageAlt: 'Public relations and brand strategy',
    short: 'Describe your communications needs and the markets you want to reach.',
    information: 'Share your organization, target audience and communications goals. The first step is to understand the brief and whether the requested support fits.',
    consultation: 'A consultation can clarify scope, channels, content and timing. Any deliverables, fees and approvals are agreed separately.',
    delivery: 'Communications support is subject to an agreed scope and any applicable local rules. No audience reach, media placement or business outcome is guaranteed.',
    details: [
      { title: 'Brand positioning', copy: 'Clarify how you want your organization or story to be understood.' },
      { title: 'Media coordination', copy: 'Discuss relevant channels, timing and potential media relationships.' },
      { title: 'Reputation support', copy: 'Explore thoughtful communications planning through suitable partners.' },
      { title: 'Defined scope', copy: 'Agree deliverables, approvals and responsibilities before work begins.' },
    ],
    process: [
      { title: 'Share your brief', copy: 'Tell us about your organization, audience, objectives and target markets.' },
      { title: 'Shape the approach', copy: 'A coordinator clarifies channels, scope, timing and relevant questions.' },
      { title: 'Explore partner support', copy: 'Potential partner fit and availability are reviewed for your brief.' },
      { title: 'Approve the scope', copy: 'You confirm the agreed plan and deliverables with the selected provider.' },
    ],
    audience: ['Organizations entering a new market', 'Teams clarifying brand positioning', 'Businesses exploring public relations support', 'Companies seeking international communications planning'],
    fields: [
      { name: 'serviceRequired', label: 'Service required', type: 'select', required: true, options: ['Public relations', 'Brand strategy', 'Content and communications', 'Market launch support', 'Other'] },
      { name: 'organization', label: 'Organization or brand', required: true },
      { name: 'targetMarkets', label: 'Target market or audience', required: true },
      { name: 'objectives', label: 'Communications objective', type: 'textarea', required: true, span: 2 },
      { name: 'timeline', label: 'Estimated timeline' },
    ],
    faqs: [
      ['Do you guarantee media coverage or audience reach?', 'No. Media decisions and audience outcomes cannot be guaranteed. Scope and deliverables are agreed before work begins.'],
      ['Can I enquire about international branding?', 'Yes. Share the target market, audience and communications need in the form.'],
      ['Are campaign results or placements included?', 'No specific placement or result is implied. Any deliverables are defined in an approved scope.'],
      ['Who executes the work?', 'Where partner support is involved, the provider, scope, fees and responsibilities are confirmed with you before engagement.'],
    ],
    related: ['business', 'tours', 'trade'],
    icon: Megaphone,
    notice: 'Media and brand outcomes depend on market conditions and partner execution; no result is guaranteed.',
  },
  trade: {
    title: 'Trade & Import-Export',
    heroLine: 'Connect markets responsibly.',
    image: '/images/trade.jpg',
    imageAlt: 'International trade and import-export operations',
    short: 'Frame your trade requirement before exploring relevant information or introductions.',
    information: 'Describe the industry, target country and trade support you are seeking. Import, export, customs and product requirements differ by jurisdiction and goods.',
    consultation: 'An initial discussion can clarify the requirement and what further information is needed. It is not customs, legal, tax or regulatory advice.',
    delivery: 'Any trade service or introduction is subject to partner availability, due diligence and applicable regulations. Permits, customs clearance and delivery are not guaranteed.',
    details: [
      { title: 'Market linkage', copy: 'Outline your product category and target market to frame a trade enquiry.' },
      { title: 'Documentation guidance', copy: 'Organize documentation questions for the relevant trade or customs professionals.' },
      { title: 'Trade partner coordination', copy: 'Explore introductions with suitable partners, subject to availability and due diligence.' },
      { title: 'Compliance awareness', copy: 'Identify regulatory topics to confirm with qualified specialists and authorities.' },
    ],
    process: [
      { title: 'Outline the requirement', copy: 'Share your product category, route, target country and business context.' },
      { title: 'Clarify the essentials', copy: 'A coordinator helps identify information and documentation questions.' },
      { title: 'Explore trade connections', copy: 'Partner fit, availability and relevant credentials are checked.' },
      { title: 'Confirm compliance', copy: 'You and your specialists confirm permits, customs and trade requirements.' },
    ],
    audience: ['Companies researching cross-border trade', 'Businesses exploring import or export requirements', 'Organizations seeking a trade-related introduction', 'Teams preparing a market or product brief'],
    fields: [
      { name: 'industry', label: 'Industry or product category', required: true, placeholder: 'e.g. Spices, auto components' },
      { name: 'targetCountry', label: 'Target country or market', required: true },
      { name: 'serviceRequired', label: 'Service required', type: 'select', required: true, options: ['Export support enquiry', 'Import support enquiry', 'Buyer / supplier introduction', 'Market information', 'Other'] },
      { name: 'timeline', label: 'Estimated timeline', type: 'select', optional: true, options: ['Within 3 months', 'Within 6 months', 'Within 12 months', 'Researching'] },
      { name: 'companyProfile', label: 'Company profile', type: 'textarea', required: true, span: 2, placeholder: 'Products, volumes, current markets and certifications (e.g. IEC)' },
    ],
    contact: 'business',
    faqs: [
      ['Can you guarantee customs clearance or delivery?', 'No. Requirements and outcomes depend on the goods, route, documentation, providers and relevant authorities.'],
      ['Can you introduce a trade partner?', 'Any introduction depends on due diligence, fit, partner availability and applicable regulations.'],
      ['Do you provide import-export regulatory advice?', 'This page provides general information only. Obtain jurisdiction-specific advice from suitably qualified professionals.'],
      ['Can you assist with any product or market?', 'Not necessarily. Trade rules, prohibited goods, partner networks and compliance requirements vary by product and country.'],
    ],
    related: ['business', 'property', 'investment'],
    icon: Ship,
    notice: 'Trade enquiries depend on international regulations, partner networks and compliance requirements.',
  },
};

const overview = {
  title: 'Global Services',
  heroLine: 'Across borders, with clarity.',
  image: '/images/global-city.jpg',
  imageAlt: 'A camera and travel notes arranged on a detailed map',
  short: 'Information, consultation and carefully scoped introductions for cross-border plans.',
  information: 'Explore service areas spanning travel, education, employment assistance, business, property, investment facilitation, communications and trade.',
  consultation: 'Use an enquiry to explain your objective and target country. A consultation helps define the information or next-step referral you are seeking.',
  delivery: 'Regulated service delivery, where applicable, is carried out only by suitably authorized partners. Services remain subject to partner availability, due diligence and applicable regulations.',
  audience: ['Individuals researching international travel or education', 'Professionals seeking overseas employment information', 'Companies exploring international markets', 'People seeking general information or an appropriate referral'],
  fields: [
    { name: 'serviceType', label: 'Service of interest', type: 'select', required: true, options: ['International tours', 'Overseas education', 'Employment assistance', 'Business services', 'Property assistance', 'Investment facilitation', 'PR and branding', 'Trade and import-export'] },
    { name: 'targetCountry', label: 'Target country or region' },
    { name: 'objective', label: 'What would you like to explore?', type: 'textarea', span: 2 },
  ],
  faqs: [
    ['Does an enquiry confirm a service?', 'No. An enquiry is for information and consultation only. Any regulated service or partner delivery requires separate confirmation.'],
    ['Are jobs, admissions, visas or investment returns guaranteed?', 'No. Sanatan makes no guarantee about employment, admission, immigration, investment or property outcomes.'],
    ['Who delivers regulated services?', 'Where applicable, regulated work is carried out by suitably authorized partners or registered entities, identified before engagement.'],
  ],
  related: Object.keys(services),
  icon: Globe2,
  notice: 'Services are subject to partner availability, due diligence and applicable regulations. No outcome is guaranteed.',
};

const serviceNames = Object.fromEntries(Object.entries(services).map(([slug, service]) => [slug, service.title]));

function GlobalHeader({ currentPath }) {
  return <SiteHeader />;
}

function GlobalDisclosure({ notice }) {
  return <aside className="global-disclosure-strip" aria-label="Global services partner and regulatory notice"><ShieldCheck size={16} aria-hidden="true" /><p>Sanatan coordinates and facilitates enquiries only; all arrangements are subject to partner availability, local regulations, and final confirmation. {notice}</p></aside>;
}

function DestinationExplorer() {
  const [filters, setFilters] = useState({ region: '', style: '', season: '' });
  let destinations = [];
  try {
    const configured = JSON.parse(process.env.NEXT_PUBLIC_CONFIRMED_DESTINATIONS || '[]');
    if (Array.isArray(configured)) destinations = configured.filter((item) => item && typeof item.name === 'string' && typeof item.region === 'string' && Array.isArray(item.styles) && Array.isArray(item.seasons));
  } catch {
    destinations = [];
  }

  const valuesFor = (key) => [...new Set(destinations.flatMap((item) => key === 'region' ? [item.region] : item[key]).filter((value) => typeof value === 'string'))].sort();
  const matches = destinations.filter((item) => (!filters.region || item.region === filters.region)
    && (!filters.style || item.styles.includes(filters.style))
    && (!filters.season || item.seasons.includes(filters.season)));

  return (
    <section className="destination-explorer section-pad" aria-labelledby="destination-explorer-title">
      <div className="global-editorial-heading"><span className="eyebrow">DESTINATION DISCOVERY</span><h2 id="destination-explorer-title">Browse confirmed<br /><em>partner coverage.</em></h2><p>Only destinations supplied through approved partner coverage data appear here. A result is not a service or availability confirmation.</p></div>
      <div className="destination-explorer-content">
        <div className="destination-filters">
          {[
            ['region', 'Region'],
            ['style', 'Trip style'],
            ['season', 'Season'],
          ].map(([key, label]) => (
            <label key={key}><span>{label}</span><select value={filters[key]} disabled={destinations.length === 0} onChange={(event) => setFilters((current) => ({ ...current, [key]: event.target.value }))}><option value="">All {label.toLowerCase()}s</option>{valuesFor(key).map((value) => <option key={value}>{value}</option>)}</select></label>
          ))}
        </div>
        {matches.length ? <div className="destination-results" aria-live="polite">{matches.map((item) => <article key={`${item.name}-${item.region}`}><span>{item.region}</span><h3>{item.name}</h3><p>{[...item.styles, ...item.seasons].join(' · ')}</p></article>)}</div> : <p className="destination-empty" role="status">No partner-confirmed destinations are published yet.</p>}
        <p className="global-form-note">Fulfilment is subject to partner availability and applicable regulations.</p>
      </div>
    </section>
  );
}

function GlobalField({ field }) {
  const hintId = field.type === 'file' ? `${field.name}-hint` : undefined;
  const props = { id: field.name, name: field.name, required: field.required, min: field.min, autoComplete: field.autocomplete, defaultValue: field.defaultValue, pattern: field.pattern, title: field.title, 'aria-describedby': hintId };
  return (
    <label className={`global-field ${field.span === 2 ? 'field-span-two' : ''}`} htmlFor={field.name}>
      <span>
        {field.label}
        {field.required && <b aria-hidden="true"> *</b>}
        {field.optional && <em className="global-optional"> (optional)</em>}
      </span>
      {field.type === 'select' ? <select {...props} defaultValue=""><option value="" disabled={field.required}>Select an option</option>{field.options.map((option) => <option key={option}>{option}</option>)}</select>
        : field.type === 'textarea' ? <textarea {...props} rows="3" placeholder={field.placeholder || 'Add relevant details'} />
        : <input {...props} type={field.type || 'text'} placeholder={field.placeholder} accept={field.type === 'file' ? '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' : undefined} />}
      {field.type === 'file' && <small id={hintId}>PDF, DOC or DOCX, up to 5 MB. Stored securely and shared only with your consent. Do not attach passport or ID copies.</small>}
    </label>
  );
}

function GlobalEnquiryForm({ service, serviceSlug }) {
  const leadCapture = useLeadCapture('global_services');
  const contact = service.contact === 'business' ? businessContactFields : contactFields;

  return (
    <form className="global-enquiry-form" {...leadCapture.formProps}>
      <div className="global-form-heading"><div><span className="eyebrow">GLOBAL SERVICES ENQUIRY</span><h2>Tell us the essentials.</h2></div><span>INFORMATION / CONSULTATION ONLY</span></div>
      <LeadHoneypot />
      {serviceSlug !== 'overview' && <input type="hidden" name="serviceCategory" value={service.title} />}
      <div className="global-form-grid">
        <div className="global-form-divider field-span-two"><span>{serviceSlug === 'overview' ? 'WHAT YOU WOULD LIKE TO EXPLORE' : service.title.toUpperCase()}</span></div>
        {service.fields.map((field) => <GlobalField key={field.name} field={field} />)}
        <div className="global-form-divider field-span-two"><span>{service.contact === 'business' ? 'BUSINESS CONTACT' : 'YOUR CONTACT DETAILS'}</span></div>
        {contact.map((field) => <GlobalField key={field.name} field={field} />)}
        <GlobalField field={{ name: 'message', label: 'Anything else', type: 'textarea', optional: true, span: 2, placeholder: 'Share any other details that may help us understand your enquiry.' }} />
      </div>
      <p className="global-required-note"><b aria-hidden="true">*</b> Required</p>
      {service.extraConsent && (
        <label className="global-consent global-consent-strong"><input name={service.extraConsent.name} type="checkbox" value="Yes" required /><span>{service.extraConsent.text}</span></label>
      )}
      <label className="global-consent"><input name="consent" type="checkbox" required /><span>I agree to be contacted about this enquiry. I understand this form does not confirm a service or outcome. <a href="/privacy-policy">Privacy Policy</a></span></label>
      <button className="button button-dark" type="submit" disabled={leadCapture.isSubmitting}>{leadCapture.isSubmitting ? 'Sending…' : 'Submit enquiry'} <ArrowUpRight size={15} /></button>
      <LeadFeedback status={leadCapture.status} />
      <p className="global-form-note">Response timing varies with the enquiry and coordinator availability. Submitting this form does not confirm a service or outcome.</p>
      <p className="global-form-note">Please do not include sensitive financial, medical, identity or immigration documents in this form.</p>
    </form>
  );
}

/* Information · Consultation · Service delivery — who is responsible for each */
function StagesSection({ service }) {
  return (
    <section className="global-stages section-pad" aria-labelledby="global-stages-title">
      <div className="global-editorial-heading">
        <span className="eyebrow">01 / WHAT THIS SERVICE IS — AND IS NOT</span>
        <h2 id="global-stages-title">Three stages,<br /><em>clearly separated.</em></h2>
        <p>Information and consultation come from Sanatan. Regulated work is only ever delivered by an authorised partner you can verify.</p>
      </div>
      <ol className="global-stage-grid">
        {STAGES.map((stage, index) => {
          const StageIcon = stage.icon;
          return (
            <li className={`global-stage global-stage-${stage.key}`} key={stage.key}>
              <div className="global-stage-top">
                <StageIcon size={20} aria-hidden="true" />
                <span className="global-stage-step">Stage {index + 1}</span>
              </div>
              <h3>{stage.label}</h3>
              <p className="global-stage-who"><span>Provided by</span> {stage.who}</p>
              <p>{service[stage.key]}</p>
              <p className="global-stage-role">{stage.role}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* Partner & authorisation disclosure (src/globalPartners.js) */
function PartnerDisclosure({ service, slug, Icon }) {
  const disclosure = partnerDisclosure[slug];
  if (!disclosure) {
    return (
      <section className="global-delivery-note section-pad">
        <Icon size={23} aria-hidden="true" />
        <div><span className="eyebrow">PARTNER & AUTHORISATION DISCLOSURE</span><h2>Verify who delivers the service.</h2><p>{service.delivery} Ask for the provider’s identity, authorisation and scope before engaging.</p></div>
      </section>
    );
  }
  return (
    <section className="global-partners section-pad" aria-labelledby="global-partners-title">
      <div className="global-editorial-heading">
        <span className="eyebrow">PARTNER & AUTHORISATION DISCLOSURE</span>
        <h2 id="global-partners-title">{disclosure.heading}</h2>
        <p>{service.delivery}</p>
      </div>
      <div className="global-partners-body">
        {disclosure.partners.length > 0 ? (
          <div className="global-partner-table-wrap">
            <table className="global-partner-table">
              <thead><tr><th scope="col">Partner</th><th scope="col">{disclosure.registrationLabel}</th><th scope="col">Issued by</th><th scope="col">Scope</th></tr></thead>
              <tbody>
                {disclosure.partners.map((partner) => (
                  <tr key={partner.name}>
                    <th scope="row">{partner.url ? <a href={partner.url} target="_blank" rel="noopener noreferrer">{partner.name}</a> : partner.name}</th>
                    <td>{partner.registration}{partner.validUntil && <small>Valid until {partner.validUntil}</small>}</td>
                    <td>{partner.authority}</td>
                    <td>{partner.scope}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="global-partners-empty"><BadgeCheck size={18} aria-hidden="true" /><span>{disclosure.empty}</span></p>
        )}
        <p className="global-partners-verify">
          <ShieldCheck size={16} aria-hidden="true" />
          <span>
            {disclosure.verify}
            {disclosure.verifyLink && <> <a href={disclosure.verifyLink[1]} target="_blank" rel="noopener noreferrer">{disclosure.verifyLink[0]} <ExternalLink size={12} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></>}
          </span>
        </p>
      </div>
    </section>
  );
}

function GlobalServicesPage() {
  const pathname = usePathname() || '/global-services';
  const currentPath = pathname.replace(/\/$/, '') || '/global-services';
  const serviceSlug = currentPath === '/global-services' ? 'overview' : currentPath.split('/').pop();
  const service = serviceSlug === 'overview' ? overview : services[serviceSlug];
  const pageTitle = service?.title || 'Global Services';
  const Icon = service?.icon || Globe2;

  if (!service) {
    return <div className="global-page"><GlobalHeader currentPath={currentPath} /><main className="global-not-found"><span className="eyebrow">GLOBAL SERVICES</span><h1>Service not found.</h1><a className="button button-dark" href="/global-services">View all global services <ArrowRight size={15} /></a></main></div>;
  }

  return (
    <div className="global-page">
      <GlobalHeader currentPath={currentPath} />
      <GlobalDisclosure notice={service.notice} />
      <main id="main">
        <section className="global-service-hero">
          <div className="global-service-hero-copy">
            <a className="global-back-link" href="/global-services"><ArrowRight size={14} /> All global services</a>
            <span className="eyebrow">{serviceSlug === 'overview' ? 'GLOBAL NETWORK' : 'GLOBAL SERVICES / ENQUIRY'}</span>
            <h1>{pageTitle}<br /><em>{service.heroLine}</em></h1>
            <p>{service.short}</p>
            <a className="button button-dark" href="#global-enquiry">Speak with a coordinator <ArrowDown size={15} /></a>
            <div className="global-trust-indicators" aria-label="Our service principles"><span>Confidential</span><span>Partner-based coordination</span><span>Rooted in Sanatan values</span></div>
            {service.heroNotice
              ? <p className="global-hero-alert" role="note"><AlertTriangle size={17} aria-hidden="true" /><span>{service.heroNotice}</span></p>
              : <span className="global-hero-note"><ShieldCheck size={15} aria-hidden="true" /> No provider, service or outcome is guaranteed.</span>}
          </div>
          <div className="global-service-hero-image"><Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 700px) 100vw, 55vw" preload /><span>GLOBAL SERVICES / INFORMATION FIRST</span></div>
        </section>

        <StagesSection service={service} />

        {serviceSlug !== 'overview' && (
          <section className="global-types-section section-pad">
            <div className="global-editorial-heading"><span className="eyebrow">02 / WHAT WE COORDINATE</span><h2>Thoughtful support,<br /><em>clearly defined.</em></h2><p>Sanatan is your coordinator and guide, not the direct provider or decision-maker.</p></div>
            <div className="global-type-grid global-coordination-grid">{service.details.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
          </section>
        )}

        {serviceSlug === 'overview' ? (
          <section className="global-service-index section-pad">
            <div className="global-editorial-heading"><span className="eyebrow">03 / EXPLORE SERVICES</span><h2>Find the right<br /><em>starting point.</em></h2></div>
            <div className="global-mosaic">
              {Object.entries(services).map(([slug, item], index) => {
                const ServiceIcon = item.icon;
                return <a className={`global-mosaic-card global-mosaic-card-${index + 1}`} href={`/global-services/${slug}`} key={slug}><span className="global-mosaic-number">0{index + 1}</span><ServiceIcon size={20} /><h3>{item.title}</h3><p>{item.short}</p><span className="text-link">Explore service <ArrowUpRight size={14} /></span></a>;
              })}
            </div>
          </section>
        ) : (
          <section className="global-process-section section-pad">
          <div className="global-editorial-heading"><span className="eyebrow">03 / HOW IT WORKS</span><h2>A considered process,<br /><em>one step at a time.</em></h2><p>Every next step is discussed with you. Nothing is arranged without your review and confirmation.</p></div>
          <ol className="global-process-grid">{service.process.map((step, index) => <li key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}</ol>
          </section>
        )}

        {serviceSlug === 'tours' && <DestinationExplorer />}

        <PartnerDisclosure service={service} slug={serviceSlug} Icon={Icon} />

        <section className="global-enquiry-section section-pad" id="global-enquiry">
          <div className="global-enquiry-intro"><span className="eyebrow">04 / YOUR ENQUIRY</span><h2>Tell us what<br /><em>you are exploring.</em></h2><p>Only share information relevant to this enquiry. A team member can clarify whether an information conversation or an authorized provider is the appropriate next step.</p><span><ShieldCheck size={16} /> This form is not an application or service confirmation.</span></div>
          <GlobalEnquiryForm key={serviceSlug} service={service} serviceSlug={serviceSlug} />
        </section>

        <section className="global-faq-section section-pad">
          <div className="global-editorial-heading"><span className="eyebrow">05 / FAQs</span><h2>Clear answers<br /><em>for this service.</em></h2></div>
          <div className="global-faq-list">{service.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
          <FaqStructuredData items={service.faqs} />
        </section>

        {serviceSlug !== 'overview' && (
          <>
            <section className="global-secondary-cta section-pad">
              <div><span className="eyebrow">A THOUGHTFUL FIRST CONVERSATION</span><h2>Speak to a Global Services Coordinator</h2><p>Share what you are exploring. We’ll help clarify the information or coordination that may be appropriate.</p></div>
              <a className="button button-dark" href="#global-enquiry">Start an enquiry <ArrowUpRight size={15} /></a>
            </section>
          </>
        )}

        <section className="global-related-section section-pad">
          <div className="global-editorial-heading"><span className="eyebrow">06 / RELATED SERVICES</span><h2>Continue the<br /><em>conversation.</em></h2></div>
          <div className="global-related-grid">{service.related.slice(0, 3).map((slug) => <a href={`/global-services/${slug}`} key={slug}><span>GLOBAL SERVICE</span><strong>{serviceNames[slug]}</strong><ArrowUpRight size={16} /></a>)}</div>
        </section>
      </main>
      {currentPath === '/global-services' && <WhyChooseSanatan />}
      <SiteFooter />
    </div>
  );
}

export default GlobalServicesPage;
