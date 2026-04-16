'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
          <div className="relative flex items-center" style={{ height: 48, minWidth: 48 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="TransformArte Logo"
              style={{ height: '100%', width: 'auto' }}
            />
            <span className="font-bold text-xl text-primary ml-2 hidden sm:inline">TransformArte</span>
          </div>
        </Link>
      </div>
      <div className="hidden md:flex gap-6 font-medium">
        <ClientNavLinks locale={currentLocale} translations={translations} />
        {/* User icon / admin link */}
        <UserMenu locale={currentLocale} />
        <LanguageSwitcher />
      </div>
      <div className="flex items-center gap-4 md:hidden">
        <LanguageSwitcher />
        <UserMenu locale={currentLocale} />
        <MobileNav />
      </div>
    </nav>
  );
} 

function UserMenu({ locale }: { locale: string }) {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetch('/api/auth', { cache: 'no-store', credentials: 'include' })
      .then(r=>r.json())
      .then(j=>setUser(j.user || null))
      .catch(()=>setUser(null));
  }, []);
  if (!user) return null;
  const display = user.fullName || user.email || 'User';
  const initial = String(display).charAt(0).toUpperCase();
  return (
    <div className="relative">
      <button
        aria-label="User menu"
        onClick={() => setOpen((v) => !v)}
        className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold"
      >
        {initial}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-30">
          <div className="px-4 py-3 border-b">
            <div className="font-semibold text-gray-900 truncate">{display}</div>
            <div className="text-sm text-gray-600 truncate">{user.email}</div>
          </div>
          {user.role === 'admin' && (
            <Link href={`/${locale}/admin`} className="block px-4 py-2 text-sm hover:bg-gray-50">
              {locale==='en'?'Admin dashboard':'Panel de administración'}
            </Link>
          )}
          <Link href={`/${locale}/profile`} className="block px-4 py-2 text-sm hover:bg-gray-50">
            {locale==='en'?'Display Name':'Nombre para mostrar'}
          </Link>
          <button
            onClick={async () => {
              await fetch('/api/auth?action=logout', { method: 'POST', credentials: 'include' });
              window.location.reload();
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
          >
            {locale==='en'?'Log out':'Cerrar sesión'}
          </button>
        </div>
      )}
    </div>
  );
}