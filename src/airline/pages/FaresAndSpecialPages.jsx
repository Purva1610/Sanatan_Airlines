'use client';
import { Accessibility, Armchair, BookOpen, Briefcase, CalendarDays, ClipboardList, CreditCard, Headphones, IndianRupee, Globe, Globe2, GraduationCap, Luggage, Mail, Map, Phone, Plane, Trophy, Umbrella, Users } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';

// ============================================================
// FLEXIBLE FARES (Page 11)
// ============================================================
export function FlexibleFaresPage() {
  const fares = [
    { name: 'Light', price: 'From ₹2,999', color: '#6b7280', change: '✗', cancel: '✗', bags: '7 kg cabin only', upgrades: '✗', miles: '50%', seat: 'Paid' },
    { name: 'Classic', price: 'From ₹4,499', color: 'var(--al-navy)', change: '₹2,500 fee', cancel: 'Credit only', bags: '7 kg + 23 kg', upgrades: 'Paid', miles: '75%', seat: 'Paid' },
    { name: 'Flex', price: 'From ₹6,999', color: '#059669', change: 'Free', cancel: 'Full refund', bags: '7 kg + 23 kg', upgrades: 'Discounted', miles: '100%', seat: 'Free' },
    { name: 'Business Flex', price: 'From ₹22,999', color: 'var(--al-flame)', change: 'Free', cancel: 'Full refund', bags: '2 × 32 kg', upgrades: 'Priority', miles: '150%', seat: 'Free + Advance' },
  ];
  return (
    <PageLayout>
      <section className="al-hero">
        <div className="al-hero-bg al-airline-bg-2" />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">Find Your Fare</div>
          <h1>Flexible Fares for<br />Every Journey</h1>
          <p className="al-hero-sub">From our most economical Light fare to the ultimate Business Flex — choose the fare that fits how you travel.</p>
          <div className="al-hero-actions"><Link href="/airline/book-flight" className="al-btn-primary">Book Now →</Link></div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Fare Families</div><h2>Compare Our Fares</h2></div>
          <div className="al-tiers">
            {fares.map((f) => (
              <div key={f.name} className="al-tier">
                <div className="al-tier-head" style={{ background: f.color }}>
                  <div className="al-tier-name">{f.name}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 8 }}>{f.price}</div>
                </div>
                <div className="al-tier-body">
                  <ul>
                    <li>Change: {f.change}</li>
                    <li>Cancel: {f.cancel}</li>
                    <li>Bags: {f.bags}</li>
                    <li>Upgrades: {f.upgrades}</li>
                    <li>Miles earning: {f.miles}</li>
                    <li>Seat selection: {f.seat}</li>
                  </ul>
                  <Link href="/airline/book-flight" className="al-btn-primary" style={{ marginTop: 20, display: 'flex', justifyContent: 'center', fontSize: 13, padding: '10px 16px' }}>Book {f.name} →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header"><h2>Fare Change & Cancellation Rules</h2></div>
          <div style={{ overflowX: 'auto' }}>
            <table className="al-fare-table">
              <thead><tr><th>Rule</th><th>Light</th><th>Classic</th><th>Flex</th><th>Business Flex</th></tr></thead>
              <tbody>
                {[
                  ['Date change before departure', 'Not permitted', '₹2,500 + fare diff', 'Free + fare diff', 'Free + fare diff'],
                  ['Same-day change', 'Not permitted', '₹5,000 + fare diff', '₹1,000', 'Free'],
                  ['Cancellation (>24 hr before)', 'No refund', 'Travel credit only', 'Full refund', 'Full refund'],
                  ['Cancellation (<24 hr before)', 'No refund', 'No refund', '₹1,500 fee', 'Free'],
                  ['No-show', 'No refund', 'No refund', 'No refund', 'No refund'],
                ].map(([rule, ...cols]) => (
                  <tr key={rule}><td>{rule}</td>{cols.map((c, i) => <td key={i}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>Fare FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['Can I upgrade from Light to Flex after booking?', 'Yes — you can pay the fare difference plus a ₹500 upgrade fee through Manage Booking to move from Light to Classic or Flex, subject to seat availability.'],
              ['What does "travel credit" mean?', 'Travel credit is a voucher valid for 12 months from issue date, applied against any future Sanatan Airlines booking.'],
              ['Are children charged the same fares?', 'Children aged 2–11 pay 75% of the adult fare. Infants under 2 (not occupying a seat) pay 10% of the adult fare.'],
              ['What is the best fare for frequent travellers?', 'Business Flex offers the most flexibility including free changes, full refunds and 150% mile earning — ideal for frequent travellers on corporate or flexible plans.'],
              ['Are taxes included in the displayed fare?', 'Yes. All fares shown include applicable government taxes, fuel surcharges and service fees. The price at search is the price you pay.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Globe size={20}/>, 'Multi-City', '/airline/multi-city'], [<Luggage size={20}/>, 'Baggage Info', '/airline/baggage'], [<Briefcase size={20}/>, 'Business Class', '/airline/business-class'], [<Map size={20}/>, 'Round the World', '/airline/round-the-world'], [<GraduationCap size={20}/>, 'Student Fares', '/airline/student-fares']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Fare Rules:</strong> Fare rules are set at time of purchase and govern changes, cancellations and refunds. All rules are displayed at the booking checkout stage before payment is taken.</div>
        </div>
      </section>
    </PageLayout>
  );
}

// ============================================================
// MULTI-CITY FLIGHTS (Page 12)
// ============================================================
export function MultiCityPage() {
  return (
    <PageLayout>
      <section className="al-hero">
        <div className="al-hero-bg al-airline-bg-3" />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">Multiple Destinations</div>
          <h1>See More.<br />Pay Less with Multi-City.</h1>
          <p className="al-hero-sub">Combine up to 5 destinations into one booking, compare Open Jaw fares, and save versus separate tickets.</p>
          <div className="al-hero-actions"><Link href="/airline/book-flight" className="al-btn-primary">Build Your Route →</Link></div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">How It Works</div><h2>Multi-City Booking in 4 Steps</h2></div>
          <div className="al-steps">
            {[
              { n: '01', icon: <Plane size={20}/>, t: 'Choose Multi-City', d: 'Select "Multi-City" on the booking page. Add up to 5 origin-destination pairs.' },
              { n: '02', icon: <CalendarDays size={20}/>, t: 'Set Your Dates', d: 'Each leg has its own departure date. The tool checks minimum connection times automatically.' },
              { n: '03', icon: <IndianRupee size={20}/>, t: 'Compare Fares', d: 'See combined fare vs separate tickets. Multi-city is usually cheaper by 15–30%.' },
              { n: '04', icon: <Mail size={20}/>, t: 'One Booking', d: 'All legs are on a single PNR. Manage, change or cancel all legs in one place.' },
            ].map((s) => <div key={s.n} className="al-step"><div className="al-step-num">{s.n}</div><div className="al-step-icon">{s.icon}</div><h3>{s.t}</h3><p>{s.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="al-section al-section--sky">
        <div className="al-container">
          <div className="al-section-header"><h2>Popular Multi-City Itineraries</h2></div>
          <div className="al-cards al-cards--3">
            {[
              { title: 'Golden Triangle + Goa', route: 'Delhi → Agra → Jaipur → Goa → Delhi', from: '₹14,500', nights: '10 nights' },
              { title: 'Southeast Asia Explorer', route: 'Mumbai → Singapore → Bangkok → Kuala Lumpur → Mumbai', from: '₹28,999', nights: '14 nights' },
              { title: 'Europe Grand Tour', route: 'Delhi → London → Paris → Frankfurt → Delhi', from: '₹58,000', nights: '18 nights' },
              { title: 'Middle East Circuit', route: 'Mumbai → Dubai → Abu Dhabi → Doha → Mumbai', from: '₹18,000', nights: '7 nights' },
              { title: 'East Asia Loop', route: 'Delhi → Tokyo → Seoul → Singapore → Delhi', from: '₹42,000', nights: '15 nights' },
              { title: 'Americas + Europe', route: 'Mumbai → New York → Chicago → London → Mumbai', from: '₹85,000', nights: '21 nights' },
            ].map((it) => (
              <div key={it.title} className="al-card">
                <div className="al-badge al-badge--flame" style={{ marginBottom: 12 }}>{it.nights}</div>
                <h3>{it.title}</h3>
                <p style={{ fontSize: 13, margin: '8px 0' }}>{it.route}</p>
                <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--al-navy)', marginTop: 12 }}>from {it.from}</div>
                <Link href="/airline/book-flight" className="al-btn-primary" style={{ marginTop: 16, fontSize: 13, padding: '10px 16px', display: 'flex', justifyContent: 'center' }}>Book This Route →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-gallery">
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80" alt="Multi-city travel" /></div>
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80" alt="Dubai stopover" /></div>
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80" alt="Tokyo destination" /></div>
          </div>
        </div>
      </section>

      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>Custom Multi-City Enquiry</h2>
            <p>Need help building a complex itinerary? Our travel desk will plan the optimal routing and pricing.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Name</label><input required /></div>
              <div className="al-form-group"><label>Email</label><input type="email" required /></div>
              <div className="al-form-group full"><label>Destinations (list all cities)</label><textarea placeholder="e.g. Mumbai → Dubai → London → Paris → Mumbai" /></div>
              <div className="al-form-group"><label>Travel Start Date</label><input type="date" /></div>
              <div className="al-form-group"><label>No. of Passengers</label><input type="number" min={1} defaultValue={1} /></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Request Custom Quote →</button></div>
            </form>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>Multi-City FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['What is the difference between multi-city and open jaw?', 'Multi-city allows completely different origins and destinations for each leg. Open jaw is a specific type where you fly into one city and return from a different one.'],
              ['How many stops can I add?', 'Up to 5 separate legs can be booked on a single multi-city booking on our website. For more complex itineraries, contact our travel desk.'],
              ['What if one leg is cancelled?', 'If Sanatan Airlines cancels a leg, we will rebook you on the next available service. If a cancellation affects a connecting leg not operated by us, we assist with rebooking and accommodation.'],
              ['Can I mix cabin classes on multi-city?', 'Yes. Each leg can be in a different cabin class. This is a popular option for long-haul legs in Business and shorter legs in Economy.'],
              ['Are stopovers allowed in multi-city?', 'Yes — stopovers of any duration are permitted on multi-city bookings, subject to visa requirements of the stopover country.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Map size={20}/>, 'Round the World', '/airline/round-the-world'], [<Globe2 size={20}/>, 'Destinations', '/airline/destinations'], [<CalendarDays size={20}/>, 'Flexible Fares', '/airline/flexible-fares'], [<Users size={20}/>, 'Group Travel', '/airline/group-travel'], [<Briefcase size={20}/>, 'Corporate Travel', '/airline/corporate-travel']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Multi-City Terms:</strong> All legs on a multi-city booking are subject to the fare rules of their respective cabin class. Cancellation of one leg does not automatically cancel subsequent legs.</div>
        </div>
      </section>
    </PageLayout>
  );
}

// ============================================================
// ROUND THE WORLD (Page 13)
// ============================================================
export function RoundTheWorldPage() {
  return (
    <PageLayout>
      <section className="al-hero al-hero--tall">
        <div className="al-hero-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80)' }} />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">SkyNova RTW Programme</div>
          <h1>Round the World<br />on One Ticket.</h1>
          <p className="al-hero-sub">Circumnavigate the globe on a single RTW ticket covering up to 6 stops across 4 continents — with Sanatan Airlines and our Star Alliance partners.</p>
          <div className="al-hero-actions">
            <Link href="/airline/contact" className="al-btn-primary">Enquire About RTW →</Link>
            <Link href="/airline/destinations" className="al-btn-secondary">Explore Destinations</Link>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-desc">
            <div className="al-desc-text">
              <h2>How SkyNova RTW Works</h2>
              <p>The SkyNova Round-the-World ticket gives you one global ticket covering up to 6 stopovers across a minimum of 4 continents. Travel must be generally in one direction — eastbound or westbound — with no backtracking across the same ocean twice.</p>
              <p>RTW tickets are priced in zones: Asia-Pacific, Europe, the Americas and Africa each count as separate zones. The base fare covers up to 3 zones; additional zones are priced incrementally. Travel must be completed within 12 months of the outbound departure.</p>
              <ul className="al-list" style={{ marginTop: 20 }}>
                <li>Minimum 3 stops, maximum 6 stops</li>
                <li>Minimum 4 continents covered</li>
                <li>Valid 12 months from first departure</li>
                <li>Open to Economy, Business and First Class configurations</li>
                <li>Earn full SkyNova Miles on every leg</li>
              </ul>
            </div>
            <div className="al-desc-img">
              <img src="https://images.unsplash.com/photo-1521791055366-0d553872952f?w=800&q=80" alt="Round the world itinerary planning" />
            </div>
          </div>
        </div>
      </section>

      <section className="al-section al-section--navy">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">RTW Pricing</div><h2>Zone-Based Pricing</h2></div>
          <div style={{ overflowX: 'auto' }}>
            <table className="al-fare-table">
              <thead><tr><th>Zones Covered</th><th>Economy</th><th>Business</th><th>First Class</th></tr></thead>
              <tbody>
                {[
                  ['3 Zones (Asia + 2)', '₹89,000', '₹2,10,000', '₹3,80,000'],
                  ['4 Zones', '₹1,10,000', '₹2,55,000', '₹4,40,000'],
                  ['5 Zones', '₹1,30,000', '₹3,00,000', '₹5,20,000'],
                  ['6 Zones (Global)', '₹1,55,000', '₹3,50,000', '₹5,99,000'],
                ].map(([zones, ...prices]) => <tr key={zones}><td>{zones}</td>{prices.map((p, i) => <td key={i}>{p}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: 'rgba(215,242,250,0.6)', textAlign: 'center' }}>Prices are base fares excluding taxes and surcharges. Final pricing confirmed at time of booking.</p>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>Popular RTW Itineraries</h2></div>
          <div className="al-cards al-cards--3">
            {[
              { name: 'The Classic', route: 'Mumbai → London → New York → Tokyo → Singapore → Mumbai', days: 60 },
              { name: 'The Southern Loop', route: 'Delhi → Sydney → Los Angeles → São Paulo → Cape Town → Dubai → Delhi', days: 90 },
              { name: 'The Silk Road', route: 'Mumbai → Dubai → Frankfurt → New York → Singapore → Mumbai', days: 45 },
            ].map((it) => (
              <div key={it.name} className="al-card">
                <h3>{it.name}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, margin: '8px 0 12px' }}>{it.route}</p>
                <div className="al-badge">Recommended: {it.days} days</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>RTW Enquiry Form</h2>
            <p>Tell us your dream itinerary and our specialists will build the perfect RTW ticket for you.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Name</label><input required /></div>
              <div className="al-form-group"><label>Email</label><input type="email" required /></div>
              <div className="al-form-group"><label>Preferred Start Date</label><input type="date" /></div>
              <div className="al-form-group"><label>Preferred Cabin</label><select><option>Economy</option><option>Business</option><option>First Class</option></select></div>
              <div className="al-form-group full"><label>Desired Destinations (list in order)</label><textarea placeholder="e.g. Mumbai, London, New York, Tokyo, Singapore" /></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Submit RTW Enquiry →</button></div>
            </form>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>RTW FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['Can I change my itinerary after purchasing an RTW ticket?', 'Date changes are permitted subject to fare rules and seat availability. Route changes (adding or removing destinations) are not permitted once an RTW ticket is issued.'],
              ['Can I mix Sanatan Airlines with partner airlines?', 'Yes — RTW tickets can include flights operated by our Star Alliance partners, allowing you to access destinations not on our own network.'],
              ['Is stopover in transit allowed?', 'Yes. Stopovers of any length count as one of your 6 permitted stops. Free overnight transit is permitted at all Sanatan Airlines hub airports.'],
              ['What is the advance purchase requirement?', 'RTW tickets must be purchased at least 7 days before the first departure date. We recommend booking 3–6 months in advance for best availability.'],
              ['Can children travel on RTW tickets?', 'Yes. Children aged 2–11 pay 75% of the adult RTW base fare. Infants under 2 pay 10% but do not occupy a separate seat.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Globe size={20}/>, 'Multi-City', '/airline/multi-city'], [<Globe2 size={20}/>, 'Destinations', '/airline/destinations'], [<Trophy size={20}/>, 'SkyNova Rewards', '/airline/skynova-rewards'], [<Briefcase size={20}/>, 'Business Class', '/airline/business-class'], [<Umbrella size={20}/>, 'Airport Lounges', '/airline/airport-lounges']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>RTW Rules:</strong> Round-the-World tickets are issued subject to Sanatan Airlines RTW Terms and Conditions and applicable partner airline policies. Travel must be completed within 12 months of first departure. No refund is available after first departure.</div>
        </div>
      </section>
    </PageLayout>
  );
}

// ============================================================
// GROUP TRAVEL (Page 14)
// ============================================================
export function GroupTravelPage() {
  return (
    <PageLayout>
      <section className="al-hero">
        <div className="al-hero-bg al-airline-bg-5" />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">10+ Passengers</div>
          <h1>Group Travel<br />Made Simple.</h1>
          <p className="al-hero-sub">Exclusive group fares, flexible name management, dedicated group check-in and a single point of contact from enquiry to boarding.</p>
          <div className="al-hero-actions">
            <Link href="#group-form" className="al-btn-primary">Get a Group Quote →</Link>
            <Link href="/airline/corporate-travel" className="al-btn-secondary">Corporate Travel</Link>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-desc">
            <div className="al-desc-text">
              <h2>Why Book as a Group?</h2>
              <p>Sanatan Airlines Group Travel is designed for parties of 10 or more passengers travelling together. Groups receive specially negotiated fares, flexible name submission deadlines, priority seating allocation and dedicated check-in desks at all major airports.</p>
              <p>Our group desk handles everything from initial quote to post-travel reporting. Groups ranging from school trips to corporate delegations, sports teams, wedding parties and pilgrimage groups all qualify for our group booking programme.</p>
              <ul className="al-list" style={{ marginTop: 20 }}>
                <li>Negotiated fares up to 25% below published prices</li>
                <li>Name list submission up to 72 hours before departure</li>
                <li>Dedicated group boarding gate at all Sanatan hubs</li>
                <li>Group leader travels free for groups of 25+</li>
                <li>Split billing available across multiple corporate cards</li>
                <li>24/7 group operations hotline on day of travel</li>
              </ul>
            </div>
            <div className="al-desc-img">
              <img src="/images/sa-club-family.jpg" alt="A family group walking together toward a hilltop temple" />
            </div>
          </div>
        </div>
      </section>

      <section className="al-section al-section--navy">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Group Benefits</div><h2>Exclusive Group Privileges</h2></div>
          <div className="al-cards al-cards--3">
            {[
              { icon: <IndianRupee size={20} color="#fff"/>, t: 'Negotiated Group Fares', d: 'Rates negotiated against the lowest published fare, with volume discounts for groups of 25, 50 and 100+.' },
              { icon: <ClipboardList size={20} color="#fff"/>, t: 'Flexible Name Management', d: 'Submit passenger names up to 72 hours before departure. Name changes are permitted free of charge up to 48 hours before.' },
              { icon: <CreditCard size={20} color="#fff"/>, t: 'Flexible Payment', d: 'Pay a 25% deposit at booking and settle the balance 30 days before departure. Split billing across multiple cards.' },
              { icon: <Armchair size={28} color="#fff"/>, t: 'Block Seat Allocation', d: 'Adjacent or zone-based seating to keep your group together on the aircraft.' },
              { icon: <Luggage size={28} color="#fff"/>, t: 'Group Baggage Policy', d: 'Baggage allowances are pooled across the group, maximising flexibility without individual bag counts.' },
              { icon: <Headphones size={28} color="#fff"/>, t: 'Dedicated Group Desk', d: 'Your own account manager from enquiry to completion. One phone number and email for all group needs.' },
            ].map((b) => <div key={b.t} className="al-card"><div style={{ marginBottom: 12 }}>{b.icon}</div><h3>{b.t}</h3><p>{b.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="al-section al-section--light" id="group-form">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>Group Travel Enquiry</h2>
            <p>Tell us about your group and we will prepare a tailored quote within 2 business hours.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Contact Name</label><input required /></div>
              <div className="al-form-group"><label>Organisation / Group Name</label><input required /></div>
              <div className="al-form-group"><label>Email</label><input type="email" required /></div>
              <div className="al-form-group"><label>Phone</label><input type="tel" /></div>
              <div className="al-form-group"><label>Origin</label><input required placeholder="City or airport" /></div>
              <div className="al-form-group"><label>Destination</label><input required placeholder="City or airport" /></div>
              <div className="al-form-group"><label>Outbound Date</label><input type="date" /></div>
              <div className="al-form-group"><label>Return Date</label><input type="date" /></div>
              <div className="al-form-group"><label>No. of Adults</label><input type="number" min={10} required /></div>
              <div className="al-form-group"><label>No. of Children (2–11)</label><input type="number" min={0} defaultValue={0} /></div>
              <div className="al-form-group"><label>Preferred Cabin</label><select><option>Economy</option><option>Business</option><option>Mixed Cabin</option></select></div>
              <div className="al-form-group"><label>Group Type</label><select><option>Corporate</option><option>School / Education</option><option>Sports Team</option><option>Wedding Party</option><option>Pilgrimage / Religious</option><option>Other</option></select></div>
              <div className="al-form-group full"><label>Special Requirements</label><textarea placeholder="Wheelchair assistance, special meals, specific seating preferences..." /></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Request Group Quote →</button></div>
            </form>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>Group Travel FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['What is the minimum group size?', 'The minimum group size for Sanatan Airlines Group Travel is 10 passengers travelling on the same flight on the same date.'],
              ['Can groups be split across different fare classes?', 'Yes — a group can book different passengers into different cabins. Each cabin is priced separately, with group pricing applied to each.'],
              ['What if the group size changes after booking?', 'You can reduce the group size by up to 10% (minimum 1 passenger) free of charge up to 60 days before departure. Reductions beyond that may incur fees. Increases are subject to availability.'],
              ['How does the leader travels free benefit work?', 'For groups of 25 or more adults, the group leader\'s seat is complimentary (taxes still apply). For groups of 50+, two complimentary seats are provided.'],
              ['Is group travel available for international routes?', 'Yes — group pricing is available on all Sanatan Airlines international routes, subject to minimum 10 adults and advance enquiry.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<Briefcase size={20}/>, 'Corporate Travel', '/airline/corporate-travel'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Globe size={20}/>, 'Multi-City', '/airline/multi-city'], [<Accessibility size={20}/>, 'Special Assistance', '/airline/special-assistance'], [<Luggage size={20}/>, 'Baggage Info', '/airline/baggage'], [<Phone size={20}/>, 'Contact Us', '/airline/contact']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Group Booking Terms:</strong> Group fares are non-transferable and not combinable with other promotions. Deposit and balance payment deadlines are strictly enforced. Cancellation fees apply as per the group contract.</div>
        </div>
      </section>
    </PageLayout>
  );
}
