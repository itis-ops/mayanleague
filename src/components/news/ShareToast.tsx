'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ShareToastProps {
  message: string | null
}

export default function ShareToast({ message }: ShareToastProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!message) {
      setVisible(false)
      return
    }

    setVisible(true)
    const hideTimer = window.setTimeout(() => setVisible(false), 2200)
    return () => window.clearTimeout(hideTimer)
  }, [message])

  if (!mounted || !message) return null

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className={[
        'pointer-events-none fixed inset-x-0 bottom-6 z-[120] flex justify-center px-4',
        'transition-[opacity,transform] duration-[220ms] ease-[var(--ease-emil)]',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
      ].join(' ')}
    >
      <p className="rounded-full border border-cream-dark bg-ink px-4 py-2 font-body text-sm font-semibold text-white shadow-[0_12px_32px_rgba(36,36,36,0.18)]">
        {message}
      </p>
    </div>,
    document.body,
  )
}
