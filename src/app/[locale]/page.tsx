import React from 'react';
import Link from 'next/link';
import { locales } from '@/i18n';

// Static content to ensure the page works
const translations = {
  en: {
    hero: {
      title: "TransformArte: Where Art and Mental Health Meet",
      subtitle: "Join our traveling tour and transform lives with your creativity.",
      cta: "Donate Your Artwork"
    },
    summary: "TransformArte is an initiative by Rotary District 4130 that combines the power of art with mental health prevention for young people aged 15 to 19. Through exhibitions, workshops, and auctions in seven cities across Mexico, we invite artists and Rotarians to donate works that inspire dialogue and awareness."
  },
  es: {
    hero: {
      title: "TransformArte: Donde el Arte y la Salud Mental se Encuentran",
      subtitle: "Únete a nuestra gira itinerante y transforma vidas con tu creatividad.",
      cta: "Dona tu Obra"
    },
    summary: "TransformArte es una iniciativa del Rotary Distrito 4130 que fusiona el poder del arte con la prevención de la salud mental en jóvenes de 15 a 19 años. A través de exposiciones, talleres y subastas en siete ciudades de México, invitamos a artistas y rotarios a donar obras que inspiran diálogo y conciencia."
  }
};

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: { locale: string }
}) {
  // Await params properly
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const t = translations[locale === 'en' ? 'en' : 'es'];

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-white h-[80vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-white to-yellow-100 z-0" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary drop-shadow">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-800">
            {t.hero.subtitle}
          </p>
          <Link href={`/${locale}/donar`} className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors shadow-lg">
            {t.hero.cta}
          </Link>
        </div>
      </section>

      {/* Resumen del Proyecto */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            {t.summary}
          </p>
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            {locale === 'en' ? 'Upcoming Events' : 'Próximos Eventos'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Monterrey</h3>
              <p className="text-gray-600 mb-2">12 de julio</p>
              <p className="text-gray-500">Rotary Club Monterrey</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">San Nicolás</h3>
              <p className="text-gray-600 mb-2">19 de julio</p>
              <p className="text-gray-500">Rotary Club San Nicolás</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Guadalupe</h3>
              <p className="text-gray-600 mb-2">26 de julio</p>
              <p className="text-gray-500">Rotary Club Guadalupe</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            {locale === 'en' ? 'Testimonials' : 'Testimonios'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow">
              <blockquote className="text-lg italic mb-4">
                &ldquo;Participar en TransformArte me permitió expresar mis emociones y apoyar a mi comunidad.&rdquo;
              </blockquote>
              <p className="font-semibold">— María López, Artista</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow">
              <blockquote className="text-lg italic mb-4">
                &ldquo;Ver a los jóvenes involucrarse me recordó el verdadero impacto del servicio rotario.&rdquo;
              </blockquote>
              <p className="font-semibold">— Luis García, Rotary Club Monterrey</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 