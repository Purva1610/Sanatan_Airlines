'use client';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from './i18n/I18nContext.jsx';
import { SiteFooter, SiteHeader } from '../SiteChrome.jsx';
import { getContact } from '../contactConfig.js';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export function LegalPageLayout({ children, title, lastUpdated, heroImage }) {
  const { t } = useI18n();
  const contact = getContact();
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* Hero strip */}
        <div style={{
          backgroundImage: heroImage
            ? `linear-gradient(135deg, rgba(22,35,118,0.86) 0%, rgba(33,52,174,0.72) 100%), url('${heroImage}')`
            : 'linear-gradient(135deg, #162376 0%, #2134ae 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '52px 24px 48px',
        }}>
          <div className="al-container">
            <div style={{ float: 'right', marginLeft: 16 }}><LanguageSwitcher compact /></div>
            {/* Breadcrumb */}
            <nav style={{ fontSize: 13, color: 'rgba(215,242,250,0.6)', marginBottom: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: 'rgba(215,242,250,0.6)', textDecoration: 'none' }}>Home</Link>
              <span>›</span>
              <span style={{ color: 'rgba(215,242,250,0.9)' }}>{title}</span>
            </nav>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px,4vw,44px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 14 }}>
              {title}
            </h1>
            {lastUpdated && (
              <p style={{ fontSize: 13, color: 'rgba(215,242,250,0.55)' }}>
                {t('legal.lastUpdated') || 'Last Updated'}: <strong style={{ color: 'rgba(215,242,250,0.8)' }}>{lastUpdated}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Review note */}
        <div style={{ background: '#f9f4ec', borderBottom: '2px solid #c0480c', padding: '14px 24px' }}>
          <div className="al-container" style={{ fontSize: 13, color: '#8e320b', fontWeight: 600 }}>
            {t('legal.reviewNote') || '<AlertTriangle size={20}/> This document is prepared for legal review before publication. Please consult qualified legal counsel before making it publicly available.'}
          </div>
        </div>

        {/* Content */}
        <article style={{
          maxWidth: 820,
          margin: '0 auto',
          padding: '64px 24px 80px',
          fontFamily: 'var(--al-body-font, Manrope, sans-serif)',
          color: '#131e63',
          lineHeight: 1.8,
          fontSize: 15,
        }}>
          {children}
          {/* Contact for legal queries */}
          <div style={{ marginTop: 48, padding: '24px 28px', background: '#faf9f8', borderRadius: 10, border: '1.5px solid #f0ece2' }}>
            <p style={{ fontSize: 14, color: '#4e545e', margin: 0 }}>
              {t('legal.contact') || 'For queries regarding this policy, write to'}{' '}
              {contact.email
                ? <a href={`mailto:${contact.email}`} style={{ color: '#2134ae', fontWeight: 700 }}>{contact.email}</a>
                : <a href="/grievance-redressal" style={{ color: '#2134ae', fontWeight: 700 }}>our grievance redressal page</a>}
              {contact.phone && <> or call <a href={contact.phone.href} style={{ color: '#2134ae', fontWeight: 700 }}>{contact.phone.label}</a></>}.
            </p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

/** Wrap legal page — I18nProvider is global, just render children */
export function LegalPage({ title, lastUpdated, children, heroImage }) {
  return (
    <LegalPageLayout title={title} lastUpdated={lastUpdated} heroImage={heroImage}>
      {children}
    </LegalPageLayout>
  );
}
