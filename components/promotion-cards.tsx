import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const promotions = [
  {
    id: 1,
    title: "Weekend Brunch Special",
    description: "20% off breakfast on weekends at participating restaurants in Sydney.",
    link: "/promotions/weekend-brunch",
  },
  {
    id: 2,
    title: "Date Night Dinner",
    description: "Special course menu for two with wine pairing.",
    link: "/promotions/date-night",
  },
  {
    id: 3,
    title: "Group Booking Offer",
    description: "Free dessert for groups of 6 or more.",
    link: "/promotions/group-booking",
  },
]

export function PromotionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {promotions.map((promo) => (
        <div
          key={promo.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700"
        >
          <div className="relative h-48">
            <Image
              src={`/placeholder.svg?height=200&width=400&text=${promo.title}`}
              alt={promo.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-bold mb-2 dark:text-white">{promo.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{promo.description}</p>
            <Button className="w-full bg-tablecheck-red hover:bg-red-700 text-white" asChild>
              <Link href={promo.link}>View Details</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

