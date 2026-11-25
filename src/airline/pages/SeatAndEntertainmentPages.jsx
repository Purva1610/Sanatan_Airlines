'use client';
import { Armchair, Baby, Briefcase, CheckCircle, ClipboardList, Crown, Film, Footprints, Gamepad2, Headphones, Luggage, Music, Newspaper, Plane, Star, Trophy, Tv, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';


// ============================================================
// Seat Selection page — data + horizontal interactive seat map
// ============================================================
const SEAT_ZONES = [
  { key: 'business', rows: [1, 2, 3], label: 'Business', cols: ['A', 'C', 'D', 'F'], occupied: ['2C', '3D'] },
  { key: 'legroom', rows: [10, 11, 12], label: 'Extra Legroom', cols: ['A', 'B', 'C', 'D', 'E', 'F'], occupied: ['10B', '11E'] },
  { key: 'standard', rows: [20, 21, 22], label: 'Standard Economy', cols: ['A', 'B', 'C', 'D', 'E', 'F'], occupied: ['20A', '20D', '21B', '21F', '22C'] },
  { key: 'exit', rows: [29], label: 'Exit Row · Extra Legroom', cols: ['A', 'B', 'C', 'D', 'E', 'F'], occupied: [] },
];
// Top-to-bottom order of a horizontal cabin (nose on the left): F E D | aisle | C B A
const SEAT_STACK = ['F', 'E', 'D', '', 'C', 'B', 'A'];

const SEAT_TYPES = [
  { key: 'business', name: 'Business', img: '/images/cabin/seat-business.jpg', alt: 'Business class suites with privacy panels', tag: 'Rows 1–3', perks: ['Fully lie-flat seats', 'Direct aisle access', 'Business Suite included'], price: 'Free on Business fares' },
  { key: 'legroom', name: 'Extra Legroom', img: '/images/cabin/seat-legroom.jpg', alt: 'Spacious seats with leg rests and extra legroom', tag: 'Rows 10–12 · bulkhead', perks: ['The most legroom in Economy', 'Tray table in the armrest', 'Free for Business fares'], price: 'From ₹999 (Flex) · ₹1,999+' },
  { key: 'exit', name: 'Exit Row', img: '/images/cabin/seat-exit.jpg', alt: 'Seats beside an aircraft emergency exit door', tag: 'Row 29', perks: ['Extra legroom by the exit', 'Seats do not recline', 'Free for Business fares'], price: 'From ₹1,499 (Flex) · ₹2,499+' },
  { key: 'standard', name: 'Standard Economy', img: '/images/cabin/seat-standard.jpg', alt: 'Rows of standard economy seats beside the windows', tag: 'Rows 20–22', perks: ['Choose window or aisle', 'Middle seats free at online check-in', 'Free for Flex fares'], price: 'From ₹300 (Classic)' },
];

const SEAT_PRICES = [
  ['Standard seat (middle)', 'At check-in only', '₹300–₹500', 'Free', 'Free'],
  ['Standard seat (window/aisle)', '₹500–₹800', '₹600–₹900', 'Free', 'Free'],
  ['Extra legroom (bulkhead)', '₹1,999+', '₹1,999+', '₹999+', 'Free'],
  ['Extra legroom (exit row)', '₹2,499+', '₹2,499+', '₹1,499+', 'Free'],
  ['Business Suite', 'N/A', 'N/A', 'N/A', 'Free'],
];
const FARE_COLUMNS = ['Light Fare', 'Classic', 'Flex', 'Business'];

function seatPosition(col) {
  if (col === 'A' || col === 'F') return 'Window';
  if (col === 'C' || col === 'D') return 'Aisle';
  return 'Middle';
}

function SeatMap() {
  const [picked, setPicked] = useState('11A');
  const row = parseInt(picked, 10);
  const col = picked.replace(/\d+/g, '');
  const zone = SEAT_ZONES.find((z) => z.rows.includes(row)) || SEAT_ZONES[1];
  return (
    <div className="ss2-map">
      <div className="ss2-scroll">
        <div className="ss2-plane" role="group" aria-label="Seat map — aircraft nose on the left">
          <div className="ss2-nose"><Plane size={20} /><span>Aircraft Nose</span></div>
          <div className="ss2-letters" aria-hidden="true">
            {SEAT_STACK.map((c, i) => (c === '' ? <span key={i} className="ss2-aisle" /> : <span key={i}>{c}</span>))}
          </div>
          {SEAT_ZONES.map((z) => (
            <div key={z.key} className={`ss2-zone ss2-zone--${z.key}`}>
              <div className="ss2-zone-label">Row {z.rows[0]}{z.rows.length > 1 ? `–${z.rows[z.rows.length - 1]}` : ''} · {z.label}</div>
              <div className="ss2-rows">
                {z.rows.map((r) => (
                  <div key={r} className="ss2-col">
                    {SEAT_STACK.map((c, i) => {
                      if (c === '') return <span key={i} className="ss2-aisle" />;
                      if (!z.cols.includes(c)) return <span key={i} className="ss2-gap" />;
                      const id = `${r}${c}`;
                      const occupied = z.occupied.includes(id);
                      return (
                        <button
                          key={i}
                          type="button"
                          className={`ss2-seat ss2-seat--${z.key}${occupied ? ' is-occupied' : ''}${picked === id ? ' is-picked' : ''}`}
                          disabled={occupied}
                          aria-pressed={picked === id}
                          aria-label={`Seat ${id}, ${z.label}, ${seatPosition(c)}${occupied ? ', occupied' : ''}`}
                          onClick={() => setPicked(id)}
                        >
                          {c}
                        </button>
                      );
                    })}
                    <span className="ss2-rownum">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="ss2-tail" aria-hidden="true" />
        </div>
      </div>

      <div className="ss2-summary" aria-live="polite">
        <div className="ss2-summary-seat"><span>Your seat</span><strong>{picked}</strong></div>
        <dl className="ss2-summary-facts">
          <div><dt>Cabin zone</dt><dd>{zone.label}</dd></div>
          <div><dt>Position</dt><dd>{seatPosition(col)}</dd></div>
          <div><dt>Row</dt><dd>{row}</dd></div>
        </dl>
        <div className="ss2-legend">
          {[['business', 'Business'], ['legroom', 'Extra Legroom'], ['standard', 'Standard'], ['occupied', 'Occupied']].map(([k, label]) => (
            <span key={k} className={`ss2-legend-item ss2-legend-item--${k}`}>{label}</span>
          ))}
        </div>
        <Link href="/airline/manage-booking" className="al-btn-primary ss2-summary-btn">Select My Seat →</Link>
      </div>
      <p className="ss2-hint">Tap any available seat to preview it · scroll sideways on smaller screens</p>
    </div>
  );
}

// ============================================================
// EXTRA LEGROOM (Page 23)
// ============================================================
export function ExtraLegroomPage() {
  return (
    <PageLayout>
      <section className="el-hero">
        <img className="el-hero-img" src="/images/cabin/seat-legroom.jpg" alt="" aria-hidden="true" />
        <div className="el-hero-shade" />
        <div className="el-hero-inner">
          <div className="el-eyebrow">Space, thoughtfully placed</div>
          <h1>Extra room.<br /><em>Extra ease.</em></h1>
          <p>Choose a seat with exceptional pitch, generous personal space and a calmer journey from take-off to arrival.</p>
          <div className="el-hero-actions">
            <Link href="/airline/seat-selection" className="el-btn el-btn--gold">Find your seat <span>→</span></Link>
            <Link href="#seat-options" className="el-btn el-btn--ghost">Compare options</Link>
          </div>
        </div>
      </section>

      <section className="el-measure">
        <div className="al-container el-measure-grid">
          <div className="el-measure-copy">
            <span className="el-kicker">A meaningful difference</span>
            <h2>Up to <strong>42</strong> inches of comfort</h2>
            <p>More room for working, resting or simply settling into the journey — without moving to another cabin.</p>
          </div>
          <div className="el-space-visual" aria-label="Seat pitch comparison">
            <div className="el-seat-row el-seat-row--standard">
              <span>Standard</span>
              <div><i /></div>
              <strong>32–34 in</strong>
            </div>
            <div className="el-seat-row el-seat-row--extra">
              <span>Extra Legroom</span>
              <div><i /></div>
              <strong>38–42 in</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="el-options" id="seat-options">
        <div className="al-container">
          <div className="el-section-head">
            <span className="el-kicker">Choose your advantage</span>
            <h2>Two ways to stretch out</h2>
          </div>
          <div className="el-option-grid">
            <article className="el-option-card">
              <div className="el-option-image">
                <img src="/images/cabin/seat-legroom.jpg" alt="A bulkhead Extra Legroom seat" />
                <span>Bulkhead</span>
              </div>
              <div className="el-option-copy">
                <h3>At the front of the cabin</h3>
                <p>No seat directly in front. Added freedom with a clear view down the cabin.</p>
                <ul>
                  <li>Full recline</li>
                  <li>Fast boarding position</li>
                  <li>Bassinet access on eligible aircraft</li>
                </ul>
              </div>
            </article>
            <article className="el-option-card el-option-card--raised">
              <div className="el-option-image">
                <img src="/images/cabin/seat-exit.jpg" alt="An exit-row Extra Legroom seat" />
                <span>Exit Row</span>
              </div>
              <div className="el-option-copy">
                <h3>The maximum amount of room</h3>
                <p>An open area beside the emergency exit, with the widest personal space onboard.</p>
                <ul>
                  <li>Up to 42-inch pitch</li>
                  <li>Clear under-seat feeling</li>
                  <li>Fast door-side disembarkation</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="el-pricing">
        <div className="al-container">
          <div className="el-section-head el-section-head--dark">
            <span className="el-kicker">Simple, route-based pricing</span>
            <h2>Choose the room that suits your journey</h2>
          </div>
          <div className="el-price-table">
            <table>
              <thead><tr><th>Route</th><th>Bulkhead</th><th>Exit row</th><th>Typical aircraft</th></tr></thead>
              <tbody>
                {[
                  ['Domestic · under 2h', '₹999', '₹1,499', 'A320neo, ATR'],
                  ['Domestic · 2–3h', '₹1,499', '₹1,999', 'A320neo, A321XLR'],
                  ['International · under 4h', '₹2,499', '₹2,999', 'A320neo, A321XLR'],
                  ['International · 4–8h', '₹3,499', '₹3,999', 'B787, B777'],
                  ['Long-haul · 8h+', '₹4,999', '₹5,999', 'A350, B787, B777'],
                ].map(([rt, ...cols]) => <tr key={rt}><td>{rt}</td>{cols.map((c, i) => <td key={i}>{c}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="el-benefits">
        <div className="al-container el-benefit-grid">
          <div className="el-benefit-feature">
            <img src="/images/cabin/seat-exit.jpg" alt="Extra Legroom cabin seating" />
            <div className="el-benefit-feature-copy">
              <span>Designed for comfort</span>
              <h2>Settle in. Spread out.</h2>
            </div>
          </div>
          <div className="el-benefit-list">
            {[
              [<Armchair size={20}/>, 'Generous pitch', 'Move, work and stretch with more personal room.'],
              [<Footprints size={20}/>, 'Easy movement', 'An open position that makes settling in feel effortless.'],
              [<Plane size={20}/>, 'Quicker arrival', 'Disembark sooner from selected door-side positions.'],
              [<Baby size={20}/>, 'Family friendly', 'Bassinet positions available on eligible bulkhead rows.'],
            ].map(([icon, title, copy]) => (
              <article key={title}>
                <span>{icon}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="el-book">
        <div className="al-container">
          <div className="el-book-card">
            <div className="el-book-copy">
              <span className="el-kicker el-kicker--light">Book your preferred position</span>
              <h2>Make more room for what matters</h2>
              <p>Add Extra Legroom to an existing booking or choose it while reserving your next flight.</p>
            </div>
            <div className="el-book-actions">
              <Link href="/airline/manage-booking" className="el-btn el-btn--gold">Manage existing booking <span>→</span></Link>
              <Link href="/airline/seat-selection" className="el-btn el-btn--ghost">View all seats</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="el-faq">
        <div className="al-container">
          <div className="el-faq-grid">
            <div className="el-faq-head">
              <span className="el-kicker">Good to know</span>
              <h2>Extra Legroom FAQs</h2>
            </div>
            <div className="al-faqs">
            {[
              ['Who cannot sit in exit row seats?', 'Exit row seats require passengers to be aged 15 or over, physically able to operate the emergency exit, able to understand safety instructions in English and not be travelling with an infant. Pregnant passengers and those with certain medical conditions are also excluded.'],
              ['Can I bring a baby bassinet to a bulkhead seat?', 'Bassinets (cots) are available at bulkhead seats on flights over 6 hours. These must be pre-requested through Manage Booking at least 48 hours before departure. Availability is limited.'],
              ['Do extra legroom seats earn more miles?', 'No — SkyNova Miles are earned based on distance and fare type, not the seat location within the cabin.'],
              ['What if I cannot sit in the exit row on the day?', 'If the crew determines you are not suitable for exit row seating on the day, you will be reseated to a standard Economy seat. The seat fee is non-refundable in this circumstance.'],
              ['Can SkyNova Gold and Platinum members choose extra legroom seats for free?', 'SkyNova Gold members receive one complimentary extra legroom seat selection per booking. Platinum members receive unlimited complimentary extra legroom seat selection.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
            </div>
          </div>
        </div>
      </section>

      <section className="el-related">
        <div className="al-container">
          <div className="al-related">
            {[[<Armchair size={20}/>, 'Seat Selection', '/airline/seat-selection'], [<Plane size={20}/>, 'Economy Class', '/airline/economy-class'], [<Star size={20}/>, 'Premium Economy', '/airline/premium-economy'], [<ClipboardList size={20}/>, 'Manage Booking', '/airline/manage-booking'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Luggage size={20}/>, 'Baggage Info', '/airline/baggage']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Exit Row Safety:</strong> Exit row seats are subject to safety restrictions as required by DGCA regulations. Passengers who do not meet exit row eligibility criteria will be reseated. Fees are non-refundable in this event.</div>
        </div>
      </section>
    </PageLayout>
  );
}

// ============================================================
// SEAT SELECTION (Page 24)
// ============================================================
export function SeatSelectionPage() {
  return (
    <PageLayout>
      {/* ── Light hero ── */}
      <section className="ss2-hero">
        <div className="ss2-hero-copy">
          <div className="ss2-eyebrow">Your Choice, Your Comfort</div>
          <h1>Seat Selection —<br />Pick Your Perfect Spot.</h1>
          <p>Window or aisle? Upfront or over wing? Choose your seat with our interactive seat map — from first booking to 24 hours before departure.</p>
          <div className="ss2-hero-actions">
            <Link href="/airline/manage-booking" className="al-btn-primary">Select My Seat →</Link>
          </div>
        </div>
        <div className="ss2-hero-media">
          <img src="/images/cabin/seat-business.jpg" alt="Business class suites inside a modern aircraft cabin" />
        </div>
      </section>

      {/* ── Seat types ── */}
      <section className="ss2-types">
        <div className="al-container">
          <div className="ss2-head">
            <span className="ss2-kicker">Seat Types</span>
            <h2>Find the Seat That Suits You</h2>
            <p>Four kinds of seat, each with its own comfort and price. Pick a type, then choose the exact seat on the map.</p>
          </div>
          <div className="ss2-type-grid">
            {SEAT_TYPES.map((t) => (
              <article key={t.key} className={`ss2-type ss2-type--${t.key}`}>
                <div className="ss2-type-media"><img src={t.img} alt={t.alt} loading="lazy" /><span>{t.tag}</span></div>
                <div className="ss2-type-body">
                  <h3>{t.name}</h3>
                  <ul>{t.perks.map((p) => <li key={p}>{p}</li>)}</ul>
                  <div className="ss2-type-price">{t.price}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive seat map ── */}
      <section className="ss2-mapsec">
        <div className="al-container">
          <div className="ss2-head">
            <span className="ss2-kicker">How It Works</span>
            <h2>Interactive Seat Map</h2>
          </div>
          <SeatMap />
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="ss2-pricing">
        <div className="al-container">
          <div className="ss2-head">
            <span className="ss2-kicker">By Fare</span>
            <h2>Free vs Paid Seat Selection</h2>
          </div>
          <div className="ss2-fare-grid">
            {FARE_COLUMNS.map((fare, fi) => (
              <div key={fare} className={`ss2-fare ss2-fare--${fi}`}>
                <div className="ss2-fare-head">{fare}</div>
                <ul>
                  {SEAT_PRICES.map(([seat, ...cols]) => (
                    <li key={seat}>
                      <span>{seat}</span>
                      <strong className={cols[fi] === 'Free' ? 'is-free' : cols[fi] === 'N/A' ? 'is-na' : ''}>{cols[fi]}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>Seat Selection FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['When can I select my seat for free?', 'Flex fare holders can select any standard seat for free from the time of booking. Classic fare holders pay a fee. At online check-in (48 hours before departure), standard middle seats become free for all fare types.'],
              ['What is the best seat on a long-haul flight?', 'Bulkhead seats offer the most legroom but have the tray table in the armrest, which can feel narrow. Exit row seats have legroom but no recline. Window seats offer a surface to lean on during sleep. Front rows of Economy board last.'],
              ['Can families with young children sit together?', 'Families with children under 12 are automatically seated together at no charge. If the automatic assignment separates the family, contact our centre before check-in to correct this.'],
              ['What if my seat is changed by the airline?', 'If Sanatan Airlines changes your seat assignment due to an aircraft change or operational reason, any seat fee paid is refunded automatically to the original payment method.'],
              ['Are there preferred seats for SkyNova members?', 'SkyNova Silver and above members can select standard seats for free. Gold members receive one free extra legroom seat per booking. Platinum members receive unlimited free extra legroom selection.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<Footprints size={20}/>, 'Extra Legroom', '/airline/extra-legroom'], [<Plane size={20}/>, 'Economy Class', '/airline/economy-class'], [<Briefcase size={20}/>, 'Business Class', '/airline/business-class'], [<ClipboardList size={20}/>, 'Manage Booking', '/airline/manage-booking'], [<CheckCircle size={20}/>, 'Check-in Online', '/airline/check-in'], [<Trophy size={20}/>, 'SkyNova Rewards', '/airline/skynova-rewards']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Seat Disclaimer:</strong> Seat maps are indicative. Aircraft type and seat layout may change up to the time of departure. Paid seat fees are refunded if the airline changes your assigned seat due to an aircraft substitution.</div>
        </div>
      </section>
    </PageLayout>
  );
}

// ============================================================
// IN-FLIGHT ENTERTAINMENT (Page 25)
// ============================================================
export function InFlightEntertainmentPage() {
  return (
    <PageLayout>
      <section className="ife-hero">
        <div className="ife-hero-screen" aria-hidden="true">
          <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=85" alt="" />
          <div className="ife-screen-ui">
            <span>NOW PLAYING</span>
            <strong>Beyond<br />the Horizon</strong>
            <div><i /><i /><i /></div>
          </div>
        </div>
        <div className="ife-hero-shade" />
        <div className="ife-hero-inner">
          <div className="ife-eyebrow">SkyPlay cinema</div>
          <h1>A world of stories,<br /><em>at 38,000 feet.</em></h1>
          <p>1,000+ hours of films, series, music and live television — beautifully curated for the journey.</p>
          <div className="ife-hero-actions">
            <Link href="/airline/book-flight" className="ife-btn ife-btn--gold">Choose your flight <span>→</span></Link>
            <Link href="#ife-library" className="ife-btn ife-btn--ghost">Explore SkyPlay</Link>
          </div>
        </div>
      </section>

      <section className="ife-signal" aria-label="Entertainment library highlights">
        <div className="al-container ife-signal-grid">
          <div><strong>400+</strong><span>Movies</span></div>
          <div><strong>200+</strong><span>TV seasons</span></div>
          <div><strong>10K+</strong><span>Music tracks</span></div>
          <div><strong>15</strong><span>Regional languages</span></div>
        </div>
      </section>

      <section className="ife-library" id="ife-library">
        <div className="al-container">
          <div className="ife-section-head">
            <span className="ife-kicker">Made for every mood</span>
            <h2>Press play on your journey</h2>
          </div>
          <div className="ife-library-grid">
            {[
              { icon: <Film size={22}/>, no: '01', t: 'Cinema', d: 'New releases, beloved classics and regional favourites in 15 languages.', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&q=85' },
              { icon: <Tv size={22}/>, no: '02', t: 'Series', d: 'Complete seasons and hand-picked box sets for hours of uninterrupted watching.', image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=900&q=85' },
              { icon: <Music size={22}/>, no: '03', t: 'Sound', d: 'Curated playlists, concert recordings and global genres for every part of the flight.', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&q=85' },
              { icon: <Gamepad2 size={22}/>, no: '04', t: 'Play', d: 'Casual puzzles, strategy games and multiplayer favourites on selected aircraft.', image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=900&q=85' },
            ].map((item) => (
              <article className="ife-library-card" key={item.t}>
                <img src={item.image} alt="" />
                <div className="ife-library-shade" />
                <div className="ife-library-copy">
                  <span>{item.no}</span>
                  <div className="ife-library-icon">{item.icon}</div>
                  <h3>{item.t}</h3>
                  <p>{item.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ife-screens">
        <div className="al-container ife-screens-grid">
          <div className="ife-screens-copy">
            <span className="ife-kicker">A closer look</span>
            <h2>Every seat, a better screen</h2>
            <p>Crystal-clear HD or 4K personal entertainment, with generous screens and tactile controls across the cabin.</p>
            <div className="ife-screen-pills">
              <span>4K in First</span>
              <span>HD throughout</span>
              <span>Bluetooth 5.0</span>
            </div>
          </div>
          <div className="ife-screen-table">
            <table>
              <thead><tr><th>Aircraft</th><th>Economy</th><th>Premium Economy</th><th>Business</th><th>First</th></tr></thead>
              <tbody>
                {[
                  ['A350-900', '13.3" HD', '15.6" HD', '18" HD', '24" 4K'],
                  ['B787-9', '12" HD', '15.4" HD', '18" HD', 'N/A'],
                  ['B777-300ER', '11" HD', '13.3" HD', '17.3" HD', 'N/A'],
                  ['A321XLR', '10.1" HD', 'N/A', '13.3" HD', 'N/A'],
                  ['A320neo', '9" HD', 'N/A', '10.1" HD', 'N/A'],
                  ['ATR 72-600', 'N/A (personal device)', 'N/A', 'N/A', 'N/A'],
                ].map(([ac, ...cols]) => <tr key={ac}><td>{ac}</td>{cols.map((c, i) => <td key={i}>{c}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="ife-connect">
        <div className="al-container ife-connect-grid">
          <div className="ife-device">
            <div className="ife-device-screen">
              <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=85" alt="A passenger using connected inflight entertainment" />
              <div className="ife-device-status"><span>CONNECTED</span><strong>SkyConnect</strong></div>
            </div>
          </div>
          <div className="ife-connect-copy">
            <span className="ife-kicker">Stay present, stay connected</span>
            <h2>Wi-Fi & wireless audio</h2>
            <p>Stream, browse or connect your own Bluetooth headphones with simple satellite connectivity across the widebody fleet.</p>
            <div className="ife-packs">
              <div><span>Social</span><strong>₹299</strong></div>
              <div><span>Messaging</span><strong>₹499</strong></div>
              <div><span>Browse</span><strong>₹999</strong></div>
              <div><span>Stream</span><strong>₹1,499</strong></div>
            </div>
            <p className="ife-connect-note">Business Flex and First Class passengers receive Wi-Fi included. Availability varies by aircraft and airspace.</p>
          </div>
        </div>
      </section>

      <section className="ife-kids">
        <div className="al-container">
          <div className="ife-kids-card">
            <div className="ife-kids-copy">
              <span className="ife-kicker ife-kicker--light">Kids&apos; Corner</span>
              <h2>Small travellers, big adventures</h2>
              <p>Age-appropriate films, animated favourites, puzzles and educational shows — with a PIN-protected Kids&apos; Mode.</p>
            </div>
            <div className="ife-kids-art" aria-hidden="true">
              <span><Baby size={34}/></span>
              <strong>Kids<br />Corner</strong>
              <i />
            </div>
          </div>
        </div>
      </section>

      <section className="ife-faq">
        <div className="al-container">
          <div className="ife-faq-grid">
            <div className="ife-faq-head">
              <span className="ife-kicker">Good to know</span>
              <h2>Entertainment FAQs</h2>
            </div>
            <div className="al-faqs">
            {[
              ['Can I watch content on my own device?', 'Yes — on narrowbody aircraft without seatback IFE, download the Sanatan Airlines SkyPlay app before boarding and stream content wirelessly over the aircraft cabin network.'],
              ['How up to date is the content library?', 'Movies and TV series are refreshed monthly. New Bollywood releases typically appear on our system within 60 days of theatrical release.'],
              ['Are there subtitles available?', 'Yes — subtitles are available in English, Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali and Marathi for most content. Some international titles have limited subtitle options.'],
              ['Can children be restricted from certain content?', 'Yes — the Kids\' Corner mode locks the IFE to age-appropriate content only. A PIN is required to exit Kids\' Mode.'],
              ['Does the IFE work during taxi and takeoff?', 'The IFE is available from pushback. Audio must use headphones with the seat belt sign on. The crew will advise when you may use electronic devices freely.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
            </div>
          </div>
        </div>
      </section>

      <section className="ife-related">
        <div className="al-container">
          <div className="al-related">
            {[[<UtensilsCrossed size={20}/>, 'In-Flight Dining', '/airline/in-flight-dining'], [<Plane size={20}/>, 'Economy Class', '/airline/economy-class'], [<Briefcase size={20}/>, 'Business Class', '/airline/business-class'], [<Crown size={20}/>, 'First Class', '/airline/first-class'], [<Plane size={20}/>, 'Our Fleet', '/airline/our-fleet'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Entertainment Notice:</strong> Content libraries are subject to change. Wi-Fi speeds depend on aircraft position and satellite coverage and cannot be guaranteed. Wi-Fi is not available on ATR 72-600 aircraft or during certain airspace restrictions.</div>
        </div>
      </section>
    </PageLayout>
  );
}
