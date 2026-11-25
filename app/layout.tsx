import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import SiteFeatures from '../src/SiteFeatures.jsx';
import SiteMotion from '../src/SiteMotion.jsx';
import I18nProviderWrapper from '../src/airline/i18n/I18nProviderWrapper.jsx';
import '../src/styles.css';
import '../src/home.css';
import '../src/aviation-service.css';
import '../src/international-club.css';
import '../src/tirth-yatra.css';
import '../src/why-choose.css';
import '../src/premium.css';
import '../src/skins.css';
import '../src/home-premium.css';
import '../src/pages-premium.css';
import '../src/brand.css';
import '../src/chrome.css';
import '../src/global-services.css';
import '../src/company.css';
import { getConfiguredSiteOrigin } from '../src/siteConfig.js';

const siteUrl = getConfiguredSiteOrigin();

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: 'Sanatan Airlines | A More Personal Way to Experience the World',
    template: '%s | Sanatan Airlines',
  },
  description: 'Personal coordination across aviation, international membership and global services.',
  openGraph: { type: 'website', siteName: 'Sanatan Airlines' },
  // Google Search Console ownership (HTML-tag method): set GOOGLE_SITE_VERIFICATION to the token only.
  ...(process.env.GOOGLE_SITE_VERIFICATION?.trim()
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION.trim() } }
    : {}),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': siteUrl ? `${siteUrl}/#organization` : undefined,
    name: 'Sanatan Airlines',
    legalName: 'Sanatan Airlines Private Limited',
    ...(siteUrl ? { url: siteUrl, logo: `${siteUrl}/icon.svg` } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Office No. 309, Elixa Park, Old Pune–Bangalore Highway, Shahupuri',
      addressLocality: 'Kolhapur',
      addressRegion: 'Maharashtra',
      postalCode: '416001',
      addressCountry: 'IN',
    },
  };

  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Tiro+Devanagari+Marathi&family=Noto+Sans+Bengali:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans+Telugu:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600;700&family=Noto+Sans+Gujarati:wght@400;500;600;700&family=Noto+Sans+Kannada:wght@400;500;600;700&family=Noto+Sans+Malayalam:wght@400;500;600;700&family=Noto+Sans+Gurmukhi:wght@400;500;600;700&family=Noto+Sans+Oriya:wght@400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c') }} />
        <I18nProviderWrapper>
          <SiteFeatures /><SiteMotion />{children}
        </I18nProviderWrapper>
      </body>
    </html>
  );
}
