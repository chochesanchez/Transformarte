import React from 'react';
import Link from 'next/link';

// Static content for the page
const content = {
  en: {
    title: "Contact Us",
    description: "Have questions, suggestions, or want to collaborate? Write to us and we'll respond promptly.",
    form: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      button: "Send"
    },
    donations: {
      title: "Global Donations",
      description: "Support TransformArte with your donation: choose your preferred method and contribute to the wellbeing of young people.",
      paypal: "Donate with PayPal",
      bank: {
        title: "Bank Transfer",
        bank: "Bank: Santander",
        number: "Number: 5471 4601 1157 4997",
        name: "Name: José Manuel Sánchez Aguilar",
        beneficiary: "Beneficiary: TransformArte Foundation"
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
    description: "¿Tienes preguntas, sugerencias o quieres colaborar? Escríbenos y te responderemos a la brevedad.",
    form: {
      name: "Nombre",
      email: "Correo Electrónico",
      subject: "Asunto",
      message: "Mensaje",
      button: "Enviar"
    },
    donations: {
      title: "Donaciones Globales",
      description: "Apoya TransformArte con tu donación: elige tu método preferido y contribuye al bienestar de los jóvenes.",
      paypal: "Donar con PayPal",
      bank: {
        title: "Transferencia Bancaria",
        bank: "Banco: Santander",
        number: "Numero: 5471 4601 1157 4997",
        name: "Nombre: José Manuel Sánchez Aguilar",
        beneficiary: "Beneficiario: Fundación TransformArte A.C."
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

export default async function ContactPage({
  params,
}: {
  params: { locale: string }
}) {
  // Await params properly
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const t = content[locale === 'en' ? 'en' : 'es'];

  return (
    <div className="container mx-auto">
      <section className="pt-12 pb-12 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
        <p className="mb-6 text-gray-700">{t.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form className="bg-gray-50 p-6 rounded-lg shadow space-y-4">
            <div>
              <label className="block font-semibold mb-1">{t.form.name}</label>
              <input type="text" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block font-semibold mb-1">{t.form.email}</label>
              <input type="email" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block font-semibold mb-1">{t.form.subject}</label>
              <input type="text" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block font-semibold mb-1">{t.form.message}</label>
              <textarea className="w-full border rounded px-3 py-2" rows={5} required />
            </div>
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-full font-semibold w-full">
              {t.form.button}
            </button>
          </form>
          
          <div>
            <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
              <h2 className="text-2xl font-semibold mb-4">{t.donations.title}</h2>
              <p className="text-gray-700 mb-4">{t.donations.description}</p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">PayPal</h3>
                  <Link 
                    href="https://www.paypal.com/paypalme/chochesanchez"
                    target="_blank"
                    className="bg-blue-500 text-white px-4 py-2 rounded inline-block hover:bg-blue-600 transition-colors"
                  >
                    {t.donations.paypal}
                  </Link>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t.donations.bank.title}</h3>
                  <p className="text-sm text-gray-600">
                    {t.donations.bank.bank}<br />
                    {t.donations.bank.number}<br />
                    {t.donations.bank.name}<br />
                    {t.donations.bank.beneficiary}
                  </p>
                </div>
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
    </div>
  );
} 