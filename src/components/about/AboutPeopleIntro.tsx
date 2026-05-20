interface AboutPeopleIntroProps {
  label?: string
  body: string
}

export default function AboutPeopleIntro({ label, body }: AboutPeopleIntroProps) {
  return (
    <div className="border-b border-cream-dark bg-white py-10 lg:py-12">
      {label ? <p className="type-kicker mb-5 text-earth-red">{label}</p> : null}
      <p className="max-w-[54ch] font-accent text-[clamp(1.35rem,2.1vw,1.85rem)] leading-[1.42] tracking-[-0.02em] text-ink/88">
        {body}
      </p>
    </div>
  )
}
