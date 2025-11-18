import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { getAuthUser, requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const postId = Number(url.searchParams.get('postId'));
  if (!postId) return NextResponse.json({ ok: false, error: 'Missing postId' }, { status: 400 });
  const { data, error } = await supabase
    .from('comments')
    .select('id,post_id,user_id,content,created_at, user:users(id, fullName)')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, items: data });
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ ok: false, error: 'Authentication required' }, { status: 401 });
  const body = await request.json();
  const postId = Number(body?.postId);
  const content = String(body?.content || '').trim();
  if (!postId || !content) return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  const { data, error } = await supabase
    .from('comments')
    .insert([{ post_id: postId, user_id: user.id, content }])
    .select('id,post_id,user_id,content,created_at, user:users(id, fullName)')
    .single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, comment: data });
}

export async function PATCH(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ ok: false, error: 'Authentication required' }, { status: 401 });
  const body = await request.json();
  const id = Number(body?.id);
  const content = String(body?.content || '').trim();
  if (!id || !content) return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  const { data: comment } = await supabase.from('comments').select('id,user_id').eq('id', id).maybeSingle();
  if (!comment) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  if (!requireAdmin(user) && comment.user_id !== user.id) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  const { data, error } = await supabase.from('comments').update({ content }).eq('id', id).select('id,post_id,user_id,content,created_at').single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, comment: data });
}

export async function DELETE(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ ok: false, error: 'Authentication required' }, { status: 401 });
  const url = new URL(request.url);
  const id = Number(url.searchParams.get('id'));
  if (!id) return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });
  const { data: comment } = await supabase.from('comments').select('id,user_id').eq('id', id).maybeSingle();
  if (!comment) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  if (!requireAdmin(user) && comment.user_id !== user.id) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  const { error } = await supabase.from('comments').delete().eq('id', id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}


