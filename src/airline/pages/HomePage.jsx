'use client';
import { Briefcase, Crown, Plane, Star, Circle, Award, Trophy, Diamond } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '../AirlineLayout.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';

const DESTINATIONS = [
  { city: 'Mumbai', country: 'India', freq: 'Daily flights', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80' },
  { city: 'Dubai', country: 'UAE', freq: '7x weekly', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80' },
  { city: 'London', country: 'United Kingdom', freq: '5x weekly', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80' },
  { city: 'Singapore', country: 'Singapore', freq: 'Daily flights', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80' },
  { city: 'New York', country: 'USA', freq: '4x weekly', img: 'https://images.unsplash.com/photo-1546436836-07a91091f160?w=600&q=80' },
  { city: 'Tokyo', country: 'Japan', freq: '3x weekly', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80' },
];

const OFFERS = [
  { label: 'Early Bird Sale', desc: 'Save up to 30% on international routes. Book 60 days ahead.', badge: 'Limited', href: '/airline/book-flight' },
  { label: 'Business Upgrade', desc: 'Upgrade from Premium Economy for just ₹8,000 on select routes.', badge: 'Hot Deal', href: '/airline/business-class' },
  { label: 'Student Fare', desc: 'Exclusive fares with extra 10 kg baggage for verified students.', badge: 'Students', href: '/airline/student-fares' },
];

const CABIN_HIGHLIGHTS = [
  { name: 'First Class',    Icon: Crown,    desc: 'Private suites, onboard chef, chauffeur to the gate.',        href: '/airline/first-class' },
  { name: 'Business Class', Icon: Briefcase,desc: 'Lie-flat beds, lounge access, award-winning fine dining.',     href: '/airline/business-class' },
  { name: 'Premium Economy',Icon: Star,     desc: 'Extra legroom, enhanced meals, priority boarding.',            href: '/airline/premium-economy' },
  { name: 'Economy',        Icon: Plane,    desc: 'Generous seat pitch, full IFE, wholesome in-flight meals.',    href: '/airline/economy-class' },
];

export default function HomePage() {
  const { t } = useI18n();
  const [tripType, setTripType] = useState('roundtrip');
  return (
    <PageLayout>
      {/* HERO */}
      <section className="al-hero al-hero--tall">
        <div className="al-hero-bg al-airline-bg-1" />
        <div className="al-hero-overlay" />
        <div className="al-hero-content">
          <div className="al-hero-eyebrow">{t('home.hero.eyebrow')}</div>
          <h1>{t('home.hero.h1').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}</h1>
          <p className="al-hero-sub">{t('home.hero.sub')}</p>
          {/* Search Widget */}
          <div className="al-search-widget">
            <div className="al-search-tabs">
              {['roundtrip', 'oneway', 'multicity'].map((type) => (
                <button key={type} className={`al-search-tab${tripType === type ? ' active' : ''}`} onClick={() => setTripType(type)}>
                  {type === 'roundtrip' ? t('ui.roundTrip') : type === 'oneway' ? t('ui.oneWay') : t('ui.multiCity')}
                </button>
              ))}
            </div>
            <div className="al-search-fields">
              <div className="al-search-field"><label>{t('ui.from')}</label><input placeholder={t('ui.from')} /></div>
              <div className="al-search-field"><label>{t('ui.to')}</label><input placeholder={t('ui.to')} /></div>
              <div className="al-search-field"><label>{t('ui.depart')}</label><input type="date" /></div>
              {tripType === 'roundtrip' && <div className="al-search-field"><label>{t('ui.return')}</label><input type="date" /></div>}
              <Link href="/airline/book-flight" className="al-btn-primary" style={{ alignSelf: 'flex-end' }}>{t('ui.searchFlights')} →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIAL OFFERS */}
      <section className="al-section p-offers">
        <div className="al-container">
          <div className="al-section-header">
            <div className="al-section-eyebrow">{t('home.offers.eyebrow')}</div>
            <h2>{t('home.offers.h2')}</h2>
            <p className="al-section-lead">{t('home.offers.lead')}</p>
          </div>
          <div className="al-cards al-cards--3">
            {OFFERS.map((o) => (
              <div key={o.label} className="al-card">
                <div className="al-badge al-badge--flame" style={{ marginBottom: 16 }}>{o.badge}</div>
                <h3>{o.label}</h3>
                <p>{o.desc}</p>
                <Link href={o.href} className="al-btn-primary" style={{ marginTop: 20, fontSize: 13, padding: '10px 20px' }}>View Offer →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="al-section al-section--light p-dest">
        <div className="al-container">
          <div className="al-section-header">
            <div className="al-section-eyebrow">{t('home.dest.eyebrow')}</div>
            <h2>{t('home.dest.h2')}</h2>
          </div>
          <div className="al-dest-grid">
            {DESTINATIONS.map((d) => (
              <Link key={d.city} href="/airline/destinations" className="al-dest-card" style={{ textDecoration: 'none' }}>
                <img className="al-dest-card-img" src={d.img} alt={d.city} />
                <div className="al-dest-overlay">
                  <div className="al-dest-city">{d.city}</div>
                  <div className="al-dest-country">{d.country}</div>
                  <div className="al-dest-freq">{d.freq}</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/airline/destinations" className="al-btn-primary">{t('home.dest.viewAll')}</Link>
          </div>
        </div>
      </section>

      {/* CABIN HIGHLIGHTS */}
      <section className="al-section al-section--navy p-cabins">
        <div className="al-container">
          <div className="al-section-header">
            <div className="al-section-eyebrow">{t('home.cabin.eyebrow')}</div>
            <h2>{t('home.cabin.h2')}</h2>
            <p className="al-section-lead">{t('home.cabin.lead')}</p>
          </div>
          <div className="al-cards al-cards--4">
            {CABIN_HIGHLIGHTS.map((c) => (
              <Link key={c.name} href={c.href} className="al-card" style={{ textDecoration: 'none' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: '#c0480c',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                  boxShadow: '0 4px 14px rgba(192,72,12,0.35)',
                }}>
                  <c.Icon size={26} color="#ffffff" strokeWidth={2} />
                </div>
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LOYALTY TEASER */}
      <section className="al-section al-section--sky p-loyalty">
        <div className="al-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div className="al-section-eyebrow">SkyNova Rewards</div>
            <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(26px,3vw,38px)', marginBottom: 16 }}>Every Mile Takes You Further</h2>
            <p style={{ fontSize: 16, color: 'var(--al-muted)', lineHeight: 1.7, marginBottom: 24 }}>Earn SkyNova Miles on every flight, hotel stay and partner purchase. Redeem for free flights, upgrades and exclusive experiences. Blue, Silver, Gold and Platinum tiers — your loyalty always rewarded.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/airline/skynova-rewards" className="al-btn-primary">Join SkyNova Free →</Link>
              <Link href="/airline/skynova-rewards" className="al-btn-secondary" style={{ color: 'var(--al-navy)', borderColor: 'var(--al-navy)' }}>Explore Benefits</Link>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Blue',     Icon: Circle,  color: '#2940d6', desc: 'Entry tier. Earn on every flight.' },
              { label: 'Silver',   Icon: Star,    color: '#a0a5ac', desc: '25,000 miles. Priority check-in.' },
              { label: 'Gold',     Icon: Award,   color: '#c0480c', desc: '50,000 miles. Lounge access.' },
              { label: 'Platinum', Icon: Diamond, color: '#7f91d4', desc: '100,000 miles. Ultimate privileges.' },
            ].map(({ label, Icon, color, desc }) => (
              <div key={label} className={`al-card p-tier p-tier--${label.toLowerCase()}`} style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Icon size={18} color={color} strokeWidth={2.5} />
                  <span style={{ fontWeight: 800 }}>{label}</span>
                </div>
                <p style={{ fontSize: 13 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="al-section p-news">
        <div className="al-container">
          <div className="al-section-header">
            <div className="al-section-eyebrow">Latest News</div>
            <h2>From Sanatan Airlines</h2>
          </div>
          <div className="al-cards al-cards--3">
            {[
              { title: 'New Route: Delhi–Tokyo Daily', date: 'Nov 15, 2026', excerpt: 'We are thrilled to announce daily non-stop service between Indira Gandhi International Airport and Narita International Airport, launching January 2027.' },
              { title: 'Business Class Redesign', date: 'Nov 10, 2026', excerpt: "Our all-new Business Class features fully lie-flat seats with direct aisle access on every Airbus A350. Rolling out fleetwide through 2027." },
              { title: 'SkyNova Miles Never Expire', date: 'Nov 1, 2026', excerpt: "We've removed the miles expiry policy. Your SkyNova Miles now last for the life of your membership — a thank-you to our most loyal travellers." },
            ].map((n) => (
              <div key={n.title} className="al-card">
                <div className="al-badge" style={{ marginBottom: 12 }}>{n.date}</div>
                <h3>{n.title}</h3>
                <p style={{ marginTop: 8 }}>{n.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="al-section" style={{ paddingTop: 0 }}>
        <div className="al-container">
          <div className="al-disclaimer">
            <strong>Legal Notice:</strong> Fares, routes and schedules are subject to change. All bookings are governed by IATA conditions of carriage and applicable DGCA regulations. Promotional fares have limited availability and are subject to terms and conditions. Sanatan Airlines is a fictional entity created for demonstration purposes.
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
