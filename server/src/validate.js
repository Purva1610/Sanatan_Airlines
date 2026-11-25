import { validateLeadPayload } from '../../src/leadSchemas.js';

const TEAM_BY_FORM = {
  general_enquiry: 'central_customer_support',
  jet_charter: 'aviation_desk',
  helicopter: 'aviation_desk',
  air_ambulance: 'trained_coordinator',
  aviation_enquiry: 'aviation_desk',
  aircraft_advisory: 'aviation_desk',
  aircraft_leasing: 'aviation_desk',
  aviation_concierge: 'aviation_desk',
  international_charter: 'aviation_desk',
  membership: 'membership_sales',
  tirth_yatra: 'central_customer_support',
  franchise: 'franchise_team',
  global_services: 'global_services_team',
  partner_enquiry: 'partnerships_team',
  career_application: 'hr_recruitment',
};

const ALLOWED_FIELDS = new Set([
  // Aviation template v2 (src/aviationServices.js)
  'service',
  'returnDate',
  'stops',
  'landingSiteType',
  'relationship',
  'leaseType',
  // Global Services v2 (src/GlobalServicesPage.jsx)
  'companyName',
  'designation',
  'companyWebsite',
  'experienceDetails',
  'profileSharingConsent',
  'investorRole',
  'notAdviceAcknowledged',
  // Contact page v2 (src/CompanyPages.jsx)
  'preferredContact',
  // Existing fields
  'additionalNotes',
  'aircraftCategory',
  'aircraftPreference',
  'aircraftType',
  'applicantName',
  'assistance',
  'attendants',
  'budget',
  'cityState',
  'company',
  'companyProfile',
  'conditionCategory',
  'contactEmail',
  'contactName',
  'contactPhone',
  'context',
  'country',
  'courseLevel',
  'credentialsSummary',
  'dateTime',
  'destination',
  'destinations',
  'dropoff',
  'email',
  'experience',
  'flexibleDate',
  'frequency',
  'groundAmbulance',
  'hospitalContact',
  'industry',
  'institution',
  'intake',
  'intendedUse',
  'intent',
  'investmentRange',
  'jobCategory',
  'landingDetails',
  'leaseTerm',
  'localPartner',
  'location',
  'luggage',
  'message',
  'name',
  'objective',
  'objectives',
  'organization',
  'origin',
  'passengers',
  'phone',
  'pickup',
  'plan',
  'premises',
  'propertyNotes',
  'propertyType',
  'purpose',
  'qualification',
  'region',
  'requestType',
  'requirements',
  'role',
  'route',
  'sector',
  'serviceCategory',
  'serviceRequired',
  'serviceType',
  'startDate',
  'subject',
  'supportType',
  'targetCountry',
  'targetMarkets',
  'territory',
  'timeline',
  'timing',
  'transaction',
  'travelDate',
  'travelDates',
  'travellers',
  'tripNotes',
  'tripStyle',
  'tripType',
  'urgency',
]);

const CAMPAIGN_KEYS = new Set(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']);
const FIELD_NAME = /^[A-Za-z][A-Za-z0-9_]{0,49}$/;
const SOURCE_PATH = /^\/[A-Za-z0-9\-/_.]*$/;
const MAX_FIELDS = 40;
const MAX_COMBINED_LENGTH = 20000;

function luhnValid(digits) {
  let sum = 0;
  let double = false;
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let value = Number(digits[index]);
    if (double) {
      value *= 2;
      if (value > 9) value -= 9;
    }
    sum += value;
    double = !double;
  }
  return sum % 10 === 0;
}

function containsPaymentCard(value) {
  const candidates = String(value).match(/\d(?:[ -]?\d){14,18}/g) || [];
  return candidates.some((candidate) => {
    const digits = candidate.replace(/\D/g, '');
    return digits.length >= 15 && digits.length <= 19 && luhnValid(digits);
  });
}

export function validateLead(payload) {
  const base = validateLeadPayload(payload);
  if (!base.success) return { ok: false, status: 400, message: base.message };
  const lead = base.data;

  if (TEAM_BY_FORM[lead.formType] !== lead.destinationTeam) {
    return { ok: false, status: 400, message: 'The submitted routing information is invalid.' };
  }

  const data = lead.data;
  const keys = Object.keys(data);
  if (keys.length > MAX_FIELDS) {
    return { ok: false, status: 400, message: 'Too many submitted fields.' };
  }

  let combinedLength = 0;
  for (const key of keys) {
    if (!FIELD_NAME.test(key) || !ALLOWED_FIELDS.has(key)) {
      return { ok: false, status: 400, message: 'The submission contains an unsupported field.' };
    }
    const value = data[key];
    combinedLength += value.length;
    if (containsPaymentCard(value)) {
      return { ok: false, status: 400, message: 'Remove payment card details before sending this enquiry.' };
    }
  }
  if (combinedLength > MAX_COMBINED_LENGTH) {
    return { ok: false, status: 400, message: 'The submitted details are too long.' };
  }

  const campaignKeys = Object.keys(lead.source.campaign || {});
  if (campaignKeys.some((key) => !CAMPAIGN_KEYS.has(key))) {
    return { ok: false, status: 400, message: 'The submission contains unsupported campaign data.' };
  }
  if (!SOURCE_PATH.test(lead.source.path)) {
    return { ok: false, status: 400, message: 'The submission source path is invalid.' };
  }

  const name = (data.name || data.contactName || data.applicantName || '').trim().slice(0, 200) || null;
  const email = (data.email || data.contactEmail || '').trim().toLowerCase().slice(0, 254) || null;
  const phone = (data.phone || data.contactPhone || '').trim().slice(0, 40) || null;
  const serviceCategory = (data.serviceCategory || '').trim().slice(0, 120) || lead.formType;

  return {
    ok: true,
    lead: {
      schemaVersion: lead.schemaVersion,
      formType: lead.formType,
      team: lead.destinationTeam,
      submittedAt: lead.submittedAt,
      consentAt: lead.consent.acceptedAt,
      sourcePath: lead.source.path,
      referrerOrigin: lead.source.referrerOrigin,
      campaign: lead.source.campaign,
      name,
      email,
      phone,
      serviceCategory,
      rawPayload: lead,
    },
  };
}

export const allowedFields = ALLOWED_FIELDS;
export const teamByForm = TEAM_BY_FORM;
