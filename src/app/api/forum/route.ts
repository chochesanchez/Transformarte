import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { getAuthUser, requireAdmin } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }
    const data = await request.json();
    const { title, content } = data;
    // Allow multiple images; store JSON in image_url column for compatibility
    const imageUrls: string[] = Array.isArray(data.imageUrls)
      ? data.imageUrls.slice(0, 4)
      : (data.imageUrl ? [String(data.imageUrl)] : []);

    // Create the forum post in Supabase
    const { data: post, error } = await supabase
      .from('forum_posts')
      .insert([{ user_id: authUser.id, title, content, image_url: imageUrls.length ? JSON.stringify(imageUrls) : null, is_hidden: false }])
      .select('*')
      .single();
    if (error) throw error;

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Error creating forum post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 

export async function PATCH(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    const body = await request.json();
    const id = Number(body?.id);
    const updates: any = {};
    if (typeof body?.title === 'string') updates.title = body.title;
    if (typeof body?.content === 'string') updates.content = body.content;
    if (Array.isArray(body?.imageUrls)) updates.image_url = JSON.stringify(body.imageUrls.slice(0,4));
    if (!id || Object.keys(updates).length === 0) return NextResponse.json({ success:false, error:'Invalid payload' }, { status:400 });
    // check ownership or admin
    const { data: post } = await supabase.from('forum_posts').select('id,user_id').eq('id', id).maybeSingle();
    if (!post) return NextResponse.json({ success:false, error:'Not found' }, { status:404 });
    if (!requireAdmin(authUser) && post.user_id !== authUser.id) return NextResponse.json({ success:false, error:'Forbidden' }, { status:403 });
    const { data, error } = await supabase.from('forum_posts').update(updates).eq('id', id).select('*').single();
    if (error) throw error;
    return NextResponse.json({ success:true, post:data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success:false, error:'Failed to update' }, { status:500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) return NextResponse.json({ success:false, error:'Authentication required' }, { status:401 });
    const url = new URL(request.url);
    const id = Number(url.searchParams.get('id'));
    if (!id) return NextResponse.json({ success:false, error:'Missing id' }, { status:400 });
    const { data: post } = await supabase.from('forum_posts').select('id,user_id').eq('id', id).maybeSingle();
    if (!post) return NextResponse.json({ success:false, error:'Not found' }, { status:404 });
    if (!requireAdmin(authUser) && post.user_id !== authUser.id) return NextResponse.json({ success:false, error:'Forbidden' }, { status:403 });
    const { error } = await supabase.from('forum_posts').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success:true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success:false, error:'Failed to delete' }, { status:500 });
  }
}