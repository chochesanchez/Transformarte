import React from 'react';
import Link from 'next/link';
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

  // Cities for the tour
  const tourCities = [
    { name: 'Monterrey', icon: '📍' },
    { name: 'San Luis Potosí', icon: '📍' },
    { name: 'Nuevo Laredo', icon: '📍' },
    { name: 'Reynosa', icon: '📍' },
    { name: 'Ciudad Victoria', icon: '📍' },
    { name: 'Tampico', icon: '📍' },
    { name: 'Matamoros', icon: '📍' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-white min-h-[90vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-400 to-yellow-200 z-0" />
        <div className="absolute inset-0 bg-black/30 z-[1]" />
        <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-md leading-tight">
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
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-10 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-xl inline-block text-center"
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
                style={{ width: 'auto', height: '100%', display: 'block' }}
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Acerca de TransformArte Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-primary">
            {locale === 'en' ? 'About TransformArte' : 'Acerca de TransformArte'}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center mb-12">
            {t('summary')}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="font-bold text-xl mb-3 text-blue-900">
                {locale === 'en' ? 'Art Exhibitions' : 'Exposiciones de Arte'}
              </h3>
              <p className="text-gray-600">
                {locale === 'en' 
                  ? 'Showcasing donated artworks across 7 cities in Mexico' 
                  : 'Exhibiendo obras donadas en 7 ciudades de México'}
              </p>
            </div>
            <div className="bg-yellow-50 p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-4">💙</div>
              <h3 className="font-bold text-xl mb-3 text-blue-900">
                {locale === 'en' ? 'Mental Health' : 'Salud Mental'}
              </h3>
              <p className="text-gray-600">
                {locale === 'en' 
                  ? 'Supporting youth mental health awareness and prevention' 
                  : 'Apoyando la conciencia y prevención de salud mental juvenil'}
              </p>
            </div>
            <div className="bg-green-50 p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="font-bold text-xl mb-3 text-blue-900">
                {locale === 'en' ? 'Community' : 'Comunidad'}
              </h3>
              <p className="text-gray-600">
                {locale === 'en' 
                  ? 'Uniting Rotary clubs, artists, and youth for positive change' 
                  : 'Uniendo clubes Rotarios, artistas y jóvenes para un cambio positivo'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* La Crisis de Salud Mental en México - RED GRADIENT SECTION */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            {locale === 'en' ? 'The Mental Health Crisis in Mexico' : 'La Crisis de Salud Mental en México'}
          </h2>
          <p className="text-white/90 text-lg mb-12">
            {locale === 'en' 
              ? 'These numbers show why our mission matters' 
              : 'Estos números muestran por qué nuestra misión importa'}
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-red-600/30 backdrop-blur-sm p-8 rounded-2xl">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">504,000</div>
              <p className="text-white/90 text-lg">
                {locale === 'en' 
                  ? 'Children and adolescents suffer from a mental health condition in Mexico' 
                  : 'Niñas, niños y adolescentes padecen de una condición mental en México'}
              </p>
            </div>
            <div className="bg-orange-600/30 backdrop-blur-sm p-8 rounded-2xl">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">22.6%</div>
              <p className="text-white/90 text-lg">
                {locale === 'en' 
                  ? 'Do not have access to mental health services' 
                  : 'No tienen acceso a servicios de salud mental'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gira TransformArte Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                {locale === 'en' ? 'TOUR 2026-2027' : 'GIRA 2026-2027'}
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {locale === 'en' ? 'TransformArte Tour' : 'Gira TransformArte'}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {locale === 'en' 
                  ? 'Join us on this transformative journey with an exhibition of 60 masterpieces that make up an innovative tour combining art and psychology called Laberinto TransformArte.' 
                  : 'Únete a nosotros en este viaje transformador con una exhibición de 60 obras maestras que conforman un innovador recorrido combinando arte y psicología llamado Laberinto TransformArte.'}
              </p>
              
              {/* Cities */}
              <div className="flex flex-wrap gap-3 mb-6">
                {tourCities.map((city) => (
                  <span key={city.name} className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm text-gray-700">
                    {city.icon} {city.name}
                  </span>
                ))}
              </div>
              
              {/* Date */}
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-xl">📅</span>
                <span>{locale === 'en' ? 'July 16, 2026 - April 25, 2027' : '16 de julio, 2026 - 25 de abril, 2027'}</span>
              </div>
            </div>
            
            {/* Laberinto Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">🎨</span>
                <h3 className="text-2xl font-bold text-gray-900">
                  {locale === 'en' ? 'Laberinto TransformArte' : 'Laberinto TransformArte'}
                </h3>
              </div>
              <p className="text-gray-600 mb-8">
                {locale === 'en' 
                  ? 'An innovative tour combining art and psychology' 
                  : 'Un innovador recorrido combinando arte y psicología'}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">60</div>
                  <div className="text-gray-600 text-sm">{locale === 'en' ? 'Masterpieces' : 'Obras Maestras'}</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-600">8</div>
                  <div className="text-gray-600 text-sm">{locale === 'en' ? 'Cities' : 'Ciudades'}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">500+</div>
                  <div className="text-gray-600 text-sm">{locale === 'en' ? 'Youth Benefited' : 'Jóvenes Beneficiados'}</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600">25</div>
                  <div className="text-gray-600 text-sm">{locale === 'en' ? 'Workshops' : 'Talleres'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* La Importancia de la Salud Mental Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            {locale === 'en' ? 'The Importance of Mental Health' : 'La Importancia de la Salud Mental'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="font-bold text-xl mb-3 text-gray-900">
                {locale === 'en' ? 'Prevention Focus' : 'Enfoque en Prevención'}
              </h4>
              <p className="text-gray-600">
                {locale === 'en' 
                  ? 'Early intervention through creative expression and professional support'
                  : 'Intervención temprana a través de expresión creativa y apoyo profesional'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h4 className="font-bold text-xl mb-3 text-gray-900">
                {locale === 'en' ? 'Art as Therapy' : 'Arte como Terapia'}
              </h4>
              <p className="text-gray-600">
                {locale === 'en' 
                  ? 'Using artistic expression as a tool for emotional processing and healing'
                  : 'Usando la expresión artística como herramienta para procesar emociones y sanar'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤲</div>
              <h4 className="font-bold text-xl mb-3 text-gray-900">
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
      </section>

      {/* Próximos Eventos */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('events.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEvents.map((eventKey) => (
              <div key={eventKey} className="bg-white rounded-xl shadow-md p-6 transform transition-transform hover:scale-105 hover:shadow-lg">
                <div className="text-sm text-gray-500 mb-2">
                  {t(`events.${eventKey}.location`)}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{t(`events.${eventKey}.title`)}</h3>
                <p className="text-primary font-medium">{t(`events.${eventKey}.date`)}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/proyecto#eventos`}
              className="text-blue-600 hover:text-blue-800 font-semibold text-lg"
            >
              {t('events.viewAll')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Mensajes / Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            {t('testimonials.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <blockquote className="text-gray-700 italic leading-relaxed">
                  &ldquo;{t(`testimonials.messages.${index}`)}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate Call to Action */}
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
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-10 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-xl inline-block"
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
