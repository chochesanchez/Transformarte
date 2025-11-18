import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
const SUPABASE_URL = process.env.SUPABASE_URL || '';

export const dynamic = 'force-dynamic';

function isSupabaseUrl(u: URL) {
  return /\/storage\/v1\/object\//.test(u.pathname);
}

function parseBucketAndPath(u: URL): { bucket: string; path: string } | null {
  // Expecting path like: /storage/v1/object/<qualifier>/<bucket>/<path...>
  const idx = u.pathname.indexOf('/storage/v1/object/');
  if (idx === -1) return null;
  const after = u.pathname.slice(idx + '/storage/v1/object/'.length);
  const parts = after.split('/').filter(Boolean);
  if (parts.length < 2) return null;
  
  // Handle both public and sign qualifiers
  const qualifier = parts[0];
  if (qualifier === 'public' || qualifier === 'sign') {
    const bucket = parts[1];
    const objectPath = parts.slice(2).join('/');
    if (!bucket || !objectPath) return null;
    return { bucket, path: objectPath };
  }
  
  // If no recognized qualifier, assume first part is bucket
  const bucket = parts[0];
  const objectPath = parts.slice(1).join('/');
  if (!bucket || !objectPath) return null;
  return { bucket, path: objectPath };
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const fileUrl = (url.searchParams.get('url') || '').trim();
    const as = url.searchParams.get('as') || '';
    if (!fileUrl) return NextResponse.json({ ok: false, error: 'Missing url' }, { status: 400 });

    // If it's already a signed URL with a token, extract the path and re-sign
    if (fileUrl.includes('token=') && fileUrl.includes('/storage/v1/object/sign/')) {
      try {
        const u = new URL(fileUrl);
        const parsed = parseBucketAndPath(u);
        if (parsed) {
          // Create a fresh signed URL
          const { data, error } = await supabaseAdmin.storage
            .from(parsed.bucket)
            .createSignedUrl(parsed.path, 60 * 60 * 24); // 24 hours
          
          if (!error && data?.signedUrl) {
            if (as === 'redirect') return NextResponse.redirect(data.signedUrl);
            return NextResponse.json({ ok: true, fileUrl: data.signedUrl });
          }
        }
      } catch {}
    }

    // Case 1: full URL
    try {
      const target = new URL(fileUrl);
      if (!isSupabaseUrl(target)) {
        if (as === 'redirect') return NextResponse.redirect(fileUrl);
        return NextResponse.json({ ok: true, fileUrl });
      }
      const parsed = parseBucketAndPath(target);
      if (!parsed) {
        if (as === 'redirect') return NextResponse.redirect(fileUrl);
        return NextResponse.json({ ok: true, fileUrl });
      }
      const { bucket, path } = parsed;
      
      // Try to create a signed URL first
      const { data, error } = await supabaseAdmin.storage
        .from(bucket)
        .createSignedUrl(path, 60 * 10);
      
      if (error || !data?.signedUrl) {
        // If signing fails, try public URL
        const pub = supabaseAdmin.storage.from(bucket).getPublicUrl(path).data?.publicUrl;
        if (pub) {
          if (as === 'redirect') return NextResponse.redirect(pub);
          return NextResponse.json({ ok: true, fileUrl: pub });
        }
        // Last resort: return original URL
        if (as === 'redirect') return NextResponse.redirect(fileUrl);
        return NextResponse.json({ ok: true, fileUrl });
      }
      
      const absolute = data.signedUrl.startsWith('http')
        ? data.signedUrl
        : (target.origin || SUPABASE_URL) + data.signedUrl;
      if (as === 'redirect') return NextResponse.redirect(absolute);
      return NextResponse.json({ ok: true, fileUrl: absolute });
    } catch (e) {
      // If URL parsing fails, treat as path
    }

    // Case 2: relative/object path e.g. "uploads/artworks/abc.jpg" or "/uploads/artworks/abc.jpg"
    const BUCKET = process.env.SUPABASE_BUCKET || 'uploads';
    let objectPath = fileUrl.replace(/^\/+/, '');
    if (objectPath.startsWith(`${BUCKET}/`)) objectPath = objectPath.slice(BUCKET.length + 1);
    
    // Try to create a signed URL
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET)
      .createSignedUrl(objectPath, 60 * 10);
    
    if (error || !data?.signedUrl) {
      // If signing fails, try public URL
      const pub = supabaseAdmin.storage.from(BUCKET).getPublicUrl(objectPath).data?.publicUrl;
      if (pub) {
        if (as === 'redirect') return NextResponse.redirect(pub);
        return NextResponse.json({ ok: true, fileUrl: pub });
      }
      // Last resort: construct public URL manually
      const fallbackUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${objectPath}`;
      if (as === 'redirect') return NextResponse.redirect(fallbackUrl);
      return NextResponse.json({ ok: true, fileUrl: fallbackUrl });
    }
    
    const absolute = data.signedUrl.startsWith('http')
      ? data.signedUrl
      : (SUPABASE_URL ? SUPABASE_URL + data.signedUrl : data.signedUrl);
    if (as === 'redirect') return NextResponse.redirect(absolute);
    return NextResponse.json({ ok: true, fileUrl: absolute });
  } catch (err) {
    // On any error, return the original URL
    const originalUrl = (new URL(request.url)).searchParams.get('url') || '';
    if ((new URL(request.url)).searchParams.get('as') === 'redirect') {
      return NextResponse.redirect(originalUrl);
    }
    return NextResponse.json({ ok: true, fileUrl: originalUrl });
  }
}

