import React from 'react';
import EventCalendar from '@/components/EventCalendar';

export default function ProjectPage({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-primary mb-8">Eventos TransformArte</h1>
        <EventCalendar locale={params.locale} />
      </section>
    </div>
  );
} 