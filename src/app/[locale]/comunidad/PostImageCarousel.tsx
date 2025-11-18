"use client";
import React from 'react';
import SignedImg from '@/components/SignedImg';

export default function PostImageCarousel({ raw, title }: { raw: string; title: string }) {
  let images: string[] = [];
  try {
    const parsed = JSON.parse(raw);
    images = Array.isArray(parsed) ? parsed : [String(parsed)];
  } catch {
    images = [raw];
  }
  const [index, setIndex] = React.useState(0);
  const [resolved, setResolved] = React.useState<{ [src: string]: string }>({});
  const current = images[Math.min(index, images.length - 1)];

  // If an image fails to load (likely expired signed URL or private bucket),
  // fetch a fresh signed URL from the server using the storage sign endpoint.
  const handleError = async (badSrc: string) => {
    try {
      if (resolved[badSrc]) return; // already attempted
      const q = new URLSearchParams({ url: badSrc }).toString();
      const res = await fetch(`/api/storage/sign?${q}`);
      const j = await res.json();
      if (res.ok && j?.fileUrl) {
        setResolved((prev) => ({ ...prev, [badSrc]: j.fileUrl as string }));
      }
    } catch {}
  };
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const goTo = (i: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const width = scroller.clientWidth;
    scroller.scrollTo({ left: i * width, behavior: 'smooth' });
    setIndex(i);
  };
  const next = () => goTo((index + 1) % images.length);
  const prev = () => goTo((index - 1 + images.length) % images.length);
  const onScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const width = scroller.clientWidth;
    const i = Math.round(scroller.scrollLeft / Math.max(width, 1));
    if (i !== index) setIndex(i);
  };

  if (!images.length) return null;
  return (
    <div className="relative">
      <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '1/1' }}>
        <div
          ref={scrollerRef}
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth"
          onScroll={onScroll}
        >
          {images.map((src, i) => (
            <div key={i} className="w-full h-full flex-shrink-0 snap-center">
              <SignedImg
                src={resolved[src] || src}
                alt={title}
                className="w-full h-full object-cover select-none"
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button aria-label="Prev" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm">‹</button>
            <button aria-label="Next" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm">›</button>
          </>
        )}
      </div>
      {/* Pagination dots removed per request; swipe/scroll only */}
    </div>
  );
}


