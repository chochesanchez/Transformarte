import React from 'react';
import GalleryClient from './GalleryClient';
import supabase from '@/lib/supabase';

// Avoid pre-rendering this page at build time so the build does not
// contact the database. Always render on the server at request time.
export const dynamic = 'force-dynamic';
export const revalidate = 0;



// Static content for the page
const content = {
  en: {
    title: "Gallery",
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
    currency: "MXN",
    year: "Year",
    technique: "Technique",
    dimensions: "Dimensions"
  },
  es: {
    title: "Galería",
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
    currency: "MXN",
    year: "Año",
    technique: "Técnica",
    dimensions: "Dimensiones"
  }
};

// Query runs at request time inside the component to avoid build-time DB access

export default async function CatalogPage({
  params,
}: {
  params: { locale: string }
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4">{t.title}</h1>
        <h2 className="text-2xl text-secondary mb-6">{t.subtitle}</h2>
        <GalleryClient donations={donations} t={t} />
      </div>
    </div>
  );
} 