import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

// Static content for the page
const content = {
  en: {
    title: "Become a Sponsor",
    subtitle: "Join our transformative mission and make your brand part of TransformArte",
    heroDescription: "Your sponsorship helps us bring mental health awareness and art programs to youth across 8 cities in Mexico. Together, we're creating lasting change.",
    
    giraTitle: "The TransformArte Tour",
    giraDescription: "Join us in this transformative mission and make your brand part of our TransformArte Tour. With an exhibition of 60 masterpieces forming an innovative journey combining art and psychology called the TransformArte Labyrinth.",
    giraCities: "The tour will visit 8 key cities in District 4130: Monterrey, Nuevo Laredo, Reynosa, Matamoros, Ciudad Victoria, Tampico, and San Luis Potosí. Your brand will have prominent visibility and will be associated with a project that promotes mental health.",
    giraDates: "July 16, 2026 - April 25, 2027",
    
    diamondTitle: "Diamond Sponsor",
    diamondSubtitle: "Premium Partnership Package",
    diamondBenefits: [
      "Prominent brand presence at events, press, website, and materials",
      "Participation in the Emotions Labyrinth Tour",
      "Psychological First Aid Workshop for employees",
      "Free online psychological screening for 30 employees",
      "Webinars for 30 employees",
      "Complete impact report",
      "Tax-deductible donation",
      "Your logo on the MOMA Armonía plaque",
      "Your logo on the TransformArte Tour truck (Jul 16, 2026 - Apr 25, 2027)",
      "Your logo in the TransformArte labyrinth",
      "Your logo in the TransformArte catalog"
    ],
    
    impactTitle: "Your Impact",
    impactStats: [
      { number: "500+", label: "Youth Benefited" },
      { number: "8", label: "Cities Reached" },
      { number: "60", label: "Artworks Exhibited" },
      { number: "25", label: "Workshops Delivered" }
    ],
    
    whyTitle: "Why Sponsor TransformArte?",
    whyReasons: [
      {
        title: "Mental Health Crisis",
        description: "504 thousand children and adolescents suffer from a mental health condition in Mexico. 22.6% don't have access to mental health services."
      },
      {
        title: "Community Impact",
        description: "Your support directly funds workshops, psychological helplines, and art therapy programs for vulnerable youth."
      },
      {
        title: "Brand Visibility",
        description: "Associate your brand with a meaningful cause across 8 cities, multiple events, and extensive media coverage."
      },
      {
        title: "Employee Wellness",
        description: "Receive exclusive mental health workshops and screenings for your team as part of your sponsorship."
      }
    ],
    
    ctaTitle: "Ready to Make a Difference?",
    ctaDescription: "Contact us to learn more about sponsorship opportunities and how your organization can be part of TransformArte.",
    ctaButton: "Contact Us",
    
    contactTitle: "Sponsorship Contact",
    contactName: "Juan Antonio Enciso",
    contactEmail: "juan.antonio.enciso@tec.mx",
    contactPhone: "81 8309 1703"
  },
  es: {
    title: "Conviértete en Patrocinador",
    subtitle: "Únete a nuestra misión transformadora y haz que tu marca sea parte de TransformArte",
    heroDescription: "Tu patrocinio nos ayuda a llevar conciencia sobre salud mental y programas de arte a jóvenes en 8 ciudades de México. Juntos, estamos creando un cambio duradero.",
    
    giraTitle: "La Gira TransformArte",
    giraDescription: "Únete a nosotros en esta misión transformadora y haz que tu marca sea parte de nuestra Gira TransformArte. Con una exhibición de 60 obras maestras que conforman un innovador recorrido combinando arte y psicología llamado Laberinto TransformArte.",
    giraCities: "La gira recorrerá 8 ciudades clave del Distrito 4130: Monterrey, Nuevo Laredo, Reynosa, Matamoros, Ciudad Victoria, Tampico y San Luis Potosí. Tu marca tendrá una visibilidad destacada y será asociada con un proyecto que promueve la salud mental.",
    giraDates: "16 de julio, 2026 - 25 de abril, 2027",
    
    diamondTitle: "Patrocinador Diamante",
    diamondSubtitle: "Paquete de Alianza Premium",
    diamondBenefits: [
      "Presencia destacada de marca en eventos, prensa, sitio web y materiales",
      "Participación en el Tour Laberinto de las Emociones",
      "Taller de Primeros Auxilios Psicológicos para empleados",
      "Screening psicológico gratuito en línea para 30 empleados",
      "Webinars para 30 empleados",
      "Reporte de impacto completo",
      "Donativo deducible de impuestos",
      "Tu logo en la placa de MOMA Armonía",
      "Tu logo en el camión de la Gira TransformArte (16 jul 26 a 25 abril 27)",
      "Tu logo en el laberinto TransformArte",
      "Tu logo en el catálogo TransformArte"
    ],
    
    impactTitle: "Tu Impacto",
    impactStats: [
      { number: "500+", label: "Jóvenes Beneficiados" },
      { number: "8", label: "Ciudades Alcanzadas" },
      { number: "60", label: "Obras Exhibidas" },
      { number: "25", label: "Talleres Impartidos" }
    ],
    
    whyTitle: "¿Por qué Patrocinar TransformArte?",
    whyReasons: [
      {
        title: "Crisis de Salud Mental",
        description: "504 mil niñas, niños y adolescentes padecen de una condición mental en México. 22.6% no tienen acceso a servicios de salud mental."
      },
      {
        title: "Impacto Comunitario",
        description: "Tu apoyo financia directamente talleres, líneas de atención psicológica y programas de arteterapia para jóvenes vulnerables."
      },
      {
        title: "Visibilidad de Marca",
        description: "Asocia tu marca con una causa significativa en 8 ciudades, múltiples eventos y amplia cobertura mediática."
      },
      {
        title: "Bienestar de Empleados",
        description: "Recibe talleres exclusivos de salud mental y screenings para tu equipo como parte de tu patrocinio."
      }
    ],
    
    ctaTitle: "¿Listo para Hacer la Diferencia?",
    ctaDescription: "Contáctanos para conocer más sobre las oportunidades de patrocinio y cómo tu organización puede ser parte de TransformArte.",
    ctaButton: "Contáctanos",
    
    contactTitle: "Contacto de Patrocinios",
    contactName: "Juan Antonio Enciso",
    contactEmail: "juan.antonio.enciso@tec.mx",
    contactPhone: "81 8309 1703"
  }
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const t = content[locale === 'en' ? 'en' : 'es'];
  
  return {
    title: t.title,
    description: t.heroDescription,
  };
}

export default async function PatrocinadoresPage({
  params,
}: {
  params: { locale: string }
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const t = content[locale === 'en' ? 'en' : 'es'];

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-white min-h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-yellow-500 to-blue-600 z-0" />
        <div className="absolute inset-0 bg-black/30 z-1" />
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-white font-semibold">💎 {locale === 'en' ? 'Partnership Opportunities' : 'Oportunidades de Alianza'}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-md">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-white/90 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {t.heroDescription}
          </p>
        </div>
      </section>

      {/* Gira TransformArte Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">{t.giraTitle}</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t.giraDescription}
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t.giraCities}
              </p>
              <div className="bg-blue-50 p-4 rounded-lg inline-block">
                <span className="text-blue-800 font-semibold">📅 {t.giraDates}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-yellow-100 p-8 rounded-2xl">
              <div className="text-center">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  {locale === 'en' ? 'TransformArte Labyrinth' : 'Laberinto TransformArte'}
                </h3>
                <p className="text-gray-700">
                  {locale === 'en' 
                    ? 'An innovative journey combining art and psychology'
                    : 'Un innovador recorrido combinando arte y psicología'}
                </p>
                <div className="mt-6 flex justify-center gap-4 flex-wrap">
                  <div className="bg-white px-4 py-2 rounded-full shadow">
                    <span className="font-bold text-blue-600">60</span>
                    <span className="text-gray-600 ml-1">{locale === 'en' ? 'artworks' : 'obras'}</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-full shadow">
                    <span className="font-bold text-yellow-600">8</span>
                    <span className="text-gray-600 ml-1">{locale === 'en' ? 'cities' : 'ciudades'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">{t.impactTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sponsor Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">{t.whyTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {t.whyReasons.map((reason, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <span className="text-2xl">
                      {index === 0 ? '🧠' : index === 1 ? '🤝' : index === 2 ? '📢' : '💼'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{reason.title}</h3>
                    <p className="text-gray-700">{reason.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diamond Sponsor Package */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 p-10 rounded-3xl shadow-xl border-2 border-yellow-300">
            <div className="text-center mb-8">
              <span className="text-6xl">💎</span>
              <h2 className="text-4xl font-bold text-amber-800 mt-4">{t.diamondTitle}</h2>
              <p className="text-xl text-amber-700 mt-2">{t.diamondSubtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {t.diamondBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/70 p-4 rounded-lg">
                  <span className="text-yellow-600 text-xl">✓</span>
                  <span className="text-gray-800">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{t.ctaTitle}</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            {t.ctaDescription}
          </p>
          
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl inline-block">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">{t.contactTitle}</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👤</span>
                <span className="text-gray-800 font-medium">{t.contactName}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <a href={`mailto:${t.contactEmail}`} className="text-blue-600 hover:underline font-medium">
                  {t.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <a href={`tel:${t.contactPhone.replace(/\s/g, '')}`} className="text-blue-600 hover:underline font-medium">
                  {t.contactPhone}
                </a>
              </div>
            </div>
            <Link 
              href={`/${locale}/contacto`}
              className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-colors"
            >
              {t.ctaButton}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
