'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-background.jpg"
            alt="Mariposas y pinceladas"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            TransformArte: Donde el Arte y la Salud Mental se Encuentran
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Únete a nuestra gira itinerante y transforma vidas con tu creatividad.
          </p>
          <Link 
            href="/donar"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors"
          >
            Dona tu Obra
          </Link>
        </div>
      </section>

      {/* Resumen del Proyecto */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            TransformArte es una iniciativa del Rotary Distrito 4130 que fusiona el poder del arte con la prevención de la salud mental en jóvenes de 15 a 19 años. A través de exposiciones, talleres y subastas en siete ciudades de México, invitamos a artistas y rotarios a donar obras que inspiran diálogo y conciencia.
          </p>
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Próximos Eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Event cards will be mapped here */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Monterrey</h3>
              <p className="text-gray-600 mb-2">12 de julio</p>
              <p className="text-gray-500">Rotary Club Monterrey</p>
            </div>
            {/* Add more event cards as needed */}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Testimonios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <blockquote className="text-lg italic mb-4">
                "Participar en TransformArte me permitió expresar mis emociones y apoyar a mi comunidad."
              </blockquote>
              <p className="font-semibold">— María López, Artista</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <blockquote className="text-lg italic mb-4">
                "Ver a los jóvenes involucrarse me recordó el verdadero impacto del servicio rotario."
              </blockquote>
              <p className="font-semibold">— Luis García, Rotary Club Monterrey</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
