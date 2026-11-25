'use client';
import { Accessibility, Briefcase, Brain, ClipboardList, Clock, Crown, Eye, Film, GraduationCap, HandHelping, Headphones, HeartPulse, Mail, Phone, Plane, Star, UserCog } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';

// ============================================================
// IN-FLIGHT DINING (Page 26)
// ============================================================
export function InFlightDiningPage() {
  const specialMeals = [
    'Vegetarian (Indian, Lacto)', 'Vegan (strict plant-based)', 'Jain (no root vegetables)',
    'Hindu non-vegetarian', 'Islamic (Halal)', 'Kosher (Rabbi certified)',
    'Asian vegetarian', 'Low calorie (<400 kcal)', 'Low sodium / low salt',
    'Low fat / low cholesterol', 'Diabetic meal', 'Gluten-free',
    'Bland / soft diet (medical)', 'Fruit platter', 'Child meal (2–11 years)',
    'Infant meal (under 2 years)', 'High protein meal', 'High fibre meal',
  ];
  return (
    <PageLayout>
      <section className="fd-hero">
        <img className="fd-hero-img" src="/images/india/indian-thali.jpg" alt="" aria-hidden="true" />
        <div className="fd-hero-shade" />
        <div className="fd-hero-inner">
          <div className="fd-eyebrow">Dining at 40,000 feet</div>
          <h1>Crafted for the <em>journey.</em></h1>
          <p>Regional Indian flavours, thoughtful international menus and a service that arrives at your rhythm.</p>
          <div className="fd-hero-actions">
            <Link href="/airline/manage-booking" className="fd-btn fd-btn--gold">Order a special meal <span>→</span></Link>
            <Link href="#fd-menu" className="fd-btn fd-btn--ghost">View the experience</Link>
          </div>
        </div>
      </section>

      <section className="fd-cabin-strip" aria-label="Dining by cabin">
        <div className="al-container fd-cabin-grid">
          {[
            ['01', 'Economy', 'Fresh regional favourites'],
            ['02', 'Premium Economy', 'Three-course service'],
            ['03', 'Business', 'À la carte dining'],
            ['04', 'First', 'Prepared to order'],
          ].map(([no, cabin, detail]) => (
            <div className="fd-cabin-item" key={cabin}><span>{no}</span><strong>{cabin}</strong><small>{detail}</small></div>
          ))}
        </div>
      </section>

      <section className="fd-intro" id="fd-menu">
        <div className="al-container fd-intro-grid">
          <div className="fd-intro-copy">
            <span className="fd-kicker">The art of in-flight dining</span>
            <h2>A menu shaped by place</h2>
            <p>Our chefs draw from India’s regional kitchens and international culinary traditions, balancing freshness, flavour and the particular pace of travel.</p>
            <p>From a warm regional breakfast to a multi-course evening service, every dish is designed to be served beautifully at altitude.</p>
          </div>
          <figure className="fd-intro-media">
            <img src="https://images.unsplash.com/photo-1517479149777-5f5b2ca5ce5d?w=900&q=85" alt="A considered airline dining service" />
            <figcaption>Seasonal menus · Regional produce · Thoughtful pairings</figcaption>
          </figure>
        </div>
      </section>

      <section className="fd-cabin-menus">
        <div className="al-container">
          <div className="fd-section-head">
            <span className="fd-kicker">By cabin</span>
            <h2>The level of care rises with you</h2>
          </div>
          <div className="fd-menu-grid">
            {[
              { no: '01', cabin: 'Economy', icon: <Plane size={20}/>, menu: 'Hot meal on flights over 2 hours, with regional Indian or continental choices.', detail: 'Unlimited non-alcoholic beverages.', image: '/images/india/indian-thali.jpg' },
              { no: '02', cabin: 'Premium Economy', icon: <Star size={20}/>, menu: 'Three-course dining on 6h+ flights with printed menu and wine selection.', detail: 'Real china and metal cutlery.', image: '/images/india/indian-curry.jpg' },
              { no: '03', cabin: 'Business', icon: <Briefcase size={20}/>, menu: 'Four-course à la carte dining at a time that suits you, with seasonal regional menus.', detail: 'Champagne and curated wine pairings.', image: 'https://images.unsplash.com/photo-1517479149777-5f5b2ca5ce5d?w=900&q=85' },
              { no: '04', cabin: 'First', icon: <Crown size={20}/>, menu: 'An entirely bespoke meal experience prepared and presented by your onboard chef.', detail: 'Exclusive wines and private dining.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=85' },
            ].map((m) => (
              <article className="fd-menu-card" key={m.cabin}>
                <div className="fd-menu-image"><img src={m.image} alt={`${m.cabin} dining experience`} /><span>{m.no}</span></div>
                <div className="fd-menu-copy">
                  <div className="fd-menu-title">{m.icon}<h3>{m.cabin}</h3></div>
                  <p>{m.menu}</p>
                  <small>{m.detail}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fd-tasting">
        <div className="al-container fd-tasting-grid">
          <figure className="fd-tasting-media">
            <img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1000&q=85" alt="A seasonal Business Class dining menu" />
          </figure>
          <div className="fd-tasting-copy">
            <span className="fd-kicker">A sample journey · Mumbai to London</span>
            <h2>Business Class menu</h2>
            <div className="fd-course">
              <span>01 · Starters</span>
              <p>Avocado and mango salad · Murgh tikka · Smoked salmon blini</p>
            </div>
            <div className="fd-course">
              <span>02 · Main course</span>
              <p>Butter chicken with saffron basmati · Pan-roasted sea bass · Vegan roasted pepper</p>
            </div>
            <div className="fd-course">
              <span>03 · Dessert</span>
              <p>Gulab jamun · Vanilla kulfi · Warm chocolate fondant</p>
            </div>
          </div>
        </div>
      </section>

      <section className="fd-specials">
        <div className="al-container">
          <div className="fd-specials-head">
            <div><span className="fd-kicker">Special meals</span><h2>Every preference considered</h2></div>
            <p>18 meal options, available at no charge when ordered at least 48 hours before departure.</p>
          </div>
          <div className="fd-meal-grid">
            {specialMeals.map((meal, index) => (
              <article className="fd-meal" key={meal}><span>{String(index + 1).padStart(2, '0')}</span><strong>{meal}</strong></article>
            ))}
          </div>
        </div>
      </section>

      <section className="fd-order">
        <div className="al-container fd-order-card">
          <div className="fd-order-copy">
            <span className="fd-kicker fd-kicker--light">Meal preferences</span>
            <h2>Make the menu yours</h2>
            <p>Use Manage Booking with your PNR to add a meal preference up to 48 hours before departure.</p>
          </div>
          <div className="fd-order-actions">
            <Link href="/airline/manage-booking" className="fd-btn fd-btn--gold">Manage your booking <span>→</span></Link>
            <Link href="/airline/contact" className="fd-btn fd-btn--ghost">Contact our team</Link>
          </div>
        </div>
      </section>

      <section className="fd-faq">
        <div className="al-container">
          <div className="fd-faq-grid">
            <div className="fd-faq-head">
              <span className="fd-kicker">Good to know</span>
              <h2>Dining FAQs</h2>
            </div>
            <div className="al-faqs">
            {[
              ['What if I forget to order a special meal?', 'If the 48-hour window has passed, please inform a crew member as early as possible after boarding. We always carry additional vegetarian and Jain meal options, though they cannot be guaranteed on all flights.'],
              ['Are Economy meals freshly prepared?', 'Economy Class meals are prepared by our catering partners in certified airline kitchens and freshly loaded for each flight. Business and First Class meals are prepared on board where kitchen facilities allow.'],
              ['Can I request a specific regional Indian cuisine?', 'On selected routes, our Economy menu includes a regional Indian cuisine option (e.g. South Indian thali on Chennai routes, Gujarati thali on Ahmedabad routes). Business Class has seasonal regional Indian menus throughout the year.'],
              ['Is alcohol served in Economy?', 'Yes — wine, beer and spirits are available in Economy Class for purchase on domestic routes and complimentary on international routes over 3 hours.'],
              ['What if I have a severe allergy?', 'Passengers with severe allergies (tree nuts, peanuts, shellfish) should inform us at least 72 hours before departure. We cannot guarantee an entirely allergen-free environment on board, so carrying an EpiPen is strongly recommended.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
            </div>
          </div>
        </div>
      </section>

      <section className="fd-related">
        <div className="al-container">
          <div className="al-related">
            {[[<Film size={20}/>, 'In-Flight Entertainment', '/airline/in-flight-entertainment'], [<Plane size={20}/>, 'Economy Class', '/airline/economy-class'], [<Briefcase size={20}/>, 'Business Class', '/airline/business-class'], [<Crown size={20}/>, 'First Class', '/airline/first-class'], [<ClipboardList size={20}/>, 'Manage Booking', '/airline/manage-booking'], [<Plane size={20}/>, 'Book a Flight', '/airline/book-flight']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Allergen Notice:</strong> While every care is taken in meal preparation, Sanatan Airlines cannot guarantee that any meal is entirely free of specific allergens. Passengers with life-threatening allergies must carry appropriate medication.</div>
        </div>
      </section>
    </PageLayout>
  );
}

// ============================================================
// SPECIAL ASSISTANCE PRM (Page 27)
// ============================================================
export function SpecialAssistancePage() {
  return (
    <PageLayout>
      <section className="sa2-hero">
        <div className="sa2-hero-copy">
          <div className="sa2-eyebrow"><Accessibility size={15}/> Accessible travel, personally coordinated</div>
          <h1>From curbside to<br /><em>the cabin.</em></h1>
          <p>One thoughtful point of support for every step of your journey — with dedicated airport assistance available throughout.</p>
          <div className="sa2-hero-actions">
            <Link href="#prm-form" className="sa2-btn sa2-btn--coral">Request assistance <span>→</span></Link>
            <Link href="/airline/wheelchair-assistance" className="sa2-btn sa2-btn--link">Explore wheelchair support</Link>
          </div>
          <div className="sa2-trust"><HeartPulse size={17}/><span>Provided free of charge</span><i/><span>48-hour recommended notice</span></div>
        </div>
        <figure className="sa2-hero-visual">
          <img src="/images/sa-about-family.jpg" alt="A family receiving welcoming airport assistance" />
          <div className="sa2-journey-card">
            <span>Your assistance journey</span>
            <div><b>01</b><strong>Airport arrival</strong></div>
            <div><b>02</b><strong>Check-in support</strong></div>
            <div><b>03</b><strong>Boarding & onward</strong></div>
          </div>
        </figure>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Our Services</div><h2>How We Can Help</h2></div>
          <div className="al-cards">
            {[
              { icon: <Accessibility size={20}/>, t: 'Wheelchair Assistance', d: 'Manual or electric wheelchair assistance from check-in through boarding. WCHC (fully dependent), WCHS (steps) and WCHR (ramp) categories available.' },
              { icon: <HandHelping size={20}/>, t: 'Meet & Assist', d: 'A dedicated assistance agent meets you at the airport entrance and accompanies you to the gate or aircraft.' },
              { icon: <Eye size={20}/>, t: 'Vision Impairment', d: 'Braille safety cards, audio IFE and a dedicated agent escort from check-in to seat for visually impaired passengers.' },
              { icon: <Headphones size={20}/>, t: 'Hearing Impairment', d: 'Visual announcements, text-based communication at all service points, and loop system at selected counters.' },
              { icon: <HeartPulse size={20}/>, t: 'Travelling with Medication', d: 'Passengers requiring injections or refrigerated medication should inform us at booking. Dedicated medical storage is available.' },
              { icon: <Brain size={20}/>, t: 'Hidden Disabilities', d: 'We recognise hidden disabilities. Our Sunflower Lanyard programme ensures quiet assistance without the need for explanation.' },
            ].map((s) => <div key={s.t} className="al-card"><div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div><h3>{s.t}</h3><p>{s.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">Step by Step</div><h2>How to Request Assistance</h2></div>
          <div className="al-steps">
            {[
              { n: '01', icon: <ClipboardList size={20}/>, t: 'Book Your Flight', d: 'Book normally on our website or through any channel.' },
              { n: '02', icon: <HandHelping size={20}/>, t: 'Request Assistance', d: 'During booking or through Manage Booking, select your required assistance type. Minimum 48 hours before departure.' },
              { n: '03', icon: <Mail size={20}/>, t: 'Confirm', d: 'Receive a confirmation that your assistance has been registered and instructions for your arrival.' },
              { n: '04', icon: <Clock size={20}/>, t: 'Arrive Early', d: 'Arrive at least 2 hours before departure (domestic) or 3 hours (international) to allow time for assistance.' },
              { n: '05', icon: <Plane size={20}/>, t: 'We Take It From Here', d: 'Our trained team meets you on arrival and accompanies you to your seat.' },
            ].map((s) => <div key={s.n} className="al-step"><div className="al-step-num">{s.n}</div><div className="al-step-icon">{s.icon}</div><h3>{s.t}</h3><p>{s.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="al-section" id="prm-form">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>Request Special Assistance</h2>
            <p>Complete the form at least 48 hours before your flight. For complex medical needs, please contact us at least 72 hours in advance.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Passenger Name</label><input required /></div>
              <div className="al-form-group"><label>Booking Reference</label><input required /></div>
              <div className="al-form-group"><label>Email</label><input type="email" required /></div>
              <div className="al-form-group"><label>Phone</label><input type="tel" /></div>
              <div className="al-form-group"><label>Type of Assistance</label>
                <select>
                  <option>Wheelchair — cannot walk stairs (WCHS)</option>
                  <option>Wheelchair — cannot walk at all (WCHC)</option>
                  <option>Wheelchair — cannot walk far (WCHR)</option>
                  <option>Meet & Assist (walking, orientation support)</option>
                  <option>Visual impairment assistance</option>
                  <option>Hearing impairment assistance</option>
                  <option>Hidden disability (Sunflower programme)</option>
                  <option>Travelling with oxygen or medical equipment</option>
                  <option>Other — please specify below</option>
                </select>
              </div>
              <div className="al-form-group full"><label>Additional Details</label><textarea placeholder="Describe your specific requirements, medical equipment, or anything we should know..." /></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Submit Assistance Request →</button></div>
            </form>
          </div>
        </div>
      </section>

      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header"><h2>Special Assistance FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['Is there a charge for special assistance?', 'No — all Sanatan Airlines special assistance services are provided free of charge to passengers who require them.'],
              ['Can I bring my own manual wheelchair?', 'Yes — your own manual wheelchair may be checked in free of charge in addition to your baggage allowance. It will be loaded in the hold and returned at the aircraft door on arrival.'],
              ['Can I bring a battery-powered wheelchair?', 'Battery-powered wheelchairs require prior approval based on battery type (dry cell, gel, lithium). Notify us at least 72 hours before departure. See our Wheelchair Assistance page for detailed battery requirements.'],
              ['What if my condition changes after booking?', 'You can add or modify an assistance request at any time through Manage Booking or by calling our Contact Centre. The more notice you give, the better we can prepare.'],
              ['Are assistance dogs accepted in the cabin?', 'Registered guide dogs and hearing dogs for passengers with certified disabilities are accepted in the cabin on domestic and selected international routes, subject to destination country regulations.'],
            ].map(([q, a]) => <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<Accessibility size={20}/>, 'Wheelchair Assistance', '/airline/wheelchair-assistance'], [<GraduationCap size={20}/>, 'Unaccompanied Minors', '/airline/unaccompanied-minors'], [<HeartPulse size={20}/>, 'Medical Clearance', '/airline/medical-clearance'], [<UserCog size={20}/>, 'Senior Fares', '/airline/senior-fares'], [<ClipboardList size={20}/>, 'Manage Booking', '/airline/manage-booking'], [<Phone size={20}/>, 'Contact Us', '/airline/contact']].map(([icon, label, href]) => <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>)}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Accessibility Commitment:</strong> Sanatan Airlines complies with DGCA CAR Section 3, Series M, Part IV on Carriage of Persons with Disabilities. We are committed to treating all passengers with dignity and respect.</div>
        </div>
      </section>
    </PageLayout>
  );
}
