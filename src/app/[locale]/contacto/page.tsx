"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ConfirmationPopup from '@/components/ConfirmationPopup';
import qrImg from '../../../../spec/IMG_4890.JPG';

// Static content for the page
const content = {
  en: {
    title: "Contact Us",
    description: "Have questions or want to support? You can donate directly using the button below.",
    form: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      button: "Send"
    },
    donations: {
      title: "Donate",
      description: "Your support brings mental health and art programs to youth across Mexico.",
      paypal: "Donate Now",
      bank: {
        title: "Transfer",
        details: `IBC Bank\nAccount Number: 2 11 7 5 5 5 9 9 3\n\nTransformArte / IBC Bank\nClub Rotario Monterrey Metropolitano AC\nIBC Bank / Laredo Texas\nAccount Number: 2 11 7 5 5 5 9 9 3`
      }
    },
    newsletter: {
      title: "Newsletter",
      description: "Subscribe to our newsletter to receive news and exclusive events.",
      placeholder: "Your email",
      button: "Subscribe"
    }
  },
  es: {
    title: "Contáctanos",
    description: "¿Tienes preguntas o quieres apoyar? Puedes donar directamente con el botón de abajo.",
    form: {
      name: "Nombre",
      email: "Correo Electrónico",
      subject: "Asunto",
      message: "Mensaje",
      button: "Enviar"
    },
    donations: {
      title: "Donar",
      description: "Tu apoyo lleva programas de salud mental y arte a jóvenes en México.",
      paypal: "Donar Ahora",
      bank: {
        title: "Transferencia",
        details: `Banco IBC\nNúmero de Cuenta: 2 11 7 5 5 5 9 9 3\n\nTransformArte / Banco IBC\nClub Rotario Monterrey Metropolitano AC\nIBC Bank / Laredo Texas\nNúmero de Cuenta: 2 11 7 5 5 5 9 9 3`
      }
    },
    newsletter: {
      title: "Newsletter",
      description: "Suscríbete a nuestro boletín para recibir novedades y eventos exclusivos.",
      placeholder: "Tu correo electrónico",
      button: "Suscribirme"
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
    <div className="container mx-auto">
      <section className="pt-12 pb-12 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
        <p className="mb-6 text-gray-700">{t.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form className="bg-gray-50 p-6 rounded-lg shadow space-y-4" onSubmit={async (e)=>{
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
              if(res.ok){
                form.reset();
                setPopupKind('contact');
                setIsOpen(true);
              } else {
                setPopupKind('contact');
                setIsOpen(true);
              }
            } catch(err){
              console.error(err);
              setIsOpen(true);
            }
          }}>
            <div>
              <label htmlFor="name" className="block font-semibold mb-1">{t.form.name}</label>
              <input id="name" name="name" autoComplete="name" type="text" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold mb-1">{t.form.email}</label>
              <input id="email" name="email" autoComplete="email" type="email" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label htmlFor="subject" className="block font-semibold mb-1">{t.form.subject}</label>
              <input id="subject" name="subject" autoComplete="on" type="text" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label htmlFor="message" className="block font-semibold mb-1">{t.form.message}</label>
              <textarea id="message" name="message" autoComplete="on" className="w-full border rounded px-3 py-2" rows={5} required />
            </div>
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-full font-semibold w-full">
              {t.form.button}
            </button>
          </form>
          
          <div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-lg shadow mb-6 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">{t.donations.title}</h2>
              <p className="text-blue-100 mb-6">{t.donations.description}</p>
              <div className="flex flex-col items-center gap-3">
                <a 
                  href="https://alwayson.recaudia.com/cmrr/donor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-4 rounded-full text-lg"
                >
                  {locale==='en' ? 'Donate' : 'Donar'}
                </a>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">{t.newsletter.title}</h2>
              <p className="text-gray-700 mb-4">{t.newsletter.description}</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder={t.newsletter.placeholder} 
                  className="border rounded-l px-3 py-2 w-full" 
                />
                <button className="bg-primary text-white px-4 py-2 rounded-r">{t.newsletter.button}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* QR for live events: large and readable */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">
            {locale === 'en' ? 'Donate right now' : 'Dona ahora mismo'}
          </h2>
          <div className="mx-auto max-w-2xl">
            <Image
              src={qrImg}
              alt={locale==='en' ? 'Donation QR code' : 'Código QR para donar'}
              className="w-full h-auto rounded-xl border border-gray-200 shadow"
              priority
            />
          </div>
        </div>
      </section>
      <ConfirmationPopup isOpen={isOpen} onClose={()=>setIsOpen(false)} locale={locale} kind={popupKind} />
    </div>
  );
} 