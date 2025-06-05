import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import './globals.css';
import { reportWebVitals as reportMetric } from '../monitoring';

export const metadata: Metadata = {
  metadataBase: new URL('https://transform-arte.com.mx'),
  title: 'TransformArte - Donde la Salud Mental y el Arte se Encuentran',
  description: 'Iniciativa del Rotary Distrito 4130 que fusiona el poder del arte con la prevención de la salud mental en jóvenes.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'TransformArte - Donde la Salud Mental y el Arte se Encuentran',
    description: 'Iniciativa del Rotary Distrito 4130 que fusiona el poder del arte con la prevención de la salud mental en jóvenes.',
    images: ['/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TransformArte - Donde la Salud Mental y el Arte se Encuentran',
    description: 'Iniciativa del Rotary Distrito 4130 que fusiona el poder del arte con la prevención de la salud mental en jóvenes.',
    images: ['/logo.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

// Enable web vitals reporting
export function reportWebVitals(metric: any) {
  reportMetric(metric);
}

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