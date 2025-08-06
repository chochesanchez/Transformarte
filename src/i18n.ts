import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Define all supported locales
export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is a string and validate it
  if (typeof locale !== 'string' || !locales.includes(locale as Locale)) {
    console.warn(`Unsupported locale requested: ${locale}, falling back to ${defaultLocale}`);
    return { locale: defaultLocale, messages: {} };
  }

  try {
    // Use proper relative path starting from the project root
    const messages = (await import(`../messages/${locale}.json`)).default;
    return {
      locale,
      messages,
      timeZone: 'America/Mexico_City'
    };
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}`, error);
    // Return empty messages instead of failing completely
    return {
      locale,
      messages: {},
      timeZone: 'America/Mexico_City'
    };
  }
}); 