import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CreatePostButton from './CreatePostButton';
import CreatePostForm from './CreatePostForm';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import supabase from '@/lib/supabase';
import PostImageCarousel from './PostImageCarousel';
import CommentsSection from './CommentsSection';
import PostActions from './PostActions';

interface ForumPost {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image_url: string | null;
  is_hidden: boolean;
  created_at: string;
  updated_at: string | null;
  user: { id: number; fullName: string; email?: string };
  comments?: any[];
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
      publishedOn: "Published on",
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
      publishedOn: "Publicado el",
      readMore: "Leer Más"
    }
  }
};

async function getForumPosts(): Promise<ForumPost[]> {
  try {
    const { data, error } = await supabase
      .from('forum_posts')
      .select('id,user_id,title,content,image_url,is_hidden,created_at,updated_at, user:users (id, fullName, email)')
      .eq('is_hidden', false)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data as any) || [];
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

  // server-side check for auth cookie
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.COOKIE_NAME || 'ta_session')?.value;
  let authed = false;
  let admin = false;
  let userId: number | null = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change'));
      authed = true;
      userId = Number(payload.sub);
      const role = String(payload.role || 'user');
      admin = role === 'admin' || role === 'superadmin';
    } catch {}
  }

  return (
    <div className="container mx-auto">
      <section className="pt-12 pb-12 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
        <p className="mb-6 text-gray-700">{t.description}</p>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-2xl font-semibold">{t.forum.title}</h2>
              <p className="text-gray-600">{t.forum.description}</p>
            </div>
            <CreatePostButton buttonText={t.createPost.button} defaultAuthed={authed} locale={locale} fullWidthOnMobile />
          </div>
          {authed && <CreatePostForm labels={t.forum.createPost} locale={locale} />}
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">{t.forum.recentPosts}</h3>
            {posts.length === 0 ? (
              <div className="text-center text-gray-500">{t.forum.noPosts}</div>
            ) : (
              <div className="space-y-6">
                {posts.map((post: ForumPost) => (
                  <div key={post.id} className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xl font-semibold mb-2">{post.title}</h4>
                        <p className="text-gray-600 mb-2">{t.forum.postedBy} {post.user?.fullName}</p>
                        <p className="text-gray-500 text-sm mb-2">{t.forum.publishedOn} {new Date(post.created_at).toLocaleDateString(locale)}</p>
                      </div>
                      <PostActions postId={post.id} isOwner={userId===post.user_id} isAdmin={admin} title={post.title} content={post.content} locale={locale} />
                    </div>
                    <div className="prose max-w-none mb-4">
                      {post.content.length > 200 ? (
                        <>
                          {post.content.slice(0, 200)}...
                          <button className="text-primary font-medium ml-2">{t.forum.readMore}</button>
                        </>
                      ) : (
                        post.content
                      )}
                    </div>
                    {post.image_url && (
                      <div className="mt-4">
                        <PostImageCarousel raw={post.image_url as any} title={post.title} />
                      </div>
                    )}
                    <CommentsSection postId={post.id} locale={locale} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.register.title}</h2>
          <p className="text-gray-600 mb-4">{t.register.description}</p>
          <Link href="#" target="_blank" className="bg-primary text-white px-6 py-2 rounded-full font-semibold inline-block hover:bg-primary/90">{t.register.button}</Link>
        </div>
      </section>
    </div>
  );
} 