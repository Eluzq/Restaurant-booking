"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { GooglePlacePhoto } from "@/lib/google-places-api"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

interface RestaurantPhotosProps {
  photos: GooglePlacePhoto[]
}

export function RestaurantPhotos({ photos }: RestaurantPhotosProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // If no photos, show a placeholder
  if (photos.length === 0) {
    return (
      <Card className="border-0 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-64 w-full">
            <Image
              src="/placeholder.svg?height=400&width=800&text=No%20Photos%20Available"
              alt="Restaurant placeholder"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <p className="text-white text-lg font-medium">写真はありません</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Limit to 6 photos for the grid
  const displayPhotos = photos.slice(0, 6)

  // For the main photo display
  const mainPhoto = photos[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  const goToPhoto = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <CardContent className="p-0">
        {/* Main Photo with Navigation */}
        <div className="relative h-96 w-full">
          <Image
            src={`/api/places/photo?reference=${mainPhoto.photo_reference}&maxwidth=800`}
            alt="Restaurant photo"
            fill
            className="object-cover"
          />

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Photo Counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-6 gap-1 mt-1 h-20">
          {displayPhotos.map((photo, index) => (
            <div
              key={index}
              className={`relative cursor-pointer ${index === currentIndex ? "ring-2 ring-tablecheck-red" : ""}`}
              onClick={() => goToPhoto(index)}
            >
              <Image
                src={`/api/places/photo?reference=${photo.photo_reference}&maxwidth=100`}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

