"use client";
import React from 'react';

export default function AdminKebabMenu({ children }: { children: React.ReactNode }){
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen((v)=>!v);
  return (
    <div className="relative inline-block text-left">
      <button aria-label="More" onClick={toggle} className="h-8 w-8 rounded hover:bg-gray-100 flex items-center justify-center">
        <span className="inline-block w-1 h-1 bg-gray-600 rounded-full" />
        <span className="inline-block w-1 h-1 bg-gray-600 rounded-full mx-0.5" />
        <span className="inline-block w-1 h-1 bg-gray-600 rounded-full" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-20" onMouseLeave={()=>setOpen(false)}>
          {children}
        </div>
      )}
    </div>
  );
}


