interface ResourceMetaBarProps {
  label: string
  detail: string
}

export default function ResourceMetaBar({ label, detail }: ResourceMetaBarProps) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-cream-dark px-7 py-3 sm:px-10 lg:px-14">
      <p className="type-kicker shrink-0 text-earth-red">{label}</p>
      <p className="type-kicker shrink-0 whitespace-nowrap text-ink/40">{detail}</p>
    </div>
  )
}
