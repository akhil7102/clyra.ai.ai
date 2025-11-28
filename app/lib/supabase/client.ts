import { createClient } from '@supabase/supabase-js';

const url = (import.meta as any)?.env?.VITE_SUPABASE_URL as string | undefined;
const anonKey = (import.meta as any)?.env?.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseClient = url && anonKey ? createClient(url, anonKey) : undefined;

export function ensureSupabaseClient() {
  if (!supabaseClient) {
    throw new Error('Supabase client is not configured');
  }
  return supabaseClient;
}
