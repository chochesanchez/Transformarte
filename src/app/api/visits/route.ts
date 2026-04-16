import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { getAuthUser } from '@/lib/auth';
import { createRequire } from 'module';

export const dynamic = 'force-dynamic';

// ── GeoIP reader (optional) ───────────────────────────────────────────────────
// Requires the MaxMind GeoLite2-City database.
// Set GEOIP_MMDB_PATH to the absolute path of the .mmdb file on the server.
// If not set, visit records are stored without city/country enrichment.
//
// Download the free database at:
//   https://dev.maxmind.com/geoip/geolite2-free-geolocation-data
//
// Example .env.local:
//   GEOIP_MMDB_PATH=/data/GeoLite2-City.mmdb

const require = createRequire(import.meta.url);
type MaxmindReader = { get: (ip: string) => Record<string, unknown> | null };
let geoReader: MaxmindReader | null = null;

const MMDB_PATH = process.env.GEOIP_MMDB_PATH;
if (MMDB_PATH) {
  try {
    const maxmind = require('maxmind') as { openSync: (path: string) => MaxmindReader }; // eslint-disable-line
    geoReader = maxmind.openSync(MMDB_PATH);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.warn('[visits] GeoLite2 database could not be loaded:', message);
  }
} else if (process.env.NODE_ENV === 'production') {
  console.warn(
    '[visits] GEOIP_MMDB_PATH is not set. ' +
      'Visit records will be stored without geographic enrichment.'
  );
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthUser(request);
    const forwarded = request.headers.get('x-forwarded-for') || '';
    const ip = forwarded.split(',')[0].trim() || '';

    let city: string | null = null;
    let country: string | null = null;

    if (geoReader && ip) {
      try {
        const result = geoReader.get(ip) as {
          city?: { names?: { en?: string } };
          country?: { names?: { en?: string } };
        } | null;
        city = result?.city?.names?.en ?? null;
        country = result?.country?.names?.en ?? null;
      } catch {
        // Non-fatal: geolocation enrichment is best-effort
      }
    }

    const ua = request.headers.get('user-agent') || '';
    const payload: Record<string, unknown> = { city, country, user_agent: ua };
    if (auth?.id) payload.user_id = auth.id;

    const { error } = await supabase.from('visits').insert([payload]);
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch {
    // Return 200 even on failure so the client-side fire-and-forget never
    // surfaces an uncaught promise rejection in the browser console.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
