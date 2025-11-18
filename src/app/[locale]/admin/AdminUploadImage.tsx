"use client";
import React from 'react';

export default function AdminUploadImage({ artworkId, onDone }: { artworkId: number; onDone?: ()=>void }){
  const [busy, setBusy] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const pick = () => inputRef.current?.click();
  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setBusy(true);
    try {
      const file = e.target.files[0];
      const fd = new FormData();
      fd.append('file', file);
      const up = await fetch('/api/upload', { method: 'POST', body: fd });
      const j = await up.json();
      if (!up.ok || !j?.fileUrl) throw new Error(j?.error || 'Upload failed');
      await fetch('/api/admin/artworks', { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id: artworkId, action:'set_image', imageUrl: j.fileUrl }) });
      onDone?.();
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={upload} />
      <button onClick={pick} disabled={busy} className="px-3 py-1 text-sm rounded border">{busy? 'Uploading…' : 'Upload/Replace Image'}</button>
    </div>
  );
}


