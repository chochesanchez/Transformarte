'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function ClientLanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [displayLocale, setDisplayLocale] = useState(currentLocale);

  // Initialize language from cookie or default
  useEffect(() => {
    const savedLocale = getCookie('NEXT_LOCALE');
    if (savedLocale && savedLocale !== currentLocale) {
      changeLanguage(savedLocale as string);
    }
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (newLocale: string) => {
    // Extract current locale from pathname
    const pathnameWithoutLocale = pathname?.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '';
    
    // Save language preference in cookie
    setCookie('NEXT_LOCALE', newLocale, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/',
    });

    // Update the display locale
    setDisplayLocale(newLocale);

    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));

    // Navigate to the new locale path
    const newPath = `/${newLocale}${pathnameWithoutLocale || ''}`;
    router.push(newPath);
    
    // Force a hard refresh to update all components
    window.location.href = newPath;
    
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 text-gray-700 hover:text-primary"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="font-medium">{displayLocale.toUpperCase()}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md z-50">
          <button
            onClick={() => changeLanguage('es')}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
              displayLocale === 'es' ? 'bg-gray-100' : ''
            }`}
          >
            ES
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
              displayLocale === 'en' ? 'bg-gray-100' : ''
            }`}
          >
            EN
          </button>
        </div>
      )}
    </div>
  );
} 