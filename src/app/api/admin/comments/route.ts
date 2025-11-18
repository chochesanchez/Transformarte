import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { getAuthUser, requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!requireAdmin(user)) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  const { data, error } = await supabase
    .from('comments')
    .select('id,post_id,user_id,content,created_at, user:users(id, fullName), post:forum_posts(id,title)')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, items: data });
}

export async function DELETE(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!requireAdmin(user)) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  const url = new URL(request.url);
  const id = Number(url.searchParams.get('id'));
  if (!id) return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });
  const { error } = await supabase.from('comments').delete().eq('id', id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}


