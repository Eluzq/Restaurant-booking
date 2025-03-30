import { Suspense } from "react"
import { SearchResults } from "@/components/search/search-results"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchSkeleton } from "@/components/search/search-skeleton"
import type { GooglePlacesSearchParams } from "@/lib/google-places-api"

interface SearchPageProps {
  searchParams: {
    query?: string
    location?: string
    type?: string
    minprice?: string
    maxprice?: string
    opennow?: string
    radius?: string
    page?: string
    pagetoken?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Ensure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-4 py-3 rounded relative"
          role="alert"
        >
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

  const { query, location, type, minprice, maxprice, opennow, radius, page = "1", pagetoken } = searchParams

  // If no location is provided and no pagetoken, show a message
  if (!location && !pagetoken) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">Search Restaurants</h1>
        <div
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">Please provide a location to search for restaurants.</span>
        </div>
      </div>
    )
  }

  const searchParamsForApi: GooglePlacesSearchParams = {
    query: query || "restaurant",
    location: location,
    type: type || "restaurant",
    minprice: minprice ? Number.parseInt(minprice, 10) : undefined,
    maxprice: maxprice ? Number.parseInt(maxprice, 10) : undefined,
    opennow: opennow === "true",
    radius: radius ? Number.parseInt(radius, 10) : 5000,
    pagetoken,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Search Results</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <SearchFilters
            initialFilters={{
              query: query || "",
              location: location || "",
              type: type || "restaurant",
              minprice: minprice || "",
              maxprice: maxprice || "",
              opennow: opennow === "true",
              radius: radius || "5000",
            }}
          />
        </div>

        <div className="w-full md:w-3/4">
          <Suspense fallback={<SearchSkeleton />}>
            <SearchResults searchParams={searchParamsForApi} currentPage={page ? Number.parseInt(page, 10) : 1} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

