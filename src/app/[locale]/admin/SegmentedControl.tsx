"use client";

import React from 'react';

type Segment = { key: string; label: string; badge?: number };

export default function SegmentedControl({
  segments,
  selected,
  onChange,
  className,
  ariaLabel,
}: {
  segments: Segment[];
  selected: string;
  onChange: (key: string) => void;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <div className={`inline-flex rounded-full border border-gray-200 bg-gray-100/80 p-1 shadow-inner ${className||''}`} role="tablist" aria-label={ariaLabel}>
      {segments.map((seg) => {
        const active = selected === seg.key;
        return (
          <button
            key={seg.key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(seg.key)}
            className={`relative whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors min-w-[112px] ${active ? 'bg-white shadow border border-gray-200 text-gray-900' : 'text-gray-700 hover:bg-white/60'}`}
          >
            <span className="inline-flex items-center gap-2 justify-center">
              <span>{seg.label}</span>
              {typeof seg.badge === 'number' && (
                <span className={`text-[11px] leading-4 px-2 py-0.5 rounded-full ${active ? 'bg-gray-100 text-gray-700' : 'bg-gray-200 text-gray-700'}`}>{seg.badge}</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}


