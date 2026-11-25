'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, Compass, Flame, Globe2,
  HeartHandshake, Home, Lock, MessageCircle, MessagesSquare, Route,
  ShieldCheck, Sparkles, User, UsersRound,
} from 'lucide-react';
import { LeadFeedback, LeadHoneypot, useLeadCapture } from './useLeadCapture.js';
import { SiteFooter, SiteHeader } from './SiteChrome.jsx';
import { FaqStructuredData } from './SeoStructuredData.jsx';
import WhyChooseSanatan from './WhyChooseSanatan.jsx';

const clubNav = [
  ['Home', '/'],
  ['Aviation Services', '/aviation'],
  ['International Club', '/club'],
  ['Global Network', '/global-services'],
  ['Insights', '/insights'],
];

const plans = [
  {
    id: 'single',
    title: 'Single',
    icon: User,
    short: 'Individual seeker',
    blurb: 'Ideal for individual seekers. Personalized travel coordination and pilgrimage guidance.',
    points: ['Personalized itinerary coordination', 'Pilgrimage timing and guidance', 'One coordinator for your journey'],
  },
  {
    id: 'couple',
    title: 'Couple',
    icon: UsersRound,
    short: 'Two travellers',
    blurb: 'Designed for two travellers. Shared journey planning with thoughtful coordination.',
    points: ['Shared journey planning', 'Stay, transfer and timing coordination', 'Considered recommendations for two'],
  },
  {
    id: 'family',
    title: 'Family',
    icon: Home,
    short: 'Travelling together',
    blurb: "For families travelling together. Holistic planning that considers every member's needs and comfort.",
    points: ['Planning for every generation', 'Assistance and comfort considerations', 'One point of contact for the family'],
  },
];

const benefits = [
  {
    icon: Route,
    title: 'Personalized travel coordination',
    copy: 'Itineraries shaped around your dates, pace and priorities, then coordinated with travel partners who understand your brief.',
  },
  {
    icon: Flame,
    title: 'Pilgrimage travel guidance',
    copy: 'Practical guidance on darshan timings, local customs and a comfortable pace at sacred destinations.',
  },
  {
    icon: Globe2,
    title: 'International destination guidance',
    copy: 'Country-level orientation on seasons, documentation, local etiquette and travel readiness.',
  },
  {
    icon: MessagesSquare,
    title: 'Priority enquiry handling',
    copy: 'A dedicated coordinator reviews membership enquiries first and stays with your planning, wherever possible.',
  },
];

const destinations = [
  { name: 'Kashi', place: 'India', line: 'Where the river remembers', image: '/images/sa-club-kashi.jpg', alt: 'Temple towers and stone ghats above the river at sunrise in Varanasi', ratio: '3 / 4' },
  { name: 'Ayodhya', place: 'India', line: 'The city of return', image: '/images/sa-club-ayodhya.jpg', alt: 'An illuminated temple rising above its reflection in the river at dusk', ratio: '4 / 5' },
  { name: 'Char Dham', place: 'Himalayas', line: 'Four doors of the mountains', image: '/images/sa-club-chardham.jpg', alt: 'A small stone shrine with prayer flags before snow-capped Himalayan peaks', ratio: '4 / 5' },
  { name: 'Rameshwaram', place: 'India', line: 'Stone corridors by the sea', image: '/images/sa-club-rameshwaram.jpg', alt: 'A long carved temple corridor opening toward the sea in warm morning light', ratio: '3 / 4' },
  { name: 'Tirupati', place: 'India', line: 'Dawn on the seven hills', image: '/images/sa-club-tirupati.jpg', alt: 'A gilded temple tower above forested hills at sunrise', ratio: '4 / 5' },
  { name: 'Shirdi', place: 'India', line: 'Stillness and light', image: '/images/sa-club-shirdi.jpg', alt: 'Lamp flames and marigolds in a white marble temple courtyard at dusk', ratio: '3 / 4' },
  { name: 'Kolhapur Mahalaxmi', place: 'India', line: 'Guardian of the Deccan', image: '/images/sa-club-kolhapur.jpg', alt: 'Carved stone temple archway opening onto a quiet courtyard', ratio: '4 / 5' },
  { name: 'Nepal', place: 'Nepal', line: 'Temples beneath the peaks', image: '/images/sa-club-nepal.jpg', alt: 'A pagoda temple with prayer flags above cloud-filled valleys and Himalayan peaks', ratio: '4 / 5' },
  { name: 'Bali', place: 'Indonesia', line: 'Dharma across the sea', image: '/images/sa-club-bali.jpg', alt: 'A Balinese water temple reflected in a lotus pond at golden hour', ratio: '3 / 4' },
  { name: 'Mauritius', place: 'Mauritius', line: 'An island of quiet devotion', image: '/images/sa-club-mauritius.jpg', alt: 'Palms, volcanic rock and turquoise water at sunset on the Mauritian coast', ratio: '4 / 5' },
  { name: 'Hindu temples in the UK', place: 'United Kingdom', line: 'Carved stone, English gardens', image: '/images/sa-club-uk.jpg', alt: 'An intricately carved Hindu temple behind formal English gardens', ratio: '3 / 4' },
  { name: 'Hindu temples in the USA', place: 'United States', line: 'New cities, old prayers', image: '/images/sa-club-usa.jpg', alt: 'A pale sandstone Hindu temple with carved towers in late afternoon light', ratio: '4 / 5' },
];

const values = [
  { icon: ShieldCheck, name: 'Vishwas', meaning: 'Trust', copy: 'Clear guidance, honest boundaries and no pressure at any stage of planning.' },
  { icon: HeartHandshake, name: 'Seva', meaning: 'Service', copy: 'Coordination offered with attentiveness, patience and respect for every traveller.' },
  { icon: Compass, name: 'Dharma', meaning: 'Right conduct', copy: 'Recommendations that consider your family, your faith and your comfort before convenience.' },
];

const terms = [
  ['What membership includes', 'Membership provides personalized travel coordination and guidance. The final scope of services is shared in writing during your consultation, before any commitment is made.'],
  ['Coordination, not a fixed package', 'Sanatan coordinates with partner airlines, hotels, transport providers and destination specialists. Travel services are delivered by those partners and remain subject to their own terms and availability.'],
  ['Availability and confirmation', 'No destination, date, itinerary or inclusion is guaranteed by this page. Every journey is confirmed individually in writing, subject to partner availability and final confirmation.'],
  ['Partner networks', 'Our partner network evolves over time. Where a particular partner or arrangement is unavailable, we will discuss suitable alternatives with you.'],
  ['Travel documents, health and insurance', 'Travellers remain responsible for valid passports, visas, vaccinations and adequate travel insurance. We can offer guidance, but approvals rest with the relevant authorities and providers.'],
  ['Changes, cancellation and privacy', 'Changes and cancellations follow the terms of the relevant partners and are explained before confirmation. Enquiry details are handled confidentially under our Privacy Policy.'],
];

const faqs = [
  ['How do I join the Sanatan International Club?', 'Begin with a membership enquiry. A coordinator will speak with you about the formats, what coordination includes and what it does not, before anything is decided.'],
  ['Is the club a fixed package?', 'No. Membership is a personalized coordination service. Journeys are planned around each member and confirmed individually.'],
  ['Are prices shown on this website?', 'No. Membership terms are discussed personally during your consultation, and no payment is taken on this site.'],
  ['Can you arrange pilgrimage journeys?', 'Yes. Pilgrimage guidance sits at the heart of the club, including Kashi, Ayodhya, Char Dham, Tirupati, Shirdi and destinations abroad, subject to availability.'],
  ['Do you guarantee a destination or specific dates?', 'No. Requests are coordinated with partner networks, but availability, dates and itineraries are confirmed only for your specific journey.'],
  ['Is membership suitable for a single traveller?', 'Yes. The Single format is designed for individual seekers and receives the same personal coordination as every other format.'],
];

const enquiryTerms = [
  ['What happens after I submit?', 'A coordinator reviews your enquiry and responds personally. Nothing is booked, charged or committed at this stage.'],
  ['How is availability confirmed?', 'Every destination, date and arrangement is checked against partner availability and confirmed individually in writing.'],
  ['Where can I read the membership terms?', 'The current membership terms status is available on the membership terms page. Final terms are shared with you before any commitment.'],
];


function TrustChips({ className = 'sa-m-trust' }) {
  return (
    <div className={className}>
      <span className="sa-trust-chip"><Lock size={14} /> Confidential</span>
      <span className="sa-trust-chip"><Sparkles size={14} /> Personalized</span>
      <span className="sa-trust-chip"><HeartHandshake size={14} /> Rooted in Sanatan values</span>
    </div>
  );
}

function DestinationTicker() {
  return (
    <div className="sa-m-ticker" aria-hidden="true">
      <div className="sa-m-ticker-track">
        {/* Static list (brand brief: no tickers/marquees) — rendered once, wraps on small screens */}
        {destinations.map((destination) => (
          <span key={destination.name}>{destination.name}<i>✦</i></span>
        ))}
      </div>
    </div>
  );
}

function MembershipForm({ plan, onPlanChange }) {
  const leadCapture = useLeadCapture('membership');

  return (
    <form className="sa-form-card sa-m-form" {...leadCapture.formProps}>
      <div className="sa-m-form-head">
        <strong>Membership enquiry</strong>
        <span>No payment<br />No commitment</span>
      </div>
      <LeadHoneypot />
      <div className="sa-form-grid">
        <label className="sa-field">
          <span>Preferred membership type <b>*</b></span>
          <select name="plan" value={plan} onChange={(event) => onPlanChange(event.target.value)} required>
            <option value="single">Single — individual traveller</option>
            <option value="couple">Couple — two travellers</option>
            <option value="family">Family — travelling together</option>
          </select>
        </label>
        <label className="sa-field">
          <span>Travellers <b>*</b></span>
          <input name="travellers" type="number" min="1" required placeholder="e.g. 2" />
        </label>
        <label className="sa-field">
          <span>Name <b>*</b></span>
          <input name="name" autoComplete="name" required placeholder="Your full name" />
        </label>
        <label className="sa-field">
          <span>Mobile / WhatsApp <b>*</b></span>
          <input name="phone" type="tel" autoComplete="tel" defaultValue="+91 " pattern="\+?[0-9][0-9\s.\x2d]{6,19}" title="Enter an international phone number, including country code" required placeholder="+91 98765 43210" />
        </label>
        <label className="sa-field sa-field-wide">
          <span>Email <b>*</b></span>
          <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
        </label>
        <label className="sa-field">
          <span>Destinations in mind</span>
          <input name="destinations" placeholder="e.g. Kashi, Tirupati, Nepal" />
        </label>
        <label className="sa-field">
          <span>Preferred travel window</span>
          <input name="startDate" type="date" />
        </label>
        <label className="sa-field sa-field-wide">
          <span>Message</span>
          <textarea name="message" placeholder="Anything we should consider — pace, elders, children or a preferred call time" />
        </label>
      </div>
      <label className="sa-consent">
        <input name="consent" type="checkbox" required />
        <span>I agree to be contacted about this membership enquiry and have read the <a href="/privacy-policy">Privacy Policy</a>.</span>
      </label>
      <button className="sa-btn sa-btn-primary sa-form-submit" type="submit" disabled={leadCapture.isSubmitting}>
        {leadCapture.isSubmitting ? 'Sending…' : 'Submit Enquiry'} <ArrowUpRight size={15} />
      </button>
      <LeadFeedback status={leadCapture.status} />
      <p className="sa-m-form-note">
        <b>What happens next.</b> Our team will guide you through membership options and personalized travel coordination. All journeys are subject to availability and final confirmation. No payment is taken on this site.
      </p>
    </form>
  );
}

function TierCard({ plan, index, onChoosePlan }) {
  const Icon = plan.icon;
  return (
    <article className="sa-m-tier">
      <div className="sa-m-tier-top">
        <span className="sa-m-tier-icon"><Icon size={22} aria-hidden="true" /></span>
        <span className="sa-m-tier-index">0{index + 1}</span>
      </div>
      <h3>{plan.title}</h3>
      <p>{plan.blurb}</p>
      <ul className="sa-m-tier-list">
        {plan.points.map((point) => <li key={point}><Check size={14} aria-hidden="true" />{point}</li>)}
      </ul>
      <button className="sa-m-tier-cta" type="button" onClick={() => onChoosePlan(plan.id)} aria-label={`Enquire about ${plan.title} membership`}>
        Enquire about membership <ArrowUpRight size={15} aria-hidden="true" />
      </button>
    </article>
  );
}

function OverviewSections({ plan, onChoosePlan, onPlanChange }) {
  return (
    <>
      <section className="sa-section sa-section-white sa-m-intro" id="welcome">
        <div className="sa-container">
          <div className="sa-m-intro-grid">
            <div className="sa-m-copy">
              <span className="sa-eyebrow">A membership of care</span>
              <h2>Travel that begins<br />with <em>understanding.</em></h2>
              <p>Some journeys ask for more than a booking. They ask for context — the right season, a comfortable pace, the small details that let a family be fully present.</p>
              <p>The International Club exists for those journeys. We listen first, then coordinate with trusted travel partners, so pilgrimage and international travel feel considered from the very first conversation.</p>
              <ul className="sa-m-intro-list">
                <li><Check size={16} aria-hidden="true" /> One coordinator who knows your family, your pace and your priorities.</li>
                <li><Check size={16} aria-hidden="true" /> Guidance rooted in respect for faith, tradition and local custom.</li>
                <li><Check size={16} aria-hidden="true" /> Coordination you can question openly — nothing is assumed or added quietly.</li>
              </ul>
            </div>
            <div className="sa-m-portrait">
              <div className="sa-m-portrait-frame">
                <Image src="/images/sa-club-family.jpg" alt="A family walking together toward a hilltop temple at golden hour" fill sizes="(max-width: 900px) 90vw, 44vw" />
                <span className="sa-m-portrait-tag">Families travelling together</span>
              </div>
              <div className="sa-m-portrait-quote">
                <span>The Sanatan way</span>
                <strong>Guided by faith.<br />Coordinated with care.</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sa-section sa-section-ivory sa-m-tiers" id="membership">
        <div className="sa-container">
          <div className="sa-m-head">
            <span className="sa-eyebrow">Membership formats</span>
            <h2>Three ways to belong.<br /><em>One standard of care.</em></h2>
            <p>Choose the format that fits your household. Every format receives the same personal attention — the difference is simply who is travelling.</p>
          </div>
          <div className="sa-m-tier-grid">
            {plans.map((item, index) => <TierCard key={item.id} plan={item} index={index} onChoosePlan={onChoosePlan} />)}
          </div>
          <p className="sa-m-tier-foot">
            <ShieldCheck size={15} aria-hidden="true" /> Membership is a personalized coordination service, not a fixed package. Scope and availability are discussed personally and confirmed individually.
          </p>
        </div>
      </section>

      <section className="sa-section sa-section-white sa-m-benefits" id="benefits">
        <div className="sa-container">
          <div className="sa-m-head-row">
            <div className="sa-m-head">
              <span className="sa-eyebrow">What membership brings</span>
              <h2>Quiet support,<br /><em>present throughout.</em></h2>
              <p>Membership is built around four kinds of care — each offered personally, never as an automated promise.</p>
            </div>
            <p className="sa-m-head-aside">Coordination is subject to partner networks, seasonality and availability. Every arrangement is confirmed individually before you rely on it.</p>
          </div>
          <div className="sa-m-benefit-grid">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <article className="sa-m-benefit" key={benefit.title}>
                  <div className="sa-m-benefit-head">
                    <span className="sa-m-benefit-icon"><Icon size={20} aria-hidden="true" /></span>
                    <span className="sa-m-benefit-num">0{index + 1}</span>
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.copy}</p>
                </article>
              );
            })}
          </div>
          <p className="sa-m-note-line">
            <ShieldCheck size={15} aria-hidden="true" /> Sanatan coordinates travel enquiries. Airlines, hotels, transport and destination services are provided by independent partners under their own terms.
          </p>
        </div>
      </section>

      <WhyChooseSanatan />

      <section className="sa-section sa-section-ivory sa-m-dest" id="destinations">
        <div className="sa-container">
          <div className="sa-m-head">
            <span className="sa-eyebrow">Destination inspiration</span>
            <h2>Sacred places.<br /><em>Wider horizons.</em></h2>
            <p>From India&rsquo;s pilgrimage cities to temples and coastlines beyond, these are the places members most often ask about.</p>
          </div>
          <p className="sa-m-dest-note">
            <ShieldCheck size={15} aria-hidden="true" /> Shown for inspiration only. No destination, date or itinerary is confirmed or promised. Availability is discussed personally.
          </p>
          <div className="sa-m-dest-grid">
            {destinations.map((destination) => (
              <figure className="sa-m-dest-tile" key={destination.name} style={{ '--tile-ratio': destination.ratio }}>
                <Image src={destination.image} alt={destination.alt} fill sizes="(max-width: 700px) 78vw, (max-width: 1080px) 45vw, 30vw" />
                <figcaption className="sa-m-dest-cap">
                  <span>{destination.place}</span>
                  <strong>{destination.name}</strong>
                  <small>{destination.line}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-section sa-section-navy sa-m-values" id="values">
        <div className="sa-container">
          <div className="sa-m-values-grid">
            <div className="sa-m-values-media">
              <Image src="/images/sa-club-offering.jpg" alt="Brass lamps, marigold petals and folded silk on a temple ledge at dawn" fill sizes="(max-width: 900px) 90vw, 42vw" />
            </div>
            <div className="sa-m-values-copy">
              <span className="sa-eyebrow">Rooted in Sanatan</span>
              <h2>Vishwas. Seva.<br /><em>Dharma.</em></h2>
              <p>A membership should feel like a relationship, not a transaction. These three values shape how we listen, what we recommend and how we say no when something is not right for you.</p>
              <ul className="sa-m-value-list">
                {values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <li className="sa-m-value-row" key={value.name}>
                      <span className="sa-m-value-icon"><Icon size={19} aria-hidden="true" /></span>
                      <div>
                        <h3>{value.name}<span>{value.meaning}</span></h3>
                        <p>{value.copy}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="sa-m-values-note">Sanatan International Club coordinates advice and travel enquiries. Sanatan does not own or operate airlines, hotels or tour operators, and does not guarantee any travel outcome.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sa-section sa-section-white sa-m-terms" id="terms">
        <div className="sa-container">
          <div className="sa-m-terms-grid">
            <div className="sa-m-terms-side">
              <span className="sa-eyebrow">Membership terms</span>
              <h2>Clear terms,<br /><em>before you decide.</em></h2>
              <p>These notes explain the boundaries of a coordination membership. They are a summary, not the final membership agreement.</p>
              <a className="sa-m-textlink" href="/club/terms">Membership terms status <ArrowUpRight size={14} /></a>
            </div>
            <div className="sa-m-accordion">
              {terms.map(([question, answer]) => (
                <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sa-section sa-section-ivory sa-m-faq" id="faqs">
        <div className="sa-container">
          <div className="sa-m-terms-grid">
            <div className="sa-m-terms-side">
              <span className="sa-eyebrow">Questions</span>
              <h2>Answers that<br /><em>respect your time.</em></h2>
              <p>If something is not clear, ask us directly. We would rather explain carefully now than surprise a member later.</p>
              <a className="sa-m-textlink" href="/club/faqs">All membership FAQs <ArrowRight size={14} /></a>
            </div>
            <div className="sa-m-accordion">
              {faqs.map(([question, answer]) => (
                <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
              ))}
            </div>
            <FaqStructuredData items={faqs} />
          </div>
        </div>
      </section>

      <section className="sa-section sa-m-enquiry" id="club-enquiry">
        <div className="sa-container">
          <div className="sa-m-enquiry-grid">
            <div className="sa-m-enquiry-copy">
              <span className="sa-eyebrow">Membership enquiry</span>
              <h2>Request<br /><em>membership information.</em></h2>
              <p>Tell us who is travelling and what you have in mind. A coordinator will respond personally to explain the formats, the coordination involved and what would suit your family.</p>
              <ol className="sa-m-next-list">
                <li><i>01</i><div><strong>Tell us about your journey</strong><p>Membership format, traveller count and any destinations you are considering.</p></div></li>
                <li><i>02</i><div><strong>Speak with a coordinator</strong><p>A personal conversation about pacing, priorities and considerations for elders or children.</p></div></li>
                <li><i>03</i><div><strong>Decide with clarity</strong><p>Nothing is confirmed and no payment is taken here. Terms are explained before any commitment.</p></div></li>
              </ol>
              <div className="sa-m-coordinator">
                <h3><MessageCircle size={16} aria-hidden="true" /> Prefer to speak first?</h3>
                <p>Share a preferred call time in your message and we will arrange a conversation at your convenience.</p>
              </div>
              <TrustChips className="sa-m-enquiry-trust" />
            </div>
            <MembershipForm plan={plan} onPlanChange={onPlanChange} />
          </div>
        </div>
      </section>
    </>
  );
}

function EnquiryExperience({ plan, onPlanChange }) {
  return (
    <>
      <section className="sa-m-ehero">
        <div className="sa-container">
          <div className="sa-m-ehero-grid">
            <div>
              <span className="sa-eyebrow">Membership enquiry</span>
              <h1>A conversation,<br /><em>not a commitment.</em></h1>
              <p className="sa-m-ehero-copy">Share a few details about who is travelling and what you have in mind. A coordinator will respond personally — there is no payment on this site and no obligation to proceed.</p>
              <div className="sa-m-ehero-actions">
                <a className="sa-btn sa-btn-primary" href="#club-enquiry">Go to the enquiry form <ArrowDown size={15} /></a>
                <a className="sa-btn sa-btn-ghost" href="/club">Back to the club <ArrowRight size={15} /></a>
              </div>
              <TrustChips />
            </div>
            <div className="sa-m-ehero-figure">
              <div className="sa-m-ehero-media">
                <Image src="/images/sa-club-family.jpg" alt="A family walking together toward a hilltop temple at golden hour" fill sizes="(max-width: 900px) 90vw, 44vw" preload />
              </div>
              <p className="sa-m-ehero-quote">&ldquo;The best journeys begin with someone listening.&rdquo;</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sa-section sa-m-enquiry" id="club-enquiry">
        <div className="sa-container">
          <div className="sa-m-planchooser" role="group" aria-label="Preferred membership type">
            {plans.map((item) => {
              const Icon = item.icon;
              const selected = plan === item.id;
              return (
                <button
                  className={`sa-m-plan-option${selected ? ' is-selected' : ''}`}
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onPlanChange(item.id)}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span>{item.title}<small>{item.short}</small></span>
                  <Check className="sa-m-plan-check" size={16} aria-hidden="true" />
                </button>
              );
            })}
          </div>
          <div className="sa-m-enquiry-grid">
            <div className="sa-m-enquiry-copy">
              <span className="sa-eyebrow">Your enquiry</span>
              <h2>Tell us what<br /><em>you have in mind.</em></h2>
              <p>There are no forms to rush through and no prices on this page. Just the details a coordinator needs to respond thoughtfully.</p>
              <ol className="sa-m-next-list">
                <li><i>01</i><div><strong>We read your enquiry</strong><p>A coordinator reviews the details you share and prepares relevant options.</p></div></li>
                <li><i>02</i><div><strong>A coordinator replies personally</strong><p>Expect a considered response about formats, pacing and coordination.</p></div></li>
                <li><i>03</i><div><strong>You decide, unhurried</strong><p>Nothing is confirmed until terms are explained and you choose to proceed.</p></div></li>
              </ol>
              <div className="sa-m-coordinator">
                <h3><MessageCircle size={16} aria-hidden="true" /> A note on contact</h3>
                <p>Please share a mobile number with WhatsApp enabled, or a preferred call time, so a coordinator can reach you comfortably.</p>
              </div>
              <TrustChips className="sa-m-enquiry-trust" />
            </div>
            <MembershipForm plan={plan} onPlanChange={onPlanChange} />
          </div>
        </div>
      </section>

      <section className="sa-section sa-section-white sa-m-terms" id="club-terms-note">
        <div className="sa-container">
          <div className="sa-m-terms-grid">
            <div className="sa-m-terms-side">
              <span className="sa-eyebrow">Before you send</span>
              <h2>What we can<br /><em>and cannot promise.</em></h2>
              <p>Membership coordinates. It does not guarantee a destination, a date or a fixed itinerary. These notes explain how confirmation works.</p>
              <a className="sa-m-textlink" href="/club/terms">Membership terms status <ArrowUpRight size={14} /></a>
            </div>
            <div className="sa-m-accordion">
              {enquiryTerms.map(([question, answer]) => (
                <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function LuxuryTravelPage({ mode = 'overview' }) {
  const isEnquiry = mode === 'enquiry';
  const pathname = usePathname() || '/club';
  const isCoupleRoute = pathname === '/club/couple';
  const isFamilyRoute = pathname === '/club/family';
  const isBenefitsRoute = pathname === '/club/benefits';
  const isDestinationsRoute = pathname === '/club/destinations';
  const isHowItWorksRoute = pathname === '/club/how-it-works';
  const isFaqsRoute = pathname === '/club/faqs';
  const heroImage = isCoupleRoute
    ? '/images/couple.jpg'
    : isFamilyRoute
      ? '/images/family.jpg'
      : isBenefitsRoute
        ? '/images/benifits.jpg'
        : isDestinationsRoute
          ? '/images/destination.jpg'
          : isHowItWorksRoute
            ? '/images/guide.jpg'
            : isFaqsRoute
              ? '/images/faq.jpg'
              : '/images/membership.jpg';
  const heroAlt = isCoupleRoute
    ? 'Couple travelling together'
    : isFamilyRoute
      ? 'Family travelling together'
      : isBenefitsRoute
        ? 'International Club membership benefits'
      : isDestinationsRoute
        ? 'International Club destinations'
        : isHowItWorksRoute
          ? 'Membership guidance and travel planning'
          : isFaqsRoute
            ? 'International Club frequently asked questions'
            : 'Several hands meeting together in a high-five';
  const heroPosition = isCoupleRoute || isFamilyRoute || isBenefitsRoute || isDestinationsRoute || isHowItWorksRoute || isFaqsRoute ? 'center 45%' : 'center 40%';
  const [plan, setPlan] = useState('single');
  const [scrolledPast, setScrolledPast] = useState(false);
  const [formInView, setFormInView] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const observers = [];
    const watch = (element, setter, rootMargin) => {
      if (!element) return;
      const observer = new IntersectionObserver(([entry]) => setter(entry.isIntersecting), { rootMargin });
      observer.observe(element);
      observers.push(observer);
    };
    watch(document.getElementById('club-enquiry'), setFormInView, '0px 0px -18% 0px');
    watch(document.querySelector('.sa-footer'), setFooterInView, '0px');
    const onScroll = () => setScrolledPast(window.scrollY > 620);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener('scroll', onScroll);
    };
  }, [mode]);

  const choosePlan = (id) => {
    setPlan(id);
    document.getElementById('club-enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const stickyVisible = scrolledPast && !formInView && !footerInView;

  return (
    <div className="sa-page sa-m" id="home">
      <SiteHeader overlay />

      <main id="main">
        {!isEnquiry && (
        <section className="sa-m-hero">
          <div className="sa-m-hero-media">
            <Image
              src={heroImage}
              alt={heroAlt}
              fill
              sizes="100vw"
              preload
              style={{ objectPosition: heroPosition }}
            />
          </div>
          <div className="sa-m-hero-inner">
            <div className="sa-container">
              <div className="sa-m-hero-copy">
                <span className="sa-eyebrow">A Sanatan Aviation membership</span>
                <h1>Sanatan<br />International <em>Club</em></h1>
                <p className="sa-m-hero-sub">Personalized travel membership for individuals, couples, and families — guided by faith, coordinated with care.</p>
                <p className="sa-m-hero-support">Pilgrimage journeys and international travel coordination rooted in Sanatan values.</p>
                <div className="sa-m-hero-actions">
                  <a className="sa-btn sa-btn-primary" href="#club-enquiry">Request membership information <ArrowDown size={15} /></a>
                  <a className="sa-btn sa-btn-ghost" href="#destinations">Explore destinations <ArrowRight size={15} /></a>
                </div>
                <TrustChips />
              </div>
            </div>
          </div>
          <DestinationTicker />
        </section>
      )}

      {isEnquiry ? <EnquiryExperience plan={plan} onPlanChange={setPlan} /> : <OverviewSections plan={plan} onChoosePlan={choosePlan} onPlanChange={setPlan} />}
      </main>

      <div className={`sa-m-sticky${stickyVisible ? ' is-visible' : ''}`}>
        <span className="sa-m-sticky-label">Membership enquiry<small>Personal coordinator</small></span>
        <a className="sa-btn sa-btn-primary" href="#club-enquiry">Request information <ArrowUpRight size={14} /></a>
      </div>

      <SiteFooter />
    </div>
  );
}

export default LuxuryTravelPage;
