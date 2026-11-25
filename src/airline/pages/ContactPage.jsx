'use client';
import { Accessibility, CheckCircle, ClipboardList, Info, Mail, MapPin, MessageCircle, Phone, PlaneTakeoff, Smartphone, Trophy } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';
import { getContact, OFFICE_ADDRESS } from '../../contactConfig.js';

const OFFICES = [
  { city: 'Kolhapur', address: OFFICE_ADDRESS, phone: null, hours: null },
];

export default function ContactPage() {
  const { t } = useI18n();
  const contact = getContact();
  return (
    <PageLayout>
      {/* ── FLAME HERO — distinct from every navy hero ── */}
      <section style={{ background: 'linear-gradient(135deg, #9a370c 0%, #c0480c 50%, #c0480c 100%)', padding: 'clamp(56px,8vw,100px) 24px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circle */}
        <div style={{ position: 'absolute', right: -120, top: -120, width: 480, height: 480, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 60, bottom: -80, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'var(--al-container)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 600 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: 12 }}>We Are Here to Help</div>
            <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>Contact<br />Sanatan Airlines</h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', lineHeight: 1.65 }}>For aviation coordination, membership, franchise and global-service enquiries, use the approved contact channels shown here.</p>
            {/* Quick channels inline */}
            <div style={{ display: 'flex', gap: 24, marginTop: 32, flexWrap: 'wrap' }}>
              {(contact.phone ? [['📞', contact.phone.label, 'Verified phone']] : []).concat(contact.email ? [['✉', contact.email, 'Verified email']] : []).concat(contact.whatsapp ? [['WhatsApp', 'Open approved channel', 'Contact via WhatsApp']] : []).map(([ic,val,note]) => (
                <div key={val} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{ic}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{val}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>{note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick contact channels */}
      <section className="al-section al-section--sky">
        <div className="al-container">
          <div className="al-cards al-cards--4">
            {[
              ...(contact.phone ? [{ icon: <Phone size={20}/>, channel: 'Phone', detail: contact.phone.label, note: contact.hours || 'Verified contact channel' }] : []),
              ...(contact.email ? [{ icon: <Mail size={20}/>, channel: 'Email', detail: contact.email, note: 'Use for general service enquiries' }] : []),
              ...(contact.whatsapp ? [{ icon: <Smartphone size={20}/>, channel: 'WhatsApp', detail: 'Open approved WhatsApp channel', note: 'Messaging availability is confirmed with the team' }] : []),
              { icon: <MessageCircle size={20}/>, channel: 'Enquiry form', detail: 'Send a service-specific enquiry', note: 'No booking or service outcome is implied' },
            ].map((c) => (
              <div key={c.channel} className="al-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{c.icon}</div>
                <h3>{c.channel}</h3>
                <div style={{ fontWeight: 700, color: 'var(--al-navy)', marginBottom: 8, fontSize: 14 }}>{c.detail}</div>
                <p>{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complaint form */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-two-col">
            <div>
              <div className="al-section-eyebrow">Get in Touch</div>
              <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(24px,3vw,36px)', marginBottom: 20 }}>Send Us a Message</h2>
              <p style={{ fontSize: 15, color: 'var(--al-muted)', lineHeight: 1.75, marginBottom: 20 }}>Use this form for general enquiries, feedback or complaints. Do not include passport, medical, payment or account credentials.</p>
              <ul className="al-list">
                <li>Booking queries and changes</li>
                <li>Refund and compensation claims</li>
                <li>Lost and damaged baggage</li>
                <li>Accessibility and special assistance</li>
                <li>Feedback and compliments</li>
                <li>Media and PR enquiries</li>
              </ul>
            </div>
            <div className="al-form-wrap" style={{ padding: 32 }}>
              <form className="al-form" style={{ gridTemplateColumns: '1fr 1fr' }} onSubmit={e => e.preventDefault()}>
                <div className="al-form-group"><label>Full Name</label><input required placeholder="Your name" /></div>
                <div className="al-form-group"><label>Email</label><input type="email" required placeholder="you@example.com" /></div>
                <div className="al-form-group"><label>Phone</label><input type="tel" placeholder="+91 98765 43210" /></div>
                <div className="al-form-group"><label>Booking Reference (if applicable)</label><input placeholder="e.g. SN2024ABC" /></div>
                <div className="al-form-group" style={{ gridColumn: '1 / -1' }}><label>Category</label>
                  <select>
                    <option>General Enquiry</option>
                    <option>Booking / Ticketing</option>
                    <option>Baggage Complaint</option>
                    <option>Flight Delay / Cancellation</option>
                    <option>Refund Request</option>
                    <option>Accessibility Assistance</option>
                    <option>Compliment / Feedback</option>
                    <option>Media / PR</option>
                  </select>
                </div>
                <div className="al-form-group" style={{ gridColumn: '1 / -1' }}><label>Message</label><textarea required placeholder="Describe your enquiry..." style={{ minHeight: 120 }} /></div>
                <div className="al-form-actions" style={{ gridColumn: '1 / -1' }}><button className="al-btn-primary" type="submit">Send Message →</button></div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Airport offices */}
      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header"><div className="al-section-eyebrow">At the Airport</div><h2>Our Office Locations</h2></div>
          <div className="al-cards al-cards--3">
            {OFFICES.map((o) => (
              <div key={o.city} className="al-card">
                <div style={{ marginBottom: 10, color: 'var(--al-navy)' }}><MapPin size={22}/></div>
                <h3>{o.city}</h3>
                <p style={{ marginBottom: 8 }}>{o.address}</p>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--al-navy)', marginBottom: 4 }}>{o.phone}</div>
                <div style={{ fontSize: 13, color: 'var(--al-flame)' }}>{o.hours}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="al-section">
        <div className="al-container">
          <div className="al-gallery">
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=600&q=80" alt="Airport service desk" /></div>
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1521791055366-0d553872952f?w=600&q=80" alt="Customer service" /></div>
            <div className="al-gallery-img"><img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80" alt="Mobile support" /></div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="al-section al-section--light">
        <div className="al-container">
          <div className="al-section-header"><h2>Contact FAQs</h2></div>
          <div className="al-faqs">
            {[
              ['What is the fastest way to contact the team?', 'Use the verified phone or email channel shown above, or send an enquiry through the form. Confirmation timing depends on the service team.'],
              ['How long does a refund take?', 'Refund or cancellation terms depend on the applicable service and must be confirmed in writing before commitment. No refund entitlement is assumed by this website.'],
              ['How do I raise a concern?', 'Submit the concern through the contact form and include the relevant service reference. Do not share passwords or sensitive personal records.'],
              ['How do I escalate a complaint?', 'Use the grievance process on the Grievance Redressal page. The final escalation owner and response process are published after approval.'],
              ['Is there a corporate service channel?', 'Corporate enquiries can be submitted through the Corporate Travel or General Enquiry form. Availability depends on the relevant service team.'],
            ].map(([q, a]) => (
              <details key={q} className="al-faq"><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-related">
            {[[<ClipboardList size={20}/>, 'Manage Booking', '/airline/manage-booking'], [<CheckCircle size={20}/>, 'Check-in Online', '/airline/check-in'], [<PlaneTakeoff size={20}/>, 'Flight Status', '/airline/flight-status'], [<Accessibility size={20}/>, 'Special Assistance', '/airline/special-assistance'], [<Info size={20}/>, 'About Us', '/airline/about'], [<Trophy size={20}/>, 'SkyNova Rewards', '/airline/skynova-rewards']].map(([icon, label, href]) => (
              <Link key={href} href={href} className="al-related-link"><span>{icon}</span>{label}</Link>
            ))}
          </div>
          <div className="al-disclaimer" style={{ marginTop: 32 }}><strong>Consumer Rights:</strong> Passengers have rights under DGCA CAR Section 3, Series M, Part IV. For flight delay, cancellation or denied boarding, you may be entitled to compensation as per applicable regulations. Contact our Consumer Affairs team for details.</div>
        </div>
      </section>
    </PageLayout>
  );
}
