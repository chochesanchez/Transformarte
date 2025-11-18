import React from 'react';
import supabase from '@/lib/supabase';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import AdminActionButton from './AdminActionButton';
import AdminDelete from './AdminDelete';
import AdminTabs from './AdminTabs';

export const dynamic = 'force-dynamic';

function t(locale: string) {
  const es = {
    title: 'Panel de Administración',
    pending: 'Pendientes de Aprobación',
    posts: 'Publicaciones del Foro',
    contacts: 'Mensajes de Contacto',
    exportCsv: 'Exportar CSV',
    approve: 'Aprobar',
    reject: 'Rechazar',
    delete: 'Eliminar',
    restricted: 'Acceso restringido',
    mustLogin: 'Debes iniciar sesión como administrador.',
    noPending: 'No hay obras pendientes.',
    noItems: 'No hay elementos.',
  };
  const en = {
    title: 'Admin Dashboard',
    pending: 'Pending Approval',
    posts: 'Forum Posts',
    contacts: 'Contact Messages',
    exportCsv: 'Export CSV',
    approve: 'Approve',
    reject: 'Reject',
    delete: 'Delete',
    restricted: 'Restricted access',
    mustLogin: 'You must be logged in as an admin.',
    noPending: 'No pending artworks.',
    noItems: 'No items.',
  };
  return locale === 'en' ? en : es;
}

async function isAdminFromCookie(): Promise<{ ok: boolean; role?: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.COOKIE_NAME || 'ta_session')?.value;
  if (!token) return { ok: false };
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change'));
    const role = String(payload.role || 'user');
    const ok = role === 'admin' || role === 'superadmin';
    return { ok, role };
  } catch {
    return { ok: false };
  }
}

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale === 'en' ? 'en' : 'es';
  const i18n = t(loc);
  const admin = await isAdminFromCookie();
  if (!admin.ok) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold mb-2">{i18n.restricted}</h1>
        <p>{i18n.mustLogin}</p>
      </div>
    );
  }

  const { data: pending } = await supabase
    .from('artworks')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
  const { data: posts } = await supabase
    .from('forum_posts')
    .select('id,title,content,image_url,created_at, user:users(id, fullName)')
    .order('created_at', { ascending: false });
  const { data: contacts } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  const commentsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/admin/comments`, { cache: 'no-store' }).catch(()=>null);
  const commentsJson = commentsRes ? await commentsRes.json() : { ok:false };
  const comments = commentsJson.ok ? commentsJson.items : [];
  const { data: gallery } = await supabase.from('artworks').select('*').eq('status','approved').order('created_at',{ascending:false});
  const { data: users } = await supabase.from('users').select('id,email,fullName,role,created_at');
  const { data: v } = await supabase.from('visits').select('user_id,city,country,created_at').order('created_at',{ascending:false});
  const latestByUser = new Map<number, { city?: string|null; country?: string|null }>();
  (v||[]).forEach((row: any) => { if (row.user_id && !latestByUser.has(row.user_id)) latestByUser.set(row.user_id, { city: row.city, country: row.country }); });

  const usersEnriched = (users||[]).map((u:any)=>({ ...u, ...(latestByUser.get(u.id)||{}) }));

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">{i18n.title}</h1>

      <AdminTabs
        locale={loc}
        users={usersEnriched as any}
        gallery={gallery||[] as any}
        approvals={pending||[] as any}
        posts={posts||[] as any}
        comments={comments||[]}
        contacts={contacts||[] as any}
      />
    </div>
  );
}

 
