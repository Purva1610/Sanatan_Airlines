import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AviationPage from '../../src/AviationPage.jsx';
import AviationServicePage from '../../src/AviationServicePage.jsx';
import ClubPage from '../../src/ClubPage.jsx';
import LuxuryTravelPage from '../../src/LuxuryTravelPage.jsx';
import TirthYatraPage from '../../src/TirthYatraPage.jsx';
import FranchisePage from '../../src/FranchisePage.jsx';
import GlobalServicesPage from '../../src/GlobalServicesPage.jsx';
import { CareerPage, PartnerEnquiryPage, PrivacyPolicyPage } from '../../src/LeadPages.jsx';
import CorporatePage from '../../src/CorporatePages.jsx';
import { getRouteMetadata, noIndexRoutes, publicRoutes } from '../../src/seo.js';
import { getConfiguredSiteOrigin } from '../../src/siteConfig.js';
import { BreadcrumbStructuredData } from '../../src/SeoStructuredData.jsx';
import PageSkin from '../../src/PageSkin.jsx';

export const dynamicParams = false;

const premiumAviationRoutes: Record<string, string> = {
  '/aviation/private-jet-charter': 'private-jet-charter',
  '/aviation/helicopter-charter': 'helicopter-charter',
  '/aviation/air-ambulance': 'air-ambulance',
  '/aviation/aircraft-advisory': 'aircraft-advisory',
  '/aviation/aircraft-leasing': 'aircraft-leasing',
  '/aviation/concierge': 'aviation-concierge',
  '/aviation/aviation-concierge': 'aviation-concierge',
  '/aviation/international-charter': 'international-charter',
};

const clubExperienceRoutes: Record<string, 'overview' | 'enquiry'> = {
  '/club': 'overview',
  '/club/membership': 'enquiry',
};

const tirthYatraRoutes: Record<string, 'overview' | 'enquiry'> = {
  '/tirth-yatra': 'overview',
  '/tirth-yatra/enquiry': 'enquiry',
};

const routeComponents = {
  '/aviation': AviationPage,
  '/global-services': GlobalServicesPage,
  '/franchise': FranchisePage,
  '/partners/enquiry': PartnerEnquiryPage,
  '/careers': CareerPage,
  '/privacy-policy': PrivacyPolicyPage,
  '/about': CorporatePage,
  '/leadership': CorporatePage,
  '/contact': CorporatePage,
  '/partners': CorporatePage,
  '/compliance': CorporatePage,
  '/insights': CorporatePage,
  '/faqs': CorporatePage,
  '/terms': CorporatePage,
  '/cookie-policy': CorporatePage,
  '/cancellation-refund': CorporatePage,
  '/aviation/disclaimer': CorporatePage,
  '/accessibility': CorporatePage,
  '/grievance': CorporatePage,
};

function routeFor(slug: string[]) {
  return `/${slug.join('/')}`;
}

export function generateStaticParams() {
  return publicRoutes
    .filter((route) => route !== '/' && route !== '/enquire' && !route.startsWith('/airline'))
    .map((route) => ({ slug: route.slice(1).split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const pathname = routeFor(slug);
  const page = getRouteMetadata(pathname);
  const noIndex = noIndexRoutes.includes(pathname);
  const canonical = pathname;
  const isPremiumAviation = Boolean(premiumAviationRoutes[pathname]);
  return {
    ...page,
    ...(isPremiumAviation ? { title: { absolute: `${page.title} | Sanatan Aviation` } } : {}),
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: `${page.title} | ${isPremiumAviation ? 'Sanatan Aviation' : 'Sanatan Airlines'}`,
      description: page.description,
      type: 'website',
      url: canonical,
      // A page-level openGraph object replaces the root one, so the default share image is restated here.
      images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Sanatan Airlines — aviation, International Club and global services' }],
    },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description, images: ['/images/og-default.jpg'] },
  };
}

function WebPageSchema({ pathname }: { pathname: string }) {
  const siteUrl = getConfiguredSiteOrigin();
  const page = getRouteMetadata(pathname);
  const canonical = siteUrl ? `${siteUrl}${pathname}` : undefined;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    ...(canonical ? { url: canonical, isPartOf: { '@type': 'WebSite', name: 'Sanatan Airlines', url: siteUrl } } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}

function Breadcrumbs({ pathname, visual = true }: { pathname: string; visual?: boolean }) {
  const segments = pathname.split('/').filter(Boolean);
  const items = [{ title: 'Home', href: '/' }];
  let current = '';
  for (const segment of segments) {
    current += `/${segment}`;
    if (publicRoutes.includes(current)) items.push({ title: getRouteMetadata(current).title, href: current });
  }
  return (
    <>
      <BreadcrumbStructuredData origin={getConfiguredSiteOrigin()} items={items.map((item) => [item.title, item.href])} />
      {visual && (
        <nav className="site-breadcrumbs" aria-label="Breadcrumb">
          <ol>{items.map((item, index) => <li key={item.href}>{index === items.length - 1 ? <span aria-current="page">{item.title}</span> : <Link href={item.href}>{item.title}</Link>}</li>)}</ol>
        </nav>
      )}
    </>
  );
}

export default async function PublicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const pathname = routeFor(slug);
  const tirthMode = tirthYatraRoutes[pathname];
  if (tirthMode) {
    return (
      <>
        <WebPageSchema pathname={pathname} />
        <Breadcrumbs pathname={pathname} visual={false} />
        <PageSkin route={pathname}><TirthYatraPage mode={tirthMode} /></PageSkin>
      </>
    );
  }
  const clubMode = clubExperienceRoutes[pathname];
  if (clubMode) {
    return (
      <>
        <WebPageSchema pathname={pathname} />
        <Breadcrumbs pathname={pathname} visual={false} />
        <PageSkin route={pathname}><LuxuryTravelPage mode={clubMode} /></PageSkin>
      </>
    );
  }
  const premiumService = premiumAviationRoutes[pathname];
  if (premiumService) {
    return (
      <>
        <WebPageSchema pathname={pathname} />
        <Breadcrumbs pathname={pathname} visual={false} />
        <PageSkin route={pathname}><AviationServicePage service={premiumService} /></PageSkin>
      </>
    );
  }
  const Component = routeComponents[pathname as keyof typeof routeComponents]
    || (pathname.startsWith('/aviation/') ? AviationPage : undefined)
    || (pathname.startsWith('/club/') ? ClubPage : undefined)
    || (pathname.startsWith('/global-services/') ? GlobalServicesPage : undefined)
    || (pathname.startsWith('/franchise/') ? FranchisePage : undefined);
  if (!Component) notFound();
  const page = <Component />;
  // premium-keep: the premium theme layer intentionally skips the About page.
  const body = pathname === '/about' ? <div className="premium-keep" style={{ display: 'contents' }}>{page}</div> : <PageSkin route={pathname}>{page}</PageSkin>;
  return <><WebPageSchema pathname={pathname} /><Breadcrumbs pathname={pathname} />{body}</>;
}
