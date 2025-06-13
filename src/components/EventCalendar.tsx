import React from 'react';
import Link from 'next/link';

// Event type definition
interface Event {
  id: string;
  title: {
    en: string;
    es: string;
  };
  date: {
    en: string;
    es: string;
  };
  location: string;
  description: {
    en: string;
    es: string;
  };
  club: string;
}

// Events data with translations
const events: Event[] = [
  {
    id: 'monterrey',
    title: {
      en: 'TransformArte Rotary Night Monterrey',
      es: 'Noche Rotaria TransformArte Monterrey'
    },
    date: {
      en: 'July 16, 2026',
      es: '16 de julio, 2026'
    },
    location: 'Monterrey',
    description: {
      en: 'TransformArte Rotary Night presented by Rotary Club Monterrey Metropolitano and Rotary Club Regiomontano Valle Oriente.',
      es: 'Noche Rotaria TransformArte presentada por Club Rotario Monterrey Metropolitano y Club Rotario Regiomontano Valle Oriente.'
    },
    club: 'Club Rotario Monterrey Metropolitano y Club Rotario Regiomontano Valle Oriente'
  },
  {
    id: 'san-luis',
    title: {
      en: 'TransformArte Rotary Night San Luis Potosí',
      es: 'Noche Rotaria TransformArte San Luis Potosí'
    },
    date: {
      en: 'August 06, 2026',
      es: '06 de agosto, 2026'
    },
    location: 'San Luis Potosí',
    description: {
      en: 'TransformArte Rotary Night presented by Rotary Club San Luis Empresarial.',
      es: 'Noche Rotaria TransformArte presentada por Club Rotario San Luis Empresarial.'
    },
    club: 'Club Rotario San Luis Empresarial'
  },
  {
    id: 'nuevo-laredo',
    title: {
      en: 'TransformArte Rotary Night Nuevo Laredo',
      es: 'Noche Rotaria TransformArte Nuevo Laredo'
    },
    date: {
      en: 'August 27, 2026',
      es: '27 de agosto, 2026'
    },
    location: 'Nuevo Laredo',
    description: {
      en: 'TransformArte Rotary Night presented by Rotary Club Villa de Nuevo Laredo.',
      es: 'Noche Rotaria TransformArte presentada por Club Rotario Villa de Nuevo Laredo.'
    },
    club: 'Club Rotario Villa de Nuevo Laredo'
  },
  {
    id: 'reynosa',
    title: {
      en: 'TransformArte Rotary Night Reynosa',
      es: 'Noche Rotaria TransformArte Reynosa'
    },
    date: {
      en: 'September 24, 2026',
      es: '24 de septiembre, 2026'
    },
    location: 'Reynosa',
    description: {
      en: 'TransformArte Rotary Night presented by Rotary Club Reynosa.',
      es: 'Noche Rotaria TransformArte presentada por Club Rotario Reynosa.'
    },
    club: 'Club Rotario Reynosa'
  },
  {
    id: 'ciudad-victoria',
    title: {
      en: 'TransformArte Rotary Night Ciudad Victoria',
      es: 'Noche Rotaria TransformArte Ciudad Victoria'
    },
    date: {
      en: 'November 06, 2026',
      es: '06 de noviembre, 2026'
    },
    location: 'Ciudad Victoria',
    description: {
      en: 'TransformArte Rotary Night presented by Rotary Club Ciudad Victoria.',
      es: 'Noche Rotaria TransformArte presentada por Club Rotario Ciudad Victoria.'
    },
    club: 'Club Rotario Ciudad Victoria'
  },
  {
    id: 'tampico',
    title: {
      en: 'TransformArte Rotary Night Tampico',
      es: 'Noche Rotaria TransformArte Tampico'
    },
    date: {
      en: 'November 26, 2026',
      es: '26 de noviembre, 2026'
    },
    location: 'Tampico',
    description: {
      en: 'TransformArte Rotary Night presented by Rotary Club Tampico Miramar.',
      es: 'Noche Rotaria TransformArte presentada por Club Rotario Tampico Miramar.'
    },
    club: 'Club Rotario Tampico Miramar'
  },
  {
    id: 'matamoros',
    title: {
      en: 'TransformArte Rotary Night Matamoros',
      es: 'Noche Rotaria TransformArte Matamoros'
    },
    date: {
      en: 'January 14, 2027',
      es: '14 de enero, 2027'
    },
    location: 'Matamoros',
    description: {
      en: 'TransformArte Rotary Night presented by Rotary Club Matamoros Sur.',
      es: 'Noche Rotaria TransformArte presentada por Club Rotario Matamoros Sur.'
    },
    club: 'Club Rotario Matamoros Sur'
  },
  {
    id: 'convencion-monterrey',
    title: {
      en: 'District Convention Monterrey - TransformArte',
      es: 'Convención Distrital Monterrey - TransformArte'
    },
    date: {
      en: 'April 22-25, 2027',
      es: '22 al 25 de abril, 2027'
    },
    location: 'Monterrey',
    description: {
      en: 'District Convention with TransformArte final exhibition.',
      es: 'Convención Distrital con exposición final de TransformArte.'
    },
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
            <h3 className="text-xl font-semibold text-primary mb-2">{event.title[locale === 'en' ? 'en' : 'es']}</h3>
            <div className="space-y-1">
              <p className="text-gray-600">
                <span className="font-medium">{t.date}:</span> {event.date[locale === 'en' ? 'en' : 'es']}
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