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

  const header = ['id','title','artist_name','technique','dimensions','market_price','starting_price','status','donor_email','donor_phone','created_at','approved_at','approved_by'];
  const rows = (data || []).map((a: any) => header.map((h) => (a[h] ?? '')).join(','));
  const csv = [header.join(','), ...rows].join('\n');
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="artworks${status?`_${status}`:''}.csv"`
    }
  });
}


