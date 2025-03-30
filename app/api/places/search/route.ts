import { type NextRequest, NextResponse } from "next/server"
import { GooglePlacesApiService } from "@/lib/google-places-api"

export async function GET(request: NextRequest) {
  try {
    // Check if NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable is not set" },
        { status: 500 },
      )
    }

    const { searchParams } = new URL(request.url)

    const query = searchParams.get("query") || "restaurant"
    const location = searchParams.get("location")
    const type = searchParams.get("type") || "restaurant"
    const minprice = searchParams.get("minprice") ? Number(searchParams.get("minprice")) : undefined
    const maxprice = searchParams.get("maxprice") ? Number(searchParams.get("maxprice")) : undefined
    const opennow = searchParams.get("opennow") === "true"
    const radius = searchParams.get("radius") ? Number(searchParams.get("radius")) : 5000 // Default 5km
    const pagetoken = searchParams.get("pagetoken") || undefined

    // For Google Places, we need either location or pagetoken
    if (!location && !pagetoken) {
      return NextResponse.json({ error: "Either location parameter or pagetoken is required" }, { status: 400 })
    }

    const placesService = new GooglePlacesApiService()

    // If we have a pagetoken, we only need that for the next page
    if (pagetoken) {
      const results = await placesService.searchPlaces({ pagetoken })
      return NextResponse.json(results)
    }

    // Otherwise, perform a full search
    const searchQuery = `${query} in ${location}`

    const results = await placesService.searchPlaces({
      query: searchQuery,
      type,
      minprice,
      maxprice,
      opennow,
      radius,
    })

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error in Google Places search API route:", error)
    return NextResponse.json({ error: "Failed to fetch data from Google Places API" }, { status: 500 })
  }
}

