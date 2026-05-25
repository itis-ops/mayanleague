export type ShareChannel = 'instagram' | 'x' | 'facebook'

export type ShareCardResult = 'shared' | 'cancelled' | 'downloaded'

type ShareImageCacheEntry = {
  file: File
  loadedAt: number
}

const shareImageCache = new Map<string, ShareImageCacheEntry>()

export function encodeShareValue(value: string) {
  return encodeURIComponent(value)
}

function resolveShareImageUrl(imageUrl: string) {
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }

  if (typeof window !== 'undefined') {
    return new URL(imageUrl, window.location.origin).toString()
  }

  return imageUrl
}

export function canUseNativeShare() {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function'
}

export function isMobileWebShareContext() {
  if (typeof navigator === 'undefined') return false
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
}

export function isAndroidWebShareContext() {
  if (typeof navigator === 'undefined') return false
  return /Android/i.test(navigator.userAgent)
}

export function shouldPreferNativeShareSheet() {
  return canUseNativeShare() && isMobileWebShareContext()
}

function cacheKey(imageUrl: string, filename: string) {
  return `${resolveShareImageUrl(imageUrl)}::${filename}`
}

export function getCachedShareFile(imageUrl: string, filename = 'iml-dispatch.png') {
  return shareImageCache.get(cacheKey(imageUrl, filename))?.file ?? null
}

export async function preloadShareImage(imageUrl: string, filename = 'iml-dispatch.png') {
  const key = cacheKey(imageUrl, filename)
  if (shareImageCache.has(key)) return shareImageCache.get(key)!.file

  const file = await fetchShareImageBlob(imageUrl, filename)
  shareImageCache.set(key, { file, loadedAt: Date.now() })
  return file
}

export async function fetchShareImageBlob(imageUrl: string, filename = 'iml-dispatch.png') {
  const resolvedUrl = resolveShareImageUrl(imageUrl)
  const response = await fetch(resolvedUrl, {
    cache: 'force-cache',
    credentials: 'same-origin',
  })

  if (!response.ok) {
    throw new Error(`Unable to load share image (${response.status})`)
  }

  const blob = await response.blob()
  const type = blob.type && blob.type.startsWith('image/') ? blob.type : 'image/png'
  return new File([blob], filename, { type, lastModified: Date.now() })
}

function isShareAbort(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}

async function tryNativeShare(payload: ShareData) {
  try {
    await navigator.share(payload)
    return 'shared' as const
  } catch (error) {
    if (isShareAbort(error)) return 'cancelled' as const
    return 'failed' as const
  }
}

export async function copyTextToClipboard(value: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

export async function shareNativePayload(payload: ShareData) {
  if (!shouldPreferNativeShareSheet()) return false
  const result = await tryNativeShare(payload)
  return result === 'shared' || result === 'cancelled'
}

export async function shareCardFile(
  file: File,
  options?: { url?: string; text?: string; title?: string },
): Promise<ShareCardResult> {
  if (canUseNativeShare()) {
    const attempts: ShareData[] = [{ files: [file] }]

    if (isAndroidWebShareContext()) {
      attempts.push({ files: [file], title: options?.title ?? 'International Mayan League' })
    }

    if (options?.url || options?.text || options?.title) {
      attempts.push({
        files: [file],
        url: options.url,
        text: options.text,
        title: options.title,
      })
    }

    for (const payload of attempts) {
      const result = await tryNativeShare(payload)
      if (result === 'shared' || result === 'cancelled') return result
    }
  }

  await downloadShareFile(file)
  return 'downloaded'
}

export async function shareCardImage(
  imageUrl: string,
  filename: string,
  preloadedFile?: File | null,
  options?: { url?: string; text?: string; title?: string },
): Promise<ShareCardResult> {
  const file =
    preloadedFile ?? getCachedShareFile(imageUrl, filename) ?? (await fetchShareImageBlob(imageUrl, filename))

  return shareCardFile(file, options)
}

/** @deprecated Use shareCardImage instead */
export async function shareInstagramStoryImage(
  imageUrl: string,
  filename = 'iml-dispatch-story.png',
  preloadedFile?: File | null,
) {
  const result = await shareCardImage(imageUrl, filename, preloadedFile)
  return result === 'shared' || result === 'cancelled'
}

export async function downloadShareFile(file: File) {
  const objectUrl = URL.createObjectURL(file)
  const anchor = document.createElement('a')
  anchor.href = objectUrl
  anchor.download = file.name
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(objectUrl)
}

export async function downloadShareImage(imageUrl: string, filename = 'iml-dispatch.png') {
  const file = getCachedShareFile(imageUrl, filename) ?? (await fetchShareImageBlob(imageUrl, filename))
  await downloadShareFile(file)
}

export function getXShareUrl(text: string, url: string, hashtags: string[]) {
  const hashtagText = hashtags.map((tag) => tag.replace(/^#/, '')).join(',')
  return `https://twitter.com/intent/tweet?text=${encodeShareValue(text)}&url=${encodeShareValue(url)}&hashtags=${encodeShareValue(hashtagText)}`
}

export function getFacebookShareUrl(url: string) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeShareValue(url)}`
}

export function getInstagramStoryShareUrl() {
  return 'https://www.instagram.com/create/story'
}

export function getWhatsAppShareUrl(text: string, url: string) {
  const message = `${text}\n\n${url}`
  return `https://wa.me/?text=${encodeShareValue(message)}`
}

export function getEmailShareUrl(title: string, text: string, url: string) {
  const subject = encodeShareValue(title)
  const body = encodeShareValue(`${text}\n\n${url}`)
  return `mailto:?subject=${subject}&body=${body}`
}
