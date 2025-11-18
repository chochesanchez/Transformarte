"use client";
import React from 'react';

export default function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: ()=>void }){
  const [index, setIndex] = React.useState(0);
  const sources = React.useMemo(() => {
    try {
      const parsed = JSON.parse(src);
      return Array.isArray(parsed) ? parsed : [String(parsed)];
    } catch { return [src]; }
  }, [src]);

  React.useEffect(()=>{
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i)=> (i+1)%sources.length);
      if (e.key === 'ArrowLeft') setIndex((i)=> (i-1+sources.length)%sources.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, sources.length]);

  const touchStartX = React.useRef<number | null>(null);
  const touchDX = React.useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchMove = (e: React.TouchEvent) => { if (touchStartX.current!=null) touchDX.current = e.touches[0].clientX - touchStartX.current; };
  const onTouchEnd = () => {
    if (Math.abs(touchDX.current) > 40) {
      if (touchDX.current < 0) setIndex((i)=> (i+1)%sources.length); else setIndex((i)=> (i-1+sources.length)%sources.length);
    }
    touchStartX.current = null; touchDX.current = 0;
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={onClose}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={sources[index]}
        alt={alt}
        className="max-w-[90vw] max-h-[80vh] object-contain select-none"
        onClick={(e)=>e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
      {sources.length>1 && (
        <>
          <button aria-label="Prev" onClick={(e)=>{e.stopPropagation(); setIndex((i)=> (i-1+sources.length)%sources.length);}} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full h-10 w-10 flex items-center justify-center">‹</button>
          <button aria-label="Next" onClick={(e)=>{e.stopPropagation(); setIndex((i)=> (i+1)%sources.length);}} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full h-10 w-10 flex items-center justify-center">›</button>
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-1">
            {sources.map((_, i)=> (
              <button key={i} onClick={(e)=>{e.stopPropagation(); setIndex(i);}} className={`h-2 w-2 rounded-full ${i===index?'bg-white':'bg-white/50'}`} aria-label={`Go to image ${i+1}`} />
            ))}
          </div>
        </>
      )}
      <button aria-label="Close" onClick={(e)=>{e.stopPropagation(); onClose();}} className="absolute top-4 right-4 text-white text-2xl">×</button>
    </div>
  );
}


