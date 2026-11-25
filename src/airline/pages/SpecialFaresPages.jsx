'use client';
import { Accessibility, BarChart2, BookOpen, Briefcase, CalendarDays, CheckCircle, ClipboardList, CreditCard, Globe2, GraduationCap, HeartPulse, Luggage, Mail, Medal, Phone, Plane, Trophy, Umbrella, UserCheck, Users, UserCog } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';

// ============================================================
// CORPORATE TRAVEL (Page 15)
// ============================================================
export function CorporateTravelPage() {
  return (
    <PageLayout>
      <section className="al-hero">
        <div className="al-hero-bg al-airline-bg-2" />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">Business Partnerships</div>
          <h1>Corporate Travel<br />That Works for You.</h1>
          <p className="al-hero-sub">Negotiated fares, real-time management tools, dedicated account managers and reporting that makes your CFO happy.</p>
          <div className="al-hero-actions">
            <Link href="#corp-form" className="al-btn-primary">Enquire for Your Company →</Link>
            <Link href="/airline/business-class" className="al-btn-secondary">Business Class</Link>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-desc">
            <div className="al-desc-text">
              <h2>The Sanatan Corporate Programme</h2>
              <p>Sanatan Airlines Corporate Travel Programme (CTP) is designed for companies with annual air travel spend exceeding ₹25 lakhs. CTP members receive negotiated fares across all cabin classes, centralised billing, real-time booking and reporting tools, and a named account manager who understands your company's travel policy.</p>
              <p>Our programme integrates with all major Global Distribution Systems (GDS) including Amadeus, Sabre and Travelport, as well as direct API access for companies with their own travel booking platform.</p>
              <ul className="al-list" style={{ marginTop: 20 }}>
                <li>Exclusive negotiated fares on all major routes</li>
                <li>Centralised billing with detailed cost-centre reporting</li>
                <li>Dedicated 24/7 emergency helpline for travellers</li>
                <li>Waived change fees on Business Flex fares</li>
                <li>Priority seat upgrades for top-spend employees</li>
                <li>Annual Travel Review with your account manager</li>
              </ul>
            </div>
            <div className="al-desc-img">
              <img src="/images/club-lounge.jpg" alt="Aircraft wing above pink clouds at dawn" />
            </div>
          </div>
        </div>
      </section>

      <section className="al-section al-section--sky">
        <div className="al-container">
          <div className="al-section-header"><h2>Reporting & Management Tools</h2></div>
          <div className="al-cards al-cards--3">
            {[
              { icon: <BarChart2 size={20}/>, t: 'Real-Time Dashboard', d: 'View all bookings, spend and upcoming travel across your organisation in one dashboard.' },
              { icon: <CreditCard size={20}/>, t: 'Central Billing', d: 'All bookings billed to a single corporate account with 30-day payment terms.' },
              { icon: <ClipboardList size={20}/>, t: 'Policy Compliance', d: 'Set travel policy rules — cabin caps, advance booking windows, approval workflows — enforced at booking.' },
              { icon: <Mail size={20}/>, t: 'Automated Reporting', d: 'Weekly and monthly reports delivered to your travel manager and finance team by email.' },
              { icon: <Globe2 size={20}/>, t: 'GDS Integration', d: 'Full GDS and direct API integration for TMC and in-house booking tools.' },
              { icon: <UserCheck size={20}/>, t: 'Named Account Manager', d: 'A dedicated account manager who knows your company, your routes and your travellers.' },
            ].map((b) => <div key={b.t} className="al-card"><div style={{ fontSize: 32, marginBottom: 12 }}>{b.icon}</div><h3>{b.t}</h3><p>{b.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="al-section" id="corp-form">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>Corporate Programme Enquiry</h2>
            <p>Complete the form below and your dedicated account manager will contact you within one business day.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Contact Name</label><input required /></div>
              <div className="al-form-group"><label>Job Title</label><input /></div>
              <div className="al-form-group"><label>Company Name</label><input required /></div>
              <div className="al-form-group"><label>Company Size</label><select><option>50–200 employees</option><option>200–500 employees</option><option>500–2,000 employees</option><option>2,000+ employees</option></select></div>
              <div className="al-form-group"><label>Email</label><input type="email" required /></div>
              <div className="al-form-group"><label>Phone</label><input type="tel" /></div>
              <div className="al-form-group"><label>Annual Air Travel Spend (approx)</label><select><option>₹25L–₹1Cr</option><option>₹1Cr–₹5Cr</option><option>₹5Cr–₹25Cr</option><option>₹25Cr+</option></select></div>
              <div className="al-form-group"><label>Primary Routes</label><input placeholder="e.g. Mumbai–Delhi, Mumbai–Singapore" /></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Request Consultation →</button></div>
            </form>
          </div>
        </div>
      </section>

      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header"><h2>Corporate Travel FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['What is the minimum spend for the Corporate Programme?', 'The CTP is available for companies with annual Sanatan Airlines spend of ₹25 lakhs or more. Smaller companies may be eligible for our SME programme with a spend of ₹5–25 lakhs.'],
              ['Can employees book directly or only through a TMC?', 'Both options are available. Employees can book directly on the Sanatan Airlines website using the company\'s corporate code, or through a nominated Travel Management Company.'],
              ['How are negotiated fares applied?', 'Once a corporate agreement is in place, your corporate code is applied at booking to unlock negotiated fares automatically.'],
              ['Can different departments have separate reporting?', 'Yes — cost-centre coding allows spend to be tracked and reported by department, project or individual.'],
              ['What SkyNova Miles benefits do corporate travellers get?', 'Corporate travellers earn personal SkyNova Miles on corporate-booked tickets. Miles accrue to the individual, not the company account.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="ct-explore" style={{ background: 'var(--al-navy)', padding: '48px 0 40px' }}>
        <div className="al-container">
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <span className="ct-explore-label" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(215,242,250,0.6)', textTransform: 'uppercase' }}>Explore More</span>
          </div>
          <div className="ct-explore-links" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 36 }}>
            {[
              [<Users size={18}/>, 'Group Travel', '/airline/group-travel'],
              [<Briefcase size={18}/>, 'Business Class', '/airline/business-class'],
              [<Umbrella size={18}/>, 'Airport Lounges', '/airline/airport-lounges'],
              [<Trophy size={18}/>, 'SkyNova Rewards', '/airline/skynova-rewards'],
              [<Plane size={18}/>, 'Book a Flight', '/airline/book-flight'],
              [<Phone size={18}/>, 'Contact Us', '/airline/contact'],
            ].map(([icon, label, href]) => (
              <Link key={href} href={href} className="ct-explore-link" style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 10, padding: '10px 20px',
                color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 600,
                transition: 'background 0.15s',
              }}
              onMouseOver={e => e.currentTarget.style.background='rgba(255,255,255,0.16)'}
              onMouseOut={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
              >
                <span className="ct-explore-icon" style={{ color: '#fff', display: 'flex' }}>{icon}</span>
                {label}
              </Link>
            ))}
          </div>
          <div className="ct-terms" style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            borderLeft: '4px solid var(--al-flame)', borderRadius: 8,
            padding: '16px 20px', fontSize: 13, color: 'rgba(215,242,250,0.75)', lineHeight: 1.6,
          }}>
            <strong style={{ color: '#fff' }}>Corporate Terms:</strong> Corporate programme agreements are subject to Sanatan Airlines Corporate Travel Agreement terms. Negotiated fares are confidential and not available to the public.
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

// ============================================================
// STUDENT FARES (Page 16)
// ============================================================
export function StudentFaresPage() {
  return (
    <PageLayout>
      <section className="al-hero">
        <div className="al-hero-bg al-airline-bg-3" />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">For Young Travellers</div>
          <h1>Student Fares —<br />More Baggage, Less Cost.</h1>
          <p className="al-hero-sub">Exclusive fares with 10 kg extra baggage, flexible change policies and priority standby for verified full-time students under 32.</p>
          <div className="al-hero-actions">
            <Link href="/airline/book-flight" className="al-btn-primary">Search Student Fares →</Link>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-desc">
            <div className="al-desc-text">
              <h2>Who Qualifies for Student Fares?</h2>
              <p>Sanatan Airlines Student Fares are available to full-time students enrolled at a recognised educational institution, aged 12–32. The fare includes 10 kg of extra checked baggage beyond your standard allowance, one free date change, and priority standby on overbooked flights.</p>
              <p>Student fares are available year-round on all domestic and international routes — with the biggest savings on routes to popular study destinations including the UK, USA, Canada, Australia, Singapore and Germany.</p>
              <ul className="al-list" style={{ marginTop: 20 }}>
                <li>Extra 10 kg checked baggage (portable equipment, books)</li>
                <li>One free date change per booking (fare difference applies)</li>
                <li>Priority standby on overbooked flights</li>
                <li>Earn full SkyNova Miles on student fares</li>
                <li>Valid for travel up to 12 months ahead</li>
              </ul>
            </div>
            <div className="al-desc-img">
              <img src="/images/sa-insight-education.jpg" alt="A young student with a backpack walking through an airport terminal" />
            </div>
          </div>
        </div>
      </section>

      <section className="al-section al-section--sky">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Required Documents</div><h2>How to Prove Student Status</h2></div>
          <div className="al-steps">
            {[
              { n: '01', icon: <BookOpen size={20}/>, t: 'Book the Fare', d: 'Select "Student" fare type during search. Provide your institution name and course details.' },
              { n: '02', icon: <ClipboardList size={20}/>, t: 'Upload Proof', d: 'Upload a valid student ID card or enrollment certificate during booking. Issued within the past 12 months.' },
              { n: '03', icon: <CheckCircle size={20}/>, t: 'Verification', d: 'Our team verifies the document within 4 hours. You receive a confirmation email once verified.' },
              { n: '04', icon: <Plane size={20}/>, t: 'Carry at Travel', d: 'Carry your student ID at the airport. It may be checked at check-in or boarding.' },
            ].map((s) => <div key={s.n} className="al-step"><div className="al-step-num">{s.n}</div><div className="al-step-icon">{s.icon}</div><h3>{s.t}</h3><p>{s.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>Student Fare Enquiry</h2>
            <p>Not sure if your institution qualifies? Ask us — we recognise universities and colleges worldwide.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Full Name</label><input required /></div>
              <div className="al-form-group"><label>Age</label><input type="number" min={12} max={32} /></div>
              <div className="al-form-group"><label>Institution Name</label><input required /></div>
              <div className="al-form-group"><label>Course / Programme</label><input /></div>
              <div className="al-form-group"><label>Email</label><input type="email" required /></div>
              <div className="al-form-group"><label>Route Required</label><input placeholder="e.g. Mumbai to London" /></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Check Student Eligibility →</button></div>
            </form>
          </div>
        </div>
      </section>

      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header"><h2>Student Fare FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['Can I book a student fare for a future semester start?', 'Yes — student fares can be booked up to 12 months in advance. Your student status will be verified at the time of booking.'],
              ['What if I graduate before my travel date?', 'If you graduate before the travel date and your student status can no longer be verified, the fare difference to the standard fare will be charged at check-in.'],
              ['Are student fares available for all cabins?', 'Student fares are available for Economy Class only. Students wishing to travel in Business or First Class must book standard fares.'],
              ['Can I travel with a companion on the student fare?', 'No — the student fare is for the named student only. Companions must book separately on standard fares.'],
              ['What is the extra baggage allowance for students?', 'Students get 10 kg of extra checked baggage beyond their normal cabin-class allowance — perfect for carrying laptops, books and personal belongings at the start and end of each semester.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<CalendarDays size={20}/>, 'Flexible Fares', '/airline/flexible-fares'], [<Luggage size={20}/>, 'Baggage Info', '/airline/baggage'], [<Trophy size={20}/>, 'SkyNova Rewards', '/airline/skynova-rewards'], [<UserCog size={20}/>, 'Senior Fares', '/airline/senior-fares'], [<Globe2 size={20}/>, 'Destinations', '/airline/destinations']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Student Fare Conditions:</strong> Student fares are non-transferable. Misrepresentation of student status will result in collection of the full fare difference plus an administrative fee. Verification documents must be valid at the time of travel.</div>
        </div>
      </section>
    </PageLayout>
  );
}

// ============================================================
// SENIOR CITIZEN FARES (Page 17)
// ============================================================
export function SeniorFaresPage() {
  return (
    <PageLayout>
      <section className="al-hero">
        <div className="al-hero-bg al-airline-bg-1" />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">Golden Age Travel</div>
          <h1>Senior Citizen Fares —<br />Comfort First.</h1>
          <p className="al-hero-sub">Exclusive discounts for travellers aged 60 and above, with priority boarding, aisle seating and dedicated assistance at every step.</p>
          <div className="al-hero-actions">
            <Link href="/airline/book-flight" className="al-btn-primary">Book Senior Fare →</Link>
            <Link href="/airline/special-assistance" className="al-btn-secondary">Special Assistance</Link>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-desc">
            <div className="al-desc-text">
              <h2>Comfort and Savings for Senior Travellers</h2>
              <p>Sanatan Airlines offers a 10% discount on published Economy fares for passengers aged 60 and above on all domestic routes, and 7.5% on international routes. The discount is applied automatically when you enter your date of birth during the booking process.</p>
              <p>Senior travellers also receive complimentary aisle seat selection (worth ₹500–₹1,500 per sector), priority boarding, and are automatically registered for Special Assistance services including wheelchair assistance on request.</p>
              <ul className="al-list" style={{ marginTop: 20 }}>
                <li>10% discount on domestic Economy fares (60+ years)</li>
                <li>7.5% discount on international Economy fares</li>
                <li>Free aisle seat selection on all flights</li>
                <li>Priority boarding — board before other Economy passengers</li>
                <li>Portable medical equipment (CPAP, nebuliser) carried free</li>
                <li>Companion assistance check-in service</li>
              </ul>
            </div>
            <div className="al-desc-img">
              <img src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&q=80" alt="Senior traveller at airport" />
            </div>
          </div>
        </div>
      </section>

      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>Senior Fare Booking Assistance</h2>
            <p>Need help booking a senior fare or arranging assistance? Our team is happy to assist.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Passenger Name</label><input required /></div>
              <div className="al-form-group"><label>Date of Birth</label><input type="date" /></div>
              <div className="al-form-group"><label>Contact Person (if different)</label><input /></div>
              <div className="al-form-group"><label>Phone</label><input type="tel" required /></div>
              <div className="al-form-group"><label>Origin</label><input placeholder="City or airport" /></div>
              <div className="al-form-group"><label>Destination</label><input placeholder="City or airport" /></div>
              <div className="al-form-group"><label>Travel Date</label><input type="date" /></div>
              <div className="al-form-group"><label>Assistance Required</label><select><option>No assistance needed</option><option>Wheelchair at airport</option><option>Meet & assist service</option><option>Onboard wheelchair</option><option>Medical equipment</option></select></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Book Senior Fare →</button></div>
            </form>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>Senior Fare FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['What age qualifies for the senior discount?', 'Passengers aged 60 years or above on the date of travel qualify for the senior citizen discount. Valid proof of age (Aadhaar, passport) is required at check-in.'],
              ['Is the discount available for Business and First Class?', 'Currently the senior citizen discount applies to Economy Class only on domestic routes. Business and First Class travel is available at standard published fares.'],
              ['Can I travel alone if I need a wheelchair?', 'Yes. Wheelchair assistance is available throughout the airport at no charge. Our Meet & Assist team will accompany you from arrival to the gate. Inform us at least 48 hours before departure.'],
              ['What medical equipment can I carry?', 'CPAP machines, nebulisers and manual wheelchairs are carried free in addition to your baggage allowance. Portable Oxygen Concentrators (POCs) must be pre-approved at least 72 hours before departure.'],
              ['Is the discount valid for round trips?', 'Yes — the senior citizen discount applies to both legs of a round trip and to each leg of a multi-city booking.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<Accessibility size={20}/>, 'Special Assistance', '/airline/special-assistance'], [<GraduationCap size={20}/>, 'Student Fares', '/airline/student-fares'], [<Medal size={20}/>, 'Military Discounts', '/airline/military-fares'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Luggage size={20}/>, 'Baggage Info', '/airline/baggage'], [<HeartPulse size={20}/>, 'Medical Clearance', '/airline/medical-clearance']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Senior Fare Terms:</strong> Senior citizen discounts are subject to availability and cannot be combined with other promotional fares. Proof of age must be presented at check-in. The discount is applied to the base fare only, excluding taxes and surcharges.</div>
        </div>
      </section>
    </PageLayout>
  );
}

// ============================================================
// MILITARY FARES (Page 18)
// ============================================================
export function MilitaryFaresPage() {
  return (
    <PageLayout>
      <section className="al-hero">
        <div className="al-hero-bg al-airline-bg-4" />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">Serving Those Who Serve</div>
          <h1>Military & Armed Forces<br />Discounts.</h1>
          <p className="al-hero-sub">Sanatan Airlines honours the service of India's armed forces with exclusive fares, priority boarding and dedicated check-in counters at all major airports.</p>
          <div className="al-hero-actions">
            <Link href="/airline/book-flight" className="al-btn-primary">Search Military Fares →</Link>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-desc">
            <div className="al-desc-text">
              <h2>Who Is Eligible?</h2>
              <p>Sanatan Airlines Military Fare is available to serving and retired personnel of the Indian Army, Navy and Air Force, the CRPF, BSF, CISF, NSG and other Central Armed Police Forces. Family members of active-duty personnel travelling with or on behalf of the service member may also qualify.</p>
              <p>Eligible personnel receive a 15% discount on Economy fares on all domestic routes, free extra baggage of 10 kg, and dedicated check-in counters at Mumbai, Delhi, Chennai and Bengaluru airports.</p>
              <ul className="al-list" style={{ marginTop: 20 }}>
                <li>15% discount on published domestic Economy fares</li>
                <li>10 kg extra checked baggage (all fares)</li>
                <li>Priority boarding on all flights</li>
                <li>Dedicated armed forces check-in counters at hub airports</li>
                <li>No change fees for travel due to official posting orders</li>
              </ul>
            </div>
            <div className="al-desc-img">
              <img src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&q=80" alt="Armed forces service" />
            </div>
          </div>
        </div>
      </section>

      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>Military Fare Booking</h2>
            <p>Book your military fare online. Valid service ID required at check-in.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Full Name (as on Service ID)</label><input required /></div>
              <div className="al-form-group"><label>Service Number</label><input required /></div>
              <div className="al-form-group"><label>Branch of Service</label><select><option>Indian Army</option><option>Indian Navy</option><option>Indian Air Force</option><option>CRPF</option><option>BSF</option><option>CISF</option><option>NSG</option><option>Retired (specify branch)</option></select></div>
              <div className="al-form-group"><label>Rank</label><input /></div>
              <div className="al-form-group"><label>Email</label><input type="email" required /></div>
              <div className="al-form-group"><label>Phone</label><input type="tel" /></div>
              <div className="al-form-group"><label>Origin</label><input required /></div>
              <div className="al-form-group"><label>Destination</label><input required /></div>
              <div className="al-form-group"><label>Travel Date</label><input type="date" /></div>
              <div className="al-form-group"><label>Travel Reason</label><select><option>Personal / Leave</option><option>Official duty (with posting orders)</option><option>Medical</option></select></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Book Military Fare →</button></div>
            </form>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>Military Fare FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['What ID is required at check-in?', 'Serving personnel must present a valid Military ID card. Retired personnel must present their Retirement / Pension ID. Family members must present a copy of the service member\'s ID along with their own proof of relationship.'],
              ['Is the military fare available for international routes?', 'Currently the military discount applies to domestic routes only. International travel is booked at standard published fares.'],
              ['What if I am called back from leave due to an emergency?', 'Personnel cancelled from leave due to official orders may cancel their booking and receive a full refund. Present official cancellation orders at check-in or to our Contact Centre.'],
              ['Are dependants eligible for the discount?', 'Spouse and dependent children travelling on the same booking as the service member receive the same 15% discount and extra baggage allowance.'],
              ['Is priority boarding available at all airports?', 'Priority boarding for armed forces personnel is available at all Sanatan Airlines operated airports. Dedicated counters are available at Mumbai, Delhi, Chennai and Bengaluru.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<GraduationCap size={20}/>, 'Student Fares', '/airline/student-fares'], [<UserCog size={20}/>, 'Senior Fares', '/airline/senior-fares'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Luggage size={20}/>, 'Baggage Info', '/airline/baggage'], [<Accessibility size={20}/>, 'Special Assistance', '/airline/special-assistance'], [<Phone size={20}/>, 'Contact Us', '/airline/contact']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Military Fare Conditions:</strong> The military fare is a domestic-only fare subject to DGCA rules on concessional fares. Valid identity and service documentation is mandatory. Misuse of the military fare will result in collection of the full fare difference and may be reported to relevant authorities.</div>
        </div>
      </section>
    </PageLayout>
  );
}
