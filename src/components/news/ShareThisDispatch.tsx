'use client'

import { useMemo, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'

interface ShareThisDispatchProps {
  title: string
  text: string
  url: string
  hashtags: string[]
  shareImageUrl: string
  storyImageUrl: string
  className?: string
}

function encode(value: string) {
  return encodeURIComponent(value)
}

interface IconProps {
  className?: string
}

const iconClass = 'h-4 w-4'

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

function DownloadIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 4v10" />
      <path d="m7.8 10.2 4.2 4.2 4.2-4.2" />
      <path d="M5 19h14" />
    </svg>
  )
}

function MoreIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
    </svg>
  )
}

function iconButtonClass(isActive = false) {
  return [
    'motion-control inline-flex h-11 w-11 items-center justify-center rounded-full border text-ink',
    'hover:border-earth-red hover:bg-earth-red hover:text-white active:border-[#a80a12] active:bg-[#a80a12]',
    'focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold',
    isActive ? 'border-earth-red bg-earth-red text-white' : 'border-cream-dark bg-white',
  ].join(' ')
}

export default function ShareThisDispatch({ title, text, url, hashtags, shareImageUrl, storyImageUrl, className = '' }: ShareThisDispatchProps) {
  const { lang } = useLanguage()
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const hashtagText = hashtags.map((tag) => tag.replace(/^#/, '')).join(',')
  const copy = lang === 'es'
    ? {
        section: 'Comparte este despacho',
        options: 'Opciones para compartir',
        copyLink: 'Copiar enlace',
        copied: 'Copiado',
        linkCopied: 'Enlace copiado',
        copiedLink: 'Enlace copiado',
        nativeShare: 'Compartir desde este dispositivo',
        shareOn: 'Compartir en',
        instagramStory: 'Tarjeta para Instagram Stories',
        downloadInstagramStory: 'Descargar tarjeta para Instagram Stories',
        moreOptions: 'Más opciones para compartir',
        more: 'Más',
        downloadFeed: 'Descargar tarjeta para feed',
      }
    : {
        section: 'Share this dispatch',
        options: 'Share options',
        copyLink: 'Copy link',
        copied: 'Copied',
        linkCopied: 'Link copied',
        copiedLink: 'Copied link',
        nativeShare: 'Share from this device',
        shareOn: 'Share on',
        instagramStory: 'Instagram Stories card',
        downloadInstagramStory: 'Download Instagram Stories share card',
        moreOptions: 'More share options',
        more: 'More',
        downloadFeed: 'Download feed card',
      }

  const links = useMemo(
    () => [
      {
        label: 'X / Twitter',
        href: `https://twitter.com/intent/tweet?text=${encode(text)}&url=${encode(url)}&hashtags=${encode(hashtagText)}`,
        icon: XIcon,
      },
      {
        label: 'Facebook',
        href: `https://www.facebook.com/sharer/sharer.php?u=${encode(url)}`,
        icon: FacebookIcon,
      },
    ],
    [hashtagText, text, url]
  )

  async function copyLink() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = url
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }

    setCopyState('copied')
    setIsMenuOpen(false)
    window.setTimeout(() => setCopyState('idle'), 1800)
  }

  async function nativeShare() {
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url })
        return
      }

      await copyLink()
    } catch {
      // Browsers throw when a user cancels native share; the visible UI can stay unchanged.
    }
  }

  return (
    <section className={`bg-white ${className}`}>
      <div className="relative flex flex-col items-center justify-center gap-4 border-y border-cream-dark px-5 py-4 sm:flex-row sm:justify-between sm:px-6">
        <p className="type-kicker text-earth-red">{copy.section}</p>

        <div className="flex max-w-full flex-wrap items-center justify-center gap-2" aria-label={copy.options}>
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

          <button
            type="button"
            onClick={nativeShare}
            aria-label={copy.nativeShare}
            title={copy.nativeShare}
            className={iconButtonClass()}
          >
            <NativeShareIcon />
          </button>

          {links.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${copy.shareOn} ${link.label}`}
                title={link.label}
                className={`${iconButtonClass()} hidden lg:inline-flex`}
              >
                <Icon />
              </a>
            )
          })}

          <a
            href={storyImageUrl}
            download
            aria-label={copy.downloadInstagramStory}
            title="Instagram Stories"
            className={iconButtonClass()}
          >
            <InstagramIcon />
          </a>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={copy.moreOptions}
              aria-expanded={isMenuOpen}
              title={copy.more}
              className={iconButtonClass(isMenuOpen)}
            >
              <MoreIcon />
            </button>

            {isMenuOpen ? (
              <div className="absolute right-1/2 top-12 z-20 w-[min(16rem,calc(100vw-2rem))] translate-x-1/2 border border-cream-dark bg-white p-2 shadow-[0_18px_48px_rgba(36,36,36,0.14)] sm:right-0 sm:translate-x-0">
                <button
                  type="button"
                  onClick={copyLink}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-left font-body text-sm font-semibold text-ink hover:bg-cream focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <CopyIcon />
                  {copyState === 'copied' ? copy.copiedLink : copy.copyLink}
                </button>
                <a
                  href={storyImageUrl}
                  download
                  className="flex items-center gap-3 px-3 py-2.5 font-body text-sm font-semibold text-ink hover:bg-cream focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <InstagramIcon />
                  {copy.instagramStory}
                </a>
                <a
                  href={shareImageUrl}
                  download
                  className="flex items-center gap-3 px-3 py-2.5 font-body text-sm font-semibold text-ink hover:bg-cream focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <DownloadIcon />
                  {copy.downloadFeed}
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
