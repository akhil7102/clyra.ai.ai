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
    const body = (await args.request.json()) as {
      chat_id?: string;
      title?: string;
      role: string;
      content: string;
      created_at?: string;
    };

    let chatId = body.chat_id;

    if (!chatId) {
      const { data: chat, error: chatErr } = await supabase
        .from('chats')
        .insert({ user_id: userId, title: (body.title || 'New Chat').slice(0, 120) })
        .select('id')
        .single();
      if (chatErr) return json({ error: chatErr.message }, { status: 500 });
      chatId = chat!.id as string;
    } else {
      // Ensure ownership
      const { data: own, error: ownErr } = await supabase
        .from('chats')
        .select('id')
        .eq('id', chatId)
        .eq('user_id', userId)
        .limit(1)
        .maybeSingle();
      if (ownErr) return json({ error: ownErr.message }, { status: 500 });
      if (!own) return json({ error: 'Forbidden' }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('messages')
      .insert({ chat_id: chatId, user_id: userId, role: body.role, content: body.content, created_at: body.created_at })
      .select('id, chat_id, role, content, created_at')
      .single();

    if (error) return json({ error: error.message }, { status: 500 });

    return json({ message: data, chat_id: chatId });
  } catch (e: any) {
    return json({ error: e?.message || 'Failed to append message' }, { status: 500 });
  }
}
