import { createClient } from '@supabase/supabase-js';

export function getServerSupabase(env?: Record<string, string | undefined>) {
  const url = (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_URL : undefined) || (env?.VITE_SUPABASE_URL as string | undefined);
  const anonKey = (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_ANON_KEY : undefined) || (env?.VITE_SUPABASE_ANON_KEY as string | undefined);

  if (!url || !anonKey) {
    throw new Error('Supabase URL or ANON key is not configured');
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
