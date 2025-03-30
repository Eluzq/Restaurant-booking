import Link from "next/link"
import Image from "next/image"

const cuisines = [
  { name: "Japanese", query: "Japanese" },
  { name: "Italian", query: "Italian" },
  { name: "Chinese", query: "Chinese" },
  { name: "French", query: "French" },
  { name: "Steak", query: "Steak" },
  { name: "Seafood", query: "Seafood" },
]

export function CuisineSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cuisines.map((cuisine) => (
        <Link key={cuisine.name} href={`/search?query=${cuisine.query}&location=Sydney`} className="group">
          <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="relative h-20 w-20 mb-3">
              <Image
                src={`/placeholder.svg?height=120&width=120&text=${cuisine.name}`}
                alt={cuisine.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <span className="text-center font-medium group-hover:text-tablecheck-red transition-colors dark:text-white">
              {cuisine.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

