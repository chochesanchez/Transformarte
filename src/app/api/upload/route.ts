import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

const ALLOWED_MIME = (process.env.ALLOWED_MIME_TYPES || 'image/jpeg,image/png,application/pdf')
  .split(',').map((s) => s.trim());
const BODY_LIMIT = Number(process.env.BODY_LIMIT_BYTES || 10 * 1024 * 1024);
const BUCKET = process.env.SUPABASE_BUCKET || 'uploads';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ ok: false, error: 'Expected multipart/form-data' }, { status: 400 });
    }

    const form = await request.formData();
    const file = form.get('file') as unknown as File | null;
    if (!file) return NextResponse.json({ ok: false, error: 'No file' }, { status: 400 });

    const fileMime = (file as any).type || '';
    const fileSize = (file as any).size || 0;
    if (!ALLOWED_MIME.includes(fileMime)) {
      return NextResponse.json({ ok: false, error: 'Unsupported file type' }, { status: 400 });
    }
    if (fileSize > BODY_LIMIT) {
      return NextResponse.json({ ok: false, error: 'File too large' }, { status: 400 });
    }

    const arrayBuffer = await (file as any).arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const ext = fileMime === 'application/pdf' ? 'pdf' : fileMime.split('/')[1] || 'bin';
    const key = `forum/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: upErr } = await supabase.storage.from(BUCKET).upload(key, bytes, {
      contentType: fileMime,
      upsert: false
    });
    if (upErr) {
      console.error('Supabase upload error', upErr);
      return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 });
    }

    const { data: signed, error } = await supabase.storage.from(BUCKET).createSignedUrl(key, 900);
    if (error) return NextResponse.json({ ok: false, error: 'Signing failed' }, { status: 500 });

    return NextResponse.json({ ok: true, fileUrl: signed?.signedUrl, path: key }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err?.message || 'Invalid request' }, { status: 400 });
  }
}


