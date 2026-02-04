import { NextRequest } from 'next/server';

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

// Simple in-memory rate limiter (no external dependencies)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_POINTS = 20;
const RATE_LIMIT_DURATION = 60 * 1000; // 60 seconds in ms

export async function rateLimit(key: string) {
  const now = Date.now();
  const record = rateLimitMap.get(key);
  
  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_DURATION });
    return;
  }
  
  if (record.count >= RATE_LIMIT_POINTS) {
    const err = new Error('Too Many Requests');
    // @ts-ignore
    err.statusCode = 429;
    throw err;
  }
  
  record.count++;
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 60 * 1000);
