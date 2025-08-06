import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const ArtworkSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().nullable().or(z.literal('')),
  title: z.string().min(1),
  technique: z.string().min(1),
  dimensions: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
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
    const body = await request.json();
    const data = ArtworkSchema.parse(body);

    const artwork = await prisma.artwork.create({
      data: {
        title: data.title,
        artistName: data.fullName,
        technique: data.technique,
        dimensions: data.dimensions ?? '',
        description: data.description ?? '',
        marketPrice: data.marketPrice,
        startingPrice: data.startingPrice,
        donorEmail: data.email,
        donorPhone: data.phone ?? '',
        imageUrl: '', // TODO: upload to Cloudinary when ready
        status: 'pending'
      }
    });

    return NextResponse.json({ success: true, artwork }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid data' }, { status: 400 });
  }
}

// New: fetch artworks list
export async function GET() {
  try {
    const artworks = await prisma.artwork.findMany({
      where: { status: { in: ['pending', 'approved'] } },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, artworks });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message ?? 'Failed to fetch artworks' }, { status: 500 });
  }
} 