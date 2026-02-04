'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function Footer() {
  const locale = useLocale() || 'es';
  
  const footerLinks = [
    { href: `/${locale}`, label: locale === 'en' ? 'Home' : 'Inicio' },
    { href: `/${locale}/proyecto`, label: locale === 'en' ? 'Project' : 'Proyecto' },
    { href: `/${locale}/servicios`, label: locale === 'en' ? 'Programs' : 'Programas' },
    { href: `/${locale}/quienes-somos`, label: locale === 'en' ? 'About Us' : 'Quiénes Somos' },
    { href: `/${locale}/catalogo`, label: locale === 'en' ? 'Catalog' : 'Catálogo' },
    { href: `/${locale}/comunidad`, label: locale === 'en' ? 'Community' : 'Comunidad' },
    { href: `/${locale}/patrocinadores`, label: locale === 'en' ? 'Sponsors' : 'Patrocinadores' },
    { href: `/${locale}/contacto`, label: locale === 'en' ? 'Contact' : 'Contacto' },
  ];
  
  return (
    <footer className="relative overflow-hidden bg-blue-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/logo.png" 
                alt="TransformArte Logo" 
                className="h-12 w-auto rounded-md"
              />
              <h3 className="text-2xl font-bold">TransformArte</h3>
            </div>
            <p className="text-blue-100 leading-relaxed">
              {locale === 'en' 
                ? 'Initiative of Rotary District 4130 that fuses the power of art with mental health prevention in youth.'
                : 'Iniciativa del Rotary Distrito 4130 que fusiona el poder del arte con la prevención de la salud mental en jóvenes.'}
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">{locale === 'en' ? 'Links' : 'Enlaces'}</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-100 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support Mission */}
          <div>
            <h3 className="text-xl font-bold mb-6">
              {locale === 'en' ? 'Support Our Mission' : 'Apoya Nuestra Misión'}
            </h3>
            <p className="text-blue-100 mb-6">
              {locale === 'en' 
                ? 'Your contribution helps us bring mental health programs and art workshops to youth in Mexico.'
                : 'Tu contribución nos ayuda a llevar programas de salud mental y talleres de arte a jóvenes en México.'}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://alwayson.recaudia.com/cmrr/donor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-6 py-3 rounded-full text-center transition-colors"
              >
                {locale === 'en' ? 'Donate Now' : 'Donar Ahora'}
              </a>
              <Link 
                href={`/${locale}/donar`} 
                className="inline-block border border-white/50 hover:border-white text-white font-semibold px-6 py-3 rounded-full text-center transition-colors"
              >
                {locale === 'en' ? 'Donate Artwork' : 'Donar Obra'}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
            <a href="https://www.rotary.org" target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/Rotary Logo.png" 
                alt="Rotary International" 
                className="h-16 w-auto"
              />
            </a>
            <span className="text-blue-300">|</span>
            <span className="text-blue-200 font-medium">Distrito 4130</span>
          </div>
          <p className="text-center text-blue-200">
            © {new Date().getFullYear()} TransformArte. {locale === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
