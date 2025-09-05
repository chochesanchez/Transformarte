import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { createSession, clearSession, getAuthUser, hashPassword, verifyPassword } from '@/lib/auth';

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(1),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const action = url.searchParams.get('action');

  if (action === 'signup') {
    try {
      const body = await request.json();
      const data = SignupSchema.parse(body);
      const existing = await prisma.user.findUnique({ where: { email: data.email } });
      if (existing) return NextResponse.json({ ok: false, error: 'Email already in use' }, { status: 400 });
      const passwordHash = await hashPassword(data.password);
      const user = await prisma.user.create({ data: { email: data.email, passwordHash, fullName: data.displayName } });
      await createSession(user.id);
      return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, fullName: user.fullName } }, { status: 201 });
    } catch (err: any) {
      return NextResponse.json({ ok: false, error: err?.message || 'Invalid data' }, { status: 400 });
    }
  }

  if (action === 'login') {
    try {
      const body = await request.json();
      const data = LoginSchema.parse(body);
      const user = await prisma.user.findUnique({ where: { email: data.email } });
      if (!user) return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 400 });
      const ok = await verifyPassword(data.password, user.passwordHash);
      if (!ok) return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 400 });
      await createSession(user.id);
      return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, fullName: user.fullName } });
    } catch (err: any) {
      return NextResponse.json({ ok: false, error: err?.message || 'Invalid data' }, { status: 400 });
    }
  }

  if (action === 'logout') {
    await clearSession();
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: 'Unknown action' }, { status: 400 });
}

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ ok: true, user: null });
  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } });
}


