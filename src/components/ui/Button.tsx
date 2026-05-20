import { type ReactNode } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
  className?: string
  ariaLabel?: string
  target?: string
  rel?: string
}

export default function Button({ variant = 'primary', href, onClick, type = 'button', children, className = '', ariaLabel, target, rel }: ButtonProps) {
  const base =
    'motion-control inline-flex min-h-11 items-center justify-center rounded-full border-2 px-6 py-3 font-body text-sm font-black uppercase leading-none tracking-[0.06em] cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50'

  const variants = {
    primary:
      'border-earth-red bg-earth-red !text-white shadow-[0_1px_0_rgba(36,36,36,0.18)] hover:border-[#a80a12] hover:bg-[#a80a12] hover:!text-white active:border-[#7f080e] active:bg-[#7f080e] active:!text-white',
    secondary:
      'border-ink bg-white text-ink shadow-[0_1px_0_rgba(36,36,36,0.12)] hover:border-ink hover:bg-cream hover:text-ink active:border-black active:bg-black active:text-white',
    tertiary:
      'border-transparent bg-transparent px-0 text-ink underline decoration-current decoration-2 underline-offset-4 hover:text-earth-red active:text-black',
  }

  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel} target={target} rel={rel}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={cls} aria-label={ariaLabel} type={type}>
      {children}
    </button>
  )
}
