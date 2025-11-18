import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { getAuthUser, requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const me = await getAuthUser(request);
  if (!requireAdmin(me)) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  const header = ['id','name','email','subject','message','created_at'];
  const rows = (data||[]).map((c: any) => [c.id, safe(c.name), safe(c.email), safe(c.subject), safe(c.message), c.created_at||''].join(','));
  const csv = [header.join(','), ...rows].join('\n');
  return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="contacts.csv"' } });
}

function safe(v: string){
  if (v==null) return '';
  const needs = /[",\n]/.test(v);
  const s = String(v).replace(/"/g,'""');
  return needs ? `"${s}"` : s;
}


