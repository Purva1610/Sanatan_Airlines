const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/airline',
        destination: '/',
        permanent: false,
      },
      {
        source: '/airline/:path*',
        destination: '/aviation',
        permanent: false,
      },
      // Duplicate short URLs → the single canonical policy page (avoids duplicate content in search).
      ...[
        ['/terms', '/terms-and-conditions'],
        ['/grievance', '/grievance-redressal'],
        ['/cancellation-refund', '/cancellation-refund-policy'],
        ['/aviation/disclaimer', '/aviation-disclaimer'],
        ['/franchise/disclaimer', '/franchise-disclaimer'],
      ].map(([source, destination]) => ({ source, destination, permanent: true })),
      {
        source: '/aviation/aviation-concierge',
        destination: '/aviation/concierge',
        permanent: true,
      },
    ];
  },
  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    ];

    if (process.env.ENABLE_HSTS === 'true') {
      securityHeaders.push({ key: 'Strict-Transport-Security', value: 'max-age=31536000' });
    }

    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
