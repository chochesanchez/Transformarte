"use client";
import React from 'react';
import AdminActionButton from './AdminActionButton';
import SignedImg from '@/components/SignedImg';

export default function PostAdminCard({ p, allComments }: { p: any; allComments: any[] }){
  const [editing, setEditing] = React.useState(false);
  const [title, setTitle] = React.useState(p.title);
  const [content, setContent] = React.useState(p.content);
  const [images, setImages] = React.useState<string[]>(()=>{
    try { const parsed = JSON.parse(p.image_url||'null'); return Array.isArray(parsed)?parsed:(parsed? [String(parsed)]:[]); } catch { return p.image_url ? [String(p.image_url)] : []; }
  });
  const comments = (allComments||[]).filter((c: any)=>c.post_id===p.id);
  const save = async ()=>{
    await fetch('/api/forum', { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id: p.id, title, content }) });
    window.location.reload();
  };
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white/80 shadow-sm">
      {editing ? (
        <div className="space-y-2">
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full border rounded-md px-3 py-2" />
          <textarea value={content} onChange={(e)=>setContent(e.target.value)} className="w-full border rounded-md px-3 py-2" rows={4} />
          <div className="flex gap-2">
            <button onClick={save} className="bg-primary text-white text-sm px-4 py-2 rounded-full">Save</button>
            <button onClick={()=>setEditing(false)} className="text-sm px-4 py-2 rounded-full border">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-gray-600">{p.user?.fullName}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>setEditing(true)} className="text-sm px-4 py-2 rounded-full border">Edit</button>
              <AdminActionButton id={p.id} action="delete" label="Delete" danger endpoint={`/api/forum?id=${p.id}`} httpMethod="DELETE" />
            </div>
          </div>
          {images.length>0 && (
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
              {images.map((src,i)=>(
                <SignedImg key={i} src={src} alt="img" className="w-full h-40 object-contain bg-gray-50 rounded-lg" />
              ))}
            </div>
          )}
          <div className="text-sm text-gray-500 mt-2">{p.content}</div>
        </>
      )}
      <div className="mt-3 border-t pt-3">
        <div className="text-sm font-medium mb-2">Comments</div>
        <div className="space-y-2">
          {comments.map((c:any)=> (
            <CommentRow key={c.id} c={c} />
          ))}
          {comments.length===0 && <div className="text-sm text-gray-500">No comments.</div>}
        </div>
      </div>
    </div>
  );
}

function CommentRow({ c }: { c: any }){
  const [editing, setEditing] = React.useState(false);
  const [text, setText] = React.useState(c.content);
  const save = async ()=>{ await fetch('/api/comments', { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id: c.id, content: text }) }); window.location.reload(); };
  const del = async ()=>{ await fetch(`/api/comments?id=${c.id}`, { method:'DELETE' }); window.location.reload(); };
  return (
    <div className="text-sm flex items-start justify-between gap-2">
      <div className="flex-1">
        <div className="text-gray-600">{c.user?.fullName}</div>
        {editing ? (
          <textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full border rounded-md px-3 py-2" rows={2} />
        ) : (
          <div>{c.content}</div>
        )}
      </div>
      <div className="flex gap-2">
        {editing ? (
          <>
            <button onClick={save} className="text-sm px-3 py-1.5 rounded-full border bg-primary text-white">Save</button>
            <button onClick={()=>setEditing(false)} className="text-sm px-3 py-1.5 rounded-full border">Cancel</button>
          </>
        ) : (
          <>
            <button onClick={()=>setEditing(true)} className="text-sm px-3 py-1.5 rounded-full border">Edit</button>
            <button onClick={del} className="text-sm px-3 py-1.5 rounded-full border text-red-600">Delete</button>
          </>
        )}
      </div>
    </div>
  );
}


