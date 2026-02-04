import { useLocale } from 'next-intl';

// Default translations matching the live site navigation
const translations = {
  en: {
    home: 'Home',
    project: 'Project',
    programs: 'Programs',
    about: 'About Us',
    gallery: 'Gallery',
    community: 'Community',
    sponsors: 'Sponsors',
    contact: 'Contact',
    login: 'Login'
  },
  es: {
    home: 'Inicio',
    project: 'Proyecto',
    programs: 'Programas',
    about: 'Quiénes Somos',
    gallery: 'Galería',
    community: 'Comunidad',
    sponsors: 'Patrocinadores',
    contact: 'Contacto',
    login: 'Iniciar sesion'
  }
};

export interface NavigationTranslations {
  home: string;
  project: string;
  programs: string;
  about: string;
  gallery: string;
  community: string;
  sponsors: string;
  contact: string;
  login?: string;
}

export function useNavTranslations(): NavigationTranslations {
  // Always call hooks unconditionally at the top level
  const locale = useLocale();
  
  // Safe access to translations with fallback
  return translations[locale === 'en' ? 'en' : 'es'];
}
