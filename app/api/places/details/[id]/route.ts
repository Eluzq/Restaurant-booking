import { type NextRequest, NextResponse } from "next/server"
import { GooglePlacesApiService } from "@/lib/google-places-api"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable is not set" },
        { status: 500 },
      )
    }

    const placeId = params.id

    if (!placeId) {
      return NextResponse.json({ error: "Place ID is required" }, { status: 400 })
    }

    const placesService = new GooglePlacesApiService()
    const placeDetails = await placesService.getPlaceDetails(placeId)

    return NextResponse.json(placeDetails)
  } catch (error) {
    console.error("Error in Google Places details API route:", error)
    return NextResponse.json({ error: "Failed to fetch place details from Google Places API" }, { status: 500 })
  }
}

