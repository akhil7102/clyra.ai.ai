import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { getServerSupabase } from '~/lib/supabase/server';
import { requireAuth } from '~/lib/auth/supabase-auth.server';

export async function loader(args: LoaderFunctionArgs) {
  const { user } = await requireAuth(args);
  if (!user) return json({ error: 'Unauthorized' }, { status: 401 });
  const userId = user.id;

  const supabase = getServerSupabase((args as any)?.context?.cloudflare?.env);

  const { data, error } = await supabase
    .from('chats')
    .select('id, title, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) return json({ error: error.message }, { status: 500 });

  return json({ chats: data || [] });
}
