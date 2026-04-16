// ─────────────────────────────────────────────────────────────────────────────
// Shared TypeScript types for TransformArte
// Import from '@/types' throughout the codebase to keep definitions in sync.
// ─────────────────────────────────────────────────────────────────────────────

// ── Auth ──────────────────────────────────────────────────────────────────────

/** Decoded JWT session payload (server-only; never sent to the browser). */
export type SessionUser = {
  id: number;
  email: string;
  fullName: string;
  role: 'user' | 'admin' | 'superadmin';
};

// ── API responses ─────────────────────────────────────────────────────────────

/** Standard JSON success envelope. */
export type ApiSuccess<T extends Record<string, unknown> = Record<string, unknown>> = {
  ok: true;
} & T;

/** Standard JSON error envelope. */
export type ApiError = {
  ok: false;
  error: string;
};

// ── Domain ────────────────────────────────────────────────────────────────────

/** Lifecycle status of an artwork submission. */
export type ArtworkStatus = 'pending' | 'approved' | 'rejected';

/** Lifecycle status of a post-moderation report. */
export type ReportStatus = 'pending' | 'resolved' | 'dismissed';

/** User roles as stored in the database. */
export type UserRole = 'user' | 'admin' | 'superadmin';

/** Public-safe artwork fields returned by the catalog API. */
export type PublicArtwork = {
  id: number;
  title: string;
  artist_name: string;
  technique: string;
  dimensions: string | null;
  description: string | null;
  image_url: string | null;
  market_price: number;
  starting_price: number;
  year: number | null;
  created_at: string;
  approved_at: string | null;
};

/** Forum post as returned by the community API. */
export type ForumPost = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image_url: string | null;
  is_hidden: boolean;
  created_at: string;
  updated_at: string | null;
  user: {
    id: number;
    fullName: string;
    email?: string;
  };
};

/** Comment as returned by the comments API. */
export type Comment = {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
  user: {
    id: number;
    fullName: string;
  };
};
