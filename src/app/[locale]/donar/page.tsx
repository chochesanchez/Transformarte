'use client';

import React, { useState, useRef, useEffect } from 'react';
import ConfirmationPopup from '@/components/ConfirmationPopup';

// Static content for the page (bilingual)
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
    techniqueLabel: "Technique / Materials",
    dimensionsLabel: "Measurements",
    descriptionLabel: "Description of your artwork",
    imageLabel: "Upload Artwork Image",
    imageHelp: "Upload a high-quality image of your artwork (JPG, PNG)",
    marketPriceLabel: "Market Price (MXN)",
    startingPriceLabel: "Starting Auction Price (MXN)",
    yearLabel: "Year",
    donationPercentageLabel: "Donation Percentage",
    submitButton: "Submit Donation",
    // Delivery date
    deliveryDateLabel: "Delivery Date",
    deliveryDateHelp: "Expected date to deliver the artwork",
    // New social media fields
    socialMediaTitle: "Social Media (Optional)",
    instagramLabel: "Instagram Profile URL",
    facebookLabel: "Facebook Profile URL",
    linkedinLabel: "LinkedIn Profile URL",
    websiteLabel: "Personal Website URL",
    // New checkbox groups
    checkboxesTitle: "Documentation Status",
    semblanzaLabel: "Artist Bio/Background Provided",
    certificadoLabel: "Certificate of Authenticity Provided",
    obraFirmadaLabel: "The Artwork is Signed",
    yes: "Yes",
    no: "No",
    required: "(Required)",
    // Conditions
    conditionsTitle: "Terms & Conditions",
    conditions: [
      "The organization will ensure the care of the artwork while it is in custody.",
      "The organization is not responsible for losses, damages, or accidents during reception, exhibition, or return.",
      "The selection of the artwork will depend on compliance with the fundamental ethical values established in the call.",
      "By signing this form, I grant my permission to reproduce the image of my artwork. I also give my consent to TransformArte to collect and use my personal data."
    ],
    // Signature
    signatureLabel: "Participant's Signature",
    signaturePlaceholder: "Sign here",
    clearSignature: "Clear",
    signatureRequired: "Signature is required"
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
    techniqueLabel: "Técnica / Materiales",
    dimensionsLabel: "Medidas",
    descriptionLabel: "Descripción de tu obra",
    imageLabel: "Subir Imagen de la Obra",
    imageHelp: "Sube una imagen de alta calidad de tu obra (JPG, PNG)",
    marketPriceLabel: "Precio Comercial (MXN)",
    startingPriceLabel: "Precio de Salida (MXN)",
    yearLabel: "Año",
    donationPercentageLabel: "Porcentaje de Donación",
    submitButton: "Enviar Donación",
    // Delivery date
    deliveryDateLabel: "Fecha de entrega",
    deliveryDateHelp: "Fecha esperada para entregar la obra",
    // New social media fields
    socialMediaTitle: "Redes Sociales (Opcional)",
    instagramLabel: "Link a usuario de Instagram",
    facebookLabel: "Link a usuario de Facebook",
    linkedinLabel: "Link a usuario de LinkedIn",
    websiteLabel: "Link a página web",
    // New checkbox groups
    checkboxesTitle: "Estado de Documentación",
    semblanzaLabel: "Semblanza entregada",
    certificadoLabel: "Certificado de autenticidad",
    obraFirmadaLabel: "La obra está firmada",
    yes: "Sí",
    no: "No",
    required: "(Requerido)",
    // Conditions
    conditionsTitle: "Condiciones",
    conditions: [
      "La organización velará por el cuidado de la obra mientras esté bajo su resguardo.",
      "La organización no se hace responsable por pérdidas, daños o accidentes durante la recepción, exhibición o devolución.",
      "La selección de la obra dependerá del cumplimiento de los valores éticos fundamentales establecidos en la convocatoria.",
      "Al firmar este formato, otorgo mi permiso para reproducir la imagen de mi obra. Así mismo, doy mi consentimiento a TransformArte para recopilar y utilizar mis datos personales."
    ],
    // Signature
    signatureLabel: "Firma del participante",
    signaturePlaceholder: "Firme aquí",
    clearSignature: "Limpiar",
    signatureRequired: "La firma es requerida"
  }
};

// Signature Canvas Component
function SignatureCanvas({ 
  onSignatureChange, 
  clearTrigger,
  placeholder 
}: { 
  onSignatureChange: (dataUrl: string | null) => void;
  clearTrigger: number;
  placeholder: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set up canvas
    ctx.strokeStyle = '#1E40AF';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  // Clear canvas when clearTrigger changes
  useEffect(() => {
    if (clearTrigger > 0) {
      clearCanvas();
    }
  }, [clearTrigger]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (hasSignature && canvasRef.current) {
      onSignatureChange(canvasRef.current.toDataURL('image/png'));
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onSignatureChange(null);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={500}
        height={150}
        className="w-full h-36 border-2 border-dashed border-gray-300 rounded-lg bg-white cursor-crosshair touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      {!hasSignature && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400">
          {placeholder}
        </div>
      )}
    </div>
  );
}

// Radio Button Group Component
function RadioButtonGroup({
  name,
  label,
  value,
  onChange,
  yesLabel,
  noLabel,
  required
}: {
  name: string;
  label: string;
  value: boolean | null;
  onChange: (val: boolean) => void;
  yesLabel: string;
  noLabel: string;
  required?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-gray-700 font-medium">
        {label} {required && <span className="text-red-500 text-sm">{required}</span>}
      </label>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value="yes"
            checked={value === true}
            onChange={() => onChange(true)}
            className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
            required
          />
          <span className="text-gray-700">{yesLabel}</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value="no"
            checked={value === false}
            onChange={() => onChange(false)}
            className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
          />
          <span className="text-gray-700">{noLabel}</span>
        </label>
      </div>
    </div>
  );
}

export default function DonatePage({
  params,
}: {
  params: { locale: string } | Promise<{ locale: string }>
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [locale, setLocale] = useState<'en'|'es'>('es');
  
  // New state for checkbox groups
  const [semblanzaEntregada, setSemblanzaEntregada] = useState<boolean | null>(null);
  const [certificadoAutenticidad, setCertificadoAutenticidad] = useState<boolean | null>(null);
  const [obraFirmada, setObraFirmada] = useState<boolean | null>(null);
  
  // State for signature
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [clearSignatureTrigger, setClearSignatureTrigger] = useState(0);
  const [signatureError, setSignatureError] = useState(false);

  useEffect(() => {
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
    
    // Check native form validation
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Validate checkbox groups
    if (semblanzaEntregada === null || certificadoAutenticidad === null || obraFirmada === null) {
      alert(locale === 'en' 
        ? 'Please complete all required checkbox fields.' 
        : 'Por favor complete todos los campos de casilla requeridos.');
      return;
    }

    // Validate signature
    if (!signatureData) {
      setSignatureError(true);
      alert(t.signatureRequired);
      return;
    }
    setSignatureError(false);

    const formData = new FormData(form);
    
    // Optional image upload
    let imageUrl: string | undefined = undefined;
    const file = formData.get('image') as File | null;
    if (file && typeof file !== 'string' && file.size > 0) {
      const upForm = new FormData();
      upForm.append('file', file);
      upForm.append('context', 'artwork');
      try {
        const up = await fetch('/api/upload', { method: 'POST', body: upForm });
        const upJson = await up.json();
        if (up.ok && (upJson.publicUrl || upJson.fileUrl)) {
          imageUrl = (upJson.publicUrl || upJson.fileUrl) as string;
        } else {
          alert(`Image upload failed: ${upJson?.error || up.statusText}`);
          return;
        }
      } catch (err: any) {
        alert(`Image upload failed: ${err?.message || 'Network error'}`);
        return;
      }
    }

    // Upload signature as image
    let signatureUrl: string | undefined = undefined;
    if (signatureData) {
      try {
        // Convert base64 to blob
        const response = await fetch(signatureData);
        const blob = await response.blob();
        const signatureFile = new File([blob], 'signature.png', { type: 'image/png' });
        
        const sigForm = new FormData();
        sigForm.append('file', signatureFile);
        sigForm.append('context', 'signature');
        
        const sigUp = await fetch('/api/upload', { method: 'POST', body: sigForm });
        const sigJson = await sigUp.json();
        if (sigUp.ok && (sigJson.publicUrl || sigJson.fileUrl)) {
          signatureUrl = (sigJson.publicUrl || sigJson.fileUrl) as string;
        } else {
          // If upload fails, store base64 directly (fallback)
          signatureUrl = signatureData;
        }
      } catch {
        // Fallback to base64
        signatureUrl = signatureData;
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
      startingPrice: Number(formData.get('startingPrice')),
      // Delivery date
      deliveryDate: formData.get('deliveryDate') as string || undefined,
      // Social media fields
      instagramUrl: formData.get('instagramUrl') as string || undefined,
      facebookUrl: formData.get('facebookUrl') as string || undefined,
      linkedinUrl: formData.get('linkedinUrl') as string || undefined,
      websiteUrl: formData.get('websiteUrl') as string || undefined,
      // Checkbox fields
      semblanzaEntregada,
      certificadoAutenticidad,
      obraFirmada,
      // Signature
      signatureUrl
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
        // Reset state
        setSemblanzaEntregada(null);
        setCertificadoAutenticidad(null);
        setObraFirmada(null);
        setSignatureData(null);
        setClearSignatureTrigger(prev => prev + 1);
        setIsPopupOpen(true);
      } else {
        const j = await res.json().catch(() => ({ error: 'Unknown error' }));
        alert(`Failed to submit artwork: ${j?.error || res.statusText}`);
      }
    } catch (error: any) {
      alert(`Failed to submit artwork: ${error?.message || 'Network error'}`);
    }
  };
  
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
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-gray-700 mb-2">{t.nameLabel}</label>
                <input 
                  id="fullName" 
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">{t.emailLabel}</label>
                <input 
                  id="email" 
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">{t.phoneLabel}</label>
                <input 
                  id="phone" 
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="title" className="block text-gray-700 mb-2">{t.artworkTitleLabel}</label>
                <input 
                  id="title" 
                  name="title"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              {/* Técnica / Materiales - Changed from select to text input */}
              <div>
                <label htmlFor="technique" className="block text-gray-700 mb-2">{t.techniqueLabel}</label>
                <input 
                  id="technique" 
                  name="technique"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              {/* Medidas (formerly Dimensiones) */}
              <div>
                <label htmlFor="dimensions" className="block text-gray-700 mb-2">{t.dimensionsLabel}</label>
                <input 
                  id="dimensions" 
                  name="dimensions"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="year" className="block text-gray-700 mb-2">{t.yearLabel}</label>
                <input 
                  id="year" 
                  name="year"
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
                  <input 
                    id="marketPrice" 
                    name="marketPrice"
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
                  <input 
                    id="startingPrice" 
                    name="startingPrice"
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
                <input 
                  id="donationPercentage" 
                  name="donationPercentage"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-gray-700 mb-2">{t.descriptionLabel}</label>
              <textarea 
                id="description" 
                name="description"
                rows={4}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              ></textarea>
            </div>

            {/* Delivery Date */}
            <div>
              <label htmlFor="deliveryDate" className="block text-gray-700 mb-2">{t.deliveryDateLabel}</label>
              <p className="text-sm text-gray-500 mb-2">{t.deliveryDateHelp}</p>
              <input 
                id="deliveryDate" 
                name="deliveryDate"
                type="date"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Image Upload */}
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
            
            {/* Social Media Section (Optional) */}
            <div className="border-t pt-6 mt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{t.socialMediaTitle}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="instagramUrl" className="block text-gray-700 mb-2">{t.instagramLabel}</label>
                  <input 
                    id="instagramUrl" 
                    name="instagramUrl"
                    type="url"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="facebookUrl" className="block text-gray-700 mb-2">{t.facebookLabel}</label>
                  <input 
                    id="facebookUrl" 
                    name="facebookUrl"
                    type="url"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="linkedinUrl" className="block text-gray-700 mb-2">{t.linkedinLabel}</label>
                  <input 
                    id="linkedinUrl" 
                    name="linkedinUrl"
                    type="url"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="websiteUrl" className="block text-gray-700 mb-2">{t.websiteLabel}</label>
                  <input 
                    id="websiteUrl" 
                    name="websiteUrl"
                    type="url"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Documentation Status (Required Checkbox Groups) */}
            <div className="border-t pt-6 mt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{t.checkboxesTitle}</h4>
              <div className="space-y-4">
                <RadioButtonGroup
                  name="semblanzaEntregada"
                  label={t.semblanzaLabel}
                  value={semblanzaEntregada}
                  onChange={setSemblanzaEntregada}
                  yesLabel={t.yes}
                  noLabel={t.no}
                  required={t.required}
                />
                
                <RadioButtonGroup
                  name="certificadoAutenticidad"
                  label={t.certificadoLabel}
                  value={certificadoAutenticidad}
                  onChange={setCertificadoAutenticidad}
                  yesLabel={t.yes}
                  noLabel={t.no}
                  required={t.required}
                />
                
                <RadioButtonGroup
                  name="obraFirmada"
                  label={t.obraFirmadaLabel}
                  value={obraFirmada}
                  onChange={setObraFirmada}
                  yesLabel={t.yes}
                  noLabel={t.no}
                  required={t.required}
                />
              </div>
            </div>

            {/* Conditions Section */}
            <div className="border-t pt-6 mt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{t.conditionsTitle}</h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  {t.conditions.map((condition, index) => (
                    <li key={index} className="leading-relaxed">{condition}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Signature Section */}
            <div className="border-t pt-6 mt-6">
              <label className="block text-gray-700 font-medium mb-2">
                {t.signatureLabel} <span className="text-red-500 text-sm">{t.required}</span>
              </label>
              <div className={`rounded-lg ${signatureError ? 'ring-2 ring-red-500' : ''}`}>
                <SignatureCanvas
                  onSignatureChange={(data) => {
                    setSignatureData(data);
                    if (data) setSignatureError(false);
                  }}
                  clearTrigger={clearSignatureTrigger}
                  placeholder={t.signaturePlaceholder}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setClearSignatureTrigger(prev => prev + 1);
                    setSignatureData(null);
                  }}
                  className="text-sm text-gray-600 hover:text-primary underline"
                >
                  {t.clearSignature}
                </button>
                {signatureError && (
                  <span className="text-sm text-red-500">{t.signatureRequired}</span>
                )}
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                onClick={(e) => { e.stopPropagation(); }}
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
