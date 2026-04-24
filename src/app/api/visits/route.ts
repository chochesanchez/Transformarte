import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { getAuthUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthUser(request);
    const ua = request.headers.get('user-agent') || '';
    const payload: Record<string, unknown> = { user_agent: ua, city: null, country: null };
    if (auth?.id) payload.user_id = auth.id;
    await supabase.from('visits').insert([payload]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
