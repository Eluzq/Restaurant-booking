import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const reference = searchParams.get("reference")
    const maxwidth = searchParams.get("maxwidth") || "400"

    if (!reference) {
      return NextResponse.json({ error: "Photo reference is required" }, { status: 400 })
    }

    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable is not set" },
        { status: 500 },
      )
    }

    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photo_reference=${reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`

    // Fetch the photo and stream it through
    const response = await fetch(photoUrl)

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status} ${response.statusText}`)
    }

    // Get the photo data as an array buffer
    const photoData = await response.arrayBuffer()

    // Create a new response with the photo data
    return new NextResponse(photoData, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      },
    })
  } catch (error) {
    console.error("Error fetching photo:", error)
    return NextResponse.json({ error: "Failed to fetch photo from Google Places API" }, { status: 500 })
  }
}

