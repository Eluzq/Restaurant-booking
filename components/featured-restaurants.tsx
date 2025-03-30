"use client"

import { useEffect, useState } from "react"
import { RestaurantCard } from "@/components/restaurant-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { GooglePlaceResult } from "@/lib/google-places-api"

export function FeaturedRestaurants() {
  const [restaurants, setRestaurants] = useState<GooglePlaceResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedRestaurants = async () => {
      try {
        setLoading(true)
        // In a real app, you would have a dedicated API endpoint for featured restaurants
        // For now, we'll just use the search API with a fixed location
        const response = await fetch(`/api/places/search?location=Sydney&type=restaurant&maxprice=4&radius=10000`)

        if (!response.ok) {
          throw new Error("Failed to fetch featured restaurants")
        }

        const data = await response.json()

        if (data.results && data.results.length > 0) {
          // Limit to 4 restaurants
          setRestaurants(data.results.slice(0, 4))
        }
      } catch (error) {
        console.error("Error fetching featured restaurants:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedRestaurants()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No restaurants found.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.place_id} restaurant={restaurant} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button className="bg-tablecheck-red hover:bg-red-700 text-white px-8" asChild>
          <a href="/search?location=Sydney">View More</a>
        </Button>
      </div>
    </div>
  )
}

