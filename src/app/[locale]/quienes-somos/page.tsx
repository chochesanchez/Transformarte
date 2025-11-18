import React from 'react';
import Image from 'next/image';

// Static content for the page
const content = {
  en: {
    title: "Club Rotario Monterrey Metropolitano",
    subtitle: "Committed to service and art as a tool for change",
    teamTitle: "Project Team",
    teamDescription: "The Rotary International District 4130 team is composed of dedicated leaders who support our clubs and members. With vast experience and passion for service, they coordinate initiatives to ensure a positive impact in communities. Together, they foster fellowship, innovation, and commitment to Rotary values, strengthening our network and expanding our reach to address social, economic, and environmental challenges.",
    rotaryVision: "Rotary Vision Statement",
    rotaryMotto: "Service Above Self",
    mainDescription: "Together we build a world where people unite and take action to create lasting change in ourselves, our communities, and the world.",
    memberContribution: "Each member brings unique experiences, skills, and knowledge that enrich our problem-solving capabilities.",
    diversityStatement: "The diverse perspectives and varied interests of our members allow us to address challenges in innovative and effective ways. Using their knowledge and leadership skills, our partners collaborate with communities to find creative solutions to social, economic, and environmental challenges.",
    togetherStatement: "When we combine our resources, talents, and passion, we can do much more than we could do alone. By joining with other Rotary partners and community members, we amplify our impact."
  },
  es: {
    title: "Club Rotario Monterrey Metropolitano",
    subtitle: "Comprometidos con el servicio y el arte como herramienta de cambio",
    teamTitle: "Equipo del Proyecto",
    teamDescription: "El equipo del Distrito 4130 de Rotary International está compuesto por líderes dedicados que apoyan a nuestros clubes y miembros. Con vasta experiencia y pasión por el servicio, coordinan iniciativas para asegurar un impacto positivo en las comunidades. Juntos, fomentan el compañerismo, la innovación y el compromiso con los valores de Rotary, fortaleciendo nuestra red y ampliando nuestro alcance para enfrentar desafíos sociales, económicos y ambientales.",
    rotaryVision: "Declaración de la visión de Rotary",
    rotaryMotto: "Dar de Sí Antes de Pensar en Sí",
    mainDescription: "Juntos construimos un mundo donde las personas se unen y toman acción para generar un cambio perdurable en nosotros mismos, en nuestras comunidades y en el mundo entero.",
    memberContribution: "Cada socio aporta experiencias, habilidades y conocimientos únicos que enriquecen nuestra capacidad para resolver problemas.",
    diversityStatement: "Las diversas perspectivas y variados intereses de nuestros miembros nos permiten abordar los desafíos de maneras innovadoras y efectivas. Utilizando sus conocimientos y habilidades de liderazgo, nuestros socios colaboran con las comunidades para encontrar soluciones creativas a los desafíos sociales, económicos y ambientales.",
    togetherStatement: "Cuando combinamos nuestros recursos, talentos y pasión, podemos hacer mucho más de lo que podríamos hacer solos. Al unirnos a otros socios de Rotary y miembros de la comunidad amplificamos nuestro impacto."
  }
};

export default async function AboutPage({
  params,
}: {
  params: { locale: string }
}) {
  // Await params properly
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const t = content[locale === 'en' ? 'en' : 'es'];

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center text-white min-h-[50vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-400 to-yellow-200 z-0" />
        <div className="absolute inset-0 bg-black/30 z-1" />
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <div className="mb-6 flex justify-center" style={{ height: 250 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Rotary Logo.png"
              alt="Rotary International"
              style={{ width: 'auto', height: '100%' }}
              className="drop-shadow-lg"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-md">{t.title}</h1>
          <p className="text-xl text-white/90">{t.subtitle}</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
        
        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t.teamTitle}</h2>
          <div className="flex justify-center mb-12">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/david-eaton.png"
                  alt="David W. Eaton"
                  className="h-full w-full object-cover"
                />
            </div>
              <h3 className="text-xl font-semibold mb-2">David W. Eaton</h3>
              <p className="text-gray-600">Gobernador Nominado 2026 - 2027</p>
              <p className="text-gray-600">Comité de Servicio Internacional</p>
            </div>
          </div>
          
          {/* Team Description */}
          <p className="text-lg text-gray-700 mb-12 text-center max-w-4xl mx-auto">
            {t.teamDescription}
          </p>
        </section>

        {/* Vision and Mission Section */}
        <section className="mb-16">
          <div className="bg-gray-50 p-8 rounded-lg shadow mb-12">
            <p className="text-lg text-gray-700 mb-6">{t.togetherStatement}</p>
            <p className="text-sm text-gray-500 italic">{t.rotaryVision}</p>
            </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-8">{t.rotaryMotto}</h2>
            <p className="text-lg text-gray-700 mb-8">{t.mainDescription}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-lg text-gray-700">{t.memberContribution}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-lg text-gray-700">{t.diversityStatement}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
} 