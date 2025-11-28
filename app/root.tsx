import { useStore } from '@nanostores/react';
import type { LinksFunction, HeadersFunction } from '@remix-run/cloudflare';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useNavigation, useLoaderData, isRouteErrorResponse, useRouteError, useLocation } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import resetStyles from '@unocss/reset/eric-meyer.css?url';
import { themeStore } from './lib/stores/theme';
import { stripIndents } from './utils/stripIndent';
import { createHead } from 'remix-island';
import { Suspense, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ClientOnly } from 'remix-utils/client-only';
import { cssTransition, ToastContainer } from 'react-toastify';
import { SupabaseProvider } from '~/lib/auth/supabase-client';
import { getAuthUser } from '~/lib/auth/supabase-auth.server';


import reactToastifyStyles from 'react-toastify/dist/ReactToastify.css?url';
import globalStyles from './styles/index.scss?url';
import xtermStyles from '@xterm/xterm/css/xterm.css?url';

import 'virtual:uno.css';


const toastAnimation = cssTransition({
  enter: 'animated fadeInRight',
  exit: 'animated fadeOutRight',
});


export const links: LinksFunction = () => [
  { rel: 'icon', href: '/favicon.ico' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/manifest.webmanifest' },
  { rel: 'stylesheet', href: reactToastifyStyles },
  { rel: 'stylesheet', href: resetStyles },
  { rel: 'stylesheet', href: globalStyles },
  { rel: 'stylesheet', href: xtermStyles },
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  },
];

export const headers: HeadersFunction = () => ({
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  Pragma: 'no-cache',
  Expires: '0',
});

const inlineThemeCode = stripIndents`
  setTutorialKitTheme();

  function setTutorialKitTheme() {
    let theme = localStorage.getItem('bolt_theme');

    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.querySelector('html')?.setAttribute('data-theme', theme);
  }
`;

export const Head = createHead(() => (
  <>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0b0b0c" />
    <Meta />
    <Links />
    <script dangerouslySetInnerHTML={{ __html: inlineThemeCode }} />
  </>
));

export const loader = async (args: LoaderFunctionArgs) => {
  const { user } = await getAuthUser(args);
  return json({
    env: {
      VITE_SUPABASE_URL: (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_URL : undefined) || undefined,
      VITE_SUPABASE_ANON_KEY: (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_ANON_KEY : undefined) || undefined,
    },
    user,
  });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useStore(themeStore);
  const navigation = useNavigation();
  const isNavigating = navigation.state !== 'idle';
  const location = useLocation();
  const hideGlobalBackground = location.pathname.startsWith('/sign-in') || location.pathname.startsWith('/signup');

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen text-gray-200 overflow-hidden">
      {/* Top route progress bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: isNavigating ? 2 : 0,
          backgroundColor: '#66ffb2',
          boxShadow: isNavigating ? '0 0 12px rgba(102,255,178,0.5)' : 'none',
          transition: 'height 180ms ease, opacity 180ms ease',
          opacity: isNavigating ? 1 : 0,
          zIndex: 1000,
        }}
      />

      {!hideGlobalBackground && (
        <div className="app-bg-layers">
          <div className="gradient-background" />
          <div className="glow-overlay" />
          <div className="diffusion-layer" />
          <div className="shimmer-layer" />
          <div className="grain-texture" />
          <div className="vignette" />
        </div>
      )}

      {/* Foreground content */}
      <div className="relative z-10">
        <ClientOnly>{() => <DndProvider backend={HTML5Backend}>{children}</DndProvider>}</ClientOnly>
      </div>

      <ToastContainer
        closeButton={({ closeToast }) => {
          return (
            <button className="Toastify__close-button" onClick={closeToast}>
              <div className="i-ph:x text-lg" />
            </button>
          );
        }}
        icon={({ type }) => {
          switch (type) {
            case 'success': {
              return <div className="i-ph:check-bold text-bolt-elements-icon-success text-2xl" />;
            }
            case 'error': {
              return <div className="i-ph:warning-circle-bold text-bolt-elements-icon-error text-2xl" />;
            }
          }

          return undefined;
        }}
        position="top-left"
        pauseOnFocusLoss
        transition={toastAnimation}
        autoClose={3000}
        style={{ top: 'calc(var(--header-height) + 8px)', left: '12px' }}
      />
      <ScrollRestoration />
      <Scripts />
    </div>
  );
}

import { logStore } from './lib/stores/logs';

function App() {
  const theme = useStore(themeStore);
  const { env, user } = useLoaderData<typeof loader>();

  useEffect(() => {
    logStore.logSystem('Application initialized', {
      theme,
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });

    // Initialize debug logging with improved error handling
    import('./utils/debugLogger')
      .then(({ debugLogger }) => {
        /*
         * The debug logger initializes itself and starts disabled by default
         * It will only start capturing when enableDebugMode() is called
         */
        const status = debugLogger.getStatus();
        logStore.logSystem('Debug logging ready', {
          initialized: status.initialized,
          capturing: status.capturing,
          enabled: status.enabled,
        });
      })
      .catch((error) => {
        logStore.logError('Failed to initialize debug logging', error);
      });
  }, []);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(env)}`,
        }}
      />
      <SupabaseProvider serverSession={user ?? null}>
        <Layout>
          <Outlet />
        </Layout>
      </SupabaseProvider>
    </>
  );
}

export default App;

// Standard error boundary

export function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-container">
        <h1>Error: {error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }
  
  return (
    <div className="error-container">
      <h1>Something went wrong</h1>
      <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
    </div>
  );
}
