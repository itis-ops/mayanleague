'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'

const copy = {
  en: {
    kicker: 'Private preview',
    title: 'Enter preview password',
    description:
      'This draft site is password-protected. Enter the password shared with you by the Mayan League preview team.',
    passwordLabel: 'Password',
    submit: 'Continue',
    submitting: 'Checking…',
    error: 'That password did not work. Please try again.',
    networkError: 'Something went wrong. Please try again.',
  },
  es: {
    kicker: 'Vista previa privada',
    title: 'Ingrese la contraseña de vista previa',
    description:
      'Este sitio borrador está protegido con contraseña. Ingrese la contraseña que le compartió el equipo de vista previa de la Liga Maya.',
    passwordLabel: 'Contraseña',
    submit: 'Continuar',
    submitting: 'Verificando…',
    error: 'Esa contraseña no funcionó. Inténtelo de nuevo.',
    networkError: 'Algo salió mal. Inténtelo de nuevo.',
  },
} as const

type Lang = keyof typeof copy

export default function PreviewLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [lang, setLang] = useState<Lang>('en')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const t = copy[lang]
  const redirectTo = searchParams.get('from') || '/'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/preview-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        setError(t.error)
        return
      }

      router.replace(redirectTo)
      router.refresh()
    } catch {
      setError(t.networkError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-mist px-6 py-16 text-ink">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 flex items-center justify-between gap-4">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            International Mayan League
          </p>
          <div className="flex gap-2 text-sm">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={lang === 'en' ? 'font-semibold text-ink' : 'text-forest'}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
            <span className="text-cream-dark" aria-hidden>
              |
            </span>
            <button
              type="button"
              onClick={() => setLang('es')}
              className={lang === 'es' ? 'font-semibold text-ink' : 'text-forest'}
              aria-pressed={lang === 'es'}
            >
              ES
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-cream-dark bg-cream p-8 shadow-sm">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-jade">
            {t.kicker}
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold uppercase leading-tight text-ink">
            {t.title}
          </h1>
          <p className="mt-4 font-body text-sm leading-relaxed text-forest">{t.description}</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block font-body text-sm font-medium text-ink">
                {t.passwordLabel}
              </span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-cream-dark bg-white px-4 py-3 font-body text-base text-ink outline-none ring-gold/30 focus:ring-2"
              />
            </label>

            {error ? (
              <p className="font-body text-sm text-earth-red" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-gold px-4 py-3 font-display text-sm font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
