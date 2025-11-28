import { type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function loader({ request }: LoaderFunctionArgs) {
  // Redirect to favicon.ico instead
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/favicon.ico',
    },
  });
}
