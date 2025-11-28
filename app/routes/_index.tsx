import { json, type MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import React, { lazy, Suspense } from 'react';
import { Header } from '~/components/header/Header';
import { useLocation } from '@remix-run/react';
const Chat = lazy(() => import('~/components/chat/Chat.client').then(m => ({ default: m.Chat })));

export const meta: MetaFunction = () => {
  return [
    { title: 'Clyra.ai || Next Gen Ai Assistant' },
    { name: 'description', content: 'Chat with Clyra.ai, your AI assistant' },
  ];
};

export const loader = () => json({});

/**
 * Landing page component for Bolt
 * Note: Settings functionality should ONLY be accessed through the sidebar menu.
 * Do not add settings button/panel to this landing page as it was intentionally removed
 * to keep the UI clean and consistent with the design system.
 */
export default function Index() {
  const location = useLocation();
  const isChatRoute = location.pathname.startsWith('/chat');

  return (
    <div className="relative flex flex-col min-h-screen w-full text-gray-200 overflow-hidden">
      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        <Header />
        <main className="flex-1 flex flex-col min-h-0" style={{ paddingTop: 'var(--header-height)' }}>
          <div className="flex-1 min-h-0">
            <ClientOnly fallback={<BaseChat />}>
              {() => (
                <Suspense
                  fallback={
                    <div className="max-w-chat mx-auto p-4 animate-pulse text-accent-500/60">Loading chat…</div>
                  }
                >
                  <Chat />
                </Suspense>
              )}
            </ClientOnly>
          </div>
        </main>
      </div>
      {/* Footer removed */}
    </div>
  );
}
