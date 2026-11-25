'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { LeadFeedback, LeadHoneypot, useLeadCapture } from './useLeadCapture.js';
import { SiteFooter, SiteHeader } from './SiteChrome.jsx';

const serviceOptions = [
  { id: 'general', title: 'Something else', formType: 'general_enquiry', fields: [{ name: 'location', label: 'City / country' }, { name: 'message', label: 'What would you like help with?', type: 'textarea', required: true }] },
  { id: 'jet', title: 'Private jet charter', formType: 'jet_charter', fields: [{ name: 'origin', label: 'Departure city or airport', required: true }, { name: 'destination', label: 'Destination city or airport', required: true }, { name: 'tripType', label: 'Trip type', type: 'select', required: true, options: ['One-way', 'Return'] }, { name: 'travelDate', label: 'Travel date', type: 'date', required: true }, { name: 'passengers', label: 'Passenger count', type: 'number', min: 1, required: true }, { name: 'aircraftPreference', label: 'Aircraft preference (optional)' }] },
  { id: 'helicopter', title: 'Helicopter charter', formType: 'helicopter', fields: [{ name: 'pickup', label: 'Pickup location', required: true }, { name: 'dropoff', label: 'Drop-off location', required: true }, { name: 'dateTime', label: 'Date and time', type: 'datetime-local', required: true }, { name: 'passengers', label: 'Passenger count', type: 'number', min: 1, required: true }, { name: 'purpose', label: 'Purpose', type: 'select', options: ['Business travel', 'Personal travel', 'Event or itinerary', 'Other'], required: true }] },
  { id: 'air-ambulance', title: 'Air ambulance (non-emergency)', formType: 'air_ambulance', fields: [{ name: 'origin', label: 'Origin', required: true }, { name: 'destination', label: 'Destination', required: true }, { name: 'urgency', label: 'Timing', type: 'select', options: ['Planned transfer', 'Time-sensitive, not an emergency'], required: true }, { name: 'conditionCategory', label: 'High-level transfer category', type: 'select', options: ['Stable transfer enquiry', 'Requires mobility assistance', 'Requires medical supervision', 'Prefer to discuss with a clinician'], required: true }, { name: 'groundAmbulance', label: 'Ground ambulance required?', type: 'select', options: ['Yes', 'No', 'Not sure'], required: true }, { name: 'attendants', label: 'Attendant count', type: 'number', min: 0, required: true }] },
  { id: 'membership', title: 'International Club membership', formType: 'membership', fields: [{ name: 'plan', label: 'Plan interest', type: 'select', options: ['Single', 'Couple', 'Family', 'Not sure'], required: true }, { name: 'travellers', label: 'Number of travellers', type: 'number', min: 1, required: true }, { name: 'destinations', label: 'Preferred destinations' }, { name: 'startDate', label: 'Expected start date', type: 'date' }] },
  { id: 'franchise', title: 'Franchise', formType: 'franchise', fields: [{ name: 'territory', label: 'Preferred territory', required: true }, { name: 'cityState', label: 'City / State', required: true }, { name: 'experience', label: 'Business experience', type: 'textarea', required: true }, { name: 'investmentRange', label: 'Available investment range (optional)' }] },
  { id: 'global', title: 'Global Services', formType: 'global_services', fields: [{ name: 'serviceCategory', label: 'Service area', type: 'select', options: ['Tours', 'Education', 'Employment assistance', 'Business', 'Property', 'Investment information', 'PR and branding', 'Trade'], required: true }, { name: 'targetCountry', label: 'Target country or region' }, { name: 'message', label: 'What would you like to explore?', type: 'textarea' }] },
];

/*
 * Save-progress (brief: "save progress only with clear consent").
 * OFF by default. When the visitor opts in, only the chosen service and step-2 details are kept in
 * THIS browser (localStorage) for up to 7 days. Contact details are never saved, and nothing is
 * saved for air ambulance enquiries. Unticking, starting over or a successful submission deletes it.
 */
const DRAFT_KEY = 'sanatan_enquiry_draft_v1';
const DRAFT_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const NEVER_SAVE = new Set(['air-ambulance']);
const readDraft = () => {
  try {
    const draft = JSON.parse(window.localStorage.getItem(DRAFT_KEY) || 'null');
    if (!draft || Date.now() - draft.savedAt > DRAFT_TTL_MS || !serviceOptions.some((s) => s.id === draft.serviceId)) { window.localStorage.removeItem(DRAFT_KEY); return null; }
    return draft;
  } catch { return null; }
};
const writeDraft = (draft) => { try { window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); } catch { /* storage unavailable */ } };
const clearDraft = () => { try { window.localStorage.removeItem(DRAFT_KEY); } catch { /* storage unavailable */ } };

const phonePattern = '\\+?[0-9][0-9\\s.\\x2d]{6,19}';

function WizardField({ field, value, onChange }) {
  const commonProps = { id: field.name, name: field.name, required: field.required, min: field.min, value: value || '', onChange: (event) => onChange(field.name, event.target.value) };
  return (
    <label className="wizard-field" htmlFor={field.name}>
      <span>{field.label}{field.required && <b> *</b>}</span>
      {field.type === 'select' ? <select {...commonProps}><option value="">Select an option</option>{field.options.map((option) => <option key={option}>{option}</option>)}</select>
        : field.type === 'textarea' ? <textarea {...commonProps} rows="3" placeholder="Add relevant details" />
          : <input {...commonProps} type={field.type || 'text'} placeholder={field.placeholder || ''} />}
    </label>
  );
}

export default function EnquiryWizard() {
  const [serviceId, setServiceId] = useState('');
  const [details, setDetails] = useState({});
  const [step, setStep] = useState(1);
  const formRef = useRef(null);
  const selectedService = serviceOptions.find((service) => service.id === serviceId);
  const leadCapture = useLeadCapture(selectedService?.formType || 'general_enquiry');
  const contactNames = selectedService?.formType === 'global_services'
    ? { name: 'contactName', email: 'contactEmail', phone: 'contactPhone', label: 'Contact name' }
    : selectedService?.formType === 'franchise'
      ? { name: 'applicantName', email: 'email', phone: 'phone', label: 'Applicant name' }
      : { name: 'name', email: 'email', phone: 'phone', label: 'Full name' };

  const [saveConsent, setSaveConsent] = useState(false);
  const [pendingDraft, setPendingDraft] = useState(null);

  // Restore offer + ?service= deep link (e.g. /enquire?service=jet)
  useEffect(() => {
    const draft = readDraft();
    if (draft) setPendingDraft(draft);
    const requested = new URLSearchParams(window.location.search).get('service');
    if (!draft && requested && serviceOptions.some((option) => option.id === requested)) setServiceId(requested);
  }, []);

  // Persist only while the visitor has consented; never for excluded services.
  useEffect(() => {
    if (!saveConsent) return;
    if (!serviceId || NEVER_SAVE.has(serviceId)) { clearDraft(); return; }
    writeDraft({ serviceId, details, step: Math.min(step, 2), savedAt: Date.now() });
  }, [saveConsent, serviceId, details, step]);

  // A successful submission removes any saved draft.
  useEffect(() => {
    if (leadCapture.status.type === 'success') { clearDraft(); setSaveConsent(false); }
  }, [leadCapture.status.type]);

  const resumeDraft = () => {
    setServiceId(pendingDraft.serviceId);
    setDetails(pendingDraft.details || {});
    setStep(pendingDraft.step || 1);
    setSaveConsent(true);
    setPendingDraft(null);
  };
  const discardDraft = () => { clearDraft(); setPendingDraft(null); };
  const onSaveConsentChange = (event) => {
    setSaveConsent(event.target.checked);
    if (!event.target.checked) clearDraft();
  };

  const updateDetail = (name, value) => setDetails((current) => ({ ...current, [name]: value }));
  const nextStep = () => {
    if (!formRef.current?.reportValidity()) return;
    setStep((current) => Math.min(current + 1, 3));
    leadCapture.trackStep(step === 1 ? 'service_details' : 'contact_consent');
    leadCapture.resetStatus();
  };

  return (
    <div className="wizard-page">
      <SiteHeader />
      <main className="wizard-main" id="main">
        <div className="wizard-intro"><span className="eyebrow">A CONVERSATION, NOT A COMMITMENT</span><h1>Tell us what<br /><em>you have in mind.</em></h1><p>Choose a service, share relevant details and provide contact information. Progress is saved only if you choose to save it.</p></div>
        <form ref={formRef} className="wizard-form" {...leadCapture.formProps}>
          <LeadHoneypot />
          {pendingDraft && (
            <div className="wizard-resume" role="status">
              <p><strong>Continue where you left off?</strong> You saved a {serviceOptions.find((o) => o.id === pendingDraft.serviceId)?.title.toLowerCase()} enquiry on this device.</p>
              <div><button type="button" className="button button-dark" onClick={resumeDraft}>Resume</button><button type="button" className="wizard-back" onClick={discardDraft}>Start over</button></div>
            </div>
          )}
          <div className="wizard-progress" aria-label={`Step ${step} of 3`}>
            {[1, 2, 3].map((item) => <div className={`wizard-progress-step ${step >= item ? 'is-current' : ''}`} key={item}><span>{step > item ? <Check size={14} /> : `0${item}`}</span><small>{['Service', 'Details', 'Contact'][item - 1]}</small></div>)}
          </div>
          {step === 1 && (
            <fieldset className="wizard-step">
              <legend><span>STEP 01</span><strong>What can we help with?</strong></legend>
              <label className="wizard-field" htmlFor="wizardService"><span>Choose a service <b>*</b></span><select id="wizardService" name="serviceCategory" value={serviceId} onChange={(event) => setServiceId(event.target.value)} required><option value="">Select a service</option>{serviceOptions.map((service) => <option value={service.id} key={service.id}>{service.title}</option>)}</select></label>
              <div className="wizard-actions"><span>Only the fields relevant to your selection appear next.</span><button className="button button-dark" type="button" onClick={nextStep}>Continue <ArrowRight size={15} /></button></div>
            </fieldset>
          )}
          {step === 2 && selectedService && (
            <fieldset className="wizard-step">
              <legend><span>STEP 02 / {selectedService.title.toUpperCase()}</span><strong>Share the relevant details.</strong></legend>
              {serviceId === 'air-ambulance' && <p className="wizard-emergency-note">This is not emergency dispatch. For urgent help, call your local emergency services now. Do not include medical records.</p>}
              <div className="wizard-fields">{selectedService.fields.map((field) => <WizardField key={field.name} field={field} value={details[field.name]} onChange={updateDetail} />)}</div>
              <div className="wizard-actions"><button className="wizard-back" type="button" onClick={() => setStep(1)}><ArrowLeft size={14} /> Back</button><button className="button button-dark" type="button" onClick={nextStep}>Continue <ArrowRight size={15} /></button></div>
            </fieldset>
          )}
          {step === 3 && selectedService && (
            <fieldset className="wizard-step">
              <legend><span>STEP 03 / CONTACT</span><strong>Where can the team reach you?</strong></legend>
              <input type="hidden" name="serviceCategory" value={selectedService.title} />
              {Object.entries(details).map(([name, value]) => <input type="hidden" name={name} value={value} key={name} />)}
              <div className="wizard-fields">
                <label className="wizard-field" htmlFor="wizardName"><span>{contactNames.label} <b>*</b></span><input id="wizardName" name={contactNames.name} autoComplete="name" required /></label>
                <label className="wizard-field" htmlFor="wizardPhone"><span>Mobile number <b>*</b></span><input id="wizardPhone" name={contactNames.phone} type="tel" autoComplete="tel" defaultValue="+91 " pattern={phonePattern} title="Enter an international phone number, including country code" placeholder="+91 98765 43210" required /></label>
                <label className="wizard-field" htmlFor="wizardEmail"><span>Email address <b>*</b></span><input id="wizardEmail" name={contactNames.email} type="email" autoComplete="email" required /></label>
              </div>
              <label className="wizard-consent"><input name="consent" type="checkbox" required /><span>I agree to be contacted about this enquiry. <a href="/privacy-policy">Privacy Policy</a></span></label>
              <div className="wizard-actions"><button className="wizard-back" type="button" onClick={() => setStep(2)}><ArrowLeft size={14} /> Back</button><button className="button button-dark" type="submit" disabled={leadCapture.isSubmitting}>{leadCapture.isSubmitting ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={15} /></button></div>
            </fieldset>
          )}
          {step < 3 && (
            <label className="wizard-save">
              <input type="checkbox" checked={saveConsent} onChange={onSaveConsentChange} disabled={NEVER_SAVE.has(serviceId)} />
              <span>
                <strong>Save my progress on this device</strong>
                {NEVER_SAVE.has(serviceId)
                  ? ' — not available for air ambulance enquiries, to protect medical information.'
                  : ' — optional. Keeps your service choice and details in this browser for up to 7 days so you can finish later. Contact details are never saved. Untick to delete.'}
              </span>
            </label>
          )}
          <LeadFeedback status={leadCapture.status} />
          {selectedService && <p className="wizard-routing-note">Enquiry route: {selectedService.formType.replaceAll('_', ' ')}. No booking, price or outcome is guaranteed.</p>}
          <p className="wizard-sensitive-note">Do not include medical records, passports or financial account information.</p>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
