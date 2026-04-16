"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const [locale, setLocale] = React.useState<'en'|'es'>('es');
  React.useEffect(() => {
    params.then((p) => setLocale(p?.locale === 'en' ? 'en' : 'es')).catch(() => setLocale('es'));
  }, [params]);
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    fetch('/api/profile', { cache: 'no-store' }).then(r=>r.json()).then(j=>{
      if (j?.user?.fullName) setName(j.user.fullName);
    }).finally(()=>setLoading(false));
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/profile', { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ fullName: name }) });
    const j = await res.json();
    if (j.ok) router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Mini Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 text-center text-white">
        <div className="text-4xl mb-3">👤</div>
        <h1 className="text-3xl font-bold">{locale === 'en' ? 'Edit Profile' : 'Editar Perfil'}</h1>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-lg">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {locale === 'en' ? 'Display Name' : 'Nombre para Mostrar'}
              </h2>
              <p className="text-gray-500 text-sm">
                {locale === 'en' ? 'How others will see you' : 'Cómo te verán los demás'}
              </p>
            </div>
          </div>

          <form onSubmit={save} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {locale === 'en' ? 'Your Name' : 'Tu Nombre'}
              </label>
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full bg-white text-gray-900 border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none placeholder-gray-400" 
                placeholder={locale === 'en' ? 'Enter your display name' : 'Ingresa tu nombre para mostrar'} 
                disabled={loading} 
              />
            </div>
            
            <div className="flex gap-4">
              <button 
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50" 
                disabled={loading || !name.trim()}
              >
                {locale === 'en' ? 'Save Changes' : 'Guardar Cambios'}
              </button>
              <Link 
                href={`/${locale}`}
                className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                {locale === 'en' ? 'Cancel' : 'Cancelar'}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
