import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
// We avoid DB lookups for session reads; encode minimal user info in JWT

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change');
export const SESSION_COOKIE = process.env.COOKIE_NAME || 'ta_session';
const COOKIE_SECURE = process.env.NODE_ENV === 'production';

export async function hashPassword(plain: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function createSession(user: { id: number; email: string; fullName: string; role?: string }): Promise<string> {
  const token = await new SignJWT({ sub: String(user.id), email: user.email, fullName: user.fullName, role: user.role || 'user' })
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

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: COOKIE_SECURE,
    path: '/',
    maxAge: 0,
  });
}

export async function getAuthUser(request: Request) {
  const cookie = (request.headers.get('cookie') || '').split(';').find((c) => c.trim().startsWith(`${SESSION_COOKIE}=`));
  if (!cookie) return null;
  const token = cookie.split('=')[1];
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = Number(payload.sub);
    if (!userId) return null;
    return {
      id: userId,
      email: String(payload.email || ''),
      fullName: String(payload.fullName || ''),
      role: String(payload.role || 'user')
    } as any;
  } catch {
    return null;
  }
}

export function requireAdmin(user: { role: string } | null) {
  return !!user && (user.role === 'admin' || user.role === 'superadmin');
}


