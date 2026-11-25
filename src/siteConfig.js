const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '::1']);

export function getConfiguredSiteOrigin() {
  const publicValue = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const serverValue = process.env.SITE_URL?.trim();
  const value = publicValue || serverValue;
  if (!value) return undefined;

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error('SITE_URL and NEXT_PUBLIC_SITE_URL must be absolute site origins.');
  }

  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL and NEXT_PUBLIC_SITE_URL must contain only an absolute origin.');
  }

  if (publicValue && serverValue) {
    let serverOrigin;
    try {
      serverOrigin = new URL(serverValue).origin;
    } catch {
      throw new Error('SITE_URL and NEXT_PUBLIC_SITE_URL must be absolute site origins.');
    }
    if (serverOrigin !== url.origin) {
      throw new Error('SITE_URL and NEXT_PUBLIC_SITE_URL must use the same origin.');
    }
  }

  if (process.env.NODE_ENV === 'production' && !LOCAL_HOSTNAMES.has(url.hostname) && url.protocol !== 'https:') {
    throw new Error('Production SITE_URL and NEXT_PUBLIC_SITE_URL must use HTTPS.');
  }

  return url.origin;
}
