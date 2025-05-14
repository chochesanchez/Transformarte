import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  // Optional: Use prefix path routing instead of domain routing
  localePrefix: 'as-needed',
  // Add a fallback for when a non-supported locale is requested
  localeDetection: true
});

export const config = {
  // Match all pathnames except for
  // - files with extensions (e.g. favicon.ico)
  // - static assets
  // - API routes
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|.*\\..*).*)']
}; 