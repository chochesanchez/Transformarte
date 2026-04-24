import React from 'react';
import supabase from '@/lib/supabase';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

async function isAdminFromCookie(): Promise<{ ok: boolean; role?: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.COOKIE_NAME || 'ta_session')?.value;
  if (!token) return { ok: false };
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || 'dev-only-insecure-secret-do-not-deploy'));
    const role = String(payload.role || 'user');
    return { ok: role === 'admin' || role === 'superadmin', role };
  } catch {
    return { ok: false };
  }
}

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale === 'en' ? 'en' : 'es';
  const admin = await isAdminFromCookie();

  if (!admin.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center max-w-sm">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">{loc === 'en' ? 'Restricted access' : 'Acceso restringido'}</h1>
          <p className="text-gray-500 text-sm">{loc === 'en' ? 'You must be logged in as an admin.' : 'Debes iniciar sesión como administrador.'}</p>
          <a href={`/${loc}/auth`} className="mt-6 inline-block bg-blue-600 text-white text-sm px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
            {loc === 'en' ? 'Log in' : 'Iniciar sesión'}
          </a>
        </div>
      </div>
    );
  }

  const [
    { data: pending },
    { data: gallery },
    { data: posts },
    { data: contacts },
    { data: users },
    { data: v },
  ] = await Promise.all([
    supabase.from('artworks').select('*').eq('status', 'pending').order('created_at', { ascending: false }),
    supabase.from('artworks').select('*').eq('status', 'approved').order('created_at', { ascending: false }),
    supabase.from('forum_posts').select('id,title,content,image_url,created_at,user:users(id,fullName)').order('created_at', { ascending: false }),
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
    supabase.from('users').select('id,email,fullName,role,created_at'),
    supabase.from('visits').select('user_id,city,country,created_at').order('created_at', { ascending: false }),
  ]);

  const commentsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/admin/comments`, { cache: 'no-store' }).catch(() => null);
  const commentsJson = commentsRes ? await commentsRes.json() : { ok: false };
  const comments = commentsJson.ok ? commentsJson.items : [];

  const latestByUser = new Map<number, { city?: string|null; country?: string|null }>();
  (v || []).forEach((row: any) => {
    if (row.user_id && !latestByUser.has(row.user_id)) latestByUser.set(row.user_id, { city: row.city, country: row.country });
  });
  const usersEnriched = (users || []).map((u: any) => ({ ...u, ...(latestByUser.get(u.id) || {}) }));

  return (
    <AdminDashboard
      locale={loc}
      users={usersEnriched as any}
      gallery={gallery || [] as any}
      approvals={pending || [] as any}
      posts={posts || [] as any}
      comments={comments}
      contacts={contacts || [] as any}
    />
  );
}
