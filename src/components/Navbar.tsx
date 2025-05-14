import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import MobileNav from './MobileNav';
import LanguageSwitcher from './LanguageSwitcher';
import ClientNavLinks from './ClientNavLinks';
import { useNavTranslations } from '../hooks/useNavTranslations';

export default function Navbar() {
  // Always call hooks at the top level
  const locale = useLocale() || 'es';
  const translations = useNavTranslations();

  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-sm fixed top-0 left-0 z-20">
      <div className="flex items-center gap-2">
        <Link href={`/${locale}`}>
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
        <ClientNavLinks locale={locale} translations={translations} />
        <LanguageSwitcher />
      </div>
      <div className="flex items-center gap-4 md:hidden">
        <LanguageSwitcher />
        <MobileNav />
      </div>
    </nav>
  );
} 