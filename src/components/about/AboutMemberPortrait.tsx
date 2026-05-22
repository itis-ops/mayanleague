import Image from 'next/image'
import { aboutPersonInitials } from '@/lib/parseAboutPersonTitle'

interface AboutMemberPortraitProps {
  name: string
  role: string
  image?: string
  priority?: boolean
}

export default function AboutMemberPortrait({ name, role, image, priority = false }: AboutMemberPortraitProps) {
  const initials = aboutPersonInitials(name)

  return (
    <div className="rounded-full border border-cream-dark bg-white p-3">
      {image ? (
        <Image
          src={image}
          alt={`${name}, ${role}`}
          width={512}
          height={512}
          sizes="(max-width: 640px) 184px, (max-width: 1024px) 224px, 256px"
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          className="aspect-square w-full rounded-full border-[7px] border-white object-cover grayscale"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center rounded-full border-[7px] border-cream-dark bg-white font-accent text-[clamp(2.4rem,6vw,3.25rem)] tracking-tight text-earth-red/75">
          <span className="sr-only">{name}</span>
          {initials}
        </div>
      )}
    </div>
  )
}
