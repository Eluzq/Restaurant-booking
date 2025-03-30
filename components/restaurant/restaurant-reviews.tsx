import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { StarRating } from "@/components/star-rating"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

interface Review {
  author_name: string
  profile_photo_url: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

interface RestaurantReviewsProps {
  reviews: Review[]
}

export function RestaurantReviews({ reviews }: RestaurantReviewsProps) {
  // If no reviews, show a message
  if (reviews.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 text-center">
          <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <h2 className="text-xl font-semibold mb-2">No Reviews Yet</h2>
          <p className="text-gray-600 mb-4">Would you like to be the first to review this restaurant?</p>
          <Button className="bg-tablecheck-red hover:bg-red-700">Write a Review</Button>
        </CardContent>
      </Card>
    )
  }

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-tablecheck-red" />
            Reviews
          </h2>
          <Button className="bg-tablecheck-red hover:bg-red-700">Write a Review</Button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
          <div>
            <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
            <StarRating rating={averageRating} />
          </div>
          <div className="text-right">
            <div className="text-lg font-medium">{reviews.length} reviews</div>
            <div className="text-sm text-gray-600">Google Reviews</div>
          </div>
        </div>

        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={review.profile_photo_url || "/placeholder.svg"}
                    alt={review.author_name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="ml-3">
                  <div className="font-medium">{review.author_name}</div>
                  <div className="text-xs text-gray-500">{review.relative_time_description}</div>
                </div>
              </div>

              <div className="mt-2">
                <StarRating rating={review.rating} />
              </div>

              <p className="mt-2 text-gray-600">{review.text}</p>
            </div>
          ))}
        </div>

        {reviews.length > 5 && (
          <div className="mt-6 text-center">
            <Button variant="outline" className="border-gray-300">
              View All Reviews
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

