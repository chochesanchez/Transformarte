"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ConfirmationPopup from '@/components/ConfirmationPopup';
import qrImg from '../../../../spec/IMG_4890.JPG';

// Static content for the page
const content = {
  en: {
    title: "Contact Us",
    subtitle: "We'd love to hear from you",
    description: "Have questions or want to support? You can donate directly using the button below.",
    form: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      button: "Send Message"
    },
    donations: {
      title: "Support Our Cause",
      description: "Your support brings mental health and art programs to youth across Mexico.",
      paypal: "Donate Now",
      bank: {
        title: "Transfer",
        details: `IBC Bank\nAccount Number: 2 11 7 5 5 5 9 9 3\n\nTransformArte / IBC Bank\nClub Rotario Monterrey Metropolitano AC\nIBC Bank / Laredo Texas\nAccount Number: 2 11 7 5 5 5 9 9 3`
      }
    },
    newsletter: {
      title: "Stay Connected",
      description: "Subscribe to our newsletter to receive news and exclusive events.",
      placeholder: "Your email",
      button: "Subscribe"
    },
    sponsorship: {
      title: "Sponsorship Inquiries",
      description: "Interested in becoming a TransformArte sponsor? Contact us for partnership opportunities."
    }
  },
  es: {
    title: "Contáctanos",
    subtitle: "Nos encantaría saber de ti",
    description: "¿Tienes preguntas o quieres apoyar? Puedes donar directamente con el botón de abajo.",
    form: {
      name: "Nombre",
      email: "Correo Electrónico",
      subject: "Asunto",
      message: "Mensaje",
      button: "Enviar Mensaje"
    },
    donations: {
      title: "Apoya Nuestra Causa",
      description: "Tu apoyo lleva programas de salud mental y arte a jóvenes en México.",
      paypal: "Donar Ahora",
      bank: {
        title: "Transferencia",
        details: `Banco IBC\nNúmero de Cuenta: 2 11 7 5 5 5 9 9 3\n\nTransformArte / Banco IBC\nClub Rotario Monterrey Metropolitano AC\nIBC Bank / Laredo Texas\nNúmero de Cuenta: 2 11 7 5 5 5 9 9 3`
      }
    },
    newsletter: {
      title: "Mantente Conectado",
      description: "Suscríbete a nuestro boletín para recibir novedades y eventos exclusivos.",
      placeholder: "Tu correo electrónico",
      button: "Suscribirme"
    },
    sponsorship: {
      title: "Patrocinios",
      description: "¿Interesado en convertirte en patrocinador de TransformArte? Contáctanos para oportunidades de alianza."
    }
  }
};

export default function ContactPage() {
  const params = useParams();
  const localeParam = params?.locale as string | undefined;
  const locale = localeParam && (localeParam === 'en' || localeParam === 'es') ? localeParam : 'es';
  const t = content[locale === 'en' ? 'en' : 'es'];
  const [isOpen, setIsOpen] = React.useState(false);
  const [popupKind, setPopupKind] = React.useState<'contact'|'artwork'>('contact');

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-white min-h-[40vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 z-0" />
        <div className="absolute inset-0 bg-black/20 z-1" />
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-white font-semibold">💬 {locale === 'en' ? "Let's Connect" : 'Conectemos'}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-md">
            {t.title}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto">
        <section className="py-16 px-4 max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="bg-teal-100 p-2 rounded-xl">✉️</span>
                {locale === 'en' ? 'Send us a Message' : 'Envíanos un Mensaje'}
              </h2>
              
              <form className="space-y-5" onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const payload = {
                  name: formData.get('name') as string,
                  email: formData.get('email') as string,
                  subject: formData.get('subject') as string,
                  message: formData.get('message') as string
                };

                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                  });
                  if (res.ok) {
                    form.reset();
                    setPopupKind('contact');
                    setIsOpen(true);
                  } else {
                    setPopupKind('contact');
                    setIsOpen(true);
                  }
                } catch (err) {
                  console.error(err);
                  setIsOpen(true);
                }
              }}>
                <div>
                  <label htmlFor="name" className="block font-semibold mb-2 text-gray-700">{t.form.name}</label>
                  <input 
                    id="name" 
                    name="name" 
                    autoComplete="name" 
                    type="text" 
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none text-gray-900 placeholder-gray-400" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-semibold mb-2 text-gray-700">{t.form.email}</label>
                  <input 
                    id="email" 
                    name="email" 
                    autoComplete="email" 
                    type="email" 
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none text-gray-900 placeholder-gray-400" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block font-semibold mb-2 text-gray-700">{t.form.subject}</label>
                  <input 
                    id="subject" 
                    name="subject" 
                    autoComplete="on" 
                    type="text" 
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none text-gray-900 placeholder-gray-400" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block font-semibold mb-2 text-gray-700">{t.form.message}</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    autoComplete="on" 
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none text-gray-900 placeholder-gray-400" 
                    rows={5} 
                    required 
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  {t.form.button}
                </button>
              </form>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              {/* Donation Card */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-xl text-white">
                <div className="text-4xl mb-4">💝</div>
                <h2 className="text-2xl font-bold mb-3">{t.donations.title}</h2>
                <p className="text-white/90 mb-6">{t.donations.description}</p>
                <a 
                  href="https://alwayson.recaudia.com/cmrr/donor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg"
                >
                  {locale === 'en' ? '💝 Donate Now' : '💝 Donar Ahora'}
                </a>
              </div>
              
              {/* Newsletter Card */}
              <div className="bg-gradient-to-br from-gray-50 to-teal-50 p-8 rounded-3xl shadow-lg">
                <div className="text-4xl mb-4">📬</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{t.newsletter.title}</h2>
                <p className="text-gray-600 mb-6">{t.newsletter.description}</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder={t.newsletter.placeholder} 
                    className="flex-1 bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none text-gray-900 placeholder-gray-400" 
                  />
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                    {t.newsletter.button}
                  </button>
                </div>
              </div>
              
              {/* Sponsorship Contact */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-100 p-8 rounded-3xl shadow-lg border-2 border-yellow-200">
                <div className="text-4xl mb-4">💎</div>
                <h2 className="text-2xl font-bold text-amber-800 mb-3">{t.sponsorship.title}</h2>
                <p className="text-gray-700 mb-6">{t.sponsorship.description}</p>
                <div className="space-y-3 bg-white/60 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">👤</span>
                    <span className="font-semibold text-gray-800">Juan Antonio Enciso</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📧</span>
                    <a href="mailto:juan.antonio.enciso@tec.mx" className="text-blue-600 hover:underline font-medium">
                      juan.antonio.enciso@tec.mx
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📞</span>
                    <a href="tel:8183091703" className="text-blue-600 hover:underline font-medium">
                      81 8309 1703
                    </a>
                  </div>
                </div>
                <Link 
                  href={`/${locale}/patrocinadores`}
                  className="inline-flex items-center gap-2 mt-4 text-amber-700 hover:text-amber-900 font-semibold"
                >
                  {locale === 'en' ? 'View sponsorship packages' : 'Ver paquetes de patrocinio'} →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* QR Section */}
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <div className="text-5xl mb-4">📱</div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {locale === 'en' ? 'Scan & Donate' : 'Escanea y Dona'}
                </h2>
                <p className="text-white/90 text-lg mb-6">
                  {locale === 'en' 
                    ? 'Use your phone to scan this QR code and make an instant donation to TransformArte.'
                    : 'Usa tu teléfono para escanear este código QR y hacer una donación instantánea a TransformArte.'}
                </p>
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white text-sm">
                    {locale === 'en' ? '🔒 Secure & Fast' : '🔒 Seguro y Rápido'}
                  </span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-xl">
                <Image
                  src={qrImg}
                  alt={locale === 'en' ? 'Donation QR code' : 'Código QR para donar'}
                  className="w-full h-auto rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <ConfirmationPopup isOpen={isOpen} onClose={() => setIsOpen(false)} locale={locale} kind={popupKind} />
    </>
  );
}
