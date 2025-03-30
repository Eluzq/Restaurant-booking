// Google Places API service
export interface GooglePlacesSearchParams {
  query?: string
  location?: string
  radius?: number
  type?: string
  minprice?: number
  maxprice?: number
  opennow?: boolean
  pagetoken?: string
}

export interface GooglePlacePhoto {
  photo_reference: string
  height: number
  width: number
  html_attributions: string[]
}

export interface GooglePlaceResult {
  place_id: string
  name: string
  photos?: GooglePlacePhoto[]
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  rating?: number
  user_ratings_total?: number
  price_level?: number
  vicinity: string
  types: string[]
  opening_hours?: {
    open_now: boolean
  }
}

export interface GooglePlacesSearchResponse {
  results: GooglePlaceResult[]
  next_page_token?: string
  status: string
}

export interface GooglePlaceDetails {
  place_id: string
  name: string
  photos?: GooglePlacePhoto[]
  formatted_address: string
  formatted_phone_number?: string
  international_phone_number?: string
  website?: string
  rating?: number
  user_ratings_total?: number
  price_level?: number
  vicinity: string
  types: string[]
  opening_hours?: {
    open_now: boolean
    weekday_text?: string[]
  }
  reviews?: {
    author_name: string
    profile_photo_url: string
    rating: number
    relative_time_description: string
    text: string
    time: number
  }[]
  url?: string
}

export class GooglePlacesApiService {
  private apiKey: string
  private baseUrl = "https://maps.googleapis.com/maps/api/place"

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      console.error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable is not set")
      throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable is not set")
    }

    this.apiKey = apiKey
  }

  async searchPlaces(params: GooglePlacesSearchParams): Promise<GooglePlacesSearchResponse> {
    try {
      const queryParams = new URLSearchParams()

      // Add all params to query string
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })

      // Always add key
      queryParams.append("key", this.apiKey)

      const response = await fetch(`${this.baseUrl}/textsearch/json?${queryParams.toString()}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      })

      if (!response.ok) {
        throw new Error(`Google Places API error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error searching places:", error)
      throw error
    }
  }

  async getPlaceDetails(placeId: string): Promise<GooglePlaceDetails> {
    try {
      const queryParams = new URLSearchParams({
        place_id: placeId,
        fields:
          "name,formatted_address,formatted_phone_number,international_phone_number,website,rating,user_ratings_total,price_level,vicinity,types,opening_hours,reviews,photos,url",
        key: this.apiKey,
      })

      const response = await fetch(`${this.baseUrl}/details/json?${queryParams.toString()}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      })

      if (!response.ok) {
        throw new Error(`Google Places API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data.result
    } catch (error) {
      console.error("Error getting place details:", error)
      throw error
    }
  }

  getPhotoUrl(photoReference: string, maxWidth = 400): string {
    return `${this.baseUrl}/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${this.apiKey}`
  }
}

