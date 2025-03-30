import Link from "next/link"
import Image from "next/image"

const locations = [
  { name: "Sydney", location: "Sydney" },
  { name: "Melbourne", location: "Melbourne" },
  { name: "Brisbane", location: "Brisbane" },
  { name: "Perth", location: "Perth" },
]

export function LocationSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {locations.map((location) => (
        <Link key={location.name} href={`/search?location=${location.location}`} className="group">
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src={`/placeholder.svg?height=200&width=300&text=${location.location}`}
              alt={location.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-white text-xl font-bold">{location.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

