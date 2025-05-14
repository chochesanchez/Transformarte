import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import './globals.css';

export const metadata: Metadata = {
  title: 'TransformArte - Donde la Salud Mental y el Arte se Encuentran',
  description: 'Iniciativa del Rotary Distrito 4130 que fusiona el poder del arte con la prevención de la salud mental en jóvenes.',
};

// Redirect to the default locale's layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout only serves as a redirection point to the locale-specific layout
  // The actual layout rendering is handled in [locale]/layout.tsx
  return <>{children}</>;
} 