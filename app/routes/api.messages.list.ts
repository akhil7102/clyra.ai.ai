import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { getServerSupabase } from '~/lib/supabase/server';
import { requireAuth } from '~/lib/auth/supabase-auth.server';

export async function loader(args: LoaderFunctionArgs) {
  const { user } = await requireAuth(args);
  if (!user) return json({ error: 'Unauthorized' }, { status: 401 });
  const userId = user.id;

  const url = new URL(args.request.url);
  const chat_id = url.searchParams.get('chat_id') || '';
  if (!chat_id) return json({ error: 'chat_id required' }, { status: 400 });

  const supabase = getServerSupabase((args as any)?.context?.cloudflare?.env);

  // Ensure ownership
  const { data: chat, error: chatErr } = await supabase
    .from('chats')
    .select('id, title, created_at, user_id')
    .eq('id', chat_id)
    .eq('user_id', userId)
    .maybeSingle();
  if (chatErr) return json({ error: chatErr.message }, { status: 500 });
  if (!chat) return json({ error: 'Not found' }, { status: 404 });

  const { data: rows, error } = await supabase
    .from('messages')
    .select('id, chat_id, user_id, role, content, created_at')
    .eq('chat_id', chat_id)
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) return json({ error: error.message }, { status: 500 });

  return json({ chat, messages: rows || [] });
}
