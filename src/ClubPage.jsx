'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { LeadFeedback, LeadHoneypot, useLeadCapture } from './useLeadCapture.js';
import { SiteFooter, SiteHeader } from './SiteChrome.jsx';
import { FaqStructuredData } from './SeoStructuredData.jsx';

const plans = [
  { id: 'single', title: 'Single', description: 'A proposed format for individual travellers.' },
  { id: 'couple', title: 'Couple', description: 'A proposed format for two-person travel planning.' },
  { id: 'family', title: 'Family', description: 'A proposed format for household travel planning.' },
];

const comparisonRows = [
  'Target member',
  'Number of members',
  'Membership duration',
  'Eligible destination visits',
  'Definition of a country / destination',
  'Accommodation category',
  'Nights',
  'Transport',
  'Meals',
  'Flights',
  'Blackout dates',
  'Booking notice',
  'Taxes and fees',
  'Cancellation rules',
  'Transfer rules',
];

const clubRoutes = [
  ['Overview', '/club'],
  ['Plans', '/club/membership'],
  ['Benefits', '/club/benefits'],
  ['Destinations', '/club/destinations'],
  ['How it works', '/club/how-it-works'],
  ['FAQs', '/club/faqs'],
  ['Membership terms', '/club/terms'],
];

const routeContent = {
  overview: {
    eyebrow: 'INTERNATIONAL CLUB',
    title: <>A more considered<br /><em>way to travel.</em></>,
    description: 'A membership concept for individuals, couples and families exploring international travel with personal coordination. Final eligibility, inclusions and terms are still being defined.',
  },
  membership: {
    eyebrow: 'PLAN OVERVIEW',
    title: <>Three proposed formats.<br /><em>No assumptions.</em></>,
    description: 'Compare the intended Single, Couple and Family formats. Member counts, validity, entitlements and pricing will be published only after approval.',
  },
  single: {
    eyebrow: 'SINGLE MEMBERSHIP',
    image: '/images/single.jpg',
    imageAlt: 'A solo traveller with a backpack looking out at snow-capped Himalayan peaks',
    imagePosition: '70% 35%',
    title: <>A plan for individual<br /><em>travel planning.</em></>,
    description: 'The Single format is under development. Inclusions, member eligibility, duration and all plan terms remain subject to approval.',
  },
  couple: {
    eyebrow: 'COUPLE MEMBERSHIP',
    title: <>A shared format for<br /><em>two-person planning.</em></>,
    description: 'The Couple format is under development. The number of eligible members and all plan terms will be confirmed in approved documentation.',
  },
  family: {
    eyebrow: 'FAMILY MEMBERSHIP',
    title: <>A format for family<br /><em>travel planning.</em></>,
    description: 'The Family format is under development. Household eligibility, member limits and all plan terms remain subject to approval.',
  },
  benefits: {
    eyebrow: 'MEMBERSHIP BENEFITS',
    title: <>What is included.<br /><em>What is not.</em></>,
    description: 'We will distinguish confirmed membership services from third-party travel costs and exclusions before accepting any membership commitment.',
  },
  destinations: {
    eyebrow: 'DESTINATIONS & ENTITLEMENTS',
    title: <>Know what a visit<br /><em>means first.</em></>,
    description: 'No destination list or visit allowance is published yet. Country definitions, eligible destinations and visit rules must be finalized before a plan can be relied on.',
  },
  'how-it-works': {
    eyebrow: 'THE MEMBERSHIP PROCESS',
    title: <>Understand the terms<br /><em>before you decide.</em></>,
    description: 'The intended process is designed to explain eligibility, terms and request steps before any member makes a commitment.',
  },
  faqs: {
    eyebrow: 'MEMBERSHIP FAQs',
    title: <>Clear answers.<br /><em>No fine-print surprises.</em></>,
    description: 'The questions below identify what is and is not confirmed while the Club terms are being finalized.',
  },
  terms: {
    eyebrow: 'MEMBERSHIP TERMS',
    title: <>Terms before<br /><em>membership.</em></>,
    description: 'The membership terms are not yet approved for publication. No membership should be purchased or relied on until the final terms are available.',
  },
};

const faqItems = [
  ['What is the International Club?', 'It is a membership concept for international travel planning and personal coordination. Specific services, eligibility and benefits are still subject to approval.'],
  ['What does a plan include?', 'Final inclusions have not been approved. The published plan terms will identify each included service and any third-party costs or exclusions.'],
  ['How long is membership valid?', 'The validity period is not finalized. It will be stated in the approved terms before membership enquiries can become commitments.'],
  ['Which destinations or countries are included?', 'No destination entitlement is currently published. The final terms must define eligible destinations and exactly how a “country” or “visit” is counted.'],
  ['Are flights, accommodation, meals or transport included?', 'These items are not confirmed as inclusions. Do not assume they are included unless final approved plan terms explicitly say so.'],
  ['Are there blackout dates, taxes or booking notice periods?', 'These details are pending approval and will be disclosed in the membership terms.'],
  ['Can membership be cancelled or transferred?', 'Cancellation and transfer rules are not finalized. They will be published before any membership commitment is accepted.'],
  ['Can I buy or pay for membership online?', 'No. Online purchase and payment are out of scope. This page supports information and enquiry only.'],
];

function ClubHeader({ currentPath }) {
  return <SiteHeader />;
}

function PlanSelector({ selectedPlan, onSelect }) {
  const selected = plans.find((plan) => plan.id === selectedPlan) || plans[0];

  return (
    <div className="club-plan-selector">
      <div className="club-plan-options" role="group" aria-label="Select a plan format">
        {plans.map((plan) => (
          <button className={`club-plan-option ${selectedPlan === plan.id ? 'is-selected' : ''}`} key={plan.id} onClick={() => onSelect(plan.id)} aria-pressed={selectedPlan === plan.id}>
            <span>{plan.title}</span><small>{plan.description}</small><ArrowUpRight size={15} />
          </button>
        ))}
      </div>
      <div className="club-selected-plan" aria-live="polite">
        <div><span className="eyebrow">SELECTED FORMAT</span><h3>{selected.title}</h3><p>{selected.description}</p></div>
        <div className="club-plan-status"><ShieldCheck size={17} /><span>Price and terms pending approval</span></div>
      </div>
    </div>
  );
}

function PlanComparison({ selectedPlan }) {
  return (
    <div className="club-comparison-wrap" role="region" aria-label="Membership plan comparison" tabIndex="0">
      <table className="club-comparison-table">
        <thead><tr><th scope="col">Plan detail</th>{plans.map((plan) => <th className={selectedPlan === plan.id ? 'is-selected' : ''} scope="col" key={plan.id}>{plan.title}</th>)}</tr></thead>
        <tbody>{comparisonRows.map((row) => <tr key={row}><th scope="row">{row}</th>{plans.map((plan) => <td className={selectedPlan === plan.id ? 'is-selected' : ''} key={plan.id}>{row === 'Target member'
          ? (plan.id === 'single' ? 'Individual traveller' : plan.id === 'couple' ? 'Two registered members' : 'Approved household format')
          : 'Pending approved terms'}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function InclusionStatus() {
  return (
    <div className="club-inclusion-grid" id="club-benefits">
      <article className="club-inclusion-card club-included">
        <span className="eyebrow">INCLUDED</span><Check size={19} aria-hidden="true" />
        <h3>Not finalized yet</h3>
        <p>Specific membership services and benefits are pending management, legal and finance approval. Nothing is represented as included until it appears in the final terms.</p>
      </article>
      <article className="club-inclusion-card club-excluded">
        <span className="eyebrow">NOT INCLUDED / NOT CONFIRMED</span><ArrowRight size={19} aria-hidden="true" />
        <h3>Travel components are not assumed</h3>
        <p>Flights, accommodation, nights, transport, meals, taxes, destination visits and partner services are not confirmed as plan inclusions. Check approved terms before relying on any entitlement.</p>
      </article>
    </div>
  );
}

function MembershipLeadForm({ selectedPlan }) {
  const [planInterest, setPlanInterest] = useState(selectedPlan);
  const leadCapture = useLeadCapture('membership');

  return (
    <form className="club-lead-form" {...leadCapture.formProps}>
      <div className="club-form-heading"><span className="eyebrow">MEMBERSHIP SALES ENQUIRY</span><span>NO PAYMENT OR MEMBERSHIP COMMITMENT</span></div>
      <LeadHoneypot />
      <div className="club-form-grid">
        <label className="club-field"><span>Plan interest <b>*</b></span><select name="plan" value={planInterest} onChange={(event) => setPlanInterest(event.target.value)} required>{plans.map((plan) => <option value={plan.id} key={plan.id}>{plan.title}</option>)}</select></label>
        <label className="club-field"><span>Number of travellers <b>*</b></span><input name="travellers" type="number" min="1" required placeholder="e.g. 2" /></label>
        <label className="club-field"><span>Preferred destinations</span><input name="destinations" placeholder="Cities or countries you are considering" /></label>
        <label className="club-field"><span>Travel frequency</span><select name="frequency" defaultValue=""><option value="">Select frequency</option><option>Once a year</option><option>A few times a year</option><option>Frequent travel</option><option>Still exploring</option></select></label>
        <label className="club-field"><span>Expected start date</span><input name="startDate" type="date" /></label>
        <label className="club-field"><span>Contact name <b>*</b></span><input name="name" autoComplete="name" required placeholder="Name" /></label>
        <label className="club-field"><span>Email address <b>*</b></span><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
        <label className="club-field"><span>Phone number <b>*</b></span><input name="phone" type="tel" autoComplete="tel" defaultValue="+91 " pattern="\+?[0-9][0-9\s.\x2d]{6,19}" title="Enter an international phone number, including country code" required placeholder="+91 98765 43210" /></label>
      </div>
      <label className="club-consent"><input name="consent" type="checkbox" required /><span>I agree to be contacted about this membership enquiry and have read the <a href="/privacy-policy">Privacy Policy</a> and <a href="/club/terms">membership terms status</a>.</span></label>
      <button className="button button-dark club-submit" type="submit" disabled={leadCapture.isSubmitting}>{leadCapture.isSubmitting ? 'Sending…' : 'Send membership enquiry'} <ArrowUpRight size={15} /></button>
      <LeadFeedback status={leadCapture.status} />
      <p className="club-form-note">Enquiries are for information only. They do not reserve travel, confirm a benefit or create a membership.</p>
    </form>
  );
}

function ClubPage() {
  const pathname = usePathname() || '/club';
  const currentPath = pathname.replace(/\/$/, '') || '/club';
  const section = currentPath === '/club' ? 'overview' : currentPath.split('/').pop();
  const page = routeContent[section] || routeContent.overview;
  const initialPlan = ['single', 'couple', 'family'].includes(section) ? section : 'single';
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const isPlanPage = ['single', 'couple', 'family'].includes(section);
  const isFaqPage = section === 'faqs';
  const isTermsPage = section === 'terms';
  const isMembershipPage = section === 'membership';

  return (
    <div className="club-page">
      <ClubHeader currentPath={currentPath} />
      <aside className="club-disclosure-strip" aria-label="Membership terms disclosure"><ShieldCheck size={16} /><p>Plan details, prices, inclusions, destination entitlements and availability are not yet approved or published.</p></aside>
      <main id="main">
        <section className="club-hero">
          <div className="club-hero-copy">
            <span className="eyebrow">{page.eyebrow}</span>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
            <div className="club-hero-actions"><a className="button button-dark" href="#club-enquiry">Make a membership enquiry <ArrowDown size={15} /></a><a className="club-secondary-link" href="/club/membership">Compare plan formats <ArrowRight size={15} /></a></div>
            <span className="club-hero-note"><ShieldCheck size={15} /> Information only. No prices or guaranteed travel benefits.</span>
          </div>
          <div className="club-hero-image"><Image src={page.image || '/images/club-lounge.jpg'} alt={page.imageAlt || 'Quiet airport lounge looking toward the runway'} fill sizes="(max-width: 700px) 100vw, 55vw" preload style={page.imagePosition ? { objectPosition: page.imagePosition } : undefined} /><span>INTERNATIONAL CLUB / MEMBERSHIP CONCEPT</span></div>
        </section>

        <section className="club-concept section-pad">
          <div className="club-editorial-heading"><span className="eyebrow">WHO IT IS FOR</span><h2>For people who value<br /><em>considered travel.</em></h2></div>
          <div className="club-editorial-copy"><p>The International Club is being developed for individuals, couples and families considering international travel and personal coordination.</p><p>Single is proposed for an individual, Couple for two registered members and Family for an approved household format. Final eligibility, membership duration, inclusions, exclusions and partner fulfilment conditions have not been approved.</p><a className="text-link" href="/club/benefits">See inclusion status <ArrowRight size={15} /></a></div>
        </section>

        <section className="club-plans-section section-pad" id="club-plans">
          <div className="club-section-heading-row"><div className="club-editorial-heading"><span className="eyebrow">PLAN FORMATS</span><h2>Choose a format.<br /><em>Compare what is known.</em></h2><p>All commercial and entitlement details remain pending approved terms.</p></div><span className="club-no-price-stamp"><strong>PRICE</strong><span>NOT<br />PUBLISHED</span></span></div>
          <PlanSelector selectedPlan={selectedPlan} onSelect={setSelectedPlan} />
          {(isMembershipPage || isPlanPage || section === 'overview') && <PlanComparison selectedPlan={selectedPlan} />}
          {isPlanPage && <p className="club-plan-page-note"><strong>{plans.find((plan) => plan.id === selectedPlan)?.title} format:</strong> Membership count, validity, eligible destination visits, included services and all financial terms are pending approval.</p>}
          <a className="button button-dark" href="#club-enquiry">Ask about membership <ArrowUpRight size={15} /></a>
        </section>

        <section className="club-inclusions-section section-pad" id="club-inclusions">
          <div className="club-editorial-heading"><span className="eyebrow">INCLUSIONS & EXCLUSIONS</span><h2>Nothing assumed.<br /><em>Everything disclosed.</em></h2><p>Visible before the enquiry form, as membership policy requires.</p></div>
          <InclusionStatus />
        </section>

        <section className="club-entitlements section-pad" id="entitlements">
          <div><span className="eyebrow">DESTINATION ENTITLEMENTS</span><h2>Define a “visit”<br /><em>before counting one.</em></h2></div>
          <div className="club-entitlement-copy"><p>No eligible country list, visit allowance or destination availability is currently published. The final terms must define:</p><ul><li>Whether a “country” means a sovereign destination, region, itinerary stop or another approved unit</li><li>Whether a “visit” means a completed stay, confirmed booking, trip or another unit</li><li>Eligible accommodation categories, room occupancy and included nights</li><li>Transport, meals, flights, booking notice, blackout dates and taxes</li><li>Cancellation, refund and transfer rules, where applicable</li></ul><a href="/club/destinations" className="text-link">Destination details <ArrowRight size={15} /></a></div>
        </section>

        <section className="club-process-section section-pad" id="club-process">
          <div className="club-editorial-heading"><span className="eyebrow">HOW IT WORKS</span><h2>Information first.<br /><em>Commitment later.</em></h2></div>
          <div className="club-process-grid">
            {[
              ['01', 'Choose a plan format', 'Tell us whether you are exploring Single, Couple or Family membership.'],
              ['02', 'Share your travel needs', 'Provide destinations, traveller count and expected timing.'],
              ['03', 'Review approved terms', 'Eligibility, inclusions, validity, costs and limitations must be explained.'],
              ['04', 'Decide without pressure', 'No membership or travel is confirmed until terms and availability are agreed separately.'],
            ].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>

        <section className="club-faq-section section-pad" id="club-faqs">
          <div className="club-editorial-heading"><span className="eyebrow">{isFaqPage ? 'MEMBERSHIP FAQs' : 'NEED MORE CLARITY?'}</span><h2>Questions worth<br /><em>answering upfront.</em></h2><a className="text-link" href="/club/faqs">All membership FAQs <ArrowRight size={15} /></a></div>
          <div className="club-faq-list">{faqItems.slice(0, isFaqPage ? faqItems.length : 5).map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
          <FaqStructuredData items={faqItems.slice(0, isFaqPage ? faqItems.length : 5)} />
        </section>

        <section className="club-terms-section section-pad" id="club-terms">
          <ShieldCheck size={23} /><div><span className="eyebrow">TERMS & TRANSPARENCY</span><h2>{isTermsPage ? 'Membership terms are not yet published.' : 'Read the terms before you decide.'}</h2><p>Validity, destination entitlements, booking notice, blackout dates, taxes, cancellation and transfer rules are pending management, legal and finance approval. No draft price or unapproved benefit is shown here.</p><a href="/club/terms" className="text-link">Membership terms status <ArrowUpRight size={14} /></a></div>
        </section>

        <section className="club-lead-section section-pad" id="club-enquiry">
          <div className="club-lead-intro"><span className="eyebrow">MEMBERSHIP ENQUIRY</span><h2>Tell us what<br /><em>you have in mind.</em></h2><p>Share your plan interest and travel profile. This is an information request, not a booking or membership purchase.</p><span className="club-lead-privacy"><ShieldCheck size={16} /> Share only details needed to respond.</span></div>
          <MembershipLeadForm key={selectedPlan} selectedPlan={selectedPlan} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default ClubPage;
