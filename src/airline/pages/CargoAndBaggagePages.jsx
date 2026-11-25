'use client';
import { AlertTriangle, Bird, CheckCircle, CircleDot, ClipboardList, Dog, Fish, Gem, Globe2, Luggage, Moon, Music2, Package, PawPrint, Phone, Plane, Rocket, Stethoscope, Thermometer, Zap, XCircle } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';

function SimpleCargoPage({ title, eyebrow, sub, img, description, bullets, services, formTitle, formFields, faqs, related, disclaimer }) {
  return (
    <PageLayout>
      <section className="al-hero">
        <div className="al-hero-bg" style={{ backgroundImage: `url(${img})` }} />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p className="al-hero-sub">{sub}</p>
          <div className="al-hero-actions">
            <Link href="/airline/contact" className="al-btn-primary">Get a Quote →</Link>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-desc">
            <div className="al-desc-text">
              <h2>{description.title}</h2>
              {description.paras.map((p, i) => <p key={i}>{p}</p>)}
              {bullets && <ul className="al-list" style={{ marginTop: 16 }}>{bullets.map(b => <li key={b}>{b}</li>)}</ul>}
            </div>
            <div className="al-desc-img"><img src={description.img} alt={description.title} /></div>
          </div>
        </div>
      </section>

      {services && (
        <section className="al-section al-section--light">
          <div className="al-container">
            <div className="al-cards al-cards--3">{services.map(s => <div key={s.title} className="al-card"><div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
          </div>
        </section>
      )}

      <section className="al-section al-section--sky">
        <div className="al-container">
          <div className="al-gallery">
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1565793979765-a73e1f74af3c?w=600&q=80" alt="Cargo handling" /></div>
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1543193158-71ef5a3dfce8?w=600&q=80" alt="Cargo loading" /></div>
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1468971050039-be99497410af?w=600&q=80" alt="Freight terminal" /></div>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>{formTitle}</h2>
            <p>Fill in the form below and our cargo team will respond within 4 business hours.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              {formFields.map(f => (
                <div key={f.name} className={`al-form-group${f.full ? ' full' : ''}`}>
                  <label>{f.label}</label>
                  {f.type === 'select' ? <select>{f.options.map(o => <option key={o}>{o}</option>)}</select> : f.type === 'textarea' ? <textarea required={f.required} placeholder={f.placeholder} /> : <input type={f.type || 'text'} required={f.required} placeholder={f.placeholder} />}
                </div>
              ))}
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Request Quote →</button></div>
            </form>
          </div>
        </div>
      </section>

      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header"><h2>FAQs</h2></div>
          <div className="al-faqs">{faqs.map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}</div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">{related.map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}</div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Cargo Notice:</strong> {disclaimer}</div>
        </div>
      </section>
    </PageLayout>
  );
}

const COMMON_CARGO_FIELDS = [
  { name: 'name', label: 'Your Name', required: true },
  { name: 'company', label: 'Company Name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'origin', label: 'Origin Airport', required: true },
  { name: 'dest', label: 'Destination Airport', required: true },
  { name: 'weight', label: 'Estimated Weight (kg)', type: 'number' },
  { name: 'dims', label: 'Approximate Dimensions (cm)', placeholder: 'L × W × H' },
  { name: 'notes', label: 'Cargo Description & Special Requirements', type: 'textarea', full: true },
];

export function CargoServicesPage() {
  return (
    <PageLayout>
      <section className="cs-hero">
        <div className="cs-hero-grid">
          <div className="cs-hero-copy">
            <div className="cs-eyebrow"><Package size={15}/> Sanatan Cargo Network</div>
            <h1>Trade moves<br /><em>with precision.</em></h1>
            <p>General, temperature-controlled and high-value freight managed across India and our international network.</p>
            <div className="cs-hero-actions">
              <Link href="#cargo-request" className="cs-btn cs-btn--lime">Request a quote <span>→</span></Link>
              <Link href="#cargo-solutions" className="cs-btn cs-btn--line">Explore solutions</Link>
            </div>
          </div>
          <div className="cs-control">
            <div className="cs-control-head"><span>NETWORK STATUS</span><strong>Operations live</strong></div>
            <div className="cs-route"><span>BOM</span><i/><Plane size={18}/><i/><span>DEL</span></div>
            <div className="cs-control-grid">
              <div><small>Destinations</small><strong>85</strong></div>
              <div><small>Temperature</small><strong>2 zones</strong></div>
              <div><small>Tracking</small><strong>Live AWB</strong></div>
              <div><small>Network</small><strong>India + global</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-solutions" id="cargo-solutions">
        <div className="al-container">
          <div className="cs-section-head"><span className="cs-kicker">Freight solutions</span><h2>Built for what is inside</h2></div>
          <div className="cs-solution-grid">
            {[
              { icon: <Package size={22}/>, no: '01', title: 'General cargo', copy: 'Documents, parcels and manufactured goods with a minimum chargeable weight of 10 kg.' },
              { icon: <Thermometer size={22}/>, no: '02', title: 'Cool chain', copy: '+2°C to +8°C and -15°C to -25°C pharmaceutical and perishables handling.' },
              { icon: <Gem size={22}/>, no: '03', title: 'High value', copy: 'Secure vault storage, 24/7 CCTV and electronic seal tracking for valuables.' },
              { icon: <Rocket size={22}/>, no: '04', title: 'Express freight', copy: 'Priority uplift and first available flight options on priority domestic and international routes.' },
            ].map((item) => (
              <article key={item.title}>
                <div className="cs-solution-top"><span>{item.no}</span><div>{item.icon}</div></div>
                <h3>{item.title}</h3><p>{item.copy}</p><small>Special handling available</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-network">
        <div className="al-container cs-network-grid">
          <div className="cs-network-copy"><span className="cs-kicker">Network control</span><h2>One booking, end-to-end visibility</h2><p>Ship through the belly hold of the passenger fleet or use dedicated freighter capacity on selected high-volume trunk routes.</p></div>
          <div className="cs-network-board">
            {[
              ['Acceptance', 'Security and handling'], ['Build-up', 'Loading and AWB control'], ['Departure', 'Flight event confirmed'], ['Arrival', 'Destination release'], ['Delivery', 'Consignee handover'],
            ].map(([title, copy], index) => (
              <article key={title}><b>{String(index + 1).padStart(2, '0')}</b><div><strong>{title}</strong><span>{copy}</span></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-pharma">
        <div className="al-container cs-pharma-grid">
          <div className="cs-pharma-mark"><Thermometer size={42}/><span>CEIV</span></div>
          <div className="cs-pharma-copy"><span>Specialised facility</span><h2>Mumbai Cargo Terminal</h2><p>IATA CEIV Pharma certified handling with temperature monitoring for sensitive pharmaceutical shipments.</p></div>
          <dl className="cs-pharma-spec">
            <div><dt>Range</dt><dd>+2°C to +8°C</dd></div><div><dt>Deep cold</dt><dd>-15°C to -25°C</dd></div><div><dt>Monitoring</dt><dd>Continuous event control</dd></div>
          </dl>
        </div>
      </section>

      <section className="cs-request" id="cargo-request">
        <div className="al-container cs-request-grid">
          <div className="cs-request-copy"><span className="cs-kicker cs-kicker--light">Cargo enquiry</span><h2>Move forward with a clear quote</h2><p>Share route, dimensions and handling requirements. Our cargo team confirms acceptance and uplift.</p></div>
          <Link href="/airline/contact" className="cs-btn cs-btn--lime">Start a cargo enquiry <span>→</span></Link>
        </div>
      </section>

      <section className="cs-faq">
        <div className="al-container cs-faq-grid">
          <div className="cs-faq-head"><span className="cs-kicker">Good to know</span><h2>Cargo FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['How do I enquire about cargo?', 'Use the cargo enquiry form and provide the route, commodity and approximate weight. Any handling, price and operator availability must be confirmed separately.'],
              ['What is the maximum weight per piece?', 'Individual pieces up to 300 kg are accepted. Oversized or overweight cargo may require freighter-specific handling.'],
              ['Can I track my cargo shipment?', 'Yes — cargo tracking is available via Air Waybill number. Updates include acceptance, loading, departure, arrival and delivery.'],
              ['How is cargo priced?', 'Cargo is priced on chargeable weight, the greater of actual or volumetric weight, by route and commodity type.'],
            ].map(([question, answer]) => <details className="al-faq" key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="cs-related">
        <div className="al-container">
          <div className="al-related">
            {[[<Rocket size={20}/>, 'Express Cargo', '/airline/express-cargo'], [<PawPrint size={20}/>, 'Live Animals Cargo', '/airline/live-animals-cargo'], [<AlertTriangle size={20}/>, 'Dangerous Goods', '/airline/dangerous-goods'], [<Globe2 size={20}/>, 'Destinations', '/airline/destinations'], [<Phone size={20}/>, 'Contact Us', '/airline/contact'], [<Plane size={20}/>, 'Our Fleet', '/airline/our-fleet']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer"><strong>Cargo notice:</strong> Acceptance is subject to capacity, security screening, route restrictions and hazardous-goods regulations. Final acceptance is confirmed at the cargo terminal.</div>
        </div>
      </section>
    </PageLayout>
  );
}

export function ExpressCargoPage() {
  return (
    <PageLayout>
      <section className="xc-hero">
        <div className="xc-hero-grid">
          <div className="xc-hero-copy">
            <div className="xc-eyebrow"><Zap size={15}/> Time-definite cargo</div>
            <h1>When every hour<br /><em>counts.</em></h1>
            <p>Priority uplift, guaranteed departure and live milestones for consignments that cannot wait.</p>
            <div className="xc-hero-actions">
              <Link href="#express-request" className="xc-btn xc-btn--orange">Request express booking <span>→</span></Link>
              <Link href="#express-options" className="xc-btn xc-btn--line">View delivery options</Link>
            </div>
          </div>
          <div className="xc-clock">
            <div className="xc-clock-head"><span>Departure board</span><strong>LIVE</strong></div>
            <div className="xc-clock-main"><b>11:00</b><div><span>Same-day cutoff</span><strong>BOM → DEL</strong></div></div>
            <div className="xc-clock-route">
              <div><span>Accept</span><b>08:00</b></div>
              <i/>
              <div><span>Load</span><b>09:30</b></div>
              <i/>
              <div><span>Deliver</span><b>14:00</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="xc-options" id="express-options">
        <div className="al-container">
          <div className="xc-section-head">
            <span className="xc-kicker">Choose a service level</span>
            <h2>Time when it matters</h2>
          </div>
          <div className="xc-option-grid">
            {[
              ['01', 'Same-day express', '11:00', 'Shipment delivered on a same-day domestic trunk flight.', 'Mumbai–Delhi · Mumbai–Bengaluru · Delhi–Chennai'],
              ['02', 'Overnight express', '20:00', 'Accepted by 20:00 for first-flight-next-day delivery.', '95% of domestic city pairs'],
              ['03', 'International express', 'Published', 'Airport-to-airport uplift with guaranteed departure.', 'Transit time confirmed at booking'],
            ].map(([number, title, cutoff, copy, detail]) => (
              <article key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <div className="xc-cutoff"><small>Cutoff / time</small><strong>{cutoff}</strong></div>
                <p>{copy}</p>
                <small>{detail}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="xc-tracking">
        <div className="al-container xc-tracking-grid">
          <div className="xc-tracking-copy">
            <span className="xc-kicker">From acceptance to arrival</span>
            <h2>Know where the shipment is</h2>
            <p>Real-time event notifications keep the shipper and consignee informed at every controlled milestone.</p>
          </div>
          <div className="xc-track-board">
            {[
              ['01', 'Accepted', '08:12'],
              ['02', 'Security cleared', '08:46'],
              ['03', 'Loaded', '09:38'],
              ['04', 'Departed', '10:20'],
              ['05', 'Arrived', '12:05'],
            ].map(([number, title, time]) => (
              <div key={title}><b>{number}</b><strong>{title}</strong><span>{time}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="xc-promise">
        <div className="al-container xc-promise-grid">
          <div className="xc-promise-mark"><Rocket size={42}/><span>PRIORITY</span></div>
          <div className="xc-promise-copy">
            <span>Express promise</span>
            <h2>Loading guaranteed on the nominated flight</h2>
            <p>Express freight receives priority uplift. If the nominated flight is cancelled, we move the shipment to the next available flight at no extra charge and notify the consignee.</p>
          </div>
          <dl className="xc-promise-spec">
            <div><dt>Handling</dt><dd>Priority build-up</dd></div>
            <div><dt>Tracking</dt><dd>Event notifications</dd></div>
            <div><dt>Coverage</dt><dd>100+ domestic pairs</dd></div>
          </dl>
        </div>
      </section>

      <section className="xc-request" id="express-request">
        <div className="al-container xc-request-card">
          <div className="xc-request-copy">
            <span className="xc-kicker xc-kicker--light">Express cargo booking</span>
            <h2>Share the deadline. We will manage the uplift.</h2>
            <p>Include origin, destination, weight, dimensions and the required delivery date or time.</p>
          </div>
          <Link href="/airline/contact" className="xc-btn xc-btn--orange">Start express request <span>→</span></Link>
        </div>
      </section>

      <section className="xc-faq">
        <div className="al-container xc-faq-grid">
          <div className="xc-faq-head"><span className="xc-kicker">Good to know</span><h2>Express Cargo FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['What is the cutoff for same-day Express?', 'For same-day express on domestic trunk routes, shipments must be delivered to the cargo terminal by 11:00 IST. Contact us for route-specific cutoffs.'],
              ['Is Express Cargo available for dangerous goods?', 'Some dangerous goods classes are accepted, subject to flight availability and IATA DGR compliance. Full documentation is required.'],
              ['What if the guaranteed flight is cancelled?', 'If the nominated flight is cancelled by Sanatan Airlines, we move the shipment to the next available flight at no extra charge and notify the consignee.'],
            ].map(([question, answer]) => <details className="al-faq" key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="xc-related">
        <div className="al-container">
          <div className="al-related">
            {[[<Package size={20}/>, 'Cargo Services', '/airline/cargo-services'], [<AlertTriangle size={20}/>, 'Dangerous Goods', '/airline/dangerous-goods'], [<Phone size={20}/>, 'Contact Us', '/airline/contact'], [<Globe2 size={20}/>, 'Destinations', '/airline/destinations'], [<Plane size={20}/>, 'Our Fleet', '/airline/our-fleet'], [<ClipboardList size={20}/>, 'Track Cargo', '/airline/cargo-services']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer"><strong>Express terms:</strong> Guarantees are subject to force majeure, security hold requirements and destination curfew restrictions. Compensation is limited to the freight charge as per IATA conditions.</div>
        </div>
      </section>
    </PageLayout>
  );
}

export function LiveAnimalCargoPage() {
  return (
    <PageLayout>
      <section className="lac-hero">
        <div className="lac-hero-grid">
          <div className="lac-hero-copy">
            <div className="lac-eyebrow"><PawPrint size={15}/> AVI · Live Animals Cargo</div>
            <h1>Handled with care,<br /><em>every mile.</em></h1>
            <p>Humane, regulated transport for companion animals, livestock and specialist wildlife under IATA Live Animals Regulations.</p>
            <div className="lac-hero-actions">
              <Link href="#live-animal-request" className="lac-btn lac-btn--sage">Plan an animal shipment <span>→</span></Link>
              <Link href="#live-animal-guide" className="lac-btn lac-btn--line">Review requirements</Link>
            </div>
          </div>
          <figure className="lac-hero-media">
            <img src="/images/india/kerala-forest.jpg" alt="A calm animal-friendly natural environment" />
            <div className="lac-welfare-card">
              <span>Welfare protocol</span>
              <div><b>01</b><strong>Containment</strong></div>
              <div><b>02</b><strong>Ventilation</strong></div>
              <div><b>03</b><strong>Temperature</strong></div>
              <div><b>04</b><strong>Careful handover</strong></div>
            </div>
          </figure>
        </div>
      </section>

      <section className="lac-categories" id="live-animal-guide">
        <div className="al-container">
          <div className="lac-section-head">
            <span className="lac-kicker">Species categories</span>
            <h2>Accepted after species-specific approval</h2>
          </div>
          <div className="lac-category-grid">
            {[
              { icon: <PawPrint size={22}/>, title: 'Companion animals', copy: 'Cats and dogs in IATA-compliant containers in the pressurised hold. Pet Travel cabin options may apply.' },
              { icon: <Dog size={22}/>, title: 'Horses & equine', copy: 'Charter or freighter transport with IATA-compliant stalls and full handling coordination.' },
              { icon: <Bird size={22}/>, title: 'Birds & fish', copy: 'Ornamental birds and tropical fish in ventilated or oxygen-enriched IATA-approved arrangements.' },
              { icon: <PawPrint size={22}/>, title: 'Special wildlife', copy: 'Zoo, aquarium, livestock and protected species require prior approval and applicable permits.' },
            ].map((item) => (
              <article key={item.title}>
                <div className="lac-category-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lac-journey">
        <div className="al-container lac-journey-grid">
          <div className="lac-journey-copy">
            <span className="lac-kicker">The care journey</span>
            <h2>Every transition is planned</h2>
            <p>Acceptance begins before airport arrival. Species, container, health status and destination rules determine the approved route.</p>
          </div>
          <div className="lac-journey-board">
            {[
              ['01', 'Submit', 'Species and route details'],
              ['02', 'Validate', 'Containers and documents'],
              ['03', 'Tender', 'Airport acceptance control'],
              ['04', 'Monitor', 'Temperature and handling'],
              ['05', 'Handover', 'Consignee collection'],
            ].map(([number, title, copy]) => (
              <article key={title}><b>{number}</b><div><strong>{title}</strong><span>{copy}</span></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="lac-requirements">
        <div className="al-container lac-requirements-grid">
          <div className="lac-requirements-copy">
            <span className="lac-kicker">Before acceptance</span>
            <h2>Four essentials</h2>
          </div>
          <div className="lac-requirement-list">
            {[
              ['Container', 'IATA Container Requirements for the specific species'],
              ['Health', 'Veterinary health certificate issued within 10 days'],
              ['Vaccination', 'Proof of vaccination and rabies status where required'],
              ['Import', 'Destination import permit and CITES permits for protected species'],
            ].map(([title, copy]) => (
              <article key={title}><span/><div><h3>{title}</h3><p>{copy}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="lac-brachy">
        <div className="al-container lac-brachy-card">
          <div className="lac-brachy-copy">
            <span>Breed and species notice</span>
            <h2>Snub-nosed breeds require special review</h2>
            <p>Brachycephalic breeds face elevated respiratory risk and are prohibited in the cargo hold on Sanatan Airlines.</p>
          </div>
          <div className="lac-brachy-list"><span>Bulldogs</span><span>Pugs</span><span>French Bulldogs</span><span>Persians</span></div>
          <p className="lac-brachy-note">They may travel in cabin on eligible domestic routes only when size, carrier and route requirements are met.</p>
        </div>
      </section>

      <section className="lac-request" id="live-animal-request">
        <div className="al-container lac-request-card">
          <div className="lac-request-copy">
            <span className="lac-kicker lac-kicker--light">Live animals enquiry</span>
            <h2>Begin with the species and route</h2>
            <p>Tell us the animal, quantity, container, feeding needs, health document status and route. Acceptance is confirmed only after specialist review.</p>
          </div>
          <Link href="/airline/contact" className="lac-btn lac-btn--sage">Request live animals carriage <span>→</span></Link>
        </div>
      </section>

      <section className="lac-faq">
        <div className="al-container lac-faq-grid">
          <div className="lac-faq-head"><span className="lac-kicker">Good to know</span><h2>Live Animals FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['What containers are required?', 'Containers must comply with IATA Container Requirements for the species. They must be ventilated, structurally sound, cleanable and appropriately sized.'],
              ['What documentation is needed?', 'A veterinary health certificate within 10 days, proof of vaccination and destination import permit are typically required. CITES permits are required for protected species.'],
              ['Can brachycephalic breeds travel in cargo?', 'No — brachycephalic breeds are prohibited in the cargo hold due to respiratory distress risk. Domestic cabin travel may be considered if all limits are met.'],
            ].map(([question, answer]) => <details className="al-faq" key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="lac-related">
        <div className="al-container">
          <div className="al-related">
            {[[<PawPrint size={20}/>, 'Pet Travel', '/airline/pet-travel'], [<Package size={20}/>, 'Cargo Services', '/airline/cargo-services'], [<AlertTriangle size={20}/>, 'Dangerous Goods', '/airline/dangerous-goods'], [<Phone size={20}/>, 'Contact Us', '/airline/contact'], [<Globe2 size={20}/>, 'Destinations', '/airline/destinations'], [<Stethoscope size={20}/>, 'Medical Clearance', '/airline/medical-clearance']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer"><strong>Live animals policy:</strong> Shipments are subject to IATA LAR and applicable import/export regulations. CITES-listed species require additional permits. Acceptance remains subject to specialist review.</div>
        </div>
      </section>
    </PageLayout>
  );
}

export function DangerousGoodsPage() {
  return <SimpleCargoPage
    title="Dangerous Goods —&#10;Safe & Compliant."
    eyebrow="IATA DGR Compliance"
    sub="Detailed guidance on what hazardous materials are accepted, prohibited or restricted on Sanatan Airlines flights — for passengers and shippers."
    img="https://images.unsplash.com/photo-1565793979765-a73e1f74af3c?w=1600&q=80"
    description={{ title: 'Dangerous Goods: What You Need to Know', paras: ['Sanatan Airlines accepts dangerous goods (DG) in accordance with IATA Dangerous Goods Regulations (DGR). Both cargo shippers and passengers are subject to DG rules — including household items like lithium batteries, aerosols, perfumes and lighters.', 'Improper carriage of dangerous goods is a serious offence under Indian and international aviation law. Undeclared DG shipments can endanger the aircraft and all on board.'], img: 'https://images.unsplash.com/photo-1543193158-71ef5a3dfce8?w=800&q=80' }}
    bullets={['Class 2.1 — Flammable gas: camping gas cylinders — PROHIBITED', 'Class 3 — Flammable liquid: petrol, acetone — PROHIBITED', 'Class 8 — Corrosives: bleach, strong acids — PROHIBITED in cabin', 'Class 9 — Lithium batteries: cabin only, spare batteries only', 'Division 2.2 — Non-flammable gases: CO2 cartridges (≤2) — OK in cabin', 'Perfumes and alcohol-based products: cabin max 500 ml per item']}
    services={[{ icon: <CheckCircle size={20}/>, title: 'Accepted with Conditions', desc: 'Lithium batteries in devices (cabin OK), dry ice for perishables (hold, max 2.5 kg), small CO2 cartridges, aerosol personal care items within limits.' }, { icon: <XCircle size={20}/>, title: 'Strictly Prohibited', desc: 'Flammable gases, corrosives, explosives, radioactive materials, compressed gas cylinders, peroxides and any undeclared hazardous material.' }, { icon: <ClipboardList size={20}/>, title: 'DGD Required for Cargo', desc: 'Cargo shippers must provide a Shipper\'s Declaration of Dangerous Goods (DGD), completed and signed as required by IATA DGR.' }]}
    formTitle="DG Cargo Pre-Approval Enquiry"
    formFields={[{ name: 'name', label: 'Company Name', required: true }, { name: 'email', label: 'Email', type: 'email', required: true }, { name: 'phone', label: 'Phone', type: 'tel' }, { name: 'class', label: 'DG Class / Division', required: true, placeholder: 'e.g. Class 3, Division 1.4G' }, { name: 'un', label: 'UN Number', placeholder: 'e.g. UN1263' }, { name: 'route', label: 'Route', required: true }, { name: 'weight', label: 'Net Quantity (kg or L)' }, { name: 'notes', label: 'Additional Details', type: 'textarea', full: true }]}
    faqs={[['Can I bring a power bank on board?', 'Yes — power banks (lithium ion, up to 100 Wh / 20,000 mAh) are permitted in cabin baggage only. They must not be placed in checked baggage. Carry a maximum of two spare power banks.'], ['Are e-cigarettes allowed?', 'E-cigarettes and vaping devices must travel in cabin baggage. Using them on board is strictly prohibited. Spare batteries must be protected from short circuit.'], ['What about lighter and matches?', 'One lighter or matches are permitted in a passenger\'s pocket only. Fuel lighters, torch lighters and lighter fuel are prohibited.'], ['What happens if undeclared DG is found at the airport?', 'Undeclared DG discovered at security or the airport may result in item confiscation, refusal of transport, civil penalty under DGCA regulations and in serious cases, criminal prosecution.']]}
    related={[[<Package size={20}/>, 'Cargo Services', '/airline/cargo-services'], [<Luggage size={20}/>, 'Baggage Info', '/airline/baggage'], [<CircleDot size={20}/>, 'Sports Equipment', '/airline/sports-equipment'], [<Music2 size={20}/>, 'Musical Instruments', '/airline/musical-instruments'], [<Phone size={20}/>, 'Contact Us', '/airline/contact'], [<Plane size={20}/>, 'Our Fleet', '/airline/our-fleet']]}
    disclaimer="Dangerous goods regulations are subject to change. Always check the most current IATA DGR edition and applicable national regulations before shipping. Sanatan Airlines accepts no liability for confiscation or offloading of non-compliant goods."
  />;
}

export function ExcessBaggagePage() {
  return (
    <PageLayout>
      <section className="xb-hero">
        <img className="xb-hero-img" src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=85" alt="" aria-hidden="true" />
        <div className="xb-hero-shade" />
        <div className="xb-hero-inner">
          <div className="xb-eyebrow">Pack a little more</div>
          <h1>Extra bags.<br /><em>Less to pay.</em></h1>
          <p>Pre-purchase extra baggage online and save up to 60% compared with airport rates.</p>
          <div className="xb-hero-actions">
            <Link href="/airline/manage-booking" className="xb-btn xb-btn--gold">Add baggage <span>→</span></Link>
            <Link href="/airline/baggage" className="xb-btn xb-btn--ghost">View standard allowances</Link>
          </div>
        </div>
      </section>

      <section className="xb-steps" aria-label="How to purchase excess baggage">
        <div className="al-container xb-step-grid">
          {[
            ['01', 'Measure', 'Check the weight and size'],
            ['02', 'Purchase', 'Add baggage online'],
            ['03', 'Pack', 'Label your bags clearly'],
            ['04', 'Travel', 'Present the receipt at check-in'],
          ].map(([number, title, copy]) => (
            <div key={title}><span>{number}</span><strong>{title}</strong><small>{copy}</small></div>
          ))}
        </div>
      </section>

      <section className="xb-pricing">
        <div className="al-container">
          <div className="xb-section-head">
            <span className="xb-kicker">Pre-pay & save</span>
            <h2>Compare before you fly</h2>
          </div>
          <div className="xb-rate-grid">
            {[
              ['Domestic', '1 × 23 kg', '₹1,500', '₹3,000', '50% saving'],
              ['International', '1 × 23 kg', '₹3,500', '₹7,000', '50% saving'],
              ['International', '1 × 32 kg', '₹5,500', '₹11,000', '50% saving'],
            ].map(([route, bag, pre, airport, saving]) => (
              <article className="xb-rate-card" key={`${route}-${bag}`}>
                <span>{route}</span>
                <h3>{bag}</h3>
                <div className="xb-rate-prices">
                  <div><small>Pre-paid</small><strong>{pre}</strong></div>
                  <div><small>At airport</small><del>{airport}</del></div>
                </div>
                <div className="xb-saving">{saving}</div>
              </article>
            ))}
          </div>
          <div className="xb-price-table">
            <table>
              <thead><tr><th>Extra baggage</th><th>Pre-paid online</th><th>Airport rate</th><th>You save</th></tr></thead>
              <tbody>
                {[
                  ['1st extra 23 kg bag (domestic)', '₹1,500', '₹3,000', '₹1,500 (50%)'],
                  ['1st extra 23 kg bag (international)', '₹3,500', '₹7,000', '₹3,500 (50%)'],
                  ['1st extra 32 kg bag (international)', '₹5,500', '₹11,000', '₹5,500 (50%)'],
                  ['Overweight 24–32 kg (per bag)', '₹2,500', '₹5,000', '₹2,500 (50%)'],
                  ['Oversize bag (3 dimensions > 203 cm)', '₹5,000', '₹10,000', '₹5,000 (50%)'],
                ].map(([item, pre, airport, save]) => (
                  <tr key={item}><td>{item}</td><td>{pre}</td><td>{airport}</td><td>{save}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="xb-options">
        <div className="al-container xb-options-grid">
          <figure className="xb-options-media">
            <img src="https://images.unsplash.com/photo-1565793979765-a73e1f74af3c?w=900&q=85" alt="Suitcases prepared for a flight" />
            <figcaption>Pre-purchase closes at 2 hours domestic · 4 hours international</figcaption>
          </figure>
          <div className="xb-options-copy">
            <span className="xb-kicker">Choose the right allowance</span>
            <h2>For bags above your included weight</h2>
            <div className="xb-option-list">
              {[
                ['23 kg bag', 'Ideal for standard extra baggage up to 23 kg'],
                ['32 kg bag', 'A better choice for heavier individual pieces'],
                ['Overweight', 'Bags from 24–32 kg may require a separate allowance'],
                ['Oversize', 'Pieces over combined dimensions need prior approval'],
              ].map(([title, copy]) => (
                <article key={title}><strong>{title}</strong><p>{copy}</p></article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="xb-purchase">
        <div className="al-container xb-purchase-card">
          <div className="xb-purchase-copy">
            <span className="xb-kicker xb-kicker--light">Add baggage</span>
            <h2>Ready for the next piece?</h2>
            <p>Use Manage Booking to add one or more allowance pieces to your upcoming flight.</p>
          </div>
          <div className="xb-purchase-actions">
            <Link href="/airline/manage-booking" className="xb-btn xb-btn--gold">Open Manage Booking <span>→</span></Link>
            <Link href="/airline/baggage" className="xb-btn xb-btn--ghost">Check standard allowances</Link>
          </div>
        </div>
      </section>

      <section className="xb-faq">
        <div className="al-container xb-faq-grid">
          <div className="xb-faq-head">
            <span className="xb-kicker">Good to know</span>
            <h2>Excess Baggage FAQs</h2>
          </div>
          <div className="al-faqs">
            {[
              ['How far in advance can I pre-buy excess baggage?', 'You can pre-purchase extra bags from the time of booking up to 2 hours before scheduled departure for domestic and 4 hours for international flights.'],
              ['What if my bag is overweight?', 'Overweight bags (above 23 kg declared weight) are charged at the airport overweight rate. Pre-purchasing a 32 kg bag allowance before travel is significantly cheaper.'],
              ['Can I pool baggage across passengers?', 'Yes — passengers on the same booking, same flight and same cabin class may pool their baggage allowances.'],
              ['Is pre-paid baggage refundable?', 'Pre-paid baggage fees are non-refundable unless the flight is cancelled by Sanatan Airlines. If you cancel your ticket, the baggage fee is refunded only if the base ticket is also fully refunded.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="xb-related">
        <div className="al-container">
          <div className="al-related">
            {[[<Luggage size={20}/>, 'Baggage Info', '/airline/baggage'], [<CircleDot size={20}/>, 'Sports Equipment', '/airline/sports-equipment'], [<Music2 size={20}/>, 'Musical Instruments', '/airline/musical-instruments'], [<ClipboardList size={20}/>, 'Manage Booking', '/airline/manage-booking'], [<CheckCircle size={20}/>, 'Check-in Online', '/airline/check-in'], [<Phone size={20}/>, 'Contact Us', '/airline/contact']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Excess Baggage Terms:</strong> Pre-purchased excess baggage is non-refundable. Rates are subject to change. Airport rates apply for excess purchased at check-in. DGCA domestic rate caps may apply on domestic sectors.</div>
        </div>
      </section>
    </PageLayout>
  );
}

export function SportsEquipmentPage() {
  return (
    <PageLayout>
      <section className="se-hero">
        <img className="se-hero-img" src="/images/india/himalaya-trek.jpg" alt="" aria-hidden="true" />
        <div className="se-hero-shade" />
        <div className="se-hero-inner">
          <div className="se-eyebrow">Gear for the journey</div>
          <h1>Take your passion<br /><em>with you.</em></h1>
          <p>Golf clubs, skis, surfboards, bicycles and specialist equipment — with clear preparation and pre-paid options.</p>
          <div className="se-hero-actions">
            <Link href="/airline/manage-booking" className="se-btn se-btn--gold">Add sports equipment <span>→</span></Link>
            <Link href="#equipment-guide" className="se-btn se-btn--ghost">View equipment guide</Link>
          </div>
        </div>
      </section>

      <section className="se-steps" aria-label="Sports equipment process">
        <div className="al-container se-step-grid">
          {[
            ['01', 'Notify', 'Pre-book at least 48 hours before departure'],
            ['02', 'Prepare', 'Pack to protect and secure the equipment'],
            ['03', 'Pre-pay', 'Add the equipment during Manage Booking'],
            ['04', 'Check in', 'Present the item at the sports baggage desk'],
          ].map(([number, title, copy]) => (
            <div key={title}><span>{number}</span><strong>{title}</strong><small>{copy}</small></div>
          ))}
        </div>
      </section>

      <section className="se-guide" id="equipment-guide">
        <div className="al-container">
          <div className="se-section-head">
            <span className="se-kicker">Equipment by category</span>
            <h2>Know what fits and how to pack</h2>
          </div>
          <div className="se-category-grid">
            {[
              ['Golf', 'Golf set', '₹2,500', '150 × 30 × 70 cm', '/images/india/himalaya-trek.jpg'],
              ['Snow', 'Ski / snowboard', '₹2,500', 'Up to 220 cm', '/images/india/himalaya-peaks.jpg'],
              ['Water', 'Surfboard / bodyboard', '₹3,500', 'Maximum 2.5 m', '/images/india/kashmir-dal-lake.jpg'],
              ['Cycle', 'Bicycle (boxed)', '₹3,500', '130 × 90 × 30 cm', '/images/india/himachal-stream.jpg'],
            ].map(([category, name, fee, dimensions, image]) => (
              <article className="se-category-card" key={name}>
                <div className="se-category-image"><img src={image} alt={name} /><span>{category}</span></div>
                <div className="se-category-copy"><h3>{name}</h3><div><strong>{fee}</strong><small>Economy pre-paid</small></div><p>{dimensions}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="se-rate">
        <div className="al-container">
          <div className="se-section-head se-section-head--dark">
            <span className="se-kicker">Complete equipment list</span>
            <h2>Fees and preparation notes</h2>
          </div>
          <div className="se-rate-table">
            <table>
              <thead><tr><th>Equipment</th><th>Economy</th><th>Business / First</th><th>Maximum size</th><th>Preparation</th></tr></thead>
              <tbody>
                {[
                  ['Golf set', '₹2,500', 'Included', '150 × 30 × 70 cm', 'Remove head covers'],
                  ['Ski / snowboard', '₹2,500', 'Included', 'Up to 220 cm', 'Wrap bindings'],
                  ['Surfboard', '₹3,500', '₹1,500', 'Up to 2.5 m', 'Pad fin boxes'],
                  ['Bicycle', '₹3,500', '₹2,000', '130 × 90 × 30 cm', 'Hard box preferred'],
                  ['Diving equipment', '₹2,000', 'Included', 'Case up to 32 kg', 'Empty tanks'],
                  ['Paraglider', '₹5,000', '₹3,000', 'By arrangement', 'Advance approval'],
                  ['Kayak / canoe', '₹5,000', '₹3,000', 'Up to 4 m', 'Cargo approval'],
                  ['Fishing equipment', '₹1,500', 'Included', 'Standard case', 'Wrap hooks'],
                ].map(([item, eco, biz, dims, notes]) => (
                  <tr key={item}><td>{item}</td><td>{eco}</td><td>{biz}</td><td>{dims}</td><td>{notes}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="se-packing">
        <div className="al-container se-packing-grid">
          <div className="se-packing-copy">
            <span className="se-kicker">Pack with confidence</span>
            <h2>Protection starts before the airport</h2>
            <p>Equipment must be properly contained, weight-labelled and prepared for transport. Improper packing may lead to refusal or reduced liability.</p>
          </div>
          <div className="se-packing-list">
            {[
              ['01', 'Secure every moving part', 'Remove pedals, deflate tyres and wrap bindings.'],
              ['02', 'Use a firm outer case', 'Hard cases offer the strongest protection for valuable equipment.'],
              ['03', 'Declare dimensions', 'Contact us before booking if an item is oversize or exceptionally heavy.'],
              ['04', 'Insure valuable gear', 'Specialist equipment should carry separate travel or transport insurance.'],
            ].map(([number, title, copy]) => (
              <article key={title}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="se-enquiry">
        <div className="al-container se-enquiry-card">
          <div className="se-enquiry-copy">
            <span className="se-kicker se-kicker--light">Special equipment</span>
            <h2>Is your gear on the list?</h2>
            <p>Tell our baggage team what you need to travel with. Oversized and specialist items require advance confirmation.</p>
          </div>
          <div className="se-enquiry-actions">
            <Link href="/airline/contact" className="se-btn se-btn--gold">Enquire about equipment <span>→</span></Link>
            <Link href="/airline/manage-booking" className="se-btn se-btn--ghost">Manage existing booking</Link>
          </div>
        </div>
      </section>

      <section className="se-faq">
        <div className="al-container se-faq-grid">
          <div className="se-faq-head">
            <span className="se-kicker">Good to know</span>
            <h2>Sports Equipment FAQs</h2>
          </div>
          <div className="al-faqs">
            {[
              ['Do I need to pre-book sports equipment?', 'Yes — sports equipment must be pre-booked through Manage Booking at least 48 hours before departure. Walk-up acceptance at the airport is not guaranteed.'],
              ['What if my equipment exceeds the stated dimensions?', 'Oversized equipment (exceeding published dimensions) requires a special cargo booking and may need to travel as freight. Contact our cargo team for a quote.'],
              ['Is sports equipment covered by insurance?', 'Sports equipment is treated as checked baggage. Liability for loss or damage is governed by the Montreal Convention. High-value equipment should be insured separately.'],
              ['Can I wrap my bicycle without a box?', 'A hard-sided bicycle box is strongly recommended. Soft bags are accepted but offer less protection and Sanatan Airlines accepts reduced liability for damage to soft-bagged bicycles.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="se-related">
        <div className="al-container">
          <div className="al-related">
            {[[<Luggage size={20}/>, 'Baggage Info', '/airline/baggage'], [<Package size={20}/>, 'Excess Baggage', '/airline/excess-baggage'], [<Music2 size={20}/>, 'Musical Instruments', '/airline/musical-instruments'], [<ClipboardList size={20}/>, 'Manage Booking', '/airline/manage-booking'], [<CheckCircle size={20}/>, 'Check-in Online', '/airline/check-in'], [<Phone size={20}/>, 'Contact Us', '/airline/contact']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Sports Equipment Policy:</strong> All fees are per sector and must be pre-paid. Sanatan Airlines is not responsible for equipment packed improperly. Items exceeding dimensions above require prior approval and may travel as cargo freight.</div>
        </div>
      </section>
    </PageLayout>
  );
}

export function MusicalInstrumentsPage() {
  return (
    <PageLayout>
      <section className="mi-hero">
        <img className="mi-hero-img" src="https://images.unsplash.com/photo-1511379938547-c1f694198a4?w=1600&q=85" alt="" aria-hidden="true" />
        <div className="mi-hero-shade" />
        <div className="mi-hero-inner">
          <div className="mi-eyebrow">Musicians welcome</div>
          <h1>Carry the music.<br /><em>Keep it protected.</em></h1>
          <p>Thoughtful cabin, seat and hold options for every instrument — from a treasured violin to a full-sized cello.</p>
          <div className="mi-hero-actions">
            <Link href="/airline/manage-booking" className="mi-btn mi-btn--gold">Arrange instrument travel <span>→</span></Link>
            <Link href="#instrument-options" className="mi-btn mi-btn--ghost">Choose a travel option</Link>
          </div>
        </div>
      </section>

      <section className="mi-steps" aria-label="Instrument travel process">
        <div className="al-container mi-step-grid">
          {[
            ['01', 'Measure', 'Note the case size and weight'],
            ['02', 'Choose', 'Cabin, extra seat or hold'],
            ['03', 'Prepare', 'Secure and protect the case'],
            ['04', 'Notify', 'Arrange before departure'],
          ].map(([number, title, copy]) => (
            <div key={title}><span>{number}</span><strong>{title}</strong><small>{copy}</small></div>
          ))}
        </div>
      </section>

      <section className="mi-options" id="instrument-options">
        <div className="al-container">
          <div className="mi-section-head">
            <span className="mi-kicker">Three ways to travel</span>
            <h2>The right arrangement for your instrument</h2>
          </div>
          <div className="mi-option-grid">
            {[
              { no: '01', title: 'Cabin carriage', icon: <Music2 size={22}/>, text: 'Small instruments within 56 × 45 × 25 cm may travel in the overhead locker under the cabin baggage allowance.', note: 'Violin · flute · clarinet · small ukulele' },
              { no: '02', title: 'Dedicated seat', icon: <CheckCircle size={22}/>, text: 'A seat may be purchased for instruments too large for cabin storage but under 10 kg. The instrument travels in its case and is fastened for take-off.', note: 'Guitar · cello · medium cases' },
              { no: '03', title: 'Hold baggage', icon: <Luggage size={22}/>, text: 'Large instruments and freight-sized cases may travel in the hold under excess baggage rules or in dedicated cargo.', note: 'Double bass · tuba · large or heavy cases' },
            ].map((option) => (
              <article className="mi-option-card" key={option.title}>
                <div className="mi-option-top"><span>{option.no}</span><div>{option.icon}</div></div>
                <h3>{option.title}</h3>
                <p>{option.text}</p>
                <small>{option.note}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mi-guide">
        <div className="al-container mi-guide-grid">
          <figure className="mi-guide-media">
            <img src="https://images.unsplash.com/photo-1511379938547-c1f6941982c9?w=900&q=85" alt="An instrument prepared for travel" />
            <figcaption>Measure the case · secure every part · declare valuable instruments</figcaption>
          </figure>
          <div className="mi-guide-copy">
            <span className="mi-kicker">Instrument guidance</span>
            <h2>Cabin, seat or hold</h2>
            <p>Small instruments fitting within <strong>56 × 45 × 25 cm</strong> may travel in the overhead locker as your cabin baggage allowance.</p>
            <p>Instruments too large for the overhead locker but under <strong>10 kg</strong> may purchase a seat beside the passenger. The instrument travels buckled to the seat in its case.</p>
            <ul>
              <li>Small instruments: cabin — no additional charge</li>
              <li>Medium instruments: seat purchase ₹3,000–₹8,000 per sector</li>
              <li>Large instruments: hold or dedicated cargo booking</li>
              <li>Instruments in hold: excess baggage rates apply</li>
              <li>Instruments worth over ₹5 lakh: declare and insure separately</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mi-care">
        <div className="al-container">
          <div className="mi-section-head mi-section-head--dark">
            <span className="mi-kicker">Before you arrive at the airport</span>
            <h2>Prepare for a better journey</h2>
          </div>
          <div className="mi-care-grid">
            {[
              ['01', 'Loosen or release tension', 'Follow the maker’s guidance for long journeys, particularly for string and wind instruments.'],
              ['02', 'Use a fitted hard case', 'Choose a rigid case with firm padding around every side of the instrument.'],
              ['03', 'Carry tuning and spares', 'Keep essential small items with you in cabin baggage where permitted.'],
              ['04', 'Consider insurance', 'Declare valuable instruments and carry appropriate specialist insurance.'],
            ].map(([number, title, copy]) => (
              <article key={title}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="mi-enquiry">
        <div className="al-container mi-enquiry-card">
          <div className="mi-enquiry-copy">
            <span className="mi-kicker mi-kicker--light">Instrument travel booking</span>
            <h2>Tell us what is travelling with you</h2>
            <p>Share the instrument, case dimensions and route so our team can confirm the right option for your flight.</p>
          </div>
          <div className="mi-enquiry-actions">
            <Link href="/airline/contact" className="mi-btn mi-btn--gold">Request instrument booking <span>→</span></Link>
            <Link href="/airline/manage-booking" className="mi-btn mi-btn--ghost">Open Manage Booking</Link>
          </div>
        </div>
      </section>

      <section className="mi-faq">
        <div className="al-container mi-faq-grid">
          <div className="mi-faq-head">
            <span className="mi-kicker">Good to know</span>
            <h2>Instrument Travel FAQs</h2>
          </div>
          <div className="al-faqs">
            {[
              ['Can a cello always get a seat on board?', 'A cello seat can be purchased subject to aircraft configuration and seat availability. It cannot be guaranteed — book as early as possible, particularly on busy routes.'],
              ['What is the temperature and humidity in the hold?', 'The hold is pressurised and temperature-controlled but not to the same exact parameters as the cabin. For valuable instruments sensitive to temperature or humidity change, cabin carriage is strongly recommended.'],
              ['Can I request the seat next to mine for my instrument?', 'Yes — the seat purchase for an instrument is typically the adjacent seat. If you have a window seat, the instrument occupies the middle seat. Confirm at the time of booking.'],
              ['What liability applies to instruments in the hold?', 'Instruments in the hold are treated as standard checked baggage under the Montreal Convention. For instruments valued above ₹5 lakh, we strongly recommend separate instrument insurance.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="mi-related">
        <div className="al-container">
          <div className="al-related">
            {[[<Luggage size={20}/>, 'Baggage Info', '/airline/baggage'], [<CircleDot size={20}/>, 'Sports Equipment', '/airline/sports-equipment'], [<Package size={20}/>, 'Excess Baggage', '/airline/excess-baggage'], [<ClipboardList size={20}/>, 'Manage Booking', '/airline/manage-booking'], [<CheckCircle size={20}/>, 'Check-in Online', '/airline/check-in'], [<Phone size={20}/>, 'Contact Us', '/airline/contact']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Instrument Policy:</strong> Seat purchases for instruments are subject to availability. Sanatan Airlines does not accept responsibility for instrument damage caused by cabin pressure changes or handling. All valuable instruments should be fully insured.</div>
        </div>
      </section>
    </PageLayout>
  );
}
