'use client';

import React from 'react';

interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

const content = {
  en: {
    title: "Artwork submitted!",
    message: "Your artwork will be reviewed for admission. Thank you for supporting TransformArte.",
    button: "Close"
  },
  es: {
    title: "¡Obra enviada!",
    message: "Tu obra será revisada para su admisión. Gracias por apoyar a TransformArte.",
    button: "Cerrar"
  }
};

export default function ConfirmationPopup({ isOpen, onClose, locale }: ConfirmationPopupProps) {
  if (!isOpen) return null;

  const t = content[locale === 'en' ? 'en' : 'es'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold text-primary mb-4">{t.title}</h3>
        <p className="text-gray-700 mb-6">{t.message}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-semibold"
          >
            {t.button}
          </button>
        </div>
      </div>
    </div>
  );
} 