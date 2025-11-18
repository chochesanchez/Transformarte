import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { getAuthUser, requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const me = await getAuthUser(request);
  if (!requireAdmin(me)) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  const { data: users, error: uErr } = await supabase
    .from('users')
    .select('id,email,fullName,role,created_at');
  if (uErr) return NextResponse.json({ ok: false, error: uErr.message }, { status: 500 });

  // visits may not have user_id for earlier rows; this still works for newer ones
  const { data: visits } = await supabase
    .from('visits')
    .select('user_id,city,country,created_at')
    .order('created_at', { ascending: false });
  const latestByUser = new Map<number, { city?: string|null; country?: string|null }>();
  (visits||[]).forEach((v: any) => {
    if (v.user_id && !latestByUser.has(v.user_id)) latestByUser.set(v.user_id, { city: v.city, country: v.country });
  });

  const header = ['id','email','fullName','role','city','country','created_at'];
  const rows = (users||[]).map((u: any) => {
    const g = latestByUser.get(u.id) || {};
    return [u.id, u.email, u.fullName||'', u.role||'user', g.city||'', g.country||'', u.created_at||''].join(',');
  });
  const csv = [header.join(','), ...rows].join('\n');
  return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="users.csv"' } });
}


