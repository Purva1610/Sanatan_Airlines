'use client';
import { Film, Globe2, Leaf, Map, Plane, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';

const FLEET = [
  {
    type: 'Boeing 787-9 Dreamliner', count: 32, range: '14,140 km', seats: { f: 8, b: 42, pe: 0, e: 214 }, age: '3.2 yrs avg',
    features: ['Carbon-fibre fuselage reduces fuel burn by 20%', 'Large cabin windows with electrochromic dimming', 'Higher cabin humidity for passenger comfort', 'Quieter engines — 60% noise reduction versus previous generations'],
    img: '/images/sa-hero-jet.jpg',
    routes: 'Long-haul international — Mumbai–London, Delhi–New York',
  },
  {
    type: 'Airbus A350-900', count: 18, range: '15,000 km', seats: { f: 6, b: 48, pe: 24, e: 240 }, age: '2.1 yrs avg',
    features: ['Ultra-long-range capability', 'Full flat-bed Business Class suites', 'Private First Class suites', 'Advanced air filtration with cabin air renewed approximately every three minutes'],
    img: '/images/premium/hero-jet.webp',
    routes: 'Ultra long-haul — Mumbai–Sydney, Delhi–Los Angeles',
  },
  {
    type: 'Airbus A320neo', count: 68, range: '6,300 km', seats: { f: 0, b: 12, pe: 0, e: 150 }, age: '4.5 yrs avg',
    features: ['CFM LEAP-1A engines — 20% fuel saving', 'Sharklet wingtip devices', 'Wide cabin cross-section', 'Full IFE at every seat'],
    img: '/images/sa-jet-tarmac.jpg',
    routes: 'Short and medium haul — domestic and regional routes',
  },
  {
    type: 'Airbus A321XLR', count: 24, range: '8,700 km', seats: { f: 0, b: 20, pe: 0, e: 160 }, age: '1.0 yrs avg',
    features: ['Extended range opens thin long-haul routes', 'Efficient medium-haul cabin', 'Cabin pressure equivalent to 1,800 m altitude', 'Electric pushback for quieter ground operations'],
    img: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=900&q=85',
    routes: 'Medium long-haul — Mumbai–Almaty, Delhi–Colombo overnight',
  },
  {
    type: 'Boeing 777-300ER', count: 22, range: '13,650 km', seats: { f: 8, b: 52, pe: 36, e: 304 }, age: '7.3 yrs avg',
    features: ['High-capacity workhorse on trunk routes', 'Lie-flat Business Class suites', 'GE90 engines — among the most powerful in service', 'Reconfigured for 2026 with an upgraded IFE system'],
    img: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=900&q=85',
    routes: 'High-density long-haul — Mumbai–Dubai–London, Delhi–Singapore',
  },
  {
    type: 'ATR 72-600', count: 16, range: '1,528 km', seats: { f: 0, b: 0, pe: 0, e: 70 }, age: '5.1 yrs avg',
    features: ['Turboprop efficiency for short sectors', 'Operations from airports with shorter runways', 'PW127M engines with low community noise', 'Connections from tier-two cities to metro hubs'],
    img: '/images/aircraft-clouds.jpg',
    routes: 'Regional — smaller Indian cities to hub airports',
  },
];

export default function FleetPage() {
  return (
    <PageLayout>
      <section className="fl-hero">
        <img className="fl-hero-img" src="/images/sa-hero-jet.jpg" alt="" aria-hidden="true" />
        <div className="fl-hero-shade" />
        <div className="fl-hero-inner">
          <div className="fl-eyebrow">Sanatan Fleet</div>
          <h1>Engineered for<br /><em>every horizon.</em></h1>
          <p>One of South Asia's youngest, most fuel-efficient fleets — designed around comfort, range and responsible travel.</p>
          <div className="fl-hero-actions">
            <Link href="/airline/book-flight" className="fl-btn fl-btn--gold">Book a flight <span>→</span></Link>
            <Link href="/airline/destinations" className="fl-btn fl-btn--ghost">Explore routes</Link>
          </div>
        </div>
      </section>

      <section className="fl-stat-strip" aria-label="Fleet statistics">
        <div className="al-container fl-stat-grid">
          {[['180','Aircraft'],['4.1 yrs','Avg. fleet age'],['6','Aircraft families'],['2040','Carbon-neutral target']].map(([value, label]) => (
            <div key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
      </section>

      <section className="fl-index">
        <div className="al-container">
          <div className="fl-section-head">
            <span className="fl-kicker">The aircraft family</span>
            <h2>Six aircraft. One exacting standard.</h2>
          </div>
          <div className="fl-family-grid">
            {FLEET.map((aircraft, index) => (
              <a className="fl-family-card" href={`#fleet-${index}`} key={aircraft.type}>
                <div className="fl-family-number">{String(index + 1).padStart(2, '0')}</div>
                <img src={aircraft.img} alt="" />
                <div className="fl-family-copy">
                  <span>{aircraft.count} in service</span>
                  <h3>{aircraft.type}</h3>
                  <strong>{aircraft.range} range</strong>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {FLEET.map((aircraft, index) => {
        const total = (aircraft.seats.f || 0) + (aircraft.seats.b || 0) + (aircraft.seats.pe || 0) + aircraft.seats.e;
        return (
          <section className={`fl-aircraft${index % 2 === 1 ? ' fl-aircraft--alt' : ''}`} id={`fleet-${index}`} key={aircraft.type}>
            <div className="al-container fl-aircraft-grid">
              <div className="fl-aircraft-copy">
                <span className="fl-kicker">{String(index + 1).padStart(2, '0')} · {aircraft.count} in service</span>
                <h2>{aircraft.type}</h2>
                <p className="fl-route">{aircraft.routes}</p>
                <div className="fl-cabin-counts">
                  {aircraft.seats.f > 0 && <div><strong>{aircraft.seats.f}</strong><span>First</span></div>}
                  {aircraft.seats.b > 0 && <div><strong>{aircraft.seats.b}</strong><span>Business</span></div>}
                  {aircraft.seats.pe > 0 && <div><strong>{aircraft.seats.pe}</strong><span>Premium Economy</span></div>}
                  <div><strong>{aircraft.seats.e}</strong><span>Economy</span></div>
                  <div className="fl-cabin-total"><strong>{total}</strong><span>Total</span></div>
                </div>
                <div className="fl-spec-line"><span>{aircraft.range}</span><span>{aircraft.age}</span></div>
                <ul className="fl-feature-list">
                  {aircraft.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </div>
              <figure className="fl-aircraft-media">
                <img src={aircraft.img} alt={aircraft.type} />
                <figcaption>{aircraft.type}</figcaption>
              </figure>
            </div>
          </section>
        );
      })}

      <section className="fl-enquiry">
        <div className="al-container fl-enquiry-card">
          <div className="fl-enquiry-copy">
            <span className="fl-kicker fl-kicker--light">Fleet & configuration</span>
            <h2>Ask about a specific aircraft</h2>
            <p>For cabin configuration, charter or media enquiries, our fleet team can provide the right information.</p>
          </div>
          <div className="fl-enquiry-actions">
            <Link href="/airline/contact" className="fl-btn fl-btn--gold">Contact fleet team <span>→</span></Link>
            <Link href="/airline/seat-selection" className="fl-btn fl-btn--ghost">View seat maps</Link>
          </div>
        </div>
      </section>

      <section className="fl-faq">
        <div className="al-container fl-faq-grid">
          <div className="fl-faq-head">
            <span className="fl-kicker">Good to know</span>
            <h2>Fleet FAQs</h2>
          </div>
          <div className="al-faqs">
            {[
              ['What is the average age of Sanatan Airlines\' fleet?', 'Our current average fleet age is 4.1 years — among the youngest of any network carrier globally. Newer aircraft deliver better fuel efficiency, lower emissions and improved passenger comfort.'],
              ['Which aircraft fly long-haul international routes?', 'Long-haul services are operated by the Boeing 787-9, Airbus A350-900 and Boeing 777-300ER. Aircraft are assigned based on route demand and range requirements.'],
              ['Can I request a specific aircraft type for my flight?', 'Aircraft assignment is based on operational scheduling. Specific requests cannot be guaranteed, but our website shows the scheduled aircraft type at the time of booking.'],
              ['Do all aircraft have Wi-Fi?', 'All widebody aircraft (B787, A350, B777) offer satellite Wi-Fi. The A320neo family and ATR turboprops do not currently have in-flight Wi-Fi.'],
              ['Are the aircraft seats the same across the fleet?', 'No — seat specifications vary by aircraft and cabin class. The seat maps page shows the exact configuration for your flight.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="fl-related">
        <div className="al-container">
          <div className="al-related">
            {[[<Map size={20}/>, 'Seat Selection', '/airline/seat-selection'], [<Film size={20}/>, 'In-Flight Entertainment', '/airline/in-flight-entertainment'], [<UtensilsCrossed size={20}/>, 'In-Flight Dining', '/airline/in-flight-dining'], [<Globe2 size={20}/>, 'Destinations', '/airline/destinations'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Leaf size={20}/>, 'Sustainability', '/airline/sustainability']].map(([icon, label, href]) => (
              <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>
            ))}
          </div>
          <div className="al-disclaimer"><strong>Fleet information:</strong> Aircraft specifications and configurations are subject to change. Actual aircraft on a specific flight may differ from those shown.</div>
        </div>
      </section>
    </PageLayout>
  );
}
