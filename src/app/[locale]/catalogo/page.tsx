import React from 'react';
import Link from 'next/link';
import GalleryClient from './GalleryClient';
import supabase from '@/lib/supabase';

// Avoid pre-rendering this page at build time so the build does not
// contact the database. Always render on the server at request time.
export const dynamic = 'force-dynamic';
export const revalidate = 0;



// Static content for the page
const content = {
  en: {
    title: "Art Gallery",
    subtitle: "Discover artwork from talented artists supporting mental health",
    description: "Each piece tells a story of transformation and resilience",
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
    currency: "MXN",
    year: "Year",
    technique: "Technique",
    dimensions: "Dimensions",
    stats: {
      artworks: "Artworks",
      artists: "Artists",
      cities: "Cities"
    }
  },
  es: {
    title: "Galería de Arte",
    subtitle: "Descubre obras de artistas talentosos que apoyan la salud mental",
    description: "Cada pieza cuenta una historia de transformación y resiliencia",
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
    currency: "MXN",
    year: "Año",
    technique: "Técnica",
    dimensions: "Dimensiones",
    stats: {
      artworks: "Obras",
      artists: "Artistas",
      cities: "Ciudades"
    }
  }
};

// Query runs at request time inside the component to avoid build-time DB access

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const t = content[locale === 'en' ? 'en' : 'es'];
  let donations: any[] = [];
  try {
    const { data } = await supabase
      .from('artworks')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });
    donations = data || [];
  } catch (e) {
    console.error('Catalog DB error', e);
  }

  // If bucket is private, create signed URLs server-side for each artwork image
  const BUCKET = process.env.SUPABASE_BUCKET || 'uploads';
  const needsSign = true; // safe: sign regardless; public URLs will still work
  if (needsSign && donations?.length) {
    const signed: any[] = [];
    for (const item of donations) {
      let imageUrl = item.image_url as string | null;
      if (imageUrl) {
        try {
          const parts = new URL(imageUrl);
          const pathParts = parts.pathname.split('/');
          const marker = pathParts.findIndex((p) => p === 'public' || p === 'sign');
          let objectPath = '';
          if (marker !== -1) objectPath = pathParts.slice(marker + 2).join('/');
          if (!objectPath && imageUrl.includes(`/${BUCKET}/`)) {
            objectPath = pathParts.slice(pathParts.indexOf(BUCKET) + 1).join('/');
          }
          if (!objectPath) {
            // assume image_url is an object path already
            objectPath = imageUrl.startsWith(`${BUCKET}/`) ? imageUrl.slice(BUCKET.length + 1) : imageUrl;
          }
          const { data: signedUrl } = await supabase.storage.from(BUCKET).createSignedUrl(objectPath, 60 * 60 * 24);
          if (signedUrl?.signedUrl) imageUrl = signedUrl.signedUrl;
        } catch {}
      }
      signed.push({ ...item, image_url: imageUrl });
    }
    donations = signed;
  }

  // Count unique artists
  const uniqueArtists = new Set(donations.map(d => d.artist_name)).size;

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-white min-h-[45vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 z-0" />
        <div className="absolute inset-0 bg-black/20 z-1" />
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-white font-semibold">🎨 {locale === 'en' ? 'Art Collection' : 'Colección de Arte'}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-md">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-2">
            {t.subtitle}
          </p>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            {t.description}
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 px-4 bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-rose-500">{donations.length}</div>
              <div className="text-gray-600 text-sm">{t.stats.artworks}</div>
            </div>
            <div className="text-center p-4 border-x">
              <div className="text-3xl font-bold text-pink-500">{uniqueArtists}</div>
              <div className="text-gray-600 text-sm">{t.stats.artists}</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-orange-500">8</div>
              <div className="text-gray-600 text-sm">{t.stats.cities}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <GalleryClient donations={donations} t={t} />
          
          {/* CTA Section */}
          {donations.length > 0 && (
            <div className="mt-16 bg-gradient-to-r from-rose-500 to-pink-500 p-10 rounded-3xl text-center shadow-xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                {locale === 'en' ? 'Want to contribute?' : '¿Quieres contribuir?'}
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                {locale === 'en' 
                  ? 'Share your art with the world and support mental health awareness in Mexico.'
                  : 'Comparte tu arte con el mundo y apoya la concientización sobre salud mental en México.'}
              </p>
              <Link 
                href={`/${locale}/donar`}
                className="inline-block bg-white text-rose-600 hover:bg-gray-100 px-10 py-4 rounded-full text-lg font-bold transition-colors shadow-lg"
              >
                {locale === 'en' ? '🎨 Donate Artwork' : '🎨 Donar Obra'}
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
