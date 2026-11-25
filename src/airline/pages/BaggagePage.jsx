'use client';
import { AlertTriangle, CheckCircle, CircleDot, ClipboardList, Music2, Package, PawPrint } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';

const ALLOWANCE = [
  { cabin: 'First Class', carry: '2 × 8 kg', checked: '3 × 32 kg', note: 'Valet baggage collection on select routes', tone: 'First' },
  { cabin: 'Business Class', carry: '2 × 7 kg', checked: '2 × 32 kg', note: 'Expedited baggage delivery', tone: 'Business' },
  { cabin: 'Premium Economy', carry: '1 × 7 kg', checked: '2 × 23 kg', note: 'Priority baggage delivery', tone: 'Premium' },
  { cabin: 'Economy (Flex)', carry: '1 × 7 kg', checked: '1 × 23 kg', note: 'Flexible baggage changes', tone: 'Flex' },
  { cabin: 'Economy (Classic)', carry: '1 × 7 kg', checked: '1 × 23 kg', note: 'Standard allowance', tone: 'Classic' },
  { cabin: 'Economy (Light)', carry: '1 × 7 kg', checked: 'None included', note: 'Cabin bag only', tone: 'Light' },
];

const RESTRICTED = [
  { item: 'Power banks & lithium batteries', rule: 'Cabin only. Maximum 100 Wh. Spare batteries in cargo are prohibited.' },
  { item: 'Sharp objects', rule: 'Place scissors and knives in checked baggage. Blades over 6 cm are prohibited in cabin.' },
  { item: 'Liquids', rule: '100 ml per container, inside one transparent resealable one-litre bag.' },
  { item: 'Flammable materials', rule: 'Completely prohibited in both cabin baggage and checked cargo.' },
  { item: 'Firearms', rule: 'Declared sporting firearms require prior approval and strict documentation.' },
  { item: 'Pressurised sprays', rule: 'Maximum 500 ml per item and 2 kg aggregate. Personal care items only.' },
];

export default function BaggagePage() {
  return (
    <PageLayout>
      <section className="bg-hero">
        <img className="bg-hero-img" src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=85" alt="" aria-hidden="true" />
        <div className="bg-hero-shade" />
        <div className="bg-hero-inner">
          <div className="bg-eyebrow">Travel prepared</div>
          <h1>Pack for the<br /><em>journey ahead.</em></h1>
          <p>Clear baggage allowances, thoughtful guidance and everything you need before the journey begins.</p>
          <div className="bg-hero-actions">
            <Link href="/airline/manage-booking" className="bg-btn bg-btn--gold">Add baggage <span>→</span></Link>
            <Link href="/airline/excess-baggage" className="bg-btn bg-btn--ghost">Excess baggage rates</Link>
          </div>
        </div>
      </section>

      <section className="bg-guide" aria-label="Baggage guide summary">
        <div className="al-container bg-guide-grid">
          {[
            ['01', 'Cabin bag', '56 × 45 × 25 cm'],
            ['02', 'Personal item', '40 × 30 × 15 cm'],
            ['03', 'Checked pieces', 'Varies by cabin'],
            ['04', 'Pre-purchase', 'Lower than airport rates'],
          ].map(([number, label, detail]) => (
            <div key={label}><span>{number}</span><strong>{label}</strong><small>{detail}</small></div>
          ))}
        </div>
      </section>

      <section className="bg-allowances">
        <div className="al-container">
          <div className="bg-section-head">
            <span className="bg-kicker">Baggage policy</span>
            <h2>Allowances, clearly defined</h2>
            <p>Shown per person per journey. Confirm international variations at booking.</p>
          </div>
          <div className="bg-table-wrap">
            <div className="bg-table-head">
              <span>Cabin class</span><span>Cabin bag</span><span>Checked bags</span><span>Included benefit</span>
            </div>
            {ALLOWANCE.map((item) => (
              <div className="bg-table-row" key={item.cabin}>
                <strong><i>{item.tone.slice(0, 1)}</i>{item.cabin}</strong>
                <span>{item.carry}</span>
                <span>{item.checked}</span>
                <small>{item.note}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cabin-rule">
        <div className="al-container bg-cabin-grid">
          <figure className="bg-cabin-media">
            <img src="https://images.unsplash.com/photo-1565793979765-a73e1f74af3c?w=900&q=85" alt="Cabin baggage being placed onboard" />
            <figcaption>Securely stowed. Ready for take-off.</figcaption>
          </figure>
          <div className="bg-cabin-copy">
            <span className="bg-kicker">Cabin baggage</span>
            <h2>Room for what matters</h2>
            <p>Your main cabin bag must fit in the overhead locker or under the seat in front, with maximum dimensions of <strong>56 × 45 × 25 cm</strong>.</p>
            <p>You may also carry one personal item — a handbag, laptop bag or compact backpack — up to <strong>40 × 30 × 15 cm</strong>.</p>
            <ul>
              <li>Musical instruments under 10 kg may qualify for cabin carriage</li>
              <li>Airport duty-free bags are permitted in addition to the allowance</li>
              <li>Cabin bag weights are strictly checked at selected airports</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-restricted">
        <div className="al-container">
          <div className="bg-section-head bg-section-head--dark">
            <span className="bg-kicker">Restricted items</span>
            <h2>Know before you pack</h2>
          </div>
          <div className="bg-restricted-grid">
            {RESTRICTED.map((item, index) => (
              <article className="bg-restricted-card" key={item.item}>
                <div className="bg-restricted-icon"><AlertTriangle size={20}/><span>{String(index + 1).padStart(2, '0')}</span></div>
                <h3>{item.item}</h3>
                <p>{item.rule}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sports">
        <div className="al-container">
          <div className="bg-section-head bg-section-head--left">
            <span className="bg-kicker">Special equipment</span>
            <h2>Bring the equipment for your plans</h2>
          </div>
          <div className="bg-sports-table">
            <div className="bg-sports-head"><span>Equipment</span><span>Economy</span><span>Business / First</span><span>Maximum size</span></div>
            {[
              ['Golf set', '₹2,500', 'Included', '150 × 30 × 70 cm'],
              ['Ski / snowboard set', '₹2,500', 'Included', '200 cm total length'],
              ['Surfboard', '₹3,500', '₹1,500', 'Maximum 2.5 m'],
              ['Bicycle (boxed)', '₹3,500', '₹2,000', '130 × 90 × 30 cm'],
              ['Diving equipment', '₹2,000', 'Included', 'Case maximum 32 kg'],
            ].map((row) => (
              <div className="bg-sports-row" key={row[0]}>{row.map((cell, index) => <span key={index}>{cell}</span>)}</div>
            ))}
          </div>
          <div className="bg-sports-links">
            <Link href="/airline/sports-equipment">Sports equipment guide →</Link>
            <Link href="/airline/musical-instruments">Musical instruments →</Link>
          </div>
        </div>
      </section>

      <section className="bg-prepay">
        <div className="al-container bg-prepay-card">
          <div className="bg-prepay-copy">
            <span className="bg-kicker bg-kicker--light">Pre-purchase</span>
            <h2>Travel lighter on airport costs</h2>
            <p>Add checked bags to your booking at a lower rate than the airport price.</p>
          </div>
          <div className="bg-prepay-actions">
            <Link href="/airline/manage-booking" className="bg-btn bg-btn--gold">Manage baggage <span>→</span></Link>
            <Link href="/airline/excess-baggage" className="bg-btn bg-btn--ghost">Compare rates</Link>
          </div>
        </div>
      </section>

      <section className="bg-faq">
        <div className="al-container bg-faq-grid">
          <div className="bg-faq-head">
            <span className="bg-kicker">Good to know</span>
            <h2>Baggage FAQs</h2>
          </div>
          <div className="al-faqs">
            {[
              ['Can I pool baggage allowances across passengers on the same booking?', 'Yes — pooling is permitted for passengers on the same booking, flight and cabin class. Total pooled weight cannot exceed 32 kg per piece.'],
              ['What happens if my bag is overweight?', 'Overweight bags are charged at the airport overweight rate, which is significantly higher than pre-purchased rates.'],
              ['How is my baggage tracked?', 'Checked baggage is tagged with a barcode and can be tracked through Manage Booking until collection at the destination carousel.'],
              ['What do I do if my bag is damaged?', 'Report it immediately at the Baggage Services desk before leaving the airport. Claims submitted after leaving may not be accepted.'],
              ['Are lithium batteries allowed in checked bags?', 'Spare lithium batteries and power banks must travel in cabin baggage. Installed batteries may travel in hold. No battery over 160 Wh is permitted.'],
            ].map(([question, answer]) => <details className="al-faq" key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="bg-related">
        <div className="al-container">
          <div className="al-related">
            {[[<Package size={20}/>, 'Excess Baggage', '/airline/excess-baggage'], [<CircleDot size={20}/>, 'Sports Equipment', '/airline/sports-equipment'], [<Music2 size={20}/>, 'Musical Instruments', '/airline/musical-instruments'], [<PawPrint size={20}/>, 'Pet Travel', '/airline/pet-travel'], [<ClipboardList size={20}/>, 'Manage Booking', '/airline/manage-booking'], [<CheckCircle size={20}/>, 'Check-in Online', '/airline/check-in']].map(([icon, label, href]) => (
              <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>
            ))}
          </div>
          <div className="al-disclaimer"><strong>Baggage liability:</strong> Liability for checked baggage is governed by the Montreal Convention 1999 or applicable domestic regulations. High-value items should travel in cabin or be declared and insured separately.</div>
        </div>
      </section>
    </PageLayout>
  );
}
