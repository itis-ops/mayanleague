'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'

const copy = {
  en: {
    kicker: 'Private preview',
    title: 'Enter preview password',
    passwordLabel: 'Password',
    submit: 'Continue',
    submitting: 'Checking…',
    error: 'That password did not work. Please try again.',
    networkError: 'Something went wrong. Please try again.',
  },
  es: {
    kicker: 'Vista previa privada',
    title: 'Ingrese la contraseña de vista previa',
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
    <div className="min-h-screen bg-mist px-5 py-10 text-ink sm:px-8 sm:py-16">
      <div className="mx-auto w-full max-w-[30rem]">
        <div className="mb-7 flex items-start justify-between gap-4 sm:mb-8">
          <div className="flex items-center gap-3">
            <img
              src="/brand/mayan-league-logo.png"
              alt="The International Mayan League"
              className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            />
            <div>
              <p className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-earth-red/75">
                The International Mayan League
              </p>
              <p className="font-body text-xs text-ink/55">IML Secure Access</p>
            </div>
          </div>
          <div className="flex gap-2 text-sm">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={lang === 'en' ? 'font-semibold text-ink' : 'text-ink/55'}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
            <span className="text-ink/30" aria-hidden>
              |
            </span>
            <button
              type="button"
              onClick={() => setLang('es')}
              className={lang === 'es' ? 'font-semibold text-ink' : 'text-ink/55'}
              aria-pressed={lang === 'es'}
            >
              ES
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-cream-dark/80 bg-white p-6 shadow-[0_12px_36px_rgba(36,36,36,0.08)] sm:p-8">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-earth-red/70">
            {t.kicker}
          </p>
          <h1 className="mt-3 font-display text-[clamp(1.75rem,4.6vw,2.2rem)] font-semibold uppercase leading-[0.98] text-ink">
            {t.title}
          </h1>
          <form className="mt-7 space-y-4 border-t border-cream-dark pt-6" onSubmit={handleSubmit}>
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
                className="w-full rounded-xl border border-cream-dark bg-white px-4 py-3 font-body text-base text-ink outline-none ring-earth-red/20 transition focus:border-earth-red/45 focus:ring-2"
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
              className="w-full rounded-full bg-earth-red px-4 py-3 font-body text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-[#a80a12] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </form>
        </div>

        <p className="mt-5 text-right font-body text-[0.69rem] tracking-[0.03em] text-ink/42">
          I am of service. Byron Escobar 2026. Chjonte
        </p>
      </div>
    </div>
  )
}
