'use client';
import { Accessibility, Award, Briefcase, Car, Circle, ClipboardList, Diamond, Gift, Heart, Hotel, Luggage, Phone, Plane, Refrigerator, Star, Stethoscope, Syringe, Umbrella, UserCog, Wind } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';

// ============================================================
// MEDICAL CLEARANCE (Page 33)
// ============================================================
export function MedicalClearancePage() {
  return (
    <PageLayout>
      <section className="mc2-hero">
        <div className="mc2-grid">
          <div className="mc2-copy">
            <div className="mc2-status"><span/><strong>Medical Desk</strong><small>Clearance support</small></div>
            <h1>Fly with medical<br /><em>confidence.</em></h1>
            <p>One coordinated review for your health requirements, equipment and in-flight support.</p>
            <div className="mc2-actions">
              <Link href="#medical-clearance-request" className="mc2-btn mc2-btn--primary">Start clearance <span>→</span></Link>
              <Link href="#medical-clearance-services" className="mc2-btn mc2-btn--text">What needs approval</Link>
            </div>
          </div>
          <div className="mc2-file" aria-label="Medical clearance checklist preview">
            <div className="mc2-file-head"><span>MEDICAL TRAVEL</span><strong>Case 01</strong></div>
            <div className="mc2-file-body">
              <div className="mc2-file-title"><Stethoscope size={22}/><div><span>Clearance checklist</span><strong>Fit-to-fly review</strong></div></div>
              {[
                ['01', 'Medical request', 'Submitted'],
                ['02', 'Clinical evidence', 'Physician letter'],
                ['03', 'Desk review', '24-hour response'],
              ].map(([number, title, detail]) => (
                <div className="mc2-file-row" key={number}><b>{number}</b><strong>{title}</strong><small>{detail}</small></div>
              ))}
              <div className="mc2-file-seal"><span>MEDICAL DESK</span><i/></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mc2-route">
        <div className="al-container mc2-route-grid">
          {[
            ['01', 'Describe', 'Tell us the condition and assistance required'],
            ['02', 'Document', 'Submit MEDIF or fitness-to-fly evidence'],
            ['03', 'Receive', 'The Medical Desk confirms the approved arrangement'],
          ].map(([number, title, copy]) => (
            <article key={title}><b>{number}</b><div><strong>{title}</strong><p>{copy}</p></div></article>
          ))}
        </div>
      </section>

      <section className="mc2-services" id="medical-clearance-services">
        <div className="al-container">
          <div className="mc2-section-head">
            <span>Service directory</span>
            <h2>What your clearance may cover</h2>
          </div>
          <div className="mc2-service-list">
            {[
              [<ClipboardList size={20}/>, 'MEDIF form', 'Serious conditions · Submit 72 hours before departure'],
              [<Wind size={20}/>, 'Portable oxygen', 'Approved POC · Battery and medical letter required'],
              [<Stethoscope size={20}/>, 'Stretcher service', 'Passenger unable to sit upright · Widebody approval'],
              [<Syringe size={20}/>, 'Self-injection', 'Insulin or anticoagulants · Sharps disposal available'],
              [<Refrigerator size={20}/>, 'Medication storage', 'Cool-container request · 48-hour advance notice'],
              [<Heart size={20}/>, 'Recent medical event', 'Surgery or cardiac event · Fitness-to-fly evidence'],
            ].map(([icon, title, copy]) => (
              <article key={title}><div className="mc2-service-icon">{icon}</div><h3>{title}</h3><p>{copy}</p><span>Review</span></article>
            ))}
          </div>
        </div>
      </section>

      <section className="mc2-poc">
        <div className="al-container mc2-poc-grid">
          <div className="mc2-poc-mark"><Wind size={44}/><span>POC</span></div>
          <div className="mc2-poc-copy">
            <span>Equipment register</span>
            <h2>Portable oxygen concentrators</h2>
            <p>Sanatan Airlines does not provide therapeutic oxygen as a commercial service. A passenger requiring supplemental oxygen must bring an approved POC with the battery quantity confirmed before travel.</p>
          </div>
          <dl className="mc2-poc-spec">
            <div><dt>Documentation</dt><dd>Medical letter</dd></div>
            <div><dt>Equipment</dt><dd>Model + batteries</dd></div>
            <div><dt>Submission</dt><dd>72 hours ahead</dd></div>
          </dl>
        </div>
      </section>

      <section className="mc2-request" id="medical-clearance-request">
        <div className="al-container mc2-request-grid">
          <div>
            <span>Medical assistance request</span>
            <h2>Start your clearance</h2>
          </div>
          <p>Include your booking reference, condition, assistance requirement and physician fitness-to-fly letter where applicable.</p>
          <Link href="/airline/contact" className="mc2-btn mc2-btn--primary">Submit to Medical Desk <span>→</span></Link>
        </div>
      </section>

      <section className="mc2-faq">
        <div className="al-container mc2-faq-grid">
          <div className="mc2-faq-head"><span>Good to know</span><h2>Medical travel questions</h2></div>
          <div className="al-faqs">
            {[
              ['Who needs a MEDIF form?', 'A MEDIF is required if: you have been hospitalised in the past 30 days, you require medical equipment on board, you are immobile, you have a contagious illness, you have an unstable cardiac condition, or you are more than 28 weeks pregnant on an international route.'],
              ['Can I travel if I am pregnant?', 'Passengers up to 28 weeks pregnant may travel without a medical certificate. Weeks 29–36 require a doctor\'s letter. Beyond 36 weeks, travel is not permitted on most routes without prior approval from our Medical Desk.'],
              ['Is oxygen available on board without a POC?', 'Sanatan Airlines does not provide in-flight therapeutic oxygen as a commercial service. Passengers requiring supplemental oxygen must bring an approved Portable Oxygen Concentrator (POC) with pre-approved battery quantity.'],
              ['What POC models are approved?', 'We accept all FAA-approved POC models including Inogen, Respironics, AirSep and Philips models. Contact us with your specific model and battery details for confirmation.'],
              ['What is the stretcher service fee?', 'The stretcher service requires purchase of 6 Economy seats on narrowbody aircraft or 9 seats on widebody aircraft to create the stretcher space, in addition to a service fee. Contact us for a full quote.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>
      <section className="mc-related">
        <div className="al-container">
          <div className="al-related">
            {[[<Accessibility size={20}/>, 'Wheelchair Assistance', '/airline/wheelchair-assistance'], [<Accessibility size={20}/>, 'Special Assistance', '/airline/special-assistance'], [<UserCog size={20}/>, 'Senior Fares', '/airline/senior-fares'], [<ClipboardList size={20}/>, 'Manage Booking', '/airline/manage-booking'], [<Phone size={20}/>, 'Contact Us', '/airline/contact'], [<Luggage size={20}/>, 'Baggage Info', '/airline/baggage']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Medical Policy:</strong> Sanatan Airlines follows IATA Medical Manual guidelines. Final medical clearance is at the discretion of our Medical Desk. Passengers travel at their own medical risk. The airline is not liable for deterioration of medical conditions during flight.</div>
        </div>
      </section>
    </PageLayout>
  );
}

// ============================================================
// SKYNOVA REWARDS (Page 39)
// ============================================================
export function SkyNovaRewardsPage() {
  const tiers = [
    { name: 'Blue',     icon: <Circle size={18} color="#2940d6" strokeWidth={2.5}/>,  miles: 'Starting tier',          color: 'var(--al-navy)', benefits: ['Earn miles on flights', 'Members-only fares', 'Advance seat selection (fee)', 'Birthday bonus 500 miles'] },
    { name: 'Silver',   icon: <Star size={18} color="#a0a5ac" strokeWidth={2.5}/>,    miles: '25,000 tier miles/year', color: '#6b7280',         benefits: ['All Blue benefits', 'Priority check-in', 'Free standard seat selection', 'Extra 10% miles earning', 'Two complimentary lounge visits/year'] },
    { name: 'Gold',     icon: <Award size={18} color="#c0480c" strokeWidth={2.5}/>,   miles: '50,000 tier miles/year', color: '#95350c',         benefits: ['All Silver benefits', 'Unlimited lounge access', 'Complimentary upgrade bid', 'Extra 25% miles earning', 'One free extra-legroom seat/booking', 'Dedicated Gold phone line'] },
    { name: 'Platinum', icon: <Diamond size={18} color="#7f91d4" strokeWidth={2.5}/>, miles: '100,000 tier miles/year',color: '#1a1f26',         benefits: ['All Gold benefits', 'First boarding (before all classes)', 'Complimentary Business Class upgrade (subject to availability)', 'Extra 50% miles earning', 'Unlimited extra-legroom seat selection', 'Personal concierge line 24/7'] },
  ];
  return (
    <PageLayout>
      <section className="al-hero al-hero--tall">
        <div className="al-hero-bg al-airline-bg-5" />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">SkyNova Rewards</div>
          <h1>Every Mile Brings You<br />Closer to More.</h1>
          <p className="al-hero-sub">Earn SkyNova Miles on flights, hotels, dining and shopping. Redeem for free flights, upgrades, lounge access and exclusive experiences. Miles never expire.</p>
          <div className="al-hero-actions">
            <Link href="#join" className="al-btn-primary">Join SkyNova Free →</Link>
            <Link href="/airline/book-flight" className="al-btn-secondary">Earn Miles Now</Link>
          </div>
        </div>
      </section>

      <section className="al-section al-section--sky">
        <div className="al-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 24 }}>
            {[['1 Mile', 'Per ₹10 spent on flights'], ['5 Miles', 'Per ₹10 in Economy on partners'], ['50+ Miles', 'Per km flown in Business Class'], ['Zero', 'Miles expiry — ever'], ['300+', 'Partner brands to earn with'], ['25M+', 'Active SkyNova members']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center', padding: '28px 20px', background: '#fff', borderRadius: 'var(--al-radius-lg)', border: '1.5px solid var(--al-line)' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--al-navy)', marginBottom: 6 }}>{n}</div>
                <div style={{ fontSize: 13, color: 'var(--al-muted)', fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Membership Tiers</div><h2>Four Tiers. One Programme.</h2></div>
          <div className="al-tiers">
            {tiers.map(t => (
              <div key={t.name} className="al-tier">
                <div className="al-tier-head" style={{ background: t.color }}>
                  <div className="al-tier-name">{t.name}</div>
                  <div className="al-tier-icon">{t.icon}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{t.miles}</div>
                </div>
                <div className="al-tier-body">
                  <ul>{t.benefits.map(b => <li key={b}>{b}</li>)}</ul>
                  <Link href="#join" className="al-btn-primary" style={{ marginTop: 20, display: 'flex', justifyContent: 'center', fontSize: 13, padding: '10px 16px' }}>Join {t.name} →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section al-section--navy">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Redeem Your Miles</div><h2>What Can You Fly to?</h2></div>
          <div className="al-cards al-cards--3">
            {[
              { from: 'Mumbai', to: 'Delhi', cabin: 'Economy', miles: '8,000 miles' },
              { from: 'Delhi', to: 'Dubai', cabin: 'Economy', miles: '15,000 miles' },
              { from: 'Mumbai', to: 'London', cabin: 'Economy', miles: '35,000 miles' },
              { from: 'Mumbai', to: 'London', cabin: 'Business', miles: '65,000 miles' },
              { from: 'Delhi', to: 'New York', cabin: 'Business', miles: '80,000 miles' },
              { from: 'Mumbai', to: 'Sydney', cabin: 'First Class', miles: '1,10,000 miles' },
            ].map(r => (
              <div key={r.from + r.to + r.cabin} className="al-card" style={{ background: 'rgba(255,255,255,0.14)', borderColor: 'rgba(255,255,255,0.25)' }}>
                <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 8, color: '#fff' }}>{r.from} → {r.to}</div>
                <div className="al-badge" style={{ marginBottom: 8 }}>{r.cabin}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--al-flame)' }}>{r.miles}</div>
                <Link href="/airline/book-flight" className="al-btn-primary" style={{ marginTop: 16, fontSize: 13, padding: '8px 14px', display: 'flex', justifyContent: 'center' }}>Redeem →</Link>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'rgba(215,242,250,0.6)' }}>Sample redemption rates. Actual rates vary by availability and season.</p>
        </div>
      </section>

      <section className="al-section" id="join">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>Join SkyNova Rewards — Free</h2>
            <p>Become a SkyNova member in under 2 minutes. Miles begin earning on your very next flight.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>First Name</label><input required /></div>
              <div className="al-form-group"><label>Last Name</label><input required /></div>
              <div className="al-form-group"><label>Email</label><input type="email" required /></div>
              <div className="al-form-group"><label>Phone</label><input type="tel" /></div>
              <div className="al-form-group"><label>Date of Birth</label><input type="date" required /></div>
              <div className="al-form-group"><label>Nationality</label><input defaultValue="Indian" /></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Create SkyNova Account →</button></div>
            </form>
          </div>
        </div>
      </section>

      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header"><h2>SkyNova FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['Do SkyNova Miles expire?', 'No — SkyNova Miles never expire as long as your account remains active (at least one earn or redeem transaction per year). Inactive accounts may be closed after 24 months with no activity.'],
              ['Can I earn miles on partner airlines?', 'Yes — SkyNova Miles can be earned on flights with our 24 Star Alliance partner airlines. Miles rate varies by partner and class of travel.'],
              ['How long does it take for miles to appear after a flight?', 'Miles from Sanatan Airlines flights are credited within 72 hours of flight completion. Partner airline miles may take up to 6 weeks.'],
              ['Can I transfer miles to another person?', 'Miles can be transferred between SkyNova household accounts (registered family members). A transfer fee of ₹500 per 5,000 miles applies.'],
              ['What is tier qualification?', 'Tier status is based on tier miles (Tier Qualifying Miles — TQMs) earned in a calendar year. TQMs are distinct from redeemable miles and cannot be used for bookings.'],
              ['Can I pool miles with family members?', 'SkyNova households allow up to 8 members to pool their miles into a single household account for redemption. Each member still maintains their own status tier.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Umbrella size={20}/>, 'Airport Lounges', '/airline/airport-lounges'], [<Briefcase size={20}/>, 'Business Class', '/airline/business-class'], [<Gift size={20}/>, 'Gift Vouchers', '/airline/gift-vouchers'], [<Hotel size={20}/>, 'Hotel + Flight', '/airline/hotel-flight'], [<Car size={20}/>, 'Car Rental', '/airline/car-rental']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Programme Notice:</strong> SkyNova Rewards is subject to Programme Terms & Conditions. Sanatan Airlines reserves the right to amend earning rates, redemption rates and tier thresholds with 30 days' notice. Miles have no monetary value.</div>
        </div>
      </section>
    </PageLayout>
  );
}
