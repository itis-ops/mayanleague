import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  hasValidPreviewCookie,
  isPreviewAccessEnabled,
  isPreviewPublicPath,
  isPreviewShareAssetPath,
  isStaticAssetPath,
  PREVIEW_ACCESS_COOKIE,
} from '@/lib/previewAccess'

export function middleware(request: NextRequest) {
  if (!isPreviewAccessEnabled()) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  if (isPreviewPublicPath(pathname) || isStaticAssetPath(pathname) || isPreviewShareAssetPath(pathname)) {
    return NextResponse.next()
  }

  const cookie = request.cookies.get(PREVIEW_ACCESS_COOKIE)?.value
  if (hasValidPreviewCookie(cookie)) {
    return NextResponse.next()
  }

  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = '/preview-login'
  loginUrl.search = ''
  if (pathname !== '/') {
    loginUrl.searchParams.set('from', pathname)
  }

  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
