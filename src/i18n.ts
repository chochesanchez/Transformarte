import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Define all supported locales
export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

export default getRequestConfig(async ({ locale }) => {
  const effectiveLocale: Locale =
    typeof locale === 'string' && (locales as readonly string[]).includes(locale)
      ? (locale as Locale)
      : defaultLocale;

  try {
    const messages = (await import(`../messages/${effectiveLocale}.json`)).default;
    return {
      locale: effectiveLocale,
      messages,
      timeZone: 'America/Mexico_City'
    };
  } catch (error) {
    // Fail silent and keep UX clean; provide empty messages fallback
    return {
      locale: effectiveLocale,
      messages: {},
      timeZone: 'America/Mexico_City'
    };
  }
});