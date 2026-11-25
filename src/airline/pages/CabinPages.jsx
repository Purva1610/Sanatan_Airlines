'use client';
import { Armchair, BaggageClaim, BedDouble, Briefcase, Car, ChefHat, Crown, Droplets, Film, Gem, Gift, Headphones, Lock, Plane, Plug, Smartphone, Star, Trophy, Tv, Umbrella, UtensilsCrossed, Wifi } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';

function CabinPage({ cabin }) {
  return (
    <PageLayout>
      {/* HERO */}
      <section className="al-cabin-hero" style={{ background: `linear-gradient(135deg, ${cabin.color1} 0%, ${cabin.color2} 100%)` }}>
        <div className="al-container">
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 2, marginBottom: 20, color: '#fff' }}>{cabin.eyebrow}</div>
          <h1>{cabin.name}</h1>
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(215,242,250,0.9)', maxWidth: 500, lineHeight: 1.6, margin: '12px auto 32px' }}>{cabin.tagline}</p>
          <Link href="/airline/book-flight" className="al-btn-primary" style={{ margin: '0 auto', display: 'inline-flex' }}>Book {cabin.name} →</Link>
        </div>
      </section>

      {/* Description */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-desc">
            <div className="al-desc-text">
              <h2>{cabin.descTitle}</h2>
              {cabin.descParagraphs.map((p, i) => <p key={i}>{p}</p>)}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
                {cabin.specs.map(([k, v]) => (
                  <div key={k} style={{ padding: '12px 16px', background: 'var(--al-flame-light)', borderRadius: 'var(--al-radius)', borderLeft: '3px solid var(--al-flame)' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--al-muted)', marginBottom: 4 }}>{k}</div>
                    <div style={{ fontWeight: 700, color: 'var(--al-text)' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="al-desc-img">
              <img src={cabin.img} alt={`${cabin.name} cabin`} />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">What's Included</div><h2>Cabin Amenities</h2></div>
          <ul className="al-amenity-list">
            {cabin.amenities.map((a) => (
              <li key={a.title} className="al-amenity">
                <span className="al-amenity-icon">{a.icon}</span>
                <div className="al-amenity-text"><h4>{a.title}</h4><p>{a.desc}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-gallery">
            {cabin.gallery.map((img, i) => <div key={i} className="al-gallery-img"><img src={img.src} alt={img.alt} /></div>)}
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section className="al-section al-section--navy">
        <div className="al-container">
          <div className="al-form-wrap" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' }}>
            <h2 style={{ color: '#fff' }}>Enquire About {cabin.name}</h2>
            <p style={{ color: 'rgba(215,242,250,0.8)', marginBottom: 24 }}>For specific requests, special occasions or upgrade enquiries, complete the form below.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label style={{ color: 'rgba(215,242,250,0.7)' }}>Name</label><input required /></div>
              <div className="al-form-group"><label style={{ color: 'rgba(215,242,250,0.7)' }}>Email</label><input type="email" required /></div>
              <div className="al-form-group"><label style={{ color: 'rgba(215,242,250,0.7)' }}>Route</label><input placeholder="e.g. Mumbai to London" /></div>
              <div className="al-form-group"><label style={{ color: 'rgba(215,242,250,0.7)' }}>Travel Date</label><input type="date" /></div>
              <div className="al-form-group full"><label style={{ color: 'rgba(215,242,250,0.7)' }}>Special Requests</label><textarea placeholder="Meal preferences, special occasion, accessibility needs..." /></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Send Enquiry →</button></div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>{cabin.name} FAQs</h2></div>
          <div className="al-faqs">
            {cabin.faqs.map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {cabin.related.map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Cabin Notice:</strong> Cabin configurations and amenities may vary by aircraft type and route. Specific amenities are subject to change. Always confirm details at the time of booking.</div>
        </div>
      </section>
    </PageLayout>
  );
}

// ============================================================
// ECONOMY CLASS — dedicated editorial layout
// ============================================================
function EconomyPage({ cabin }) {
  const [lead, ...restAmenities] = cabin.amenities;
  return (
    <PageLayout>
      {/* Hero */}
      <section className="eco-hero">
        <img className="eco-hero-img" src="/images/cabin/seat-standard.jpg" alt="" aria-hidden="true" />
        <div className="eco-hero-inner">
          <div className="eco-eyebrow">{cabin.eyebrow}</div>
          <h1>{cabin.name}</h1>
          <p>{cabin.tagline}</p>
          <Link href="/airline/book-flight" className="al-btn-primary">Book {cabin.name} →</Link>
        </div>
      </section>

      {/* Spec ribbon */}
      <section className="eco-specs" aria-label={`${cabin.name} specifications`}>
        <div className="eco-specs-inner">
          {cabin.specs.map(([k, v]) => (
            <div key={k} className="eco-spec"><strong>{v}</strong><span>{k}</span></div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="eco-story">
        <div className="al-container eco-story-grid">
          <div className="eco-story-media">
            <img src={cabin.img} alt={`${cabin.name} cabin`} />
          </div>
          <div className="eco-story-text">
            <span className="eco-kicker">The Cabin</span>
            <h2>{cabin.descTitle}</h2>
            {cabin.descParagraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* Amenities bento */}
      <section className="eco-amenities">
        <div className="al-container">
          <div className="eco-head"><span className="eco-kicker">What&apos;s Included</span><h2>Cabin Amenities</h2></div>
          <ul className="eco-bento">
            <li className="eco-tile eco-tile--lead">
              <span className="eco-tile-icon">{lead.icon}</span>
              <h3>{lead.title}</h3>
              <p>{lead.desc}</p>
            </li>
            {restAmenities.map((a) => (
              <li key={a.title} className="eco-tile">
                <span className="eco-tile-icon">{a.icon}</span>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Filmstrip gallery */}
      <section className="eco-gallery">
        <div className="eco-strip">
          {cabin.gallery.map((img, i) => (
            <figure key={i} className="eco-frame"><img src={img.src} alt={img.alt} /><figcaption>{img.alt}</figcaption></figure>
          ))}
        </div>
      </section>

      {/* Enquiry */}
      <section className="eco-enquiry">
        <div className="al-container">
          <div className="eco-enquiry-card">
            <div className="eco-enquiry-copy">
              <span className="eco-kicker">Special Requests</span>
              <h2>Enquire About {cabin.name}</h2>
              <p>For specific requests, special occasions or upgrade enquiries, complete the form below.</p>
            </div>
            <form className="al-form eco-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Name</label><input required /></div>
              <div className="al-form-group"><label>Email</label><input type="email" required /></div>
              <div className="al-form-group"><label>Route</label><input placeholder="e.g. Mumbai to London" /></div>
              <div className="al-form-group"><label>Travel Date</label><input type="date" /></div>
              <div className="al-form-group full"><label>Special Requests</label><textarea placeholder="Meal preferences, special occasion, accessibility needs..." /></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Send Enquiry →</button></div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQs — two-column */}
      <section className="eco-faq">
        <div className="al-container eco-faq-grid">
          <div className="eco-faq-head">
            <span className="eco-kicker">Good to Know</span>
            <h2>{cabin.name} FAQs</h2>
          </div>
          <div className="al-faqs">
            {cabin.faqs.map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {cabin.related.map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Cabin Notice:</strong> Cabin configurations and amenities may vary by aircraft type and route. Specific amenities are subject to change. Always confirm details at the time of booking.</div>
        </div>
      </section>
    </PageLayout>
  );
}

const ECONOMY_DATA = {
  name: 'Economy Class', eyebrow: 'Comfortable & Connected', color1: '#2134ae', color2: '#273dcd',
  tagline: 'Smart, comfortable and generous — Economy Class that feels anything but ordinary.',
  descTitle: 'Economy That Sets the Standard',
  descParagraphs: [
    'Sanatan Airlines Economy Class features one of the most generous seat pitches in its class — 32 inches on narrowbody aircraft and 34 inches on widebody long-haul flights. Every seat reclines, and all aircraft feature individual seatback IFE screens.',
    'Economy passengers enjoy a complimentary hot meal on all flights over 2 hours, unlimited non-alcoholic beverages and a USB-A/C charging point at every seat. Personal blankets and pillows are provided on flights over 4 hours.',
  ],
  specs: [['Seat Pitch', '32–34 inches'], ['Seat Width', '17–18 inches'], ['Recline', '4 inches'], ['Screen Size', '9–13 inches'], ['Meal', 'Complimentary (2h+)'], ['Charging', 'USB-A + USB-C']],
  img: '/images/cabin/seat-legroom.jpg',
  amenities: [
    { icon: <Armchair size={20}/>, title: '32–34" Seat Pitch', desc: 'More knee room than most competitors in Economy Class.' },
    { icon: <Smartphone size={20}/>, title: 'Personal IFE', desc: '9–13 inch seatback screen with 1,000+ hours of content.' },
    { icon: <Plug size={20}/>, title: 'USB Charging', desc: 'USB-A and USB-C ports at every seat. No need to carry a power bank.' },
    { icon: <UtensilsCrossed size={20}/>, title: 'Complimentary Meal', desc: 'Hot meal on all flights over 2 hours. 15 special meal options available.' },
    { icon: <Wifi size={20}/>, title: 'Wi-Fi Available', desc: 'Satellite Wi-Fi on all widebody aircraft. Plans from ₹299 per sector.' },
    { icon: <Headphones size={20}/>, title: 'Noise Reduction', desc: 'Complimentary earphones. BYO Bluetooth headphones — connector adapters available.' },
  ],
  gallery: [
    { src: '/images/cabin/seat-standard.jpg', alt: 'Rows of Economy seats beside the cabin windows' },
    { src: '/images/india/indian-thali.jpg', alt: 'A freshly prepared Indian thali meal' },
    { src: '/images/sa-insight-education.jpg', alt: 'Traveller walking through the airport terminal to the gate' },
  ],
  faqs: [
    ['Can I pre-select my seat in Economy?', 'Standard seat selection is included in Flex fares. Classic and Light fare passengers may pre-select seats for a fee from ₹300 per sector. Seats can be selected up to online check-in for free on a first-come basis.'],
    ['What meals are available?', 'All Economy passengers on flights over 2 hours receive a complimentary hot meal. Special meals (vegetarian, vegan, Jain, halal, kosher, diabetic, low-sodium and more) must be pre-ordered at least 48 hours before departure.'],
    ['Is there extra legroom in Economy?', 'Yes — exit row and bulkhead seats offer significantly more legroom. These are available for purchase through Seat Selection, subject to eligibility (health requirements apply for exit rows).'],
    ['How many bags can I bring?', 'Economy Flex and Classic: 1 × 7 kg cabin bag + 1 × 23 kg checked bag. Economy Light: cabin bag only. Additional bags can be pre-purchased through Manage Booking.'],
    ['Can I upgrade from Economy to Business Class?', 'Yes — bid upgrades using SkyNova Miles or cash are available on eligible flights. Submit your upgrade bid through Manage Booking after purchasing your Economy ticket.'],
  ],
  related: [[<Star size={20}/>, 'Premium Economy', '/airline/premium-economy'], [<Briefcase size={20}/>, 'Business Class', '/airline/business-class'], [<Armchair size={20}/>, 'Seat Selection', '/airline/seat-selection'], [<Film size={20}/>, 'In-Flight Entertainment', '/airline/in-flight-entertainment'], [<UtensilsCrossed size={20}/>, 'In-Flight Dining', '/airline/in-flight-dining'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight']],
};

// ============================================================
// PREMIUM ECONOMY — dedicated structured layout
// ============================================================
// Every value below comes from ECONOMY_DATA / PREMIUM_ECONOMY_DATA and their FAQs.
const PE_COMPARE = [
  ['Seat pitch', '32–34 inches', '38–40 inches'],
  ['Seat width', '17–18 inches', '19–20 inches'],
  ['Recline', '4 inches', '8 inches'],
  ['Screen size', '9–13 inches', '13–15 inches'],
  ['Checked baggage', '1 × 23 kg', '2 × 23 kg'],
  ['Meals', 'Hot meal on 2h+ flights', '3-course on 6h+ flights'],
  ['Boarding', 'Standard', 'Priority — after First & Business'],
  ['Amenity kit', '—', 'On flights over 8 hours'],
];

function PremiumEconomyPageLayout({ cabin }) {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="pe-hero">
        <img className="pe-hero-img" src="/images/cabin/seat-legroom.jpg" alt="" aria-hidden="true" />
        <div className="pe-hero-inner">
          <div className="pe-eyebrow">{cabin.eyebrow}</div>
          <h1>{cabin.name}</h1>
          <p>{cabin.tagline}</p>
          <Link href="/airline/book-flight" className="al-btn-primary">Book {cabin.name} →</Link>
        </div>
      </section>

      {/* Comparison */}
      <section className="pe-compare">
        <div className="al-container">
          <div className="pe-head">
            <span className="pe-kicker">The Upgrade, Side by Side</span>
            <h2>Economy vs {cabin.name}</h2>
            <p>See exactly what changes when you step up — on every widebody long-haul flight.</p>
          </div>
          <div className="pe-table" role="table" aria-label={`Economy compared with ${cabin.name}`}>
            <div className="pe-row pe-row--head" role="row">
              <div role="columnheader" />
              <div role="columnheader">Economy</div>
              <div role="columnheader" className="pe-col-pe">{cabin.name}</div>
            </div>
            {PE_COMPARE.map(([label, eco, prem]) => (
              <div key={label} className="pe-row" role="row">
                <div role="rowheader">{label}</div>
                <div role="cell">{eco}</div>
                <div role="cell" className="pe-col-pe">{prem}</div>
              </div>
            ))}
          </div>
          <div className="pe-compare-cta">
            <Link href="/airline/economy-class" className="pe-link">Explore Economy Class →</Link>
            <Link href="/airline/manage-booking" className="pe-link">Upgrade through Manage Booking →</Link>
          </div>
        </div>
      </section>

      {/* Story + specs */}
      <section className="pe-story">
        <div className="al-container pe-story-grid">
          <div className="pe-story-text">
            <span className="pe-kicker">The Cabin</span>
            <h2>{cabin.descTitle}</h2>
            {cabin.descParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            <dl className="pe-specs">
              {cabin.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          </div>
          <div className="pe-story-media"><img src={cabin.img} alt={`${cabin.name} cabin`} /></div>
        </div>
      </section>

      {/* Amenities */}
      <section className="pe-amenities">
        <div className="al-container">
          <div className="pe-head"><span className="pe-kicker">What&apos;s Included</span><h2>Cabin Amenities</h2></div>
          <ol className="pe-amenity-grid">
            {cabin.amenities.map((a) => (
              <li key={a.title} className="pe-amenity">
                <span className="pe-amenity-icon">{a.icon}</span>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery */}
      <section className="pe-gallery">
        <div className="al-container pe-gallery-grid">
          {cabin.gallery.map((img, i) => (
            <figure key={i} className="pe-photo"><img src={img.src} alt={img.alt} /><figcaption>{img.alt}</figcaption></figure>
          ))}
        </div>
      </section>

      {/* Enquiry */}
      <section className="pe-enquiry">
        <div className="al-container">
          <div className="pe-enquiry-card">
            <div className="pe-enquiry-panel">
              <span className="pe-kicker pe-kicker--light">Upgrades &amp; Requests</span>
              <h2>Enquire About {cabin.name}</h2>
              <p>For specific requests, special occasions or upgrade enquiries, complete the form below.</p>
            </div>
            <form className="al-form pe-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Name</label><input required /></div>
              <div className="al-form-group"><label>Email</label><input type="email" required /></div>
              <div className="al-form-group"><label>Route</label><input placeholder="e.g. Mumbai to London" /></div>
              <div className="al-form-group"><label>Travel Date</label><input type="date" /></div>
              <div className="al-form-group full"><label>Special Requests</label><textarea placeholder="Meal preferences, special occasion, accessibility needs..." /></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Send Enquiry →</button></div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>{cabin.name} FAQs</h2></div>
          <div className="al-faqs">
            {cabin.faqs.map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {cabin.related.map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Cabin Notice:</strong> Cabin configurations and amenities may vary by aircraft type and route. Specific amenities are subject to change. Always confirm details at the time of booking.</div>
        </div>
      </section>
    </PageLayout>
  );
}

const PREMIUM_ECONOMY_DATA = {
  name: 'Premium Economy', eyebrow: 'The Art of Elevated Travel', color1: '#273dcd', color2: '#1f31a5',
  tagline: 'More space, considered dining and thoughtful service — a refined way to cross the world.',
  descTitle: 'More Room. More Time. More Care.',
  descParagraphs: [
    'Sanatan Airlines Premium Economy offers a step-change in comfort over Economy. Available on all widebody long-haul aircraft, the cabin features wider recline seats with 38–40 inches of pitch, priority boarding and a dedicated baggage allowance of 2 × 23 kg.',
    'The Premium Economy dining experience features a three-course meal on flights over 6 hours, printed menus and a wider selection of wines and spirits. Amenity kits are provided on ultra-long-haul services.',
  ],
  specs: [['Seat Pitch', '38–40 inches'], ['Seat Width', '19–20 inches'], ['Recline', '8 inches'], ['Screen Size', '13–15 inches'], ['Baggage', '2 × 23 kg'], ['Meals', '3-course on 6h+']],
  img: '/images/cabin/seat-legroom.jpg',
  amenities: [
    { icon: <Armchair size={20}/>, title: '38–40" Pitch Seat', desc: 'Up to 40% more legroom than Economy with wider seat and enhanced recline.' },
    { icon: <Star size={20}/>, title: 'Priority Boarding', desc: 'Board after First and Business Class — before other Economy passengers.' },
    { icon: <UtensilsCrossed size={20}/>, title: '3-Course Dining', desc: 'Three-course meal on flights over 6 hours with real china and metal cutlery.' },
    { icon: <BaggageClaim size={20}/>, title: 'Extra Baggage', desc: '2 × 23 kg checked bags — same as many Business Class fares.' },
    { icon: <Gift size={20}/>, title: 'Amenity Kit', desc: 'Provided on flights over 8 hours: eye mask, ear plugs, travel socks, lip balm.' },
    { icon: <Tv size={20}/>, title: '13–15" Screen', desc: 'Larger personal IFE screen with noise-cancelling headphone compatibility.' },
  ],
  gallery: [
    { src: '/images/cabin/seat-legroom.jpg', alt: 'Wide Premium Economy seats with leg rests' },
    { src: '/images/india/indian-curry.jpg', alt: 'A three-course style Indian meal' },
    { src: '/images/sa-about-family.jpg', alt: 'A family boarding early through the lounge' },
  ],
  faqs: [
    ['On which routes is Premium Economy available?', 'Premium Economy is available on all international routes operated by widebody aircraft (B787, A350, B777). It is not available on domestic or short-haul international routes.'],
    ['Can I upgrade from Economy to Premium Economy?', 'Yes — upgrades from Economy to Premium Economy are available as bid upgrades through Manage Booking, using SkyNova Miles or cash.'],
    ['How does the baggage allowance compare?', 'Premium Economy passengers receive 2 × 23 kg checked bags, compared to 1 × 23 kg in Economy Class on most routes.'],
    ['Is there a lounge benefit with Premium Economy?', 'Premium Economy passengers do not have lounge access as standard. Lounge access can be purchased separately at airport lounges or through SkyNova Gold/Platinum status.'],
    ['What is the cancellation policy for Premium Economy fares?', 'Premium Economy fares follow the same fare family rules as Economy (Light, Classic, Flex). Flex fares are fully refundable; Classic fares receive travel credit.'],
  ],
  related: [[<Plane size={20}/>, 'Economy Class', '/airline/economy-class'], [<Briefcase size={20}/>, 'Business Class', '/airline/business-class'], [<Crown size={20}/>, 'First Class', '/airline/first-class'], [<Armchair size={20}/>, 'Seat Selection', '/airline/seat-selection'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight'], [<Umbrella size={20}/>, 'Airport Lounges', '/airline/airport-lounges']],
};

// ============================================================
// BUSINESS CLASS — private-suite editorial layout
// ============================================================
function BusinessPage({ cabin }) {
  return (
    <PageLayout>
      <section className="bc-hero">
        <img className="bc-hero-img" src="/images/cabin/seat-business.jpg" alt="" aria-hidden="true" />
        <div className="bc-hero-shade" />
        <div className="bc-hero-inner">
          <div className="bc-eyebrow">{cabin.eyebrow}</div>
          <h1>{cabin.name}</h1>
          <p>{cabin.tagline}</p>
          <div className="bc-hero-actions">
            <Link href="/airline/book-flight" className="bc-btn bc-btn--gold">Reserve a Suite <span>→</span></Link>
            <Link href="/airline/airport-lounges" className="bc-btn bc-btn--ghost">Explore Lounges</Link>
          </div>
        </div>
      </section>

      <section className="bc-arrival" aria-label="Business Class highlights">
        <div className="al-container bc-arrival-grid">
          {cabin.specs.map(([label, value]) => (
            <div className="bc-arrival-item" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="bc-suite">
        <div className="al-container bc-suite-grid">
          <div className="bc-suite-media">
            <img src="/images/cabin/seat-business.jpg" alt="Private Sanatan Airlines Business Class suite" />
            <div className="bc-suite-badge"><strong>198</strong><span>cm<br />sleep space</span></div>
          </div>
          <div className="bc-suite-copy">
            <span className="bc-kicker">Your Private Space</span>
            <h2>{cabin.descTitle}</h2>
            {cabin.descParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <Link href="/airline/seat-selection" className="bc-text-link">View the cabin and seat map <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="bc-experience">
        <div className="al-container">
          <div className="bc-section-head">
            <span className="bc-kicker">Every Moment, Considered</span>
            <h2>The complete journey</h2>
          </div>
          <div className="bc-experience-grid">
            <article className="bc-experience-card bc-experience-card--lounge">
              <img src={cabin.gallery[2].src} alt={cabin.gallery[2].alt} />
              <div className="bc-card-shade" />
              <div className="bc-card-copy">
                <Umbrella size={22} />
                <span>01 / Before departure</span>
                <h3>Arrive unhurried</h3>
                <p>Begin in a Sanatan lounge with private work areas, shower suites and à la carte dining.</p>
                <Link href="/airline/airport-lounges">Explore lounge access →</Link>
              </div>
            </article>
            <article className="bc-experience-card bc-experience-card--dining">
              <img src={cabin.gallery[1].src} alt={cabin.gallery[1].alt} />
              <div className="bc-card-shade" />
              <div className="bc-card-copy">
                <UtensilsCrossed size={22} />
                <span>02 / On board</span>
                <h3>Dining at your rhythm</h3>
                <p>A four-course à la carte menu, served whenever you choose to dine.</p>
                <Link href="/airline/in-flight-dining">Discover the dining experience →</Link>
              </div>
            </article>
            <article className="bc-experience-card bc-experience-card--rest">
              <img src={cabin.gallery[0].src} alt={cabin.gallery[0].alt} />
              <div className="bc-card-shade" />
              <div className="bc-card-copy">
                <BedDouble size={22} />
                <span>03 / While you travel</span>
                <h3>Wake renewed</h3>
                <p>Convert your private suite into a fully flat bed with bedding prepared for rest.</p>
                <Link href="/airline/check-in">Plan your journey →</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bc-amenities">
        <div className="al-container">
          <div className="bc-section-head bc-section-head--left">
            <span className="bc-kicker">Included in your journey</span>
            <h2>Details that make the difference</h2>
          </div>
          <ol className="bc-amenity-grid">
            {cabin.amenities.map((amenity) => (
              <li className="bc-amenity" key={amenity.title}>
                <span className="bc-amenity-icon">{amenity.icon}</span>
                <h3>{amenity.title}</h3>
                <p>{amenity.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bc-gallery">
        <div className="bc-gallery-track">
          {cabin.gallery.map((image, index) => (
            <figure className={`bc-gallery-frame bc-gallery-frame--${index + 1}`} key={image.src}>
              <img src={image.src} alt={image.alt} />
              <figcaption>{image.alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bc-enquiry">
        <div className="al-container">
          <div className="bc-enquiry-card">
            <div className="bc-enquiry-copy">
              <span className="bc-kicker bc-kicker--light">Concierge</span>
              <h2>Personalise your Business journey</h2>
              <p>Share your route and preferences with our travel team for upgrade and occasion support.</p>
            </div>
            <form className="bc-form" onSubmit={(event) => event.preventDefault()}>
              <div className="bc-form-grid">
                <label>Name<input required /></label>
                <label>Email<input type="email" required /></label>
                <label>Route<input placeholder="Mumbai to London" /></label>
                <label>Travel date<input type="date" /></label>
                <label className="bc-form-wide">Special requests<textarea placeholder="Meal preferences, celebration or assistance..." /></label>
              </div>
              <button className="bc-btn bc-btn--gold" type="submit">Send enquiry <span>→</span></button>
            </form>
          </div>
        </div>
      </section>

      <section className="bc-faq">
        <div className="al-container bc-faq-grid">
          <div className="bc-faq-head">
            <span className="bc-kicker">Good to know</span>
            <h2>{cabin.name} questions</h2>
          </div>
          <div className="al-faqs">
            {cabin.faqs.map(([question, answer]) => (
              <details className="al-faq" key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bc-related">
        <div className="al-container">
          <div className="al-related">
            {cabin.related.map(([icon, label, href]) => (
              <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>
            ))}
          </div>
          <div className="al-disclaimer"><strong>Cabin notice:</strong> Suite configurations and amenities may vary by aircraft type and route. Confirm specific features at booking.</div>
        </div>
      </section>
    </PageLayout>
  );
}

const BUSINESS_DATA = {
  name: 'Business Class', eyebrow: 'Arrive Ready', color1: '#15216e', color2: '#2134ae',
  tagline: 'Lie-flat privacy suites, award-winning fine dining, and lounge access at every port.',
  descTitle: 'Business Class — Redefining the Journey',
  descParagraphs: [
    'Sanatan Airlines Business Class has been designed to ensure you arrive at your destination refreshed, focused and ready to perform. Our direct-aisle-access lie-flat suites on all widebody aircraft offer up to 198 cm of sleeping space — the longest in Indian aviation.',
    'Each suite features a 20-inch full-HD entertainment screen, a padded ottoman convertible to a guest seat, four-way lumbar support, a vanity mirror and storage for a full laptop bag within reach. Noise-cancelling headphones by Bose are standard.',
  ],
  specs: [['Lie-flat length', 'Up to 198 cm'], ['Seat Width', '21–24 inches'], ['Screen', '20" HD'], ['Baggage', '2 × 32 kg'], ['Lounge', 'Included'], ['Miles', '150% earning']],
  img: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=800&q=80',
  amenities: [
    { icon: <BedDouble size={20}/>, title: 'Lie-Flat Suite', desc: 'Full lie-flat bed up to 198 cm. Direct aisle access from every seat.' },
    { icon: <UtensilsCrossed size={20}/>, title: 'Fine Dining', desc: 'Four-course à la carte menu. Regional menus curated by Michelin-starred chefs.' },
    { icon: <Umbrella size={20}/>, title: 'Lounge Access', desc: 'Access to Sanatan Airlines Business Lounges at all Sanatan hubs. Includes shower, à la carte dining.' },
    { icon: <Headphones size={20}/>, title: 'Bose Headphones', desc: 'Premium Bose QuietComfort noise-cancelling headphones provided — yours for the flight.' },
    { icon: <Droplets size={20}/>, title: 'Wellness Kit', desc: 'Full amenity kit by Forest Essentials (India-exclusive). Includes pyjamas on 8h+ flights.' },
    { icon: <Wifi size={20}/>, title: 'Free Wi-Fi', desc: 'Complimentary Wi-Fi included on all Business Class seats — work or unwind, uninterrupted.' },
  ],
  gallery: [
    { src: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=600&q=80', alt: 'Business Class suite' },
    { src: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=600&q=80', alt: 'Business Class dining' },
    { src: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80', alt: 'Business Lounge' },
  ],
  faqs: [
    ['Is direct aisle access available on all aircraft?', 'Direct aisle access in a 1-2-1 or 1-1 configuration is standard on our A350 and B787. The B777 features a 1-2-1 Business configuration. All seats have privacy screens.'],
    ['What lounges can I access with a Business Class ticket?', 'Business Class passengers access Sanatan Airlines Business Lounges at all our hub airports. We also provide access to partner lounges at non-hub stations.'],
    ['Can I order special meals?', 'Yes — 20+ special meal types including Jain vegetarian, kosher, halal, vegan and medical diets are available. Order at least 48 hours before departure through Manage Booking.'],
    ['What is the upgrade process from Economy?', 'Upgrade bids can be placed from 72 hours up to 24 hours before departure via Manage Booking. Bids are accepted in SkyNova Miles or cash.'],
    ['What is the check-in experience for Business Class?', 'Dedicated Business Class check-in counters are available at all major airports. Fast-track security lanes are provided at Mumbai, Delhi, Chennai and Bengaluru.'],
  ],
  related: [[<Crown size={20}/>, 'First Class', '/airline/first-class'], [<Star size={20}/>, 'Premium Economy', '/airline/premium-economy'], [<Umbrella size={20}/>, 'Airport Lounges', '/airline/airport-lounges'], [<Armchair size={20}/>, 'Seat Selection', '/airline/seat-selection'], [<UtensilsCrossed size={20}/>, 'In-Flight Dining', '/airline/in-flight-dining'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight']],
};

const FIRST_CLASS_DATA = {
  name: 'First Class', eyebrow: 'The Pinnacle', color1: '#0e1547', color2: '#162376',
  tagline: 'Private suites. An onboard chef. A chauffeur to the gate. This is what truly luxurious air travel feels like.',
  descTitle: 'First Class — Your Own World at 40,000 Feet',
  descParagraphs: [
    'Sanatan Airlines First Class is offered on the Airbus A350-900 on ultra-long-haul routes. Each of the six First Class suites is a private enclosed space with a closing door, a 24-inch 4K entertainment screen, a full-size wardrobe and a vanity area. The double-width bed extends to 215 cm.',
    'An onboard chef prepares your meal to order from a menu designed by Michelin two-star executive chef. At your departure airport, a First Class chauffeur collects you in a luxury vehicle and drives you directly to the exclusive First Class terminal lounge.',
  ],
  specs: [['Suites', '6 private (door-close)'], ['Bed Length', '215 cm'], ['Screen', '24" 4K'], ['Baggage', '3 × 32 kg'], ['Chauffeur', 'Door to gate'], ['Chef', 'Onboard à la carte']],
  img: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=80',
  amenities: [
    { icon: <Car size={20}/>, title: 'Chauffeur Service', desc: 'Ground transport from your door to the First Class exclusive check-in area — included at no extra charge.' },
    { icon: <ChefHat size={20}/>, title: 'Onboard Chef', desc: 'Your personal chef prepares meals to order from a Michelin-inspired menu throughout the flight.' },
    { icon: <Droplets size={20}/>, title: 'Shower Spa', desc: 'Private shower suite onboard A350 First Class aircraft. 10 minutes of hot water included.' },
    { icon: <BedDouble size={20}/>, title: '215 cm Flat Bed', desc: 'Full-width flat bed converts from forward-facing chair. White duck-down duvet and 400-thread-count linen.' },
    { icon: <Lock size={20}/>, title: 'Closing Suite Door', desc: 'Full-height door provides total privacy for sleep, calls and work during the flight.' },
    { icon: <Gem size={20}/>, title: 'Luxury Amenity Kit', desc: 'Exclusive kit by La Mer — cleansing gel, moisturiser, eye serum. Pyjamas by Indian couturier.' },
  ],
  gallery: [
    { src: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=600&q=80', alt: 'First Class suite' },
    { src: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=600&q=80', alt: 'First Class dining' },
    { src: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80', alt: 'First Class lounge' },
  ],
  faqs: [
    ['On which routes is First Class available?', 'First Class is offered on Airbus A350 aircraft on our ultra-long-haul routes: Mumbai–London, Delhi–New York and Mumbai–Sydney. Routes are subject to seasonal schedules.'],
    ['How do I access the chauffeur service?', 'Chauffeur service is booked automatically for First Class passengers at participating cities. You will receive a booking confirmation and driver details 24 hours before departure.'],
    ['What is included in the Exclusive Lounge?', 'The First Class Lounge at Mumbai (T2) and Delhi (T3) offers private dining rooms, spa treatment cabins (60-minute treatment included), premium bar and sleeping suites.'],
    ['How many special meal requests can I make?', 'You can request up to three special meal preferences for a single flight in First Class, accommodating both religious and medical dietary requirements simultaneously.'],
    ['Is the shower suite on all First Class flights?', 'The shower suite is fitted only on the A350. Other widebody aircraft may have First Class seats without a shower. The booking tool clearly indicates whether a shower is available on your specific flight.'],
  ],
  related: [[<Briefcase size={20}/>, 'Business Class', '/airline/business-class'], [<Star size={20}/>, 'Premium Economy', '/airline/premium-economy'], [<Umbrella size={20}/>, 'Airport Lounges', '/airline/airport-lounges'], [<UtensilsCrossed size={20}/>, 'In-Flight Dining', '/airline/in-flight-dining'], [<Trophy size={20}/>, 'SkyNova Rewards', '/airline/skynova-rewards'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight']],
};

export function EconomyClassPage() { return <EconomyPage cabin={ECONOMY_DATA} />; }
export function PremiumEconomyPage() { return <PremiumEconomyPageLayout cabin={PREMIUM_ECONOMY_DATA} />; }
export function BusinessClassPage() { return <BusinessPage cabin={BUSINESS_DATA} />; }
export function FirstClassPage() { return <CabinPage cabin={FIRST_CLASS_DATA} />; }
