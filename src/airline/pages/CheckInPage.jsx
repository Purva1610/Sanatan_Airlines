'use client';
import { Accessibility, Armchair, ClipboardList, Globe2, Home, KeyRound, Luggage, PlaneLanding, PlaneTakeoff, Smartphone, Umbrella, Users, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';

export default function CheckInPage() {
  const { t } = useI18n();
  return (
    <PageLayout>
      <section className="al-hero">
        <div className="al-hero-bg al-airline-bg-3" />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">Skip the Queue</div>
          <h1>Check In Online.<br />Board with Ease.</h1>
          <p className="al-hero-sub">Check in from anywhere between 48 hours and 1 hour before your flight. Get your boarding pass on your phone, tablet or printed at home.</p>
          <div className="al-hero-actions">
            <Link href="/airline/manage-booking" className="al-btn-primary">Start Check-in →</Link>
            <Link href="/airline/flight-status" className="al-btn-secondary">Track My Flight</Link>
          </div>
        </div>
      </section>

      {/* Quick check-in */}
      <section className="ci-quick">
        <form
          className="ci-quick-card"
          onSubmit={(e) => { e.preventDefault(); window.location.href = '/airline/manage-booking'; }}
        >
          <div className="ci-quick-title">
            <span className="ci-quick-icon"><Smartphone size={18} /></span>
            <div>
              <strong>Online Check-in</strong>
              <span>Opens 48 hours before departure</span>
            </div>
          </div>
          <label className="ci-quick-field">
            <span>Booking Reference (PNR)</span>
            <input placeholder="e.g. SN8X2K" required />
          </label>
          <label className="ci-quick-field">
            <span>Last Name</span>
            <input placeholder="As on your ticket" required />
          </label>
          <button className="al-btn-primary ci-quick-btn" type="submit">Start Check-in →</button>
        </form>
      </section>

      {/* Check-in window */}
      <section className="al-section al-section--sky ci-windows">
        <div className="al-container">
          <div className="al-section-header">
            <div className="al-section-eyebrow">When to Check In</div>
            <h2>Check-in Windows by Flight Type</h2>
          </div>
          <div className="al-cards al-cards--3">
            {[
              { icon: <Home size={20}/>, type: 'Domestic Flights', open: '48 hours before', close: '45 minutes before', note: 'Airport check-in opens 3 hours before. Recommended online check-in.' },
              { icon: <Globe2 size={20}/>, type: 'International Flights', open: '48 hours before', close: '2 hours before', note: 'Allow extra time for visa checks and security at international departures.' },
              { icon: <Users size={20}/>, type: 'Group Bookings', open: '48 hours before', close: '3 hours before', note: '10+ passengers must check in together. Use group check-in portal or visit the airport counter.' },
            ].map((w) => (
              <div key={w.type} className="al-card">
                <div style={{ fontSize: 32, marginBottom: 12 }}>{w.icon}</div>
                <h3>{w.type}</h3>
                <div className="ci-open" style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: 'var(--al-flame)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Opens</div>
                  <div style={{ fontWeight: 700, color: 'var(--al-navy)' }}>{w.open}</div>
                </div>
                <div className="ci-close" style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: 'var(--al-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Closes</div>
                  <div style={{ fontWeight: 600, color: 'var(--al-text)' }}>{w.close}</div>
                </div>
                <p style={{ fontSize: 13 }}>{w.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="al-section ci-steps">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Step by Step</div><h2>How Online Check-in Works</h2></div>
          <div className="al-steps">
            {[
              { n: '01', icon: <KeyRound size={20}/>, t: 'Enter Details', d: 'Enter your PNR and last name, or sign in to SkyNova to see your upcoming flights.' },
              { n: '02', icon: <Armchair size={20}/>, t: 'Confirm Seat', d: 'Review your seat assignment. Change to another available seat free or for a fee depending on your fare.' },
              { n: '03', icon: <UtensilsCrossed size={20}/>, t: 'Special Requests', d: 'Add a special meal, wheelchair assistance or unaccompanied minor request if not already done.' },
              { n: '04', icon: <Smartphone size={20}/>, t: 'Get Boarding Pass', d: 'Download to your phone as a Wallet pass, save as PDF, or print. The QR code is your ticket to the gate.' },
              { n: '05', icon: <PlaneLanding size={20}/>, t: 'Head to the Airport', d: 'Carry only cabin bags? Go straight to security. Checking bags? Drop them at the bag-drop counter.' },
            ].map((s) => (
              <div key={s.n} className="al-step">
                <div className="al-step-num">{s.n}</div>
                <div className="al-step-icon">{s.icon}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile boarding pass */}
      <section className="al-section al-section--navy ci-pass">
        <div className="al-container">
          <div className="al-desc">
            <div className="al-desc-text">
              <div className="al-section-eyebrow" style={{ color: 'rgba(215,242,250,0.7)' }}>Go Paperless</div>
              <h2 style={{ color: '#fff' }}>Mobile Boarding Pass</h2>
              <p style={{ color: 'rgba(215,242,250,0.8)' }}>Add your Sanatan Airlines boarding pass to Apple Wallet or Google Pay for the most convenient boarding experience. The pass updates automatically with any gate changes or flight delay information.</p>
              <ul className="ci-pass-list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
                {['Works at all Sanatan Airlines gates across India', 'Auto-updates with real-time gate changes', 'Shows baggage claim carousel on arrival', 'Compatible with all modern smartphones'].map(t => (
                  <li key={t} style={{ display: 'flex', gap: 10, fontSize: 15, color: 'rgba(215,242,250,0.8)' }}><span style={{ color: 'var(--al-flame)' }}>✓</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="al-desc-img">
              <div className="ci-phone" role="img" aria-label="Illustration of a mobile boarding pass on a phone"><span className="ci-phone-pass" /><span className="ci-phone-qr" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Group check-in */}
      <section className="al-section ci-group">
        <div className="al-container">
          <div className="al-section-header"><h2>Group Check-in</h2></div>
          <div className="al-two-col">
            <div>
              <p style={{ fontSize: 15, color: 'var(--al-muted)', lineHeight: 1.75, marginBottom: 20 }}>Travelling with 10 or more passengers? Our group check-in service ensures everyone in your party boards together smoothly. The group leader can check in all passengers simultaneously using the group PNR.</p>
              <ul className="al-list">
                <li>All passengers check in with a single group PNR</li>
                <li>Seat assignments can be pre-requested to keep groups together</li>
                <li>Dedicated group bag-drop lanes at all Sanatan Airlines hubs</li>
                <li>Group leader receives all boarding passes in one download</li>
              </ul>
            </div>
            <div className="al-form-wrap" style={{ padding: 32, boxShadow: 'none', border: '1.5px solid var(--al-line)' }}>
              <h2 style={{ fontSize: 20, marginBottom: 8 }}>Group Check-in Support</h2>
              <p style={{ fontSize: 14, marginBottom: 24 }}>Contact our group desk for pre-flight coordination.</p>
              <form className="al-form" style={{ gridTemplateColumns: '1fr' }} onSubmit={e => e.preventDefault()}>
                <div className="al-form-group"><label>Group PNR</label><input placeholder="e.g. GRP8821" required /></div>
                <div className="al-form-group"><label>Group Leader Last Name</label><input required /></div>
                <div className="al-form-group"><label>No. of Passengers</label><input type="number" min={10} placeholder="10+" /></div>
                <div className="al-form-actions"><button className="al-btn-primary" type="submit">Check In Group →</button></div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="al-section al-section--light ci-gallery">
        <div className="al-container">
          <div className="al-gallery">
            <div className="al-gallery-img"><img src="/images/sa-insight-education.jpg" alt="Traveller walking through a bright airport terminal" /></div>
            <div className="al-gallery-img"><img src="/images/sa-about-family.jpg" alt="A family walking through a lounge towards their aircraft" /></div>
            <div className="al-gallery-img"><img src="/images/sa-jet-tarmac.jpg" alt="Aircraft on the tarmac at golden hour, ready for boarding" /></div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>Check-in FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['What if I miss the online check-in deadline?', 'You can still check in at the airport counter. For domestic flights arrive at least 2 hours before departure; for international, at least 3 hours. Seats may be reassigned if online check-in is not completed.'],
              ['Do infants need to check in online?', 'Infants (under 2 years) travelling on a lap must check in at the airport counter, as a physical boarding pass is required. Infants with a purchased seat can be included in the online check-in.'],
              ['Can I change seats after checking in online?', 'Seat changes after check-in are possible up to 1 hour before departure through Manage Booking, subject to availability.'],
              ['Is a printed boarding pass required?', 'No — a digital boarding pass on your phone is accepted at all Sanatan Airlines gates. Some airports may require a printed pass at security: check the specific airport requirements.'],
              ['What documents do I need for international check-in?', 'You need a valid passport and any required visas or travel documents. Some routes require destination entry forms to be presented at check-in.'],
              ['What if I have checked baggage but only want to check in online?', 'Check in online to get your boarding pass, then drop your bags at the dedicated bag-drop counter when you arrive at the airport. This is faster than a full counter check-in.'],
            ].map(([q, a]) => (
              <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<ClipboardList size={20}/>, 'Manage Booking', '/airline/manage-booking'], [<PlaneTakeoff size={20}/>, 'Flight Status', '/airline/flight-status'], [<Luggage size={20}/>, 'Baggage Info', '/airline/baggage'], [<Armchair size={20}/>, 'Seat Selection', '/airline/seat-selection'], [<Accessibility size={20}/>, 'Special Assistance', '/airline/special-assistance'], [<Umbrella size={20}/>, 'Airport Lounges', '/airline/airport-lounges']].map(([icon, label, href]) => (
              <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>
            ))}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Check-in Rules:</strong> Online check-in deadlines are strictly enforced. Failure to check in within the prescribed window may result in seat reassignment or offloading. Sanatan Airlines is not liable for passengers denied boarding due to late check-in.</div>
        </div>
      </section>
    </PageLayout>
  );
}
