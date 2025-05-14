'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ClientNavLinksProps {
  locale: string;
  translations: {
    home: string;
    project: string;
    about: string;
    donate: string;
    catalog: string;
    community: string;
    contact: string;
  };
}

export default function ClientNavLinks({ locale, translations }: ClientNavLinksProps) {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    const localePath = `/${locale}${path}`;
    return pathname === localePath || pathname === path ? 'text-primary font-semibold' : 'text-gray-700';
  };

  return (
    <>
      <Link href={`/${locale}`} className={`hover:text-primary transition-colors ${isActive('/')}`}>
        {translations.home}
      </Link>
      <Link href={`/${locale}/proyecto`} className={`hover:text-primary transition-colors ${isActive('/proyecto')}`}>
        {translations.project}
      </Link>
      <Link href={`/${locale}/quienes-somos`} className={`hover:text-primary transition-colors ${isActive('/quienes-somos')}`}>
        {translations.about}
      </Link>
      <Link href={`/${locale}/donar`} className={`hover:text-primary transition-colors ${isActive('/donar')}`}>
        {translations.donate}
      </Link>
      <Link href={`/${locale}/catalogo`} className={`hover:text-primary transition-colors ${isActive('/catalogo')}`}>
        {translations.catalog}
      </Link>
      <Link href={`/${locale}/comunidad`} className={`hover:text-primary transition-colors ${isActive('/comunidad')}`}>
        {translations.community}
      </Link>
      <Link href={`/${locale}/contacto`} className={`hover:text-primary transition-colors ${isActive('/contacto')}`}>
        {translations.contact}
      </Link>
    </>
  );
} 