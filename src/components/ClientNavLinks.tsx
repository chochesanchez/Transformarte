'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ClientNavLinksProps {
  locale: string;
  translations: {
    home: string;
    project: string;
    programs: string;
    about: string;
    gallery: string;
    community: string;
    sponsors: string;
    contact: string;
    login?: string;
  };
}

export default function ClientNavLinks({ locale, translations }: ClientNavLinksProps) {
  const pathname = usePathname();
  const [isAuthed, setIsAuthed] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/auth', { cache: 'no-store', credentials: 'include' })
      .then(r => r.json())
      .then(j => { if (!cancelled) setIsAuthed(!!j.user); })
      .catch(() => { if (!cancelled) setIsAuthed(false); });
    return () => { cancelled = true; };
  }, []);
  
  const isActive = (path: string) => {
    const localePath = `/${locale}${path}`;
    return pathname === localePath || pathname === path ? 'text-primary font-bold' : 'text-gray-700 font-medium';
  };

  return (
    <>
      <Link href={`/${locale}/proyecto`} className={`hover:text-primary transition-colors text-base ${isActive('/proyecto')}`}>
        {translations.project}
      </Link>
      <Link href={`/${locale}/servicios`} className={`hover:text-primary transition-colors text-base ${isActive('/servicios')}`}>
        {translations.programs}
      </Link>
      <Link href={`/${locale}/quienes-somos`} className={`hover:text-primary transition-colors text-base ${isActive('/quienes-somos')}`}>
        {translations.about}
      </Link>
      <Link href={`/${locale}/catalogo`} className={`hover:text-primary transition-colors text-base ${isActive('/catalogo')}`}>
        {translations.gallery}
      </Link>
      <Link href={`/${locale}/comunidad`} className={`hover:text-primary transition-colors text-base ${isActive('/comunidad')}`}>
        {translations.community}
      </Link>
      <Link href={`/${locale}/patrocinadores`} className={`hover:text-primary transition-colors text-base ${isActive('/patrocinadores')}`}>
        {translations.sponsors}
      </Link>
      <Link href={`/${locale}/contacto`} className={`hover:text-primary transition-colors text-base ${isActive('/contacto')}`}>
        {translations.contact}
      </Link>
      {!isAuthed && (
        <Link href={`/${locale}/auth`} className="hover:text-primary transition-colors text-gray-700 font-medium">
          {translations.login || (locale === 'en' ? 'Login' : 'Iniciar sesion')}
        </Link>
      )}
    </>
  );
}
