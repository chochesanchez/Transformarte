"use client";
import React from 'react';

export default function SignedImg({ src, alt, className }: { src: string; alt: string; className?: string }){
  const [resolved, setResolved] = React.useState<string>(src);
  const [errorCount, setErrorCount] = React.useState(0);

  React.useEffect(() => {
    // Since the bucket is now public, we can use URLs directly
    // Only process signed URLs that have expired
    if (typeof src === 'string' && src.includes('/storage/v1/object/sign/') && src.includes('token=')) {
      // This is an expired signed URL - extract the path and convert to public URL
      try {
        const url = new URL(src);
        const pathMatch = url.pathname.match(/\/storage\/v1\/object\/sign\/uploads\/(.*)/);
        if (pathMatch && pathMatch[1]) {
          const publicUrl = `${url.origin}/storage/v1/object/public/uploads/${pathMatch[1].split('?')[0]}`;
          setResolved(publicUrl);
          return;
        }
      } catch {}
    }
    
    // For all other URLs, use them as-is (including public URLs)
    setResolved(src);
    setErrorCount(0);
  }, [src]);

  const handleError = async () => {
    try {
      if (errorCount >= 2) return; // Stop after 2 attempts
      setErrorCount(prev => prev + 1);
      
      // Force a fresh signed URL through our API
      const q = new URLSearchParams({ url: src }).toString();
      const res = await fetch(`/api/storage/sign?${q}`);
      const j = await res.json();
      if (res.ok && j?.fileUrl) {
        setResolved(j.fileUrl);
      } else {
        // As last resort, try the redirect approach
        setResolved(`/api/storage/sign?url=${encodeURIComponent(src)}&as=redirect`);
      }
    } catch {
      // Final fallback: use redirect approach
      setResolved(`/api/storage/sign?url=${encodeURIComponent(src)}&as=redirect`);
    }
  };

  // eslint-disable-next-line @next/next/no-img-element
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolved}
      alt={alt}
      className={className || ''}
      onError={handleError}
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
  );
}


