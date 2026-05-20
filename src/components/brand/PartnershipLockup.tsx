type PartnershipLockupProps = {
  label: string
  className?: string
}

export default function PartnershipLockup({ label, className = '' }: PartnershipLockupProps) {
  return (
    <figure
      className={`flex items-center gap-5 sm:gap-6 ${className}`.trim()}
      aria-label={label}
    >
      <img
        src="/brand/un-emblem.svg"
        alt=""
        className="h-14 w-[4.85rem] shrink-0 object-contain opacity-95 [filter:brightness(0)_invert(1)] sm:h-16 sm:w-[5.5rem]"
      />
      <span className="h-12 w-px shrink-0 bg-cream/22" aria-hidden="true" />
      <img
        src="/brand/mayan-league-logo.png"
        alt=""
        className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
      />
    </figure>
  )
}
