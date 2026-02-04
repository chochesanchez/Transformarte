import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { getAuthUser, requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!requireAdmin(user)) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  let query = supabase.from('artworks').select('*').order('created_at', { ascending: false });
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  // Updated header to include new fields
  const header = [
    'id',
    'title',
    'artist_name',
    'technique',
    'dimensions',
    'market_price',
    'starting_price',
    'year',
    'donation_percentage',
    'delivery_date',
    'status',
    'donor_email',
    'donor_phone',
    // New social media fields
    'instagram_url',
    'facebook_url',
    'linkedin_url',
    'website_url',
    // New checkbox fields
    'semblanza_entregada',
    'certificado_autenticidad',
    'obra_firmada',
    // Signature
    'signature_url',
    // Timestamps
    'created_at',
    'approved_at',
    'approved_by'
  ];

  // Helper to escape CSV values
  const escapeCSV = (val: any): string => {
    if (val === null || val === undefined) return '';
    const str = String(val);
    // Escape quotes and wrap in quotes if contains comma, quote, or newline
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = (data || []).map((item: any) =>
    header.map((h) => escapeCSV(item[h])).join(',')
  );
  const csv = [header.join(','), ...rows].join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="artworks-${status || 'all'}-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
