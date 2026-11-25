'use client';
import { Accessibility, Baby, BaggageClaim, BatteryCharging, CheckCircle, ClipboardList, GraduationCap, HeartPulse, Luggage, Package, PawPrint, PersonStanding, Phone, Plane, ShieldCheck, UserCheck, UserCog } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';

function SimplePage({ hero, sections }) {
  return (
    <PageLayout>
      <section className="al-hero">
        <div className="al-hero-bg" style={{ backgroundImage: `url(${hero.img})` }} />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">{hero.eyebrow}</div>
          <h1>{hero.title}</h1>
          <p className="al-hero-sub">{hero.sub}</p>
          <div className="al-hero-actions">
            {hero.ctas.map(([label, href, type]) => <Link key={href} href={href} className={type === 'primary' ? 'al-btn-primary' : 'al-btn-secondary'}>{label}</Link>)}
          </div>
        </div>
      </section>
      {sections.map((section, i) => {
        if (section.type === 'desc') return (
          <section key={i} className={`al-section${section.bg ? ` al-section--${section.bg}` : ''}`}>
            <div className="al-container">
              <div className={`al-desc${section.reverse ? ' al-desc--reverse' : ''}`}>
                <div className="al-desc-text">
                  <h2>{section.title}</h2>
                  {section.paras.map((p, j) => <p key={j}>{p}</p>)}
                  {section.bullets && <ul className="al-list" style={{ marginTop: 16 }}>{section.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                </div>
                <div className="al-desc-img"><img src={section.img} alt={section.title} /></div>
              </div>
            </div>
          </section>
        );
        if (section.type === 'cards') return (
          <section key={i} className={`al-section${section.bg ? ` al-section--${section.bg}` : ''}`}>
            <div className="al-container">
              <div className="al-section-header"><div className="al-section-eyebrow">{section.eyebrow}</div><h2>{section.title}</h2>{section.lead && <p className="al-section-lead">{section.lead}</p>}</div>
              <div className="al-cards al-cards--3">{section.cards.map((c) => <div key={c.title} className="al-card"><div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div><h3>{c.title}</h3><p>{c.desc}</p></div>)}</div>
            </div>
          </section>
        );
        if (section.type === 'steps') return (
          <section key={i} className={`al-section${section.bg ? ` al-section--${section.bg}` : ''}`}>
            <div className="al-container">
              <div className="al-section-header"><div className="al-section-eyebrow">Step by Step</div><h2>{section.title}</h2></div>
              <div className="al-steps">{section.steps.map((s) => <div key={s.n} className="al-step"><div className="al-step-num">{s.n}</div><div className="al-step-icon">{s.icon}</div><h3>{s.t}</h3><p>{s.d}</p></div>)}</div>
            </div>
          </section>
        );
        if (section.type === 'form') return (
          <section key={i} className={`al-section${section.bg ? ` al-section--${section.bg}` : ''}`}>
            <div className="al-container">
              <div className="al-form-wrap">
                <h2>{section.title}</h2>
                <p>{section.lead}</p>
                <form className="al-form" onSubmit={e => e.preventDefault()}>
                  {section.fields.map((f) => (
                    <div key={f.name} className={`al-form-group${f.full ? ' full' : ''}`}>
                      <label>{f.label}</label>
                      {f.type === 'select' ? <select>{f.options.map(o => <option key={o}>{o}</option>)}</select> : f.type === 'textarea' ? <textarea required={f.required} placeholder={f.placeholder} /> : <input type={f.type || 'text'} required={f.required} placeholder={f.placeholder} />}
                    </div>
                  ))}
                  <div className="al-form-actions"><button className="al-btn-primary" type="submit">{section.submit}</button></div>
                </form>
              </div>
            </div>
          </section>
        );
        if (section.type === 'gallery') return (
          <section key={i} className={`al-section${section.bg ? ` al-section--${section.bg}` : ''}`}>
            <div className="al-container">
              <div className="al-gallery">{section.images.map((img, j) => <div key={j} className="al-gallery-img"><img src={img.src} alt={img.alt} /></div>)}</div>
            </div>
          </section>
        );
        if (section.type === 'faqs') return (
          <section key={i} className={`al-section${section.bg ? ` al-section--${section.bg}` : ''}`}>
            <div className="al-container">
              <div className="al-section-header"><h2>{section.title || 'Frequently Asked Questions'}</h2></div>
              <div className="al-faqs">{section.faqs.map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}</div>
            </div>
          </section>
        );
        if (section.type === 'related') return (
          <section key={i} className="al-section" style={{ paddingTop: 0 }}>
            <div className="al-container">
              <div className="al-related">{section.links.map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}</div>
              <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>{section.disclaimerTitle}:</strong> {section.disclaimerText}</div>
            </div>
          </section>
        );
        return null;
      })}
    </PageLayout>
  );
}

export function UnaccompaniedMinorsPage() {
  return <SimplePage
    hero={{ eyebrow: 'Young Travellers', title: 'Unaccompanied Minors —\nFlying Safely Solo.', sub: 'Sanatan Airlines\' dedicated UMNR service ensures children travelling alone are cared for every step of the way.', img: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1600&q=80', ctas: [['Request UMNR Service →', '#umnr-form', 'primary'], ['Special Assistance', '/airline/special-assistance', 'secondary']] }}
    sections={[
      { type: 'desc', title: 'The UMNR Service', paras: ['Sanatan Airlines offers an Unaccompanied Minor (UMNR) service for children aged 5–14 travelling without a parent or guardian on Sanatan Airlines operated flights. The service includes a dedicated escort from check-in through the flight and all the way to the responsible adult at the destination.', 'Children aged 5–8 can only be escorted on direct (non-stop) flights. Children aged 9–14 may travel on flights with one connection, provided the connection is at a Sanatan Airlines hub airport with minimum 2 hours connection time.'], bullets: ['Dedicated escort from departure to arrival', 'Meal and entertainment taken care of throughout', 'Responsible adult must be present for handover at destination', 'Boarding priority ahead of all other passengers', 'Service available on domestic routes and selected international routes'], img: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80' },
      { type: 'cards', eyebrow: 'Age Groups', title: 'UMNR Service by Age', cards: [{ icon: <Baby size={20}/>, title: 'Ages 5–7 (Escorted)', desc: 'Full escort required. Direct flights only. Ground staff provides direct handover to responsible adult. Fee: ₹2,500 per sector.' }, { icon: <GraduationCap size={20}/>, title: 'Ages 8–11 (Supervised)', desc: 'Escort at the airport; crew supervisory watch on board. Direct flights only. Fee: ₹2,000 per sector.' }, { icon: <UserCheck size={20}/>, title: 'Ages 12–14 (Assisted)', desc: 'Assisted service with escort at key touchpoints. One connection permitted at Sanatan hub airports. Fee: ₹1,500 per sector.' }] },
      { type: 'form', bg: 'light', title: 'UMNR Service Request', lead: 'Complete this form to register an unaccompanied minor service. Required documents: birth certificate copy, photo ID of escorting adult at origin and responsible adult at destination.', fields: [{ name: 'child', label: "Child's Full Name", required: true }, { name: 'dob', label: 'Date of Birth', type: 'date', required: true }, { name: 'booking', label: 'Booking Reference', required: true }, { name: 'route', label: 'Route', placeholder: 'e.g. Mumbai to Delhi' }, { name: 'escort', label: 'Escorting Adult at Origin', required: true }, { name: 'escort_phone', label: 'Escorting Adult Phone', type: 'tel', required: true }, { name: 'receiver', label: 'Responsible Adult at Destination', required: true }, { name: 'receiver_phone', label: 'Destination Adult Phone', type: 'tel', required: true }, { name: 'notes', label: 'Special Requirements', type: 'textarea', full: true, placeholder: 'Allergies, medical conditions, language preference...' }], submit: 'Submit UMNR Request →' },
      { type: 'faqs', faqs: [['What documentation is required?', "A completed UMNR form, birth certificate copy, and valid photo ID of both escorting adult (origin) and responsible adult (destination) are required at check-in."], ['What age can a child fly alone without the UMNR service?', "Children aged 15 and above may travel alone without the UMNR service. We still recommend informing the airline for children aged 15–17 so crew can be aware."], ['Is there a fee for the UMNR service?', "Yes — fees range from ₹1,500 to ₹2,500 per sector depending on the child's age group. The fee is non-refundable once the service is confirmed."], ['What if the responsible adult at destination cannot be found?', "The child will not be released from our care. We will contact all provided emergency numbers and, if unsuccessful, hold the child in the care of airport welfare services until a responsible adult is confirmed."]] },
      { type: 'related', links: [[<Accessibility size={20}/>, 'Special Assistance', '/airline/special-assistance'], [<PawPrint size={20}/>, 'Pet Travel', '/airline/pet-travel'], [<ClipboardList size={20}/>, 'Manage Booking', '/airline/manage-booking'], [<CheckCircle size={20}/>, 'Check-in Online', '/airline/check-in'], [<Luggage size={20}/>, 'Baggage Info', '/airline/baggage'], [<Phone size={20}/>, 'Contact Us', '/airline/contact']], disclaimerTitle: 'UMNR Policy', disclaimerText: "UMNR service is not available on ATR turboprop aircraft. The service must be pre-booked at least 48 hours before departure. Walk-up UMNR requests at the airport may not be accommodated." }
    ]}
  />;
}

export function PetTravelPage() {
  return (
    <PageLayout>
      <section className="pt-hero">
        <div className="pt-hero-copy">
          <div className="pt-eyebrow">Family belongs together</div>
          <h1>Travelling with<br /><em>your pet.</em></h1>
          <p>From the first check-in to the final hello, thoughtful guidance for cats, small dogs and registered assistance dogs.</p>
          <div className="pt-hero-actions">
            <Link href="#pet-check" className="pt-btn pt-btn--sage">Check pet eligibility <span>→</span></Link>
            <Link href="/airline/live-animals-cargo" className="pt-btn pt-btn--line">View cargo policy</Link>
          </div>
          <div className="pt-hero-note"><PawPrint size={17}/><span>Prior approval is required for every travelling pet.</span></div>
        </div>
        <figure className="pt-hero-media">
          <img src="https://images.unsplash.com/photo-1558788353-f76d92427f16?w=1200&q=85" alt="A happy dog prepared for a journey" />
          <figcaption><span>Travel option</span><strong>Cabin · Hold · Assistance</strong></figcaption>
        </figure>
      </section>

      <section className="pt-options" id="pet-check">
        <div className="al-container">
          <div className="pt-section-head"><span className="pt-kicker">Choose the right journey</span><h2>Three ways to travel</h2></div>
          <div className="pt-option-grid">
            <article className="pt-option-card">
              <span className="pt-option-number">01</span><PawPrint size={28}/><h3>In the cabin</h3>
              <p>Cats and small dogs may travel with you on eligible domestic flights.</p>
              <dl><div><dt>Pet + carrier</dt><dd>Up to 8 kg</dd></div><div><dt>Fee</dt><dd>₹2,500 / sector</dd></div><div><dt>Carrier</dt><dd>Under the seat</dd></div></dl>
            </article>
            <article className="pt-option-card">
              <span className="pt-option-number">02</span><Package size={28}/><h3>In the hold</h3>
              <p>Pet and carrier travel in a pressurised, temperature-controlled hold.</p>
              <dl><div><dt>Pet + carrier</dt><dd>Up to 32 kg</dd></div><div><dt>Routes</dt><dd>Domestic / international</dd></div><div><dt>Carrier</dt><dd>IATA-compliant</dd></div></dl>
            </article>
            <article className="pt-option-card">
              <span className="pt-option-number">03</span><ShieldCheck size={28}/><h3>Assistance dog</h3>
              <p>Registered guide and hearing assistance dogs travel free in the cabin.</p>
              <dl><div><dt>Cabin</dt><dd>Included</dd></div><div><dt>Routes</dt><dd>All eligible routes</dd></div><div><dt>Need</dt><dd>Health / certification</dd></div></dl>
            </article>
          </div>
        </div>
      </section>

      <section className="pt-journey">
        <div className="al-container pt-journey-grid">
          <div className="pt-journey-copy">
            <span className="pt-kicker">Before the flight</span><h2>A calm journey begins at home</h2>
            <p>Consult your vet, prepare the approved carrier and gather every required travel document before the booking is confirmed.</p>
            <ul>
              <li>Veterinary health certificate within 10 days of travel</li>
              <li>Proof of rabies vaccination and destination requirements</li>
              <li>Microchip record — ISO 11784/11785 15-digit</li>
              <li>IATA-compliant, ventilated and secure carrier</li>
              <li>Destination import permit for international travel</li>
            </ul>
          </div>
          <div className="pt-journey-board">
            <div className="pt-board-paw"><PawPrint size={40}/></div>
            <div className="pt-board-line"><span>At home</span><strong>Vet check</strong></div>
            <div className="pt-board-line"><span>At booking</span><strong>Prior approval</strong></div>
            <div className="pt-board-line"><span>At the airport</span><strong>Health & carrier check</strong></div>
            <div className="pt-board-line"><span>At destination</span><strong>Welcome together</strong></div>
          </div>
        </div>
      </section>

      <section className="pt-breed">
        <div className="al-container pt-breed-card">
          <div className="pt-breed-copy"><span className="pt-kicker pt-kicker--light">Travel note</span><h2>Some breeds need extra care</h2><p>Snub-nosed, or brachycephalic, breeds face a higher breathing risk during air travel.</p></div>
          <div className="pt-breed-list"><span>English Bulldog</span><span>Pug</span><span>French Bulldog</span><span>Persian cat</span></div>
          <p className="pt-breed-note">These breeds are prohibited in the hold. Cabin travel may be considered only if they meet the weight, carrier and route requirements.</p>
        </div>
      </section>

      <section className="pt-preparation">
        <div className="al-container">
          <div className="pt-section-head pt-section-head--left"><span className="pt-kicker">Before departure</span><h2>Prepare gently</h2></div>
          <div className="pt-prep-grid">
            {[
              ['01', 'Speak with your vet', 'Discuss the route, health status and destination before travel.'],
              ['02', 'Never sedate casually', 'Do not sedate a pet without veterinary advice — it can be dangerous at altitude.'],
              ['03', 'Ease the journey', 'Exercise the pet and avoid a heavy meal 4–6 hours before departure.'],
              ['04', 'Pack familiar comforts', 'Use an approved carrier with a secure absorbent pad and familiar scent.'],
            ].map(([number, title, copy]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="pt-enquiry">
        <div className="al-container pt-enquiry-card">
          <div className="pt-enquiry-copy"><span className="pt-kicker pt-kicker--light">Pet travel enquiry</span><h2>Let us confirm the best option</h2><p>Share your pet's details and route. Acceptance depends on breed, weight, carrier, documents and destination requirements.</p></div>
          <Link href="/airline/contact" className="pt-btn pt-btn--sage">Check pet eligibility <span>→</span></Link>
        </div>
      </section>

      <section className="pt-faq">
        <div className="al-container pt-faq-grid">
          <div className="pt-faq-head"><span className="pt-kicker">Good to know</span><h2>Pet Travel FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['What breeds are restricted from flying?', 'Snub-nosed breeds including English Bulldogs, Pugs, French Bulldogs, Persian cats and similar breeds are prohibited in the hold due to breathing risk. They may travel in cabin if they meet the weight limit.'],
              ['Can I bring two pets on the same booking?', 'On domestic routes, one pet per passenger may travel in cabin. Up to two pets per booking may travel in the hold, subject to space and prior approval.'],
              ['What if my pet is in distress during the flight?', 'Cabin crew can observe cabin pets. If distress is noted, crew will alert the captain and arrange care at the next available stop if necessary. Pets in hold are monitored via aircraft systems.'],
              ['How should I prepare my pet for travel?', 'Consult your vet before travel. Do not sedate your pet without veterinary advice — sedation can be dangerous at altitude. Exercise the pet before the flight and do not feed for 4–6 hours before departure.'],
            ].map(([question, answer]) => <details className="al-faq" key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="pt-related">
        <div className="al-container">
          <div className="al-related">
            {[[<Package size={20}/>, 'Live Animals Cargo', '/airline/live-animals-cargo'], [<GraduationCap size={20}/>, 'Unaccompanied Minors', '/airline/unaccompanied-minors'], [<Accessibility size={20}/>, 'Special Assistance', '/airline/special-assistance'], [<Luggage size={20}/>, 'Baggage Info', '/airline/baggage'], [<ClipboardList size={20}/>, 'Manage Booking', '/airline/manage-booking'], [<Phone size={20}/>, 'Contact Us', '/airline/contact']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer"><strong>Pet Travel Policy:</strong> Acceptance is subject to prior approval. Some destination countries prohibit importation of certain species. The passenger is responsible for meeting destination-country import requirements.</div>
        </div>
      </section>
    </PageLayout>
  );
}

export function WheelchairAssistancePage() {
  return (
    <PageLayout>
      <section className="wa-hero">
        <div className="wa-hero-copy">
          <div className="wa-eyebrow"><Accessibility size={15}/> Accessible at every step</div>
          <h1>Your journey,<br /><em>with dignity.</em></h1>
          <p>Wheelchair support arranged around your needs — from the airport entrance through boarding and arrival.</p>
          <div className="wa-hero-actions">
            <Link href="/airline/special-assistance" className="wa-btn wa-btn--clay">Request wheelchair support <span>→</span></Link>
            <Link href="#wheelchair-types" className="wa-btn wa-btn--line">Understand assistance codes</Link>
          </div>
          <div className="wa-hero-note"><CheckCircle size={17}/><span>Assistance is free of charge</span><i/><span>Minimum 48-hour notice</span></div>
        </div>
        <figure className="wa-hero-media">
          <img src="/images/sa-about-family.jpg" alt="Family receiving dignified airport assistance" />
          <div className="wa-support-map">
            <span>From curbside to cabin</span>
            <div><b>1</b><strong>Arrival</strong></div>
            <div><b>2</b><strong>Terminal</strong></div>
            <div><b>3</b><strong>Boarding</strong></div>
            <div><b>4</b><strong>Destination</strong></div>
          </div>
        </figure>
      </section>

      <section className="wa-types" id="wheelchair-types">
        <div className="al-container">
          <div className="wa-section-head">
            <span className="wa-kicker">Service categories</span>
            <h2>Choose the level of support</h2>
            <p>Use the category that best describes your mobility need. Our assistance team confirms the airport arrangement.</p>
          </div>
          <div className="wa-type-grid">
            {[
              ['WCHR', 'Ramp assistance', 'You can walk, but need support across long distances or stairs.', 'Wheelchair to ramp and boarding bridge'],
              ['WCHS', 'Steps assistance', 'You cannot manage stairs and need special boarding arrangements.', 'Ambulift or jetbridge support'],
              ['WCHC', 'Fully dependent', 'You cannot walk and need complete assistance throughout.', 'Trained crew and aisle chair'],
              ['Own chair', 'Personal wheelchair', 'Your manual or battery-powered chair travels with your journey.', 'Advance battery approval'],
            ].map(([code, title, copy, detail], index) => (
              <article className="wa-type-card" key={code}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{code}</strong>
                <h3>{title}</h3>
                <p>{copy}</p>
                <small>{detail}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wa-own">
        <div className="al-container wa-own-grid">
          <div className="wa-own-copy">
            <span className="wa-kicker">Bring your own</span>
            <h2>Keep the wheelchair that feels familiar</h2>
            <p>Passengers may carry manual or battery-powered wheelchairs. Manual chairs are returned at the aircraft door on arrival at no charge, in addition to the baggage allowance.</p>
            <ul>
              <li>Dry cell and gel batteries are generally permitted</li>
              <li>Spill-proof wet batteries may be accepted</li>
              <li>Lithium batteries require added documentation and approval</li>
              <li>Notify us 72 hours before departure for battery chairs</li>
            </ul>
          </div>
          <div className="wa-battery-panel">
            <div className="wa-battery-icon"><BatteryCharging size={38}/></div>
            <div className="wa-battery-list">
              <div><span>Battery detail</span><strong>Type + capacity</strong></div>
              <div><span>Security</span><strong>Terminals protected</strong></div>
              <div><span>Prior notice</span><strong>At least 72 hours</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="wa-journey">
        <div className="al-container">
          <div className="wa-section-head wa-section-head--left">
            <span className="wa-kicker">At the airport</span>
            <h2>Care from one point to the next</h2>
          </div>
          <div className="wa-journey-grid">
            {[
              ['01', 'Arrival', 'Meet at the agreed terminal point'],
              ['02', 'Check-in', 'Assistance with documents and baggage'],
              ['03', 'Security', 'Supported passage through the airport'],
              ['04', 'Gate & boarding', 'Priority movement and aircraft support'],
              ['05', 'Destination', 'Continued assistance until handover'],
            ].map(([number, title, copy]) => (
              <article key={title}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="wa-enquiry">
        <div className="al-container wa-enquiry-card">
          <div className="wa-enquiry-copy">
            <span className="wa-kicker wa-kicker--light">Before you travel</span>
            <h2>Tell us what support is needed</h2>
            <p>Share the assistance category, route and wheelchair battery details so the airport team can prepare.</p>
          </div>
          <div className="wa-enquiry-actions">
            <Link href="/airline/special-assistance" className="wa-btn wa-btn--clay">Request assistance <span>→</span></Link>
            <Link href="/airline/contact" className="wa-btn wa-btn--line-light">Contact special assistance</Link>
          </div>
        </div>
      </section>

      <section className="wa-faq">
        <div className="al-container wa-faq-grid">
          <div className="wa-faq-head">
            <span className="wa-kicker">Good to know</span>
            <h2>Wheelchair FAQs</h2>
          </div>
          <div className="al-faqs">
            {[
              ['How far in advance must I request wheelchair assistance?', 'Please request at least 48 hours before departure. Battery-powered wheelchairs and complex airport requirements should be notified at least 72 hours ahead.'],
              ['Is there an aisle wheelchair on the aircraft?', 'All widebody aircraft (B787, A350, B777) carry an onboard aisle wheelchair for WCHC passengers. Narrowbody aircraft do not carry an onboard chair.'],
              ['Can I keep my wheelchair at the gate?', 'Yes where the boarding bridge has access. At airports without a jetbridge, the chair is loaded in the hold and returned at the aircraft door on arrival.'],
              ['What if my wheelchair is damaged in the hold?', 'Report damage immediately at the Baggage Services desk before leaving the airport. Liability and repair or replacement are handled under the applicable policy.'],
              ['Are electric scooters accepted?', 'Electric scooters are accepted in the hold subject to battery approval, following the same process as battery-powered wheelchairs.'],
            ].map(([question, answer]) => <details className="al-faq" key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="wa-related">
        <div className="al-container">
          <div className="al-related">
            {[[<Accessibility size={20}/>, 'Special Assistance', '/airline/special-assistance'], [<HeartPulse size={20}/>, 'Medical Clearance', '/airline/medical-clearance'], [<UserCog size={20}/>, 'Senior Fares', '/airline/senior-fares'], [<ClipboardList size={20}/>, 'Manage Booking', '/airline/manage-booking'], [<Phone size={20}/>, 'Contact Us', '/airline/contact'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer"><strong>Accessibility notice:</strong> Assistance depends on airport infrastructure at departure and arrival. Some airports require ambulift access, which cannot be guaranteed at every station.</div>
        </div>
      </section>
    </PageLayout>
  );
}
