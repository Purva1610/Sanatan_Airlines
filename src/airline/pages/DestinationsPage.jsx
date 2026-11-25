'use client';
import { Briefcase, Globe2, Luggage, Map, Plane, Users } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';

const REGIONS = {
  'India': [
    { city: 'Delhi', airport: 'IGI', freq: 'Daily, 12x', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1000&q=80' },
    { city: 'Mumbai', airport: 'CSIA', freq: 'Daily, 15x', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&q=80' },
    { city: 'Bengaluru', airport: 'KIAL', freq: 'Daily, 10x', img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1000&q=80' },
    { city: 'Chennai', airport: 'MAA', freq: 'Daily, 8x', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&q=80' },
    { city: 'Kolkata', airport: 'NSCB', freq: 'Daily, 6x', img: 'https://images.unsplash.com/photo-1536421469767-80559bb6f5e1?w=1000&q=80' },
    { city: 'Hyderabad', airport: 'RGIA', freq: 'Daily, 7x', img: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=1000&q=80' },
  ],
  'South & Southeast Asia': [
    { city: 'Singapore', airport: 'SIN', freq: 'Daily', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1000&q=80' },
    { city: 'Bangkok', airport: 'BKK', freq: '7x weekly', img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1000&q=80' },
    { city: 'Colombo', airport: 'CMB', freq: 'Daily', img: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1000&q=80' },
    { city: 'Kuala Lumpur', airport: 'KUL', freq: '6x weekly', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1000&q=80' },
  ],
  'Middle East': [
    { city: 'Dubai', airport: 'DXB', freq: 'Daily, 4x', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1000&q=80' },
    { city: 'Abu Dhabi', airport: 'AUH', freq: 'Daily', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1000&q=80' },
    { city: 'Doha', airport: 'DOH', freq: '5x weekly', img: 'https://images.unsplash.com/photo-1669815007479-494b3b51c2c3?w=1000&q=80' },
  ],
  'Europe': [
    { city: 'London', airport: 'LHR', freq: 'Daily', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1000&q=80' },
    { city: 'Paris', airport: 'CDG', freq: '5x weekly', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1000&q=80' },
    { city: 'Frankfurt', airport: 'FRA', freq: '5x weekly', img: 'https://images.unsplash.com/photo-1577185816322-21f2a92b1342?w=1000&q=80' },
    { city: 'Amsterdam', airport: 'AMS', freq: '4x weekly', img: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1000&q=80' },
  ],
  'Americas': [
    { city: 'New York', airport: 'JFK', freq: 'Daily', img: 'https://images.unsplash.com/photo-1546436836-07a91091f160?w=1000&q=80' },
    { city: 'Chicago', airport: "O'Hare", freq: '4x weekly', img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1000&q=80' },
    { city: 'Toronto', airport: 'YYZ', freq: '4x weekly', img: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=1000&q=80' },
  ],
  'East Asia & Pacific': [
    { city: 'Tokyo', airport: 'NRT', freq: 'Daily', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1000&q=80' },
    { city: 'Sydney', airport: 'SYD', freq: '5x weekly', img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1000&q=80' },
    { city: 'Melbourne', airport: 'MEL', freq: '4x weekly', img: 'https://images.unsplash.com/photo-1546268060-2592ff93ee24?w=1000&q=80' },
  ],
};

export default function DestinationsPage() {
  const { t } = useI18n();
  const [activeRegion, setActiveRegion] = useState('India');
  const destinations = REGIONS[activeRegion] || [];
  return (
    <PageLayout>

      {/* ── FULL-BLEED EDITORIAL HERO ── */}
      <section className="dn-hero" style={{ position: 'relative', minHeight: 520, display: 'flex', alignItems: 'flex-end' }}>
        <img className="dn-hero-img" src="/images/india/agra-taj-reflection.jpg" alt="Taj Mahal reflected in its garden pool" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="dn-hero-shade" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(22,35,118,0.92) 0%, rgba(22,35,118,0.4) 55%, transparent 100%)' }} />
        <div className="dn-hero-content" style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--al-container)', margin: '0 auto', padding: '0 24px 56px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <div className="dn-eyebrow" style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--al-flame)', marginBottom: 10 }}>Where Will You Go?</div>
              <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 12 }}>85 Destinations.<br />Infinite Possibilities.</h1>
              <p style={{ fontSize: 16, color: 'rgba(215,242,250,0.8)', maxWidth: 500, lineHeight: 1.6 }}>From the temples of Varanasi to the towers of Tokyo — Sanatan Airlines connects India to the world.</p>
            </div>
            <div className="dn-stats" style={{ display: 'flex', gap: 32, flexShrink: 0 }}>
              {[['85+','Destinations'],['6','Continents'],['180+','Flights/day']].map(([n,l]) => (
                <div key={l} className="dn-stat" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'clamp(28px,3vw,40px)', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(215,242,250,0.65)', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* CTA */}
          <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
            <Link href="/airline/book-flight" className="al-btn-primary">Search Flights →</Link>
            <Link href="/airline/round-the-world" className="al-btn-secondary">Round the World</Link>
          </div>
        </div>
      </section>

      {/* ── REGION FILTER + GRID ── */}
      <section className="al-section">
        <div className="al-container">
          {/* Sticky filter pill bar */}
          <div className="dn-filter" style={{ position: 'sticky', top: 'var(--al-header-h)', zIndex: 10, background: '#fff', paddingTop: 20, paddingBottom: 16, marginBottom: 32, borderBottom: '1.5px solid var(--al-line)' }}>
            <div style={{ display: 'flex', overflowX: 'auto', gap: 8, paddingBottom: 4 }}>
              {Object.keys(REGIONS).map((r) => (
                <button key={r} type="button" aria-pressed={activeRegion === r} className={`dn-chip${activeRegion === r ? ' is-active' : ''}`} onClick={() => setActiveRegion(r)} style={{ padding: '9px 20px', border: 'none', borderRadius: 24, cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 700, fontSize: 13, flexShrink: 0, background: activeRegion === r ? 'var(--al-navy)' : 'var(--al-bg)', color: activeRegion === r ? '#fff' : 'var(--al-text)', transition: 'all 0.15s' }}>
                  {r}<span className="dn-chip-count">{REGIONS[r].length}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="dn-region-head">
            <h2>{activeRegion}</h2>
            <span>{destinations.length} destinations · tap a city to search flights</span>
          </div>
          <div className="al-dest-grid dn-grid" key={activeRegion}>
            {destinations.map((d) => (
              <Link key={d.city} href="/airline/book-flight" className="al-dest-card" style={{ textDecoration: 'none' }}>
                <img className="al-dest-card-img" src={d.img} alt={d.city} />
                <div className="al-dest-overlay">
                  <div className="al-dest-city">{d.city}</div>
                  <div className="al-dest-country">{d.airport}</div>
                  <div className="al-dest-freq">{d.freq}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section className="al-section al-section--light dn-enquiry">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>Flight Route Enquiry</h2>
            <p>Can't find your destination? We may serve it seasonally or through codeshare partners. Tell us where you want to go.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Origin City</label><input required placeholder="e.g. Mumbai" /></div>
              <div className="al-form-group"><label>Destination City</label><input required placeholder="e.g. Barcelona" /></div>
              <div className="al-form-group"><label>Travel Dates</label><input type="date" /></div>
              <div className="al-form-group"><label>No. of Passengers</label><select><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select></div>
              <div className="al-form-group"><label>Email</label><input type="email" required placeholder="you@example.com" /></div>
              <div className="al-form-group"><label>Preferred Cabin</label><select><option>Economy</option><option>Premium Economy</option><option>Business</option><option>First Class</option></select></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Send Enquiry →</button></div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>Destination FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['How do I find the best fare to my destination?', 'Use the flexible date search on our Book a Flight page. The fare calendar shows the lowest available fare for each day over a 60-day window, helping you choose the most economical travel dates.'],
              ['Does Sanatan Airlines serve destinations not listed here?', 'We operate codeshare and interline services with 24 partner airlines, extending our reach to 300+ destinations globally. Search your route on our booking tool — partner flights will be shown alongside our own.'],
              ['How often do new routes launch?', 'We announce new routes on a seasonal basis, typically aligned with the IATA summer (March–October) and winter (November–March) schedules. Subscribe to our newsletter for route announcements.'],
              ['What if my destination requires a transit?', 'Many long-haul itineraries route through our hubs at Chhatrapati Shivaji Maharaj International (Mumbai) or Indira Gandhi International (Delhi). Minimum connection times are enforced at booking to ensure you do not miss your connection.'],
              ['Are visa requirements shown during booking?', 'Basic visa requirements for Indian passport holders are shown at the checkout stage. We strongly recommend verifying with the official embassy or consulate before travel, as requirements change frequently.'],
              ['What is the baggage allowance for international routes?', 'Allowances vary by cabin and route. Full details are on our Baggage Information page. International routes generally permit 2 checked bags in Economy and Business Class.'],
            ].map(([q, a]) => (
              <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Globe2 size={20}/>, 'Multi-City', '/airline/multi-city'], [<Map size={20}/>, 'Round the World', '/airline/round-the-world'], [<Briefcase size={20}/>, 'Business Class', '/airline/business-class'], [<Luggage size={20}/>, 'Baggage Info', '/airline/baggage'], [<Users size={20}/>, 'Group Travel', '/airline/group-travel']].map(([icon, label, href]) => (
              <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>
            ))}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Schedule Notice:</strong> Flight frequencies and schedules are subject to change and are operated subject to government approvals and bilateral air services agreements. Always confirm schedules at the time of booking.</div>
        </div>
      </section>
    </PageLayout>
  );
}
