import { RestaurantHeader } from "@/components/restaurant/restaurant-header"
import { RestaurantPhotos } from "@/components/restaurant/restaurant-photos"
import { RestaurantInfo } from "@/components/restaurant/restaurant-info"
import { RestaurantReviews } from "@/components/restaurant/restaurant-reviews"
import { RestaurantReservation } from "@/components/restaurant/restaurant-reservation"
import { GooglePlacesApiService } from "@/lib/google-places-api"
import { notFound } from "next/navigation"

interface RestaurantPageProps {
  params: {
    id: string
  }
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { id } = params

  // Ensure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">
            {" "}
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable is not set. Please set this in your environment
            variables.
          </span>
        </div>
      </div>
    )
  }

  try {
    const placesService = new GooglePlacesApiService()
    const restaurant = await placesService.getPlaceDetails(id)

    if (!restaurant) {
      notFound()
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <RestaurantHeader restaurant={restaurant} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <RestaurantPhotos photos={restaurant.photos || []} />
            <RestaurantInfo restaurant={restaurant} />
            <RestaurantReviews reviews={restaurant.reviews || []} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <RestaurantReservation restaurant={restaurant} />
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching restaurant details:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> Failed to load restaurant details. Please try again later.</span>
        </div>
      </div>
    )
  }
}

