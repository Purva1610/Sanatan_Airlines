import { z } from 'zod';

const teamNames = [
  'central_customer_support',
  'aviation_desk',
  'trained_coordinator',
  'membership_sales',
  'franchise_team',
  'global_services_team',
  'partnerships_team',
  'hr_recruitment',
];

const requiredByForm = {
  general_enquiry: ['serviceCategory', 'name', 'phone', 'email'],
  jet_charter: ['origin', 'destination', 'tripType', 'travelDate', 'passengers', 'name', 'phone', 'email'],
  helicopter: ['pickup', 'dropoff', 'dateTime', 'passengers', 'purpose', 'name', 'phone', 'email'],
  air_ambulance: ['origin', 'destination', 'conditionCategory', 'urgency', 'groundAmbulance', 'attendants', 'name', 'phone', 'email'],
  aviation_enquiry: ['serviceType', 'name', 'phone', 'email'],
  aircraft_advisory: ['aircraftType', 'intendedUse', 'transaction', 'name', 'phone', 'email'],
  aircraft_leasing: ['aircraftCategory', 'intendedUse', 'leaseTerm', 'name', 'phone', 'email'],
  aviation_concierge: ['supportType', 'requirements', 'name', 'phone', 'email'],
  international_charter: ['origin', 'destination', 'tripType', 'travelDate', 'passengers', 'name', 'phone', 'email'],
  membership: ['plan', 'travellers', 'name', 'phone', 'email'],
  tirth_yatra: ['serviceCategory', 'timing', 'passengers', 'region', 'name', 'phone', 'email'],
  franchise: ['applicantName', 'cityState', 'territory', 'experience', 'email', 'phone'],
  global_services: ['contactName', 'contactEmail', 'contactPhone'],
  partner_enquiry: ['organization', 'country', 'serviceCategory', 'name', 'email', 'phone'],
  career_application: ['role', 'name', 'email', 'phone'],
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9][0-9\s.\x2d]{6,19}$/;
const formTypes = Object.keys(requiredByForm);

export const leadPayloadSchema = z.object({
  schemaVersion: z.literal('1.0'),
  formType: z.enum(formTypes),
  destinationTeam: z.enum(teamNames),
  submittedAt: z.string().datetime(),
  source: z.object({
    path: z.string().min(1).max(2048),
    referrerOrigin: z.union([z.literal(''), z.string().url()]),
    campaign: z.record(z.string(), z.string().max(300)),
  }),
  consent: z.object({ accepted: z.literal(true), acceptedAt: z.string().datetime() }),
  data: z.record(z.string(), z.string().max(5000)),
});

export function validateLeadPayload(payload) {
  const parsed = leadPayloadSchema.safeParse(payload);
  if (!parsed.success) return { success: false, message: 'Some submitted information is invalid. Review the required fields and try again.' };

  const required = requiredByForm[parsed.data.formType];
  for (const field of required) {
    if (!parsed.data.data[field]?.trim()) return { success: false, message: 'Some required information is missing. Review the required fields and try again.' };
  }

  const email = parsed.data.data.email || parsed.data.data.contactEmail;
  const phone = parsed.data.data.phone || parsed.data.data.contactPhone;
  if (email && !emailPattern.test(email)) return { success: false, message: 'Enter a valid email address.' };
  if (phone && !phonePattern.test(phone)) return { success: false, message: 'Enter a valid international phone number, including country code.' };

  return { success: true, data: parsed.data };
}
