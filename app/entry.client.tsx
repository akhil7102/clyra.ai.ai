import { RemixBrowser } from '@remix-run/react';
import { startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';

startTransition(() => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Root element not found');
    return;
  }

  try {
    hydrateRoot(rootElement, <RemixBrowser />);
  } catch (error) {
    console.error('Hydration error:', error);
  }
});
