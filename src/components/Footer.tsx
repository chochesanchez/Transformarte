'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function Footer() {
  const locale = useLocale() || 'es';
  const nav = useTranslations('navigation');
  const f = useTranslations('footer');
  
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image 
                src="/logo.png" 
                alt="TransformArte Logo" 
                width={40}
                height={40}
                className="rounded-md"
              />
              <h3 className="text-xl font-bold">TransformArte</h3>
            </div>
            <p className="text-blue-100 mb-4">
              {f('description')}
            </p>
            {/* Social icons removed temporarily */}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{f('links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-blue-100 hover:text-white transition-colors">
                  {nav('home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/proyecto`} className="text-blue-100 hover:text-white transition-colors">
                  {nav('project')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/quienes-somos`} className="text-blue-100 hover:text-white transition-colors">
                  {nav('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/donar`} className="text-blue-100 hover:text-white transition-colors">
                  {nav('donate')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/catalogo`} className="text-blue-100 hover:text-white transition-colors">
                  {nav('catalog')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/comunidad`} className="text-blue-100 hover:text-white transition-colors">
                  {nav('community')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contacto`} className="text-blue-100 hover:text-white transition-colors">
                  {nav('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{f('contact')}</h3>
            <p className="text-blue-100">
              <strong>{f('email')}:</strong> transform.arte.com.mx@gmail.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center text-blue-200">
          <div className="flex justify-center items-center mb-4">
            <a href="https://www.rotary.org" target="_blank" rel="noopener noreferrer" className="mx-2">
              <Image 
                src="/Rotary Logo.png" 
                alt="Rotary International" 
                width={100}
                height={30}
              />
            </a>
            <span className="mx-2">|</span>
            <span className="mx-2">Distrito 4130</span>
          </div>
          <p>© {new Date().getFullYear()} TransformArte. {f('copyright')}</p>
        </div>
      </div>
    </footer>
  );
} 