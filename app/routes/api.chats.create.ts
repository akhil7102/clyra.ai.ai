import { json, type ActionFunctionArgs } from '@remix-run/cloudflare';
import { getServerSupabase } from '~/lib/supabase/server';
import { requireAuth } from '~/lib/auth/supabase-auth.server';

export async function action(args: ActionFunctionArgs) {
  const { user } = await requireAuth(args);
  if (!user) return json({ error: 'Unauthorized' }, { status: 401 });
  const userId = user.id;

  if (args.request.method !== 'POST') return json({ error: 'Method not allowed' }, { status: 405 });

  const supabase = getServerSupabase((args as any)?.context?.cloudflare?.env);

  try {
    const { title } = (await args.request.json()) as { title?: string };
    const { data, error } = await supabase
      .from('chats')
      .insert({ user_id: userId, title: (title || 'New Chat').slice(0, 120) })
      .select('id, title, created_at')
      .single();

    if (error) return json({ error: error.message }, { status: 500 });

    return json({ chat: data });
  } catch (e: any) {
    return json({ error: e?.message || 'Failed to create chat' }, { status: 500 });
  }
}
