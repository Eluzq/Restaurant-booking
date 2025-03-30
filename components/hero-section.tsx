"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

export function HeroSection() {
  const [location, setLocation] = useState("")
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!location) return

    const params = new URLSearchParams()
    if (location) params.append("location", location)
    if (query) params.append("query", query)

    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=600&width=1600"
          alt="Restaurant background"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 tablecheck-container py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Find Amazing Restaurants in Australia</h1>
          <p className="text-lg md:text-xl text-white mb-8">
            Book easily with TableCheck Australia. Enjoy special dining experiences.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white p-2 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Location (e.g., Sydney, Melbourne)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 py-6 border-0 focus:ring-0 text-base"
                  required
                />
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Restaurant, cuisine (e.g., Italian, Sushi)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 py-6 border-0 focus:ring-0 text-base"
                />
              </div>
              <Button
                type="submit"
                className="bg-tablecheck-red hover:bg-red-700 text-white py-6 px-8 text-base font-medium"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="text-white mr-2">Popular searches:</span>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent text-white border-white hover:bg-white/20"
              onClick={() => {
                setLocation("Sydney")
                setQuery("Japanese")
              }}
            >
              Japanese in Sydney
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent text-white border-white hover:bg-white/20"
              onClick={() => {
                setLocation("Melbourne")
                setQuery("Italian")
              }}
            >
              Italian in Melbourne
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent text-white border-white hover:bg-white/20"
              onClick={() => {
                setLocation("Brisbane")
                setQuery("Seafood")
              }}
            >
              Seafood in Brisbane
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

