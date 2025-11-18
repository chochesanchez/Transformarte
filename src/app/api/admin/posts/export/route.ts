import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { getAuthUser, requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const me = await getAuthUser(request);
  if (!requireAdmin(me)) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  const { data: posts, error } = await supabase
    .from('forum_posts')
    .select('id,title,content,created_at, user:users(fullName)')
    .order('created_at', { ascending: false });
  const { data: comments } = await supabase
    .from('comments')
    .select('id,post_id,content,created_at, user:users(fullName)')
    .order('created_at', { ascending: true });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  const header = ['post_id','post_title','post_author','post_content','post_created_at','comment_id','comment_author','comment_content','comment_created_at'];
  const rows: string[] = [];
  const cmByPost = new Map<number, any[]>();
  (comments||[]).forEach((c: any) => {
    const arr = cmByPost.get(c.post_id) || [];
    arr.push(c);
    cmByPost.set(c.post_id, arr);
  });
  (posts||[]).forEach((p: any) => {
    const cms = cmByPost.get(p.id) || [];
    if (cms.length===0) {
      rows.push([p.id, safe(p.title), safe(p.user?.fullName||''), safe(p.content), p.created_at||'', '', '', '', ''].join(','));
    } else {
      cms.forEach((c) => {
        rows.push([p.id, safe(p.title), safe(p.user?.fullName||''), safe(p.content), p.created_at||'', c.id, safe(c.user?.fullName||''), safe(c.content), c.created_at||''].join(','));
      });
    }
  });
  const csv = [header.join(','), ...rows].join('\n');
  return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="posts.csv"' } });
}

function safe(v: string){
  if (v==null) return '';
  const needs = /[",\n]/.test(v);
  const s = String(v).replace(/"/g,'""');
  return needs ? `"${s}"` : s;
}


