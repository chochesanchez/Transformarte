'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const isAuth = /\/(en|es)\/auth(\/)?$/.test(pathname);

  if (isAuth) {
    return (
      <>
        <main className="min-h-screen pt-0">{children}</main>
        <Toaster position="top-center" />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
      <Toaster position="top-center" />
    </>
  );
}


