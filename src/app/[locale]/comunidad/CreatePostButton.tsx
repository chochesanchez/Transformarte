'use client';

import React from 'react';

interface CreatePostButtonProps {
  buttonText: string;
  defaultAuthed?: boolean;
  locale?: string;
  fullWidthOnMobile?: boolean;
}

export default function CreatePostButton({ buttonText, defaultAuthed = false, locale: initialLocale, fullWidthOnMobile = false }: CreatePostButtonProps) {
  const [authed, setAuthed] = React.useState<boolean>(defaultAuthed);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [locale, setLocale] = React.useState<string>(initialLocale || 'es');
  React.useEffect(() => {
    fetch('/api/auth', { cache: 'no-store', credentials: 'include' })
      .then(r => r.json())
      .then(j => setAuthed(!!j.user))
      .catch(() => setAuthed(false))
      .finally(() => setLoading(false));
    try {
      const segs = window.location.pathname.split('/');
      if (segs[1] === 'en' || segs[1] === 'es') setLocale(segs[1]);
    } catch {}
  }, []);

  return (
    <>
      {loading ? (
        <button 
          disabled
          className={`bg-gray-300 text-gray-600 px-6 py-2 rounded-full font-semibold ${fullWidthOnMobile ? 'w-full sm:w-auto block sm:inline-block' : 'inline-block'}`}
        >
          ...
        </button>
      ) : authed ? (
        <button 
          onClick={() => document.getElementById('createPostForm')?.classList.remove('hidden')}
          className={`px-5 py-2 rounded-full font-semibold items-center gap-2 border border-blue-700 text-blue-700 hover:bg-blue-50 ${fullWidthOnMobile ? 'w-full sm:w-auto flex justify-center' : 'inline-flex'}`}
        >
          {buttonText}
        </button>
      ) : (
        <a href={`/${locale}/auth`} className={`bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary/90 ${fullWidthOnMobile ? 'w-full sm:w-auto block sm:inline-block text-center' : 'inline-block'}`}>
          {locale==='en'?'Log in to post':'Inicia sesión para publicar'}
        </a>
      )}
    </>
  );
} 