'use client';

/*
 * Aviation service template (brief §7.1) — every aviation service renders the same sections:
 *   hero → service explanation → suitable use cases → service process → enquiry form → FAQs
 *   → compliance note → related services
 * Content lives in src/aviationServices.js.
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Check, Phone, ShieldAlert, ShieldCheck, Lock, HeartHandshake } from 'lucide-react';
import { LeadFeedback, LeadHoneypot, useLeadCapture } from './useLeadCapture.js';
import { SiteFooter, SiteHeader } from './SiteChrome.jsx';
import { FaqStructuredData } from './SeoStructuredData.jsx';
import { getContact } from './contactConfig.js';
import { DISCLAIMER, NO_LIVE_BOOKING, serviceHref, serviceOrder, services } from './aviationServices.js';

export { DISCLAIMER };

const LOCAL_EMERGENCY = { label: '112', href: 'tel:112', note: 'India national emergency number' };

function useToday() {
  // Set after mount so statically rendered pages never carry a stale build-time date.
  const [today, setToday] = useState(undefined);
  useEffect(() => {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    setToday(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`);
  }, []);
  return today;
}

function Field({ field, formId, today, values }) {
  const id = `${formId}-${field.name}`;
  const hintId = field.hint ? `${id}-hint` : undefined;

  if (field.type === 'toggle') {
    return (
      <div className={`sa-av-toggle${field.wide ? ' sa-field-wide' : ''}`}>
        <label htmlFor={id}>
          <input id={id} name={field.name} type="checkbox" role="switch" value="Yes" aria-describedby={hintId} />
          <span className="sa-av-toggle-track" aria-hidden="true" />
          <span>{field.label}</span>
        </label>
        {field.hint && <small id={hintId}>{field.hint}</small>}
      </div>
    );
  }

  const min = field.type === 'date' ? (field.name === 'returnDate' ? values.travelDate || today : today)
    : field.type === 'datetime-local' ? (today ? `${today}T00:00` : undefined)
      : field.min;

  const common = {
    id,
    name: field.name,
    required: field.required,
    'aria-describedby': hintId,
  };

  return (
    <label className={`sa-field${field.wide ? ' sa-field-wide' : ''}`} htmlFor={id}>
      <span>
        {field.label}
        {field.required && <b aria-hidden="true"> *</b>}
        {field.optional && <em className="sa-av-optional"> (optional)</em>}
      </span>
      {field.type === 'select' ? (
        <select {...common} defaultValue="">
          <option value="" disabled={field.required}>Select an option</option>
          {field.options.map((option) => <option key={option}>{option}</option>)}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea {...common} rows="3" placeholder={field.placeholder || ''} />
      ) : (
        <input
          {...common}
          type={field.type || 'text'}
          min={min}
          max={field.max}
          defaultValue={field.defaultValue}
          pattern={field.pattern}
          title={field.title}
          autoComplete={field.autoComplete}
          inputMode={field.type === 'number' ? 'numeric' : undefined}
          placeholder={field.placeholder || ''}
        />
      )}
      {field.hint && <small id={hintId} className="sa-av-hint">{field.hint}</small>}
    </label>
  );
}

function EmergencyNotice({ emergency, emergencyLine, compact = false }) {
  return (
    <div className={`sa-av-emergency${compact ? ' is-compact' : ''}`} role="note" aria-label="Emergency notice">
      <ShieldAlert size={compact ? 18 : 22} aria-hidden="true" />
      <div>
        <p><strong>{emergency.title}</strong> {emergency.copy}</p>
        <div className="sa-av-emergency-actions">
          <a href={LOCAL_EMERGENCY.href}><Phone size={14} aria-hidden="true" /> Call {LOCAL_EMERGENCY.label} <small>{LOCAL_EMERGENCY.note}</small></a>
          {emergencyLine && (
            <a href={emergencyLine.href}><Phone size={14} aria-hidden="true" /> Medical flight desk {emergencyLine.label}</a>
          )}
        </div>
      </div>
    </div>
  );
}

function ServiceForm({ service, serviceKey, emergencyLine }) {
  const leadCapture = useLeadCapture(service.formType);
  const today = useToday();
  const [values, setValues] = useState({});
  const formId = `av-${serviceKey}`;

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === 'tripType' || name === 'travelDate') setValues((current) => ({ ...current, [name]: value }));
  };
  const visible = (field) => !field.showWhen || field.showWhen[1].includes(values[field.showWhen[0]]);

  return (
    <form
      className="sa-av-form sa-form-card"
      {...leadCapture.formProps}
      onChange={onChange}
      aria-label={`${service.name} enquiry`}
    >
      <div className="sa-form-head">
        <strong>{service.name} enquiry</strong>
        <span>Confidential</span>
      </div>
      {service.emergency && <EmergencyNotice emergency={service.emergency} emergencyLine={emergencyLine} compact />}
      <LeadHoneypot />
      <input type="hidden" name="service" value={service.name} />
      {service.formGroups.map((group) => (
        <fieldset className="sa-av-fieldset" key={group.legend}>
          <legend>{group.legend}</legend>
          <div className="sa-form-grid">
            {group.fields.filter(visible).map((field) => (
              <Field key={field.name} field={field} formId={formId} today={today} values={values} />
            ))}
          </div>
        </fieldset>
      ))}
      <p className="sa-av-required-note"><b aria-hidden="true">*</b> Required</p>
      <label className="sa-consent">
        <input name="consent" type="checkbox" required />
        <span>I agree to be contacted about this enquiry. View our <a href="/privacy-policy">Privacy Policy</a>.</span>
      </label>
      <button className="sa-btn sa-btn-primary sa-form-submit" type="submit" disabled={leadCapture.isSubmitting}>
        {leadCapture.isSubmitting ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={16} aria-hidden="true" />
      </button>
      <LeadFeedback status={leadCapture.status} />
      <p className="sa-form-hint">{NO_LIVE_BOOKING}</p>
    </form>
  );
}

export default function AviationServicePage({ service: serviceKey }) {
  const service = services[serviceKey] || services['private-jet-charter'];
  const contact = getContact();
  const emergencyLine = contact.emergencyLine;
  const related = service.related.filter((slug) => services[slug]);

  return (
    <div className="sa-page sa-av" id="home">
      <SiteHeader overlay />

      <main id="main">
        {/* 1 · Hero */}
        <section className="sa-av-hero" aria-labelledby="av-title">
          <div className="sa-av-hero-media">
            <Image src={service.image} alt={service.imageAlt} fill sizes="100vw" preload style={{ objectPosition: service.imagePosition || 'center' }} />
          </div>
          <div className="sa-container sa-av-hero-inner">
            <nav className="sa-av-crumbs" aria-label="Breadcrumb">
              <a href="/">Home</a><span aria-hidden="true">/</span>
              <a href="/aviation">Aviation services</a><span aria-hidden="true">/</span>
              <span aria-current="page">{service.name}</span>
            </nav>
            <span className="sa-hero-kicker">{service.eyebrow}</span>
            <h1 id="av-title">{service.name} <em>{service.nameSerif}</em></h1>
            <p className="sa-av-hero-sub">{service.sub}</p>
            {service.emergency && <EmergencyNotice emergency={service.emergency} emergencyLine={emergencyLine} />}
            <div className="sa-av-hero-actions">
              <a className="sa-btn sa-btn-primary" href="#enquiry">Start an enquiry <ArrowUpRight size={16} aria-hidden="true" /></a>
              {contact.phone
                ? <a className="sa-btn sa-btn-ghost" href={contact.phone.href}>Call a coordinator <Phone size={15} aria-hidden="true" /></a>
                : <a className="sa-btn sa-btn-ghost" href="#process">How it works</a>}
            </div>
            <div className="sa-hero-trust sa-av-trust">
              <span className="sa-trust-chip"><ShieldCheck size={15} aria-hidden="true" /> Licensed operator coordination</span>
              <span className="sa-trust-chip"><Lock size={15} aria-hidden="true" /> Confidential</span>
              <span className="sa-trust-chip"><HeartHandshake size={15} aria-hidden="true" /> No obligation</span>
            </div>
          </div>
        </section>

        <nav className="sa-av-switcher" aria-label="Aviation services">
          <div className="sa-container">
            {serviceOrder.map((slug, index) => (
              <a key={slug} href={serviceHref(slug)} className={slug === serviceKey ? 'is-current' : undefined} aria-current={slug === serviceKey ? 'page' : undefined}>
                <small>{String(index + 1).padStart(2, '0')}</small>{services[slug].short}
              </a>
            ))}
          </div>
        </nav>

        {/* 2 · Service explanation */}
        <section className="sa-section sa-section-white" id="service">
          <div className="sa-container">
            <div className="sa-av-intro">
              <div className="sa-av-intro-head">
                <span className="sa-eyebrow">The service</span>
                <h2>{service.introTitle}</h2>
                {service.introCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
            <div className="sa-av-benefits">
              {service.benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <article className="sa-av-benefit" key={benefit.title}>
                    <span className="sa-av-benefit-icon"><Icon size={21} strokeWidth={1.5} aria-hidden="true" /></span>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.copy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3 · Suitable use cases */}
        <section className="sa-section sa-section-ivory" id="use-cases">
          <div className="sa-container">
            <div className="sa-av-section-head">
              <span className="sa-eyebrow">Suitable for</span>
              <h2>Where {service.short.toLowerCase()} <em className="sa-serif">helps.</em></h2>
              <p>Every enquiry is reviewed individually. These are the situations where this service is most often requested.</p>
            </div>
            <div className="sa-av-use-grid">
              {service.useCases.map(([title, copy], index) => (
                <article className="sa-av-use" key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4 · Service process */}
        <section className="sa-section sa-section-white" id="process">
          <div className="sa-container">
            <div className="sa-av-section-head">
              <span className="sa-eyebrow">How it works</span>
              <h2>From first question <em className="sa-serif">to informed next steps.</em></h2>
              <p>Four clear stages. Nothing is confirmed until the operator, price and terms are shared with you in writing.</p>
            </div>
            <ol className="sa-av-steps">
              {service.steps.map(([title, copy], index) => (
                <li key={title}>
                  <span className="sa-av-step-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5 · Enquiry form */}
        <section className="sa-section sa-section-ivory sa-av-enquiry" id="enquiry" aria-labelledby="av-enquiry-title">
          <div className="sa-container">
            <div className="sa-av-enquiry-grid">
              <div className="sa-av-enquiry-copy">
                <span className="sa-eyebrow">Your enquiry</span>
                <h2 id="av-enquiry-title">Tell us about your <em className="sa-serif">{service.short.toLowerCase()}</em> requirement.</h2>
                <p>A coordinator reviews every enquiry personally and replies with questions or next steps. There is no obligation and no automated pricing.</p>
                <div className="sa-consult-points">
                  <div className="sa-consult-point"><Check size={16} aria-hidden="true" /> A real person reviews your request</div>
                  <div className="sa-consult-point"><Check size={16} aria-hidden="true" /> Options confirmed with licensed providers</div>
                  <div className="sa-consult-point"><Check size={16} aria-hidden="true" /> Price and terms in writing before you commit</div>
                </div>
              </div>
              <ServiceForm service={service} serviceKey={serviceKey} emergencyLine={emergencyLine} />
            </div>
          </div>
        </section>

        {/* 6 · FAQs */}
        <section className="sa-section sa-section-white" id="faqs">
          <div className="sa-container sa-av-faq-wrap">
            <div className="sa-av-section-head">
              <span className="sa-eyebrow">FAQs</span>
              <h2>Before you <em className="sa-serif">enquire.</em></h2>
            </div>
            <div className="sa-av-faqs">
              {service.faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}<span aria-hidden="true">+</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
          <FaqStructuredData items={service.faqs} />
        </section>

        {/* 7 · Compliance note */}
        <section className="sa-av-compliance" aria-labelledby="av-compliance-title">
          <div className="sa-container">
            <ShieldCheck size={22} aria-hidden="true" />
            <div>
              <h2 id="av-compliance-title">Compliance note</h2>
              <p>{service.compliance}</p>
              <p>{DISCLAIMER} {NO_LIVE_BOOKING}</p>
              <a href="/aviation-disclaimer">Read the full aviation disclaimer <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        {/* 8 · Related services */}
        <section className="sa-section sa-section-navy sa-av-related" aria-labelledby="av-related-title">
          <div className="sa-container">
            <div className="sa-av-section-head">
              <span className="sa-eyebrow">Related services</span>
              <h2 id="av-related-title">Other aviation <em className="sa-serif">services.</em></h2>
            </div>
            <div className="sa-av-related-grid">
              {related.map((slug) => (
                <a key={slug} href={serviceHref(slug)}>
                  <span>Aviation service</span>
                  <h3>{services[slug].name}</h3>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
