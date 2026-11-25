'use client';

import Image from 'next/image';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Plane, ShieldAlert, ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { LeadFeedback, LeadHoneypot, useLeadCapture } from './useLeadCapture.js';
import { serviceHref } from './aviationServices.js';
import { SiteFooter, SiteHeader } from './SiteChrome.jsx';
import { FaqStructuredData } from './SeoStructuredData.jsx';
import WhyChooseSanatan from './WhyChooseSanatan.jsx';

const commonContact = [
  { name: 'name', label: 'Contact name', required: true, autocomplete: 'name' },
  { name: 'phone', label: 'Phone number', type: 'tel', required: true, autocomplete: 'tel', defaultValue: '+91 ', pattern: '\\+?[0-9][0-9\\s.\\x2d]{6,19}', title: 'Enter an international phone number, including country code' },
  { name: 'email', label: 'Email address', type: 'email', required: true, autocomplete: 'email' },
];

const aviationServices = {
  'private-jet-charter': {
    name: 'Private Jet Charter',
    short: 'A considered start to your private charter enquiry.',
    explanation: 'Share your route, timing and passenger requirements. The aviation desk can review the brief and discuss next steps; aircraft, operator, availability and terms are confirmed individually.',
    useCases: ['One-way or return travel', 'Business or personal itineraries', 'Flexible travel dates', 'Multi-city trip planning'],
    steps: ['Share route and timing', 'Clarify passengers and requirements', 'Review options with an operator', 'Confirm terms before proceeding'],
    fields: [
      { name: 'origin', label: 'Departure city or airport', required: true },
      { name: 'destination', label: 'Destination city or airport', required: true },
      { name: 'tripType', label: 'Trip type', type: 'select', required: true, options: ['One-way', 'Return'] },
      { name: 'travelDate', label: 'Travel date', type: 'date', required: true },
      { name: 'flexibleDate', label: 'My date is flexible', type: 'checkbox' },
      { name: 'passengers', label: 'Passenger count', type: 'number', min: 1, required: true },
      { name: 'luggage', label: 'Luggage notes', type: 'textarea', span: 2 },
      { name: 'aircraftPreference', label: 'Aircraft preference (optional)' },
      { name: 'company', label: 'Company (optional)', required: false },
      { name: 'requirements', label: 'Additional requirements', type: 'textarea', span: 2 },
    ],
    faqs: [
      ['Can I see live aircraft availability?', 'No. We do not display live availability. Any suitable options and operator details are confirmed for your specific enquiry.'],
      ['Does this form confirm a booking?', 'No. It sends no booking or price confirmation. A request is reviewed first, and terms are shared before any commitment.'],
      ['Who operates a confirmed flight?', 'Where a flight is arranged, the operating partner and applicable licensing details will be shared before confirmation.'],
    ],
    related: ['helicopter-charter', 'international-charter', 'aircraft-advisory'],
  },
  'helicopter-charter': {
    name: 'Helicopter Charter',
    short: 'A clear brief for a location-specific helicopter enquiry.',
    explanation: 'Tell us about the pickup and drop locations, timing and purpose of your request. Landing permissions, suitable operators and operational feasibility must be reviewed before any service is confirmed.',
    useCases: ['Point-to-point travel', 'Remote or regional access enquiries', 'Time-specific transfers', 'Scenic or event-related requests'],
    steps: ['Share pickup and drop locations', 'Provide timing and purpose', 'Review landing and operator requirements', 'Confirm feasibility and terms'],
    fields: [
      { name: 'pickup', label: 'Pickup location', required: true },
      { name: 'dropoff', label: 'Drop-off location', required: true },
      { name: 'dateTime', label: 'Date and time', type: 'datetime-local', required: true },
      { name: 'passengers', label: 'Passenger count', type: 'number', min: 1, required: true },
      { name: 'purpose', label: 'Purpose', type: 'select', required: true, options: ['Business travel', 'Personal travel', 'Event or itinerary', 'Other'] },
      { name: 'landingDetails', label: 'Landing location details', type: 'textarea', span: 2 },
      { name: 'requirements', label: 'Additional requirements', type: 'textarea', span: 2 },
    ],
    faqs: [
      ['Can I request any pickup or landing location?', 'Locations are reviewed individually. Permissions, operating limitations and site suitability must be confirmed.'],
      ['Is a helicopter guaranteed for my date?', 'No. This form is an enquiry only. Operator availability and operational feasibility are confirmed separately.'],
      ['Will I receive an instant quote?', 'No instant pricing is shown. Any proposed service terms are shared after the request is reviewed.'],
    ],
    related: ['private-jet-charter', 'international-charter', 'aviation-concierge'],
  },
  'air-ambulance': {
    name: 'Air Ambulance',
    short: 'A coordinated medical-flight enquiry, subject to clinical and operator review.',
    explanation: 'Use this form only for non-emergency planning enquiries. Medical suitability, clinical arrangements, aircraft configuration and ground transfer requirements must be assessed by the relevant medical and operating teams.',
    useCases: ['Planned patient transfers', 'Requests to discuss medical transport needs', 'Coordinating ground-transfer requirements', 'Non-emergency repatriation enquiries'],
    steps: ['Share route and high-level transfer needs', 'Aviation and medical requirements are reviewed', 'Relevant operator and clinical details are discussed', 'Any service proceeds only after suitability and terms are confirmed'],
    fields: [
      { name: 'origin', label: 'Origin', required: true },
      { name: 'destination', label: 'Destination', required: true },
      { name: 'conditionCategory', label: 'Patient condition category', type: 'select', required: true, options: ['Stable transfer enquiry', 'Requires mobility assistance', 'Requires medical supervision', 'Prefer to discuss with a clinician'] },
      { name: 'urgency', label: 'Timing', type: 'select', required: true, options: ['Planned transfer', 'Time-sensitive, not an emergency'] },
      { name: 'groundAmbulance', label: 'Ground ambulance required?', type: 'select', required: true, options: ['Yes', 'No', 'Not sure'] },
      { name: 'attendants', label: 'Attendant count', type: 'number', min: 0, required: true },
      { name: 'hospitalContact', label: 'Hospital or treating doctor contact', type: 'textarea', span: 2 },
    ],
    faqs: [
      ['Can I use this form during a medical emergency?', 'No. This form is not an emergency dispatch channel. If urgent help is needed, call your local emergency services now.'],
      ['Does submitting the form confirm a medical flight?', 'No. Clinical suitability, operator capability, availability and terms must all be reviewed and confirmed first.'],
      ['What medical details should I provide?', 'Share only the high-level information requested. A relevant medical team can advise what additional information is necessary through an appropriate channel.'],
    ],
    related: ['private-jet-charter', 'helicopter-charter', 'international-charter'],
  },
  'aircraft-advisory': {
    name: 'Aircraft Buy, Sell & Advisory',
    short: 'A structured first conversation about an aircraft requirement.',
    explanation: 'Outline the aircraft type, intended use and transaction direction. Any advisory scope, introductions and transaction details depend on the brief and will be discussed transparently before proceeding.',
    useCases: ['Aircraft purchase enquiries', 'Aircraft sale enquiries', 'Early-stage aircraft research', 'Transaction and ownership planning discussions'],
    steps: ['Describe the intended use and transaction', 'Clarify region and timeline', 'Review the advisory scope', 'Agree next steps and any applicable terms'],
    fields: [
      { name: 'aircraftType', label: 'Aircraft type or category', required: true },
      { name: 'intendedUse', label: 'Intended use', type: 'textarea', span: 2, required: true },
      { name: 'budget', label: 'Budget range (optional)' },
      { name: 'transaction', label: 'Requirement', type: 'select', required: true, options: ['Purchase', 'Sale', 'Lease', 'Advisory'] },
      { name: 'region', label: 'Preferred region' },
      { name: 'timeline', label: 'Timeline', type: 'select', options: ['As soon as practical', 'Within 3 months', 'Within 6 months', 'Exploring options'] },
      { name: 'requirements', label: 'Additional context', type: 'textarea', span: 2 },
    ],
    faqs: [
      ['Do you own or operate aircraft?', 'This page does not represent that Sanatan Airlines owns aircraft or operates flights. Any operator or transaction counterpart is identified separately where relevant.'],
      ['Can you provide a confirmed aircraft valuation?', 'No valuation is provided through this form. Scope, information sources and any professional engagement are discussed separately.'],
      ['Can I submit a sale enquiry?', 'Yes. Select “Sale” and include only the basic information needed to start a conversation.'],
    ],
    related: ['aircraft-leasing', 'private-jet-charter', 'aviation-concierge'],
  },
  'aircraft-leasing': {
    name: 'Aircraft Leasing',
    short: 'A first step toward understanding an aircraft leasing requirement.',
    explanation: 'Share the aircraft category, intended use, preferred region and anticipated term. Any leasing options are subject to counterparty, aircraft, due diligence and contract review.',
    useCases: ['Short- or long-term leasing enquiries', 'Business or operational planning', 'Regional aircraft requirement discussions', 'Early-stage lease research'],
    steps: ['Outline the aircraft and use case', 'Clarify region, term and timing', 'Review possible counterparties', 'Discuss terms and due diligence'],
    fields: [
      { name: 'aircraftCategory', label: 'Aircraft type or category', required: true },
      { name: 'intendedUse', label: 'Intended use', type: 'textarea', span: 2, required: true },
      { name: 'leaseTerm', label: 'Preferred lease term', type: 'select', required: true, options: ['Short term', 'Medium term', 'Long term', 'To be discussed'] },
      { name: 'region', label: 'Preferred region' },
      { name: 'timeline', label: 'Anticipated start date or timeline', type: 'text' },
      { name: 'requirements', label: 'Additional requirements', type: 'textarea', span: 2 },
    ],
    faqs: [
      ['Are aircraft available to lease now?', 'No live availability is shown. Any suitable aircraft or counterparty must be confirmed for your specific request.'],
      ['Does the enquiry commit me to a lease?', 'No. It is an initial enquiry only. Any terms, due diligence and contracts are handled separately.'],
      ['Who is the lessor?', 'Any relevant counterparty is identified during the discussion and before you are asked to consider terms.'],
    ],
    related: ['aircraft-advisory', 'private-jet-charter', 'international-charter'],
  },
  'aviation-concierge': {
    name: 'Aviation Concierge',
    short: 'One place to describe the practical details around your aviation plans.',
    explanation: 'Tell us what support would make your aviation journey easier. We will clarify the request and explain which elements can be considered, subject to provider availability and applicable requirements.',
    useCases: ['Pre- and post-flight coordination enquiries', 'Ground arrangements around a trip', 'Itinerary and schedule assistance', 'Special travel requirements'],
    steps: ['Describe the itinerary and support needed', 'Clarify timing and preferences', 'Confirm what can be coordinated', 'Review responsibilities and any applicable terms'],
    fields: [
      { name: 'supportType', label: 'Type of support', type: 'select', required: true, options: ['Ground arrangements', 'Itinerary coordination', 'Special travel requirements', 'Other'] },
      { name: 'route', label: 'Route or itinerary', type: 'textarea', span: 2 },
      { name: 'travelDate', label: 'Travel date or dates', type: 'text' },
      { name: 'passengers', label: 'Number of travellers', type: 'number', min: 1 },
      { name: 'requirements', label: 'What would you like help with?', type: 'textarea', span: 2, required: true },
    ],
    faqs: [
      ['Does concierge support include flight booking?', 'Any flight request is handled as a separate enquiry and remains subject to operator confirmation and terms.'],
      ['Are ground services guaranteed?', 'No. Provider availability, locations and requirements must be confirmed individually.'],
      ['Can I include special requirements?', 'Yes. Share only the information needed to understand your request. Any sensitive details should be discussed through an appropriate channel.'],
    ],
    related: ['private-jet-charter', 'helicopter-charter', 'international-charter'],
  },
  'international-charter': {
    name: 'International Charter',
    short: 'International charter enquiries, reviewed around your route and timing.',
    explanation: 'Provide your origin, destination, dates and passenger requirements. International operations require route-specific review, operator confirmation and applicable regulatory checks before any service can be confirmed.',
    useCases: ['International one-way or return journeys', 'Multi-country itinerary enquiries', 'Flexible travel planning', 'Long-range travel requirements'],
    steps: ['Share route, dates and passenger count', 'Clarify itinerary and flexibility', 'Review route and operating requirements', 'Confirm operator, terms and next steps'],
    fields: [
      { name: 'origin', label: 'Departure city or airport', required: true },
      { name: 'destination', label: 'Destination city or airport', required: true },
      { name: 'tripType', label: 'Trip type', type: 'select', required: true, options: ['One-way', 'Return', 'Multi-city'] },
      { name: 'travelDate', label: 'Travel date', type: 'date', required: true },
      { name: 'flexibleDate', label: 'My date is flexible', type: 'checkbox' },
      { name: 'passengers', label: 'Passenger count', type: 'number', min: 1, required: true },
      { name: 'luggage', label: 'Luggage or itinerary notes', type: 'textarea', span: 2 },
      { name: 'requirements', label: 'Additional requirements', type: 'textarea', span: 2 },
    ],
    faqs: [
      ['Do you show live international aircraft availability?', 'No. Options are reviewed and confirmed individually with a relevant operator.'],
      ['Are international permits included?', 'Route requirements and permits are assessed for each request. No permit or clearance is implied by submitting this form.'],
      ['Will the form provide instant pricing?', 'No. This is an enquiry only. Any terms are shared after route and operator review.'],
    ],
    related: ['private-jet-charter', 'helicopter-charter', 'air-ambulance'],
  },
};

const overview = {
  name: 'Aviation Services',
  short: 'A considered first step for charter, aircraft and aviation support enquiries.',
  explanation: 'Choose a service to see what information is useful for an initial enquiry. Each request is reviewed individually; an enquiry does not confirm availability, pricing or a booking.',
  useCases: ['Private jet and international charter enquiries', 'Helicopter and air ambulance requests', 'Aircraft acquisition, sale or leasing', 'Aviation concierge support'],
  steps: ['Choose a service', 'Share the details relevant to your request', 'Review with the appropriate service provider', 'Confirm operator, terms and next steps'],
  fields: [
    { name: 'serviceType', label: 'Service of interest', type: 'select', required: true, options: ['Private jet charter', 'Helicopter charter', 'Air ambulance', 'Aircraft buy, sell or advisory', 'Aircraft leasing', 'Aviation concierge', 'International charter'] },
    { name: 'origin', label: 'Origin or location' },
    { name: 'destination', label: 'Destination or region' },
    { name: 'timing', label: 'Preferred timing', type: 'text' },
    { name: 'requirements', label: 'What would you like to discuss?', type: 'textarea', span: 2 },
  ],
  faqs: [
    ['Can I see live aircraft availability or pricing?', 'No. The website does not show live availability or instant pricing.'],
    ['Does an enquiry confirm a booking?', 'No. All services require individual review and confirmation of operator, availability and terms.'],
    ['Who operates any confirmed flight?', 'The operating partner and applicable licensing details will be shared before a flight is confirmed.'],
  ],
  related: Object.keys(aviationServices),
};

const serviceLabels = Object.fromEntries(Object.entries(aviationServices).map(([slug, service]) => [slug, service.name]));

function Field({ field }) {
  const commonProps = {
    id: field.name,
    name: field.name,
    required: field.required,
    autoComplete: field.autocomplete,
    defaultValue: field.defaultValue,
    min: field.min,
    pattern: field.pattern,
    title: field.title,
  };

  if (field.type === 'checkbox') {
    return (
      <label className="aviation-checkbox-field" htmlFor={field.name}>
        <input {...commonProps} type="checkbox" />
        <span>{field.label}</span>
      </label>
    );
  }

  return (
    <label className={`aviation-field ${field.span === 2 ? 'field-span-two' : ''}`} htmlFor={field.name}>
      <span>{field.label}{field.required && <b> *</b>}</span>
      {field.type === 'select' ? (
        <select {...commonProps} defaultValue="">
          <option value="" disabled>Select an option</option>
          {field.options.map((option) => <option key={option}>{option}</option>)}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea {...commonProps} rows="3" placeholder="Add relevant details" />
      ) : (
        <input {...commonProps} type={field.type || 'text'} placeholder={field.placeholder || ''} />
      )}
    </label>
  );
}

function AviationHeader() {
  return <SiteHeader />;
}

function ComplianceStrip({ isAirAmbulance }) {
  return (
    <aside className="aviation-compliance-strip" aria-label="Aviation service disclaimer">
      {isAirAmbulance ? <ShieldAlert size={16} aria-hidden="true" /> : <ShieldCheck size={16} aria-hidden="true" />}
      <p>{isAirAmbulance ? 'Not an emergency dispatch channel. For urgent help, call your local emergency services now; do not wait for a website response.' : 'Enquiry only. Availability, operator identity, licensing and terms are confirmed before any aviation service is agreed.'}</p>
    </aside>
  );
}

function AviationForm({ service, serviceSlug }) {
  const formType = {
    'private-jet-charter': 'jet_charter',
    'helicopter-charter': 'helicopter',
    'air-ambulance': 'air_ambulance',
    'aircraft-advisory': 'aircraft_advisory',
    'aircraft-leasing': 'aircraft_leasing',
    'aviation-concierge': 'aviation_concierge',
    'international-charter': 'international_charter',
  }[serviceSlug] || 'aviation_enquiry';
  const leadCapture = useLeadCapture(formType);

  return (
    <form className="aviation-enquiry-form" {...leadCapture.formProps}>
      <div className="aviation-form-heading">
        <div><span className="eyebrow">AVIATION DESK ENQUIRY</span><h2>Tell us the essentials.</h2></div>
        <span>NO BOOKING OR PRICE CONFIRMATION</span>
      </div>
      <LeadHoneypot />
      <div className="aviation-form-grid">
        {service.fields.map((field) => <Field key={field.name} field={field} />)}
        <div className="aviation-form-divider field-span-two"><span>YOUR CONTACT DETAILS</span></div>
        {commonContact.map((field) => <Field key={field.name} field={field} />)}
        {service.name === 'Private Jet Charter' && <Field field={{ name: 'company', label: 'Company (optional)' }} />}
        <label className="aviation-field field-span-two" htmlFor="additionalNotes">
          <span>Anything else to add?</span>
          <textarea id="additionalNotes" name="additionalNotes" rows="3" placeholder={serviceSlug === 'air-ambulance' ? 'Do not include medical records or sensitive clinical details' : 'Share any other details relevant to this enquiry'} />
        </label>
      </div>
      <label className="aviation-consent"><input name="consent" type="checkbox" required /><span>I agree to be contacted about this enquiry. Please do not include unnecessary sensitive information. <a href="/privacy-policy">Privacy Policy</a></span></label>
      <button className="button button-dark aviation-submit" type="submit" disabled={leadCapture.isSubmitting}>{leadCapture.isSubmitting ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={16} /></button>
      <LeadFeedback status={leadCapture.status} />
      <p className="aviation-form-note">Submitting this form does not confirm aircraft availability, pricing, an operator or a booking.</p>
    </form>
  );
}

function AviationPage() {
  const pathname = usePathname() || '/aviation';
  const serviceSlug = pathname === '/aviation' ? undefined : pathname.split('/').pop();
  const isOverview = !serviceSlug;
  const service = isOverview ? overview : aviationServices[serviceSlug];

  if (!service) {
    return (
      <div className="aviation-page">
        <AviationHeader />
        <main id="main" className="aviation-not-found"><span className="eyebrow">AVIATION SERVICES</span><h1>Service not found.</h1><a className="button button-dark" href="/aviation">View aviation services <ArrowRight size={15} /></a></main>
      </div>
    );
  }

  const relatedSlugs = service.related.filter((slug) => slug !== serviceSlug);

  return (
    <div className="aviation-page">
      <AviationHeader />
      <ComplianceStrip isAirAmbulance={serviceSlug === 'air-ambulance'} />
      <main id="main">
        <section className="aviation-service-hero">
          <div className="aviation-service-hero-copy">
            <a className="aviation-back-link" href="/aviation"><ArrowLeft size={14} /> Aviation services</a>
            <span className="eyebrow">AVIATION / {isOverview ? 'SERVICES' : 'SERVICE ENQUIRY'}</span>
            <h1>{service.name}<br /><em>{isOverview ? 'A clear place to begin.' : 'Start with a clear brief.'}</em></h1>
            <p>{service.short}</p>
            <a className="button button-dark" href="#enquiry">Start an enquiry <ArrowDown size={15} /></a>
            {!isOverview && <span className="aviation-no-booking"><ShieldAlert size={15} /> Enquiry only. No live availability or instant pricing.</span>}
          </div>
          <div className="aviation-service-hero-visual" role="img" aria-label="Passenger aircraft above clouds">
            <Image src="/images/aircraft-clouds.jpg" alt="Passenger aircraft wing above clouds" fill sizes="(max-width: 700px) 100vw, 55vw" preload />
            <span>AVIATION SERVICES / SANATAN AIRLINES</span>
          </div>
        </section>

        {serviceSlug === 'air-ambulance' && (
          <aside className="air-ambulance-alert" role="alert">
            <ShieldAlert size={22} aria-hidden="true" />
            <div><strong>Not an emergency dispatch channel</strong><p>If urgent help is needed, call your local emergency services now. Do not wait for a response to this website form.</p></div>
          </aside>
        )}

        <section className="aviation-explainer section-pad">
          <div className="aviation-section-heading">
            <span className="eyebrow">01 / THE SERVICE</span>
            <h2>Clear information.<br /><em>Thoughtful coordination.</em></h2>
          </div>
          <div className="aviation-explainer-copy"><p>{service.explanation}</p><p className="aviation-qualification"><ShieldCheck size={16} /> Any flight is subject to confirmation with an appropriately licensed operator. Operator identity and applicable licensing details will be shared before a service is confirmed.</p></div>
        </section>

        {isOverview ? (
          <section className="aviation-service-index section-pad">
            <div className="aviation-section-heading"><span className="eyebrow">02 / CHOOSE A SERVICE</span><h2>Start with what<br /><em>you need.</em></h2></div>
            <div className="aviation-index-grid">
              {Object.entries(aviationServices).map(([slug, item], index) => (
                <a className="aviation-index-card" href={serviceHref(slug)} key={slug}>
                  <span className="aviation-index-number">0{index + 1}</span><Plane size={19} /><h3>{item.name}</h3><p>{item.short}</p><span className="text-link">View service <ArrowUpRight size={14} /></span>
                </a>
              ))}
            </div>
          </section>
        ) : (
          <section className="aviation-use-cases section-pad">
            <div className="aviation-section-heading"><span className="eyebrow">02 / SUITABLE ENQUIRIES</span><h2>What this service<br /><em>may help you explore.</em></h2></div>
            <ul className="aviation-use-list">{service.useCases.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}<Check size={15} /></li>)}</ul>
          </section>
        )}

        {isOverview ? <WhyChooseSanatan /> : (
          <section className="aviation-process section-pad">
            <div className="aviation-section-heading"><span className="eyebrow">03 / HOW IT WORKS</span><h2>From enquiry<br /><em>to informed next steps.</em></h2></div>
            <div className="aviation-process-grid">{service.steps.map((step, index) => <article key={step}><span>0{index + 1}</span><h3>{step}</h3><p>We clarify the request before discussing any suitable next step.</p></article>)}</div>
          </section>
        )}

        <section className="aviation-enquiry-section section-pad" id="enquiry">
          <div className="aviation-enquiry-intro"><span className="eyebrow">{isOverview ? '04' : '04'} / YOUR ENQUIRY</span><h2>Start a conversation<br /><em>with the aviation desk.</em></h2><p>Only provide details relevant to your request. The form does not confirm availability or a booking.</p>
            {serviceSlug === 'air-ambulance' && <div className="air-ambulance-inline-alert"><ShieldAlert size={18} /><p><strong>This is not emergency dispatch.</strong> For urgent help, call your local emergency services now.</p></div>}
          </div>
          <AviationForm service={service} serviceSlug={serviceSlug} />
        </section>

        <section className="aviation-faq-section section-pad">
          <div className="aviation-section-heading"><span className="eyebrow">05 / FAQs</span><h2>Good to know<br /><em>before you enquire.</em></h2></div>
          <div className="aviation-faq-list">{service.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
          <FaqStructuredData items={service.faqs} />
        </section>

        <section className="aviation-related-section section-pad">
          <div className="aviation-section-heading"><span className="eyebrow">06 / CONTINUE EXPLORING</span><h2>Related aviation<br /><em>services.</em></h2></div>
          <div className="aviation-related-grid">{relatedSlugs.slice(0, 3).map((slug) => (
            <a href={serviceHref(slug)} className="aviation-related-card" key={slug}><span>AVIATION SERVICE</span><h3>{serviceLabels[slug]}</h3><ArrowUpRight size={17} /></a>
          ))}</div>
        </section>

        <section className="aviation-compliance-note section-pad" id="compliance">
          <ShieldCheck size={22} /><div><span className="eyebrow">COMPLIANCE & SERVICE NOTE</span><h2>Enquiry is not confirmation.</h2><p>No live aircraft availability, instant pricing or confirmed booking is offered on this website. All flight requests are subject to service, route, operator and regulatory review. Where relevant, the licensed operating partner and applicable licensing details will be identified before confirmation. Sanatan Airlines does not represent that it owns aircraft or holds an NSOP.</p></div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default AviationPage;
