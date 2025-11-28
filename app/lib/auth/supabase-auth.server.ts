import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';
import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/cloudflare';

export function createSupabaseServerClient(request: Request, env?: any) {
  const supabaseUrl = env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = env?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      env: env ? Object.keys(env) : 'no env',
    });
    throw new Error('Missing Supabase environment variables');
  }

  console.log('Creating Supabase server client', {
    url: supabaseUrl,
    hasKey: !!supabaseAnonKey,
  });

  const headers = new Headers();

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('Cookie') ?? '');
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          headers.append('Set-Cookie', serializeCookieHeader(name, value, options));
        });
      },
    },
  });

  return { supabase, headers };
}

export async function requireAuth(args: LoaderFunctionArgs | ActionFunctionArgs) {
  const env = (args as any)?.context?.cloudflare?.env;
  const { supabase, headers } = createSupabaseServerClient(args.request, env);
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { user, supabase, headers };
}

export async function getAuthUser(args: LoaderFunctionArgs | ActionFunctionArgs) {
  const env = (args as any)?.context?.cloudflare?.env;
  const { supabase, headers } = createSupabaseServerClient(args.request, env);
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { user, supabase, headers };
}
