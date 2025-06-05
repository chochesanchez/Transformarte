import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n';

export default function RootPage() {
  // Always redirect to default locale for now
  // The middleware will handle locale detection and switching
  redirect(`/${defaultLocale}`);
} 