import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../globals.css';
import { locales } from '@/i18n';

// Import message files directly
import enMessages from '../../../messages/en.json';
import esMessages from '../../../messages/es.json';

const messages = {
  en: enMessages,
  es: esMessages
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Properly await params object before destructuring
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  
  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  // Use the pre-imported messages instead of dynamic loading
  const localeMessages = locale === 'en' ? messages.en : messages.es;

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans bg-white`}>
        <NextIntlClientProvider locale={locale} messages={localeMessages}>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 