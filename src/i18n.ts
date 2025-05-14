import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Define all supported locales
export const locales = ['en', 'es'];
export const defaultLocale = 'es';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is supported
  if (!locales.includes(locale as any)) {
    console.warn(`Unsupported locale requested: ${locale}, falling back to ${defaultLocale}`);
    return { locale: defaultLocale as string, messages: {} };
  }

  try {
    // Use proper relative path starting from the project root
    const messages = (await import(`../messages/${locale}.json`)).default;
    return {
      locale: locale as string,
      messages
    };
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}`, error);
    // Return empty messages instead of failing completely
    return {
      locale: locale as string,
      messages: {}
    };
  }
}); 