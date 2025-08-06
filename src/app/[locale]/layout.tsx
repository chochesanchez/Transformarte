import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import { locales, type Locale } from '@/i18n';

// Import message files directly
import enMessages from '../../../messages/en.json';
import esMessages from '../../../messages/es.json';

const messages = {
  en: enMessages,
  es: esMessages
} as const;

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = params.locale;
  
  return {
    metadataBase: new URL('https://transform-arte.com.mx'),
    title: {
      template: '%s | TransformArte',
      default: locale === 'en' 
        ? 'TransformArte: Where Art and Mental Health Meet'
        : 'TransformArte: Donde el Arte y la Salud Mental se Encuentran'
    },
    description: locale === 'en' 
      ? 'TransformArte is an initiative by Rotary District 4130 that combines art with mental health awareness for young people.'
      : 'TransformArte es una iniciativa del Rotary Distrito 4130 que fusiona el arte con la prevención de la salud mental en jóvenes.',
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-icon.png',
    },
    openGraph: {
      title: 'TransformArte',
      description: locale === 'en'
        ? 'Where Art and Mental Health Meet'
        : 'Donde el Arte y la Salud Mental se Encuentran',
      url: 'https://transform-arte.com.mx',
      siteName: 'TransformArte',
      locale: locale,
      type: 'website',
      images: ['/logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'TransformArte',
      description: locale === 'en'
        ? 'Where Art and Mental Health Meet'
        : 'Donde el Arte y la Salud Mental se Encuentran',
      images: ['/logo.png'],
    },
    verification: {
      google: 'google-site-verification-code',
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  // Use the pre-imported messages
  const localeMessages = messages[locale];

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className={`${inter.variable} font-sans bg-white`}>
        <NextIntlClientProvider locale={locale} messages={localeMessages}>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 