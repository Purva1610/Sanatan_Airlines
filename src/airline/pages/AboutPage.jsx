'use client';
import { Briefcase, Globe2, Leaf, Map, Mountain, Phone, Plane, Sparkles, Star, Target, Trophy, User } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';

const TIMELINE = [
  { year: '2001', event: 'Sanatan Airlines founded with a single Boeing 737-800 route between Mumbai and Delhi.' },
  { year: '2005', event: 'Fleet expanded to 12 aircraft. First international route launched: Mumbai–Dubai.' },
  { year: '2010', event: 'Business Class introduced. SkyNova Rewards programme launched with 500,000 founding members.' },
  { year: '2015', event: 'Joined Star Alliance. Network grows to 48 destinations across Asia, the Middle East and Europe.' },
  { year: '2019', event: 'First Class Suites unveiled on Airbus A350. Industry awards for best cabin design.' },
  { year: '2023', event: 'Sustainable Aviation Fuel programme launched. Carbon neutral by 2040 commitment signed.' },
  { year: '2026', event: 'Network reaches 85 destinations. 42 million passengers carried. 180-aircraft strong fleet.' },
];

const LEADERSHIP = [
  { name: 'Arjun Mehta', title: 'Chairman & Managing Director', note: 'Former Director General of Civil Aviation with 30 years of aviation leadership.' },
  { name: 'Priya Nair', title: 'Chief Executive Officer', note: 'Led three airline turnarounds across Asia-Pacific. MBA, INSEAD.' },
  { name: 'Vikram Sharma', title: 'Chief Commercial Officer', note: 'Architect of the SkyNova Rewards programme and global alliance strategy.' },
  { name: 'Deepa Krishnaswamy', title: 'Chief Operating Officer', note: 'On-time performance champion. 99.1% dispatch reliability under her tenure.' },
];

const AWARDS = [
  { icon: <Trophy size={20}/>, title: 'Best Airline in India', body: 'Skytrax World Airline Awards 2024, 2025' },
  { icon: <Star size={20}/>, title: '5-Star Airline', body: 'Skytrax 5-Star certification, third consecutive year' },
  { icon: <Leaf size={20}/>, title: 'Sustainability Leader', body: 'IATA Environmental Achievement Award 2025' },
  { icon: <Briefcase size={20}/>, title: 'Best Business Class Asia', body: 'Business Traveller Asia-Pacific Awards 2025' },
];

export default function AboutPage() {
  const { t } = useI18n();
  return (
    <PageLayout>
      {/* HERO */}
      {/* -- EDITORIAL HERO: full-height split -- */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 600 }}>
        {/* Left — full photo */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1200&q=85" alt="Sanatan Airlines" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, var(--al-dark) 100%)' }} />
        </div>
        {/* Right — editorial text */}
        <div style={{ background: 'var(--al-dark)', padding: 'clamp(40px,6vw,80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--al-flame)', marginBottom: 20 }}>Est. 2001 · Our Story</div>
          {/* Pull quote */}
          <blockquote style={{ borderLeft: '3px solid var(--al-flame)', paddingLeft: 24, marginBottom: 32 }}>
            <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.3, fontStyle: 'italic' }}>"We carry people to the moments that matter most."</p>
          </blockquote>
          <p style={{ fontSize: 15, color: 'rgba(215,242,250,0.65)', lineHeight: 1.7, marginBottom: 36 }}>For 25 years, Sanatan Airlines has connected India to the world — from a single Mumbai–Delhi route to 85 destinations on 6 continents.</p>
          <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
            {[['180+','Aircraft'],['28k+','Employees'],['42M+','Passengers/yr']].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontSize: 'clamp(20px,2vw,28px)', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(215,242,250,0.5)', marginTop: 4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/airline/our-fleet" className="al-btn-primary">Explore Our Fleet ?</Link>
            <Link href="/airline/contact" className="al-btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* -- STORY PARAGRAPH -- */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-desc">
            <div className="al-desc-text">
              <h2>A Quarter Century of Flight</h2>
              <p>Sanatan Airlines began in 2001 as a single-route domestic carrier with a vision to make air travel accessible, reliable and genuinely enjoyable for every Indian. Today, we operate 180 aircraft across 85 destinations on 6 continents, employing over 28,000 aviation professionals.</p>
              <p>Our mission remains unchanged: to connect people with the world while providing an experience that feels personal, warm and excellent at every stage of the journey. We call this the Sanatan Promise.</p>
              <p>Guided by a belief that aviation can be both world-class and responsible, we lead India's commercial aviation sector in sustainable practices, operational reliability and customer satisfaction.</p>
            </div>
            <div className="al-desc-img">
              <img src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80" alt="Cabin interior" />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION VISION */}
      <section className="al-section al-section--sky">
        <div className="al-container">
          <div className="al-two-col">
            <div className="al-card" style={{ padding: 40 }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}><Target size={20}/></div>
              <h3 style={{ fontSize: 22, marginBottom: 12 }}>Our Mission</h3>
              <p style={{ fontSize: 15, lineHeight: 1.75 }}>To deliver safe, reliable and outstanding air travel that connects people to their aspirations — made possible by the dedication of our team, the trust of our passengers and the precision of our operations.</p>
            </div>
            <div className="al-card" style={{ padding: 40 }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}><Sparkles size={20}/></div>
              <h3 style={{ fontSize: 22, marginBottom: 12 }}>Our Vision</h3>
              <p style={{ fontSize: 15, lineHeight: 1.75 }}>To be Asia's most admired airline — recognised for safety, service excellence and sustainability — while making every passenger feel they are the most important person on board.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header">
            <div className="al-section-eyebrow">Our Journey</div>
            <h2>25 Years in the Skies</h2>
          </div>
          <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
            {/* Centre spine */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'var(--al-line)', transform: 'translateX(-50%)' }} />
            {TIMELINE.map((t, i) => {
              const left = i % 2 === 0;
              return (
                <div key={t.year} style={{ display: 'flex', justifyContent: left ? 'flex-start' : 'flex-end', marginBottom: 40, position: 'relative' }}>
                  {/* Year badge on spine */}
                  <div style={{ position: 'absolute', left: '50%', top: 12, transform: 'translateX(-50%)', width: 64, textAlign: 'center', background: 'var(--al-navy)', color: '#fff', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', borderRadius: 20, padding: '4px 10px', zIndex: 2 }}>{t.year}</div>
                  {/* Card */}
                  <div style={{ width: 'calc(50% - 56px)', background: '#fff', border: '1.5px solid var(--al-line)', borderRadius: 'var(--al-radius-lg)', padding: '18px 22px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', marginLeft: left ? 0 : 'auto', marginRight: left ? 'auto' : 0 }}>
                    <p style={{ fontSize: 14, color: 'var(--al-muted)', lineHeight: 1.65, margin: 0 }}>{t.event}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header">
            <div className="al-section-eyebrow">Leadership</div>
            <h2>Guided by Experience</h2>
          </div>
          <div className="al-cards al-cards--4">
            {LEADERSHIP.map((l) => (
              <div key={l.name} className="al-card" style={{ textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--al-flame-light)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}><User size={20}/></div>
                <h3 style={{ marginBottom: 4 }}>{l.name}</h3>
                <div style={{ fontSize: 12, color: 'var(--al-flame)', fontWeight: 700, marginBottom: 10 }}>{l.title}</div>
                <p>{l.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header">
            <div className="al-section-eyebrow">Recognition</div>
            <h2>Industry Awards & Certifications</h2>
          </div>
          <div className="al-cards al-cards--4">
            {AWARDS.map((a) => (
              <div key={a.title} className="al-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{a.icon}</div>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL NETWORK */}
      <section className="al-section al-section--navy">
        <div className="al-container">
          <div className="al-section-header">
            <div className="al-section-eyebrow">Global Network</div>
            <h2>85 Destinations, 6 Continents</h2>
            <p className="al-section-lead">From the Himalayan foothills to the fjords of Norway — Sanatan Airlines flies where it matters.</p>
          </div>
          <div className="al-cards al-cards--3">
            {[
              { icon: <Globe2 size={28} color='#fff'/>, region: 'Asia-Pacific', count: '45 destinations' },
              { icon: <Globe2 size={28} color='#fff'/>, region: 'Europe', count: '18 destinations' },
              { icon: <Map size={28} color='#fff'/>, region: 'Americas', count: '10 destinations' },
              { icon: <Mountain size={28} color='#fff'/>, region: 'Middle East', count: '8 destinations' },
              { icon: <Globe2 size={28} color='#fff'/>, region: 'Africa', count: '4 destinations' },
              { icon: <Map size={28} color='#fff'/>, region: 'Domestic India', count: '28 destinations' },
            ].map(({ icon, region, count }) => (
              <div key={region} className="al-card" style={{ background: 'rgba(255,255,255,0.13)', borderColor: 'rgba(255,255,255,0.22)' }}>
                <div style={{ marginBottom: 10 }}>{icon}</div>
                <h3 style={{ color: '#fff' }}>{region}</h3>
                <p style={{ color: 'rgba(215,242,250,0.8)' }}>{count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-desc">
            <div className="al-desc-img">
              <img src="https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=800&q=80" alt="Sustainable skies" />
            </div>
            <div className="al-desc-text">
              <h2>Our Commitment to the Planet</h2>
              <p>We believe the skies we fly in must be protected. Our sustainability roadmap targets carbon neutrality by 2040 through investment in Sustainable Aviation Fuel, next-generation fuel-efficient aircraft and a passenger carbon offset programme.</p>
              <p>In 2025, we replaced 15% of fuel consumption with SAF — the highest ratio among Indian carriers. Our newest A350s burn 25% less fuel per seat-kilometre than the aircraft they replaced.</p>
              <Link href="/airline/sustainability" className="al-btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>Read Our Sustainability Report ?</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-form-wrap">
            <h2>Media & Investor Enquiries</h2>
            <p>For press briefings, annual report requests or investor relations, complete the form below and our team will respond within one business day.</p>
            <form className="al-form" onSubmit={e => e.preventDefault()}>
              <div className="al-form-group"><label>Full Name</label><input required placeholder="Your name" /></div>
              <div className="al-form-group"><label>Organisation</label><input placeholder="Company or publication" /></div>
              <div className="al-form-group"><label>Email</label><input type="email" required placeholder="you@example.com" /></div>
              <div className="al-form-group"><label>Phone</label><input type="tel" placeholder="+91 98765 43210" /></div>
              <div className="al-form-group full"><label>Enquiry Type</label><select><option>Media / Press</option><option>Investor Relations</option><option>Partnership</option><option>Other</option></select></div>
              <div className="al-form-group full"><label>Message</label><textarea placeholder="Briefly describe your enquiry..." /></div>
              <div className="al-form-actions"><button className="al-btn-primary" type="submit">Submit Enquiry ?</button></div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-section-header"><h2>Frequently Asked Questions</h2></div>
          <div className="al-faqs">
            {[
              ['Who owns Sanatan Airlines?', 'Sanatan Airlines is a privately held Indian carrier incorporated under the Companies Act 2013, with majority shareholding held by the Mehta Family Office alongside institutional investors.'],
              ['Is Sanatan Airlines IATA certified?', 'Yes. We hold full IATA membership and comply with all IATA Operational Safety Audit (IOSA) standards. Our certificate is renewed every two years.'],
              ['How many employees does Sanatan Airlines have?', 'We employ over 28,000 aviation professionals across pilots, cabin crew, engineers, ground staff and corporate functions.'],
              ['Does Sanatan Airlines have a loyalty programme?', 'Yes — SkyNova Rewards has four tiers: Blue, Silver, Gold and Platinum. Members earn miles on flights, hotels and partner purchases.'],
              ['What is Sanatan Airlines\' on-time performance?', 'We have maintained a 94.3% on-time departure rate over the past 12 months — the highest among Indian carriers.'],
              ['How can I apply for a job at Sanatan Airlines?', 'Visit our Careers page to see open positions. Applications are accepted online through our recruitment portal.'],
            ].map(([q, a]) => (
              <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header"><h2>Explore More</h2></div>
          <div className="al-related">
            {[[<Plane size={20}/>, 'Our Fleet', '/airline/our-fleet'], [<Globe2 size={20}/>, 'Destinations', '/airline/destinations'], [<Trophy size={20}/>, 'SkyNova Rewards', '/airline/skynova-rewards'], [<Leaf size={20}/>, 'Sustainability', '/airline/sustainability'], [<Phone size={20}/>, 'Contact Us', '/airline/contact'], [<Briefcase size={20}/>, 'Corporate Travel', '/airline/corporate-travel']].map(([icon, label, href]) => (
              <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-disclaimer"><strong>Regulatory Notice:</strong> Sanatan Airlines operates under a valid Air Operator Certificate (AOC) issued by the Directorate General of Civil Aviation (DGCA), Government of India. All routes operate subject to bilateral air services agreements and regulatory approvals.</div>
        </div>
      </section>
    </PageLayout>
  );
}
