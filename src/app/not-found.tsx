import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-4">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          href="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors inline-block"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
} 