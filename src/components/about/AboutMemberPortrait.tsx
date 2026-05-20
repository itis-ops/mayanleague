import { aboutPersonInitials } from '@/lib/parseAboutPersonTitle'

interface AboutMemberPortraitProps {
  name: string
  role: string
  image?: string
}

export default function AboutMemberPortrait({ name, role, image }: AboutMemberPortraitProps) {
  const initials = aboutPersonInitials(name)

  return (
    <div className="rounded-full bg-cream p-2.5 shadow-[0_1px_0_rgba(36,36,36,0.12)]">
      {image ? (
        <img
          src={image}
          alt={`${name}, ${role}`}
          className="aspect-square w-full rounded-full border-[6px] border-white object-cover grayscale"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center rounded-full border-[6px] border-white bg-mist font-accent text-[clamp(2rem,5vw,2.75rem)] tracking-tight text-earth-red/75">
          <span className="sr-only">{name}</span>
          {initials}
        </div>
      )}
    </div>
  )
}
