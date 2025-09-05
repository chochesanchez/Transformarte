'use client';

import React, { useState } from 'react';
import ConfirmationPopup from '@/components/ConfirmationPopup';

// Static content for the page
const content = {
  en: {
    title: "Donate Your Artwork",
    subtitle: "Join the initiative and transform lives through art",
    description: "Your artwork can make a difference in the lives of young people. By donating a piece, you're contributing to mental health awareness and prevention.",
    formTitle: "Artwork Donation Form",
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
    submitButton: "Submit Donation"
  },
  es: {
    title: "Dona tu Obra",
    subtitle: "Únete a la iniciativa y transforma vidas a través del arte",
    description: "Tu obra puede hacer una diferencia en la vida de los jóvenes. Al donar una pieza, estás contribuyendo a la concientización y prevención de la salud mental.",
    formTitle: "Formulario de Donación de Obra",
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
    submitButton: "Enviar Donación"
  }
};

export default function DonatePage({
  params,
}: {
  params: { locale: string }
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const locale = params.locale || 'es';
  const t = content[locale === 'en' ? 'en' : 'es'];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      title: formData.get('title') as string,
      technique: formData.get('technique') as string,
      dimensions: formData.get('dimensions') as string,
      description: formData.get('description') as string,
      marketPrice: Number(formData.get('marketPrice')),
      startingPrice: Number(formData.get('startingPrice'))
    };

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
        const { error } = await res.json().catch(() => ({ error: 'Unknown error' }));
        alert(error || 'Error submitting artwork');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting artwork');
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
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">{t.nameLabel}</label>
                <input name="fullName"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">{t.emailLabel}</label>
                <input name="email"
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">{t.phoneLabel}</label>
                <input name="phone"
                  type="tel"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">{t.artworkTitleLabel}</label>
                <input name="title"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">{t.techniqueLabel}</label>
                <input name="technique"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">{t.dimensionsLabel}</label>
                <input name="dimensions"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">{t.marketPriceLabel}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input name="marketPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">{t.startingPriceLabel}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input name="startingPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">{t.descriptionLabel}</label>
              <textarea name="description"
                rows={4}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">{t.imageLabel}</label>
              <p className="text-sm text-gray-500 mb-2">{t.imageHelp}</p>
              <input
                type="file"
                accept="image/jpeg,image/png"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
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