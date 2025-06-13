'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { getCookie } from 'cookies-next';
import MobileNav from './MobileNav';
import LanguageSwitcher from './LanguageSwitcher';
import ClientNavLinks from './ClientNavLinks';
import { useNavTranslations } from '../hooks/useNavTranslations';

export default function Navbar() {
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

  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-sm fixed top-0 left-0 z-20">
      <div className="flex items-center gap-2">
        <Link href={`/${currentLocale}`}>
          <div className="relative h-12 w-auto flex items-center">
            <Image 
              src="/logo.png" 
              alt="TransformArte Logo" 
              width={48}
              height={48}
              className="rounded-md"
              priority
            />
            <span className="font-bold text-xl text-primary ml-2">TransformArte</span>
          </div>
        </Link>
      </div>
      <div className="hidden md:flex gap-6 font-medium">
        <ClientNavLinks locale={currentLocale} translations={translations} />
        <LanguageSwitcher />
      </div>
      <div className="flex items-center gap-4 md:hidden">
        <LanguageSwitcher />
        <MobileNav />
      </div>
    </nav>
  );
} 