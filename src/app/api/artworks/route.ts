import { NextResponse } from 'next/server';
// Switch to Supabase for runtime DB operations to avoid Prisma pool issues
import supabase from '@/lib/supabase';
import { z } from 'zod';
import { getAuthUser } from '@/lib/auth';

const ArtworkSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().nullable().or(z.literal('')),
  title: z.string().min(1),
  technique: z.string().min(1),
  dimensions: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable().or(z.literal('')),
  year: z.preprocess((v)=> (v===''||v==null)? undefined : Number(v), z.number().int().min(1000).max(9999)).optional(),
  donationPercentage: z.preprocess((v)=> (v===''||v==null)? undefined : Number(v), z.number().min(0).max(100)).optional(),
  marketPrice: z.preprocess((val) => {
    if (typeof val === 'string') return Number(val.replace(/[,\s]/g, ''));
    return val;
  }, z.number().nonnegative()),
  startingPrice: z.preprocess((val) => {
    if (typeof val === 'string') return Number(val.replace(/[,\s]/g, ''));
    return val;
  }, z.number().nonnegative())
});

export async function POST(request: Request) {
  try {
    // Login is optional. If present, we may use the user's info as defaults.
    const authUser = await getAuthUser(request);
    const body = await request.json();
    const data = ArtworkSchema.parse(body);

    const base: any = {
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
      donation_percentage: typeof data.donationPercentage === 'number' ? data.donationPercentage : null
    };

    // Insert the artwork
    const { data: inserted, error } = await supabase
      .from('artworks')
      .insert([base])
      .select('*')
      .single();

    if (error) {
      console.error('Supabase insert error (artworks)', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, artwork: inserted }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid data' }, { status: 400 });
  }
}

// New: fetch artworks list
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .in('status', ['pending', 'approved'])
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, artworks: data });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message ?? 'Failed to fetch artworks' }, { status: 500 });
  }
} 