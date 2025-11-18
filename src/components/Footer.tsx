'use client';

import React from 'react';
import Link from 'next/link';
// Using plain <img> for static logos to avoid Next/Image dev warnings in small fixed areas
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function Footer() {
  const locale = useLocale() || 'es';
  const nav = useTranslations('navigation');
  const f = useTranslations('footer');
  
  return (
    <footer className="relative overflow-hidden bg-blue-900 text-white py-12">
      {/* Remove oversized background mark entirely per user request */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4" style={{ height: 40 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/logo.png" 
                alt="TransformArte Logo" 
                style={{ width: 'auto', height: '100%' }}
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
            <h3 className="text-xl font-bold mb-4">{locale==='en' ? 'Support Our Mission' : 'Apoya Nuestra Misión'}</h3>
            <p className="text-blue-100 mb-4">
              {locale==='en' 
                ? 'Your contribution helps us bring mental health programs and art workshops to youth across Mexico.'
                : 'Tu contribución nos ayuda a llevar programas de salud mental y talleres de arte a jóvenes en México.'}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://alwayson.recaudia.com/cmrr/donor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-5 py-2 rounded-full text-center"
              >
                {locale==='en' ? 'Donate Now' : 'Donar Ahora'}
              </a>
              <Link href={`/${locale}/donar`} className="inline-block border border-white/40 hover:border-white text-white font-semibold px-5 py-2 rounded-full text-center">
                {locale==='en' ? 'Donate Artwork' : 'Donar Obra'}
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center text-blue-200">
          <div className="relative z-10 flex justify-center items-center mb-4" style={{ height: 100 }}>
            <a href="https://www.rotary.org" target="_blank" rel="noopener noreferrer" className="mx-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/Rotary Logo.png" 
                alt="Rotary International" 
                style={{ width: 'auto', height: 100 }}
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