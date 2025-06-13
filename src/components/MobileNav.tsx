'use client';

import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import ClientMobileNav from './ClientMobileNav';
import { useNavTranslations, NavigationTranslations } from '../hooks/useNavTranslations';

export default function MobileNav() {
  const defaultLocale = useLocale() || 'es';
  const [currentLocale, setCurrentLocale] = useState(defaultLocale);
  const translations = useNavTranslations();

  // Update locale when cookie changes
  useEffect(() => {
    const savedLocale = getCookie('NEXT_LOCALE');
    if (savedLocale) {
      setCurrentLocale(savedLocale as string);
    }
  }, []);

  // Listen for storage events (language changes)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedLocale = getCookie('NEXT_LOCALE');
      if (savedLocale) {
        setCurrentLocale(savedLocale as string);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return <ClientMobileNav currentLocale={currentLocale} translations={translations} />;
} 