import type { MetadataRoute } from 'next';
import { getConfiguredSiteOrigin } from '../src/siteConfig.js';

export default function robots(): MetadataRoute.Robots {
  const origin = getConfiguredSiteOrigin();
  if (!origin && process.env.NODE_ENV === 'production') {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ...(origin ? { sitemap: `${origin}/sitemap.xml` } : {}),
  };
}
