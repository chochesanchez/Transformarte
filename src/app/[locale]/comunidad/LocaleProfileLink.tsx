"use client";
export default function LocaleProfileLink({ locale }: { locale: string }){
  const href = locale === 'en' ? '/en/profile' : '/es/profile';
  const label = locale === 'en' ? 'Edit' : 'Editar';
  return <a href={href} className="text-xs text-primary">{label}</a>;
}


