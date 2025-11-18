"use client";
import React from 'react';
import SignedImg from '@/components/SignedImg';
import Lightbox from './Lightbox';

export default function GalleryClient({
  donations,
  t,
}: {
  donations: any[];
  t: any;
}) {
  const [items, setItems] = React.useState<any[]>(donations || []);
  const [search, setSearch] = React.useState('');
  const [tech, setTech] = React.useState('');
  const [min, setMin] = React.useState<string>('');
  const [max, setMax] = React.useState<string>('');
  const [sort, setSort] = React.useState('newest');
  const [selected, setSelected] = React.useState<any | null>(null);

  const apply = () => {
    let filtered = [...(donations || [])];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((d) =>
        String(d.title || '').toLowerCase().includes(q) ||
        String(d.artist_name || d.artistName || '').toLowerCase().includes(q)
      );
    }
    if (tech) {
      filtered = filtered.filter((d) => String(d.technique || '').toLowerCase() === tech);
    }
    const minV = Number(min || '');
    const maxV = Number(max || '');
    if (!Number.isNaN(minV)) {
      filtered = filtered.filter((d) => Number(d.market_price ?? d.marketPrice ?? 0) >= minV);
    }
    if (!Number.isNaN(maxV) && max !== '') {
      filtered = filtered.filter((d) => Number(d.market_price ?? d.marketPrice ?? 0) <= maxV);
    }
    if (sort === 'priceAsc') filtered.sort((a,b)=> (Number(a.market_price ?? a.marketPrice ?? 0) - Number(b.market_price ?? b.marketPrice ?? 0)));
    if (sort === 'priceDesc') filtered.sort((a,b)=> (Number(b.market_price ?? b.marketPrice ?? 0) - Number(a.market_price ?? a.marketPrice ?? 0)));
    if (sort === 'nameAsc') filtered.sort((a,b)=> String(a.title||'').localeCompare(String(b.title||'')));
    if (sort === 'newest') filtered.sort((a,b)=> new Date(b.created_at||0).getTime() - new Date(a.created_at||0).getTime());
    setItems(filtered);
  };

  const clear = () => {
    setSearch(''); setTech(''); setMin(''); setMax(''); setSort('newest'); setItems(donations||[]);
  };

  return (
    <div>
      {/* Lightbox */}
      {selected && (
        <Lightbox src={selected.image_url} alt={selected.title} onClose={()=>setSelected(null)} />
      )}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-6">{t.filters.title}</h3>
        <div className="mb-6">
          <input type="text" placeholder={t.filters.search} value={search} onChange={(e)=>setSearch(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-2">
            <label className="block font-medium">{t.filters.priceRange.title}</label>
            <div className="flex gap-2">
              <input type="number" placeholder={t.filters.priceRange.min} value={min} onChange={(e)=>setMin(e.target.value)} className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="number" placeholder={t.filters.priceRange.max} value={max} onChange={(e)=>setMax(e.target.value)} className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-2">{t.filters.technique.title}</label>
            <select value={tech} onChange={(e)=>setTech(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">{t.filters.technique.all}</option>
              <option value="painting">{t.filters.technique.painting}</option>
              <option value="sculpture">{t.filters.technique.sculpture}</option>
              <option value="photography">{t.filters.technique.photography}</option>
              <option value="digital">{t.filters.technique.digital}</option>
              <option value="mixed">{t.filters.technique.mixed}</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">{t.filters.sort.title}</label>
            <select value={sort} onChange={(e)=>setSort(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="newest">{t.filters.sort.options.newest}</option>
              <option value="priceAsc">{t.filters.sort.options.priceAsc}</option>
              <option value="priceDesc">{t.filters.sort.options.priceDesc}</option>
              <option value="nameAsc">{t.filters.sort.options.nameAsc}</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={clear} className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">{t.filters.clear}</button>
          <button onClick={apply} className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 font-medium">{t.filters.apply}</button>
        </div>
      </div>

      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((artwork) => (
            <div key={artwork.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 flex items-center justify-center bg-gray-50">
                {artwork.image_url ? (
                  <button onClick={()=>setSelected(artwork)} className="block w-full h-full" aria-label="Open image">
                    <SignedImg src={artwork.image_url} alt={artwork.title} className="w-full h-full object-contain" />
                  </button>
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{artwork.title}</h3>
                <p className="text-lg text-gray-700 font-medium mb-3">{artwork.artist_name || artwork.artistName}</p>
                
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">{t.technique || 'Technique'}:</span>
                    <p className="text-gray-800 capitalize">{artwork.technique || '-'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">{t.dimensions || 'Dimensions'}:</span>
                    <p className="text-gray-800">{artwork.dimensions || '-'}</p>
                  </div>
                  {artwork.year && (
                    <div className="col-span-2">
                      <span className="text-gray-500">{t.year || 'Year'}:</span>
                      <p className="text-gray-800">{artwork.year}</p>
                    </div>
                  )}
                </div>

                <div className="border-t pt-3 mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">{t.marketPrice}:</span>
                    <span className="text-lg font-semibold text-primary">${artwork.market_price ?? artwork.marketPrice} {t.currency}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t.startingPrice}:</span>
                    <span className="text-lg font-semibold text-green-600">${artwork.starting_price ?? artwork.startingPrice} {t.currency}</span>
                  </div>
                </div>

                {artwork.description && (
                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-600 italic">{artwork.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12"><p className="text-gray-500 text-lg">{t.noDonations}</p></div>
      )}
    </div>
  );
}


