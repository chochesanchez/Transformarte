import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

const ALLOWED_MIME = (process.env.ALLOWED_MIME_TYPES || 'image/jpeg,image/png,image/webp,application/pdf')
  .split(',').map((s) => s.trim());
// If BODY_LIMIT_BYTES is 0/undefined, do not enforce a server-side size limit here
const BODY_LIMIT = Number(process.env.BODY_LIMIT_BYTES || 0);
const BUCKET = process.env.SUPABASE_BUCKET || 'uploads';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ ok: false, error: 'Expected multipart/form-data' }, { status: 400 });
    }

    const form = await request.formData();
    const file = form.get('file') as unknown as File | null;
    const context = String(form.get('context') || 'artwork');
    if (!file) return NextResponse.json({ ok: false, error: 'No file' }, { status: 400 });

    let fileMime = (file as any).type || '';
    const fileSize = (file as any).size || 0;
    const isImage = fileMime.startsWith('image/');
    // Accept any image/* and whitelisted mimes. Do not enforce body size here.
    if (!isImage && !ALLOWED_MIME.includes(fileMime)) {
      return NextResponse.json({ ok: false, error: `Unsupported file type: ${fileMime || 'unknown'}` }, { status: 400 });
    }

    const arrayBuffer = await (file as any).arrayBuffer();
    let bytes = new Uint8Array(arrayBuffer);
    const originalName = (file as any).name || '';
    const nameExt = (originalName.match(/\.([a-zA-Z0-9]+)$/)?.[1] || '').toLowerCase();
    let guessedExt = fileMime === 'application/pdf' ? 'pdf' : (fileMime.split('/')[1] || nameExt || 'jpg');

    // Server-side convert HEIC/HEIF -> JPEG to ensure browser compatibility
    const isHeic = /heic|heif/i.test(fileMime) || /(\.heic|\.heif)$/i.test(originalName);
    if (isHeic) {
      try {
        // Lazy import to avoid unnecessary bundle overhead in non-HEIC cases
        const sharp = (await import('sharp')).default as any;
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
      upsert: false
    });
    if (upErr) {
      console.error('Supabase upload error', upErr);
      return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 });
    }

    // Return the public URL as the primary URL, with signed URL as fallback
    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(key);
    const publicUrl = pub?.publicUrl || null;
    
    // Also create a signed URL as a fallback
    const { data: signed } = await supabase.storage.from(BUCKET).createSignedUrl(key, 60 * 60 * 24 * 7); // 7 days
    
    // Return public URL as primary, signed as fallback
    return NextResponse.json({ 
      ok: true, 
      fileUrl: publicUrl || signed?.signedUrl || `${process.env.SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${key}`,
      publicUrl,
      signedUrl: signed?.signedUrl,
      path: key 
    }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err?.message || 'Invalid request' }, { status: 400 });
  }
}


