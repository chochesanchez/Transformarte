import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n';

// Create the middleware
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  // Use prefix path routing for better SEO and user experience
  localePrefix: 'always',
  // Disable automatic locale detection since we'll handle it
  localeDetection: false
});

export default async function middleware(request: NextRequest) {
  // Get the locale from cookie
  const savedLocale = request.cookies.get('NEXT_LOCALE')?.value;
  
  // If there's a saved locale and it's different from the current path
  if (savedLocale && locales.includes(savedLocale as any)) {
    const pathname = request.nextUrl.pathname;
    const currentLocale = pathname.split('/')[1];
    
    // If the path doesn't have a locale or has a different locale
    if (!locales.includes(currentLocale as any) || currentLocale !== savedLocale) {
      // Redirect to the saved locale
      const newPath = `/${savedLocale}${pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || ''}`;
      return NextResponse.redirect(new URL(newPath, request.url));
    }
  }

  // Continue with the intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - files with extensions (e.g. favicon.ico)
  // - static assets
  // - API routes
  // - public files
  matcher: [
    '/((?!api|_next/static|_next/image|images|assets|favicon.ico|manifest.json|robots.txt|.*\\..*).*)']
}; 