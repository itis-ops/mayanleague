/** Cookie set after a successful preview-login. */
export const PREVIEW_ACCESS_COOKIE = 'ml_preview_access'

/** Routes that stay reachable without the preview cookie. */
export const PREVIEW_PUBLIC_PATHS = ['/preview-login', '/api/preview-auth'] as const

export function isPreviewAccessEnabled(): boolean {
  const password = process.env.PREVIEW_ACCESS_PASSWORD?.trim()
  const token = process.env.PREVIEW_ACCESS_TOKEN?.trim()
  return Boolean(password && token)
}

export function isPreviewPublicPath(pathname: string): boolean {
  return PREVIEW_PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  )
}

export function isStaticAssetPath(pathname: string): boolean {
  return (
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    /\.(?:ico|png|jpg|jpeg|svg|webp|woff2?|txt|xml)$/i.test(pathname)
  )
}

/** OG / story cards must stay public for share previews and social crawlers. */
export function isPreviewShareAssetPath(pathname: string): boolean {
  return (
    /\/news\/[^/]+\/opengraph-image\/?$/i.test(pathname) ||
    /\/news\/[^/]+\/instagram-story-image\/?$/i.test(pathname)
  )
}

export function hasValidPreviewCookie(cookieValue: string | undefined): boolean {
  const token = process.env.PREVIEW_ACCESS_TOKEN?.trim()
  if (!token || !cookieValue) return false
  return cookieValue === token
}
