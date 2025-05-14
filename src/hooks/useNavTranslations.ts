import { useLocale } from 'next-intl';

// Default fallback translations - now used as the primary source
const translations = {
  en: {
    home: 'Home',
    project: 'Project',
    about: 'About Us',
    donate: 'Donate Artwork',
    catalog: 'Catalog',
    community: 'Community',
    contact: 'Contact'
  },
  es: {
    home: 'Inicio',
    project: 'Proyecto',
    about: 'Quiénes Somos',
    donate: 'Donar Obra',
    catalog: 'Catálogo',
    community: 'Comunidad',
    contact: 'Contacto'
  }
};

export interface NavigationTranslations {
  home: string;
  project: string;
  about: string;
  donate: string;
  catalog: string;
  community: string;
  contact: string;
}

export function useNavTranslations(): NavigationTranslations {
  // Get the current locale
  let locale;
  try {
    locale = useLocale();
  } catch (error) {
    locale = 'es'; // Fallback to Spanish
  }
  
  // Simply return the hardcoded translations for the current locale
  return translations[locale === 'en' ? 'en' : 'es'];
} 