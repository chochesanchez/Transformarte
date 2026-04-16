import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { getAuthUser } from '@/lib/auth';

const ALLOWED_MIME = (
  process.env.ALLOWED_MIME_TYPES || 'image/jpeg,image/png,image/webp,application/pdf'
)
  .split(',')
  .map((s) => s.trim());

const BUCKET = process.env.SUPABASE_BUCKET || 'uploads';

export async function POST(request: NextRequest) {
  // ── Auth guard ────────────────────────────────────────────────────────────
  // The upload endpoint must only be accessible to authenticated users.
  // An unauthenticated caller could otherwise flood the storage bucket.
  const authUser = await getAuthUser(request);
  if (!authUser) {
    return NextResponse.json(
      { ok: false, error: 'Authentication required' },
      { status: 401 }
    );
  }

  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { ok: false, error: 'Expected multipart/form-data' },
        { status: 400 }
      );
    }

    const form = await request.formData();
    const file = form.get('file') as File | null;
    const context = String(form.get('context') || 'artwork');

    if (!file) {
      return NextResponse.json({ ok: false, error: 'No file provided' }, { status: 400 });
    }

    let fileMime: string = file.type || '';
    const fileSize: number = file.size || 0;
    const isImage = fileMime.startsWith('image/');

    if (!isImage && !ALLOWED_MIME.includes(fileMime)) {
      return NextResponse.json(
        { ok: false, error: `Unsupported file type: ${fileMime || 'unknown'}` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    let bytes = new Uint8Array(arrayBuffer);
    const originalName = file.name || '';
    const nameExt = (originalName.match(/\.([a-zA-Z0-9]+)$/)?.[1] || '').toLowerCase();
    let guessedExt =
      fileMime === 'application/pdf' ? 'pdf' : fileMime.split('/')[1] || nameExt || 'jpg';

    // ── Server-side HEIC/HEIF → JPEG conversion ───────────────────────────
    // Apple devices upload HEIC images that most browsers cannot display.
    // Convert them to JPEG on the server before storing.
    const isHeic = /heic|heif/i.test(fileMime) || /(\.heic|\.heif)$/i.test(originalName);
    if (isHeic) {
      try {
        const sharp = (await import('sharp')).default;
        const jpegBuffer = await sharp(Buffer.from(bytes)).jpeg({ quality: 85 }).toBuffer();
        bytes = new Uint8Array(jpegBuffer);
        fileMime = 'image/jpeg';
        guessedExt = 'jpg';
      } catch (convErr) {
        console.warn('Sharp HEIC conversion failed; uploading original file', convErr);
      }
    }

    const prefix = context === 'forum' ? 'forum' : 'artworks';
    const key = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2)}.${guessedExt}`;

    const { error: upErr } = await supabase.storage.from(BUCKET).upload(key, bytes, {
      contentType: fileMime,
      upsert: false,
    });

    if (upErr) {
      console.error('Supabase upload error', upErr);
      return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 });
    }

    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(key);
    const publicUrl = pub?.publicUrl || null;

    const { data: signed } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(key, 60 * 60 * 24 * 7); // 7-day signed URL as fallback

    return NextResponse.json(
      {
        ok: true,
        fileUrl:
          publicUrl ||
          signed?.signedUrl ||
          `${process.env.SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${key}`,
        publicUrl,
        signedUrl: signed?.signedUrl,
        path: key,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid request';
    console.error('[upload]', err);
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
