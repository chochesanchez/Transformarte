import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('hero.title'),
    description: t('summary'),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
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
              <a 
                href="https://alwayson.recaudia.com/cmrr/donor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-10 py-5 rounded-full text-xl font-bold transition-all transform hover:scale-105 shadow-xl inline-block text-center"
              >
                {locale === 'en' ? 'DONATE NOW' : 'DONAR AHORA'}
              </a>
              <Link
                href={`/${locale}/donar`}
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors shadow-lg inline-block text-center"
              >
                {locale === 'en' ? 'Donate Artwork' : 'Donar Obra'}
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md flex items-center justify-center" style={{ height: 320 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/logo.png" 
                alt="TransformArte Logo"
                style={{ width: 'auto', height: '100%', display: 'block', transform: 'translateX(ver16px)' }}
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Summary */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-primary">
            {locale === 'en' ? 'About TransformArte' : 'Acerca de TransformArte'}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
            {t('summary')}
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-bold text-xl mb-2 text-blue-900">
                {locale === 'en' ? 'Art Exhibitions' : 'Exposiciones de Arte'}
              </h3>
              <p className="text-gray-700">
                {locale === 'en' 
                  ? 'Showcasing donated artworks across 7 cities in Mexico' 
                  : 'Exhibiendo obras donadas en 7 ciudades de México'}
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">💙</div>
              <h3 className="font-bold text-xl mb-2 text-blue-900">
                {locale === 'en' ? 'Mental Health' : 'Salud Mental'}
              </h3>
              <p className="text-gray-700">
                {locale === 'en' 
                  ? 'Supporting youth mental health awareness and prevention' 
                  : 'Apoyando la conciencia y prevención de salud mental juvenil'}
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-bold text-xl mb-2 text-blue-900">
                {locale === 'en' ? 'Community' : 'Comunidad'}
              </h3>
              <p className="text-gray-700">
                {locale === 'en' 
                  ? 'Uniting Rotary clubs, artists, and youth for positive change' 
                  : 'Uniendo clubes Rotarios, artistas y jóvenes para un cambio positivo'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mental Health Importance Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-primary">
            {locale === 'en' ? 'The Importance of Mental Health' : 'La Importancia de la Salud Mental'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {locale === 'en' 
                  ? 'Mental health is fundamental to our overall well-being. In Mexico, young people aged 15-19 face unique challenges that can impact their mental health. Through art and community support, we create safe spaces for expression and healing.'
                  : 'La salud mental es fundamental para nuestro bienestar general. En México, los jóvenes de 15 a 19 años enfrentan desafíos únicos que pueden impactar su salud mental. A través del arte y el apoyo comunitario, creamos espacios seguros para la expresión y sanación.'}
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h4 className="font-bold text-lg mb-1">
                      {locale === 'en' ? 'Prevention Focus' : 'Enfoque en Prevención'}
                    </h4>
                    <p className="text-gray-600">
                      {locale === 'en' 
                        ? 'Early intervention through creative expression and professional support'
                        : 'Intervención temprana a través de expresión creativa y apoyo profesional'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <h4 className="font-bold text-lg mb-1">
                      {locale === 'en' ? 'Art as Therapy' : 'Arte como Terapia'}
                    </h4>
                    <p className="text-gray-600">
                      {locale === 'en' 
                        ? 'Using artistic expression as a tool for emotional processing and healing'
                        : 'Usando la expresión artística como herramienta para procesar emociones y sanar'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🤲</span>
                  <div>
                    <h4 className="font-bold text-lg mb-1">
                      {locale === 'en' ? 'Community Support' : 'Apoyo Comunitario'}
                    </h4>
                    <p className="text-gray-600">
                      {locale === 'en' 
                        ? 'Building networks of support between youth, families, and professionals'
                        : 'Construyendo redes de apoyo entre jóvenes, familias y profesionales'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-center text-blue-900">
                {locale === 'en' ? 'Impact Statistics' : 'Estadísticas de Impacto'}
              </h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">7</div>
                  <div className="text-gray-700">
                    {locale === 'en' ? 'Cities Reached' : 'Ciudades Alcanzadas'}
                  </div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">500+</div>
                  <div className="text-gray-700">
                    {locale === 'en' ? 'Youth Participants' : 'Jóvenes Participantes'}
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">50+</div>
                  <div className="text-gray-700">
                    {locale === 'en' ? 'Artworks Donated' : 'Obras Donadas'}
                  </div>
                </div>
              </div>
            </div>
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

      {/* Donate Call to Action (Replacing Únete Section) */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            {locale === 'en' 
              ? 'Transform Lives Through Your Generosity' 
              : 'Transforma Vidas a Través de Tu Generosidad'}
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            {locale === 'en'
              ? 'Your donation helps us provide mental health support and art programs to youth across Mexico. Every contribution makes a difference.'
              : 'Tu donación nos ayuda a brindar apoyo de salud mental y programas de arte a jóvenes en todo México. Cada contribución marca la diferencia.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a 
              href="https://alwayson.recaudia.com/cmrr/donor"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-10 py-5 rounded-full text-xl font-bold transition-all transform hover:scale-105 shadow-xl inline-block"
            >
              {locale === 'en' ? '💝 DONATE NOW' : '💝 DONAR AHORA'}
            </a>
            <Link 
              href={`/${locale}/donar`} 
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors shadow-lg inline-block"
            >
              {locale === 'en' ? '🎨 Donate Artwork' : '🎨 Donar Obra de Arte'}
            </Link>
          </div>
          <p className="mt-8 text-sm text-blue-200">
            {locale === 'en'
              ? 'All donations are tax-deductible. Rotary District 4130 is a registered non-profit organization.'
              : 'Todas las donaciones son deducibles de impuestos. Distrito Rotario 4130 es una organización sin fines de lucro registrada.'}
          </p>
        </div>
      </section>
    </>
  );
}