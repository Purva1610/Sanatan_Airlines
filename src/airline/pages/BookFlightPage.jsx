'use client';
import { ArrowRight, ArrowRightLeft, Route, Armchair, CalendarDays, IndianRupee, Globe, Globe2, Map, RefreshCw, Smartphone, Star, Users } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';

const PRICES = [3200,3200,4500,4500,6800,5200,4100,3400,3400,4600,4600,7200,5600,4200,3100,3100,4400,4400,6600,5100,4000,3300,3300,4700,4700,7100,5500,4300];

export default function BookFlightPage() {
  const { t } = useI18n();
  const [tripType, setTripType] = useState('roundtrip');
  const [cabin, setCabin] = useState('economy');

  return (
    <PageLayout>

      {/* -- SPLIT HERO: left dark panel + right image -- */}
      <section className="bf-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 480 }}>
        {/* Left — search panel */}
        <div className="bf-hero-copy" style={{ background: 'var(--al-dark)', padding: 'clamp(32px,5vw,64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="bf-eyebrow" style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--al-flame)', marginBottom: 12 }}>Best Fares Guaranteed</div>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>Book Your<br />Perfect Flight</h1>
          <p style={{ fontSize: 15, color: 'rgba(215,242,250,0.65)', lineHeight: 1.6, maxWidth: 400 }}>Advanced search with flexible dates, fare calendar, one-click upgrades and instant confirmation.</p>
        </div>
        {/* Right — full-bleed photo */}
        <div className="bf-hero-media" style={{ position: 'relative', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=85" alt="Aircraft" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--al-dark) 0%, transparent 30%)' }} />
        </div>
      </section>

      {/* -- SEARCH TOOL — full-width elevated card -- */}
      <section className="bf-search" style={{ background: 'var(--al-bg)', padding: '0 24px 56px' }}>
        <div style={{ maxWidth: 'var(--al-container)', margin: '0 auto' }}>
          <div className="bf-search-card" style={{ background: '#fff', borderRadius: '0 0 16px 16px', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', padding: '36px 40px' }}>
            {/* Trip type tabs */}
            <div className="bf-tabs" style={{ display: 'flex', gap: 4, marginBottom: 28, borderBottom: '2px solid var(--al-line)', paddingBottom: 0 }}>
              {[['roundtrip','Round Trip'],['oneway','One Way'],['multicity','Multi-City']].map(([val, label]) => (
                <button key={val} onClick={() => setTripType(val)} className={`bf-tab${tripType === val ? ' is-active' : ''}`} style={{ padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: tripType === val ? 'var(--al-navy)' : 'var(--al-muted)', borderBottom: tripType === val ? '2px solid var(--al-navy)' : '2px solid transparent', marginBottom: -2, transition: 'all 0.15s' }}>
                  {val === 'roundtrip' ? <ArrowRightLeft size={15} /> : val === 'oneway' ? <ArrowRight size={15} /> : <Route size={15} />}
                  {label}
                </button>
              ))}
            </div>
            {/* Fields */}
            <div className="bf-fields" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))', gap: 16 }}>
              <div className="al-form-group"><label>From</label><input placeholder="Origin city or airport" /></div>
              <div className="al-form-group"><label>To</label><input placeholder="Destination" /></div>
              <div className="al-form-group"><label>Depart</label><input type="date" /></div>
              {tripType === 'roundtrip' && <div className="al-form-group"><label>Return</label><input type="date" /></div>}
              <div className="al-form-group">
                <label>Cabin Class</label>
                <select value={cabin} onChange={e => setCabin(e.target.value)}>
                  <option value="economy">Economy</option>
                  <option value="premeco">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
              <div className="al-form-group">
                <label>Passengers</label>
                <select><option>1 Adult</option><option>2 Adults</option><option>3 Adults</option><option>2 Adults, 1 Child</option></select>
              </div>
              <div className="bf-options" style={{ gridColumn: '1/-1', display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--al-text)' }}>
                  <input type="checkbox" style={{ width: 16, height: 16 }} /> Flexible dates (±3 days)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--al-text)' }}>
                  <input type="checkbox" style={{ width: 16, height: 16 }} /> Nearby airports
                </label>
                <button className="al-btn-primary" type="button" style={{ marginLeft: 'auto' }}>Search Flights →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- FARE CALENDAR -- */}
      <section className="al-section bf-calendar">
        <div className="al-container">
          <div className="bf-cal-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, alignItems: 'start' }}>
            <div>
              <div className="al-section-eyebrow">Find the Best Price</div>
              <h2 style={{ marginBottom: 16 }}>Fare Calendar</h2>
              <p style={{ fontSize: 15, color: 'var(--al-muted)', lineHeight: 1.65 }}>View the lowest available fare for every departure day over 60 days.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 24 }}>
                {[['#16a34a','Lowest fares'],['#b03f0e','Mid-range'],['#dc2626','Higher demand']].map(([c,l]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--al-muted)' }}>
                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: c, flexShrink: 0 }} />{l}
                  </div>
                ))}
              </div>
            </div>
            <div className="bf-cal-board" style={{ background: 'var(--al-bg)', borderRadius: 'var(--al-radius-lg)', padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6 }}>
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                  <div key={d} style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--al-muted)', textAlign: 'center', padding: '4px 0' }}>{d}</div>
                ))}
                {PRICES.map((price, i) => {
                  const col = price < 4000 ? '#16a34a' : price < 6000 ? '#b03f0e' : '#dc2626';
                  return (
                    <div key={i} className={`bf-day bf-day--${price < 4000 ? 'low' : price < 6000 ? 'mid' : 'high'}`} style={{ background: '#fff', borderRadius: 6, padding: '7px 4px', textAlign: 'center', border: '1.5px solid var(--al-line)', cursor: 'pointer' }}>
                      <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--al-text)' }}>{i + 1}</div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: col }}>₹{(price/1000).toFixed(1)}k</div>
                    </div>
                  );
                })}
              </div>
              <p style={{ marginTop: 16, fontSize: 12, color: 'var(--al-muted)', textAlign: 'center' }}>Sample fares. Actual prices vary by route and availability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* -- WHY BOOK DIRECT — alternating feature strip -- */}
      <section className="bf-why" style={{ background: 'var(--al-dark)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 'var(--al-container)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="bf-eyebrow" style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--al-flame)', marginBottom: 10 }}>Why Book Direct</div>
            <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: '#fff' }}>Book with Sanatan Airlines Directly</h2>
          </div>
          <div className="bf-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 2 }}>
            {[
              { icon: <IndianRupee size={22} color="var(--al-flame)"/>, title: 'Best Price Guarantee', desc: 'Find it cheaper on another channel within 24 hours? We refund the difference.' },
              { icon: <RefreshCw size={22} color="var(--al-flame)"/>, title: 'Free Changes on Flex', desc: 'Change your flight date any time before departure — no fees, no fuss.' },
              { icon: <Star size={22} color="var(--al-flame)"/>, title: 'Miles for Every Booking', desc: 'Earn SkyNova Miles on every booking when you sign in before searching.' },
              { icon: <Smartphone size={22} color="var(--al-flame)"/>, title: 'Instant Mobile Pass', desc: 'Boarding pass to Apple Wallet or Google Pay the moment you book.' },
            ].map((b, i) => (
              <div key={b.title} className="bf-why-card" style={{ padding: '32px 28px', borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
                <div className="bf-why-icon" style={{ marginBottom: 16 }}>{b.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 10 }}>{b.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(215,242,250,0.6)', lineHeight: 1.65 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- FAQs -- */}
      <section className="al-section al-section--light bf-faq">
        <div className="al-container">
          <div className="al-section-header"><h2>Booking FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['Can I book a flight for someone else?', "Yes. Enter the passenger's details (name as on passport, date of birth) during booking. Confirmation will be sent to the email address you provide."],
              ['What payment methods are accepted?', 'We accept Visa, Mastercard, American Express, RuPay, UPI, Net Banking, and SkyNova Miles (full or partial payment for eligible bookings).'],
              ['When do I receive my ticket?', "Your e-ticket is emailed within 5 minutes of a successful payment. If you don't receive it, check your spam folder or retrieve your booking with the PNR."],
              ['Is there a booking fee?', 'No booking fee for payments by UPI, Net Banking or Debit Card. A 1.8% convenience fee applies to Credit Card payments.'],
              ['Can I book a one-way international ticket?', 'Yes. One-way international tickets are fully available. Note that some countries may require proof of onward travel for visa or immigration purposes.'],
            ].map(([q, a]) => (
              <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<CalendarDays size={20}/>, 'Flexible Fares', '/airline/flexible-fares'], [<Globe size={20}/>, 'Multi-City', '/airline/multi-city'], [<Map size={20}/>, 'Round the World', '/airline/round-the-world'], [<Users size={20}/>, 'Group Travel', '/airline/group-travel'], [<Globe2 size={20}/>, 'Destinations', '/airline/destinations'], [<Armchair size={20}/>, 'Seat Selection', '/airline/seat-selection']].map(([icon, label, href]) => (
              <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>
            ))}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Booking Conditions:</strong> All bookings are subject to Sanatan Airlines' Conditions of Carriage and applicable fare rules. Fares are inclusive of applicable taxes unless stated otherwise. Final price is confirmed at checkout.</div>
        </div>
      </section>
    </PageLayout>
  );
}
