import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { locales } from '@/i18n';

// Static content to ensure the page works
const translations = {
  en: {
    hero: {
      title: "TransformArte: Where Art and Mental Health Meet",
      subtitle: "Join our traveling tour and transform lives with your creativity.",
      cta: "Donate Your Artwork",
      learnMore: "Learn More"
    },
    summary: "TransformArte is an initiative by Rotary District 4130 that combines the power of art with mental health prevention for young people aged 15 to 19. Through exhibitions, workshops, and auctions in seven cities across Mexico, we invite artists and Rotarians to donate works that inspire dialogue and awareness.",
    mission: {
      title: "Our Mission",
      description: "To promote mental health awareness among young people through art, creating a space for dialogue, expression, and community support."
    },
    events: {
      title: "Upcoming Events",
      viewAll: "View All Events"
    },
    testimonials: {
      title: "Testimonials"
    },
    callToAction: {
      title: "Join the Movement",
      description: "Become part of TransformArte by donating your artwork or volunteering in our events.",
      buttonArtist: "Call for Artists",
      buttonVolunteer: "Volunteer"
    }
  },
  es: {
    hero: {
      title: "TransformArte: Donde el Arte y la Salud Mental se Encuentran",
      subtitle: "Únete a nuestra gira itinerante y transforma vidas con tu creatividad.",
      cta: "Dona tu Obra",
      learnMore: "Conoce Más"
    },
    summary: "TransformArte es una iniciativa del Rotary Distrito 4130 que fusiona el poder del arte con la prevención de la salud mental en jóvenes de 15 a 19 años. A través de exposiciones, talleres y subastas en siete ciudades de México, invitamos a artistas y rotarios a donar obras que inspiran diálogo y conciencia.",
    mission: {
      title: "Nuestra Misión",
      description: "Promover la conciencia sobre la salud mental entre los jóvenes a través del arte, creando un espacio para el diálogo, la expresión y el apoyo comunitario."
    },
    events: {
      title: "Próximos Eventos",
      viewAll: "Ver Todos los Eventos"
    },
    testimonials: {
      title: "Testimonios"
    },
    callToAction: {
      title: "Únete al Movimiento",
      description: "Forma parte de TransformArte donando tu obra o siendo voluntario en nuestros eventos.",
      buttonArtist: "Convocatoria para Artistas",
      buttonVolunteer: "Voluntariado"
    }
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
      <section className="relative flex items-center justify-center text-white min-h-[90vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-400 to-yellow-200 z-0" />
        <div className="absolute inset-0 bg-black/30 z-1" />
        <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-left mb-8 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-md">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/donar`} className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-md text-lg font-semibold transition-colors shadow-lg inline-block text-center">
                {t.hero.cta}
              </Link>
              <Link href={`/${locale}/proyecto`} className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-md text-lg font-semibold transition-colors shadow-lg inline-block text-center">
                {t.hero.learnMore}
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md shadow-2xl rounded-lg overflow-hidden">
              <Image 
                src="/artists-call.png" 
                alt="TransformArte Convocatoria" 
                width={600}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resumen del Proyecto */}
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
            {t.summary}
          </p>
          <div className="mt-12 text-center bg-blue-50 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">{t.mission.title}</h2>
            <p className="text-blue-700">{t.mission.description}</p>
          </div>
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            {t.events.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 transform transition-transform hover:scale-105">
              <div className="bg-blue-100 text-blue-800 inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3">Monterrey</div>
              <h3 className="text-xl font-semibold mb-2">Exposición TransformArte</h3>
              <p className="text-gray-600 mb-2">12 de julio, 2025</p>
              <p className="text-gray-500 mb-4">Rotary Club Monterrey</p>
              <Link href={`/${locale}/eventos`} className="text-blue-600 font-medium hover:underline">Ver detalles →</Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 transform transition-transform hover:scale-105">
              <div className="bg-blue-100 text-blue-800 inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3">San Nicolás</div>
              <h3 className="text-xl font-semibold mb-2">Talleres de Arte y Salud Mental</h3>
              <p className="text-gray-600 mb-2">19 de julio, 2025</p>
              <p className="text-gray-500 mb-4">Rotary Club San Nicolás</p>
              <Link href={`/${locale}/eventos`} className="text-blue-600 font-medium hover:underline">Ver detalles →</Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 transform transition-transform hover:scale-105">
              <div className="bg-blue-100 text-blue-800 inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3">Guadalupe</div>
              <h3 className="text-xl font-semibold mb-2">Subasta de Arte Benéfica</h3>
              <p className="text-gray-600 mb-2">26 de julio, 2025</p>
              <p className="text-gray-500 mb-4">Rotary Club Guadalupe</p>
              <Link href={`/${locale}/eventos`} className="text-blue-600 font-medium hover:underline">Ver detalles →</Link>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href={`/${locale}/eventos`} className="text-blue-600 font-medium hover:underline text-lg">
              {t.events.viewAll} →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            {t.testimonials.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-yellow-400 flex items-center justify-center text-blue-900 font-bold text-xl mr-4">
                  ML
                </div>
                <div>
                  <p className="font-semibold">María López</p>
                  <p className="text-sm text-gray-600">Artista</p>
                </div>
              </div>
              <blockquote className="text-lg italic mb-4">
                &ldquo;Participar en TransformArte me permitió expresar mis emociones y apoyar a mi comunidad. El impacto que tiene en los jóvenes es realmente transformador.&rdquo;
              </blockquote>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl mr-4">
                  LG
                </div>
                <div>
                  <p className="font-semibold">Luis García</p>
                  <p className="text-sm text-gray-600">Rotary Club Monterrey</p>
                </div>
              </div>
              <blockquote className="text-lg italic mb-4">
                &ldquo;Ver a los jóvenes involucrarse me recordó el verdadero impacto del servicio rotario. TransformArte crea puentes entre el arte y la salud mental de manera innovadora.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{t.callToAction.title}</h2>
          <p className="text-xl mb-10 text-blue-100">{t.callToAction.description}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href={`/${locale}/donar`} className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-md text-lg font-semibold transition-colors shadow-lg inline-block">
              {t.callToAction.buttonArtist}
            </Link>
            <Link href={`/${locale}/comunidad`} className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-md text-lg font-semibold transition-colors shadow-lg inline-block">
              {t.callToAction.buttonVolunteer}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 