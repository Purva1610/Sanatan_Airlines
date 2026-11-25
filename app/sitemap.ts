import type { MetadataRoute } from 'next';
import { noIndexRoutes, publicRoutes, redirectedRoutes } from '../src/seo.js';
import { getConfiguredSiteOrigin } from '../src/siteConfig.js';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getConfiguredSiteOrigin();
  if (!origin) return [];

  const policyRoutes = [
    '/privacy-policy',
    '/terms-and-conditions',
    '/cookie-policy',
    '/membership-terms',
    '/cancellation-refund-policy',
    '/franchise-disclaimer',
    '/aviation-disclaimer',
    '/accessibility',
    '/grievance-redressal',
  ];
  const launchPriority: Record<string, number> = {
    '/': 1,
    '/aviation': 0.9,
    '/club': 0.9,
    '/franchise': 0.9,
    '/about': 0.8,
    '/leadership': 0.7,
    '/contact': 0.9,
    '/careers': 0.7,
  };

  return [...new Set([...publicRoutes, ...policyRoutes])]
    .filter((route) => !noIndexRoutes.includes(route) && !redirectedRoutes.includes(route))
    .map((route) => ({
      url: `${origin}${route === '/' ? '' : route}`,
      changeFrequency: 'monthly' as const,
      priority: launchPriority[route]
        ?? (route.startsWith('/aviation') || route.startsWith('/club') || route.startsWith('/franchise') ? 0.8
          : route.startsWith('/global-services') || route.startsWith('/insights') || route.startsWith('/partners') || route.startsWith('/compliance') ? 0.6
          : 0.5),
    }));
}
