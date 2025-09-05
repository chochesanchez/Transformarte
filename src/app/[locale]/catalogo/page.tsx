import React from 'react';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { Artwork } from '@prisma/client';

// Avoid pre-rendering this page at build time so the build does not
// contact the database. Always render on the server at request time.
export const dynamic = 'force-dynamic';
export const revalidate = 0;



// Static content for the page
const content = {
  en: {
    title: "Artwork Catalog",
    subtitle: "Explore our collection of donated artworks",
    filters: {
      title: "Filters",
      search: "Search by title or artist",
      priceRange: {
        title: "Price Range",
        min: "Min Price",
        max: "Max Price"
      },
      technique: {
        title: "Technique",
        all: "All Techniques",
      painting: "Painting",
      sculpture: "Sculpture",
      photography: "Photography",
        digital: "Digital Art",
        mixed: "Mixed Media"
      },
      sort: {
        title: "Sort by",
        options: {
          newest: "Newest First",
          priceAsc: "Price: Low to High",
          priceDesc: "Price: High to Low",
          nameAsc: "Name: A to Z"
        }
      },
      apply: "Apply Filters",
      clear: "Clear Filters"
    },
    noDonations: "No artworks have been donated yet. Be the first to contribute!",
    marketPrice: "Market Price",
    startingPrice: "Starting Price",
    currency: "MXN"
  },
  es: {
    title: "Catálogo de Obras",
    subtitle: "Explora nuestra colección de obras donadas",
    filters: {
      title: "Filtros",
      search: "Buscar por título o artista",
      priceRange: {
        title: "Rango de Precio",
        min: "Precio Mínimo",
        max: "Precio Máximo"
      },
      technique: {
        title: "Técnica",
        all: "Todas las Técnicas",
      painting: "Pintura",
      sculpture: "Escultura",
      photography: "Fotografía",
        digital: "Arte Digital",
        mixed: "Técnica Mixta"
      },
      sort: {
        title: "Ordenar por",
        options: {
          newest: "Más Recientes",
          priceAsc: "Precio: Menor a Mayor",
          priceDesc: "Precio: Mayor a Menor",
          nameAsc: "Nombre: A a Z"
        }
      },
      apply: "Aplicar Filtros",
      clear: "Limpiar Filtros"
    },
    noDonations: "Aún no hay obras donadas. ¡Sé el primero en contribuir!",
    marketPrice: "Precio Comercial",
    startingPrice: "Precio de Salida",
    currency: "MXN"
  }
};

// Fetch artworks from the database
const donations: Artwork[] = await prisma.artwork.findMany({
  where: { status: { in: ['pending', 'approved'] } },
  orderBy: { createdAt: 'desc' }
});

export default async function CatalogPage({
  params,
}: {
  params: { locale: string }
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const t = content[locale === 'en' ? 'en' : 'es'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
        <h2 className="text-2xl text-secondary mb-6">{t.subtitle}</h2>
        
        {/* Advanced Filters */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6">{t.filters.title}</h3>
          
          {/* Search Bar - Full Width */}
          <div className="mb-6">
            <input
              type="text"
              placeholder={t.filters.search}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Price Range */}
            <div className="space-y-2">
              <label className="block font-medium">{t.filters.priceRange.title}</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={t.filters.priceRange.min}
                  className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="number"
                  placeholder={t.filters.priceRange.max}
                  className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Technique */}
            <div>
              <label className="block font-medium mb-2">{t.filters.technique.title}</label>
              <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">{t.filters.technique.all}</option>
                <option value="painting">{t.filters.technique.painting}</option>
                <option value="sculpture">{t.filters.technique.sculpture}</option>
                <option value="photography">{t.filters.technique.photography}</option>
                <option value="digital">{t.filters.technique.digital}</option>
                <option value="mixed">{t.filters.technique.mixed}</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block font-medium mb-2">{t.filters.sort.title}</label>
              <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="newest">{t.filters.sort.options.newest}</option>
                <option value="priceAsc">{t.filters.sort.options.priceAsc}</option>
                <option value="priceDesc">{t.filters.sort.options.priceDesc}</option>
                <option value="nameAsc">{t.filters.sort.options.nameAsc}</option>
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-end gap-4">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">
              {t.filters.clear}
            </button>
            <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 font-medium">
              {t.filters.apply}
            </button>
          </div>
        </div>
        
        {/* Artwork Grid */}
        {donations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {donations.map((artwork) => (
              <div key={artwork.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{artwork.title}</h3>
                  <p className="text-gray-600 mb-1">{artwork.artistName}</p>
                  <p className="text-gray-500 mb-1">{artwork.technique}</p>
                  <p className="text-gray-500 mb-3">{artwork.dimensions}</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">{t.marketPrice}:</span> ${artwork.marketPrice} {t.currency}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">{t.startingPrice}:</span> ${artwork.startingPrice} {t.currency}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t.noDonations}</p>
          </div>
        )}
      </div>
    </div>
  );
} 