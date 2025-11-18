"use client";
import React from 'react';

export default function CommentsSection({ postId, locale }: { postId: number; locale: string }) {
  const [comments, setComments] = React.useState<any[]>([]);
  const [input, setInput] = React.useState('');
  const [authed, setAuthed] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);

  const load = async () => {
    const res = await fetch(`/api/comments?postId=${postId}`, { cache: 'no-store' });
    const j = await res.json();
    if (j.ok) setComments(j.items);
  };

  React.useEffect(() => {
    load();
    fetch('/api/auth', { cache: 'no-store', credentials: 'include' }).then(r=>r.json()).then(j=>{ setAuthed(!!j.user); setUser(j.user||null); }).catch(()=>{ setAuthed(false); setUser(null); });
  }, [postId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const res = await fetch('/api/comments', { method:'POST', headers:{'Content-Type':'application/json'}, credentials: 'include', body: JSON.stringify({ postId, content: input })});
    const j = await res.json();
    if (j.ok) {
      setInput('');
      load();
    }
  };

  return (
    <div className="mt-6">
      <h5 className="font-semibold mb-2">{locale==='en'?'Comments':'Comentarios'}</h5>
      <div className="space-y-3">
        {comments.map((c) => (
          <CommentRow key={c.id} c={c} locale={locale} meId={user?.id} isAdmin={user?.role==='admin'||user?.role==='superadmin'} onChanged={load} />
        ))}
        {comments.length===0 && (
          <p className="text-sm text-gray-500">{locale==='en'?'Be the first to comment':'Sé el primero en comentar'}</p>
        )}
      </div>
      {authed ? (
        <form onSubmit={submit} className="mt-4 grid grid-cols-[1fr_auto] gap-2 items-center w-full">
          <input 
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            className="w-full border rounded-full px-4 py-2 bg-gray-100 focus:bg-white"
            placeholder={locale==='en'?'Add a comment…':'Añade un comentario…'}
          />
          <button className="text-primary font-semibold text-sm px-3 py-2">{locale==='en'?'Post':'Enviar'}</button>
        </form>
      ) : (
        <a href={`/${locale}/auth`} className="inline-block mt-3 text-sm text-primary">{locale==='en'?'Log in to comment':'Inicia sesión para comentar'}</a>
      )}
    </div>
  );
}

function CommentRow({ c, locale, meId, isAdmin, onChanged }: { c: any; locale: string; meId?: number; isAdmin?: boolean; onChanged: ()=>void }){
  const [editing, setEditing] = React.useState(false);
  const [text, setText] = React.useState(c.content);
  const can = isAdmin || (meId && meId===c.user_id);
  const t = {
    edit: locale==='en'?'Edit':'Editar',
    del: locale==='en'?'Delete':'Eliminar',
    save: locale==='en'?'Save':'Guardar',
    cancel: locale==='en'?'Cancel':'Cancelar'
  };
  const save = async ()=>{
    await fetch('/api/comments', { method:'PATCH', headers:{'Content-Type':'application/json'}, credentials: 'include', body: JSON.stringify({ id: c.id, content: text }) });
    setEditing(false);
    onChanged();
  };
  const del = async ()=>{
    await fetch(`/api/comments?id=${c.id}`, { method:'DELETE', credentials: 'include' });
    onChanged();
  };
  return (
    <div className="text-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <span className="font-medium">{c.user?.fullName || 'User'}: </span>
          {editing ? (
            <textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full border rounded px-2 py-1 mt-1" rows={3} />
          ) : (
            <span>{c.content}</span>
          )}
        </div>
        {can && (
          <div className="ml-2">
            {editing ? (
              <div className="flex gap-2">
                <button onClick={save} className="text-primary">{t.save}</button>
                <button onClick={()=>setEditing(false)} className="text-gray-600">{t.cancel}</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button onClick={()=>setEditing(true)} className="text-gray-600">{t.edit}</button>
                <button onClick={del} className="text-red-600">{t.del}</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


