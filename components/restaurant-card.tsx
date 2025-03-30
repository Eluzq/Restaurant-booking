"use client"

import Image from "next/image"
import Link from "next/link"
import { StarRating } from "@/components/star-rating"
import type { GooglePlaceResult } from "@/lib/google-places-api"
import { MapPin, Clock } from "lucide-react"

interface RestaurantCardProps {
  restaurant: GooglePlaceResult
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  // Convert Google price_level to $ symbols
  const priceLevel = restaurant.price_level !== undefined ? "$".repeat(restaurant.price_level + 1) : ""

  // Get the first photo or use a placeholder
  const photoUrl =
    restaurant.photos && restaurant.photos.length > 0
      ? `/api/places/photo?reference=${restaurant.photos[0].photo_reference}&maxwidth=400`
      : `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(restaurant.name)}`

  // Get primary category
  const primaryCategory =
    restaurant.types.filter(
      (type) => !["restaurant", "food", "establishment", "point_of_interest"].includes(type),
    )[0] || "Restaurant"

  // Format category name
  const formattedCategory = primaryCategory
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="tablecheck-card hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/restaurants/${restaurant.place_id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={photoUrl || "/placeholder.svg"}
            alt={restaurant.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {priceLevel && (
            <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm font-medium dark:text-white">
              {priceLevel}
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-bold line-clamp-1 dark:text-white">{restaurant.name}</h3>
            <div className="flex items-center ml-2">
              <StarRating rating={restaurant.rating || 0} />
            </div>
          </div>

          <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-300">
            <span className="mr-2">{formattedCategory}</span>
            {restaurant.user_ratings_total && (
              <span className="text-gray-500 dark:text-gray-400">({restaurant.user_ratings_total} reviews)</span>
            )}
          </div>

          <div className="mt-3 flex items-start text-sm text-gray-600 dark:text-gray-300">
            <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
            <p className="line-clamp-2">{restaurant.vicinity}</p>
          </div>

          <div className="mt-2 flex items-center text-sm">
            <Clock className="h-4 w-4 mr-1 flex-shrink-0 dark:text-gray-300" />
            {restaurant.opening_hours?.open_now ? (
              <span className="text-green-600 dark:text-green-400 font-medium">Open Now</span>
            ) : (
              <span className="text-red-600 dark:text-red-400">Closed</span>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button className="w-full bg-tablecheck-red hover:bg-red-700 text-white font-medium py-2 rounded text-center transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

