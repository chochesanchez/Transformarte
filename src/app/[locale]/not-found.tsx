import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
      <div className="text-center p-8 bg-white shadow-md rounded-lg max-w-lg">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl mb-4">Página no encontrada</h2>
        <p className="mb-8 text-gray-600">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link 
          href="/"
          className="inline-block bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-full text-lg font-semibold transition-colors shadow"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
} 