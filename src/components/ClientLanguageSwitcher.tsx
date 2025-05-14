'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function ClientLanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (newLocale: string) => {
    // Extract current locale from pathname
    const pathnameWithoutLocale = pathname?.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '';
    
    // Navigate to the new locale path
    const newPath = `/${newLocale}${pathnameWithoutLocale || ''}`;
    router.push(newPath);
    
    setIsOpen(false);
  };

  const locale = currentLocale || 'es';

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 text-gray-700 hover:text-primary"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{locale === 'es' ? '🇪🇸' : '🇺🇸'}</span>
        <span className="hidden md:inline">{locale === 'es' ? 'Español' : 'English'}</span>
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
              locale === 'es' ? 'bg-gray-100' : ''
            }`}
          >
            🇪🇸 Español
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
              locale === 'en' ? 'bg-gray-100' : ''
            }`}
          >
            🇺🇸 English
          </button>
        </div>
      )}
    </div>
  );
} 