"use client";
import React, { useState } from 'react';
import AdminActionButton from './AdminActionButton';
import PostAdminCard from './PostAdminCard';
import Lightbox from '../catalogo/Lightbox';
import FinanceTab from './FinanceTab';

type UserRow    = { id: number; email: string; fullName: string; role: string; created_at?: string; city?: string|null; country?: string|null };
type ArtworkRow = { id: number; title: string; artist_name: string; technique?: string; dimensions?: string; market_price?: string|number; starting_price?: string|number; year?: number; donation_percentage?: number; donor_email?: string; donor_phone?: string; image_url?: string|null; created_at?: string };
type PostRow    = { id: number; title: string; content: string; image_url?: string|null; created_at?: string; user?: { id?: number; fullName?: string } };
type ContactRow = { id: number; name: string; email: string; subject: string; message: string; created_at?: string };
type Section    = 'overview' | 'approvals' | 'gallery' | 'community' | 'contacts' | 'users' | 'finance';

/* ── Inline SVG icons ─────────────────────────────────────────────── */
const Icon = {
  overview:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  approvals: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>,
  gallery:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>,
  community: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  contacts:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>,
  users:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  download:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  home:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  finance:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
};

function ExportBtn({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
      {Icon.download} {label}
    </a>
  );
}

function SectionHeader({ title, subtitle, exportHref, exportLabel }: { title: string; subtitle?: string; exportHref?: string; exportLabel?: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {exportHref && exportLabel && <ExportBtn href={exportHref} label={exportLabel} />}
    </div>
  );
}

function Empty({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 py-20 flex flex-col items-center gap-3 text-gray-400">
      <span className="text-4xl">{icon}</span>
      <span className="text-sm">{text}</span>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
export default function AdminDashboard({ locale, users, gallery, approvals, posts, comments, contacts }: {
  locale: string;
  users: UserRow[];
  gallery: ArtworkRow[];
  approvals: ArtworkRow[];
  posts: PostRow[];
  comments: any[];
  contacts: ContactRow[];
}) {
  const [section, setSection] = useState<Section>('overview');
  const [lb, setLb] = useState<{ src: string; alt: string } | null>(null);
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const es = locale !== 'en';
  const label = (es: string, en: string) => locale !== 'en' ? es : en;

  const nav: { key: Section; label: string; badge?: number }[] = [
    { key: 'overview',  label: label('Resumen', 'Overview') },
    { key: 'approvals', label: label('Por Aprobar', 'Approvals'), badge: approvals.length },
    { key: 'gallery',   label: label('Galería', 'Gallery'),   badge: gallery.length },
    { key: 'community', label: label('Comunidad', 'Community'), badge: posts.length },
    { key: 'contacts',  label: label('Contactos', 'Contacts'), badge: contacts.length },
    { key: 'users',     label: label('Usuarios', 'Users'),    badge: users.length },
    { key: 'finance',   label: label('Finanzas', 'Finance') },
  ];

  const filteredUsers = users
    .filter(u => roleFilter === 'all' ? true : roleFilter === 'admin' ? (u.role === 'admin' || u.role === 'superadmin') : (u.role !== 'admin' && u.role !== 'superadmin'))
    .filter(u => !query.trim() || (u.fullName || '').toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()));

  function navigate(key: Section) { setSection(key); setMobileOpen(false); }

  /* Sidebar link */
  function NavLink({ item }: { item: typeof nav[0] }) {
    const active = section === item.key;
    return (
      <button onClick={() => navigate(item.key)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
        <span className="flex-shrink-0">{Icon[item.key]}</span>
        <span className="flex-1 text-left">{item.label}</span>
        {item.badge !== undefined && item.badge > 0 && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${active ? 'bg-white/25 text-white' : item.key === 'approvals' ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
            {item.badge}
          </span>
        )}
      </button>
    );
  }

  const Sidebar = () => (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-700/60">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1">TransformArte</div>
        <div className="text-base font-bold text-white">Admin Dashboard</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map(item => <NavLink key={item.key} item={item} />)}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-700/60 space-y-0.5">
        <a href={`/${locale}`} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          {Icon.home}
          <span>{label('Ir al sitio', 'Back to site')}</span>
        </a>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 lg:z-30">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 h-full flex flex-col"><Sidebar /></div>
        </div>
      )}

      {/* Main */}
      <div className="lg:ml-64 flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100" onClick={() => setMobileOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <h1 className="text-base font-semibold text-gray-900">
              {nav.find(n => n.key === section)?.label}
            </h1>
          </div>
          <span className="text-xs text-gray-400 hidden sm:block">
            {new Date().toLocaleDateString(es ? 'es-MX' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8">

          {/* ── OVERVIEW ── */}
          {section === 'overview' && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {([
                  { label: label('Usuarios', 'Users'),         value: users.length,    icon: '👥', accent: 'border-blue-100',    text: 'text-blue-700',    bg: 'bg-blue-50'    },
                  { label: label('Por aprobar', 'Pending'),     value: approvals.length, icon: '⏳', accent: 'border-amber-100',  text: 'text-amber-700',   bg: 'bg-amber-50'   },
                  { label: label('Galería', 'Gallery'),         value: gallery.length,   icon: '🖼️', accent: 'border-emerald-100',text: 'text-emerald-700', bg: 'bg-emerald-50' },
                  { label: label('Publicaciones', 'Posts'),     value: posts.length,     icon: '💬', accent: 'border-violet-100', text: 'text-violet-700',  bg: 'bg-violet-50'  },
                  { label: label('Contactos', 'Contacts'),      value: contacts.length,  icon: '✉️', accent: 'border-rose-100',   text: 'text-rose-700',    bg: 'bg-rose-50'    },
                ] as const).map(s => (
                  <div key={s.label} className={`bg-white border ${s.accent} rounded-xl p-5 shadow-sm`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{s.icon}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>{s.value}</span>
                    </div>
                    <div className={`text-3xl font-bold ${s.text}`}>{s.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Pending artworks preview */}
              {approvals.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-900 text-sm">{label('Obras pendientes de aprobación', 'Artworks pending approval')}</h2>
                    <button onClick={() => navigate('approvals')} className="text-xs text-blue-600 hover:text-blue-800 font-medium">{label('Ver todas →', 'View all →')}</button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {approvals.slice(0, 5).map(a => (
                      <div key={a.id} className="px-6 py-3 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                          {a.image_url && <img src={a.image_url} alt={a.title} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{a.title}</div>
                          <div className="text-xs text-gray-400">{a.artist_name}</div>
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 font-medium flex-shrink-0">{label('Pendiente', 'Pending')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent contacts preview */}
              {contacts.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-900 text-sm">{label('Mensajes recientes', 'Recent messages')}</h2>
                    <button onClick={() => navigate('contacts')} className="text-xs text-blue-600 hover:text-blue-800 font-medium">{label('Ver todos →', 'View all →')}</button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {contacts.slice(0, 4).map(c => (
                      <div key={c.id} className="px-6 py-3 flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-700 text-xs font-semibold">{(c.name || '?')[0].toUpperCase()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{c.subject}</div>
                          <div className="text-xs text-gray-400 truncate">{c.name} · {c.email}</div>
                        </div>
                        {c.created_at && <span className="text-xs text-gray-400 flex-shrink-0">{new Date(c.created_at).toLocaleDateString(es ? 'es-MX' : 'en-US')}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── APPROVALS ── */}
          {section === 'approvals' && (
            <div className="space-y-4">
              <SectionHeader
                title={label('Obras por aprobar', 'Artworks pending approval')}
                subtitle={`${approvals.length} ${label('pendientes', 'pending')}`}
                exportHref="/api/admin/artworks/export?status=pending"
                exportLabel={label('Exportar CSV', 'Export CSV')}
              />
              {approvals.length === 0 && <Empty icon="✅" text={label('No hay obras pendientes.', 'No pending artworks.')} />}
              {approvals.map(a => (
                <div key={a.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="w-full md:w-52 h-44 md:h-auto bg-gray-50 flex-shrink-0 flex items-center justify-center cursor-pointer border-b md:border-b-0 md:border-r border-gray-100"
                      onClick={() => a.image_url && setLb({ src: a.image_url, alt: a.title })}>
                      {a.image_url
                        ? <img src={a.image_url} alt={a.title} className="w-full h-full object-contain" />
                        : <span className="text-gray-300 text-5xl">🖼</span>}
                    </div>
                    {/* Info */}
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 leading-tight">{a.title}</h3>
                          <p className="text-sm text-gray-500 mt-0.5">{a.artist_name}</p>
                        </div>
                        <span className="flex-shrink-0 text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">{label('Pendiente', 'Pending')}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mb-5">
                        {[
                          [label('Técnica', 'Technique'), a.technique],
                          [label('Dimensiones', 'Dimensions'), a.dimensions],
                          [label('Precio mercado', 'Market price'), a.market_price ? `$${a.market_price}` : null],
                          [label('Precio inicial', 'Starting price'), a.starting_price ? `$${a.starting_price}` : null],
                          [label('Donante', 'Donor'), a.donor_email],
                          [label('Teléfono', 'Phone'), a.donor_phone],
                          ...(a.year ? [[label('Año', 'Year'), String(a.year)]] : []),
                          ...(a.donation_percentage != null ? [['Donación %', `${a.donation_percentage}%`]] : []),
                        ].filter(([, v]) => v).map(([k, v]) => (
                          <div key={String(k)} className="flex flex-col">
                            <span className="text-xs text-gray-400">{k}</span>
                            <span className="text-gray-800 font-medium truncate">{v}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-4 border-t border-gray-100">
                        <AdminActionButton id={a.id} action="approve" label={label('✓ Aprobar', '✓ Approve')} className="flex-1 !rounded-lg text-sm" />
                        <AdminActionButton id={a.id} action="reject" label={label('✕ Rechazar', '✕ Reject')} danger className="flex-1 !rounded-lg text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── GALLERY ── */}
          {section === 'gallery' && (
            <div>
              <SectionHeader
                title={label('Galería de obras', 'Artwork Gallery')}
                subtitle={`${gallery.length} ${label('aprobadas', 'approved')}`}
                exportHref="/api/admin/artworks/export?status=approved"
                exportLabel={label('Exportar CSV', 'Export CSV')}
              />
              {gallery.length === 0 && <Empty icon="🖼️" text={label('Sin obras aprobadas.', 'No approved artworks.')} />}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {gallery.map(g => (
                  <div key={g.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                    <div className="h-48 bg-gray-50 flex items-center justify-center cursor-pointer overflow-hidden"
                      onClick={() => g.image_url && setLb({ src: g.image_url, alt: g.title })}>
                      {g.image_url
                        ? <img src={g.image_url} alt={g.title} className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-200" />
                        : <span className="text-gray-300 text-4xl">🖼</span>}
                    </div>
                    <div className="p-4">
                      <div className="font-semibold text-gray-900 text-sm truncate mb-0.5">{g.title}</div>
                      <div className="text-xs text-gray-500 mb-3 truncate">{g.artist_name}</div>
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                        <span>{g.market_price ? `$${g.market_price}` : '—'}</span>
                        {g.donation_percentage != null && <span className="text-blue-600 font-medium">{g.donation_percentage}%</span>}
                      </div>
                      <AdminActionButton id={g.id} action="reject" label={label('Eliminar', 'Delete')} danger endpoint={`/api/admin/artworks?id=${g.id}`} httpMethod="DELETE" className="w-full !rounded-lg text-xs" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── COMMUNITY ── */}
          {section === 'community' && (
            <div className="space-y-4">
              <SectionHeader
                title={label('Foro de la comunidad', 'Community Forum')}
                subtitle={`${posts.length} ${label('publicaciones', 'posts')}`}
                exportHref="/api/admin/posts/export"
                exportLabel={label('Exportar CSV', 'Export CSV')}
              />
              {posts.length === 0 && <Empty icon="💬" text={label('Sin publicaciones.', 'No posts.')} />}
              {posts.map(p => <PostAdminCard key={p.id} p={p} allComments={comments} />)}
            </div>
          )}

          {/* ── CONTACTS ── */}
          {section === 'contacts' && (
            <div className="space-y-3">
              <SectionHeader
                title={label('Mensajes de contacto', 'Contact Messages')}
                subtitle={`${contacts.length} ${label('mensajes', 'messages')}`}
                exportHref="/api/admin/contacts/export"
                exportLabel={label('Exportar CSV', 'Export CSV')}
              />
              {contacts.length === 0 && <Empty icon="✉️" text={label('Sin mensajes.', 'No messages.')} />}
              {contacts.map(c => (
                <div key={c.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-700 font-semibold text-sm">{(c.name || '?')[0].toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-semibold text-gray-900 text-sm">{c.subject}</span>
                        {c.created_at && <span className="text-xs text-gray-400 flex-shrink-0">{new Date(c.created_at).toLocaleDateString(es ? 'es-MX' : 'en-US')}</span>}
                      </div>
                      <div className="text-xs text-gray-500 mb-3">
                        {c.name} · <a href={`mailto:${c.email}`} className="text-blue-600 hover:underline">{c.email}</a>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{c.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── USERS ── */}
          {section === 'users' && (
            <div>
              <SectionHeader
                title={label('Gestión de usuarios', 'User Management')}
                subtitle={`${users.length} ${label('usuarios registrados', 'registered users')}`}
                exportHref="/api/admin/users/export"
                exportLabel={label('Exportar CSV', 'Export CSV')}
              />
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <select value={roleFilter} onChange={e => setRoleFilter(e.target.value as 'all'|'admin'|'user')}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">{label('Todos los roles', 'All roles')}</option>
                  <option value="admin">Admin</option>
                  <option value="user">{label('Usuario', 'User')}</option>
                </select>
                <input value={query} onChange={e => setQuery(e.target.value)}
                  placeholder={label('Buscar por nombre o correo…', 'Search by name or email…')}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white shadow-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              {/* Table */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50/80 border-b border-gray-100">
                        <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wide">{label('Nombre', 'Name')}</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wide">{label('Correo', 'Email')}</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wide">Rol</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wide">{label('Ubicación', 'Location')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredUsers.map(u => (
                        <tr key={u.id} className="hover:bg-blue-50/30 transition-colors">
                          <td className="px-5 py-3.5 font-medium text-gray-900">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xs font-semibold">{(u.fullName || u.email || '?')[0].toUpperCase()}</span>
                              </div>
                              <span className="truncate max-w-[140px]">{u.fullName || '—'}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-gray-600">{u.email}</td>
                          <td className="px-5 py-3.5">
                            {(u.role === 'admin' || u.role === 'superadmin')
                              ? <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">{u.role}</span>
                              : <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">{u.role}</span>}
                          </td>
                          <td className="px-5 py-3.5 text-gray-400 text-xs">{[(u as any).city, (u as any).country].filter(Boolean).join(', ') || '—'}</td>
                        </tr>
                      ))}
                      {filteredUsers.length === 0 && (
                        <tr><td colSpan={4} className="px-5 py-10 text-center text-gray-400 text-sm">{label('Sin resultados.', 'No results.')}</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── FINANCE ── */}
          {section === 'finance' && <FinanceTab locale={locale} />}

        </main>
      </div>

      {lb && <Lightbox src={lb.src} alt={lb.alt} onClose={() => setLb(null)} />}
    </div>
  );
}
