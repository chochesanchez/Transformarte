import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { getAuthUser } from '@/lib/auth';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
let reader: any = null;
try {
  const maxmind = require('maxmind');
  reader = maxmind.openSync('/Users/chochesanchez/Desktop/PROJECTS/TOOLS/GeoLite2-City.mmdb');
} catch (e) {
  console.warn('GeoLite2 not available', e?.message || e);
}

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthUser(request);
    const forwarded = request.headers.get('x-forwarded-for') || '';
    const ip = forwarded.split(',')[0].trim() || request.ip || '';
    let city = null as string | null;
    let country = null as string | null;
    if (reader && ip) {
      try {
        const r = reader.get(ip);
        city = r?.city?.names?.en || null;
        country = r?.country?.names?.en || null;
      } catch {}
    }
    const ua = request.headers.get('user-agent') || '';
    const payload: any = { city, country, user_agent: ua };
    if (auth?.id) payload.user_id = auth.id;
    const { error } = await supabase.from('visits').insert([payload]);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}


