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
      { icon: "🎯", text: "Rotarians District 4130 and their families" },
      { icon: "👨‍👩‍👧‍👦", text: "Youth 15-19 years old and their families" },
      { icon: "🧠", text: "Mental health professionals" },
      { icon: "🏢", text: "Community professionals" },
      { icon: "💼", text: "Sponsor companies" }
    ],
    servicesTitle: "Mental Health Service Offerings",
    services: [
      { icon: "💻", text: "Online mental health check-up" },
      { icon: "📺", text: "Monthly webinars on mental health topics" },
      { icon: "🎨", text: "TransformArte Workshop (CPCCM)" },
      { icon: "🩹", text: "Psychological first aid workshop" },
      { icon: "📜", text: "Certification in psychological first aid" },
      { icon: "📞", text: "Psychological helpline" },
      { icon: "🤝", text: "Mentorship program (45 Rotarians)" },
      { icon: "🔥", text: "Burnout workshop (Companies)" },
      { icon: "📋", text: "NOM-035 for companies" }
    ],
    objectivesTitle: "Objectives",
    objectives: [
      { icon: "🎨", title: "Artistic Expression", text: "Create spaces for artistic expression that foster mental health awareness" },
      { icon: "📚", title: "Education", text: "Educate young people about mental health through art and interactive workshops" },
      { icon: "🌐", title: "Community Building", text: "Build a community of artists, mental health professionals, and young people" },
      { icon: "💰", title: "Fundraising", text: "Raise funds to support mental health initiatives through art exhibitions and auctions" },
      { icon: "💬", title: "Reduce Stigma", text: "Reduce stigma around mental health discussions in local communities" }
    ],
    approachTitle: "Our Approach",
    approachText: "TransformArte operates through a series of coordinated activities in seven cities, including art workshops, educational talks, exhibitions, and community events.",
    ctaTitle: "Join Our Initiative",
    ctaText: "Whether you're an artist, mental health professional, or simply interested in supporting our cause, there are many ways to get involved.",
    ctaButton: "How to Participate",
    eventsTitle: "Events Calendar",
    approachSteps: {
      workshop: { title: "Workshops", description: "Art therapy and creative expression sessions for young people" },
      education: { title: "Education", description: "Talks and seminars on mental health awareness and prevention" },
      exhibition: { title: "Exhibition", description: "Public showcases of artwork created during the program" }
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
      { icon: "🎯", text: "Rotarios distrito 4130 y sus familias" },
      { icon: "👨‍👩‍👧‍👦", text: "Jóvenes 15-19 años y sus familias" },
      { icon: "🧠", text: "Profesionales de la salud mental" },
      { icon: "🏢", text: "Profesionales de la comunidad" },
      { icon: "💼", text: "Empresas patrocinadoras" }
    ],
    servicesTitle: "Oferta de Servicios a Favor de la Salud Mental",
    services: [
      { icon: "💻", text: "Check up de salud mental en línea" },
      { icon: "📺", text: "Webinars mensuales sobre temas de salud mental" },
      { icon: "🎨", text: "Taller TransformArte (CPCCM)" },
      { icon: "🩹", text: "Taller de primeros auxilios psicológicos" },
      { icon: "📜", text: "Certificación en primeros auxilios psicológicos" },
      { icon: "📞", text: "Línea de atención psicológica" },
      { icon: "🤝", text: "Programa de mentores (45 rotarios)" },
      { icon: "🔥", text: "Taller Burnout (Empresas)" },
      { icon: "📋", text: "NOM-035 para las empresas" }
    ],
    objectivesTitle: "Objetivos",
    objectives: [
      { icon: "🎨", title: "Expresión Artística", text: "Crear espacios de expresión artística que fomenten la conciencia sobre la salud mental" },
      { icon: "📚", title: "Educación", text: "Educar a los jóvenes sobre salud mental a través del arte y talleres interactivos" },
      { icon: "🌐", title: "Comunidad", text: "Construir una comunidad de artistas, profesionales de la salud mental y jóvenes" },
      { icon: "💰", title: "Recaudación", text: "Recaudar fondos para apoyar iniciativas de salud mental a través de exposiciones y subastas de arte" },
      { icon: "💬", title: "Reducir Estigma", text: "Reducir el estigma en torno a las discusiones sobre salud mental en las comunidades locales" }
    ],
    approachTitle: "Nuestro Enfoque",
    approachText: "TransformArte opera a través de una serie de actividades coordinadas en siete ciudades, incluyendo talleres de arte, charlas educativas, exposiciones y eventos comunitarios.",
    ctaTitle: "Únete a Nuestra Iniciativa",
    ctaText: "Ya seas artista, profesional de la salud mental o simplemente estés interesado en apoyar nuestra causa, hay muchas formas de participar.",
    ctaButton: "Cómo Participar",
    eventsTitle: "Calendario de Eventos",
    approachSteps: {
      workshop: { title: "Talleres", description: "Sesiones de arteterapia y expresión creativa para jóvenes" },
      education: { title: "Educación", description: "Charlas y seminarios sobre concientización y prevención de la salud mental" },
      exhibition: { title: "Exposición", description: "Exhibiciones públicas de obras creadas durante el programa" }
    }
  }
};

export default async function ProjectPage({ params }: { params: { locale: string } }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const t = content[locale === 'en' ? 'en' : 'es'];

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center text-white min-h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-500 to-teal-400 z-0" />
        <div className="absolute inset-0 bg-black/20 z-1" />
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-white font-semibold">🎨 {locale === 'en' ? 'Art + Mental Health' : 'Arte + Salud Mental'}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-md">{t.title}</h1>
          <p className="text-xl md:text-2xl mb-4 text-white/90 max-w-3xl mx-auto">{t.subtitle}</p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">{t.description}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 p-10 rounded-3xl shadow-xl text-white transform transition-all hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-6">🎯</div>
              <h3 className="text-3xl font-bold mb-4">{t.missionTitle}</h3>
              <p className="text-white/90 text-lg leading-relaxed">{t.missionText}</p>
            </div>
          </div>
          <div className="group relative overflow-hidden bg-gradient-to-br from-amber-400 to-orange-500 p-10 rounded-3xl shadow-xl text-white transform transition-all hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-6">👁️</div>
              <h3 className="text-3xl font-bold mb-4">{t.visionTitle}</h3>
              <p className="text-white/90 text-lg leading-relaxed">{t.visionText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-4">{t.objectivesTitle}</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{locale === 'en' ? 'Our strategic goals to create lasting impact' : 'Nuestros objetivos estratégicos para crear un impacto duradero'}</p>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {t.objectives.map((obj, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{obj.icon}</div>
                <h4 className="font-bold text-lg text-blue-900 mb-2">{obj.title}</h4>
                <p className="text-gray-600 text-sm">{obj.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-4">{t.approachTitle}</h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">{t.approachText}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {(['workshop', 'education', 'exhibition'] as const).map((key, index) => (
              <div key={key} className="relative group">
                <div className={`absolute inset-0 ${index === 0 ? 'bg-gradient-to-br from-pink-500 to-rose-500' : index === 1 ? 'bg-gradient-to-br from-blue-500 to-indigo-500' : 'bg-gradient-to-br from-emerald-500 to-teal-500'} rounded-3xl transform ${index === 1 ? '-rotate-3 group-hover:-rotate-6' : 'rotate-3 group-hover:rotate-6'} transition-transform`}></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                  <div className={`w-16 h-16 ${index === 0 ? 'bg-pink-100' : index === 1 ? 'bg-blue-100' : 'bg-emerald-100'} rounded-2xl flex items-center justify-center mb-6`}>
                    <span className="text-3xl">{index === 0 ? '🎨' : index === 1 ? '📚' : '🖼️'}</span>
                  </div>
                  <div className={`${index === 0 ? 'text-pink-500' : index === 1 ? 'text-blue-500' : 'text-emerald-500'} font-bold mb-2`}>{locale === 'en' ? `STEP ${index + 1}` : `PASO ${index + 1}`}</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">{t.approachSteps[key].title}</h4>
                  <p className="text-gray-600">{t.approachSteps[key].description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Population & Services */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3"><span className="bg-blue-100 p-3 rounded-xl">👥</span>{t.populationTitle}</h3>
            <div className="space-y-4">
              {t.population.map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-xl hover:from-blue-100 transition-colors">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3"><span className="bg-green-100 p-3 rounded-xl">💚</span>{t.servicesTitle}</h3>
            <div className="grid grid-cols-1 gap-3">
              {t.services.map((service, index) => (
                <div key={index} className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-transparent p-4 rounded-xl hover:from-green-100 transition-colors">
                  <span className="text-2xl">{service.icon}</span>
                  <span className="text-gray-700">{service.text}</span>
                </div>
              ))}
            </div>
            <Link href={`/${locale}/servicios`} className="inline-flex items-center gap-2 mt-6 text-blue-600 hover:text-blue-800 font-semibold">{locale === 'en' ? 'View all programs' : 'Ver todos los programas'} →</Link>
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="eventos" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-4">{t.eventsTitle}</h2>
          <p className="text-center text-gray-600 mb-12">{locale === 'en' ? 'Join us at one of our events across Mexico' : 'Únete a nosotros en uno de nuestros eventos en México'}</p>
          <EventCalendar locale={locale} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{t.ctaTitle}</h2>
          <p className="text-xl text-white/90 mb-10">{t.ctaText}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={`/${locale}/comunidad`} className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-full text-lg font-bold transition-colors shadow-xl">{t.ctaButton}</Link>
            <Link href={`/${locale}/patrocinadores`} className="inline-block bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-4 rounded-full text-lg font-semibold transition-colors">{locale === 'en' ? 'Become a Sponsor' : 'Ser Patrocinador'}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
