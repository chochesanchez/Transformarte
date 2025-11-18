"use client";
import React from 'react';

export default function PostActions({
  postId,
  isOwner,
  isAdmin,
  title,
  content,
  locale,
}: {
  postId: number;
  isOwner: boolean;
  isAdmin: boolean;
  title: string;
  content: string;
  locale: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState(title);
  const [editContent, setEditContent] = React.useState(content);

  if (!isOwner && !isAdmin) return null;

  const t = {
    edit: locale === 'en' ? 'Edit' : 'Editar',
    del: locale === 'en' ? 'Delete' : 'Eliminar',
    save: locale === 'en' ? 'Save' : 'Guardar',
    cancel: locale === 'en' ? 'Cancel' : 'Cancelar',
  };

  const doDelete = async () => {
    await fetch(`/api/forum?id=${postId}`, { method: 'DELETE' });
    window.location.reload();
  };

  const doSave = async () => {
    await fetch('/api/forum', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: postId, title: editTitle, content: editContent }),
    });
    window.location.reload();
  };

  if (isEditing) {
    return (
      <div className="mt-3 space-y-2">
        <input value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} className="w-full border rounded px-3 py-2" />
        <textarea value={editContent} onChange={(e)=>setEditContent(e.target.value)} className="w-full border rounded px-3 py-2" rows={4} />
        <div className="flex gap-2">
          <button onClick={doSave} className="bg-primary text-white px-3 py-1 rounded text-sm">{t.save}</button>
          <button onClick={()=>{ setIsEditing(false); setOpen(false); }} className="px-3 py-1 rounded text-sm border">{t.cancel}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button aria-label="actions" onClick={()=>setOpen(v=>!v)} className="h-8 w-8 rounded-full hover:bg-gray-100">⋯</button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow text-sm z-10">
          <button onClick={()=>{ setIsEditing(true); }} className="block w-full text-left px-4 py-2 hover:bg-gray-50">{t.edit}</button>
          <button onClick={doDelete} className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600">{t.del}</button>
        </div>
      )}
    </div>
  );
}


