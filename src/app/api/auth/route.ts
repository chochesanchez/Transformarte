import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import supabase, { supabaseEnvOk } from '@/lib/supabase';
import { createSession, clearSession, getAuthUser, hashPassword, verifyPassword } from '@/lib/auth';

export const dynamic = 'force-dynamic';

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
      if (!supabaseEnvOk) {
        return NextResponse.json({ ok: false, error: 'Database not configured' }, { status: 500 });
      }
      const body = await request.json();
      const data = SignupSchema.parse(body);
      const { data: found, error: selectErr } = await supabase
        .from('users')
        .select('id')
        .eq('email', data.email)
        .maybeSingle();
      if (selectErr) {
        return NextResponse.json({ ok: false, error: selectErr.message }, { status: 500 });
      }
      if (found) return NextResponse.json({ ok: false, error: 'Email already in use' }, { status: 400 });
      const passwordHash = await hashPassword(data.password);
      const { data: user, error } = await supabase
        .from('users')
        .insert([{ email: data.email, passwordHash, fullName: data.displayName, role: 'user', isActive: true }])
        .select('id, email, "fullName", role')
        .single();
      if (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      }
      const token = await createSession({ id: user.id, email: user.email, fullName: user.fullName, role: user.role });
      const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, fullName: user.fullName } }, { status: 201 });
      res.cookies.set(process.env.COOKIE_NAME || 'ta_session', token, {
        httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 30,
      });
      return res;
    } catch (err: any) {
      return NextResponse.json({ ok: false, error: err?.message || 'Invalid data' }, { status: 400 });
    }
  }

  if (action === 'login') {
    try {
      if (!supabaseEnvOk) {
        return NextResponse.json({ ok: false, error: 'Database not configured' }, { status: 500 });
      }
      const body = await request.json();
      const data = LoginSchema.parse(body);
      const { data: user, error: selectErr } = await supabase
        .from('users')
        .select('*')
        .eq('email', data.email)
        .maybeSingle();
      if (selectErr) {
        return NextResponse.json({ ok: false, error: selectErr.message }, { status: 500 });
      }
      if (!user) return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 400 });
      const ok = await verifyPassword(data.password, user.passwordHash);
      if (!ok) return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 400 });
      const token = await createSession({ id: user.id, email: user.email, fullName: user.fullName, role: user.role });
      const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, fullName: user.fullName } });
      res.cookies.set(process.env.COOKIE_NAME || 'ta_session', token, {
        httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 30,
      });
      return res;
    } catch (err: any) {
      return NextResponse.json({ ok: false, error: err?.message || 'Invalid data' }, { status: 400 });
    }
  }

  if (action === 'logout') {
    await clearSession();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(process.env.COOKIE_NAME || 'ta_session', '', {
      httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 0,
    });
    return res;
  }

  return NextResponse.json({ ok: false, error: 'Unknown action' }, { status: 400 });
}

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ ok: true, user: null });
  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } });
}
