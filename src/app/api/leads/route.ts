import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import supabase from '@/lib/supabase';
import { assertAllowedOrigin, rateLimit } from '@/lib/security';

const ALLOWED_MIME = (process.env.ALLOWED_MIME_TYPES || 'image/jpeg,image/png,application/pdf')
  .split(',').map(s => s.trim());
const BODY_LIMIT = Number(process.env.BODY_LIMIT_BYTES || 10 * 1024 * 1024);
const BUCKET = process.env.SUPABASE_BUCKET || 'uploads';

const LeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().nullable().or(z.literal('')),
});

export async function POST(request: NextRequest) {
  try {
    assertAllowedOrigin(request);
    const ip = request.headers.get('x-forwarded-for') || 'ip';
    await rateLimit(`lead:${ip}`);

    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ ok: false, error: 'Expected multipart/form-data' }, { status: 400 });
    }

    const form = await request.formData();
    const data = LeadSchema.parse({
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
    });

    const file = form.get('file') as File | null;
    let filePath: string | undefined;
    let fileMime: string | undefined;
    let fileSize: number | undefined;

    if (file) {
      fileMime = file.type || '';
      fileSize = file.size || 0;
      if (!ALLOWED_MIME.includes(fileMime)) {
        return NextResponse.json({ ok: false, error: 'Unsupported file type' }, { status: 400 });
      }
      if (fileSize > BODY_LIMIT) {
        return NextResponse.json({ ok: false, error: 'File too large' }, { status: 400 });
      }
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const ext = fileMime === 'application/pdf' ? 'pdf' : fileMime.split('/')[1] || 'bin';
      const key = `leads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(key, bytes, {
        contentType: fileMime,
        upsert: false
      });
      if (upErr) {
        console.error('Supabase upload error', upErr);
        return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 });
      }
      filePath = key;
    }

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        filePath: filePath || null,
        fileMime: fileMime || null,
        fileSize: fileSize || null
      }
    });

    let signedUrl: string | undefined;
    if (filePath) {
      const { data: signed, error } = await supabase.storage.from(BUCKET).createSignedUrl(filePath, 900);
      if (!error) signedUrl = signed?.signedUrl;
    }

    return NextResponse.json({ ok: true, lead, fileUrl: signedUrl }, { status: 201 });
  } catch (err: any) {
    const status = err?.statusCode || 400;
    console.error(err);
    return NextResponse.json({ ok: false, error: err?.message || 'Invalid request' }, { status });
  }
}


