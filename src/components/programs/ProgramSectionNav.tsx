'use client'

interface ProgramSectionNavLink {
  label: string
  title: string
}

interface ProgramSectionNavProps {
  sections: ProgramSectionNavLink[]
  ariaLabel: string
  getSectionId: (index: number) => string
}

export default function ProgramSectionNav({
  sections,
  ariaLabel,
  getSectionId,
}: ProgramSectionNavProps) {
  return (
    <div className="sticky top-[128px] z-20 -mx-7 border-b border-cream-dark bg-white/95 py-3 backdrop-blur-sm sm:-mx-10 lg:top-[116px] lg:-mx-14 xl:top-[168px]">
      <nav
        aria-label={ariaLabel}
        className="flex gap-2 overflow-x-auto overscroll-x-contain pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {sections.map((section, index) => (
          <a
            key={section.title}
            href={`#${getSectionId(index)}`}
            title={section.title}
            className="motion-control inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-cream-dark bg-white px-4 py-2 font-body text-xs font-black uppercase leading-none tracking-[0.06em] text-ink/62 hover:border-earth-red hover:bg-cream hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span className="text-earth-red">{section.label}</span>
            <span aria-hidden="true" className="hidden text-ink/30 sm:inline">
              ·
            </span>
            <span className="hidden max-w-[18ch] truncate sm:inline normal-case tracking-normal text-ink/72">
              {section.title}
            </span>
          </a>
        ))}
      </nav>
    </div>
  )
}
