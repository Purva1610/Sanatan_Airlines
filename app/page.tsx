import type { Metadata } from 'next';
import HomePage from '../src/App.jsx';
import { getRouteMetadata } from '../src/seo.js';
import { BreadcrumbStructuredData } from '../src/SeoStructuredData.jsx';
import { getConfiguredSiteOrigin } from '../src/siteConfig.js';

export const metadata: Metadata = {
  title: { absolute: 'Sanatan Airlines | A More Personal Way to Experience the World' },
  description: 'Premium aviation coordination, international travel membership and global business services, connected through a personal service ecosystem.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Sanatan Airlines | A More Personal Way to Experience the World',
    description: 'Premium aviation coordination, international travel membership and global business services, connected through a personal service ecosystem.',
    type: 'website',
  },
};

function WebPageSchema() {
  const siteUrl = getConfiguredSiteOrigin();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Sanatan Aviation',
    description: getRouteMetadata('/').description,
    ...(siteUrl ? { url: siteUrl, isPartOf: { '@type': 'WebSite', name: 'Sanatan Aviation', url: siteUrl } } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}

export default function Page() {
  const siteUrl = getConfiguredSiteOrigin();
  return <><WebPageSchema /><BreadcrumbStructuredData origin={siteUrl} items={[[ 'Home', '/' ]]} /><HomePage /></>;
}
