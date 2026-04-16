import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

// ── Startup guard ─────────────────────────────────────────────────────────────
// Fail fast when JWT_SECRET is missing so a misconfigured production deploy is
// caught at the first request rather than silently issuing forgeable tokens.
//
// NEXT_PHASE is set to 'phase-production-build' during `next build`, so we
// skip the hard throw at build time — the build server may not have all runtime
// secrets. The guard fires as soon as the first real request arrives.
if (!process.env.JWT_SECRET) {
  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';
  if (process.env.NODE_ENV === 'production' && !isBuildPhase) {
    throw new Error(
      '[auth] JWT_SECRET environment variable is required in production. ' +
        'Set it in your Vercel project settings or .env.local for local development. ' +
        'Generate a strong value with: openssl rand -hex 32'
    );
  } else {
    console.warn(
      '[auth] JWT_SECRET is not set. ' +
        'An insecure development fallback is being used — NEVER deploy this to production.'
    );
  }
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'dev-only-insecure-secret-do-not-deploy'
);

export const SESSION_COOKIE = process.env.COOKIE_NAME || 'ta_session';
const COOKIE_SECURE = process.env.NODE_ENV === 'production';

// ── Types ─────────────────────────────────────────────────────────────────────

export type SessionUser = {
  id: number;
  email: string;
  fullName: string;
  role: string;
};

// ── Password helpers ──────────────────────────────────────────────────────────

export async function hashPassword(plain: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// ── Session management ────────────────────────────────────────────────────────

export async function createSession(user: SessionUser): Promise<string> {
  const token = await new SignJWT({
    sub: String(user.id),
    email: user.email,
    fullName: user.fullName,
    role: user.role || 'user',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: COOKIE_SECURE,
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return token;
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: COOKIE_SECURE,
    path: '/',
    maxAge: 0,
  });
}

export async function getAuthUser(request: Request): Promise<SessionUser | null> {
  const cookieHeader = request.headers.get('cookie') || '';
  const entry = cookieHeader
    .split(';')
    .find((c) => c.trim().startsWith(`${SESSION_COOKIE}=`));
  if (!entry) return null;

  // Use slice(1).join('=') to preserve base64 padding characters ('=') that
  // may appear in the JWT value itself.
  const token = entry.split('=').slice(1).join('=').trim();
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = Number(payload.sub);
    if (!userId) return null;
    return {
      id: userId,
      email: String(payload.email ?? ''),
      fullName: String(payload.fullName ?? ''),
      role: String(payload.role ?? 'user'),
    };
  } catch {
    return null;
  }
}

export function requireAdmin(user: SessionUser | null): boolean {
  return !!user && (user.role === 'admin' || user.role === 'superadmin');
}
