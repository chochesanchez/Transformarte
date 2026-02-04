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
    subtitle: "Connect, share, and grow together",
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
    },
    stats: {
      members: "Community Members",
      posts: "Posts Shared",
      cities: "Cities Connected"
    }
  },
  es: {
    title: "Comunidad",
    subtitle: "Conecta, comparte y crece junto a nosotros",
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
    },
    stats: {
      members: "Miembros de la Comunidad",
      posts: "Publicaciones Compartidas",
      cities: "Ciudades Conectadas"
    }
  }
};

async function getForumPosts(): Promise<ForumPost[]> {
  try {
    // Check if Supabase is configured
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return [];
    }
    const { data, error } = await supabase
      .from('forum_posts')
      .select('id,user_id,title,content,image_url,is_hidden,created_at,updated_at, user:users (id, fullName, email)')
      .eq('is_hidden', false)
      .order('created_at', { ascending: false });
    if (error) {
      // Only log if it's not a connection/config issue
      if (error.message && !error.message.includes('fetch')) {
        console.error('Error fetching forum posts:', error);
      }
      return [];
    }
    return (data as any) || [];
  } catch (error) {
    // Silently fail if Supabase isn't configured
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
    <>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-white min-h-[40vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-rose-400 z-0" />
        <div className="absolute inset-0 bg-black/20 z-1" />
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-white font-semibold">🤝 {locale === 'en' ? 'Join the Movement' : 'Únete al Movimiento'}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-md">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-pink-500">{posts.length}</div>
              <div className="text-gray-600 text-sm">{t.stats.posts}</div>
            </div>
            <div className="text-center p-4 border-l">
              <div className="text-3xl font-bold text-rose-500">8</div>
              <div className="text-gray-600 text-sm">{t.stats.cities}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto">
        <section className="py-12 px-4 max-w-4xl mx-auto">
          
          {/* Forum Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl shadow-lg mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-purple-900 flex items-center gap-3">
                  <span className="bg-purple-100 p-2 rounded-xl">💬</span>
                  {t.forum.title}
                </h2>
                <p className="text-gray-600 mt-2">{t.forum.description}</p>
              </div>
              <CreatePostButton buttonText={t.createPost.button} defaultAuthed={authed} locale={locale} fullWidthOnMobile />
            </div>
            {authed && (
              <div className="bg-white p-6 rounded-2xl shadow-inner mb-6">
                <CreatePostForm labels={t.forum.createPost} locale={locale} />
              </div>
            )}
          </div>

          {/* Recent Posts */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="bg-pink-100 p-2 rounded-xl">📝</span>
              {t.forum.recentPosts}
            </h3>
            
            {posts.length === 0 ? (
              <div className="bg-gradient-to-br from-gray-50 to-purple-50 p-12 rounded-3xl text-center">
                <div className="text-6xl mb-4">✨</div>
                <p className="text-gray-600 text-lg">{t.forum.noPosts}</p>
                {!authed && (
                  <Link 
                    href={`/${locale}/auth`}
                    className="inline-block mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                  >
                    {locale === 'en' ? 'Sign in to post' : 'Inicia sesión para publicar'}
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post: ForumPost) => (
                  <div 
                    key={post.id} 
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {post.user?.fullName?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{post.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="font-medium text-purple-600">{post.user?.fullName}</span>
                            <span>•</span>
                            <span>{new Date(post.created_at).toLocaleDateString(locale)}</span>
                          </div>
                        </div>
                      </div>
                      <PostActions postId={post.id} isOwner={userId===post.user_id} isAdmin={admin} title={post.title} content={post.content} locale={locale} />
                    </div>
                    
                    <div className="prose max-w-none text-gray-700 mb-4">
                      {post.content.length > 200 ? (
                        <>
                          {post.content.slice(0, 200)}...
                          <button className="text-purple-600 font-medium ml-2 hover:text-purple-800">{t.forum.readMore}</button>
                        </>
                      ) : (
                        post.content
                      )}
                    </div>
                    
                    {post.image_url && (
                      <div className="mt-4 rounded-xl overflow-hidden">
                        <PostImageCarousel raw={post.image_url as any} title={post.title} />
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <CommentsSection postId={post.id} locale={locale} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Register for Events */}
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-8 rounded-3xl shadow-xl text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="text-4xl mb-3">📅</div>
                <h2 className="text-2xl font-bold mb-2">{t.register.title}</h2>
                <p className="text-white/90">{t.register.description}</p>
              </div>
              <a 
                href="https://edu.transformarte.com.mx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg whitespace-nowrap"
              >
                {t.register.button}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
