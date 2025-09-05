import { NextRequest } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

export function assertAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin || allowedOrigins.length === 0) return; // allow if not configured
  const ok = allowedOrigins.includes(origin);
  if (!ok) {
    throw new Error('Origin not allowed');
  }
}

const limiter = new RateLimiterMemory({ points: 20, duration: 60 });

export async function rateLimit(key: string) {
  try {
    await limiter.consume(key);
  } catch {
    const err = new Error('Too Many Requests');
    // @ts-ignore
    err.statusCode = 429;
    throw err;
  }
}


