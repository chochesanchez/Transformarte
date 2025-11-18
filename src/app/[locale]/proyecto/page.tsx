import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EventCalendar from '@/components/EventCalendar';

// Static content for the page
const content = {
  en: {
    title: "Our Project",
    subtitle: "Art and mental health awareness in a transformative initiative",
    description: "TransformArte is a comprehensive program that combines art and mental health education to create a positive impact on the lives of young people aged 15-19.",
    visionTitle: "Our Vision",
    visionText: "We envision a society where art serves as a powerful tool for mental health awareness, prevention, and healing. Through creative expression, we aim to break stigmas and open dialogue about mental health issues affecting young people.",
    missionTitle: "Our Mission",
    missionText: "To promote mental health awareness among young people through art, creating platforms for creative expression, education, and community engagement across seven cities in Mexico.",
    populationTitle: "Target Population",
    population: [
      "Rotarians District 4130 and their families",
      "Youth 15-19 years old and their families",
      "Mental health professionals",
      "Community professionals",
      "Sponsor companies"
    ],
    servicesTitle: "Mental Health Service Offerings",
    services: [
      "Online mental health check-up.",
      "Monthly webinars on mental health topics.",
      "TransformArte Workshop (CPCCM)",
      "Psychological first aid workshop.",
      "Certification in psychological first aid.",
      "Psychological helpline.",
      "Mentorship program (45 Rotarians).",
      "Burnout workshop (Companies).",
      "NOM-035 for companies."
    ],
    objectivesTitle: "Objectives",
    objectives: [
      "Create spaces for artistic expression that foster mental health awareness",
      "Educate young people about mental health through art and interactive workshops",
      "Build a community of artists, mental health professionals, and young people",
      "Raise funds to support mental health initiatives through art exhibitions and auctions",
      "Reduce stigma around mental health discussions in local communities"
    ],
    approachTitle: "Our Approach",
    approachText: "TransformArte operates through a series of coordinated activities in seven cities, including art workshops, educational talks, exhibitions, and community events.",
    ctaTitle: "Join Our Initiative",
    ctaText: "Whether you're an artist, mental health professional, or simply interested in supporting our cause, there are many ways to get involved.",
    ctaButton: "How to Participate",
    eventsTitle: "Events Calendar",
    approachSteps: {
      workshop: {
        title: "Workshops",
        description: "Art therapy and creative expression sessions for young people"
      },
      education: {
        title: "Education",
        description: "Talks and seminars on mental health awareness and prevention"
      },
      exhibition: {
        title: "Exhibition",
        description: "Public showcases of artwork created during the program"
      }
    }
  },
  es: {
    title: "Nuestro Proyecto",
    subtitle: "Arte y concienciación sobre salud mental en una iniciativa transformadora",
    description: "TransformArte es un programa integral que combina el arte y la educación en salud mental para crear un impacto positivo en la vida de jóvenes de 15 a 19 años.",
    visionTitle: "Nuestra Visión",
    visionText: "Visualizamos una sociedad donde el arte sirva como una poderosa herramienta para la concienciación, prevención y sanación de la salud mental. A través de la expresión creativa, buscamos romper estigmas y abrir el diálogo sobre problemas de salud mental que afectan a los jóvenes.",
    missionTitle: "Nuestra Misión",
    missionText: "Promover la concienciación sobre la salud mental entre los jóvenes a través del arte, creando plataformas para la expresión creativa, la educación y la participación comunitaria en siete ciudades de México.",
    populationTitle: "Población Meta",
    population: [
      "Rotarios distrito 4130 y sus familias",
      "Jóvenes 15-19 años y sus familias",
      "Profesionales de la salud mental",
      "Profesionales de la comunidad",
      "Empresas patrocinadoras"
    ],
    servicesTitle: "Oferta de Servicios a Favor de la Salud Mental",
    services: [
      "Check up de salud mental en línea.",
      "Webinars mensuales sobre temas de salud mental.",
      "Taller TransformArte (CPCCM)",
      "Taller de primeros auxilios psicológicos.",
      "Certificación en primeros auxilios psicológicos.",
      "Línea de atención psicológica.",
      "Programa de mentores (45 rotarios).",
      "Taller Burnout (Empresas).",
      "NOM-035 para las empresas."
    ],
    objectivesTitle: "Objetivos",
    objectives: [
      "Crear espacios de expresión artística que fomenten la conciencia sobre la salud mental",
      "Educar a los jóvenes sobre salud mental a través del arte y talleres interactivos",
      "Construir una comunidad de artistas, profesionales de la salud mental y jóvenes",
      "Recaudar fondos para apoyar iniciativas de salud mental a través de exposiciones y subastas de arte",
      "Reducir el estigma en torno a las discusiones sobre salud mental en las comunidades locales"
    ],
    approachTitle: "Nuestro Enfoque",
    approachText: "TransformArte opera a través de una serie de actividades coordinadas en siete ciudades, incluyendo talleres de arte, charlas educativas, exposiciones y eventos comunitarios.",
    ctaTitle: "Únete a Nuestra Iniciativa",
    ctaText: "Ya seas artista, profesional de la salud mental o simplemente estés interesado en apoyar nuestra causa, hay muchas formas de participar.",
    ctaButton: "Cómo Participar",
    eventsTitle: "Calendario de Eventos",
    approachSteps: {
      workshop: {
        title: "Talleres",
        description: "Sesiones de arteterapia y expresión creativa para jóvenes"
      },
      education: {
        title: "Educación",
        description: "Charlas y seminarios sobre concientización y prevención de la salud mental"
      },
      exhibition: {
        title: "Exposición",
        description: "Exhibiciones públicas de obras creadas durante el programa"
      }
    }
  }
};

export default async function ProjectPage({
  params,
}: {
  params: { locale: string }
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const t = content[locale === 'en' ? 'en' : 'es'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
        <h2 className="text-2xl text-secondary mb-6">{t.subtitle}</h2>
        <p className="text-lg text-gray-700 mb-12">{t.description}</p>
        
        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-primary mb-4">{t.missionTitle}</h3>
            <p className="text-gray-700">{t.missionText}</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-primary mb-4">{t.visionTitle}</h3>
            <p className="text-gray-700">{t.visionText}</p>
          </div>
        </div>

        {/* Partners Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-primary mb-6">{locale==='en' ? 'Partners & Allies' : 'Aliados & Patrocinadores'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">{locale==='en' ? 'Centro de Psicología Conductual' : 'Centro de Psicología Conductual'}</h4>
              <p className="text-gray-700 text-sm">{locale==='en' ? 'Clinical and educational support through workshops, webinars and early prevention programs.' : 'Apoyo clínico y educativo mediante talleres, webinars y programas de prevención temprana.'}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Rotary</h4>
              <p className="text-gray-700 text-sm">{locale==='en' ? 'District 4130 leadership, logistics and community network across seven cities.' : 'Liderazgo del Distrito 4130, logística y red comunitaria en siete ciudades.'}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">CONALEP</h4>
              <p className="text-gray-700 text-sm">{locale==='en' ? 'Institutional collaboration for youth outreach and training activities.' : 'Colaboración institucional para alcance juvenil y actividades formativas.'}</p>
            </div>
          </div>
        </section>
        
        {/* Objectives Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-primary mb-6">{t.objectivesTitle}</h3>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            {t.objectives.map((objective, index) => (
              <li key={index} className="text-lg">{objective}</li>
            ))}
          </ul>
        </div>
        
        {/* Target Population Section */}
        <div className="mb-16 mt-12">
          <h3 className="text-2xl font-semibold text-primary mb-6">{t.populationTitle}</h3>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            {t.population.map((item, index) => (
              <li key={index} className="text-lg">{item}</li>
            ))}
          </ol>
        </div>

        {/* Services Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-primary mb-6">{t.servicesTitle}</h3>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            {t.services.map((service, index) => (
              <li key={index} className="text-lg">{service}</li>
            ))}
          </ul>
        </div>
        
        {/* Approach Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-primary mb-4">{t.approachTitle}</h3>
          <p className="text-lg text-gray-700 mb-8">{t.approachText}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="mb-4 text-blue-500 text-3xl font-bold">1</div>
              <h4 className="text-xl font-semibold mb-2">{t.approachSteps.workshop.title}</h4>
              <p className="text-gray-700">{t.approachSteps.workshop.description}</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="mb-4 text-blue-500 text-3xl font-bold">2</div>
              <h4 className="text-xl font-semibold mb-2">{t.approachSteps.education.title}</h4>
              <p className="text-gray-700">{t.approachSteps.education.description}</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="mb-4 text-blue-500 text-3xl font-bold">3</div>
              <h4 className="text-xl font-semibold mb-2">{t.approachSteps.exhibition.title}</h4>
              <p className="text-gray-700">{t.approachSteps.exhibition.description}</p>
            </div>
          </div>
        </div>

        {/* Events Calendar Section */}
        <div id="eventos" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t.eventsTitle}</h2>
          <EventCalendar locale={locale} />
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary text-white p-10 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">{t.ctaTitle}</h3>
          <p className="text-lg mb-6">{t.ctaText}</p>
          <Link 
            href={`/${locale}/comunidad`}
            className="inline-block bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold transition-colors shadow-lg"
          >
            {t.ctaButton}
          </Link>
        </div>
      </div>
    </div>
  );
} 