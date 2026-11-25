'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Compass,
  Flame,
  HeartHandshake,
  LockKeyhole,
  MapPin,
  Mountain,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  Waypoints,
} from 'lucide-react';
import { SiteFooter, SiteHeader } from './SiteChrome.jsx';
import { LeadFeedback, LeadHoneypot, useLeadCapture } from './useLeadCapture.js';

const yatraNav = [
  ['Home', '/'],
  ['Aviation Services', '/aviation'],
  ['Tirth Yatra', '/tirth-yatra'],
  ['International Club', '/club'],
  ['Global Network', '/global-services'],
];

const DISCLAIMERS = [
  'All yatras are coordinated through partners and are subject to availability.',
  'Darshan timings, temple access, and itineraries depend on temple authorities and local conditions and cannot be guaranteed.',
];

const seasons = [
  { value: 'Summer', label: 'Summer', months: 'Apr–Jun' },
  { value: 'Monsoon', label: 'Monsoon', months: 'Jul–Sep' },
  { value: 'Autumn', label: 'Autumn', months: 'Oct–Nov' },
  { value: 'Winter', label: 'Winter', months: 'Dec–Mar · peak & off-peak' },
];

const groups = [
  { id: 'solo', label: 'Solo traveller' },
  { id: 'couple', label: 'Couple' },
  { id: 'small-family', label: 'Small family' },
  { id: 'group', label: 'Group' },
];

const regions = ['North India', 'South India', 'West India', 'East India', 'Himalayan'];

const intents = [
  'Just exploring',
  'Would like personal guidance',
  'Ready to discuss coordination',
];

const categoryIcons = {
  'char-dham': Mountain,
  jyotirlinga: Flame,
  shaktipeeth: Sun,
  ashtavinayak: Waypoints,
};

const categories = [
  {
    id: 'char-dham',
    name: 'Char Dham',
    marathi: 'चार धाम',
    kicker: 'The four Himalayan abodes',
    image: '/images/sa-yatra-chardham.jpg',
    alt: 'A stone Himalayan shrine at sunrise with a few pilgrims walking up its steps',
    region: 'Himalayan & North India',
    summary: 'Yamunotri, Gangotri, Kedarnath and Badrinath — approached with patience, rest and a realistic pace for the altitude.',
    seasons: ['Summer'],
    groups: ['couple', 'small-family', 'group'],
    points: [
      'A paced sequence, with acclimatisation and rest woven into the plan rather than added at the end.',
      'Stays, transfers and local guidance coordinated through partners, subject to routes and seasonal access.',
      'Honest briefings on what weather, temple timings and mountain conditions may change.',
    ],
    note: 'Usually discussed for the summer window, when the high-altitude routes are open. Access remains subject to temple authorities and local conditions.',
  },
  {
    id: 'jyotirlinga',
    name: 'Jyotirlinga',
    marathi: 'ज्योतिर्लिंग',
    kicker: 'The twelve shrines of Shiva',
    image: '/images/sa-club-rameshwaram.jpg',
    alt: 'A long carved temple corridor opening toward the sea at golden hour',
    region: 'West, South & North India',
    summary: 'The twelve shrines of Shiva, approached by region and at your pace — a single sacred stop, a short cluster, or a wider pilgrimage over time.',
    seasons: ['Autumn', 'Winter'],
    groups: ['solo', 'couple', 'small-family'],
    points: [
      'A region-led plan — western, southern or northern clusters — shaped around the days you have.',
      'Guidance on queues, local customs and quieter windows, based on current temple information.',
      'Partner-coordinated travel between shrines, with rest days held in the rhythm.',
    ],
    note: 'Often planned for autumn and winter. Darshan timings and access remain with temple authorities and local conditions.',
  },
  {
    id: 'shaktipeeth',
    name: 'Shaktipeeth',
    marathi: 'शक्तिपीठ',
    kicker: 'The seats of the Devi',
    image: '/images/sa-yatra-shaktipeeth.jpg',
    alt: 'Carved stone pillars, brass lamps and red hibiscus flowers at a Devi temple at golden hour',
    region: 'East, West & North India',
    summary: 'The seats of the Devi, visited with care for ritual, local custom and the needs of every traveller — from Kolhapur to the eastern Shakti shrines.',
    seasons: ['Autumn', 'Winter'],
    groups: ['solo', 'small-family', 'group'],
    points: [
      'A respectful, unhurried approach to each shrine, with local guidance where it helps.',
      'Coordination of stays and transfers through partners, with family needs kept in view.',
      'Space in the plan for prayer, rest and the unexpected.',
    ],
    note: 'Autumn and winter are often discussed. Ritual calendars and temple access remain specific to each shrine and its authorities.',
  },
  {
    id: 'ashtavinayak',
    name: 'Ashtavinayak',
    marathi: 'अष्टविनायक',
    kicker: 'The eight Ganesha shrines',
    image: '/images/sa-yatra-ashtavinayak.jpg',
    alt: 'A Maharashtra-style stone temple with a carved shikhara, lit by oil lamps at dusk',
    region: 'West India · Maharashtra',
    summary: 'The eight Ganesha temples of Maharashtra — a calm circuit through towns, hills and courtyards, linked by road and held at a gentle rhythm.',
    seasons: ['Monsoon', 'Winter'],
    groups: ['solo', 'couple', 'small-family', 'group'],
    points: [
      'A route shaped around your starting city, available days and comfort with road travel.',
      'Stays and transfers coordinated through local partners, subject to availability.',
      'Guidance on temple etiquette and the quieter hours at each shrine.',
    ],
    note: 'Monsoon and winter are often discussed. Road conditions and temple timings depend on local authorities and conditions.',
  },
];

const journeys = [
  {
    name: 'Char Dham, at a considered pace',
    category: 'char-dham',
    region: 'Himalayan',
    season: 'Summer',
    groups: ['couple', 'small-family', 'group'],
    line: 'Yamunotri, Gangotri, Kedarnath and Badrinath, with rest and weather contingencies held in the plan.',
  },
  {
    name: 'Kedarnath & Badrinath',
    category: 'char-dham',
    region: 'Himalayan',
    season: 'Summer',
    groups: ['couple', 'group'],
    line: 'Two of the four abodes for travellers who prefer a shorter high-altitude journey.',
  },
  {
    name: 'Kashi Vishwanath',
    category: 'jyotirlinga',
    region: 'North India',
    season: 'Winter',
    groups: ['solo', 'couple'],
    line: 'The oldest living city, approached through quiet morning and evening windows.',
  },
  {
    name: 'Somnath & Dwarka',
    category: 'jyotirlinga',
    region: 'West India',
    season: 'Winter',
    groups: ['couple', 'small-family'],
    line: 'A pilgrimage along the Gujarat coast, paced with unhurried time beside the sea.',
  },
  {
    name: 'Rameshwaram & Madurai',
    category: 'jyotirlinga',
    region: 'South India',
    season: 'Winter',
    groups: ['small-family', 'group'],
    line: 'Carved corridors, the Ramanathaswamy shrine and the temple city of Madurai.',
  },
  {
    name: 'Kashi & Prayagraj',
    category: 'jyotirlinga',
    region: 'North India',
    season: 'Autumn',
    groups: ['solo', 'small-family', 'group'],
    line: 'A northern pilgrimage along the Ganga, with unhurried time at each stop.',
  },
  {
    name: 'Kolhapur & the western Shakti shrines',
    category: 'shaktipeeth',
    region: 'West India',
    season: 'Autumn',
    groups: ['solo', 'small-family'],
    line: 'Mahalaxmi of Kolhapur and neighbouring Devi shrines, visited at a gentle pace.',
  },
  {
    name: 'Kamakhya & the eastern Shakti shrines',
    category: 'shaktipeeth',
    region: 'East India',
    season: 'Autumn',
    groups: ['group'],
    line: 'A considered journey through Assam’s Shakti landscape with local guidance throughout.',
  },
  {
    name: 'The Ashtavinayak circuit',
    category: 'ashtavinayak',
    region: 'West India',
    season: 'Monsoon',
    groups: ['small-family', 'group'],
    line: 'The eight Ganesha shrines of Maharashtra, linked by road and held at a calm rhythm.',
  },
  {
    name: 'Morgaon, Siddhatek & Theur',
    category: 'ashtavinayak',
    region: 'West India',
    season: 'Winter',
    groups: ['solo', 'couple'],
    line: 'A shorter Ashtavinayak sequence for travellers with fewer days to travel.',
  },
];

const howSteps = [
  ['Explore', 'Wander through the four paths and the suggested journeys. Nothing is reserved, and nothing is rushed.'],
  ['Enquire', 'Share the path, season and group you have in mind. A short enquiry, with no payment and no obligation.'],
  ['Personal Guidance', 'A coordinator reviews your enquiry and speaks with you about what may be possible — honestly, and in confidence.'],
  ['Coordinated Journey', 'If the path feels right, we coordinate stays, transfers and local guidance through our partners, subject to availability and temple schedules.'],
];

const categoryById = Object.fromEntries(categories.map((category) => [category.id, category]));
const seasonByValue = Object.fromEntries(seasons.map((season) => [season.value, season]));
const groupByValue = Object.fromEntries(groups.map((group) => [group.id, group]));

function formatGroups(ids) {
  return ids.map((id) => groupByValue[id]?.label).filter(Boolean).join(' · ');
}

function formatSeasons(values) {
  return values.map((value) => seasonByValue[value]?.label).filter(Boolean).join(' / ');
}

function TrustChips({ light = false }) {
  return (
    <div className={`sa-y-trust${light ? ' sa-y-trust-light' : ''}`}>
      <span className="sa-trust-chip"><LockKeyhole size={14} aria-hidden="true" /> Confidential Enquiry</span>
      <span className="sa-trust-chip"><HeartHandshake size={14} aria-hidden="true" /> Personalized Coordination</span>
      <span className="sa-trust-chip"><Sparkles size={14} aria-hidden="true" /> Rooted in Sanatan Values</span>
    </div>
  );
}

function DisclaimerStrip() {
  return (
    <div className="sa-y-notice">
      <div className="sa-container sa-y-notice-inner">
        {DISCLAIMERS.map((note) => (
          <p key={note}><ShieldCheck size={15} aria-hidden="true" /><span>{note}</span></p>
        ))}
      </div>
    </div>
  );
}

function HeroAside() {
  return (
    <aside className="sa-y-hero-aside">
      <span className="sa-y-hero-aside-label">A quiet promise</span>
      <p>We do not sell a fixed package. We help you understand the path, the season and what may be possible — then coordinate carefully.</p>
      <span className="sa-y-hero-aside-marathi sa-marathi">श्रद्धा · सेवा · धर्म</span>
    </aside>
  );
}

function OverviewHero({ onStart }) {
  return (
    <section className="sa-y-hero">
      <Image
        className="sa-y-hero-img"
        src="/images/tirath-yatra.jpg"
        alt="Sacred Himalayan temple and pilgrimage landscape"
        fill
        preload
        sizes="100vw"
      />
      <div className="sa-y-hero-scrim" aria-hidden="true" />
      <div className="sa-y-mandala" aria-hidden="true" />
      <div className="sa-container sa-y-hero-inner">
        <div className="sa-y-hero-copy">
          <span className="sa-eyebrow">The Sanatan pilgrimage desk</span>
          <h1>Tirth Yatra<br /><em>Coordination</em></h1>
          <p className="sa-y-hero-sub">Explore sacred pilgrimages with personalized guidance and careful coordination.</p>
          <p className="sa-y-hero-lede">Faith-led journeys, held at a gentle pace and coordinated through trusted partners. This desk prepares an enquiry — it does not confirm darshan, dates or temple access.</p>
          <div className="sa-y-hero-actions">
            <button className="sa-btn sa-btn-primary" type="button" onClick={onStart}>
              Start Your Yatra Enquiry <ArrowRight size={16} aria-hidden="true" />
            </button>
            <a className="sa-btn sa-btn-ghost" href="#paths">
              Explore the paths <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <TrustChips />
        </div>
        <HeroAside />
      </div>
    </section>
  );
}

function EnquiryHero({ onStart }) {
  return (
    <section className="sa-y-ehero">
      <Image
        className="sa-y-hero-img"
        src="/images/tirath-yatra.jpg"
        alt="Sacred Himalayan temple and pilgrimage landscape"
        fill
        preload
        sizes="100vw"
      />
      <div className="sa-y-hero-scrim" aria-hidden="true" />
      <div className="sa-y-mandala" aria-hidden="true" />
      <div className="sa-container sa-y-ehero-grid">
        <div className="sa-y-ehero-copy">
          <span className="sa-eyebrow">Tirth Yatra enquiry</span>
          <h1>Begin with a<br /><em>conversation.</em></h1>
          <p>Share the path you are drawn to and the people travelling with you. A coordinator will respond personally — with guidance, not pressure.</p>
          <div className="sa-y-hero-actions">
            <button className="sa-btn sa-btn-primary" type="button" onClick={onStart}>
              Go to the enquiry form <ArrowDown size={16} aria-hidden="true" />
            </button>
            <a className="sa-btn sa-btn-ghost" href="/tirth-yatra">
              Explore the four paths <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <TrustChips />
        </div>
        <aside className="sa-y-ehero-card">
          <span className="sa-y-ehero-card-label">What happens next</span>
          <ol>
            <li><i>01</i><span>A coordinator reads the details you share and prepares relevant options.</span></li>
            <li><i>02</i><span>Expect a personal reply about possible coordination, seasons and pacing.</span></li>
            <li><i>03</i><span>Nothing is reserved or confirmed here. Any arrangement is discussed and confirmed individually.</span></li>
          </ol>
          <p className="sa-y-ehero-card-foot"><LockKeyhole size={14} aria-hidden="true" /> Your enquiry remains confidential.</p>
        </aside>
      </div>
    </section>
  );
}

function ApproachSection() {
  return (
    <section className="sa-section sa-section-white sa-y-intro">
      <div className="sa-container">
        <div className="sa-y-intro-grid">
          <div className="sa-y-intro-copy">
            <span className="sa-eyebrow">The Sanatan approach</span>
            <h2>A pilgrimage is<br /><em>a promise kept gently.</em></h2>
            <p>Sanatan coordinates Tirth Yatra enquiries — not fixed tours. We listen to what matters: the shrine you hold close, the people travelling with you, and the pace your body can keep. Then we help shape a journey through partners we trust.</p>
            <p>Nothing on this page is a booking. Darshan timings, temple access and road conditions rest with temple authorities and local conditions. What we offer is careful preparation, honest guidance and a coordinator who stays with the details.</p>
            <TrustChips light />
          </div>
          <figure className="sa-y-intro-figure">
            <div className="sa-y-intro-media">
              <Image
                src="/images/sa-insight-yatra.jpg"
                alt="A family standing together at the ghats in Varanasi at sunrise"
                fill
                sizes="(max-width: 900px) 92vw, 44vw"
              />
            </div>
            <figcaption>
              <span aria-hidden="true">&ldquo;</span>
              <p>The journey should feel like your own — not a package to keep up with.</p>
            </figcaption>
          </figure>
        </div>
        <div className="sa-y-principles">
          <div>
            <span>01</span>
            <h3>A conversation first</h3>
            <p>Your enquiry is read by a person, not routed into a checkout. We begin with what you are seeking.</p>
          </div>
          <div>
            <span>02</span>
            <h3>One point of contact</h3>
            <p>A coordinator stays with your planning, so you are not repeating the same details to different people.</p>
          </div>
          <div>
            <span>03</span>
            <h3>Room for the unexpected</h3>
            <p>Temples, weather and roads keep their own rhythm. We plan with humility and keep alternatives in view.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PathsSection({ activeCategory, onChooseCategory, categoryCounts, hasFilters, onEnquire }) {
  const active = categoryById[activeCategory];

  return (
    <section className="sa-section sa-section-ivory sa-y-paths-section">
      <div className="sa-container">
        <div className="sa-y-head">
          <span className="sa-eyebrow">The four paths</span>
          <h2>Four ways to begin.<br /><em>One careful hand.</em></h2>
          <p>Open a path to understand its rhythm. Every path can be explored without committing to dates, a route or a booking.</p>
        </div>

        <div className="sa-y-paths" role="group" aria-label="Yatra categories">
          {categories.map((category, index) => {
            const count = categoryCounts[category.id] || 0;
            const selected = category.id === activeCategory;
            return (
              <button
                className={`sa-y-path${selected ? ' is-active' : ''}${count === 0 && hasFilters ? ' is-quiet' : ''}`}
                key={category.id}
                type="button"
                aria-pressed={selected}
                aria-controls="yatra-path-detail"
                onClick={() => onChooseCategory(category.id)}
              >
                <span className="sa-y-path-media">
                  <Image src={category.image} alt="" fill sizes="(max-width: 700px) 88vw, (max-width: 1000px) 46vw, 24vw" />
                </span>
                <span className="sa-y-path-shade" aria-hidden="true" />
                <span className="sa-y-path-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="sa-y-path-body">
                  <span className="sa-y-path-kicker">{category.kicker}</span>
                  <span className="sa-y-path-name">{category.name}<em className="sa-marathi notranslate" translate="no">{category.marathi}</em></span>
                  <span className="sa-y-path-region">{category.region}</span>
                  <span className="sa-y-path-foot">
                    <span className="sa-y-path-count">
                      {count === 0 && hasFilters ? 'No matching journeys' : `${count} ${count === 1 ? 'journey' : 'journeys'}`}
                    </span>
                    <span className="sa-y-path-open">Open overview <ArrowUpRight size={13} aria-hidden="true" /></span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="sa-y-detail" id="yatra-path-detail">
          <div className="sa-y-detail-media">
            <Image
              key={active.image}
              src={active.image}
              alt={active.alt}
              fill
              sizes="(max-width: 900px) 92vw, 44vw"
            />
            <span className="sa-y-detail-caption">{active.kicker}</span>
          </div>
          <div className="sa-y-detail-copy" key={active.id}>
            <span className="sa-eyebrow">{active.kicker}</span>
            <h3>{active.name} <span className="sa-marathi notranslate" translate="no">{active.marathi}</span></h3>
            <p className="sa-y-detail-summary">{active.summary}</p>
            <ul className="sa-y-points">
              {active.points.map((point) => (
                <li key={point}><span aria-hidden="true">✦</span>{point}</li>
              ))}
            </ul>
            <div className="sa-y-detail-meta">
              <span><CalendarDays size={14} aria-hidden="true" /> {formatSeasons(active.seasons)}</span>
              <span><Users size={14} aria-hidden="true" /> {formatGroups(active.groups)}</span>
            </div>
            <p className="sa-y-detail-note">{active.note}</p>
            <div className="sa-y-detail-actions">
              <button className="sa-btn sa-btn-primary" type="button" onClick={() => onEnquire(active.id)}>
                Enquire about this Yatra <ArrowRight size={16} aria-hidden="true" />
              </button>
              <a className="sa-y-quiet-link" href="#suggested-yatras">
                See suggested journeys <ArrowDown size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterChip({ pressed, onClick, children }) {
  return (
    <button className={`sa-y-chip${pressed ? ' is-on' : ''}`} type="button" aria-pressed={pressed} onClick={onClick}>
      {children}
    </button>
  );
}

function FilterDock({ filters, hasFilters, matchCount, onFilter, onReset }) {
  return (
    <div className="sa-y-dock" id="yatra-filters">
      <div className="sa-container sa-y-dock-inner">
        <div className="sa-y-dock-head">
          <div>
            <span className="sa-eyebrow">Refine your interest</span>
            <p>Region, season and group size update the paths and suggested journeys below. Filters do not reserve a place or confirm darshan.</p>
          </div>
          <div className="sa-y-dock-status" role="status" aria-live="polite">
            <strong>{matchCount}</strong>
            <span>{matchCount === 1 ? 'journey in view' : 'journeys in view'}</span>
            <button className="sa-y-reset" type="button" onClick={onReset} disabled={!hasFilters}>
              <RotateCcw size={14} aria-hidden="true" /> Reset
            </button>
          </div>
        </div>

        <div className="sa-y-chipgroups">
          <div className="sa-y-chipgroup" role="group" aria-label="Region">
            <span className="sa-y-filter-label"><MapPin size={13} aria-hidden="true" /> Region</span>
            <div className="sa-y-chips">
              <FilterChip pressed={filters.region === 'All'} onClick={() => onFilter('region', 'All')}>All regions</FilterChip>
              {regions.map((region) => (
                <FilterChip key={region} pressed={filters.region === region} onClick={() => onFilter('region', region)}>{region}</FilterChip>
              ))}
            </div>
          </div>
          <div className="sa-y-chipgroup" role="group" aria-label="Travel season">
            <span className="sa-y-filter-label"><CalendarDays size={13} aria-hidden="true" /> Travel season</span>
            <div className="sa-y-chips">
              <FilterChip pressed={filters.season === 'All'} onClick={() => onFilter('season', 'All')}>All seasons</FilterChip>
              {seasons.map((season) => (
                <FilterChip key={season.value} pressed={filters.season === season.value} onClick={() => onFilter('season', season.value)}>
                  {season.label}
                </FilterChip>
              ))}
            </div>
          </div>
          <div className="sa-y-chipgroup" role="group" aria-label="Group size">
            <span className="sa-y-filter-label"><Users size={13} aria-hidden="true" /> Group size</span>
            <div className="sa-y-chips">
              <FilterChip pressed={filters.group === 'All'} onClick={() => onFilter('group', 'All')}>All sizes</FilterChip>
              {groups.map((group) => (
                <FilterChip key={group.id} pressed={filters.group === group.id} onClick={() => onFilter('group', group.id)}>
                  {group.id === 'solo' ? 'Solo' : group.label}
                </FilterChip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JourneyCard({ journey, index, onEnquire }) {
  const category = categoryById[journey.category];
  const Icon = categoryIcons[journey.category];
  return (
    <article className="sa-y-journey" style={{ '--i': index }}>
      <div className="sa-y-journey-top">
        <span className="sa-y-journey-category"><Icon size={14} aria-hidden="true" /> {category.name}</span>
        <span className="sa-y-journey-number">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3>{journey.name}</h3>
      <p>{journey.line}</p>
      <div className="sa-y-meta">
        <span><MapPin size={13} aria-hidden="true" /> {journey.region}</span>
        <span><CalendarDays size={13} aria-hidden="true" /> {seasonByValue[journey.season].label}</span>
      </div>
      <div className="sa-y-journey-foot">
        <span className="sa-y-journey-groups">{formatGroups(journey.groups)}</span>
        <button className="sa-y-yatra-link" type="button" onClick={() => onEnquire(journey.category)}>
          Enquire <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

function FinderSection({
  filters,
  onResetFilters,
  filteredJourneys,
  hasFilters,
  onEnquire,
}) {
  const filterKey = `${filters.region}-${filters.season}-${filters.group}`;
  const activeSummary = [
    filters.region !== 'All' ? filters.region : null,
    filters.season !== 'All' ? seasonByValue[filters.season]?.label : null,
    filters.group !== 'All' ? groupByValue[filters.group]?.label : null,
  ].filter(Boolean);

  return (
    <section className="sa-section sa-section-white sa-y-finder" id="suggested-yatras">
      <div className="sa-container">
        <div className="sa-y-find-head">
          <div className="sa-y-head">
            <span className="sa-eyebrow">Suggested journeys</span>
            <h2>Find a rhythm<br /><em>that fits.</em></h2>
            <p>These are starting points for a conversation, not fixed departures. The filters above shape this list without reloading the page.</p>
          </div>
          <div className="sa-y-count" aria-hidden="true">
            <strong>{filteredJourneys.length}</strong>
            <span>{filteredJourneys.length === 1 ? 'journey' : 'journeys'} to explore</span>
          </div>
        </div>

        <p className="sa-y-filter-summary">
          {activeSummary.length > 0 ? `Showing ${activeSummary.join(' · ')}. ` : 'Showing every suggested journey. '}
          These notes describe a possible rhythm only — not availability, dates or darshan access.
        </p>

        {filteredJourneys.length > 0 ? (
          <div className="sa-y-journeys" key={filterKey}>
            {filteredJourneys.map((journey, index) => (
              <JourneyCard journey={journey} index={index} key={journey.name} onEnquire={onEnquire} />
            ))}
          </div>
        ) : (
          <div className="sa-y-empty">
            <Compass size={26} aria-hidden="true" />
            <h3>No suggested journeys match those filters.</h3>
            <p>The four paths are still open to explore. Try a wider season or group size, or tell us what you have in mind.</p>
            <button className="sa-btn sa-btn-dark" type="button" onClick={onResetFilters}>
              Reset filters <RotateCcw size={15} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="sa-section sa-section-navy sa-y-how">
      <div className="sa-container">
        <div className="sa-y-how-head">
          <span className="sa-eyebrow">How it works</span>
          <h2>Four quiet steps,<br /><em>no pressure.</em></h2>
          <p>From first curiosity to a coordinated journey, the pace stays yours. An enquiry does not reserve a place or confirm dates.</p>
        </div>
        <ol className="sa-y-steps">
          {howSteps.map(([title, copy], index) => (
            <li key={title}>
              <span className="sa-y-step-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
        <div className="sa-y-how-foot">
          <span><ShieldCheck size={14} aria-hidden="true" /> All coordination remains subject to partner availability and temple schedules.</span>
          <a href="/privacy-policy">How we handle your details <ArrowUpRight size={13} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}

function InterestStrip({ onGuide }) {
  return (
    <section className="sa-y-soft">
      <div className="sa-container sa-y-soft-inner">
        <div>
          <span className="sa-eyebrow">No pressure</span>
          <h2>Not ready to plan?<br /><em>Stay in touch.</em></h2>
          <p>Choose “Just exploring” in the enquiry form and we will keep your interest on record, sharing guidance when the season and route information is clearer.</p>
        </div>
        <button className="sa-btn sa-btn-dark" type="button" onClick={onGuide}>
          Receive guidance, not a booking <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function EnquiryForm({ focused, formValues, onFieldChange, onChooseCategory }) {
  const leadCapture = useLeadCapture('tirth_yatra');

  return (
    <form className="sa-form-card sa-y-form" {...leadCapture.formProps}>
      <div className="sa-y-form-head">
        <div>
          <span className="sa-eyebrow">Yatra enquiry</span>
          <h3>Request coordination</h3>
        </div>
        <span>No payment<br />No commitment</span>
      </div>

      {focused && (
        <div className="sa-y-chooser" role="group" aria-label="Preferred yatra category">
          <span className="sa-y-chooser-label">I am drawn to</span>
          <div className="sa-y-chooser-options">
            {categories.map((category) => {
              const Icon = categoryIcons[category.id];
              return (
                <button
                  className={`sa-y-chooser-option${formValues.category === category.id ? ' is-selected' : ''}`}
                  key={category.id}
                  type="button"
                  aria-pressed={formValues.category === category.id}
                  onClick={() => onChooseCategory(category.id)}
                >
                  <Icon size={15} aria-hidden="true" /> {category.name}
                </button>
              );
            })}
            <button
              className={`sa-y-chooser-option${formValues.category === 'Not sure yet' ? ' is-selected' : ''}`}
              type="button"
              aria-pressed={formValues.category === 'Not sure yet'}
              onClick={() => onChooseCategory('Not sure yet')}
            >
              <Compass size={15} aria-hidden="true" /> Guide me
            </button>
          </div>
        </div>
      )}

      <LeadHoneypot />
      <div className="sa-form-grid sa-y-form-grid">
        <label className="sa-field">
          <span>Full name <b>*</b></span>
          <input name="name" autoComplete="name" required placeholder="Your full name" />
        </label>
        <label className="sa-field">
          <span>Mobile / WhatsApp <b>*</b></span>
          <input name="phone" type="tel" autoComplete="tel" defaultValue="+91 " pattern="\+?[0-9][0-9\s.\x2d]{6,19}" title="Enter an international phone number, including country code" required placeholder="+91 98765 43210" />
        </label>
        <label className="sa-field">
          <span>Email <b>*</b></span>
          <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
        </label>
        <label className="sa-field">
          <span>Preferred yatra category <b>*</b></span>
          <select name="serviceCategory" value={formValues.category} onChange={onFieldChange('category')} required>
            <option value="">Select a path</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            <option value="Not sure yet">Not sure yet — guide me</option>
          </select>
        </label>
        <label className="sa-field">
          <span>Preferred travel season <b>*</b></span>
          <select name="timing" value={formValues.timing} onChange={onFieldChange('timing')} required>
            <option value="">Select a season</option>
            {seasons.map((season) => <option key={season.value} value={season.value}>{season.label} · {season.months}</option>)}
          </select>
        </label>
        <label className="sa-field">
          <span>Approximate group size <b>*</b></span>
          <select name="passengers" value={formValues.passengers} onChange={onFieldChange('passengers')} required>
            <option value="">Select a group size</option>
            {groups.map((group) => <option key={group.id} value={group.id}>{group.label}</option>)}
          </select>
        </label>
        <label className="sa-field sa-field-wide">
          <span>Preferred region <b>*</b></span>
          <select name="region" value={formValues.region} onChange={onFieldChange('region')} required>
            <option value="">Select a region</option>
            {regions.map((region) => <option key={region} value={region}>{region}</option>)}
          </select>
        </label>
        <label className="sa-field sa-field-wide">
          <span>Where are you in your planning?</span>
          <select name="intent" value={formValues.intent} onChange={onFieldChange('intent')}>
            <option value="">Select one (optional)</option>
            {intents.map((intent) => <option key={intent} value={intent}>{intent}</option>)}
          </select>
        </label>
        <label className="sa-field sa-field-wide">
          <span>Additional message or special requirements</span>
          <textarea name="message" placeholder="Anything we should consider — elders, children, mobility, a preferred call time or a shrine that is close to your heart" />
        </label>
      </div>

      <label className="sa-consent">
        <input name="consent" type="checkbox" required />
        <span>I agree to be contacted about this yatra enquiry and have read the <a href="/privacy-policy">Privacy Policy</a>.</span>
      </label>

      <button className="sa-btn sa-btn-primary sa-form-submit" type="submit" disabled={leadCapture.isSubmitting}>
        {leadCapture.isSubmitting ? 'Sending…' : 'Submit Yatra Enquiry'} <ArrowUpRight size={15} aria-hidden="true" />
      </button>
      <LeadFeedback status={leadCapture.status} />
      <p className="sa-y-form-note">Our team will review your enquiry and guide you on possible coordination options. Final arrangements depend on partner availability and temple schedules.</p>
      <ul className="sa-y-form-terms">
        {DISCLAIMERS.map((note) => <li key={note}>{note}</li>)}
      </ul>
    </form>
  );
}

function EnquirySection({ focused, formValues, onFieldChange, onChooseCategory }) {
  return (
    <section className={`sa-section sa-y-enquiry${focused ? ' is-focused' : ''}`} id="yatra-enquiry">
      <div className="sa-container">
        <div className="sa-y-enquiry-grid">
          <div className="sa-y-enquiry-copy">
            <span className="sa-eyebrow">Request coordination</span>
            <h2>{focused ? <>Share what is<br /><em>on your heart.</em></> : <>Tell us where your<br /><em>faith is leading.</em></>}</h2>
            <p>Share a few details and a coordinator will respond personally with possible coordination options. There is no payment on this site, and no obligation to proceed.</p>
            <ol className="sa-y-next">
              <li><i>01</i><div><strong>We read your enquiry</strong><p>A coordinator reviews the path, season and group you have shared.</p></div></li>
              <li><i>02</i><div><strong>A personal conversation</strong><p>We discuss what may be possible, including pace, elders, children and accessibility.</p></div></li>
              <li><i>03</i><div><strong>You decide, unhurried</strong><p>Any arrangement is checked with partners and confirmed individually before it becomes final.</p></div></li>
            </ol>
            <div className="sa-y-contact-note">
              <h3><LockKeyhole size={15} aria-hidden="true" /> A note on contact</h3>
              <p>Prefer to speak first? Add a convenient call time in your message. A WhatsApp-enabled number is easiest for a personal reply.</p>
            </div>
            <TrustChips light />
            <div className="sa-y-disclaimers">
              {DISCLAIMERS.map((note) => (
                <p key={note}><ShieldCheck size={14} aria-hidden="true" /><span>{note}</span></p>
              ))}
            </div>
          </div>
          <EnquiryForm
            focused={focused}
            formValues={formValues}
            onFieldChange={onFieldChange}
            onChooseCategory={onChooseCategory}
          />
        </div>
      </div>
    </section>
  );
}

function MobileEnquireBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const node = document.getElementById('yatra-enquiry');
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`sa-y-mobile-bar${hidden ? ' is-hidden' : ''}`}>
      <a href="#yatra-enquiry">
        Start Your Yatra Enquiry <ArrowRight size={15} aria-hidden="true" />
      </a>
      <p>Partner coordination · subject to availability</p>
    </div>
  );
}

function ClosingNote() {
  return (
    <section className="sa-y-closing">
      <div className="sa-container sa-y-closing-inner">
        <TrustChips light />
        <div className="sa-y-closing-copy">
          <p>Every enquiry is read by a person. There is no pressure, no payment and no fixed package waiting at the end.</p>
          <a className="sa-y-quiet-link" href="/tirth-yatra">Explore all four paths <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}

export default function TirthYatraPage({ mode = 'overview' }) {
  const isOverview = mode === 'overview';
  const [activeCategory, setActiveCategory] = useState('char-dham');
  const [filters, setFilters] = useState({ region: 'All', season: 'All', group: 'All' });
  const activeCategoryRef = useRef(activeCategory);
  activeCategoryRef.current = activeCategory;
  const [formValues, setFormValues] = useState({
    category: '',
    timing: '',
    passengers: '',
    region: '',
    intent: '',
  });

  const filteredJourneys = useMemo(() => journeys.filter((journey) => (
    (filters.region === 'All' || journey.region === filters.region)
    && (filters.season === 'All' || journey.season === filters.season)
    && (filters.group === 'All' || journey.groups.includes(filters.group))
  )), [filters]);

  const categoryCounts = useMemo(() => Object.fromEntries(
    categories.map((category) => [
      category.id,
      filteredJourneys.filter((journey) => journey.category === category.id).length,
    ]),
  ), [filteredJourneys]);

  const hasFilters = filters.region !== 'All' || filters.season !== 'All' || filters.group !== 'All';

  useEffect(() => {
    if (!hasFilters) return;
    if ((categoryCounts[activeCategoryRef.current] || 0) > 0) return;
    const next = categories.find((category) => (categoryCounts[category.id] || 0) > 0);
    if (next) setActiveCategory(next.id);
  }, [categoryCounts, hasFilters]);

  const scrollToEnquiry = () => {
    window.setTimeout(() => {
      const node = document.getElementById('yatra-enquiry');
      if (!node) return;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      node.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }, 30);
  };

  const enquireAbout = (categoryId) => {
    if (categoryId) {
      setActiveCategory(categoryId);
      setFormValues((current) => ({
        ...current,
        category: categoryId,
        region: filters.region !== 'All' ? filters.region : current.region,
        timing: filters.season !== 'All' ? filters.season : current.timing,
        passengers: filters.group !== 'All' ? filters.group : current.passengers,
      }));
    }
    scrollToEnquiry();
  };

  const saveInterest = () => {
    setFormValues((current) => ({ ...current, intent: 'Just exploring' }));
    scrollToEnquiry();
  };

  const setFilterValue = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const resetFilters = () => setFilters({ region: 'All', season: 'All', group: 'All' });

  const onFieldChange = (key) => (event) => {
    const value = event.target.value;
    setFormValues((current) => ({ ...current, [key]: value }));
  };

  const onChooseCategory = (categoryId) => {
    setFormValues((current) => ({ ...current, category: categoryId }));
    if (categoryById[categoryId]) setActiveCategory(categoryId);
  };

  return (
    <div className="sa-page sa-y">
      <SiteHeader overlay />
      <main id="main">
        {isOverview
          ? <OverviewHero onStart={scrollToEnquiry} />
          : <EnquiryHero onStart={scrollToEnquiry} />}
        <DisclaimerStrip />
        {isOverview ? (
          <>
            <ApproachSection />
            <div className="sa-y-explore" id="paths">
              <FilterDock
                filters={filters}
                hasFilters={hasFilters}
                matchCount={filteredJourneys.length}
                onFilter={setFilterValue}
                onReset={resetFilters}
              />
              <PathsSection
                activeCategory={activeCategory}
                onChooseCategory={setActiveCategory}
                categoryCounts={categoryCounts}
                hasFilters={hasFilters}
                onEnquire={enquireAbout}
              />
              <FinderSection
                filters={filters}
                onResetFilters={resetFilters}
                filteredJourneys={filteredJourneys}
                hasFilters={hasFilters}
                onEnquire={enquireAbout}
              />
            </div>
            <HowItWorks />
            <InterestStrip onGuide={saveInterest} />
            <EnquirySection
              focused={false}
              formValues={formValues}
              onFieldChange={onFieldChange}
              onChooseCategory={onChooseCategory}
            />
            <ClosingNote />
          </>
        ) : (
          <>
            <EnquirySection
              focused
              formValues={formValues}
              onFieldChange={onFieldChange}
              onChooseCategory={onChooseCategory}
            />
            <HowItWorks />
            <InterestStrip onGuide={saveInterest} />
            <ClosingNote />
          </>
        )}
      </main>
      <SiteFooter />
      <MobileEnquireBar />
    </div>
  );
}
