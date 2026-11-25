/*
 * Global Services — partner & authorisation disclosure.
 *
 * Brief: show institution partners (education), authorised recruitment partners
 * (employment), authorised local partners (property) and the registered entity
 * responsible for any regulated advice (investment).
 *
 * ONLY add a partner here once (a) the agreement is signed, (b) the partner has
 * given permission to be named, and (c) its registration has been checked against
 * the official register. Until then the page shows an honest empty state.
 *
 * Partner entry shape:
 *   { name: 'Example Overseas Pvt Ltd', registration: 'B-0000/MUM/PER/1000+/5/0000/2026',
 *     authority: 'Protector General of Emigrants, MEA', validUntil: '2031-03-31',
 *     scope: 'Recruitment for healthcare roles in the UAE', url: 'https://…' }
 */

export const partnerDisclosure = {
  education: {
    heading: 'Institution partners',
    registrationLabel: 'Recognition / accreditation',
    partners: [],
    empty: 'No institution partners are published yet. If an introduction is suggested, we will name the institution or representative and explain our relationship with them, including any commission we receive, before you proceed.',
    verify: 'Check any institution’s recognition on its official website and with the destination country’s education authority before paying fees.',
  },
  employment: {
    heading: 'Authorised recruitment partners',
    registrationLabel: 'Recruiting Agent licence no.',
    partners: [],
    empty: 'No authorised recruitment partner is published yet. Sanatan Airlines is not itself a licensed recruiting agent. Recruitment for overseas jobs from India may only be carried out by a Recruiting Agent registered with the Ministry of External Affairs.',
    verify: 'Verify any recruiting agent’s licence number on the government eMigrate portal before sharing documents or paying any fee.',
    verifyLink: ['eMigrate portal (Ministry of External Affairs)', 'https://emigrate.gov.in'],
  },
  business: {
    heading: 'Professional partners',
    registrationLabel: 'Registration',
    partners: [],
    empty: 'No business-setup partners are published yet. Company formation, legal and tax work is carried out only by appropriately licensed professionals in the target country, who will be named before engagement.',
    verify: 'Ask any adviser for their professional registration in the relevant jurisdiction.',
  },
  trade: {
    heading: 'Trade partners',
    registrationLabel: 'Registration',
    partners: [],
    empty: 'No trade partners are published yet. Customs brokers, freight forwarders and other providers are named, with their registrations, before any introduction.',
    verify: 'Confirm customs and licensing requirements with the relevant authority for your goods and route.',
  },
  property: {
    heading: 'Authorised local partners',
    registrationLabel: 'Licence / registration no.',
    partners: [],
    empty: 'No local property partners are published yet. Sanatan Airlines does not sell property. Any agent or developer introduced must hold the registration required in that country — for example, RERA registration in India.',
    verify: 'Verify agent and project registrations with the local regulator (such as the relevant State RERA in India) and use an independent lawyer for title checks.',
  },
  investment: {
    heading: 'Registered entity for regulated advice',
    registrationLabel: 'Registration no.',
    partners: [],
    empty: 'No registered investment adviser is engaged through this website. Sanatan Airlines is not registered to give investment advice, so this service is limited to general information and introductions.',
    verify: 'In India, check that any investment adviser is registered with SEBI before acting on their advice.',
    verifyLink: ['SEBI (Securities and Exchange Board of India)', 'https://www.sebi.gov.in'],
  },
};
