import type { Metadata } from 'next';
import EnquiryWizard from '../../src/EnquiryWizard.jsx';
import { getRouteMetadata } from '../../src/seo.js';
import { BreadcrumbStructuredData } from '../../src/SeoStructuredData.jsx';
import { getConfiguredSiteOrigin } from '../../src/siteConfig.js';
import PageSkin from '../../src/PageSkin.jsx';

export const metadata: Metadata = {
  ...getRouteMetadata('/enquire'),
  alternates: { canonical: '/enquire' },
  robots: { index: false, follow: false },
};

export default function EnquirePage() {
  const siteUrl = getConfiguredSiteOrigin();
  return <PageSkin route="/enquire"><><BreadcrumbStructuredData origin={siteUrl} items={[[ 'Home', '/' ], [ 'Enquiry', '/enquire' ]]} /><EnquiryWizard /></></PageSkin>;
}
