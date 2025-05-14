import { useLocale } from 'next-intl';
import ClientLanguageSwitcher from './ClientLanguageSwitcher';

export default function LanguageSwitcher() {
  // Always call hooks at the top level
  let locale = 'es'; // Default fallback
  
  try {
    // We need to call this regardless of whether it succeeds
    const detectedLocale = useLocale();
    locale = detectedLocale;
  } catch (error) {
    // If it fails, we already have the default fallback
    console.log('Locale detection failed, using default');
  }
  
  return <ClientLanguageSwitcher currentLocale={locale} />;
} 