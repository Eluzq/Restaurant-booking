"use client"

import { useEffect, useState } from "react"
import { RestaurantCard } from "@/components/restaurant-card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import type { GooglePlacesSearchParams, GooglePlaceResult, GooglePlacesSearchResponse } from "@/lib/google-places-api"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"

interface SearchResultsProps {
  searchParams: GooglePlacesSearchParams
  currentPage: number
}

export function SearchResults({ searchParams, currentPage }: SearchResultsProps) {
  const [results, setResults] = useState<GooglePlaceResult[]>([])
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParamsObj = useSearchParams()

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true)
        setError(null)

        // Build query params
        const queryParams = new URLSearchParams()
        Object.entries(searchParams).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            queryParams.append(key, value.toString())
          }
        })

        const response = await fetch(`/api/places/search?${queryParams.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch search results")
        }

        const data: GooglePlacesSearchResponse = await response.json()

        if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
          throw new Error(`API Error: ${data.status}`)
        }

        setResults(data.results || [])
        setNextPageToken(data.next_page_token)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        console.error("Error fetching search results:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [searchParams])

  const handlePageChange = (page: number) => {
    // Create a new URLSearchParams object from the current search params
    const newParams = new URLSearchParams(searchParamsObj.toString())

    // Update the page parameter
    newParams.set("page", page.toString())

    // If we have a next page token and we're going to the next page, add it
    if (nextPageToken && page > currentPage) {
      newParams.set("pagetoken", nextPageToken)
    } else {
      // Remove pagetoken if we're not going to the next page
      newParams.delete("pagetoken")
    }

    // Navigate to the new URL
    router.push(`/search?${newParams.toString()}`)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 text-tablecheck-red animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Loading search results...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-6 py-4 rounded-md"
        role="alert"
      >
        <p className="font-medium">An error occurred</p>
        <p className="mt-1">{error}</p>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div
        className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300 px-6 py-4 rounded-md"
        role="alert"
      >
        <p className="font-medium">No results found</p>
        <p className="mt-1">Please try changing your search criteria.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-700 dark:text-gray-200">
          <span className="font-medium">{results.length}</span> restaurants found
        </p>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Sort by:</span>
          <select className="text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:border-tablecheck-red focus:ring-tablecheck-red">
            <option value="relevance">Relevance</option>
            <option value="rating">Rating</option>
            <option value="distance">Distance</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((restaurant) => (
          <RestaurantCard key={restaurant.place_id} restaurant={restaurant} />
        ))}
      </div>

      {nextPageToken && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink isActive={currentPage === 1} onClick={() => handlePageChange(1)}>
                  1
                </PaginationLink>
              </PaginationItem>

              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {currentPage > 1 && currentPage < 3 && (
                <PaginationItem>
                  <PaginationLink isActive={true}>{currentPage}</PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

