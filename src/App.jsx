'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LeadFeedback, LeadHoneypot, useLeadCapture } from './useLeadCapture.js';
import { SiteFooter, SiteHeader } from './SiteChrome.jsx';
import WhyChooseSanatan from './WhyChooseSanatan.jsx';
import {
  ArrowRight, ArrowUpRight, Building2, Check, Compass, Globe2, HeartHandshake,
  MapPin, Plane, PlaneTakeoff, Send, ShieldCheck, Stethoscope, UsersRound, Waypoints,
} from 'lucide-react';

const navLinks = [
  ['Services', '#pillars'],
  ['International Club', '#pillars'],
  ['Global Network', '#global-network'],
  ['Why Sanatan', '#why-sanatan'],
  ['Insights', '#insights'],
  ['About', '#about'],
];

const pillars = [
  {
    number: '01',
    title: 'Sanatan Aviation',
    icon: PlaneTakeoff,
    copy: 'Charter flights, helicopter and medical-flight enquiry coordination through licensed operators.',
    href: '/aviation',
  },
  {
    number: '02',
    title: 'Sanatan International Club',
    icon: UsersRound,
    copy: 'Travel membership and pilgrimage or international travel coordination for families.',
    href: '/club',
  },
  {
    number: '03',
    title: 'Sanatan Global Network',
    icon: Globe2,
    copy: 'Overseas education, business and cultural services, subject to partner availability.',
    href: '/global-services',
  },
];

const aviationServices = [
  ['Private Jet Charter', 'Private jet charter coordination for route-specific enquiries.', '/aviation/private-jet-charter', Plane],
  ['Helicopter Charter', 'Location, landing and operator feasibility for regional travel.', '/aviation/helicopter-charter', Waypoints],
  ['Air Ambulance', 'Non-emergency medical-flight coordination, subject to clinical review.', '/aviation/air-ambulance', Stethoscope],
  ['Aircraft Advisory', 'Aircraft buy, sell and transaction guidance through relevant partners.', '/aviation/aircraft-advisory', Building2],
  ['Aircraft Leasing', 'Leasing enquiries reviewed by category, region and term.', '/aviation/aircraft-leasing', PlaneTakeoff],
  ['Aviation Concierge', 'Practical coordination around an aviation itinerary.', '/aviation/concierge', HeartHandshake],
];

const clubPlans = [
  ['Single', 'A proposed format for individual travel planning.', '/club/single'],
  ['Couple', 'A proposed format for two-person travel planning.', '/club/couple'],
  ['Family', 'A proposed format for household travel planning.', '/club/family'],
];

// Homepage quick actions — each routes to its dedicated service page (brief: quick links & global CTA system).
const quickEnquiries = [
  { label: 'Private Jet', note: 'Charter enquiries', icon: Plane, href: '/aviation/private-jet-charter' },
  { label: 'Helicopter', note: 'Point-to-point charters', icon: Waypoints, href: '/aviation/helicopter-charter' },
  { label: 'Air Ambulance', note: 'Planned medical flights', icon: Stethoscope, href: '/aviation/air-ambulance' },
  { label: 'Membership', note: 'International Club', icon: UsersRound, href: '/club' },
  { label: 'International Tours', note: 'Pilgrimage & family travel', icon: Compass, href: '/global-services/tours' },
  { label: 'Franchise', note: 'Partner with Sanatan', icon: Building2, href: '/franchise' },
];

const regions = [
  ['India', 'Delhi · Mumbai · Pune · Kolhapur'],
  ['Gulf & Middle East', 'Dubai · Abu Dhabi · Doha · Muscat'],
  ['Europe & UK', 'London · Frankfurt · Paris'],
  ['North America', 'New York · Toronto · Chicago'],
  ['Southeast Asia', 'Singapore · Bangkok · Kuala Lumpur'],
  ['Oceania', 'Sydney · Melbourne · Auckland'],
];

const globalChips = [
  'Overseas education',
  'Business services',
  'Property assistance',
  'Investment facilitation',
  'Trade & import-export',
  'Cultural & PR services',
];

const insights = [
  {
    image: '/images/sa-insight-safety.jpg',
    alt: 'A pilot inspecting a private jet engine at sunrise',
    category: 'Aviation safety',
    title: 'What a well-prepared charter brief actually includes',
    copy: 'Route, timing, passenger needs and flexibility — the details that help licensed operators respond with clarity.',
  },
  {
    image: '/images/sa-insight-yatra.jpg',
    alt: 'A family with luggage at riverside steps at sunrise',
    category: 'Pilgrimage travel',
    title: 'Before an international yatra: a calm family checklist',
    copy: 'Documentation, mobility, medication and meal preferences — practical steps for travelling together with grace.',
  },
  {
    image: '/images/sa-insight-education.jpg',
    alt: 'A student with a backpack in an international airport terminal',
    category: 'Overseas education',
    title: 'Guiding your child abroad, one honest conversation at a time',
    copy: 'How to frame the questions that matter before choosing a destination, course or partner for overseas study.',
  },
];

const serviceOptions = [
  'Private jet charter',
  'Helicopter charter',
  'Air ambulance',
  'International Club membership',
  'International travel / Yatra',
  'Overseas education',
  'Business services',
  'Property assistance',
  'Investment facilitation',
  'Trade & import-export',
  'Franchise enquiry',
  'Something else',
];

function Mandala() {
  const round = (value) => Math.round(value * 100) / 100;
  return (
    <svg className="sa-hero-mandala" viewBox="0 0 600 600" fill="none" aria-hidden="true">
      <circle cx="300" cy="300" r="290" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <circle cx="300" cy="300" r="240" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
      <circle cx="300" cy="300" r="185" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <circle cx="300" cy="300" r="120" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      {Array.from({ length: 24 }).map((_, index) => {
        const angle = (index * Math.PI) / 12;
        return (
          <line
            key={index}
            x1={round(300 + Math.cos(angle) * 120)}
            y1={round(300 + Math.sin(angle) * 120)}
            x2={round(300 + Math.cos(angle) * 290)}
            y2={round(300 + Math.sin(angle) * 290)}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.35"
          />
        );
      })}
      {Array.from({ length: 12 }).map((_, index) => {
        const angle = (index * Math.PI) / 6;
        return (
          <circle
            key={`dot-${index}`}
            cx={round(300 + Math.cos(angle) * 185)}
            cy={round(300 + Math.sin(angle) * 185)}
            r="3.5"
            fill="currentColor"
            opacity="0.5"
          />
        );
      })}
    </svg>
  );
}

function Globe() {
  return (
    <div className="sa-globe" aria-hidden="true">
      <svg viewBox="0 0 480 480" fill="none">
        <circle cx="240" cy="240" r="180" stroke="rgba(199,75,13,0.55)" strokeWidth="1" />
        <circle cx="240" cy="240" r="180" stroke="rgba(255,255,255,0.1)" strokeWidth="20" opacity="0.35" />
        <ellipse cx="240" cy="240" rx="180" ry="64" stroke="rgba(255,255,255,0.16)" strokeWidth="0.8" />
        <ellipse cx="240" cy="240" rx="180" ry="124" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        <ellipse cx="240" cy="240" rx="64" ry="180" stroke="rgba(255,255,255,0.16)" strokeWidth="0.8" />
        <ellipse cx="240" cy="240" rx="124" ry="180" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        <line x1="60" y1="240" x2="420" y2="240" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        <path d="M96 330C170 240 300 120 404 150" stroke="#fca156" strokeWidth="1.4" strokeDasharray="5 7" opacity="0.9" />
        <path d="M74 214C160 300 300 360 408 316" stroke="rgba(199,75,13,0.75)" strokeWidth="1.2" strokeDasharray="3 8" />
        <circle cx="96" cy="330" r="4.5" fill="#fca156" />
        <circle cx="250" cy="210" r="4.5" fill="#fca156" />
        <circle cx="404" cy="150" r="5.5" fill="#fdb377" />
        <circle cx="408" cy="316" r="4.5" fill="#fca156" />
        <circle cx="240" cy="240" r="6" fill="rgba(192,72,12,0.9)" />
        <circle cx="240" cy="240" r="16" stroke="rgba(192,72,12,0.45)" strokeWidth="1.2" />
        <circle cx="240" cy="240" r="28" stroke="rgba(192,72,12,0.22)" strokeWidth="1" />
      </svg>
    </div>
  );
}

function SectionHead({ eyebrow, title, copy, light = false }) {
  return (
    <div className="sa-section-head">
      <span className="sa-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

export default function HomePage() {
  const [serviceCategory, setServiceCategory] = useState('');
  const leadCapture = useLeadCapture('general_enquiry');

  return (
    <div className="sa-page">
      <SiteHeader overlay />
      <main id="main">
        {/* Hero */}
        <section className="sa-hero" id="home">
          <div className="sa-hero-media">
            <Image
              src="/images/HERO.jpg"
              alt="Front view of a four-propeller airliner parked on grass under an overcast sky"
              fill
              sizes="100vw"
              preload
            />
          </div>
          <Mandala />
          <div className="sa-hero-content">
            <div className="sa-container">
              <div className="sa-hero-inner">
                <span className="sa-hero-kicker">Aviation · Membership · Global Services</span>
                <h1>A More Personal Way to<br /><em>Experience the World.</em></h1>
                <p className="sa-marathi sa-hero-marathi notranslate" translate="no">श्रद्धेचा प्रवास, जगभराची साथ.</p>
                <p className="sa-hero-copy">
                  Premium aviation coordination, international travel membership and global business
                  services—connected through one personal service ecosystem.
                </p>
                <div className="sa-hero-actions">
                  <a className="sa-btn sa-btn-primary" href="#pillars">Explore Services <ArrowRight size={16} /></a>
                  <a className="sa-btn sa-btn-ghost" href="#consultation">Request a Consultation <ArrowUpRight size={16} /></a>
                </div>
                <div className="sa-hero-trust">
                  <span className="sa-trust-chip"><ShieldCheck size={15} /> Licensed operator coordination</span>
                  <span className="sa-trust-chip"><HeartHandshake size={15} /> Seva-led personal service</span>
                  <span className="sa-trust-chip"><Globe2 size={15} /> Global partner network</span>
                </div>
              </div>
            </div>
          </div>
          <a className="sa-hero-scroll" href="#pillars">Scroll to explore <span /></a>
        </section>

        {/* Pillars */}
        <section className="sa-section sa-section-white" id="pillars">
          <div className="sa-container">
            <SectionHead
              eyebrow="Our three pillars"
              title={<>Three pathways. <span className="sa-serif">One promise</span> of care.</>}
              copy="Every pillar is coordinated personally — with clarity at each step, and licensed partners wherever a service is delivered."
            />
            <div className="sa-pillars-grid">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <article className="sa-pillar-card" key={pillar.title}>
                    <div className="sa-pillar-top">
                      <span className="sa-pillar-icon"><Icon size={24} strokeWidth={1.5} /></span>
                      <span className="sa-pillar-num">{pillar.number}</span>
                    </div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.copy}</p>
                    <a className="sa-pillar-link" href={pillar.href}>Learn more<span className="sr-only"> about {pillar.title}</span> <ArrowUpRight size={15} aria-hidden="true" /></a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick enquiry */}
        <section className="sa-section sa-section-ivory" id="quick-enquiry">
          <div className="sa-container">
            <div className="sa-quick-head">
              <div>
                <span className="sa-eyebrow">A good place to begin</span>
                <h2>What brings you to us?</h2>
              </div>
              <p>Choose a starting point. A coordinator will guide the conversation from there — no obligation.</p>
            </div>
            <div className="sa-quick-grid">
              {quickEnquiries.map((item) => {
                const Icon = item.icon;
                return (
                  <a className="sa-quick-card" key={item.label} href={item.href}>
                    <span className="sa-quick-icon"><Icon size={21} strokeWidth={1.6} /></span>
                    <span className="sa-quick-label">{item.label}<small>{item.note}</small></span>
                    <ArrowUpRight className="sa-quick-arrow" size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Aviation showcase */}
        <section className="sa-section sa-section-white sa-aviation-showcase" id="aviation-services">
          <div className="sa-container">
            <SectionHead
              eyebrow="Aviation services"
              title={<>For journeys that require <span className="sa-serif">careful coordination.</span></>}
              copy="Review a service, prepare the right details and speak with a coordinator. Operator, availability and terms are confirmed individually."
            />
            <div className="sa-aviation-grid">
              {aviationServices.map(([title, copy, href, Icon]) => (
                <a className="sa-aviation-card" href={href} key={title}>
                  <span className="sa-aviation-icon"><Icon size={22} strokeWidth={1.5} /></span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <span className="sa-pillar-link">View service <ArrowUpRight size={15} /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* International Club */}
        <section className="sa-section sa-section-ivory" id="international-club">
          <div className="sa-container">
            <div className="sa-club-intro">
              <div>
                <span className="sa-eyebrow">Sanatan International Club</span>
                <h2>A developing membership concept for <span className="sa-serif">considered travel.</span></h2>
              </div>
              <div>
                <p>Designed for individuals, couples and families exploring international travel and pilgrimage planning.</p>
                <a className="sa-btn sa-btn-primary" href="/club">View membership <ArrowUpRight size={16} /></a>
              </div>
            </div>
            <div className="sa-club-plan-grid">
              {clubPlans.map(([title, copy, href]) => (
                <article className="sa-club-plan" key={title}>
                  <span className="sa-eyebrow">PLAN FORMAT</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <div className="sa-club-plan-status">Price and inclusions pending approval</div>
                  <a className="sa-pillar-link" href={href}>Explore plan <ArrowUpRight size={15} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <WhyChooseSanatan />

        {/* Global network */}
        <section className="sa-section sa-section-navy" id="global-network">
          <div className="sa-container">
            <div className="sa-global-layout">
              <div className="sa-global-copy">
                <span className="sa-eyebrow">Sanatan Global Network</span>
                <h2>One point of contact.<br />A world of <span className="sa-serif">coordination.</span></h2>
                <p>
                  From Indian cities to international destinations, our network is built on vetted
                  partners and individual confirmation — never guesswork.
                </p>
                <div className="sa-global-chips">
                  {globalChips.map((chip) => <span key={chip}>{chip}</span>)}
                </div>
                <p className="sa-global-note">
                  Destinations are listed for reference. Partner availability, routes and services
                  are confirmed individually for each enquiry.
                </p>
              </div>
              <div>
                <Globe />
                <div className="sa-regions">
                  {regions.map(([region, cities]) => (
                    <div className="sa-region" key={region}>
                      <MapPin size={16} />
                      <div><strong>{region}</strong><small>{cities}</small></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner and credential disclosure */}
        <section className="sa-section sa-section-ivory sa-partners" id="partners">
          <div className="sa-container sa-partners-layout">
            <div>
              <span className="sa-eyebrow">Partners & credentials</span>
              <h2>Trust begins with <span className="sa-serif">verified disclosure.</span></h2>
            </div>
            <div>
              <p>Operator names, credentials and partner approvals are displayed only when verified and approved for publication. No endorsement or regulatory status is implied.</p>
              <a className="sa-pillar-link" href="/partners">View partner policy <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </section>

        {/* Insights */}
        <section className="sa-section sa-section-white" id="insights">
          <div className="sa-container">
            <SectionHead
              eyebrow="Insights"
              title={<>Notes for a <span className="sa-serif">considered</span> journey.</>}
              copy="Practical reading on aviation safety, pilgrimage travel and overseas education — written for families who prefer clarity."
            />
            <div className="sa-insights-grid">
              {insights.map((item) => (
                <article className="sa-insight-card" key={item.title}>
                  <div className="sa-insight-media">
                    <Image src={item.image} alt={item.alt} fill sizes="(max-width: 900px) 100vw, 33vw" />
                  </div>
                  <div className="sa-insight-body">
                    <span className="sa-insight-cat">{item.category}</span>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                    <a className="sa-insight-link" href="/insights">Read insight <ArrowRight size={15} /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="sa-section sa-section-ivory sa-about" id="about">
          <div className="sa-container">
            <div className="sa-about-grid">
              <div className="sa-about-media">
                <div className="sa-about-media-inner">
                  <Image
                    src="/images/sa-about-family.jpg"
                    alt="An Indian family walking through a private lounge toward their aircraft"
                    fill
                    sizes="(max-width: 1080px) 100vw, 45vw"
                  />
                  <span className="sa-about-badge">Kolhapur · Maharashtra · India</span>
                </div>
              </div>
              <div className="sa-about-copy">
                <span className="sa-eyebrow">About Sanatan</span>
                <h2>Rooted in Sanatan values. <span className="sa-serif">Built for the modern world.</span></h2>
                <p>
                  Sanatan Aviation began with a simple conviction: travel, at its best, is an act of care.
                  From Kolhapur to the world, we bring together licensed aviation partners, travel
                  specialists and global service providers — coordinated by people who treat every
                  family&apos;s journey as their own.
                </p>
                <div className="sa-value-list">
                  <div className="sa-value">
                    <span className="sa-value-icon"><ShieldCheck size={18} /></span>
                    <div><strong>Vishwas</strong><span>Transparent advice and honest next steps, before any commitment.</span></div>
                  </div>
                  <div className="sa-value">
                    <span className="sa-value-icon"><HeartHandshake size={18} /></span>
                    <div><strong>Seva</strong><span>Service offered with attentiveness, patience and respect.</span></div>
                  </div>
                  <div className="sa-value">
                    <span className="sa-value-icon"><Compass size={18} /></span>
                    <div><strong>Dharma</strong><span>Doing what is right by you, your family and every partner we work with.</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation */}
        <section className="sa-section sa-section-white sa-consult" id="consultation">
          <div className="sa-container">
            <div className="sa-consult-grid">
              <div className="sa-consult-copy">
                <span className="sa-eyebrow">A conversation, not a commitment</span>
                <h2>Request a <span className="sa-serif">confidential</span> consultation.</h2>
                <p>
                  Share a few details and a coordinator will respond personally. No obligation and no
                  automated sales pressure — just clear answers about what is possible.
                </p>
                <div className="sa-consult-points">
                  <div className="sa-consult-point"><Check size={16} /> A real person, not a call queue</div>
                  <div className="sa-consult-point"><Check size={16} /> Options confirmed with licensed partners</div>
                  <div className="sa-consult-point"><Check size={16} /> Your details handled with care</div>
                </div>
                <div className="sa-consult-contact">
                  <strong>Office</strong>
                  <span>Office No. 309, Elixa Park, Old Pune–Bangalore Highway, Shahupuri, Kolhapur, Maharashtra – 416001</span>
                  <span>Phone and email details are shared on request. Appointments by prior confirmation.</span>
                </div>
              </div>

              <form className="sa-form-card" {...leadCapture.formProps} aria-label="Request a confidential consultation">
                <div className="sa-form-head">
                  <strong>Start a conversation</strong>
                  <span>Confidential</span>
                </div>
                <LeadHoneypot />
                <div className="sa-form-grid">
                  <label className="sa-field">
                    <span>Name <b>*</b></span>
                    <input name="name" autoComplete="name" placeholder="Your full name" required />
                  </label>
                  <label className="sa-field">
                    <span>Mobile <b>*</b></span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      defaultValue="+91 "
                      pattern="\+?[0-9][0-9\s.\x2d]{6,19}"
                      title="Enter an international phone number, including country code"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </label>
                  <label className="sa-field">
                    <span>Email <b>*</b></span>
                    <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                  </label>
                  <label className="sa-field">
                    <span>City / Country</span>
                    <input name="location" autoComplete="country-name" placeholder="City, country" />
                  </label>
                  <label className="sa-field">
                    <span>Service interest <b>*</b></span>
                    <select
                      id="serviceCategory"
                      name="serviceCategory"
                      value={serviceCategory}
                      onChange={(event) => { setServiceCategory(event.target.value); leadCapture.resetStatus(); }}
                      required
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option) => <option key={option}>{option}</option>)}
                    </select>
                  </label>
                  <label className="sa-field sa-field-wide">
                    <span>Message</span>
                    <textarea name="message" rows="4" placeholder="Route, dates, destination or anything we should know" />
                  </label>
                </div>
                <label className="sa-consent">
                  <input name="consent" type="checkbox" required />
                  <span>I agree to be contacted about this enquiry. View our <a href="/privacy-policy">Privacy Policy</a>.</span>
                </label>
                <button className="sa-btn sa-btn-primary sa-form-submit" type="submit" disabled={leadCapture.isSubmitting}>
                  {leadCapture.isSubmitting ? 'Sending…' : 'Send confidential enquiry'} <ArrowUpRight size={16} />
                </button>
                <p className="sa-form-hint">
                  No pricing or availability is implied by submitting this form. Every request is
                  reviewed individually.
                </p>
                <LeadFeedback status={leadCapture.status} />
              </form>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
