import React from 'react';
import Link from 'next/link';
import CreatePostButton from './CreatePostButton';
import CreatePostForm from './CreatePostForm';

// Static content for the page
const content = {
  en: {
    title: "Community",
    description: "Join our community of artists and supporters of mental health awareness.",
    register: {
      title: "Register for Events",
      description: "Sign up for upcoming TransformArte events in your city. Your participation makes a difference!",
      button: "Register Now"
    },
    createPost: {
      title: "Share Your Experience",
      description: "Share your thoughts, artwork, or event experiences with the TransformArte community.",
      button: "Create Post"
    },
    forum: {
      title: "TransformArte Forum",
      description: "Connect with other participants, share your experiences, and join the conversation.",
      createPost: {
        title: "Create New Post",
        nameLabel: "Your Name",
        titleLabel: "Post Title",
        contentLabel: "Your Message",
        imageLabel: "Add Image (optional)",
        button: "Publish Post"
      },
      recentPosts: "Recent Posts",
      noPosts: "Be the first to share your experience!"
    }
  },
  es: {
    title: "Comunidad",
    description: "Únete a nuestra comunidad de artistas y promotores de la salud mental.",
    register: {
      title: "Registro para Eventos",
      description: "Inscríbete en los próximos eventos de TransformArte en tu ciudad. ¡Tu participación hace la diferencia!",
      button: "Registrarme Ahora"
    },
    createPost: {
      title: "Comparte tu Experiencia",
      description: "Comparte tus pensamientos, obras o experiencias de los eventos con la comunidad TransformArte.",
      button: "Crear Publicación"
    },
    forum: {
      title: "Foro TransformArte",
      description: "Conecta con otros participantes, comparte tus experiencias y únete a la conversación.",
      createPost: {
        title: "Crear Nueva Publicación",
        nameLabel: "Tu Nombre",
        titleLabel: "Título de la Publicación",
        contentLabel: "Tu Mensaje",
        imageLabel: "Agregar Imagen (opcional)",
        button: "Publicar"
      },
      recentPosts: "Publicaciones Recientes",
      noPosts: "¡Sé el primero en compartir tu experiencia!"
    }
  }
};

export default async function CommunityPage({
  params,
}: {
  params: { locale: string }
}) {
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
            <Link 
              href="#" // Will be replaced with Google Forms link
              target="_blank"
              className="bg-primary text-white px-6 py-2 rounded-full font-semibold inline-block hover:bg-primary/90"
            >
              {t.register.button}
            </Link>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">{t.createPost.title}</h2>
            <p className="text-gray-600 mb-4">{t.createPost.description}</p>
            <CreatePostButton buttonText={t.createPost.button} />
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.forum.title}</h2>
          <p className="text-gray-600 mb-8">{t.forum.description}</p>

          <CreatePostForm labels={t.forum.createPost} />

          <div>
            <h3 className="text-xl font-semibold mb-4">{t.forum.recentPosts}</h3>
            <div className="text-center text-gray-500">
              {t.forum.noPosts}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 