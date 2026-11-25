'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Accessibility, AlertCircle, AlertTriangle, Armchair, ArrowRight, Baby, BaggageClaim, Bike, Briefcase, Building2, CalendarClock, Car, Cat, ChevronDown, ChevronUp, ClipboardList, Container, Cookie, CreditCard, FileText, Flame, Gift, Globe, GraduationCap, HeartHandshake, Info, Landmark, LayoutGrid, Leaf, Lock, Luggage, Mail, MapPin, Menu, MessageSquare, Music2, Package, PawPrint, Phone, Plane, RefreshCw, Shield, Star, Stethoscope, Ticket, Trophy, Tv, UserCheck, Users, UtensilsCrossed, X, Zap } from 'lucide-react';
import { useI18n } from './i18n/I18nContext.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { AirlineFooter as FooterComponent } from './AirlineFooter.jsx';
import { getContact } from '../contactConfig.js';

// ── Link item: [label, href, Icon] ──────────────────────────
function buildMenu(t) {
  return [
    {
      id: 'book',
      label: t('nav.planBook') || 'Book & Plan',
      shortLabel: 'Book',
      Icon: Plane,
      accent: '#2134ae',
      columns: [
        {
          heading: 'Flights',
          links: [
            [t('nav.bookFlight')     || 'Book a Flight',        '/airline/book-flight',      Ticket],
            [t('nav.flexFares')      || 'Flexible Fares',       '/airline/flexible-fares',   RefreshCw],
            ['Multi-City Flights',                               '/airline/multi-city',       MapPin],
            ['Round-the-World',                                  '/airline/round-the-world',  Globe],
            [t('nav.flightStatus')   || 'Flight Status',        '/airline/flight-status',    CalendarClock],
            ['Destinations',                                     '/airline/destinations',     MapPin],
          ],
        },
        {
          heading: 'Traveller Types',
          links: [
            [t('nav.groupTravel')     || 'Group Travel',        '/airline/group-travel',     Users],
            [t('nav.corporateTravel') || 'Corporate Travel',    '/airline/corporate-travel', Building2],
            ['Student Fares',                                    '/airline/student-fares',    GraduationCap],
            ['Senior Citizen Fares',                             '/airline/senior-fares',     UserCheck],
            ['Military Discounts',                               '/airline/military-fares',   Shield],
          ],
        },
        {
          heading: 'Self-Service',
          links: [
            [t('nav.manageBooking')  || 'Manage Booking',       '/airline/manage-booking',   ClipboardList],
            [t('nav.checkIn')        || 'Online Check-in',      '/airline/check-in',         Ticket],
            ['Seat Selection',                                   '/airline/seat-selection',   Armchair],
            ['Enquiry Form',                                     '/airline/enquiry',          MessageSquare],
          ],
        },
      ],
    },
    {
      id: 'cabins',
      label: t('nav.cabinExp') || 'Cabins',
      shortLabel: 'Cabins',
      Icon: Armchair,
      accent: '#c0480c',
      columns: [
        {
          heading: 'Cabin Classes',
          links: [
            [t('nav.economy')      || 'Economy Class',          '/airline/economy-class',       LayoutGrid],
            [t('nav.premEconomy')  || 'Premium Economy',        '/airline/premium-economy',     Star],
            [t('nav.business')     || 'Business Class',         '/airline/business-class',      Briefcase],
            [t('nav.firstClass')   || 'First Class',            '/airline/first-class',         Trophy],
            ['Extra Legroom Seats',                              '/airline/extra-legroom',       Armchair],
          ],
        },
        {
          heading: 'Onboard',
          links: [
            [t('nav.ife')    || 'In-Flight Entertainment',      '/airline/in-flight-entertainment', Tv],
            [t('nav.dining') || 'In-Flight Dining',             '/airline/in-flight-dining',    UtensilsCrossed],
            ['Our Fleet',                                        '/airline/our-fleet',           Plane],
          ],
        },
      ],
    },
    {
      id: 'baggage',
      label: t('nav.baggageInfo') || 'Baggage',
      shortLabel: 'Baggage',
      Icon: Briefcase,
      accent: '#2134ae',
      columns: [
        {
          heading: 'Allowances & Fees',
          links: [
            [t('nav.baggage')    || 'Baggage Information',      '/airline/baggage',             Luggage],
            [t('nav.excessBag')  || 'Excess Baggage',           '/airline/excess-baggage',      BaggageClaim],
            [t('nav.sports')     || 'Sports Equipment',         '/airline/sports-equipment',    Bike],
            ['Musical Instruments',                              '/airline/musical-instruments', Music2],
          ],
        },
        {
          heading: 'Specialist Items',
          links: [
            [t('nav.petTravel')     || 'Pet Travel',            '/airline/pet-travel',          Cat],
            ['Dangerous Goods',                                  '/airline/dangerous-goods',     AlertTriangle],
            [t('nav.medClearance')  || 'Medical Clearance',     '/airline/medical-clearance',   Stethoscope],
          ],
        },
      ],
    },
    {
      id: 'assistance',
      label: 'Assistance',
      Icon: HeartHandshake,
      accent: '#2134ae',
      columns: [
        {
          heading: 'Special Needs',
          links: [
            [t('nav.specialAssist') || 'Special Assistance',    '/airline/special-assistance',  Accessibility],
            ['Wheelchair Assistance',                            '/airline/wheelchair-assistance',Accessibility],
            ['Unaccompanied Minors',                             '/airline/unaccompanied-minors',Baby],
            ['Medical Clearance',                                '/airline/medical-clearance',   Stethoscope],
          ],
        },
        {
          heading: 'Support',
          links: [
            ['Contact Us',                                       '/airline/contact',             Phone],
            ['Grievance Redressal',                              '/grievance-redressal',         MessageSquare],
            ['Accessibility',                                    '/accessibility',               Accessibility],
          ],
        },
      ],
    },
    {
      id: 'cargo',
      label: 'Cargo',
      Icon: Package,
      accent: '#c0480c',
      columns: [
        {
          heading: 'Cargo Services',
          links: [
            ['General Cargo',                                    '/airline/cargo-services',      Container],
            ['Express Cargo',                                    '/airline/express-cargo',       Zap],
            ['Live Animals (AVI)',                               '/airline/live-animals-cargo',  PawPrint],
            ['Dangerous Goods',                                  '/airline/dangerous-goods',     Flame],
          ],
        },
      ],
    },
    {
      id: 'loyalty',
      label: 'Loyalty & More',
      shortLabel: 'Loyalty',
      Icon: Star,
      accent: '#2134ae',
      columns: [
        {
          heading: 'SkyNova Rewards',
          links: [
            ['SkyNova Rewards',                                  '/airline/skynova-rewards',     Trophy],
            ['Gift Vouchers',                                    '/airline/gift-vouchers',       Gift],
            ['Airport Lounges',                                  '/airline/airport-lounges',     Landmark],
          ],
        },
        {
          heading: 'Travel Add-ons',
          links: [
            ['Travel Insurance',                                 '/airline/travel-insurance',    Shield],
            ['Hotel + Flight Packages',                          '/airline/hotel-flight',        Building2],
            ['Car Rental',                                       '/airline/car-rental',          Car],
            ['Sustainability',                                   '/airline/sustainability',      Leaf],
          ],
        },
      ],
    },
    {
      id: 'about',
      label: 'About',
      Icon: Info,
      accent: '#2134ae',
      columns: [
        {
          heading: 'Company',
          links: [
            ['About Us',                                         '/airline/about',               Info],
            ['Our Fleet',                                        '/airline/our-fleet',           Plane],
            ['Destinations',                                     '/airline/destinations',        MapPin],
            ['Sustainability',                                   '/airline/sustainability',      Leaf],
          ],
        },
        {
          heading: 'Legal',
          links: [
            ['Privacy Policy',                                   '/privacy-policy',              Lock],
            ['Terms & Conditions',                               '/terms-and-conditions',        FileText],
            ['Cookie Policy',                                    '/cookie-policy',               Cookie],
            ['Cancellation & Refunds',                           '/cancellation-refund-policy',  RefreshCw],
            ['Aviation Disclaimer',                              '/aviation-disclaimer',         AlertCircle],
            ['Franchise Disclaimer',                             '/franchise-disclaimer',        AlertCircle],
            ['Membership Terms',                                 '/membership-terms',            CreditCard],
            ['Grievance Redressal',                              '/grievance-redressal',         MessageSquare],
            ['Accessibility',                                    '/accessibility',               Accessibility],
          ],
        },
      ],
    },
  ];
}

// ── Mega-menu panel ──────────────────────────────────────────
function MegaPanel({ group, onClose, alignRight }) {
  return (
    <div className="p-mega" style={{
      position: 'absolute',
      top: '100%',
      ...(alignRight ? { right: 0 } : { left: '50%', transform: 'translateX(-50%)' }),
      background: '#fff',
      borderRadius: '0 0 14px 14px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
      padding: '24px 28px 20px',
      display: 'flex',
      gap: 36,
      zIndex: 1000,
      minWidth: group.columns.length === 1 ? 220 : group.columns.length === 2 ? 460 : 680,
      borderTop: `3px solid ${group.accent}`,
    }}>
      {group.columns.map((col) => (
        <div key={col.heading} style={{ flex: 1 }}>
          <div style={{
            fontSize: 10, fontWeight: 800, letterSpacing: '0.13em',
            textTransform: 'uppercase', color: group.accent,
            marginBottom: 10, paddingBottom: 8,
            borderBottom: `1.5px solid ${group.accent}22`,
          }}>
            {col.heading}
          </div>
          {col.links.map(([label, href, Icon]) => (
            <Link key={href} href={href} onClick={onClose} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 0', fontSize: 13.5, color: '#131e63',
              textDecoration: 'none', fontWeight: 500,
              borderRadius: 4, transition: 'color 0.12s, padding-left 0.12s',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = group.accent;
                e.currentTarget.style.paddingLeft = '4px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#131e63';
                e.currentTarget.style.paddingLeft = '0';
              }}
            >
              {Icon && <Icon size={13} style={{ opacity: 0.6, flexShrink: 0 }} />}
              {label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Header ───────────────────────────────────────────────────
function Header() {
  const { t } = useI18n();
  const contact = getContact();
  const MEGA_MENU = buildMenu(t);       // rebuilt on every render → labels update with language

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(null);
  const [drawerGroup, setDrawerGroup] = useState(null);
  const navRef = useRef(null);

  // Close mega menu when clicking outside the nav
  useEffect(() => {
    function handleOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMegaOpen(null);
      }
    }
    function handleEsc(e) {
      if (e.key === 'Escape') setMegaOpen(null);
    }
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  function toggleMega(id) {
    setMegaOpen(prev => prev === id ? null : id);
  }

  useEffect(() => () => {}, []);

  return (
    <>
      {/* ── Top utility bar ──────────────────────────── */}
      <div className="p-topbar" style={{
        background: '#1c2b90', padding: '5px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {contact.phone && <a href={contact.phone.href} style={{ color: 'rgba(215,242,250,0.7)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, fontWeight: 500 }}><Phone size={11} /> {contact.phone.label}</a>}
          {contact.email && <a href={`mailto:${contact.email}`} style={{ color: 'rgba(215,242,250,0.7)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, fontWeight: 500 }}><Mail size={11} /> {contact.email}</a>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {[['Manage Booking','/airline/manage-booking'],['Flight Status','/airline/flight-status'],['Check-in','/airline/check-in']].map(([label,href]) => (
            <Link key={href} href={href} style={{ color: 'rgba(215,242,250,0.72)', textDecoration: 'none', fontWeight: 500, fontSize: 12 }}
              onMouseEnter={e => e.currentTarget.style.color='#fff'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(215,242,250,0.72)'}>
              {label}
            </Link>
          ))}
          <LanguageSwitcher compact />
        </div>
      </div>

      {/* ── Main sticky header ───────────────────────── */}
      <header className="p-header" style={{
        background: '#ffffff',
        position: 'sticky', top: 0, zIndex: 400,
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        borderBottom: '1.5px solid #f6f2ea',
        overflow: 'visible',
      }}>
        <div style={{
          maxWidth: 1300, margin: '0 auto', padding: '0 16px',
          height: 64, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 8,
          overflow: 'visible', position: 'relative',
        }}>

          {/* Logo */}
          <Link href="/" className="p-brand" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
            <span className="p-brand-mark" style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg,#c0480c,#d14f0d)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 13, color: '#fff',
              boxShadow: '0 2px 8px rgba(192,72,12,0.35)',
              letterSpacing: '0.02em', flexShrink: 0,
            }}>SA</span>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ color: '#2134ae', fontSize: 13, fontWeight: 800, letterSpacing: '0.08em' }}>SANATAN</div>
              <div style={{ color: '#a1a9b5', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase' }}>AVIATION SERVICES</div>
            </div>
          </Link>

          {/* Desktop mega-nav */}
          <nav ref={navRef} style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 1, justifyContent: 'center', overflow: 'visible', position: 'relative' }} aria-label="Main navigation">
            {MEGA_MENU.map((group, idx) => {
              const { Icon } = group;
              const isOpen = megaOpen === group.id;
              const alignRight = idx >= MEGA_MENU.length - 3;
              return (
                <div key={group.id} style={{ position: 'relative', flexShrink: 0 }}>
                  <button
                    className="p-nav-btn"
                    onClick={() => toggleMega(group.id)}
                    style={{
                      background: isOpen ? '#faf9f5' : 'none',
                      border: 'none', cursor: 'pointer',
                      color: isOpen ? '#2134ae' : '#131e63',
                      fontSize: 12.5, fontWeight: 600,
                      padding: '6px 9px',
                      borderRadius: 6,
                      display: 'flex', alignItems: 'center', gap: 4,
                      whiteSpace: 'nowrap',
                      transition: 'background 0.15s, color 0.15s',
                      letterSpacing: '-0.01em',
                    }}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onMouseEnter={e => { e.currentTarget.style.background='#faf9f5'; e.currentTarget.style.color='#2134ae'; }}
                    onMouseLeave={e => { if (!isOpen) { e.currentTarget.style.background='none'; e.currentTarget.style.color='#131e63'; } }}
                  >
                    <Icon size={13} style={{ opacity: 0.65, color: '#2134ae', flexShrink: 0 }} />
                    {group.shortLabel || group.label}
                    {isOpen
                      ? <ChevronUp size={10} style={{ opacity: 0.5, marginTop: 1, flexShrink: 0 }} />
                      : <ChevronDown size={10} style={{ opacity: 0.4, marginTop: 1, flexShrink: 0 }} />}
                  </button>
                  {isOpen && (
                    <MegaPanel group={group} onClose={() => setMegaOpen(null)} alignRight={alignRight} />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <Link href="/airline/enquiry" className="p-cta-ghost" style={{
              background: '#fff',
              border: '1.5px solid #2134ae',
              color: '#2134ae', borderRadius: 7,
              padding: '5px 12px', fontSize: 12, fontWeight: 700,
              textDecoration: 'none', whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 4,
            }}
              onMouseEnter={e => { e.currentTarget.style.background='#faf9f5'; }}
              onMouseLeave={e => { e.currentTarget.style.background='#fff'; }}
            >
              <MessageSquare size={11} /> Enquiry
            </Link>
            <Link href="/airline/book-flight" className="p-cta-book" style={{
              background: 'linear-gradient(135deg,#c0480c,#d14f0d)',
              color: '#fff', borderRadius: 7,
              padding: '6px 14px', fontSize: 12.5, fontWeight: 700,
              textDecoration: 'none', whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(192,72,12,0.3)',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <Plane size={12} /> Charter Enquiry
            </Link>
            <button onClick={() => setDrawerOpen(true)} aria-label="Open menu"
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#2134ae', padding: 4 }}
              className="al-hamburger">
              <Menu size={22} />
            </button>
          </div>
        </div>

        <style>{`
          @media (max-width: 1100px) {
            nav[aria-label="Main navigation"] { display: none !important; }
            .al-hamburger { display: flex !important; }
          }
        `}</style>
      </header>

      {/* ── Mobile drawer ────────────────────────────── */}
      {drawerOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 600,
          background: '#2134ae', overflowY: 'auto',
          padding: '20px 20px 48px',
        }} role="dialog" aria-modal="true">

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <Link href="/" onClick={() => setDrawerOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
              <span style={{ width: 34, height: 34, borderRadius: '50%', background: '#c0480c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#fff' }}>SA</span>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 14, letterSpacing: '0.08em' }}>SANATAN AVIATION</span>
            </Link>
            <button onClick={() => setDrawerOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
            {[['<Plane size={20}/> Charter Enquiry','/airline/enquiry','#c0480c'],['Enquiry','/airline/enquiry','rgba(255,255,255,0.12)'],['Aviation Services','/aviation','rgba(255,255,255,0.12)']].map(([label,href,bg]) => (
              <Link key={href} href={href} onClick={() => setDrawerOpen(false)} style={{ background: bg, color: '#fff', borderRadius: 7, padding: '9px 14px', fontSize: 13, fontWeight: 700, textDecoration: 'none', flex: 1, textAlign: 'center', minWidth: 90 }}>
                {label}
              </Link>
            ))}
          </div>

          {MEGA_MENU.map((group) => {
            const { Icon } = group;
            const isOpen = drawerGroup === group.id;
            return (
              <div key={group.id} style={{ marginBottom: 3 }}>
                <button onClick={() => setDrawerGroup(isOpen ? null : group.id)} style={{
                  width: '100%', background: isOpen ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.06)',
                  border: 'none', borderRadius: 8, color: '#fff',
                  padding: '12px 14px', fontSize: 14.5, fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', gap: 8, textAlign: 'left',
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon size={15} style={{ opacity: 0.8 }} /> {group.label}
                  </span>
                  {isOpen ? <ChevronUp size={14} style={{ opacity: 0.6 }} /> : <ChevronDown size={14} style={{ opacity: 0.6 }} />}
                </button>
                {isOpen && (
                  <div style={{ padding: '4px 14px 14px' }}>
                    {group.columns.map((col) => (
                      <div key={col.heading} style={{ marginTop: 12 }}>
                        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(215,242,250,0.45)', marginBottom: 6 }}>
                          {col.heading}
                        </div>
                        {col.links.map(([label, href, Icon]) => (
                          <Link key={href} href={href} onClick={() => setDrawerOpen(false)} style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            color: 'rgba(255,255,255,0.86)', textDecoration: 'none',
                            fontSize: 14, fontWeight: 500,
                            padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                          }}>
                            {Icon && <Icon size={13} style={{ opacity: 0.55, flexShrink: 0 }} />}
                            {label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <LanguageSwitcher />
          </div>
          <div style={{ marginTop: 16, fontSize: 11, color: 'rgba(215,242,250,0.4)', textAlign: 'center' }}>
            <Phone size={20}/> Sanatan · Seva · Satya · Vishwas
          </div>
        </div>
      )}
    </>
  );
}

// ── Public exports ────────────────────────────────────────────
// I18nProvider is now at app/layout.tsx level — no need to wrap here.
export function AirlineHeader() {
  return <Header />;
}

export { FooterComponent as AirlineFooter };

export function PageLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <FooterComponent />
    </>
  );
}
