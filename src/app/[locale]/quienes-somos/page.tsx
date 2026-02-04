import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const content = {
  en: {
    title: "Club Rotario Monterrey Metropolitano",
    subtitle: "Committed to service and art as a tool for change",
    teamTitle: "Project Team",
    teamDescription: "The Rotary International District 4130 team is composed of dedicated leaders who support our clubs and members. With vast experience and passion for service, they coordinate initiatives to ensure a positive impact in communities. Together, they foster fellowship, innovation, and commitment to Rotary values, strengthening our network and expanding our reach to address social, economic, and environmental challenges.",
    rotaryMotto: "Service Above Self",
    mainDescription: "Together we build a world where people unite and take action to create lasting change in ourselves, our communities, and the world.",
    memberContribution: "Each member brings unique experiences, skills, and knowledge that enrich our problem-solving capabilities.",
    diversityStatement: "The diverse perspectives and varied interests of our members allow us to address challenges in innovative and effective ways.",
    togetherStatement: "When we combine our resources, talents, and passion, we can do much more than we could do alone. By joining with other Rotary partners and community members, we amplify our impact.",
    values: [
      { icon: "🤝", title: "Fellowship", text: "Building lasting friendships through service" },
      { icon: "🌍", title: "Service", text: "Putting service above self in all we do" },
      { icon: "💡", title: "Leadership", text: "Developing leaders who create change" },
      { icon: "🎯", title: "Integrity", text: "Maintaining highest ethical standards" }
    ]
  },
  es: {
    title: "Club Rotario Monterrey Metropolitano",
    subtitle: "Comprometidos con el servicio y el arte como herramienta de cambio",
    teamTitle: "Equipo del Proyecto",
    teamDescription: "El equipo del Distrito 4130 de Rotary International está compuesto por líderes dedicados que apoyan a nuestros clubes y miembros. Con vasta experiencia y pasión por el servicio, coordinan iniciativas para asegurar un impacto positivo en las comunidades. Juntos, fomentan el compañerismo, la innovación y el compromiso con los valores de Rotary, fortaleciendo nuestra red y ampliando nuestro alcance para enfrentar desafíos sociales, económicos y ambientales.",
    rotaryMotto: "Dar de Sí Antes de Pensar en Sí",
    mainDescription: "Juntos construimos un mundo donde las personas se unen y toman acción para generar un cambio perdurable en nosotros mismos, en nuestras comunidades y en el mundo entero.",
    memberContribution: "Cada socio aporta experiencias, habilidades y conocimientos únicos que enriquecen nuestra capacidad para resolver problemas.",
    diversityStatement: "Las diversas perspectivas y variados intereses de nuestros miembros nos permiten abordar los desafíos de maneras innovadoras y efectivas.",
    togetherStatement: "Cuando combinamos nuestros recursos, talentos y pasión, podemos hacer mucho más de lo que podríamos hacer solos. Al unirnos a otros socios de Rotary y miembros de la comunidad amplificamos nuestro impacto.",
    values: [
      { icon: "🤝", title: "Compañerismo", text: "Construyendo amistades duraderas a través del servicio" },
      { icon: "🌍", title: "Servicio", text: "Poniendo el servicio por encima de uno mismo" },
      { icon: "💡", title: "Liderazgo", text: "Desarrollando líderes que crean cambio" },
      { icon: "🎯", title: "Integridad", text: "Manteniendo los más altos estándares éticos" }
    ]
  }
};

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const t = content[locale === 'en' ? 'en' : 'es'];

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center text-white min-h-[50vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-500 to-yellow-400 z-0" />
        <div className="absolute inset-0 bg-black/30 z-1" />
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <div className="mb-8 flex justify-center" style={{ height: 180 }}>
            <img src="/Rotary Logo.png" alt="Rotary International" style={{ width: 'auto', height: '100%' }} className="drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">{t.title}</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Motto */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">⚙️</div>
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">{t.rotaryMotto}</h2>
          <p className="text-xl text-white/90 leading-relaxed">{t.mainDescription}</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">{locale === 'en' ? 'Our Core Values' : 'Nuestros Valores'}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {t.values.map((value, index) => (
              <div key={index} className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl text-center hover:shadow-xl transition-all hover:scale-105">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{value.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-4">{t.teamTitle}</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">{locale === 'en' ? 'Meet the dedicated leaders driving our mission forward' : 'Conoce a los líderes dedicados que impulsan nuestra misión'}</p>
          <div className="flex justify-center mb-16">
            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md text-center">
              <div className="relative w-40 h-40 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-yellow-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-1 bg-white rounded-full"></div>
                <div className="absolute inset-2 rounded-full overflow-hidden">
                  <img src="/david-eaton.png" alt="David W. Eaton" className="h-full w-full object-cover" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">David W. Eaton</h3>
              <p className="text-blue-600 font-semibold mb-1">{locale === 'en' ? 'Governor Nominee 2026 - 2027' : 'Gobernador Nominado 2026 - 2027'}</p>
              <p className="text-gray-600">{locale === 'en' ? 'International Service Committee' : 'Comité de Servicio Internacional'}</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center">{t.teamDescription}</p>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-10 rounded-3xl text-white">
            <div className="text-4xl mb-6">🤝</div>
            <h3 className="text-2xl font-bold mb-4">{locale === 'en' ? 'Together We Achieve More' : 'Juntos Logramos Más'}</h3>
            <p className="text-white/90 leading-relaxed">{t.togetherStatement}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-10 rounded-3xl text-white">
            <div className="text-4xl mb-6">🌟</div>
            <h3 className="text-2xl font-bold mb-4">{locale === 'en' ? 'Diverse Perspectives' : 'Perspectivas Diversas'}</h3>
            <p className="text-white/90 leading-relaxed">{t.diversityStatement}</p>
          </div>
        </div>
        <div className="mt-8 bg-gradient-to-r from-gray-100 to-blue-100 p-8 rounded-3xl text-center max-w-6xl mx-auto">
          <div className="text-3xl mb-4">💪</div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">{t.memberContribution}</p>
        </div>
      </section>

      {/* CPCCM Team */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-4">{locale === 'en' ? 'Clinical Partner Team' : 'Equipo Aliado Clínico'}</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{locale === 'en' ? 'Centro de Psicología Cognitivo Conductual de Monterrey (CPCCM) - Certified professionals implementing our mental health programs' : 'Centro de Psicología Cognitivo Conductual de Monterrey (CPCCM) - Profesionales certificados que implementan nuestros programas de salud mental'}</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="group bg-white p-10 rounded-3xl text-center shadow-xl hover:shadow-2xl transition-all">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-6xl text-white">👨‍⚕️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">MPC. Gerardo Valdivia Graniel</h3>
              <p className="text-blue-600 font-semibold mb-3">{locale === 'en' ? 'Founding Director of CPCCM' : 'Director-Fundador del CPCCM'}</p>
              <div className="inline-block bg-blue-100 px-4 py-2 rounded-full"><span className="text-blue-800 text-sm font-medium">🎓 Beck Institute Certified</span></div>
            </div>
            <div className="group bg-white p-10 rounded-3xl text-center shadow-xl hover:shadow-2xl transition-all">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-6xl text-white">👩‍⚕️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">MPC. Minerva Cázares Escalera</h3>
              <p className="text-purple-600 font-semibold mb-3">{locale === 'en' ? 'Founding Director of CPCCM' : 'Directora-Fundadora del CPCCM'}</p>
              <div className="inline-block bg-purple-100 px-4 py-2 rounded-full"><span className="text-purple-800 text-sm font-medium">🎓 Beck Institute Certified</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{locale === 'en' ? 'Join Our Mission' : 'Únete a Nuestra Misión'}</h2>
          <p className="text-xl text-white/90 mb-10">{locale === 'en' ? 'Be part of something bigger. Together we can transform lives through art and mental health awareness.' : 'Sé parte de algo más grande. Juntos podemos transformar vidas a través del arte y la conciencia sobre salud mental.'}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={`/${locale}/comunidad`} className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-10 py-4 rounded-full text-lg font-bold transition-colors shadow-xl">{locale === 'en' ? 'Join Community' : 'Únete a la Comunidad'}</Link>
            <Link href={`/${locale}/contacto`} className="inline-block bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-4 rounded-full text-lg font-semibold transition-colors">{locale === 'en' ? 'Contact Us' : 'Contáctanos'}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
