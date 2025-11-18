import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { getAuthUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ ok: true, user: null });
  return NextResponse.json({ ok: true, user });
}

export async function PATCH(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ ok: false, error: 'Authentication required' }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const fullName = String(body?.fullName || '').trim();
  if (!fullName) return NextResponse.json({ ok: false, error: 'Invalid name' }, { status: 400 });
  const { data, error } = await supabase
    .from('users')
    .update({ fullName })
    .eq('id', user.id)
    .select('id,email,fullName,role')
    .single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, user: data });
}


