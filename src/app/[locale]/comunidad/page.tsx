import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CreatePostButton from './CreatePostButton';
import CreatePostForm from './CreatePostForm';

interface User {
  id: number;
  email: string;
  passwordHash: string;
  fullName: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  lastLogin: Date | null;
}

interface ForumPost {
  id: number;
  userId: number;
  title: string;
  content: string;
  imageUrl: string | null;
  isHidden: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  user: User;
}

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
      noPosts: "Be the first to share your experience!",
      postedBy: "Posted by",
      readMore: "Read More"
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
      noPosts: "¡Sé el primero en compartir tu experiencia!",
      postedBy: "Publicado por",
      readMore: "Leer Más"
    }
  }
};

async function getForumPosts(): Promise<ForumPost[]> {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    return await prisma.forumPost.findMany({
      where: {
        isHidden: false
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.error('Error fetching forum posts:', error);
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function CommunityPage({
  params,
}: {
  params: { locale: string }
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const t = content[locale === 'en' ? 'en' : 'es'];
  
  const posts = await getForumPosts();

  const showForum = true;

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
        
        {showForum ? (
          /* Forum Section (currently disabled) */
        <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.forum.title}</h2>
          <p className="text-gray-600 mb-8">{t.forum.description}</p>

          <CreatePostForm labels={t.forum.createPost} />

          <div>
            <h3 className="text-xl font-semibold mb-4">{t.forum.recentPosts}</h3>
              {posts.length === 0 ? (
            <div className="text-center text-gray-500">
              {t.forum.noPosts}
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post: ForumPost) => (
                    <div key={post.id} className="bg-white p-6 rounded-lg shadow">
                      <h4 className="text-xl font-semibold mb-2">{post.title}</h4>
                      <p className="text-gray-600 mb-2">
                        {t.forum.postedBy} {post.user.fullName}
                      </p>
                      <div className="prose max-w-none mb-4">
                        {post.content.length > 200 ? (
                          <>
                            {post.content.slice(0, 200)}...
                            <button className="text-primary font-medium ml-2">
                              {t.forum.readMore}
                            </button>
                          </>
                        ) : (
                          post.content
                        )}
                      </div>
                      {post.imageUrl && (
                        <div className="relative w-full h-48 mt-4">
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg shadow mb-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">{t.forum.title}</h2>
            <p className="text-gray-600 mb-4">{t.forum.description}</p>
            <p className="text-lg font-semibold text-gray-700">{locale === 'en' ? 'Soon…' : 'Próximamente'}</p>
            <p className="text-gray-500 mt-2">{locale === 'en' ? 'Share photos of your experience once the forum is open.' : 'Comparte fotos de tu experiencia una vez que el foro esté disponible.'}</p>
        </div>
        )}
      </section>
    </div>
  );
} 