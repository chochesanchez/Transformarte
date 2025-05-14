import { useLocale } from 'next-intl';

// Default translations
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
  // Always call hooks unconditionally at the top level
  const locale = useLocale();
  
  // Safe access to translations with fallback
  return translations[locale === 'en' ? 'en' : 'es'];
} 