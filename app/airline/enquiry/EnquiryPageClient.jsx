'use client';
import { Accessibility, ArrowUpRight, Briefcase, Mail, MessageCircle, Package, PawPrint, Phone, Plane, Users } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '../../../src/airline/AirlineLayout.jsx';
import { EnquiryForm } from '../../../src/airline/EnquiryForm.jsx';
import { useI18n } from '../../../src/airline/i18n/I18nContext.jsx';

const CONTACTS = [
  { icon: <Phone size={18} />, label: '24/7 Helpline', value: '+91 1800 123 4567', href: 'tel:+911800123456' },
  { icon: <MessageCircle size={18} />, label: 'WhatsApp', value: '+91 98765 00000', href: null },
  { icon: <Mail size={18} />, label: 'Email', value: 'support@sanatanairlines.com', href: 'mailto:support@sanatanairlines.com' },
];

const SHORTCUTS = [
  [<Plane size={18} />, 'Book a Flight', '/airline/book-flight'],
  [<Users size={18} />, 'Group Travel', '/airline/group-travel'],
  [<Package size={18} />, 'Cargo Services', '/airline/cargo-services'],
  [<Accessibility size={18} />, 'Special Assistance', '/airline/special-assistance'],
  [<Briefcase size={18} />, 'Corporate Travel', '/airline/corporate-travel'],
  [<PawPrint size={18} />, 'Pet Travel', '/airline/pet-travel'],
];

function Inner() {
  const { t } = useI18n();
  return (
    <section className="enq">
      {/* Concierge panel */}
      <aside className="enq-side">
        <div className="enq-side-inner">
          <div className="enq-eyebrow">{t('nav.book')}</div>
          <h1>{t('enq.heading')}</h1>
          <p className="enq-sub">{t('enq.sub')}</p>

          <div className="enq-contacts">
            {CONTACTS.map((c) => {
              const body = (
                <>
                  <span className="enq-contact-icon">{c.icon}</span>
                  <span className="enq-contact-text">
                    <span>{c.label}</span>
                    <strong>{c.value}</strong>
                  </span>
                </>
              );
              return c.href
                ? <a key={c.label} className="enq-contact" href={c.href}>{body}</a>
                : <div key={c.label} className="enq-contact">{body}</div>;
            })}
          </div>

          <div className="enq-shortcuts">
            {SHORTCUTS.map(([icon, label, href]) => (
              <Link key={href} href={href} className="enq-shortcut">
                <span className="enq-shortcut-icon">{icon}</span>
                <span>{label}</span>
                <ArrowUpRight size={15} className="enq-shortcut-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Form */}
      <div className="enq-main">
        <div className="enq-form">
          <EnquiryForm variant="full" />
        </div>
      </div>
    </section>
  );
}

export default function EnquiryPageClient() {
  return (
    <PageLayout>
      <Inner />
    </PageLayout>
  );
}
