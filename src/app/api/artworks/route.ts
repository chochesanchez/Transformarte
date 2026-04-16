import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { z } from 'zod';
import { getAuthUser } from '@/lib/auth';

// ── Submission schema ─────────────────────────────────────────────────────────

const ArtworkSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().nullable().or(z.literal('')),
  title: z.string().min(1),
  technique: z.string().min(1),
  dimensions: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable().or(z.literal('')),
  year: z
    .preprocess((v) => (v === '' || v == null ? undefined : Number(v)), z.number().int().min(1000).max(9999))
    .optional(),
  donationPercentage: z
    .preprocess((v) => (v === '' || v == null ? undefined : Number(v)), z.number().min(0).max(100))
    .optional(),
  marketPrice: z.preprocess((val) => {
    if (typeof val === 'string') return Number(val.replace(/[,\s]/g, ''));
    return val;
  }, z.number().nonnegative()),
  startingPrice: z.preprocess((val) => {
    if (typeof val === 'string') return Number(val.replace(/[,\s]/g, ''));
    return val;
  }, z.number().nonnegative()),
});

// ── POST — Submit an artwork for review ───────────────────────────────────────

export async function POST(request: Request) {
  try {
    // Auth is optional for submissions: authenticated users may pre-fill their info,
    // but the public may also donate artwork without an account.
    const authUser = await getAuthUser(request);
    const body = await request.json();
    const data = ArtworkSchema.parse(body);

    const payload: Record<string, unknown> = {
      title: data.title,
      artist_name: data.fullName || authUser?.fullName || '',
      technique: data.technique,
      dimensions: data.dimensions ?? '',
      description: data.description ?? '',
      market_price: data.marketPrice,
      starting_price: data.startingPrice,
      donor_email: data.email || authUser?.email || '',
      donor_phone: data.phone ?? '',
      image_url: (data.imageUrl as string) || '',
      status: 'pending',
      year: typeof data.year === 'number' ? data.year : null,
      donation_percentage: typeof data.donationPercentage === 'number' ? data.donationPercentage : null,
    };

    const { data: inserted, error } = await supabase
      .from('artworks')
      .insert([payload])
      .select('*')
      .single();

    if (error) {
      console.error('[artworks] Supabase insert error', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, artwork: inserted }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid data';
    console.error('[artworks POST]', err);
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

// ── GET — Public artwork catalog ──────────────────────────────────────────────
// Returns ONLY approved artworks.
// Donor contact fields (email, phone) are intentionally excluded from this
// response — they are private and only accessible to admins via /api/admin/artworks.

export async function GET(_request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('artworks')
      .select(
        'id, title, artist_name, technique, dimensions, description, image_url, market_price, starting_price, year, created_at, approved_at'
      )
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, artworks: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch artworks';
    console.error('[artworks GET]', err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
