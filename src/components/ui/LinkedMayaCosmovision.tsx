import type { ReactNode } from 'react'

interface Props {
  text: string
}

export default function LinkedMayaCosmovision({ text }: Props) {
  const phrase = 'Maya Cosmovision'

  if (!text.includes(phrase)) {
    return text
  }

  const parts = text.split(phrase)

  return parts.reduce<ReactNode[]>((nodes, part, index) => {
    if (part) {
      nodes.push(part)
    }

    if (index < parts.length - 1) {
      nodes.push(
        <a
          key={`${phrase}-${index}`}
          href="/maya-cosmovision"
          className="motion-link font-bold text-earth-red underline decoration-current decoration-2 underline-offset-4 hover:text-ink active:text-black focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          {phrase}
        </a>,
      )
    }

    return nodes
  }, [])
}
