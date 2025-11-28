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
    const form = await args.request.formData();
    const file = form.get('file') as File | null;
    const chat_id = (form.get('chat_id') as string) || '';
    const title = (form.get('title') as string) || 'New Chat';

    if (!file) return json({ error: 'file required' }, { status: 400 });

    let chatId = chat_id;

    if (!chatId) {
      const { data: chat, error: chatErr } = await supabase
        .from('chats')
        .insert({ user_id: userId, title: title.slice(0, 120) })
        .select('id')
        .single();
      if (chatErr) return json({ error: chatErr.message }, { status: 500 });
      chatId = chat!.id as string;
    } else {
      const { data: own, error: ownErr } = await supabase
        .from('chats')
        .select('id')
        .eq('id', chatId)
        .eq('user_id', userId)
        .maybeSingle();
      if (ownErr) return json({ error: ownErr.message }, { status: 500 });
      if (!own) return json({ error: 'Forbidden' }, { status: 403 });
    }

    const filename = `${userId}/${chatId}/${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from('uploads').upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || 'application/octet-stream',
    });
    if (upErr) return json({ error: upErr.message }, { status: 500 });

    const { data: publicData } = await supabase.storage.from('uploads').getPublicUrl(filename);
    const fileUrl = publicData?.publicUrl || filename;

    // insert message referencing file URL
    const { data: msg, error: msgErr } = await supabase
      .from('messages')
      .insert({ chat_id: chatId, user_id: userId, role: 'user', content: `file:${fileUrl}` })
      .select('id, chat_id, role, content, created_at')
      .single();
    if (msgErr) return json({ error: msgErr.message }, { status: 500 });

    return json({ chat_id: chatId, file_url: fileUrl, message: msg });
  } catch (e: any) {
    return json({ error: e?.message || 'Upload failed' }, { status: 500 });
  }
}