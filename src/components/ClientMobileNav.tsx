'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileNavProps {
  currentLocale: string;
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

export default function ClientMobileNav({ currentLocale, translations }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const locale = currentLocale || 'es';
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const isActive = (path: string) => {
    const localePath = `/${locale}${path}`;
    return pathname === localePath || pathname === path ? 'text-primary font-semibold' : 'text-gray-700';
  };

  return (
    <div className="md:hidden">
      <button 
        onClick={toggleMenu}
        className="p-2"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md z-20 py-4 px-8">
          <nav className="flex flex-col space-y-4">
            <Link 
              href={`/${locale}`}
              className={`hover:text-primary transition-colors ${isActive('/')}`}
              onClick={() => setIsOpen(false)}
            >
              {translations.home}
            </Link>
            <Link 
              href={`/${locale}/proyecto`}
              className={`hover:text-primary transition-colors ${isActive('/proyecto')}`}
              onClick={() => setIsOpen(false)}
            >
              {translations.project}
            </Link>
            <Link 
              href={`/${locale}/quienes-somos`}
              className={`hover:text-primary transition-colors ${isActive('/quienes-somos')}`}
              onClick={() => setIsOpen(false)}
            >
              {translations.about}
            </Link>
            <Link 
              href={`/${locale}/donar`}
              className={`hover:text-primary transition-colors ${isActive('/donar')}`}
              onClick={() => setIsOpen(false)}
            >
              {translations.donate}
            </Link>
            <Link 
              href={`/${locale}/catalogo`}
              className={`hover:text-primary transition-colors ${isActive('/catalogo')}`}
              onClick={() => setIsOpen(false)}
            >
              {translations.catalog}
            </Link>
            <Link 
              href={`/${locale}/comunidad`}
              className={`hover:text-primary transition-colors ${isActive('/comunidad')}`}
              onClick={() => setIsOpen(false)}
            >
              {translations.community}
            </Link>
            <Link 
              href={`/${locale}/contacto`}
              className={`hover:text-primary transition-colors ${isActive('/contacto')}`}
              onClick={() => setIsOpen(false)}
            >
              {translations.contact}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
} 