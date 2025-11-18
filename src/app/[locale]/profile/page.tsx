"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage({ params }: { params: Promise<{ locale: string }> | { locale: string } }) {
  const [locale, setLocale] = React.useState<'en'|'es'>('es');
  React.useEffect(() => {
    (async () => {
      const p: any = (params as any).then ? await (params as any) : params;
      setLocale(p?.locale === 'en' ? 'en' : 'es');
    })();
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
    <div className="container mx-auto px-4 py-10 max-w-lg">
      <h1 className="text-2xl font-semibold mb-6">{locale==='en'?'Display Name':'Nombre para mostrar'}</h1>
      <form onSubmit={save} className="space-y-4">
        <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full border rounded px-3 py-2" placeholder={locale==='en'?'Your display name':'Tu nombre para mostrar'} disabled={loading} />
        <button className="bg-primary text-white px-6 py-2 rounded" disabled={loading || !name.trim()}>{locale==='en'?'Save':'Guardar'}</button>
      </form>
    </div>
  );
}


