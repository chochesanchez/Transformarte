import React from 'react';

// Static content for the page
const content = {
  en: {
    title: "About Us",
    subtitle: "Meet the team behind TransformArte",
    description: "TransformArte is an initiative of Rotary District 4130 that combines the power of art with mental health prevention for young people aged 15 to 19. Our team consists of dedicated Rotarians and artists who believe in the transformative power of art."
  },
  es: {
    title: "Quiénes Somos",
    subtitle: "Conoce al equipo detrás de TransformArte",
    description: "TransformArte es una iniciativa del Rotary Distrito 4130 que fusiona el poder del arte con la prevención de la salud mental en jóvenes de 15 a 19 años. Nuestro equipo consiste en rotarios y artistas dedicados que creen en el poder transformador del arte."
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
        <h2 className="text-2xl text-secondary mb-6">{t.subtitle}</h2>
        <p className="text-lg text-gray-700 mb-8">{t.description}</p>
        
        {/* Team Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Team Member Card */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-gray-200 h-48 flex items-center justify-center">
              <span className="text-gray-500 text-4xl">👤</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Juan Pérez</h3>
              <p className="text-gray-600 mb-2">Director del Proyecto</p>
              <p className="text-gray-700">Rotary Club Monterrey</p>
            </div>
          </div>
          
          {/* Team Member Card */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-gray-200 h-48 flex items-center justify-center">
              <span className="text-gray-500 text-4xl">👤</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">María González</h3>
              <p className="text-gray-600 mb-2">Coordinadora de Artistas</p>
              <p className="text-gray-700">Rotary Club San Nicolás</p>
            </div>
          </div>
          
          {/* Team Member Card */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-gray-200 h-48 flex items-center justify-center">
              <span className="text-gray-500 text-4xl">👤</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Carlos Rodríguez</h3>
              <p className="text-gray-600 mb-2">Psicólogo</p>
              <p className="text-gray-700">Rotary Club Guadalupe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 