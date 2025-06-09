import React from 'react';
import Link from 'next/link';

// Event type definition
interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  club: string;
}

// Events data
const events: Event[] = [
  {
    id: 'monterrey',
    title: 'Noche Rotaria TransformArte Monterrey',
    date: '16 de julio, 2026',
    location: 'Monterrey',
    description: 'Noche Rotaria TransformArte presentada por Club Rotario Monterrey Metropolitano y Club Rotario Regiomontano Valle Oriente.',
    club: 'Club Rotario Monterrey Metropolitano y Club Rotario Regiomontano Valle Oriente'
  },
  {
    id: 'san-luis',
    title: 'Noche Rotaria TransformArte San Luis Potosí',
    date: '06 de agosto, 2026',
    location: 'San Luis Potosí',
    description: 'Noche Rotaria TransformArte presentada por Club Rotario San Luis Empresarial.',
    club: 'Club Rotario San Luis Empresarial'
  },
  {
    id: 'nuevo-laredo',
    title: 'Noche Rotaria TransformArte Nuevo Laredo',
    date: '27 de agosto, 2026',
    location: 'Nuevo Laredo',
    description: 'Noche Rotaria TransformArte presentada por Club Rotario Villa de Nuevo Laredo.',
    club: 'Club Rotario Villa de Nuevo Laredo'
  },
  {
    id: 'reynosa',
    title: 'Noche Rotaria TransformArte Reynosa',
    date: '24 de septiembre, 2026',
    location: 'Reynosa',
    description: 'Noche Rotaria TransformArte presentada por Club Rotario Reynosa.',
    club: 'Club Rotario Reynosa'
  },
  {
    id: 'ciudad-victoria',
    title: 'Noche Rotaria TransformArte Ciudad Victoria',
    date: '06 de noviembre, 2026',
    location: 'Ciudad Victoria',
    description: 'Noche Rotaria TransformArte presentada por Club Rotario Ciudad Victoria.',
    club: 'Club Rotario Ciudad Victoria'
  },
  {
    id: 'tampico',
    title: 'Noche Rotaria TransformArte Tampico',
    date: '26 de noviembre, 2026',
    location: 'Tampico',
    description: 'Noche Rotaria TransformArte presentada por Club Rotario Tampico Miramar.',
    club: 'Club Rotario Tampico Miramar'
  },
  {
    id: 'matamoros',
    title: 'Noche Rotaria TransformArte Matamoros',
    date: '14 de enero, 2027',
    location: 'Matamoros',
    description: 'Noche Rotaria TransformArte presentada por Club Rotario Matamoros Sur.',
    club: 'Club Rotario Matamoros Sur'
  },
  {
    id: 'convencion-monterrey',
    title: 'Convención Distrital Monterrey - TransformArte',
    date: '22 al 25 de abril, 2027',
    location: 'Monterrey',
    description: 'Convención Distrital con exposición final de TransformArte.',
    club: 'Distrito Rotario'
  }
];

interface EventCalendarProps {
  locale: string;
}

const translations = {
  en: {
    register: 'Register',
    location: 'Location',
    date: 'Date',
    organizedBy: 'Organized by',
  },
  es: {
    register: 'Registrar',
    location: 'Ubicación',
    date: 'Fecha',
    organizedBy: 'Organizado por',
  }
};

export default function EventCalendar({ locale = 'es' }: EventCalendarProps) {
  const t = translations[locale === 'en' ? 'en' : 'es'];

  return (
    <div className="grid grid-cols-1 gap-4">
      {events.map((event) => (
        <div key={event.id} className="bg-white rounded-lg p-6 shadow-md flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">{event.title}</h3>
            <div className="space-y-1">
              <p className="text-gray-600">
                <span className="font-medium">{t.date}:</span> {event.date}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">{t.location}:</span> {event.location}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">{t.organizedBy}:</span> {event.club}
              </p>
            </div>
          </div>
          <Link
            href={`/${locale}/comunidad`}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {t.register}
          </Link>
        </div>
      ))}
    </div>
  );
} 