import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

/**
 * Draft Mode disable route.
 * Editors can call GET /api/draft-mode/disable?redirect=/ to exit preview and
 * return to the published site. Used by the "Exit preview" banner in layout.tsx.
 */
export async function GET(request: NextRequest) {
  ;(await draftMode()).disable()
  const to = request.nextUrl.searchParams.get('redirect') ?? '/'
  redirect(to)
}
