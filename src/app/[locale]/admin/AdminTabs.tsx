"use client";
import React from 'react';
import AdminActionButton from './AdminActionButton';
import SignedImg from '@/components/SignedImg';
import Lightbox from '@/components/Lightbox';
import PostAdminCard from './PostAdminCard';
import SegmentedControl from './SegmentedControl';

type UserRow = { id: number; email: string; fullName: string; role: string; city?: string|null; country?: string|null };
type ArtworkRow = { id: number; title: string; artist_name: string; image_url?: string|null; created_at?: string };
type PostRow = { id: number; title: string; content: string; user?: { fullName?: string } };
type ContactRow = { id: number; name: string; email: string; subject: string; message: string };

export default function AdminTabs({
  locale,
  users,
  gallery,
  approvals,
  posts,
  comments,
  contacts,
}: {
  locale: string;
  users: UserRow[];
  gallery: ArtworkRow[];
  approvals: ArtworkRow[];
  posts: PostRow[];
  comments: any[];
  contacts: ContactRow[];
}) {
  const t = locale === 'en'
    ? { accounts: 'Accounts', gallery: 'Gallery', approvals: 'Approvals', community: 'Community', contacts: 'Contacts', export: 'Export CSV', admin: 'Admin', role: 'Role', user: 'user', filter: 'Filter', search: 'Search' }
    : { accounts: 'Cuentas', gallery: 'Galería', approvals: 'Por aprobar', community: 'Comunidad', contacts: 'Contactos', export: 'Exportar CSV', admin: 'Admin', role: 'Rol', user: 'usuario', filter: 'Filtrar', search: 'Buscar' };

  const [tab, setTab] = React.useState<'accounts'|'gallery'|'approvals'|'community'|'contacts'>('accounts');
  const [roleFilter, setRoleFilter] = React.useState<'all'|'admin'|'user'>('all');
  const [lb, setLb] = React.useState<{ src: string; alt: string } | null>(null);
  const [query, setQuery] = React.useState('');

  const counts = {
    users: users.length,
    gallery: gallery.length,
    approvals: approvals.length,
    posts: posts.length,
    contacts: contacts.length,
  };

  const filteredUsers = users
    .filter(u => roleFilter==='all' ? true : (roleFilter==='admin' ? (u.role==='admin'||u.role==='superadmin') : (u.role!=='admin'&&u.role!=='superadmin')))
    .filter(u => query.trim() ? ((u.fullName||'').toLowerCase().includes(query.toLowerCase()) || (u.email||'').toLowerCase().includes(query.toLowerCase())) : true);

  return (
    <div>
      <div className="mt-2 mb-6 px-4">
        <div className="w-full max-w-full overflow-x-auto whitespace-nowrap">
          <SegmentedControl
            className="inline-flex min-w-max"
            ariaLabel="Admin sections"
            segments={[
              { key: 'accounts', label: t.accounts, badge: counts.users },
              { key: 'gallery', label: t.gallery, badge: counts.gallery },
              { key: 'approvals', label: t.approvals, badge: counts.approvals },
              { key: 'community', label: t.community, badge: counts.posts },
              { key: 'contacts', label: t.contacts, badge: counts.contacts },
            ]}
            selected={tab}
            onChange={(k)=>setTab(k as any)}
          />
        </div>
      </div>

      {tab==='accounts' && (
        <section className="bg-white/90 rounded-2xl shadow-sm ring-1 ring-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">{t.role}:</label>
                <select value={roleFilter} onChange={(e)=>setRoleFilter(e.target.value as any)} className="border rounded px-2 py-1 text-sm">
                  <option value="all">All</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder={`${t.search}…`} className="border rounded px-3 py-1.5 text-sm w-full sm:w-56" />
            </div>
            <a href="/api/admin/users/export" className="inline-flex items-center gap-2 border text-gray-800 text-sm px-4 py-2 rounded-full hover:bg-gray-50 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5 20h14v-2H5v2zm7-18l-5.5 6h3.5v6h4V8h3.5L12 2z"/></svg>
              {t.export}
            </a>
          </div>
          <div className="divide-y">
            {filteredUsers.map(u => (
              <div key={u.id} className="py-3 flex items-center justify-between">
                <div className="min-w-0">
                  <div className="font-medium flex items-center gap-2">
                    <span className="truncate max-w-[14rem] inline-block align-middle">{u.fullName || u.email}</span>
                    {(u.role==='admin'||u.role==='superadmin') && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">{t.admin}</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 truncate max-w-[18rem]">{u.email}</div>
                  {((u as any).city || (u as any).country) && (
                    <div className="text-xs text-gray-500">{[u.city, u.country].filter(Boolean).join(', ')}</div>
                  )}
                </div>
                {(u.role!=='admin'&&u.role!=='superadmin') && (
                  <div className="text-xs px-2 py-1 rounded-full border bg-gray-50">
                    {t.user}
                  </div>
                )}
              </div>
            ))}
            {filteredUsers.length===0 && <p className="text-sm text-gray-600 py-6 text-center">No items.</p>}
          </div>
        </section>
      )}

      {lb && <Lightbox src={lb.src} alt={lb.alt} onClose={()=>setLb(null)} />}

      {tab==='gallery' && (
        <section className="bg-white/90 rounded-2xl shadow-sm ring-1 ring-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{t.gallery}</h2>
            <a href="/api/admin/artworks/export?status=approved" className="inline-flex items-center gap-2 bg-white border text-gray-800 text-sm px-4 py-2 rounded-full hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5 20h14v-2H5v2zm7-18l-5.5 6h3.5v6h4V8h3.5L12 2z"/></svg>
              {t.export}
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map(g => (
              <div key={g.id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full h-56 md:h-64 bg-gray-50 flex items-center justify-center">
                  {g.image_url ? (
                    <button aria-label="Open image" onClick={()=>setLb({ src: g.image_url!, alt: g.title })} className="block w-full h-full">
                      <SignedImg src={g.image_url} alt={g.title} className="w-full h-full object-contain" />
                    </button>
                  ) : <div className="w-full h-full"/>}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-[17px] tracking-tight text-gray-900">{g.title}</h4>
                  <p className="text-gray-700 font-medium mb-3 text-[15px]">{g.artist_name}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Technique:</span>
                      <span className="text-gray-800">{(g as any).technique || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Dimensions:</span>
                      <span className="text-gray-800">{(g as any).dimensions || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Market:</span>
                      <span className="font-medium text-gray-900">${(g as any).market_price ?? (g as any).marketPrice ?? '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Starting:</span>
                      <span className="font-medium text-green-600">${(g as any).starting_price ?? (g as any).startingPrice ?? '-'}</span>
                    </div>
                    {(g as any).year && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Year:</span>
                        <span className="text-gray-800">{(g as any).year}</span>
                      </div>
                    )}
                    {(g as any).donation_percentage!=null && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Donation %:</span>
                        <span className="font-medium text-blue-600">{(g as any).donation_percentage}%</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-3 border-t">
                    <AdminActionButton id={g.id} action="reject" label="Delete" danger endpoint={`/api/admin/artworks?id=${g.id}`} httpMethod="DELETE" />
                  </div>
                </div>
              </div>
            ))}
            {gallery.length===0 && <p className="text-sm text-gray-600">No items.</p>}
          </div>
        </section>
      )}

      {tab==='approvals' && (
        <section className="bg-white/90 rounded-2xl shadow-sm ring-1 ring-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{t.approvals}</h2>
            <a href="/api/admin/artworks/export?status=pending" className="inline-flex items-center gap-2 bg-white border text-gray-800 text-sm px-4 py-2 rounded-full hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5 20h14v-2H5v2zm7-18l-5.5 6h3.5v6h4V8h3.5L12 2z"/></svg>
              {t.export}
            </a>
          </div>
          <div className="space-y-4">
            {approvals.map(a => (
              <div key={a.id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full h-56 md:h-64 bg-gray-50 flex items-center justify-center">
                  {a.image_url ? (
                    <button aria-label="Open image" onClick={()=>setLb({ src: a.image_url!, alt: a.title })} className="block w-full h-full">
                      <SignedImg src={a.image_url} alt={a.title} className="w-full h-full object-contain" />
                    </button>
                  ) : <div className="w-full h-full"/>}
                </div>
                <div className="p-4 flex items-start justify-between gap-4">
                  <div className="text-sm">
                    <div className="font-medium text-lg">{a.title}</div>
                    <div className="text-gray-600">{a.artist_name}</div>
                    <div className="mt-2 text-gray-600 space-y-1">
                      <div>Technique: {(a as any).technique || '-'}</div>
                      <div>Dimensions: {(a as any).dimensions || '-'}</div>
                      <div>Market: ${(a as any).market_price ?? (a as any).marketPrice ?? '-'}</div>
                      <div>Starting: ${(a as any).starting_price ?? (a as any).startingPrice ?? '-'}</div>
                      <div>Donor: {(a as any).donor_email || '-'} {(a as any).donor_phone ? '• '+(a as any).donor_phone : ''}</div>
                      {(a as any).year && <div>Year: {(a as any).year}</div>}
                      {(a as any).donation_percentage!=null && <div>Donation %: {(a as any).donation_percentage}%</div>}
                    </div>
                  </div>
                  <div className="w-40 sm:w-auto grid grid-cols-2 gap-2 sm:flex sm:gap-2">
                    <AdminActionButton id={a.id} action="approve" label="Approve" className="w-full" />
                    <AdminActionButton id={a.id} action="reject" label="Reject" danger className="w-full" />
                  </div>
                </div>
              </div>
            ))}
            {approvals.length===0 && <p className="text-sm text-gray-600">No items.</p>}
          </div>
        </section>
      )}

      {tab==='community' && (
        <section className="bg-white/90 rounded-2xl shadow-sm ring-1 ring-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{t.community}</h2>
            <a href="/api/admin/posts/export" className="inline-flex items-center gap-2 bg-white border text-gray-800 text-sm px-4 py-2 rounded-full hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5 20h14v-2H5v2zm7-18l-5.5 6h3.5v6h4V8h3.5L12 2z"/></svg>
              {t.export}
            </a>
          </div>
          <div className="space-y-4">
            {posts.map(p => (
              <PostAdminCard key={p.id} p={p} allComments={comments} />
            ))}
            {posts.length===0 && <p className="text-sm text-gray-600">No items.</p>}
          </div>
        </section>
      )}

      {tab==='contacts' && (
        <section className="bg-white/90 rounded-2xl shadow-sm ring-1 ring-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{t.contacts}</h2>
            <a href="/api/admin/contacts/export" className="inline-flex items-center gap-2 bg-white border text-gray-800 text-sm px-4 py-2 rounded-full hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5 20h14v-2H5v2zm7-18l-5.5 6h3.5v6h4V8h3.5L12 2z"/></svg>
              {t.export}
            </a>
          </div>
          <div className="space-y-4">
            {contacts.map(c => (
              <div key={c.id} className="border border-gray-200 rounded-xl p-4 bg-white/80">
                <div className="font-medium">{c.subject}</div>
                <div className="text-sm text-gray-600">{c.name} • {c.email}</div>
                <div className="text-sm text-gray-500 line-clamp-3">{c.message}</div>
              </div>
            ))}
            {contacts.length===0 && <p className="text-sm text-gray-600">No items.</p>}
          </div>
        </section>
      )}
    </div>
  );
}

// TabBtn no longer used; replaced by SegmentedControl


