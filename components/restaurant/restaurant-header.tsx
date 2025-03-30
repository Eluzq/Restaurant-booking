import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/star-rating"
import type { GooglePlaceDetails } from "@/lib/google-places-api"
import { ArrowLeft, MapPin, Phone, Globe, Share2, Heart } from "lucide-react"

interface RestaurantHeaderProps {
  restaurant: GooglePlaceDetails
}

export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  // Convert Google price_level to $ symbols
  const priceLevel = restaurant.price_level !== undefined ? "$".repeat(restaurant.price_level + 1) : ""

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
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="mb-4">
        <Link href="/search" className="flex items-center text-sm text-tablecheck-red hover:underline">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to search results
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{restaurant.name}</h1>

          <div className="flex flex-wrap items-center mt-2 gap-x-4 gap-y-2">
            <div className="flex items-center">
              <StarRating rating={restaurant.rating || 0} />
              <span className="ml-2 text-sm text-gray-600">
                {restaurant.user_ratings_total ? `(${restaurant.user_ratings_total} reviews)` : ""}
              </span>
            </div>

            {priceLevel && <div className="text-sm font-medium">{priceLevel}</div>}

            <div className="text-sm bg-gray-100 px-2 py-1 rounded">{formattedCategory}</div>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-1">{restaurant.vicinity}</span>
            </div>

            {restaurant.formatted_phone_number && (
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="mr-1 h-4 w-4 flex-shrink-0" />
                {restaurant.formatted_phone_number}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex flex-col md:items-end gap-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-gray-300">
              <Heart className="mr-1 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300">
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </Button>
          </div>

          <div className="flex gap-2 mt-2">
            {restaurant.website && (
              <Button variant="outline" size="sm" asChild className="border-gray-300">
                <Link href={restaurant.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-1 h-4 w-4" />
                  Website
                </Link>
              </Button>
            )}

            {restaurant.url && (
              <Button variant="outline" size="sm" asChild className="border-gray-300">
                <Link href={restaurant.url} target="_blank" rel="noopener noreferrer">
                  <MapPin className="mr-1 h-4 w-4" />
                  View on Map
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

