import { useLocale } from 'next-intl';
import ClientMobileNav from './ClientMobileNav';
import { useNavTranslations, NavigationTranslations } from '../hooks/useNavTranslations';

export default function MobileNav() {
  // Always call hooks at the top level
  const locale = useLocale() || 'es';
  const translations = useNavTranslations();

  return <ClientMobileNav currentLocale={locale} translations={translations} />;
} 