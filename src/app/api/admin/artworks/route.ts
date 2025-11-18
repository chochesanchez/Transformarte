import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { getAuthUser, requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!requireAdmin(user)) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }
  const url = new URL(request.url);
  const status = url.searchParams.get('status') || undefined; // pending | approved | rejected
  const query = supabase.from('artworks').select('*').order('created_at', { ascending: false });
  const { data, error } = status ? await query.eq('status', status) : await query;
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, items: data });
}

export async function PATCH(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!requireAdmin(user)) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }
  const body = await request.json().catch(() => ({}));
  const id = Number(body?.id);
  const action = String(body?.action || ''); // approve | reject | set_image
  if (!id || !['approve', 'reject', 'set_image'].includes(action)) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }
  if (action === 'set_image') {
    const imageUrl = String(body?.imageUrl || '').trim();
    if (!imageUrl) return NextResponse.json({ ok: false, error: 'Missing imageUrl' }, { status: 400 });
    const { data, error } = await supabase
      .from('artworks')
      .update({ image_url: imageUrl })
      .eq('id', id)
      .select('*')
      .single();
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, item: data });
  }
  const newStatus = action === 'approve' ? 'approved' : 'rejected';
  const update: any = { status: newStatus };
  if (action === 'approve') {
    update.approved_at = new Date().toISOString();
    update.approved_by = user!.id;
  }
  const { data, error } = await supabase
    .from('artworks')
    .update(update)
    .eq('id', id)
    .select('*')
    .single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, item: data });
}

export async function DELETE(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!requireAdmin(user)) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }
  const url = new URL(request.url);
  const id = Number(url.searchParams.get('id'));
  if (!id) return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });
  const { error } = await supabase.from('artworks').delete().eq('id', id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}


