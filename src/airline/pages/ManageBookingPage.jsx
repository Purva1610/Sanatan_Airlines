'use client';
import { Armchair, ArrowUpCircle, CheckCircle, ClipboardList, CreditCard, Luggage, Mail, Pencil, Phone, Plane, PlaneTakeoff, Search, Shield, UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';

const MANAGE_OPTIONS = [
  { icon: <Plane size={20}/>, title: 'Change Flight', desc: 'Rebook to a different date, time or route — fees may apply based on your fare type.', href: '#change' },
  { icon: <Luggage size={20}/>, title: 'Add Baggage', desc: 'Pre-purchase extra checked bags or increase your allowance at a lower rate than at the airport.', href: '#baggage' },
  { icon: <Armchair size={20}/>, title: 'Select / Change Seat', desc: 'Choose your preferred seat, upgrade to extra legroom or move to a different cabin class.', href: '#seats' },
  { icon: <ArrowUpCircle size={20}/>, title: 'Upgrade Cabin', desc: 'Bid for a Business or First Class upgrade using SkyNova Miles or cash on eligible bookings.', href: '#upgrade' },
  { icon: <UtensilsCrossed size={20}/>, title: 'Add Special Meal', desc: 'Request a vegetarian, vegan, kosher, halal or medically appropriate meal up to 48 hours before departure.', href: '#meals' },
  { icon: <Shield size={20}/>, title: 'Add Travel Insurance', desc: 'Protect your trip with Sanatan Shield — coverage for cancellation, medical emergencies and lost baggage.', href: '/airline/travel-insurance' },
];

export default function ManageBookingPage() {
  const { t } = useI18n();
  const [pnr, setPnr] = useState('');
  const [lastName, setLastName] = useState('');
  return (
    <PageLayout>
      <section className="al-hero">
        <div className="al-hero-bg al-airline-bg-2" />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">My Booking</div>
          <h1>Manage Your<br />Booking</h1>
          <p className="al-hero-sub">Change flights, add bags, select seats, upgrade your cabin — all in one place, any time.</p>
        </div>
      </section>

      {/* Retrieve form */}
      <section className="al-section al-section--sky">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>Retrieve Your Booking</h2>
            <p>Enter your Booking Reference (PNR) and the last name of the lead passenger exactly as it appears on your ticket.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 16, alignItems: 'flex-end' }}>
              <div className="al-form-group"><label>Booking Reference (PNR)</label><input placeholder="e.g. ABC123" maxLength={8} value={pnr} onChange={e => setPnr(e.target.value.toUpperCase())} /></div>
              <div className="al-form-group"><label>Last Name</label><input placeholder="e.g. SHARMA" value={lastName} onChange={e => setLastName(e.target.value.toUpperCase())} /></div>
              <button className="al-btn-primary" style={{ alignSelf: 'flex-end' }} type="button">Find Booking →</button>
            </div>
            <p style={{ marginTop: 16, fontSize: 13, color: 'var(--al-muted)' }}>Or <Link href="#" style={{ color: 'var(--al-navy)', fontWeight: 600 }}>sign in to SkyNova</Link> to see all your upcoming and past bookings.</p>
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header">
            <div className="al-section-eyebrow">Self-Service Tools</div>
            <h2>What Would You Like to Do?</h2>
            <p className="al-section-lead">Most booking changes can be made online at no service charge. Fare differences and applicable fees still apply.</p>
          </div>
          <div className="al-cards">
            {MANAGE_OPTIONS.map((o) => (
              <div key={o.title} className="al-card">
                <div style={{ fontSize: 32, marginBottom: 12 }}>{o.icon}</div>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Step by Step</div><h2>How to Change Your Flight</h2></div>
          <div className="al-steps">
            {[
              { n: '01', icon: <Search size={20}/>, t: 'Retrieve Booking', d: 'Enter your PNR and last name or sign in to SkyNova.' },
              { n: '02', icon: <ClipboardList size={20}/>, t: 'Review Options', d: 'See available flights, fare differences and applicable change fees.' },
              { n: '03', icon: <Pencil size={20}/>, t: 'Select New Flight', d: 'Choose your preferred new departure date and time.' },
              { n: '04', icon: <CreditCard size={20}/>, t: 'Pay Difference', d: 'Pay any fare difference. Flex fares allow free changes.' },
              { n: '05', icon: <Mail size={20}/>, t: 'Receive Confirmation', d: 'Your updated itinerary is sent by email and SMS within minutes.' },
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

      {/* Images */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-gallery">
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1521791055366-0d553872952f?w=600&q=80" alt="Booking management" /></div>
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80" alt="Airport check-in" /></div>
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=600&q=80" alt="Seat selection" /></div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header"><h2>Manage Booking FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['How far in advance can I change my flight?', 'Changes can be made online up to 1 hour before departure for domestic and 2 hours for international flights. After this window, please call our Contact Centre.'],
              ['What is the change fee for my fare type?', 'Light fares: change not permitted. Classic fares: ₹2,500 domestic / ₹5,000 international. Flex fares: free changes. Business Flex: free changes with no fare difference.'],
              ['Can I add baggage after booking?', 'Yes. Pre-paid baggage purchased through Manage Booking costs significantly less than purchasing at the airport check-in counter.'],
              ['Can I add a passenger to an existing booking?', 'No — additional passengers require a separate booking. Contact our group desk if you need to link bookings.'],
              ['How do I request a name correction?', 'Minor name corrections (up to 3 characters) are permitted free of charge. Full name changes are not permitted. Contact us immediately if there is a spelling error on your ticket.'],
              ['Can I cancel and get a refund online?', 'Yes, for refundable fares. Non-refundable fares may receive travel credit valid for 12 months. The refund process takes 7–14 business days to the original payment method.'],
            ].map(([q, a]) => (
              <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<CheckCircle size={20}/>, 'Check-in Online', '/airline/check-in'], [<PlaneTakeoff size={20}/>, 'Flight Status', '/airline/flight-status'], [<Luggage size={20}/>, 'Baggage Info', '/airline/baggage'], [<Armchair size={20}/>, 'Seat Selection', '/airline/seat-selection'], [<Shield size={20}/>, 'Travel Insurance', '/airline/travel-insurance'], [<Phone size={20}/>, 'Contact Us', '/airline/contact']].map(([icon, label, href]) => (
              <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>
            ))}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Booking Changes Policy:</strong> All changes are subject to the fare rules applicable at the time of original purchase. Fare differences apply to all changes where the new fare is higher. Sanatan Airlines reserves the right to amend change and cancellation policies at any time.</div>
        </div>
      </section>
    </PageLayout>
  );
}
