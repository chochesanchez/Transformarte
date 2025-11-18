import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL as string | undefined;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined;

export const supabaseEnvOk = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

if (!supabaseEnvOk) {
  // Visible log to help local setup; do not throw at import time
  console.warn('[supabase] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Create .env.local to configure.');
}

export const supabaseAdmin = createClient(
  SUPABASE_URL || 'http://invalid-supabase-url',
  SUPABASE_SERVICE_ROLE_KEY || 'invalid-service-role-key',
  {
    auth: {
      persistSession: false,
    },
  }
);

export default supabaseAdmin;


