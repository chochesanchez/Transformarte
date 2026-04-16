'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileNavProps {
  currentLocale: string;
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

export default function ClientMobileNav({ currentLocale, translations }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const locale = currentLocale || 'es';
  const [isAuthed, setIsAuthed] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/auth', { cache: 'no-store', credentials: 'include' })
      .then(r => r.json())
      .then(j => { if (!cancelled) setIsAuthed(!!j.user); })
      .catch(() => { if (!cancelled) setIsAuthed(false); });
    return () => { cancelled = true; };
  }, []);
  
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
        <>
          {/* Backdrop — tap outside to close */}
          <div
            className="fixed inset-0 top-20 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          {/* Menu panel — fixed so it always sits flush below the 80px navbar */}
          <div className="fixed inset-x-0 top-20 z-50 bg-white shadow-lg py-6 px-8">
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
                href={`/${locale}/servicios`}
                className={`hover:text-primary transition-colors ${isActive('/servicios')}`}
                onClick={() => setIsOpen(false)}
              >
                {translations.programs}
              </Link>
              <Link
                href={`/${locale}/quienes-somos`}
                className={`hover:text-primary transition-colors ${isActive('/quienes-somos')}`}
                onClick={() => setIsOpen(false)}
              >
                {translations.about}
              </Link>
              <Link
                href={`/${locale}/catalogo`}
                className={`hover:text-primary transition-colors ${isActive('/catalogo')}`}
                onClick={() => setIsOpen(false)}
              >
                {translations.gallery}
              </Link>
              <Link
                href={`/${locale}/comunidad`}
                className={`hover:text-primary transition-colors ${isActive('/comunidad')}`}
                onClick={() => setIsOpen(false)}
              >
                {translations.community}
              </Link>
              <Link
                href={`/${locale}/patrocinadores`}
                className={`hover:text-primary transition-colors ${isActive('/patrocinadores')}`}
                onClick={() => setIsOpen(false)}
              >
                {translations.sponsors}
              </Link>
              <Link
                href={`/${locale}/contacto`}
                className={`hover:text-primary transition-colors ${isActive('/contacto')}`}
                onClick={() => setIsOpen(false)}
              >
                {translations.contact}
              </Link>
              {!isAuthed && (
                <Link
                  href={`/${locale}/auth`}
                  className="hover:text-primary transition-colors text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  {translations.login || (locale === 'en' ? 'Login' : 'Iniciar sesion')}
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
