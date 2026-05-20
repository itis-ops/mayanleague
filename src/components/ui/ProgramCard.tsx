import MayaNumber from '@/components/ui/MayaNumber'
import Button from '@/components/ui/Button'

interface ProgramIcon {
  index: number
}

function ProgramIcon({ index }: ProgramIcon) {
  const icons = [
    // Maya Cosmovision — sun/kin cross
    <svg key={0} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="4" fill="currentColor" />
      <line x1="14" y1="2" x2="14" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="20" x2="14" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="14" x2="8" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="5.5" y1="5.5" x2="9.5" y2="9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18.5" y1="18.5" x2="22.5" y2="22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22.5" y1="5.5" x2="18.5" y2="9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5.5" y1="22.5" x2="9.5" y2="18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>,
    // Human Rights — raised hand
    <svg key={1} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20V10a2 2 0 0 1 4 0v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 15V9a2 2 0 0 1 4 0v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 15v-2a2 2 0 0 1 4 0v5c0 3.866-3.134 7-7 7H12c-2 0-3.5-1.5-5-3l-2-2a2 2 0 0 1 2.828-2.828L9 18.17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 10V7a2 2 0 0 1 4 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>,
    // Environmental — ceiba tree
    <svg key={2} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="14" y1="26" x2="14" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 18 Q8 16 6 10 Q10 12 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M14 14 Q20 12 22 6 Q18 9 14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M14 22 Q9 20 7 15 Q11 17 14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M14 18 Q19 16 21 11 Q17 14 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <ellipse cx="14" cy="6" rx="5" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="10" y1="26" x2="18" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>,
    // Immigration — two figures / path
    <svg key={3} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 26v-8a4 4 0 0 1 8 0v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="21" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M17 26v-6a4 4 0 0 1 8 0v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 14 L15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 2" />
    </svg>,
    // Maya Women — profile with headdress
    <svg key={4} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="11" r="5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 26c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 6 Q14 2 18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M11 4 Q14 1 17 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <circle cx="14" cy="1.5" r="1.5" fill="currentColor" />
    </svg>,
    // Ancestral Wisdom — conch / spiral
    <svg key={5} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 14 Q14 8 20 8 Q26 8 26 14 Q26 22 14 22 Q4 22 4 14 Q4 6 14 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M14 14 Q14 10 18 10 Q22 10 22 14 Q22 19 14 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M14 14 Q14 12 16 12 Q18 12 18 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
    </svg>,
  ]

  return icons[index] || icons[0]
}

interface Props {
  name: string
  description: string
  learnMore: string
  index: number
  href?: string
}

export default function ProgramCard({ name, description, learnMore, index, href = '/programs' }: Props) {
  return (
    <article className="group motion-card h-full border border-cream-dark bg-white p-1.5 hover:bg-cream">
      <div className="flex h-full min-h-96 flex-col gap-6 bg-white p-7 group-hover:bg-cream">
        <div className="motion-control flex h-14 w-14 items-center justify-center rounded-full bg-earth-red text-white group-hover:bg-ink" aria-hidden="true">
          <ProgramIcon index={index} />
        </div>
        <div className="flex flex-1 flex-col">
          <h3 className="type-section mb-5 text-[clamp(1.85rem,2.6vw,2.45rem)] text-ink group-hover:text-earth-red">
            {href === '/maya-cosmovision' ? (
              <a
                href={href}
                className="motion-link rounded-sm hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {name}
              </a>
            ) : (
              name
            )}
          </h3>
          <p className="type-body flex-1 border-t border-cream-dark pt-5 text-[1.05rem] leading-8 text-ink/74">
            {description}
          </p>
          <div className="mt-auto flex min-h-11 items-center justify-between gap-6 pt-8">
            <Button
              href={href}
              variant="secondary"
              ariaLabel={`${learnMore}: ${name}`}
              className="w-fit shrink-0 whitespace-nowrap"
            >
              {learnMore}
            </Button>
            <MayaNumber value={index + 1} className="shrink-0 scale-75 origin-bottom-right text-earth-red" />
          </div>
        </div>
      </div>
    </article>
  )
}
