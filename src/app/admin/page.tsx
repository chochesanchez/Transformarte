import React from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';

const content = {
  title: "Panel de Administración",
  sections: {
    artworks: {
      title: "Obras Donadas",
      pending: "Pendientes de Aprobación",
      approved: "Aprobadas",
      rejected: "Rechazadas"
    },
    posts: {
      title: "Publicaciones del Foro",
      reported: "Reportadas",
      all: "Todas las Publicaciones"
    },
    users: {
      title: "Usuarios",
      active: "Activos",
      banned: "Bloqueados"
    }
  },
  actions: {
    approve: "Aprobar",
    reject: "Rechazar",
    delete: "Eliminar",
    ban: "Bloquear Usuario",
    unban: "Desbloquear Usuario"
  }
};

export default async function AdminPage() {
  // This will be replaced with actual authentication check
  const isAdmin = false;
  
  if (!isAdmin) {
    redirect('/admin/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{content.title}</h1>

      {/* Artworks Management */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">{content.sections.artworks.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pending Artworks */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-4">{content.sections.artworks.pending}</h3>
            <div className="space-y-4">
              {/* Sample artwork card - will be mapped from database */}
              <div className="border rounded p-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src="/sample-artwork.jpg"
                      alt="Artwork preview"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Título de la Obra</h4>
                    <p className="text-sm text-gray-600">Artista: Nombre del Artista</p>
                    <div className="mt-2 flex gap-2">
                      <button className="px-3 py-1 bg-green-500 text-white rounded text-sm">
                        {content.actions.approve}
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">
                        {content.actions.reject}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forum Posts Management */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">{content.sections.posts.title}</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            {/* Sample post card - will be mapped from database */}
            <div className="border rounded p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Título del Post</h4>
                  <p className="text-sm text-gray-600">Por: Nombre del Usuario</p>
                  <p className="text-sm text-gray-500 mt-2">Contenido del post...</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">
                    {content.actions.delete}
                  </button>
                  <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm">
                    {content.actions.ban}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 