'use client';

import React, { useState } from 'react';
import ConfirmationPopup from '@/components/ConfirmationPopup';

// Static content for the page
const content = {
  en: {
    title: "Artworks",
    subtitle: "Join the initiative and transform lives through art",
    description: "Your artwork can make a difference in the lives of young people. By donating a piece, you're contributing to mental health awareness and prevention.",
    formTitle: "Donate Your Artwork",
    nameLabel: "Full Name",
    emailLabel: "Email",
    phoneLabel: "Phone",
    artworkTitleLabel: "Artwork Title",
    techniqueLabel: "Technique",
    dimensionsLabel: "Dimensions",
    descriptionLabel: "Description of your artwork",
    imageLabel: "Upload Artwork Image",
    imageHelp: "Upload a high-quality image of your artwork (JPG, PNG)",
    marketPriceLabel: "Market Price (MXN)",
    startingPriceLabel: "Starting Auction Price (MXN)",
    yearLabel: "Year",
    donationPercentageLabel: "Donation Percentage",
    submitButton: "Submit Donation"
  },
  es: {
    title: "Obras",
    subtitle: "Únete a la iniciativa y transforma vidas a través del arte",
    description: "Tu obra puede hacer una diferencia en la vida de los jóvenes. Al donar una pieza, estás contribuyendo a la concientización y prevención de la salud mental.",
    formTitle: "Donar tu Obra",
    nameLabel: "Nombre Completo",
    emailLabel: "Correo Electrónico",
    phoneLabel: "Teléfono",
    artworkTitleLabel: "Título de la Obra",
    techniqueLabel: "Técnica",
    dimensionsLabel: "Dimensiones",
    descriptionLabel: "Descripción de tu obra",
    imageLabel: "Subir Imagen de la Obra",
    imageHelp: "Sube una imagen de alta calidad de tu obra (JPG, PNG)",
    marketPriceLabel: "Precio Comercial (MXN)",
    startingPriceLabel: "Precio de Salida (MXN)",
    yearLabel: "Año",
    donationPercentageLabel: "Porcentaje de Donación",
    submitButton: "Enviar Donación"
  }
};

export default function DonatePage({
  params,
}: {
  params: { locale: string } | Promise<{ locale: string }>
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // Support Next.js 15 async params shape locally
  const [locale, setLocale] = useState<'en'|'es'>('es');
  React.useEffect(() => {
    (async () => {
      try {
        const p: any = params && (params as any).then ? await (params as any) : params;
        const loc = p?.locale === 'en' ? 'en' : 'es';
        setLocale(loc);
      } catch {
        setLocale('es');
      }
    })();
  }, [params]);
  const t = content[locale === 'en' ? 'en' : 'es'];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    // Use native constraint validation to catch invalid email, numbers, etc.
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const formData = new FormData(form);
    // Optional image upload
    let imageUrl: string | undefined = undefined;
    const file = formData.get('image') as File | null;
    if (file && typeof file !== 'string') {
      const upForm = new FormData();
      upForm.append('file', file);
      upForm.append('context', 'artwork');
      try {
        const up = await fetch('/api/upload', { method: 'POST', body: upForm });
        const upJson = await up.json();
        if (up.ok && (upJson.publicUrl || upJson.fileUrl)) imageUrl = (upJson.publicUrl || upJson.fileUrl) as string;
        else {
          alert(`Image upload failed: ${upJson?.error || up.statusText}`);
          return;
        }
      } catch (err:any) {
        alert(`Image upload failed: ${err?.message || 'Network error'}`);
        return;
      }
    }

    const payload: any = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      title: formData.get('title') as string,
      technique: formData.get('technique') as string,
      dimensions: formData.get('dimensions') as string,
      description: formData.get('description') as string,
      year: Number(formData.get('year')) || undefined,
      donationPercentage: Number(formData.get('donationPercentage')) || undefined,
      marketPrice: Number(formData.get('marketPrice')),
      startingPrice: Number(formData.get('startingPrice'))
    };
    if (imageUrl) payload.imageUrl = imageUrl;

    try {
      const res = await fetch('/api/artworks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        form.reset();
        setIsPopupOpen(true);
      } else {
        const j = await res.json().catch(()=>({ error:'Unknown error' }));
        alert(`Failed to submit artwork: ${j?.error || res.statusText}`);
      }
    } catch (error: any) {
      alert(`Failed to submit artwork: ${error?.message || 'Network error'}`);
    }
  };

  // Disable static rendering; we do client-only work here anyway
  // and avoid any accidental build-time fetches
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
        <h2 className="text-2xl text-secondary mb-6">{t.subtitle}</h2>
        <p className="text-lg text-gray-700 mb-8">{t.description}</p>
        
        {/* Donation Form */}
        <div className="bg-white shadow-md rounded-lg p-8 mt-8">
          <h3 className="text-2xl font-semibold mb-6">{t.formTitle}</h3>
          
          <form id="donateArtworkForm" className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-gray-700 mb-2">{t.nameLabel}</label>
                <input id="fullName" name="fullName"
                  type="text"
                  autoComplete="name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">{t.emailLabel}</label>
                <input id="email" name="email"
                  type="email"
                  autoComplete="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">{t.phoneLabel}</label>
                <input id="phone" name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="title" className="block text-gray-700 mb-2">{t.artworkTitleLabel}</label>
                <input id="title" name="title"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="technique" className="block text-gray-700 mb-2">{t.techniqueLabel}</label>
                <select id="technique" name="technique"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="painting">{locale==='en'?'Painting':'Pintura'}</option>
                  <option value="sculpture">{locale==='en'?'Sculpture':'Escultura'}</option>
                  <option value="photography">{locale==='en'?'Photography':'Fotografía'}</option>
                  <option value="digital">{locale==='en'?'Digital Art':'Arte Digital'}</option>
                  <option value="mixed">{locale==='en'?'Mixed Media':'Técnica Mixta'}</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="dimensions" className="block text-gray-700 mb-2">{t.dimensionsLabel}</label>
                <input id="dimensions" name="dimensions"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="year" className="block text-gray-700 mb-2">{t.yearLabel}</label>
                <input id="year" name="year"
                  type="number"
                  min="1000"
                  max="9999"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="marketPrice" className="block text-gray-700 mb-2">{t.marketPriceLabel}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input id="marketPrice" name="marketPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="startingPrice" className="block text-gray-700 mb-2">{t.startingPriceLabel}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input id="startingPrice" name="startingPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="donationPercentage" className="block text-gray-700 mb-2">{t.donationPercentageLabel}</label>
                <input id="donationPercentage" name="donationPercentage"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-gray-700 mb-2">{t.descriptionLabel}</label>
              <textarea id="description" name="description"
                rows={4}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="artImage" className="block text-gray-700 mb-2">{t.imageLabel}</label>
              <p className="text-sm text-gray-500 mb-2">{t.imageHelp}</p>
              <input
                id="artImage"
                type="file"
                name="image"
                accept="image/*"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                onClick={(e)=>{ e.stopPropagation(); }}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors shadow-lg"
              >
                {t.submitButton}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ConfirmationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        locale={locale}
      />
    </div>
  );
} 