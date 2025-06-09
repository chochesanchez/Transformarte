import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('hero.title'),
    description: t('summary'),
  };
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const featuredEvents = ['monterrey', 'sanLuis', 'nuevoLaredo'];

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-white min-h-[90vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-400 to-yellow-200 z-0" />
        <div className="absolute inset-0 bg-black/30 z-1" />
        <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-left mb-8 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-md">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/contacto`} className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-md text-lg font-semibold transition-colors shadow-lg inline-block text-center">
                {t('hero.cta')}
              </Link>
              <Link
                href={`/${locale}/proyecto#eventos`}
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-md text-lg font-semibold transition-colors shadow-lg inline-block text-center"
              >
                {t('hero.learnMore')}
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md shadow-2xl rounded-lg overflow-hidden">
              <Image 
                src="/artists-call.png" 
                alt={t('hero.imageAlt')}
                width={600}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Summary */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <Image 
              src="/logo.png" 
              alt="TransformArte Logo" 
              width={120}
              height={120}
              className="rounded-md"
            />
          </div>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            {t('summary')}
          </p>
          <div className="mt-12 text-center bg-blue-50 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">{t('mission.title')}</h2>
            <p className="text-blue-700">{t('mission.description')}</p>
          </div>
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('events.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEvents.map((eventKey) => (
              <div key={eventKey} className="bg-white rounded-lg shadow-md p-6 transform transition-transform hover:scale-105">
                <div className="bg-blue-100 text-blue-800 inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  {t(`events.${eventKey}.location`)}
            </div>
                <h3 className="text-xl font-semibold mb-2">{t(`events.${eventKey}.title`)}</h3>
                <p className="text-gray-600 mb-2">{t(`events.${eventKey}.date`)}</p>
            </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/proyecto#eventos`}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              {t('events.viewAll')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Messages */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            {t('testimonials.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md">
                <blockquote className="text-lg italic mb-4">
                  &ldquo;{t(`testimonials.messages.${index}`)}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{t('callToAction.title')}</h2>
          <p className="text-xl mb-10 text-blue-100">{t('callToAction.description')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href={`/${locale}/donar`} className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-md text-lg font-semibold transition-colors shadow-lg inline-block">
              {t('callToAction.buttonArtist')}
            </Link>
            <Link href={`/${locale}/comunidad`} className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-md text-lg font-semibold transition-colors shadow-lg inline-block">
              {t('callToAction.buttonVolunteer')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 