import { createBrowserClient } from '@supabase/ssr';
import { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';

const SupabaseContext = createContext<{
  user: User | null;
  supabase: ReturnType<typeof createBrowserClient> | null;
}>({
  user: null,
  supabase: null,
});

export function SupabaseProvider({
  children,
  serverSession,
}: {
  children: React.ReactNode;
  serverSession?: User | null;
}) {
  const [user, setUser] = useState<User | null>(serverSession || null);
  
  const supabaseUrl = typeof window !== 'undefined' 
    ? ((window as any).ENV?.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '')
    : '';
  const supabaseAnonKey = typeof window !== 'undefined'
    ? ((window as any).ENV?.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '')
    : '';

  const [supabase] = useState(() =>
    typeof window !== 'undefined' && supabaseUrl && supabaseAnonKey
      ? createBrowserClient(supabaseUrl, supabaseAnonKey)
      : null
  );

  useEffect(() => {
    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <SupabaseContext.Provider value={{ user, supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within SupabaseProvider');
  }
  return context;
}

export function useUser() {
  const { user } = useSupabase();
  return user;
}
