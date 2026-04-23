import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL as string | undefined;
const SUPABASE_KEY = (
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY
) as string | undefined;

export const supabaseEnvOk = Boolean(SUPABASE_URL && SUPABASE_KEY);

if (!supabaseEnvOk) {
  console.warn('[supabase] Missing SUPABASE_URL or SUPABASE_ANON_KEY. Configure your .env file.');
}

export const supabaseAdmin = createClient(
  SUPABASE_URL || 'http://invalid-supabase-url',
  SUPABASE_KEY || 'invalid-key',
  {
    auth: {
      persistSession: false,
    },
  }
);

export default supabaseAdmin;


