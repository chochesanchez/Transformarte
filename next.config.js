/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  './src/i18n.ts'
);

// In development, Next.js bundles react-refresh-utils into main-app.js.
// That runtime calls eval() for HMR. Without 'unsafe-eval' in dev, the browser
// blocks it, the React runtime fails to initialize, and all client-side JS breaks.
// In production, HMR is stripped from the build — 'unsafe-eval' is never needed.
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  reactStrictMode: true,

  // TypeScript errors must not be silenced — they represent real runtime risks.
  // If the build fails here, fix the type errors; do not re-add ignoreBuildErrors.

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'transform-arte.com.mx' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },

  headers: async () => {
    return [
      // ── Security headers applied to every route ──────────────────────────
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control',  value: 'on' },
          { key: 'X-XSS-Protection',        value: '1; mode=block' },
          { key: 'X-Frame-Options',          value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options',   value: 'nosniff' },
          { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            // 2-year HSTS with subdomains; signals intent to browsers and preload list
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            // 'unsafe-inline' required by the inline VisitPing script in layout.tsx.
            // 'unsafe-eval' required in development only — Next.js HMR (react-refresh)
            // uses eval(). Omitting it in dev breaks the React runtime entirely.
            // Production builds strip HMR so 'unsafe-eval' is never needed there.
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.supabase.co https://transform-arte.com.mx",
              "connect-src 'self' https://*.supabase.co https://*.sentry.io https://sentry.io https://alwayson.recaudia.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },

      // ── API routes: never cache, never serve stale data ───────────────────
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, max-age=0, must-revalidate',
          },
        ],
      },

      // ── Public pages: allow edge/CDN caching with quick revalidation ──────
      // This intentionally excludes /api/* (matched above) and build assets.
      {
        source: '/((?!api|_next/static|_next/image|favicon\\.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  httpAgentOptions: {
    keepAlive: true,
  },
  outputFileTracingRoot: __dirname,
};

module.exports = withNextIntl(nextConfig);
