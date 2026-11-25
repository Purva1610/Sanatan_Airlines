'use client';
import { Briefcase, Car, CheckCircle, ClipboardList, Crown, Gift, Globe2, Hotel, Lightbulb, Luggage, MapPin, Phone, Plane, Recycle, Shield, Sprout, Trophy, VolumeX } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';

// ============================================================
// GIFT VOUCHERS (Page 40)
// ============================================================
export function GiftVouchersPage() {
  return (
    <PageLayout>
      <section className="al-hero">
        <div className="al-hero-bg al-airline-bg-1" />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">Give the Gift of Travel</div>
          <h1>Sanatan Airlines<br />Gift Vouchers.</h1>
          <p className="al-hero-sub">The perfect gift for every occasion â€” travel vouchers redeemable on any Sanatan Airlines flight, baggage service or seat upgrade.</p>
          <div className="al-hero-actions"><Link href="#gift-form" className="al-btn-primary">Buy a Gift Voucher â†’</Link></div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Denominations</div><h2>Choose Your Amount</h2></div>
          <div className="al-cards al-cards--4">
            {[['â‚¹2,500', 'Short domestic flight'], ['â‚¹5,000', 'Most domestic routes'], ['â‚¹10,000', 'Premium Economy regional'], ['â‚¹25,000', 'International short-haul'], ['â‚¹50,000', 'International Economy'], ['â‚¹1,00,000', 'Business Class regional'], ['â‚¹2,00,000', 'Business Class long-haul'], ['Custom', 'Any amount â‚¹1,000+']].map(([amount, desc]) => (
              <div key={amount} className="al-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--al-navy)', marginBottom: 8 }}>{amount}</div>
                <p style={{ fontSize: 13 }}>{desc}</p>
                <Link href="#gift-form" className="al-btn-primary" style={{ marginTop: 16, fontSize: 13, padding: '8px 14px', display: 'flex', justifyContent: 'center' }}>Select â†’</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section al-section--sky">
        <div className="al-container">
          <div className="al-desc">
            <div className="al-desc-text">
              <h2>How Gift Vouchers Work</h2>
              <p>Sanatan Airlines Gift Vouchers are issued as a unique 16-digit code emailed to the recipient (or yourself, as a physical print). They are valid for 24 months from the date of purchase â€” longer than any competitor voucher in Indian aviation.</p>
              <ul className="al-list" style={{ marginTop: 16 }}>
                <li>Redeemable on all Sanatan Airlines operated flights</li>
                <li>Can be used for flights, baggage fees and seat selection</li>
                <li>Partial use allowed â€” balance remains on the voucher code</li>
                <li>Valid 24 months from purchase date</li>
                <li>Can be gifted as email or physical card (delivery available)</li>
                <li>SkyNova Miles earned by recipient when booking with voucher</li>
              </ul>
            </div>
            <div className="al-desc-img"><img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80" alt="Gift voucher" /></div>
          </div>
        </div>
      </section>

      <section className="al-section" id="gift-form">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>Purchase a Gift Voucher</h2>
            <p>Fill in the details below. The voucher code is delivered instantly by email.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Your Name (purchaser)</label><input required /></div>
              <div className="al-form-group"><label>Your Email</label><input type="email" required /></div>
              <div className="al-form-group"><label>Recipient Name</label><input required /></div>
              <div className="al-form-group"><label>Recipient Email</label><input type="email" required /></div>
              <div className="al-form-group"><label>Voucher Amount</label><select><option>â‚¹2,500</option><option>â‚¹5,000</option><option>â‚¹10,000</option><option>â‚¹25,000</option><option>â‚¹50,000</option><option>â‚¹1,00,000</option><option>â‚¹2,00,000</option><option>Custom amount</option></select></div>
              <div className="al-form-group"><label>Delivery Date</label><input type="date" /></div>
              <div className="al-form-group full"><label>Personal Message (optional)</label><textarea placeholder="A message to include with the voucher..." /></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Purchase Voucher â†’</button></div>
            </form>
          </div>
        </div>
      </section>

      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header"><h2>Gift Voucher FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['Can a gift voucher be used by someone other than the recipient?', 'The voucher code can be used by anyone who has the code. There is no name restriction on use â€” treat the code like cash.'],
              ['What if the ticket costs more than the voucher value?', 'The remaining amount can be paid by any other accepted payment method (card, UPI, net banking) during checkout.'],
              ['Can I extend the validity of a voucher?', 'Vouchers can be extended by one year for a â‚¹500 fee, applied before the expiry date.'],
              ['What if the recipient has a different name?', 'Vouchers are not name-restricted. The recipient books in their own name and uses the voucher code as a payment method.'],
              ['Can vouchers be refunded?', 'Vouchers are non-refundable once issued. If you change your mind within 24 hours of purchase and no bookings have been made, we will offer a full refund as an exception.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<Trophy size={20}/>, 'SkyNova Rewards', '/airline/skynova-rewards'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Shield size={20}/>, 'Travel Insurance', '/airline/travel-insurance'], [<Hotel size={20}/>, 'Hotel + Flight', '/airline/hotel-flight'], [<Briefcase size={20}/>, 'Business Class', '/airline/business-class'], [<Phone size={20}/>, 'Contact Us', '/airline/contact']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Voucher Terms:</strong> Gift vouchers are non-refundable, non-transferable for cash value and subject to Sanatan Airlines Voucher Terms and Conditions. Unused balance cannot be converted to cash or SkyNova Miles.</div>
        </div>
      </section>
    </PageLayout>
  );
}

// ============================================================
// TRAVEL INSURANCE (Page 41)
// ============================================================
export function TravelInsurancePage() {
  return (
    <PageLayout>
      <section className="al-hero">
        <div className="al-hero-bg al-airline-bg-4" />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">Sanatan Shield</div>
          <h1>Travel Insurance â€”<br />Fly with Confidence.</h1>
          <p className="al-hero-sub">Comprehensive travel insurance covering medical emergencies, trip cancellation, baggage loss and flight delay â€” from â‚¹299 per person per trip.</p>
          <div className="al-hero-actions"><Link href="#insurance-form" className="al-btn-primary">Get Insured Now â†’</Link></div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Plans</div><h2>Three Plans. One for Everyone.</h2></div>
          <div className="al-tiers">
            {[
              { name: 'Basic Shield', price: 'From â‚¹299', color: '#6b7280', cover: ['Medical up to â‚¹5 lakh', 'Baggage loss up to â‚¹25,000', 'Flight delay â‚¹1,500/4h', 'No trip cancellation'] },
              { name: 'Flex Shield', price: 'From â‚¹599', color: 'var(--al-navy)', cover: ['Medical up to â‚¹20 lakh', 'Baggage loss up to â‚¹75,000', 'Flight delay â‚¹2,500/4h', 'Trip cancellation â‚¹50,000', 'Missed connection â‚¹10,000'] },
              { name: 'Premier Shield', price: 'From â‚¹1,199', color: 'var(--al-flame)', cover: ['Medical up to â‚¹1 crore', 'Baggage loss up to â‚¹1.5 lakh', 'Flight delay â‚¹5,000/2h', 'Trip cancellation â‚¹2 lakh', 'Adventure sports covered', 'Pre-existing condition option'] },
            ].map(p => (
              <div key={p.name} className="al-tier">
                <div className="al-tier-head" style={{ background: p.color }}>
                  <div className="al-tier-name">{p.name}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginTop: 8 }}>{p.price}</div>
                </div>
                <div className="al-tier-body">
                  <ul>{p.cover.map(c => <li key={c}>{c}</li>)}</ul>
                  <Link href="#insurance-form" className="al-btn-primary" style={{ marginTop: 20, display: 'flex', justifyContent: 'center', fontSize: 13, padding: '10px 16px' }}>Choose {p.name} â†’</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section al-section--light" id="insurance-form">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>Get Your Travel Insurance Quote</h2>
            <p>Instant quote from our insurance partner. Policy issued immediately upon payment.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Destination</label><input required placeholder="e.g. United Kingdom" /></div>
              <div className="al-form-group"><label>Travel Dates</label><input type="date" /></div>
              <div className="al-form-group"><label>No. of Adults</label><input type="number" defaultValue={1} min={1} /></div>
              <div className="al-form-group"><label>No. of Children</label><input type="number" defaultValue={0} min={0} /></div>
              <div className="al-form-group"><label>Plan</label><select><option>Basic Shield</option><option>Flex Shield</option><option>Premier Shield</option></select></div>
              <div className="al-form-group"><label>Booking Reference (if adding to existing booking)</label><input placeholder="Optional" /></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Get My Quote â†’</button></div>
            </form>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>Travel Insurance FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['Who provides the insurance?', 'Sanatan Shield travel insurance is underwritten by Bajaj Allianz General Insurance, one of India\'s leading general insurance companies. Policy claims are handled directly by Bajaj Allianz.'],
              ['Can I buy insurance after booking my flight?', 'Yes â€” you can add travel insurance at any time up to 24 hours before your departure. Adding during the booking process is the most convenient option.'],
              ['What counts as a valid cancellation reason?', 'Valid reasons under Flex and Premier Shield include: serious illness or injury of passenger or immediate family, death of immediate family member, jury duty, natural disaster at destination, and visa refusal after a confirmed booking.'],
              ['Does the insurance cover COVID-19?', 'Premier Shield includes COVID-19 medical cover and trip cancellation if you test positive within 7 days of departure. Basic and Flex Shield exclude COVID-19 specific cancellation cover.'],
              ['How do I make a claim?', 'Download the Bajaj Allianz insurance app or call their 24/7 helpline. Claims can also be submitted online at the insurer\'s portal. Keep all receipts, medical reports and airline documentation.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Gift size={20}/>, 'Gift Vouchers', '/airline/gift-vouchers'], [<ClipboardList size={20}/>, 'Manage Booking', '/airline/manage-booking'], [<Luggage size={20}/>, 'Baggage Info', '/airline/baggage'], [<Trophy size={20}/>, 'SkyNova Rewards', '/airline/skynova-rewards'], [<Phone size={20}/>, 'Contact Us', '/airline/contact']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Insurance Notice:</strong> Travel insurance is offered through our insurance partner and is a separate contract to your airline ticket. Sanatan Airlines is a distributor, not the underwriter. Claims are governed by the insurer's policy document. Read the policy wording before purchase.</div>
        </div>
      </section>
    </PageLayout>
  );
}

// ============================================================
// AIRPORT LOUNGES (Page 42)
// ============================================================
export function AirportLoungesPage() {
  const lounges = [
    { airport: 'Mumbai T2', name: 'Sanatan Atrium Lounge', tier: 'Business Class Lounge', features: ['Shower suites (3)', 'Ã€ la carte dining', 'Premium bar & cocktail menu', 'Sleeping pods (8)', 'Business workstations (20)', 'Spa treatment (pre-booking)'], access: 'Business Class, First Class, SkyNova Gold, SkyNova Platinum' },
    { airport: 'Delhi T3', name: 'Sanatan Cloud Lounge', tier: 'Business Class Lounge', features: ['Shower suites (4)', 'Ã€ la carte dining', 'Premium bar', 'Premium Wi-Fi', 'Business workstations', 'Quiet zone'], access: 'Business Class, First Class, SkyNova Gold, SkyNova Platinum' },
    { airport: 'Mumbai T2', name: 'Sanatan First Class Lounge', tier: 'First Class Lounge', features: ['Private dining rooms (6)', 'Spa treatment suite (included)', '1:1 personal service', 'Sleeping suites (4)', 'Complimentary laundry', 'Car to gate'], access: 'First Class passengers only' },
    { airport: 'Bengaluru T2', name: 'Sanatan Lounge BLR', tier: 'Business Lounge', features: ['Buffet dining', 'Shower suite (2)', 'Standard bar', 'Wi-Fi workstations'], access: 'Business Class, SkyNova Gold, SkyNova Platinum' },
    { airport: 'Singapore SIN', name: 'Partner Lounge (via SATS Premier)', tier: 'Partner Lounge', features: ['Buffet dining', 'Shower suites', 'Standard bar', 'Wi-Fi'], access: 'Business Class, SkyNova Gold, SkyNova Platinum' },
    { airport: 'Dubai DXB', name: 'Partner Lounge (via Dubai Airports)', tier: 'Partner Lounge', features: ['Buffet dining', 'Premium bar', 'Shower suites', 'Kids\' zone'], access: 'Business Class, SkyNova Gold, SkyNova Platinum' },
  ];
  return (
    <PageLayout>
      <section className="al-hero al-hero--tall">
        <div className="al-hero-bg al-airline-bg-5" />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">Before You Fly</div>
          <h1>Airport Lounges â€”<br />Your Space to Relax.</h1>
          <p className="al-hero-sub">Exclusive Sanatan Airlines Lounges at Mumbai and Delhi plus 60+ partner lounges worldwide. Dine, shower, work and unwind before your flight.</p>
          <div className="al-hero-actions">
            <Link href="/airline/business-class" className="al-btn-primary">Book Business Class â†’</Link>
            <Link href="/airline/skynova-rewards" className="al-btn-secondary">Join SkyNova</Link>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Our Lounges</div><h2>Locations & Access</h2></div>
          <div className="al-cards">
            {lounges.map(l => (
              <div key={l.name} className="al-card">
                <div className="al-badge al-badge--flame" style={{ marginBottom: 12 }}>{l.tier}</div>
                <h3>{l.name}</h3>
                <div style={{ fontSize: 12, color: 'var(--al-flame)', fontWeight: 700, marginBottom: 12 }}><MapPin size={12} style={{ verticalAlign: 'middle', marginRight: 4 }}/>{l.airport}</div>
                <ul style={{ listStyle: 'none', marginBottom: 12 }}>
                  {l.features.map(f => <li key={f} style={{ fontSize: 13, color: 'var(--al-muted)', padding: '3px 0' }}>âœ“ {f}</li>)}
                </ul>
                <div style={{ fontSize: 12, background: 'var(--al-bg)', borderRadius: 4, padding: '8px 12px', color: 'var(--al-text)' }}>
                  <strong>Access:</strong> {l.access}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section al-section--sky">
        <div className="al-container">
          <div className="al-section-header"><h2>Who Has Lounge Access?</h2></div>
          <div style={{ overflowX: 'auto' }}>
            <table className="al-fare-table">
              <thead><tr><th>Passenger Type</th><th>Sanatan Lounge</th><th>Partner Lounges</th><th>Fee</th></tr></thead>
              <tbody>
                {[
                  ['First Class passenger', 'âœ“ First Class Lounge', 'âœ“', 'Included'],
                  ['Business Class passenger', 'âœ“ Business Lounge', 'âœ“', 'Included'],
                  ['SkyNova Platinum', 'âœ“ Business Lounge', 'âœ“', 'Included'],
                  ['SkyNova Gold', 'âœ“ Business Lounge', 'âœ“', 'Included'],
                  ['SkyNova Silver', 'âœ—', '2 visits/year', 'Complimentary quota'],
                  ['Premium Economy passenger', 'âœ—', 'âœ—', 'Purchase access â‚¹2,000'],
                  ['Economy passenger', 'âœ—', 'âœ—', 'Purchase access â‚¹2,500'],
                ].map(([pt, sa, pa, fee]) => <tr key={pt}><td>{pt}</td><td className={sa.startsWith('âœ“') ? 'al-fare-check' : 'al-fare-cross'}>{sa}</td><td>{pa}</td><td>{fee}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-gallery">
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80" alt="Airport lounge" /></div>
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1521791055366-0d553872952f?w=600&q=80" alt="Lounge dining" /></div>
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80" alt="Lounge relaxation" /></div>
          </div>
        </div>
      </section>

      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>Lounge Access Enquiry</h2>
            <p>Not sure if you have lounge access or want to purchase day access? Complete the form below.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Name</label><input required /></div>
              <div className="al-form-group"><label>Booking Reference</label><input /></div>
              <div className="al-form-group"><label>SkyNova Number (if applicable)</label><input /></div>
              <div className="al-form-group"><label>Airport</label><input required placeholder="e.g. Mumbai T2" /></div>
              <div className="al-form-group"><label>No. of Guests</label><select><option>1</option><option>2</option><option>3</option><option>4</option></select></div>
              <div className="al-form-group"><label>Email</label><input type="email" required /></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Enquire About Lounge Access â†’</button></div>
            </form>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>Lounge FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['How early can I access the lounge?', 'Sanatan Airlines Lounges open 3 hours before the first scheduled departure. You may access the lounge from check-in until your flight\'s boarding call.'],
              ['Can I bring a guest to the lounge?', 'Business Class and First Class passengers may bring one companion at no charge. Additional guests may be admitted for a â‚¹2,000 per person fee, subject to capacity.'],
              ['Is there a shower available?', 'Shower suites are available at Sanatan Atrium Lounge (Mumbai) and Cloud Lounge (Delhi). Shower suites at the First Class Lounge are reserved for First Class passengers. Advance booking recommended.'],
              ['What food and drink is available?', 'All Sanatan Lounges offer Ã  la carte dining or buffet (by lounge), a premium bar with spirits and wine, barista coffee and fresh juices. The First Class Lounge at Mumbai has a dedicated private dining room.'],
              ['Can I purchase lounge access without a Business Class ticket?', 'Yes â€” Economy and Premium Economy passengers can purchase lounge access for â‚¹2,000â€“â‚¹2,500 per person at the lounge reception, subject to capacity. Pre-booking is recommended.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<Briefcase size={20}/>, 'Business Class', '/airline/business-class'], [<Crown size={20}/>, 'First Class', '/airline/first-class'], [<Trophy size={20}/>, 'SkyNova Rewards', '/airline/skynova-rewards'], [<CheckCircle size={20}/>, 'Check-in Online', '/airline/check-in'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Phone size={20}/>, 'Contact Us', '/airline/contact']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Lounge Access Policy:</strong> Lounge access is subject to capacity constraints. Sanatan Airlines reserves the right to restrict entry during peak periods. Access rules are as stated at time of booking and subject to change.</div>
        </div>
      </section>
    </PageLayout>
  );
}

// ============================================================
// HOTEL + FLIGHT (Page 43)
// ============================================================
export function HotelFlightPage() {
  return (
    <PageLayout>
      <section className="al-hero">
        <div className="al-hero-bg al-airline-bg-2" />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">Bundle & Save</div>
          <h1>Hotel + Flight Packages â€”<br />More for Less.</h1>
          <p className="al-hero-sub">Dynamic packages combining Sanatan Airlines flights with 50,000+ hotels. Save up to 20% versus booking separately.</p>
          <div className="al-hero-actions"><Link href="#package-form" className="al-btn-primary">Search Packages â†’</Link></div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Popular Packages</div><h2>City Break Packages</h2></div>
          <div className="al-cards al-cards--3">
            {[
              { dest: 'Dubai', nights: 3, from: 'â‚¹28,500', hotel: '4â˜… Millennium Plaza', inc: 'Flights + Hotel + Breakfast' },
              { dest: 'Singapore', nights: 4, from: 'â‚¹32,000', hotel: '4â˜… Marina Bay Sands Area', inc: 'Flights + Hotel + City Tax' },
              { dest: 'Bangkok', nights: 5, from: 'â‚¹24,000', hotel: '4â˜… Sukhumvit Boutique', inc: 'Flights + Hotel + Breakfast' },
              { dest: 'London', nights: 5, from: 'â‚¹85,000', hotel: '3â˜… Central London', inc: 'Flights + Hotel + Transfers' },
              { dest: 'Tokyo', nights: 6, from: 'â‚¹68,000', hotel: '4â˜… Shinjuku Hotel', inc: 'Flights + Hotel + Rail Pass' },
              { dest: 'Melbourne', nights: 7, from: 'â‚¹72,000', hotel: '4â˜… CBD Hotel', inc: 'Flights + Hotel + City Guide' },
            ].map(p => (
              <div key={p.dest} className="al-card">
                <h3>{p.dest}</h3>
                <div className="al-badge" style={{ marginBottom: 8 }}>{p.nights} nights</div>
                <div style={{ fontSize: 13, color: 'var(--al-muted)', marginBottom: 8 }}>{p.hotel}</div>
                <div style={{ fontSize: 12, color: 'var(--al-flame)', fontWeight: 700, marginBottom: 12 }}>{p.inc}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--al-navy)', marginBottom: 16 }}>from {p.from}</div>
                <Link href="#package-form" className="al-btn-primary" style={{ display: 'flex', justifyContent: 'center', fontSize: 13, padding: '10px 16px' }}>View Package â†’</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section al-section--light" id="package-form">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>Search Hotel + Flight Packages</h2>
            <p>Tell us where you want to go and we'll show you the best combined deals.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Origin</label><input required /></div>
              <div className="al-form-group"><label>Destination</label><input required /></div>
              <div className="al-form-group"><label>Check-in</label><input type="date" /></div>
              <div className="al-form-group"><label>Check-out</label><input type="date" /></div>
              <div className="al-form-group"><label>Adults</label><select><option>1</option><option>2</option><option>3</option><option>4</option></select></div>
              <div className="al-form-group"><label>Hotel Star Rating</label><select><option>3â˜…+</option><option>4â˜…+</option><option>5â˜… only</option></select></div>
              <div className="al-form-group"><label>Email</label><input type="email" required /></div>
              <div className="al-form-group"><label>Budget per person (approx)</label><select><option>Under â‚¹25,000</option><option>â‚¹25,000â€“â‚¹50,000</option><option>â‚¹50,000â€“â‚¹1,00,000</option><option>â‚¹1,00,000+</option></select></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Search Packages â†’</button></div>
            </form>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>Hotel + Flight FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['Can I change just the hotel or just the flight in a package?', 'Packages are sold as a single product. Changes to either component affect the full package pricing. Speak to our holidays team for change requests.'],
              ['Are SkyNova Miles earned on hotel stays in a package?', 'Yes â€” flights in a hotel+flight package earn SkyNova Miles at the standard rate. Hotel stays also earn partner points if the hotel is a SkyNova partner.'],
              ['What is the cancellation policy for packages?', 'Package cancellation terms depend on the components. The flight follows standard fare rules; the hotel follows the hotel\'s own cancellation policy. We show combined cancellation terms clearly at checkout.'],
              ['Can I add activities or transfers?', 'Yes â€” airport transfers and selected city activities can be added to packages during or after booking, subject to availability at the destination.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Car size={20}/>, 'Car Rental', '/airline/car-rental'], [<Shield size={20}/>, 'Travel Insurance', '/airline/travel-insurance'], [<Globe2 size={20}/>, 'Destinations', '/airline/destinations'], [<Trophy size={20}/>, 'SkyNova Rewards', '/airline/skynova-rewards'], [<Phone size={20}/>, 'Contact Us', '/airline/contact']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Package Disclaimer:</strong> Hotel + Flight packages are arranged by Sanatan Airlines Holidays in partnership with accommodation providers. Prices are subject to availability and confirmation. Package fares are non-refundable once ticketed unless a fully refundable fare type is selected.</div>
        </div>
      </section>
    </PageLayout>
  );
}

// ============================================================
// CAR RENTAL (Page 44)
// ============================================================
export function CarRentalPage() {
  return (
    <PageLayout>
      <section className="al-hero">
        <div className="al-hero-bg al-airline-bg-3" />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">Fly & Drive</div>
          <h1>Car Rental Partnerships â€”<br />Drive Farther.</h1>
          <p className="al-hero-sub">Exclusive SkyNova passenger discounts with Hertz, Avis, Budget and 15 regional car rental partners across 60 countries.</p>
          <div className="al-hero-actions"><Link href="#car-form" className="al-btn-primary">Book a Car â†’</Link></div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Our Partners</div><h2>Preferred Car Rental Partners</h2></div>
          <div className="al-cards al-cards--3">
            {[
              { brand: 'Hertz', discount: '15% off + free additional driver', presence: '150+ countries, 10,000+ locations', note: 'Use code SKAHERTZ at booking' },
              { brand: 'Avis', discount: '12% off + upgrade on 3-day+ rentals', presence: '165 countries, 5,500+ locations', note: 'Use code SKAAVIS at booking' },
              { brand: 'Budget', discount: '10% off + free child seat', presence: '120+ countries, 3,500+ locations', note: 'Use code SKABUDGET at booking' },
              { brand: 'Zoomcar (India)', discount: '20% off + free petrol first 50 km', presence: '45 Indian cities', note: 'Book via SkyNova app for instant discount' },
              { brand: 'Myles (India)', discount: '15% off monthly rentals', presence: '20 Indian cities', note: 'Book via SkyNova app' },
              { brand: 'Enterprise', discount: '10% off + free GPS', presence: '90+ countries, 9,000+ locations', note: 'Use code SKAENTERPRISE' },
            ].map(p => (
              <div key={p.brand} className="al-card">
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--al-navy)', marginBottom: 8 }}>{p.brand}</div>
                <div style={{ fontSize: 13, color: 'var(--al-flame)', fontWeight: 700, marginBottom: 8 }}>{p.discount}</div>
                <p style={{ marginBottom: 8 }}>{p.presence}</p>
                <div style={{ fontSize: 12, background: 'var(--al-bg)', borderRadius: 4, padding: '6px 10px', color: 'var(--al-text)' }}>{p.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section al-section--light" id="car-form">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>Book a Rental Car</h2>
            <p>Enter your pickup details to see available vehicles and SkyNova rates.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Pickup Location</label><input required placeholder="City or airport code" /></div>
              <div className="al-form-group"><label>Return Location</label><input placeholder="Same as pickup or different" /></div>
              <div className="al-form-group"><label>Pickup Date & Time</label><input type="datetime-local" /></div>
              <div className="al-form-group"><label>Return Date & Time</label><input type="datetime-local" /></div>
              <div className="al-form-group"><label>Car Class</label><select><option>Economy</option><option>Compact</option><option>Mid-size</option><option>Full-size</option><option>SUV</option><option>Premium</option><option>Minivan</option></select></div>
              <div className="al-form-group"><label>SkyNova Number (for discount)</label><input placeholder="Optional â€” for member rates" /></div>
              <div className="al-form-group"><label>Email</label><input type="email" required /></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Search Available Cars â†’</button></div>
            </form>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>Car Rental FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['Do I earn SkyNova Miles on car rentals?', 'Yes â€” car rentals with Hertz, Avis and Budget earn SkyNova Miles when you provide your SkyNova membership number at the time of rental.'],
              ['What documents do I need to rent a car internationally?', 'An International Driving Permit (IDP) alongside your Indian driving licence is required in most countries. Some countries accept a valid Indian driving licence. Check the requirements for your specific destination.'],
              ['Can I add a named additional driver?', 'Yes â€” most partner agreements include one free additional driver for SkyNova members. Additional drivers beyond the first are charged by the rental company.'],
              ['What insurance is included?', 'Basic collision damage waiver (CDW) is included in the partner discount rate. We recommend purchasing full coverage including theft protection and personal accident insurance, especially for international rentals.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<Hotel size={20}/>, 'Hotel + Flight', '/airline/hotel-flight'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Shield size={20}/>, 'Travel Insurance', '/airline/travel-insurance'], [<Trophy size={20}/>, 'SkyNova Rewards', '/airline/skynova-rewards'], [<Globe2 size={20}/>, 'Destinations', '/airline/destinations'], [<Phone size={20}/>, 'Contact Us', '/airline/contact']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Car Rental Notice:</strong> Car rental agreements are between the customer and the rental company. Sanatan Airlines is a facilitator and discount provider only. All rental terms, insurance and liability are governed by the rental company's own contract.</div>
        </div>
      </section>
    </PageLayout>
  );
}

// ============================================================
// SUSTAINABILITY (Page 45)
// ============================================================
export function SustainabilityPage() {
  return (
    <PageLayout>
      <section className="al-hero al-hero--tall">
        <div className="al-hero-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=1600&q=80)' }} />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">Our Planet, Our Responsibility</div>
          <h1>Sustainability &<br />Carbon Offset.</h1>
          <p className="al-hero-sub">Carbon neutral by 2040 â€” our plan covers Sustainable Aviation Fuel, next-generation aircraft, operational efficiency and a passenger offset programme open to everyone.</p>
          <div className="al-hero-actions">
            <Link href="#offset-form" className="al-btn-primary">Offset My Flight â†’</Link>
            <Link href="#report" className="al-btn-secondary">Read Our 2026 Report</Link>
          </div>
        </div>
      </section>

      <section className="al-section al-section--sky">
        <div className="al-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 24 }}>
            {[['15%', 'SAF blend on average in 2026'], ['25%', 'Lower fuel/seat vs previous fleet'], ['â‚¹4.2 Cr', 'Carbon offset fund 2026'], ['4.1 yrs', 'Average fleet age'], ['2040', 'Carbon neutral target year'], ['0', 'Single-use plastic since 2024']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center', padding: '28px 20px', background: '#fff', borderRadius: 'var(--al-radius-lg)', border: '1.5px solid var(--al-line)' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#16a34a', marginBottom: 6 }}>{n}</div>
                <div style={{ fontSize: 13, color: 'var(--al-muted)', fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Our Pillars</div><h2>Sustainability Strategy 2030</h2></div>
          <div className="al-cards al-cards--3">
            {[
              { icon: 'â›½', t: 'Sustainable Aviation Fuel', d: 'We have committed to 30% SAF blend by 2030. Our SAF is sourced from agricultural waste, municipal solid waste and biomass â€” not food crops.' },
              { icon: <Plane size={20}/>, t: 'Next-Generation Fleet', d: 'The A320neo, A350 and B787 each burn 20â€“25% less fuel per seat than the aircraft they replaced. Fleet renewal is our single largest emission reduction measure.' },
              { icon: <Globe2 size={20}/>, t: 'Carbon Offset Programme', d: 'SkyNova Carbon allows passengers to offset their flight emissions through verified projects: reforestation in the Western Ghats, clean cookstoves in Rajasthan, solar micro-grids in Bihar.' },
              { icon: <Recycle size={20}/>, t: 'Zero Single-Use Plastic', d: 'All single-use plastic has been removed from our cabin, catering and ground operations since 2024 â€” replaced by compostable or reusable alternatives.' },
              { icon: <VolumeX size={20}/>, t: 'Noise Reduction', d: 'The GE LEAP and Rolls-Royce Trent XWB engines on our newest aircraft produce 60% less noise than the aircraft they replaced â€” protecting communities near our hub airports.' },
              { icon: <Lightbulb size={20}/>, t: 'Ground & Office Operations', d: '100% renewable electricity at all Sanatan Airlines controlled facilities. Electric ground service equipment at Mumbai and Delhi since 2025.' },
            ].map(s => <div key={s.t} className="al-card"><div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div><h3>{s.t}</h3><p>{s.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="al-section al-section--light" id="offset-form">
        <div className="al-container">
          <div className="al-desc">
            <div className="al-desc-text">
              <h2>Offset Your Flight</h2>
              <p>Use our carbon calculator to estimate the COâ‚‚ of your upcoming flight and offset it through one of our verified climate projects. The average Economy seat on a Mumbaiâ€“London flight produces approximately 0.9 tonnes of COâ‚‚ equivalent. Offsetting costs approximately â‚¹900.</p>
              <ul className="al-list" style={{ marginTop: 20 }}>
                <li>Western Ghats reforestation project (India)</li>
                <li>Clean cookstove distribution in rural Rajasthan</li>
                <li>Solar micro-grid installation in Bihar (Gold Standard verified)</li>
                <li>Mangrove restoration in Tamil Nadu coast</li>
              </ul>
            </div>
            <div className="al-form-wrap" style={{ padding: 32, boxShadow: 'none', border: '1.5px solid var(--al-line)' }}>
              <form className="al-form" style={{ gridTemplateColumns: '1fr' }} onSubmit={e => e.preventDefault()}>
                <div className="al-form-group"><label>Origin</label><input required placeholder="e.g. Mumbai (BOM)" /></div>
                <div className="al-form-group"><label>Destination</label><input required placeholder="e.g. London (LHR)" /></div>
                <div className="al-form-group"><label>Cabin Class</label><select><option>Economy</option><option>Premium Economy</option><option>Business</option><option>First Class</option></select></div>
                <div className="al-form-group"><label>No. of Passengers</label><select><option>1</option><option>2</option><option>3</option><option>4</option></select></div>
                <div className="al-form-group"><label>Offset Project</label><select><option>Western Ghats reforestation</option><option>Clean cookstoves Rajasthan</option><option>Solar micro-grid Bihar</option><option>Mangrove restoration Tamil Nadu</option></select></div>
                <div className="al-form-actions"><button className="al-btn-primary" type="submit">Calculate & Offset â†’</button></div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-gallery">
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=600&q=80" alt="Sustainable aviation" /></div>
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=80" alt="New fleet aircraft" /></div>
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80" alt="Carbon offset reforestation" /></div>
          </div>
        </div>
      </section>

      <section className="al-section al-section--light" id="report">
        <div className="al-container">
          <div className="al-section-header"><h2>Sustainability FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['What is Sustainable Aviation Fuel (SAF)?', 'SAF is aviation fuel produced from non-fossil, sustainable feedstocks (agricultural waste, municipal waste, biomass). It produces up to 80% lower lifecycle COâ‚‚ compared to conventional jet fuel.'],
              ['Is carbon offsetting actually effective?', 'Quality offsets from Gold Standard or VCS certified projects are scientifically verified. We encourage offsetting as a bridge strategy while decarbonisation technologies develop â€” it is not a substitute for direct emissions reduction.'],
              ['When will the airline reach carbon neutrality?', 'Our 2040 target covers Scope 1 (direct) and Scope 3 (passenger km) emissions. The roadmap relies on SAF scale-up, continued fleet renewal, operational efficiency and high-quality offsets for residual emissions.'],
              ['Does offsetting increase the ticket price?', 'Carbon offsetting is entirely optional and selected separately at checkout. It does not affect the base fare. Typical offset costs are â‚¹300â€“â‚¹2,000 per Economy seat depending on route length.'],
              ['What happened to single-use plastic on board?', 'All single-use plastic was removed from our catering in 2024. Cups, cutlery, packaging and stir sticks are now compostable or reusable. We are working with caterers to eliminate plastic from galley storage by 2027.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<Plane size={20}/>, 'Our Fleet', '/airline/our-fleet'], [<Globe2 size={20}/>, 'About Us', '/airline/about'], [<Trophy size={20}/>, 'SkyNova Rewards', '/airline/skynova-rewards'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Phone size={20}/>, 'Contact Us', '/airline/contact'], [<Sprout size={20}/>, 'SAF Partnership Enquiry', '/airline/contact#saf']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Environmental Disclosure:</strong> Carbon offset calculations are based on ICAO Carbon Emissions Calculator methodology. Offset projects are verified by Gold Standard or Verra VCS. Sanatan Airlines' 2040 carbon neutral target is a corporate commitment subject to annual review and industry-wide technological progress.</div>
        </div>
      </section>
    </PageLayout>
  );
}
