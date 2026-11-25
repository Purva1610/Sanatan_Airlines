'use client';

/*
 * Global site chrome — ONE utility bar, header and footer for every page
 * (brief: "Quick links & global call-to-action system").
 *
 *   Utility bar  Call Us · WhatsApp · Email · Member Login   (each only when configured)
 *   Header       main navigation + Request a Charter Quote · Explore Membership · Franchise Enquiry
 *   Footer       all service links, policies, office address, social links, contact details
 *
 * `overlay` — transparent header over a dark full-photo hero (home + sub-site landing pages).
 * Otherwise the header is solid and a spacer keeps it from covering page content.
 */

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRight, ChevronDown, Facebook, Instagram, Linkedin, LogIn, Mail, MapPin, Menu, MessageCircle, Phone, X, Youtube,
} from 'lucide-react';
import GoogleTranslate from './GoogleTranslate.jsx';
import { FALLBACK_ENQUIRY_HREF, HEADER_CTAS, OFFICE_ADDRESS, getContact, whatsappHref } from './contactConfig.js';

/*
 * Mega-menu data — services grouped by intent (brief: "Mega menu with service grouping").
 * `groups` render as columns in the desktop panel and as headed lists in the mobile accordion;
 * `feature` is the panel's call-to-action card.
 */
const navigationGroups = [
  {
    label: 'Aviation',
    href: '/aviation',
    intro: 'Charter and aviation coordination through licensed operators.',
    groups: [
      { title: 'Charter', items: [['Private Jet Charter', '/aviation/private-jet-charter'], ['International Charter', '/aviation/international-charter'], ['Helicopter Charter', '/aviation/helicopter-charter']] },
      { title: 'Medical', items: [['Air Ambulance', '/aviation/air-ambulance']] },
      { title: 'Aircraft', items: [['Aircraft Advisory', '/aviation/aircraft-advisory'], ['Aircraft Leasing', '/aviation/aircraft-leasing']] },
      { title: 'On the ground', items: [['Aviation Concierge', '/aviation/concierge']] },
    ],
    feature: { title: 'Request a charter quote', copy: 'Share your route and dates — a coordinator replies personally.', href: '/aviation/private-jet-charter#enquiry' },
  },
  {
    label: 'International Club',
    href: '/club',
    intro: 'Travel membership for families and individuals.',
    groups: [
      { title: 'Membership', items: [['Membership overview', '/club'], ['Single', '/club/single'], ['Couple', '/club/couple'], ['Family', '/club/family']] },
      { title: 'Explore', items: [['Benefits', '/club/benefits'], ['Destinations', '/club/destinations'], ['Tirth Yatra', '/tirth-yatra']] },
      { title: 'Help', items: [['How it works', '/club/how-it-works'], ['FAQs', '/club/faqs'], ['Membership terms', '/membership-terms']] },
    ],
    feature: { title: 'Explore membership', copy: 'Plans, benefits and how membership works.', href: '/club' },
  },
  {
    label: 'Global Services',
    href: '/global-services',
    intro: 'Information and introductions for plans abroad.',
    groups: [
      { title: 'Travel & study', items: [['International Tours', '/global-services/tours'], ['Overseas Education', '/global-services/education']] },
      { title: 'Work & business', items: [['Overseas Employment', '/global-services/employment'], ['Business Setup', '/global-services/business'], ['International Trade', '/global-services/trade']] },
      { title: 'Property & investment', items: [['Property Assistance', '/global-services/property'], ['Investment Facilitation', '/global-services/investment']] },
      { title: 'Brand', items: [['PR & Branding', '/global-services/pr']] },
    ],
    feature: { title: 'Not sure where to start?', copy: 'Tell us your goal and country — we will point you to the right step.', href: '/global-services#global-enquiry' },
  },
  {
    label: 'Franchise',
    href: '/franchise',
    intro: 'Represent Sanatan services in your region.',
    groups: [
      { title: 'The opportunity', items: [['Franchise opportunity', '/franchise/opportunity'], ['Business model', '/franchise'], ['Investment overview', '/franchise/investment']] },
      { title: 'Next steps', items: [['Support', '/franchise/support'], ['Application process', '/franchise/apply'], ['FAQs', '/franchise/faqs']] },
    ],
    feature: { title: 'Franchise enquiry', copy: 'Start an application — no commitment until terms are agreed.', href: '/franchise/apply' },
  },
  {
    label: 'About',
    href: '/about',
    intro: 'Who we are and how we work.',
    groups: [
      { title: 'Company', items: [['Our story', '/about'], ['Leadership', '/leadership'], ['Governance & compliance', '/compliance'], ['Partners', '/partners']] },
      { title: 'More', items: [['Insights', '/insights'], ['Careers', '/careers'], ['FAQs', '/faqs']] },
    ],
    feature: { title: 'Talk to us', copy: 'Office, phone, WhatsApp and the enquiry form.', href: '/contact' },
  },
  { label: 'Contact', href: '/contact' },
];

const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const SOCIAL_ICONS = { Instagram, Facebook, LinkedIn: Linkedin, YouTube: Youtube };

export function BrandMark({ href = '/' }) {
  return (
    <a className="sa-brand notranslate" href={href} translate="no">
      <span className="sa-brand-mark" aria-hidden="true"><span className="sa-brand-glyph">S</span></span>
      <span className="sa-brand-text">SANATAN <small>AIRLINES</small></span><span className="sr-only">, home</span>
    </a>
  );
}

/* Contact quick links shared by the utility bar and the mobile drawer. */
function ContactLinks({ contact, pathname, withLabels = false }) {
  const wa = whatsappHref(contact.whatsapp, pathname);
  return (
    <>
      {contact.phone
        ? <a href={contact.phone.href} aria-label={`Call us on ${contact.phone.label}`}><Phone size={13} aria-hidden="true" />{withLabels ? 'Call us' : contact.phone.label}</a>
        : <a href="/contact"><Phone size={13} aria-hidden="true" />Call us</a>}
      {wa && <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us (opens WhatsApp)"><MessageCircle size={13} aria-hidden="true" />WhatsApp</a>}
      {contact.email && <a href={`mailto:${contact.email}`}><Mail size={13} aria-hidden="true" />{withLabels ? 'Email' : contact.email}</a>}
    </>
  );
}

export function SiteHeader({ overlay = false }) {
  const pathname = usePathname() || '/';
  const contact = getContact();
  const isClubRoute = pathname === '/club' || pathname.startsWith('/club/');
  const primaryHeaderCta = isClubRoute
    ? { label: 'Membership enquiry', href: '/club/membership#club-enquiry' }
    : HEADER_CTAS.charter;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleRef = useRef(null);
  const drawerRef = useRef(null);
  const hoverTimer = useRef(null);

  /* Mobile drawer: focus moves in on open, Tab is trapped inside, Escape closes, focus returns to the toggle. */
  useEffect(() => {
    if (!open) return undefined;
    const drawer = drawerRef.current;
    const focusables = () => Array.from(drawer?.querySelectorAll('a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])') || [])
      .filter((el) => el.offsetParent !== null);
    focusables()[0]?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { setOpen(false); return; }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    const toggle = toggleRef.current;
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  /* Mega menu: click outside closes; Escape closes and returns focus to the trigger. */
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      const trigger = document.activeElement?.closest('.sa-nav-group')?.querySelector('.sa-nav-trigger');
      setActiveMenu('');
      trigger?.focus();
    };
    const onPointerDown = (event) => { if (!event.target.closest('.sa-nav-group')) setActiveMenu(''); };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      clearTimeout(hoverTimer.current);
    };
  }, []);

  // Hover opens with a short intent delay (mouse only); click and keyboard work everywhere.
  const hoverOpen = (label) => (event) => {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActiveMenu(label), 120);
  };
  const hoverClose = (event) => {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActiveMenu(''), 220);
  };
  const onGroupBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setActiveMenu('');
  };
  const onTriggerKeyDown = (label) => (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveMenu(label);
      requestAnimationFrame(() => document.querySelector(`#mega-${slug(label)} a`)?.focus());
    }
  };
  const onPanelKeyDown = (event) => {
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    const links = Array.from(event.currentTarget.querySelectorAll('a'));
    const index = links.indexOf(document.activeElement);
    if (index < 0) return;
    event.preventDefault();
    links[(index + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length].focus();
  };

  const isCurrent = (href) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <div className={`sa-chrome${overlay ? ' is-overlay' : ' is-solid'}`}>
      <a className="sa-skip-link" href="#main">Skip to content</a>
      <div className="sa-utility-bar">
        <div className="sa-utility-inner">
          <div className="sa-utility-contact">
            <ContactLinks contact={contact} pathname={pathname} />
          </div>
          <div className="sa-utility-actions">
            {contact.memberLogin && (
              <a href={contact.memberLogin} {...(contact.memberLogin.startsWith('http') ? { rel: 'noopener noreferrer' } : {})}>
                <LogIn size={13} aria-hidden="true" />Member login
              </a>
            )}
            {/* Shown here only between 1081–1399px, where the main bar has room for the primary CTA alone */}
            <a className="sa-utility-cta" href={HEADER_CTAS.membership.href}>{HEADER_CTAS.membership.label}</a>
            <a className="sa-utility-cta" href={HEADER_CTAS.franchise.href}>{HEADER_CTAS.franchise.label}</a>
            <a href={FALLBACK_ENQUIRY_HREF}>General enquiry</a>
          </div>
          <GoogleTranslate variant="bar" />
        </div>
      </div>
      <header className={`sa-header${scrolled || !overlay || activeMenu ? ' is-scrolled' : ''}`}>
        <div className="sa-header-inner">
          <BrandMark />
          <nav className="sa-nav" aria-label="Main navigation">
            {navigationGroups.map((group) => (
              group.groups ? (
                <div
                  className="sa-nav-group"
                  key={group.label}
                  onPointerEnter={hoverOpen(group.label)}
                  onPointerLeave={hoverClose}
                  onBlur={onGroupBlur}
                >
                  <button
                    type="button"
                    className={`sa-nav-trigger${isCurrent(group.href) ? ' is-current' : ''}`}
                    aria-expanded={activeMenu === group.label}
                    aria-controls={`mega-${slug(group.label)}`}
                    onClick={() => setActiveMenu((value) => (value === group.label ? '' : group.label))}
                    onKeyDown={onTriggerKeyDown(group.label)}
                  >
                    {group.label}<ChevronDown size={13} aria-hidden="true" />
                  </button>
                  <div
                    className="sa-mega"
                    id={`mega-${slug(group.label)}`}
                    hidden={activeMenu !== group.label}
                    onKeyDown={onPanelKeyDown}
                  >
                    <div className="sa-mega-inner">
                      <div className="sa-mega-intro">
                        <a className="sa-mega-overview" href={group.href}>{group.label} <ArrowUpRight size={15} aria-hidden="true" /></a>
                        <p>{group.intro}</p>
                      </div>
                      <div className="sa-mega-columns">
                        {group.groups.map((column) => (
                          <div className="sa-mega-column" key={column.title}>
                            <p className="sa-mega-heading" id={`mega-${slug(group.label)}-${slug(column.title)}`}>{column.title}</p>
                            <ul aria-labelledby={`mega-${slug(group.label)}-${slug(column.title)}`}>
                              {column.items.map(([label, href]) => (
                                <li key={href}>
                                  <a href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setActiveMenu('')}>{label}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {group.feature && (
                        <a className="sa-mega-feature" href={group.feature.href} onClick={() => setActiveMenu('')}>
                          <strong>{group.feature.title}</strong>
                          <span>{group.feature.copy}</span>
                          <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <a key={group.label} href={group.href} aria-current={isCurrent(group.href) ? 'page' : undefined}>{group.label}</a>
              )
            ))}
          </nav>
          <div className="sa-header-ctas">
            <a className="sa-header-link" href={HEADER_CTAS.membership.href}>{HEADER_CTAS.membership.label}</a>
            <a className="sa-header-link" href={HEADER_CTAS.franchise.href}>{HEADER_CTAS.franchise.label}</a>
            <a className="sa-header-cta" href={primaryHeaderCta.href}>{primaryHeaderCta.label} <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="sa-menu-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="sa-drawer"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      {!overlay && <div className="sa-chrome-spacer" aria-hidden="true" />}
      {open && (
        <div className="sa-drawer" id="sa-drawer" role="dialog" aria-modal="true" aria-label="Site navigation" ref={drawerRef}>
          <button type="button" className="sa-drawer-close" aria-label="Close menu" onClick={() => setOpen(false)}><X size={20} /></button>
          <div className="sa-drawer-ctas">
            <a className="sa-drawer-cta" href={primaryHeaderCta.href} onClick={() => setOpen(false)}>{primaryHeaderCta.label}</a>
            <a href={HEADER_CTAS.membership.href} onClick={() => setOpen(false)}>{HEADER_CTAS.membership.label}</a>
            <a href={HEADER_CTAS.franchise.href} onClick={() => setOpen(false)}>{HEADER_CTAS.franchise.label}</a>
          </div>
          {navigationGroups.map((group) => (
            group.groups ? (
              <details className="sa-drawer-group" key={group.label} open={isCurrent(group.href) || undefined}>
                <summary>{group.label}<ChevronDown size={17} aria-hidden="true" /></summary>
                <a href={group.href} onClick={() => setOpen(false)}>Explore {group.label}</a>
                {group.groups.map((column) => (
                  <div className="sa-drawer-subgroup" key={column.title}>
                    <p className="sa-drawer-heading">{column.title}</p>
                    {column.items.map(([label, href]) => (
                      <a key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</a>
                    ))}
                  </div>
                ))}
              </details>
            ) : (
              <a key={group.label} href={group.href} onClick={() => setOpen(false)}>{group.label}<ArrowUpRight size={17} aria-hidden="true" /></a>
            )
          ))}
          <GoogleTranslate variant="drawer" />
          <div className="sa-drawer-actions">
            <ContactLinks contact={contact} pathname={pathname} withLabels />
            {contact.memberLogin && <a href={contact.memberLogin}><LogIn size={13} aria-hidden="true" />Member login</a>}
          </div>
        </div>
      )}
    </div>
  );
}

const footerColumns = [
  ['Aviation', [
    ['Private Jet Charter', '/aviation/private-jet-charter'],
    ['Helicopter Charter', '/aviation/helicopter-charter'],
    ['Air Ambulance', '/aviation/air-ambulance'],
    ['International Charter', '/aviation/international-charter'],
    ['Aircraft Buy & Sell', '/aviation/aircraft-advisory'],
    ['Aircraft Leasing', '/aviation/aircraft-leasing'],
    ['Aviation Concierge', '/aviation/concierge'],
  ]],
  ['Membership & Travel', [
    ['International Club', '/club'],
    ['Membership Plans', '/club/membership'],
    ['Benefits', '/club/benefits'],
    ['Destinations', '/club/destinations'],
    ['Tirth Yatra', '/tirth-yatra'],
    ['International Tours', '/global-services/tours'],
  ]],
  ['Global Services', [
    ['Overseas Education', '/global-services/education'],
    ['Overseas Employment', '/global-services/employment'],
    ['Business Setup', '/global-services/business'],
    ['Property Assistance', '/global-services/property'],
    ['Investment Facilitation', '/global-services/investment'],
    ['PR & Branding', '/global-services/pr'],
    ['International Trade', '/global-services/trade'],
  ]],
  ['Company', [
    ['About Us', '/about'],
    ['Leadership', '/leadership'],
    ['Governance & Compliance', '/compliance'],
    ['Partners', '/partners'],
    ['Franchise', '/franchise'],
    ['Insights', '/insights'],
    ['Careers', '/careers'],
    ['FAQs', '/faqs'],
  ]],
];

const policyLinks = [
  ['Privacy Policy', '/privacy-policy'],
  ['Terms & Conditions', '/terms-and-conditions'],
  ['Cookie Policy', '/cookie-policy'],
  ['Cancellation & Refund', '/cancellation-refund-policy'],
  ['Membership Terms', '/membership-terms'],
  ['Aviation Disclaimer', '/aviation-disclaimer'],
  ['Franchise Disclaimer', '/franchise-disclaimer'],
  ['Accessibility', '/accessibility'],
  ['Grievance Redressal', '/grievance-redressal'],
];

export function SiteFooter() {
  const pathname = usePathname() || '/';
  const contact = getContact();
  const wa = whatsappHref(contact.whatsapp, pathname);

  return (
    <footer className="sa-chrome sa-footer" id="site-footer">
      <div className="sa-container">
        <div className="sa-footer-grid sa-footer-grid-site">
          <div className="sa-footer-brand">
            <BrandMark />
            <p>
              Aviation coordination, international travel membership and global services — rooted
              in Sanatan values of trust, seva and dharma.
            </p>
            {contact.social.length > 0 && (
              <div className="sa-footer-social" aria-label="Social channels">
                {contact.social.map(([name, href]) => {
                  const Icon = SOCIAL_ICONS[name];
                  return <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} (opens in a new tab)`}><Icon size={16} aria-hidden="true" /></a>;
                })}
              </div>
            )}
          </div>

          {footerColumns.map(([title, links]) => (
            <nav className="sa-footer-col" key={title} aria-label={title}>
              <span>{title}</span>
              {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
            </nav>
          ))}

          <div className="sa-footer-col sa-footer-reach">
            <span>Contact</span>
            <address className="sa-footer-contact">
              <div><MapPin size={15} aria-hidden="true" /><span>{OFFICE_ADDRESS}</span></div>
              {contact.phone && <div><Phone size={15} aria-hidden="true" /><a href={contact.phone.href}>{contact.phone.label}</a></div>}
              {wa && <div><MessageCircle size={15} aria-hidden="true" /><a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a></div>}
              {contact.email && <div><Mail size={15} aria-hidden="true" /><a href={`mailto:${contact.email}`}>{contact.email}</a></div>}
            </address>
            <a className="sa-footer-enquire" href="/contact">Contact page <ArrowUpRight size={14} aria-hidden="true" /></a>
            <a className="sa-footer-enquire" href={FALLBACK_ENQUIRY_HREF}>Start an enquiry <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </div>

        <div className="sa-footer-bottom">
          <nav className="sa-footer-legal" aria-label="Policies">
            {policyLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="sa-footer-meta">
            <span>© {new Date().getFullYear()} Sanatan Airlines Private Limited. All rights reserved.</span>
            <span>Service availability and terms are confirmed individually for every enquiry.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
