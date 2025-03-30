import { Card, CardContent } from "@/components/ui/card"
import type { GooglePlaceDetails } from "@/lib/google-places-api"
import { Clock, Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RestaurantInfoProps {
  restaurant: GooglePlaceDetails
}

export function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-0">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-gray-100 rounded-none h-auto">
            <TabsTrigger value="info" className="py-3 data-[state=active]:bg-white">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="menu" className="py-3 data-[state=active]:bg-white">
              Menu
            </TabsTrigger>
            <TabsTrigger value="map" className="py-3 data-[state=active]:bg-white">
              Map
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <Info className="mr-2 h-5 w-5 text-tablecheck-red" />
                Restaurant Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-gray-600">{restaurant.formatted_address}</p>
                </div>

                {restaurant.formatted_phone_number && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Phone Number</p>
                    <p className="text-sm text-gray-600">{restaurant.formatted_phone_number}</p>
                  </div>
                )}

                {restaurant.website && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Website</p>
                    <a
                      href={restaurant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-tablecheck-red hover:underline"
                    >
                      {restaurant.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </a>
                  </div>
                )}

                <div className="space-y-1">
                  <p className="text-sm font-medium">Cuisine Type</p>
                  <p className="text-sm text-gray-600">
                    {restaurant.types
                      .filter((type) => !["restaurant", "food", "establishment", "point_of_interest"].includes(type))
                      .map((type) =>
                        type
                          .split("_")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" "),
                      )
                      .join(", ") || "Restaurant"}
                  </p>
                </div>

                {restaurant.price_level !== undefined && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Price Range</p>
                    <p className="text-sm text-gray-600">
                      {"$".repeat(restaurant.price_level + 1)} {restaurant.price_level === 0 && "(Budget)"}
                      {restaurant.price_level === 1 && "(Inexpensive)"}
                      {restaurant.price_level === 2 && "(Moderate)"}
                      {restaurant.price_level === 3 && "(Expensive)"}
                      {restaurant.price_level === 4 && "(Very Expensive)"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {restaurant.opening_hours?.weekday_text && (
              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-tablecheck-red" />
                  Opening Hours
                </h3>
                <ul className="space-y-1">
                  {restaurant.opening_hours.weekday_text.map((day, index) => (
                    <li key={index} className="text-sm text-gray-600 py-1 border-b border-gray-100 last:border-0">
                      {day}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>

          <TabsContent value="menu" className="p-6">
            <div className="text-center py-8">
              <p className="text-gray-600 mb-2">Menu information is currently unavailable</p>
              <p className="text-sm text-gray-500">Please check the restaurant's website</p>
            </div>
          </TabsContent>

          <TabsContent value="map" className="p-0 h-80">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=place_id:${restaurant.place_id}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

