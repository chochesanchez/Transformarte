import React from 'react';
import Image from 'next/image';

// Static content for the page
const content = {
  en: {
    title: "Artwork Catalog",
    subtitle: "Explore our collection of donated artworks",
    filterLabel: "Filter by:",
    categories: {
      all: "All",
      painting: "Painting",
      sculpture: "Sculpture",
      photography: "Photography",
      digital: "Digital Art"
    },
    artworks: [
      {
        id: 1,
        title: "Inner Peace",
        artist: "Maria González",
        medium: "Acrylic on canvas",
        dimensions: "60 x 80 cm",
        category: "painting"
      },
      {
        id: 2,
        title: "Harmony",
        artist: "Carlos Rodríguez",
        medium: "Bronze",
        dimensions: "30 x 20 x 15 cm",
        category: "sculpture"
      },
      {
        id: 3,
        title: "Urban Life",
        artist: "Ana Martínez",
        medium: "Digital photography",
        dimensions: "40 x 60 cm",
        category: "photography"
      },
      {
        id: 4,
        title: "Digital Dreams",
        artist: "Juan Pérez",
        medium: "Digital art",
        dimensions: "N/A",
        category: "digital"
      },
      {
        id: 5,
        title: "Emotions",
        artist: "Laura Sánchez",
        medium: "Oil on canvas",
        dimensions: "100 x 120 cm",
        category: "painting"
      },
      {
        id: 6,
        title: "Reflections",
        artist: "Roberto García",
        medium: "Mixed media",
        dimensions: "50 x 70 cm",
        category: "painting"
      }
    ]
  },
  es: {
    title: "Catálogo de Obras",
    subtitle: "Explora nuestra colección de obras donadas",
    filterLabel: "Filtrar por:",
    categories: {
      all: "Todas",
      painting: "Pintura",
      sculpture: "Escultura",
      photography: "Fotografía",
      digital: "Arte Digital"
    },
    artworks: [
      {
        id: 1,
        title: "Paz Interior",
        artist: "María González",
        medium: "Acrílico sobre lienzo",
        dimensions: "60 x 80 cm",
        category: "painting"
      },
      {
        id: 2,
        title: "Armonía",
        artist: "Carlos Rodríguez",
        medium: "Bronce",
        dimensions: "30 x 20 x 15 cm",
        category: "sculpture"
      },
      {
        id: 3,
        title: "Vida Urbana",
        artist: "Ana Martínez",
        medium: "Fotografía digital",
        dimensions: "40 x 60 cm",
        category: "photography"
      },
      {
        id: 4,
        title: "Sueños Digitales",
        artist: "Juan Pérez",
        medium: "Arte digital",
        dimensions: "N/A",
        category: "digital"
      },
      {
        id: 5,
        title: "Emociones",
        artist: "Laura Sánchez",
        medium: "Óleo sobre lienzo",
        dimensions: "100 x 120 cm",
        category: "painting"
      },
      {
        id: 6,
        title: "Reflexiones",
        artist: "Roberto García",
        medium: "Técnica mixta",
        dimensions: "50 x 70 cm",
        category: "painting"
      }
    ]
  }
};

export default async function CatalogPage({
  params,
}: {
  params: { locale: string }
}) {
  // Await params properly
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const t = content[locale === 'en' ? 'en' : 'es'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
        <h2 className="text-2xl text-secondary mb-6">{t.subtitle}</h2>
        
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-gray-700 font-medium">{t.filterLabel}</span>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-primary text-white rounded-md">
                {t.categories.all}
              </button>
              <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">
                {t.categories.painting}
              </button>
              <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">
                {t.categories.sculpture}
              </button>
              <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">
                {t.categories.photography}
              </button>
              <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">
                {t.categories.digital}
              </button>
            </div>
          </div>
        </div>
        
        {/* Artwork Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.artworks.map((artwork) => (
            <div key={artwork.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <span className="text-gray-500 text-4xl">🖼️</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{artwork.title}</h3>
                <p className="text-gray-600 mb-1">{artwork.artist}</p>
                <p className="text-gray-500 mb-1">{artwork.medium}</p>
                <p className="text-gray-500">{artwork.dimensions}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 