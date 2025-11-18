"use client";

type ArtworkAction = 'approve' | 'reject';
type GenericDelete = 'delete';

export default function AdminActionButton({ id, action, label, danger = false, endpoint, httpMethod, className }: { id: number; action: ArtworkAction | GenericDelete; label: string; danger?: boolean; endpoint?: string; httpMethod?: 'PATCH'|'DELETE'; className?: string }) {
  return (
    <button
      onClick={async () => {
        try {
          if (endpoint) {
            await fetch(endpoint, { method: httpMethod || 'DELETE' });
          } else if (action === 'delete') {
            await fetch(`/api/admin/posts?id=${id}`, { method: 'DELETE' });
          } else {
            await fetch('/api/admin/artworks', {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id, action })
            });
          }
        } catch {}
        window.location.reload();
      }}
      className={`${danger ? 'bg-red-600' : 'bg-green-600'} text-white px-4 py-2 rounded-full text-sm font-medium ${className||''}`}
    >
      {label}
    </button>
  );
}


