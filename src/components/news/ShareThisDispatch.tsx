'use client'

import { useEffect, useState } from 'react'
import { hubArticleBleedClass, hubArticleBleedInnerClass } from '@/lib/editorialLayout'
import { useLanguage } from '@/hooks/useLanguage'
import {
  copyTextToClipboard,
  getCachedShareFile,
  getEmailShareUrl,
  getFacebookShareUrl,
  getWhatsAppShareUrl,
  getXShareUrl,
  isMobileWebShareContext,
  preloadShareImage,
  shareCardImage,
  shouldPreferNativeShareSheet,
  type ShareChannel,
} from '@/lib/shareDispatch'
import ShareToast from '@/components/news/ShareToast'

interface ShareThisDispatchProps {
  title: string
  text: string
  url: string
  hashtags: string[]
  shareImageUrl: string
  storyImageUrl: string
  className?: string
}

interface IconProps {
  className?: string
}

const iconClass = 'h-4 w-4'
const DISPATCH_CARD_FILENAME = 'iml-dispatch-card.png'
const STORY_CARD_FILENAME = 'iml-dispatch-story.png'

function CopyIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 8.5h9.5v11H8z" />
      <path d="M5.5 15.5h-1v-11H14v1" />
    </svg>
  )
}

function NativeShareIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 15V4" />
      <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
      <path d="M6 13v6h12v-6" />
    </svg>
  )
}

function XIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M14.3 10.4 22.2 1h-1.9l-6.9 8.2L7.9 1H1.6l8.3 12.1L1.6 23h1.9l7.2-8.6 5.8 8.6h6.3l-8.5-12.6Zm-2.6 3.1-.8-1.2L4.2 2.4H7l5.4 7.9.8 1.2 7 10.2h-2.8l-5.7-8.2Z" />
    </svg>
  )
}

function FacebookIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M14 8.3V6.7c0-.8.3-1.2 1.3-1.2H17V2.3c-.8-.1-1.7-.2-2.5-.2-2.6 0-4.4 1.6-4.4 4.5v1.7H7.2V12h2.9v9.9H14V12h2.8l.5-3.7H14Z" />
    </svg>
  )
}

function InstagramIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.7" />
      <circle cx="17.3" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WhatsAppIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.08-1.35A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm4.93 13.57c-.2.56-.98 1.03-1.62 1.16-.43.09-.99.16-2.88-.62-2.42-.98-3.97-3.43-4.09-3.59-.12-.16-.97-1.3-.97-2.47 0-1.18.61-1.76.83-2 .22-.24.48-.3.64-.3h.46c.15 0 .35-.06.54.41.2.48.68 1.67.74 1.79.06.12.1.27.02.43-.08.17-.12.27-.24.41-.12.14-.25.31-.36.42-.12.12-.24.25-.1.49.14.24.62.99 1.33 1.6.91.8 1.68 1.05 1.92 1.17.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.14Z" />
    </svg>
  )
}

function EmailIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <path d="m2.5 7 9.5 7 9.5-7" />
    </svg>
  )
}

function iconButtonClass(isActive = false, isLoading = false) {
  return [
    'motion-control inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-ink',
    'hover:border-earth-red hover:bg-earth-red hover:text-white active:border-[#a80a12] active:bg-[#a80a12]',
    'focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold',
    'disabled:pointer-events-none disabled:opacity-60',
    isActive || isLoading ? 'border-earth-red bg-earth-red text-white' : 'border-cream-dark bg-white',
  ].join(' ')
}

export default function ShareThisDispatch({
  title,
  text,
  url,
  hashtags,
  shareImageUrl,
  storyImageUrl,
  className = '',
}: ShareThisDispatchProps) {
  const { lang } = useLanguage()
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle')
  const [activeChannel, setActiveChannel] = useState<ShareChannel | null>(null)
  const [statusMessage, setStatusMessage] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastKey, setToastKey] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(isMobileWebShareContext())
  }, [])

  const copy =
    lang === 'es'
      ? {
          section: 'Comparte este despacho',
          options: 'Opciones para compartir',
          copyLink: 'Copiar enlace',
          copied: 'Copiado',
          linkCopied: 'Enlace copiado',
          nativeShare: 'Compartir enlace desde este dispositivo',
          shareOn: 'Compartir en',
          shareCardOn: 'Compartir tarjeta en',
          preparing: 'Preparando tarjeta…',
          chooseInstagram: 'Elige Instagram en el menú para compartir en Stories.',
          instagramDesktop: 'Abre Instagram en tu teléfono para compartir en Stories.',
          chooseX: 'Publicando en X…',
          chooseFacebook: 'Abriendo Facebook…',
          downloaded: 'Tarjeta descargada. Adjúntala en la app para compartir.',
          shareFailed: 'No se pudo compartir. Inténtalo de nuevo.',
          shareWhatsApp: 'Compartir en WhatsApp',
          shareEmail: 'Enviar por correo',
        }
      : {
          section: 'Share this dispatch',
          options: 'Share options',
          copyLink: 'Copy link',
          copied: 'Copied',
          linkCopied: 'Link copied',
          nativeShare: 'Share link from this device',
          shareOn: 'Share on',
          shareCardOn: 'Share card on',
          preparing: 'Preparing card…',
          chooseInstagram: 'Choose Instagram in the share menu to post to Stories.',
          instagramDesktop: 'Open Instagram on your phone to share to Stories.',
          chooseX: 'Opening X…',
          chooseFacebook: 'Opening Facebook…',
          downloaded: 'Card downloaded. Attach it in the app to share.',
          shareFailed: 'Could not share. Try again.',
          shareWhatsApp: 'Share on WhatsApp',
          shareEmail: 'Share by email',
        }

  const channelConfig: Record<
    ShareChannel,
    { imageUrl: string; filename: string; chooseApp: string }
  > = {
    instagram: {
      imageUrl: storyImageUrl,
      filename: STORY_CARD_FILENAME,
      chooseApp: copy.chooseInstagram,
    },
    x: {
      imageUrl: shareImageUrl,
      filename: DISPATCH_CARD_FILENAME,
      chooseApp: copy.chooseX,
    },
    facebook: {
      imageUrl: shareImageUrl,
      filename: DISPATCH_CARD_FILENAME,
      chooseApp: copy.chooseFacebook,
    },
  }

  function showToast(message: string) {
    setToastKey((current) => current + 1)
    setToastMessage(message)
  }

  async function copyLink() {
    await copyTextToClipboard(url)
    setCopyState('copied')
    showToast(copy.linkCopied)
    window.setTimeout(() => setCopyState('idle'), 1800)
  }

  useEffect(() => {
    void preloadShareImage(storyImageUrl, STORY_CARD_FILENAME).catch(() => {})
    void preloadShareImage(shareImageUrl, DISPATCH_CARD_FILENAME).catch(() => {})
  }, [storyImageUrl, shareImageUrl])

  async function nativeShare() {
    try {
      if (shouldPreferNativeShareSheet()) {
        await navigator.share({ title, text, url })
        return
      }
      await copyLink()
    } catch {
      // User cancelled native share.
    }
  }

  async function shareCard(channel: ShareChannel) {
    const config = channelConfig[channel]

    // On desktop, open web-based share URLs directly — no card download needed.
    if (!isMobile) {
      if (channel === 'x') {
        window.open(getXShareUrl(text, url, hashtags), '_blank', 'noopener,noreferrer')
        return
      }
      if (channel === 'facebook') {
        window.open(getFacebookShareUrl(url), '_blank', 'noopener,noreferrer')
        return
      }
      if (channel === 'instagram') {
        setStatusMessage(copy.instagramDesktop)
        window.setTimeout(() => setStatusMessage(''), 4000)
        return
      }
    }

    setActiveChannel(channel)
    try {
      const cachedFile = getCachedShareFile(config.imageUrl, config.filename)
      if (!cachedFile) {
        setStatusMessage(copy.preparing)
      }

      const result = await shareCardImage(config.imageUrl, config.filename, cachedFile, {
        title,
        text,
        url,
      })

      if (result === 'shared') {
        setStatusMessage(config.chooseApp)
        window.setTimeout(() => setStatusMessage(''), 3500)
        return
      }

      if (result === 'downloaded') {
        setStatusMessage(copy.downloaded)
        window.setTimeout(() => setStatusMessage(''), 4000)
        return
      }

      setStatusMessage('')
    } catch {
      setStatusMessage(copy.shareFailed)
      window.setTimeout(() => setStatusMessage(''), 4000)
    } finally {
      setActiveChannel(null)
    }
  }

  return (
    <>
      <section className={`bg-white ${hubArticleBleedClass} ${className}`} aria-label={copy.section}>
        <div className={`border-y border-cream-dark py-4 ${hubArticleBleedInnerClass}`}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="type-kicker text-earth-red">{copy.section}</p>
              {statusMessage ? (
                <p className="type-body mt-2 text-sm text-ink/62" aria-live="polite">
                  {statusMessage}
                </p>
              ) : null}
            </div>

            <div
              className="flex max-w-full items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="group"
              aria-label={copy.options}
            >
              {/* Copy link */}
              <button
                type="button"
                onClick={copyLink}
                aria-label={copyState === 'copied' ? copy.linkCopied : copy.copyLink}
                aria-live="polite"
                title={copyState === 'copied' ? copy.copied : copy.copyLink}
                className={iconButtonClass(copyState === 'copied')}
              >
                <CopyIcon />
              </button>

              {/* Native share (mobile) */}
              <button
                type="button"
                onClick={nativeShare}
                aria-label={copy.nativeShare}
                title={copy.nativeShare}
                className={iconButtonClass()}
              >
                <NativeShareIcon />
              </button>

              {/* WhatsApp */}
              <a
                href={getWhatsAppShareUrl(text, url)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={copy.shareWhatsApp}
                title="WhatsApp"
                className={iconButtonClass()}
              >
                <WhatsAppIcon />
              </a>

              {/* Email */}
              <a
                href={getEmailShareUrl(title, text, url)}
                aria-label={copy.shareEmail}
                title={copy.shareEmail}
                className={iconButtonClass()}
              >
                <EmailIcon />
              </a>

              {/* Instagram */}
              <button
                type="button"
                onClick={() => shareCard('instagram')}
                disabled={activeChannel !== null}
                aria-label={`${copy.shareCardOn} Instagram Stories`}
                title="Instagram Stories"
                className={iconButtonClass(false, activeChannel === 'instagram')}
              >
                <InstagramIcon />
              </button>

              {/* X / Twitter */}
              <button
                type="button"
                onClick={() => shareCard('x')}
                disabled={activeChannel !== null}
                aria-label={`${copy.shareOn} X`}
                title="X / Twitter"
                className={iconButtonClass(false, activeChannel === 'x')}
              >
                <XIcon />
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={() => shareCard('facebook')}
                disabled={activeChannel !== null}
                aria-label={`${copy.shareOn} Facebook`}
                title="Facebook"
                className={iconButtonClass(false, activeChannel === 'facebook')}
              >
                <FacebookIcon />
              </button>
            </div>
          </div>
        </div>
      </section>
      <ShareToast key={toastKey} message={toastMessage} />
    </>
  )
}
