'use client';

import React from 'react';

interface CreatePostButtonProps {
  buttonText: string;
}

export default function CreatePostButton({ buttonText }: CreatePostButtonProps) {
  const [authed, setAuthed] = React.useState<boolean>(false);
  React.useEffect(() => {
    fetch('/api/auth').then(r => r.json()).then(j => setAuthed(!!j.user)).catch(() => setAuthed(false));
  }, []);

  return (
    <>
      {authed ? (
        <button 
          onClick={() => document.getElementById('createPostForm')?.classList.remove('hidden')}
          className="bg-primary text-white px-6 py-2 rounded-full font-semibold inline-block hover:bg-primary/90"
        >
          {buttonText}
        </button>
      ) : (
        <a href="/es/auth" className="bg-primary text-white px-6 py-2 rounded-full font-semibold inline-block hover:bg-primary/90">
          Inicia sesión para publicar
        </a>
      )}
    </>
  );
} 