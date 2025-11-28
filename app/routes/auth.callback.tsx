import { redirect, type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { getAuthUser } from '~/lib/auth/supabase-auth.server'

export async function loader(args: LoaderFunctionArgs) {
  const { user, headers } = await getAuthUser(args)
  const to = user ? '/' : '/?auth=signin'
  return redirect(to, { headers })
}

export default function AuthCallback() {
  return null
}
