'use client';

/*
 * About · Leadership · Contact (brief §7).
 *   About       company story, mission, operating model, business verticals, service principles, governance
 *   Leadership  approved names, photographs, roles, biographies — only with recorded consent (src/leadership.js)
 *   Contact     office address, map, phone, email, hours, enquiry form, grievance/escalation, social links
 *
 * Contact details come from src/contactConfig.js and render only when configured —
 * no placeholder numbers, no personal mobiles.
 */

import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight, Building2, Clock, Compass, Facebook, Globe2, HeartHandshake, Instagram, Linkedin, Lock, Mail, MapPin,
  MessageCircle, Phone, Plane, Scale, ShieldCheck, UserRound, UsersRound, Youtube,
} from 'lucide-react';
import { LeadFeedback, LeadHoneypot, useLeadCapture } from './useLeadCapture.js';
import { SiteFooter, SiteHeader } from './SiteChrome.jsx';
import { LEGAL_NAME, MAP_EMBED, MAP_LINK, OFFICE_ADDRESS, getContact, whatsappHref } from './contactConfig.js';
import { getPublishedLeaders } from './leadership.js';

const SOCIAL_ICONS = { Instagram, Facebook, LinkedIn: Linkedin, YouTube: Youtube };

function PageHero({ eyebrow, title, serif, lede, image, imageAlt }) {
  return (
    <section className="co-hero" aria-labelledby="co-title">
      {image && <div className="co-hero-media"><Image src={image} alt={imageAlt} fill sizes="100vw" preload /></div>}
      <div className="co-container co-hero-inner">
        <span className="co-eyebrow">{eyebrow}</span>
        <h1 id="co-title">{title} {serif && <em>{serif}</em>}</h1>
        {lede && <p className="co-lede">{lede}</p>}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, copy, id }) {
  return (
    <div className="co-section-head">
      <span className="co-eyebrow">{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

/* ============================== ABOUT ============================== */

const verticals = [
  { icon: Plane, title: 'Aviation', copy: 'Private jet, helicopter and air ambulance coordination, aircraft advisory, leasing and aviation concierge — always through licensed operators.', href: '/aviation' },
  { icon: UsersRound, title: 'International Club', copy: 'A travel membership for families and individuals, including pilgrimage and international journeys, under published membership terms.', href: '/club' },
  { icon: Globe2, title: 'Global Services', copy: 'Information and introductions for education, employment, business, trade, property and investment — regulated work stays with authorised partners.', href: '/global-services' },
  { icon: Building2, title: 'Franchise', copy: 'A partnership route for people who want to represent Sanatan services in their region, subject to approved franchise documents.', href: '/franchise' },
];

const principles = [
  { icon: HeartHandshake, title: 'Seva', copy: 'Service comes before the sale. We listen first and recommend only what fits.' },
  { icon: ShieldCheck, title: 'Vishwas', copy: 'Trust is earned by telling the truth — including when the answer is “not possible”.' },
  { icon: Scale, title: 'Dharma', copy: 'We work within the law and the limits of our role, and we say clearly what those limits are.' },
  { icon: Lock, title: 'Confidentiality', copy: 'Personal and travel details are shared only with the parties who need them.' },
  { icon: Compass, title: 'Transparency', copy: 'Provider, price and terms are confirmed in writing before you commit.' },
  { icon: UserRound, title: 'One accountable contact', copy: 'A named coordinator stays with each enquiry from first question to final answer.' },
];

const operatingModel = [
  ['You share a requirement', 'Through a form, call or WhatsApp — no obligation and no automated quote.'],
  ['A Sanatan coordinator reviews it', 'Clarifies the brief, explains what is possible and what is not, and identifies the right provider.'],
  ['An authorised partner delivers', 'Licensed operators, registered agents or institutions — named to you, with their terms, before you commit.'],
];

function AboutPage() {
  const { company } = getContact();
  return (
    <>
      <PageHero
        eyebrow="About Sanatan Airlines"
        title="A more personal way"
        serif="to experience the world."
        lede="We coordinate aviation, international travel membership and global services for families, businesses and pilgrims — with care, discretion and honest answers."
        image="/images/sa-about-family.jpg"
        imageAlt="A family walking together through an airport lounge toward their aircraft at sunset"
      />

      <section className="co-section co-white" aria-labelledby="co-story">
        <div className="co-container co-split">
          <SectionHead eyebrow="Our story" title="Rooted in Kolhapur, working across borders." id="co-story" />
          <div className="co-prose">
            <p>{LEGAL_NAME} was set up in Kolhapur, Maharashtra, to bring a more personal kind of coordination to journeys that matter — a charter for a family occasion, a medical transfer, a yatra, a first step toward study or business abroad.</p>
            <p>Our name reflects the values we work by: seva, vishwas and dharma. In practice that means listening carefully, being clear about what we do and do not do, and working only with providers who hold the licences their work requires.</p>
          </div>
        </div>
      </section>

      <section className="co-section co-ivory" aria-labelledby="co-mission">
        <div className="co-container co-mission">
          <span className="co-eyebrow">Mission</span>
          <p id="co-mission" className="co-mission-text">To make complex travel and cross-border plans simpler and more trustworthy — by coordinating carefully, telling the truth, and connecting people only with properly authorised providers.</p>
        </div>
      </section>

      <section className="co-section co-white" aria-labelledby="co-model">
        <div className="co-container">
          <SectionHead eyebrow="Operating model" title="We coordinate. Licensed partners deliver." id="co-model" copy="Sanatan Airlines does not own or operate aircraft, act as a recruiting agent, or give regulated financial, legal or immigration advice. Our role is coordination." />
          <ol className="co-model">
            {operatingModel.map(([title, copy], index) => (
              <li key={title} className={index === 2 ? 'is-partner' : undefined}>
                <span className="co-model-step">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="co-section co-ivory" aria-labelledby="co-verticals">
        <div className="co-container">
          <SectionHead eyebrow="Business verticals" title="Four areas, one standard of care." id="co-verticals" />
          <div className="co-verticals">
            {verticals.map(({ icon: Icon, title, copy, href }) => (
              <a className="co-vertical" href={href} key={title}>
                <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
                <span className="co-link">Explore {title} <ArrowUpRight size={14} aria-hidden="true" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="co-section co-white" aria-labelledby="co-principles">
        <div className="co-container">
          <SectionHead eyebrow="Service principles" title="How we work." id="co-principles" />
          <div className="co-principles">
            {principles.map(({ icon: Icon, title, copy }) => (
              <article key={title}>
                <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="co-section co-navy" aria-labelledby="co-governance">
        <div className="co-container co-split">
          <SectionHead eyebrow="Governance" title="Clear boundaries are part of good service." id="co-governance" />
          <div className="co-prose">
            <p>Pricing, partner credentials, service availability and legal terms are published only after review by the responsible business owner. Regulated services are delivered only by appropriately licensed or registered entities, identified before you engage.</p>
            <dl className="co-facts">
              <div><dt>Legal name</dt><dd>{LEGAL_NAME}</dd></div>
              <div><dt>Registered office</dt><dd>{OFFICE_ADDRESS}</dd></div>
              {company.cin && <div><dt>CIN</dt><dd>{company.cin}</dd></div>}
              {company.gstin && <div><dt>GSTIN</dt><dd>{company.gstin}</dd></div>}
            </dl>
            <div className="co-actions">
              <a className="co-btn co-btn-light" href="/compliance">Governance &amp; compliance <ArrowUpRight size={14} aria-hidden="true" /></a>
              <a className="co-btn co-btn-ghost" href="/leadership">Leadership</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================ LEADERSHIP ============================ */

function LeadershipPage() {
  const leaders = getPublishedLeaders();
  return (
    <>
      <PageHero eyebrow="Leadership" title="The people" serif="accountable for our work." lede="Leadership profiles are published only with management approval and each individual’s written consent." />
      <section className="co-section co-white" aria-labelledby="co-leaders">
        <div className="co-container">
          <h2 id="co-leaders" className="sr-only">Leadership team</h2>
          {leaders.length > 0 ? (
            <ul className="co-leaders">
              {leaders.map((leader) => (
                <li className="co-leader" key={leader.name}>
                  {leader.photo && (
                    <div className="co-leader-photo"><Image src={leader.photo} alt={leader.photoAlt || `Portrait of ${leader.name}`} fill sizes="(max-width: 700px) 100vw, 33vw" /></div>
                  )}
                  <h3>{leader.name}</h3>
                  <p className="co-leader-role">{leader.role}</p>
                  {(leader.bio || []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {leader.linkedin && <a className="co-link" href={leader.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}
                </li>
              ))}
            </ul>
          ) : (
            <div className="co-empty">
              <ShieldCheck size={22} aria-hidden="true" />
              <div>
                <h3>Profiles are being approved</h3>
                <p>We publish names, photographs and biographies only after management approval and each person’s written consent. Until then, please reach the company through the contact page — we do not publish personal phone numbers.</p>
                <a className="co-link" href="/contact">Contact the company <ArrowUpRight size={14} aria-hidden="true" /></a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ============================== CONTACT ============================== */

function MapEmbed() {
  // Click-to-load: Google Maps sets third-party cookies and is heavy, so it loads only on request.
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="co-map">
      {loaded ? (
        <iframe title={`Map showing ${LEGAL_NAME}, Kolhapur`} src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      ) : (
        <div className="co-map-placeholder">
          <MapPin size={26} aria-hidden="true" />
          <p>Elixa Park, Shahupuri, Kolhapur</p>
          <button type="button" className="co-btn co-btn-dark" onClick={() => setLoaded(true)}>Show map</button>
          <small>Loads Google Maps, which may set cookies.</small>
        </div>
      )}
    </div>
  );
}

function ContactForm() {
  const lead = useLeadCapture('general_enquiry');
  return (
    <form className="co-form" {...lead.formProps} aria-labelledby="co-form-title">
      <h2 id="co-form-title">Send an enquiry</h2>
      <p className="co-form-intro">A coordinator will reply using your preferred contact method.</p>
      <LeadHoneypot />
      <div className="co-form-grid">
        <label className="co-field"><span>Name <b aria-hidden="true">*</b></span><input name="name" autoComplete="name" required /></label>
        <label className="co-field"><span>Email <b aria-hidden="true">*</b></span><input name="email" type="email" autoComplete="email" required /></label>
        <label className="co-field"><span>Phone / WhatsApp <b aria-hidden="true">*</b></span><input name="phone" type="tel" autoComplete="tel" defaultValue="+91 " pattern="\+?[0-9][0-9\s.\x2d]{6,19}" title="Enter an international phone number, including country code" required /></label>
        <label className="co-field"><span>City / country <em>(optional)</em></span><input name="location" autoComplete="address-level2" /></label>
        <label className="co-field">
          <span>Topic <b aria-hidden="true">*</b></span>
          <select name="serviceCategory" defaultValue="" required>
            <option value="" disabled>Select a topic</option>
            <option>Aviation</option><option>International Club</option><option>Tirth Yatra</option><option>Global Services</option>
            <option>Franchise</option><option>Partnership</option><option>Media</option><option>Feedback or complaint</option><option>Other</option>
          </select>
        </label>
        <label className="co-field">
          <span>Preferred contact <em>(optional)</em></span>
          <select name="preferredContact" defaultValue="">
            <option value="">No preference</option><option>Phone call</option><option>WhatsApp</option><option>Email</option>
          </select>
        </label>
        <label className="co-field co-field-wide"><span>Message <b aria-hidden="true">*</b></span><textarea name="message" rows="4" required placeholder="How can we help? Please do not include passport, medical or payment details." /></label>
      </div>
      <label className="co-consent"><input name="consent" type="checkbox" required /><span>I agree to be contacted about this enquiry. <a href="/privacy-policy">Privacy Policy</a></span></label>
      <button className="co-btn co-btn-gold" type="submit" disabled={lead.isSubmitting}>{lead.isSubmitting ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={15} aria-hidden="true" /></button>
      <LeadFeedback status={lead.status} />
    </form>
  );
}

/* LocalBusiness structured data — only facts that are true and configured (brief: "only where accurate"). */
function LocalBusinessSchema({ contact }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: LEGAL_NAME,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Office No. 309, Elixa Park, Old Pune–Bangalore Highway, Shahupuri',
      addressLocality: 'Kolhapur',
      addressRegion: 'Maharashtra',
      postalCode: '416001',
      addressCountry: 'IN',
    },
    hasMap: MAP_LINK,
    ...(contact.phone ? { telephone: contact.phone.label } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.social.length ? { sameAs: contact.social.map(([, href]) => href) } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}

function ContactPage() {
  const contact = getContact();
  const wa = whatsappHref(contact.whatsapp, '/contact');
  return (
    <>
      <LocalBusinessSchema contact={contact} />
      <PageHero eyebrow="Contact" title="Talk to" serif="a coordinator." lede="Visit the Kolhapur office, call, message or send an enquiry. Every message is read by a person." />

      <section className="co-section co-white" aria-label="Contact details and enquiry form">
        <div className="co-container co-contact">
          <div className="co-contact-details">
            <h2 className="sr-only">Contact details</h2>
            <ul className="co-channels">
              <li>
                <MapPin size={19} aria-hidden="true" />
                <div><h3>Office</h3><address>{LEGAL_NAME}<br />{OFFICE_ADDRESS}</address><a className="co-link" href={MAP_LINK} target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens Google Maps)</span></a></div>
              </li>
              {contact.phone && <li><Phone size={19} aria-hidden="true" /><div><h3>Phone</h3><a href={contact.phone.href}>{contact.phone.label}</a></div></li>}
              {wa && <li><MessageCircle size={19} aria-hidden="true" /><div><h3>WhatsApp</h3><a href={wa} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></div></li>}
              {contact.email && <li><Mail size={19} aria-hidden="true" /><div><h3>Email</h3><a href={`mailto:${contact.email}`}>{contact.email}</a></div></li>}
              {contact.hours && <li><Clock size={19} aria-hidden="true" /><div><h3>Business hours</h3><p>{contact.hours}</p></div></li>}
              {!contact.phone && !contact.email && (
                <li><Mail size={19} aria-hidden="true" /><div><h3>Phone &amp; email</h3><p>Use the enquiry form — a coordinator will reply by phone, WhatsApp or email.</p></div></li>
              )}
            </ul>

            <div className="co-escalation" aria-labelledby="co-escalation-title">
              <h2 id="co-escalation-title"><ShieldCheck size={18} aria-hidden="true" /> Complaints &amp; escalation</h2>
              <ol>
                <li><strong>Raise it with us.</strong> Use the form (topic “Feedback or complaint”){contact.email ? <> or email <a href={`mailto:${contact.email}`}>{contact.email}</a></> : null}.</li>
                <li>
                  <strong>Escalate to the Grievance Officer</strong>
                  {contact.grievance.officer ? ` (${contact.grievance.officer})` : ''} if you are not satisfied
                  {contact.grievance.email ? <> — <a href={`mailto:${contact.grievance.email}`}>{contact.grievance.email}</a></> : ' — see the grievance redressal page'}.
                </li>
                <li><strong>External routes</strong> such as the Consumer Commission are explained in our <a href="/grievance-redressal">Grievance Redressal policy</a>.</li>
              </ol>
            </div>

            {contact.social.length > 0 && (
              <div className="co-social">
                <h3>Follow Sanatan</h3>
                <div>
                  {contact.social.map(([name, href]) => {
                    const Icon = SOCIAL_ICONS[name];
                    return <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} (opens in a new tab)`}><Icon size={17} aria-hidden="true" /></a>;
                  })}
                </div>
              </div>
            )}
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="co-section co-ivory co-map-section" aria-label="Office location map">
        <div className="co-container"><MapEmbed /></div>
      </section>
    </>
  );
}

const PAGES = { '/about': AboutPage, '/leadership': LeadershipPage, '/contact': ContactPage };

export function hasCompanyPage(pathname) {
  return Boolean(PAGES[pathname]);
}

export default function CompanyPage({ pathname }) {
  const Page = PAGES[pathname];
  return (
    <div className="co-page">
      <SiteHeader overlay={pathname === '/about'} />
      <main id="main"><Page /></main>
      <SiteFooter />
    </div>
  );
}
