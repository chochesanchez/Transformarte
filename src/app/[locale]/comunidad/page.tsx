import React from 'react';
import Link from 'next/link';

// Static content for the page
const content = {
  en: {
    title: "Join the TransformArte Community",
    description: "Share your experiences, connect with other artists and rotarians, and receive updates on events and auctions.",
    register: {
      title: "Register",
      description: "Create an account to access more content and connect with the community.",
      button: "Register"
    },
    login: {
      title: "Login",
      description: "Already have an account? Log in to participate in the forum and stay up to date.",
      button: "Log In"
    },
    forum: {
      title: "TransformArte Forum",
      description: "Share your experiences, ask the community, and follow current discussions.",
      coming_soon: "The forum will be available soon. Stay tuned!"
    },
    whatsapp: {
      title: "WhatsApp Group",
      description: "Want to chat in real time? Join our WhatsApp group for TransformArte members.",
      button: "Join Group"
    }
  },
  es: {
    title: "Únete a la Comunidad TransformArte",
    description: "Comparte tus experiencias, conecta con otros artistas y rotarios, y recibe novedades sobre eventos y subastas.",
    register: {
      title: "Registrarse",
      description: "Crea una cuenta para acceder a más contenido y conectar con la comunidad.",
      button: "Registrarse"
    },
    login: {
      title: "Iniciar Sesión",
      description: "¿Ya tienes una cuenta? Accede para participar en el foro y estar al día.",
      button: "Iniciar Sesión"
    },
    forum: {
      title: "Foro TransformArte",
      description: "Comparte tus experiencias, pregunta a la comunidad y sigue los debates actuales.",
      coming_soon: "El foro estará disponible pronto. ¡Mantente al tanto!"
    },
    whatsapp: {
      title: "Grupo WhatsApp",
      description: "¿Quieres conversar en tiempo real? Únete a nuestro grupo de WhatsApp para miembros TransformArte.",
      button: "Unirme al Grupo"
    }
  }
};

export default async function CommunityPage({
  params,
}: {
  params: { locale: string }
}) {
  // Await params properly
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const t = content[locale === 'en' ? 'en' : 'es'];

  return (
    <div className="container mx-auto">
      <section className="pt-12 pb-12 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
        <p className="mb-6 text-gray-700">{t.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">{t.register.title}</h2>
            <p className="text-gray-600 mb-4">{t.register.description}</p>
            <Link href="#" className="bg-primary text-white px-6 py-2 rounded-full font-semibold inline-block">
              {t.register.button}
            </Link>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">{t.login.title}</h2>
            <p className="text-gray-600 mb-4">{t.login.description}</p>
            <Link href="#" className="bg-primary text-white px-6 py-2 rounded-full font-semibold inline-block">
              {t.login.button}
            </Link>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.forum.title}</h2>
          <p className="text-gray-600 mb-4">{t.forum.description}</p>
          <div className="border rounded bg-white p-4 mb-4">
            <p className="text-gray-400 italic">{t.forum.coming_soon}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">{t.whatsapp.title}</h2>
          <p className="text-gray-600 mb-4">{t.whatsapp.description}</p>
          <Link href="#" className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold inline-block">
            {t.whatsapp.button}
          </Link>
        </div>
      </section>
    </div>
  );
} 