import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  // Use prefix path routing for better SEO and user experience
  localePrefix: 'always',
  // Enable locale detection
  localeDetection: true
});

export const config = {
  // Match all pathnames except for
  // - files with extensions (e.g. favicon.ico)
  // - static assets
  // - API routes
  // - public files
  matcher: [
    '/((?!api|_next/static|_next/image|images|assets|favicon.ico|manifest.json|robots.txt|.*\\..*).*)']
}; 