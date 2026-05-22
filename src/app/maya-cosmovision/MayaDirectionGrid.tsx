interface Direction {
  name: string
  color: string
  swatchClass: string
}

interface MayaDirectionGridProps {
  directions: Direction[]
}

export default function MayaDirectionGrid({ directions }: MayaDirectionGridProps) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {directions.map((direction) => (
        <div key={direction.name} className="flex flex-col">
          <div
            className={`aspect-[5/3] ${direction.swatchClass}`}
            aria-hidden="true"
          />
          <div className="p-5 sm:p-6">
            <p className="type-kicker text-earth-red">{direction.name}</p>
            <p className="type-section mt-3 text-[clamp(1.35rem,2vw,1.85rem)] text-ink">
              {direction.color}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
