'use client'

import { usePathname } from 'next/navigation'

/**
 * Shown only when Draft Mode is active (inside the Presentation Tool iframe).
 * Uses usePathname() so "Exit preview" redirects back to the *current* page,
 * not always to "/" which is what happens when window is accessed in RSC.
 */
export default function ExitPreviewBanner() {
  const pathname = usePathname()

  return (
    <a
      href={`/api/draft-mode/disable?redirect=${encodeURIComponent(pathname)}`}
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 9999,
        background: '#b91c1c',
        color: '#fff',
        fontFamily: 'sans-serif',
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        textDecoration: 'none',
      }}
    >
      Exit preview
    </a>
  )
}
