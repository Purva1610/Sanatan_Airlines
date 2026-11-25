'use client';
import { Accessibility, CheckCircle2, Ear, Eye, HandHelping, HeartPulse, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { LegalPage } from '../LegalPageLayout.jsx';
import { getContact } from '../../contactConfig.js';

export default function AccessibilityStatementPage() {
  const contact = getContact();
  return (
    <LegalPage title="Accessibility Statement" lastUpdated="20 November 2026">
      <div className="acc-page">
        <section className="acc-intro">
          <div className="acc-intro-copy">
            <span>Accessible by design</span>
            <h2>Equal access to every journey</h2>
            <p>Sanatan Airlines is committed to making its website, mobile services and airport experience accessible to passengers with disabilities and persons with reduced mobility.</p>
          </div>
          <div className="acc-intro-status">
            <CheckCircle2 size={22}/>
            <div><span>Standards in focus</span><strong>WCAG 2.1 AA · DGCA requirements</strong></div>
          </div>
        </section>

        <section className="acc-airport">
          <div className="acc-section-head">
            <span>Travel assistance</span>
            <h2>Support from arrival to destination</h2>
          </div>
          <div className="acc-service-grid">
            {[
              { icon: <Accessibility size={22}/>, title: 'Wheelchair assistance', copy: 'Complimentary support at all airports we serve. Request at least 48 hours before departure.' },
              { icon: <CheckCircle2 size={22}/>, title: 'Priority check-in', copy: 'Dedicated counters for passengers with disabilities at participating Sanatan airports.' },
              { icon: <HandHelping size={22}/>, title: 'Priority boarding', copy: 'PRM passengers are welcomed to board before general boarding groups.' },
              { icon: <Eye size={22}/>, title: 'Vision support', copy: 'Escorted assistance, audio IFE and reading support are available on request.' },
              { icon: <Ear size={22}/>, title: 'Hearing support', copy: 'Written communication, visual alerts and hearing loops at selected counters.' },
              { icon: <HeartPulse size={22}/>, title: 'Hidden disabilities', copy: 'Pre-boarding and calm assistance are available, including recognised Sunflower lanyards.' },
            ].map((service) => (
              <article key={service.title}>
                <div className="acc-service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="acc-digital">
          <div className="acc-digital-copy">
            <span>Digital accessibility</span>
            <h2>Designed for every screen and every way of navigating</h2>
            <p>We aim to meet WCAG 2.1 Level AA across the booking and support experience.</p>
          </div>
          <div className="acc-digital-list">
            {[
              ['01', 'Keyboard navigation', 'Logical focus order and visible focus indicators'],
              ['02', 'Screen readers', 'Descriptive labels, landmarks and image alternatives'],
              ['03', 'Readable text', 'Text resizing up to 200% without loss of function'],
              ['04', 'Visual clarity', 'AA contrast targets and adaptable interface states'],
              ['05', 'Languages', 'HTML language declarations and Urdu RTL support'],
              ['06', 'Media', 'Captions and text alternatives where available'],
            ].map(([number, title, copy]) => (
              <article key={title}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>
            ))}
          </div>
        </section>

        <section className="acc-support">
          <div className="acc-support-copy">
            <span>Special assistance</span>
            <h2>Tell us what support you need</h2>
            <p>Request assistance when booking or through Manage Booking. Complex medical needs should be raised at least 72 hours before departure.</p>
          </div>
          <div className="acc-support-actions">
            <Link href="/airline/special-assistance" className="acc-btn acc-btn--primary">Request special assistance <CheckCircle2 size={17}/></Link>
            <Link href="/airline/wheelchair-assistance" className="acc-btn acc-btn--secondary">Wheelchair assistance</Link>
            <Link href="/airline/medical-clearance" className="acc-btn acc-btn--secondary">Medical clearance</Link>
          </div>
        </section>

        <section className="acc-feedback">
          <div className="acc-section-head acc-section-head--left">
            <span>Feedback and complaints</span>
            <h2>We want to know when a barrier occurs</h2>
          </div>
          <div className="acc-feedback-grid">
            {contact.email && <article><Mail size={22}/><div><span>Email</span><a href={`mailto:${contact.email}`}>{contact.email}</a></div></article>}
            {contact.phone && <article><Phone size={22}/><div><span>Phone</span><a href={contact.phone.href}>{contact.phone.label}</a></div></article>}
            <article><HandHelping size={22}/><div><span>External review</span><p>DGCA Consumer Facilitation Centre or the relevant consumer forum.</p></div></article>
          </div>
          <p className="acc-feedback-note">We aim to respond to accessibility feedback within 2 business days and resolve reported issues within 15 business days where technically feasible.</p>
        </section>

        <section className="acc-limitations">
          <div>
            <span>Known limitations</span>
            <h2>Continuous improvement</h2>
          </div>
          <p>Legacy content and some third-party components may not yet provide full WCAG 2.1 AA support. We are actively reviewing these areas and welcome reports about specific barriers.</p>
        </section>
      </div>
    </LegalPage>
  );
}
