/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  './src/i18n.ts'
);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Domain configuration
  assetPrefix: 'https://transform-arte.com.mx',
  images: {
    domains: ['transform-arte.com.mx'],
  },
  // Cache and revalidation settings
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
          {
            // Security headers
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Preserve existing domain configuration
  trailingSlash: false,
  // Production optimizations
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  // Security settings
  httpAgentOptions: {
    keepAlive: true,
  },
  // Add any other Next.js config options here
};

// Apply multiple plugins
module.exports = withBundleAnalyzer(withNextIntl(nextConfig)); 