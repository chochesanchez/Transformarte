import { NextRequest } from 'next/server';

// ── CORS ──────────────────────────────────────────────────────────────────────

const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

if (process.env.NODE_ENV === 'production' && allowedOrigins.length === 0) {
  // This is not a crash — some deployments intentionally omit CORS restrictions
  // when all traffic goes through a reverse proxy. Log it so it is visible in
  // production logs and easy to audit.
  console.warn(
    '[security] CORS_ALLOWED_ORIGINS is not set. ' +
      'All cross-origin requests will be accepted. ' +
      'Set this variable if you want to restrict which origins may call the API.'
  );
}

export function assertAllowedOrigin(request: NextRequest): void {
  const origin = request.headers.get('origin');
  if (!origin) return; // same-origin or non-browser request
  if (allowedOrigins.length === 0) return; // not configured — allow all
  if (!allowedOrigins.includes(origin)) {
    throw new Error('Origin not allowed');
  }
}

// ── Rate limiter ──────────────────────────────────────────────────────────────
//
// ⚠️  PRODUCTION WARNING
//
// This implementation stores counters in a module-level Map.  On serverless
// platforms (Vercel, AWS Lambda, etc.) each function invocation may be a new
// cold start, so the Map resets on every request under cold-start conditions.
// The limit is therefore only effective within a single warm instance.
//
// For true production rate-limiting replace this with a Redis-backed counter:
//   - Upstash Redis + @upstash/ratelimit  (recommended for Vercel)
//   - Vercel KV
//   - rate-limiter-flexible + ioredis
//
// ─────────────────────────────────────────────────────────────────────────────

const RATE_LIMIT_POINTS = 20;
const RATE_LIMIT_DURATION_MS = 60_000; // 60 seconds

// A proper typed error class avoids the need for @ts-ignore on dynamic props.
export class RateLimitError extends Error {
  public readonly statusCode = 429;
  constructor() {
    super('Too Many Requests');
    this.name = 'RateLimitError';
  }
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function rateLimit(key: string): Promise<void> {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_DURATION_MS });
    return;
  }

  if (record.count >= RATE_LIMIT_POINTS) {
    throw new RateLimitError();
  }

  record.count++;
}

// Periodic cleanup prevents unbounded memory growth in long-running processes.
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((record, key) => {
    if (now > record.resetTime) rateLimitMap.delete(key);
  });
}, 60_000);
