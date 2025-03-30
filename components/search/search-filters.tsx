"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Filter, Clock } from "lucide-react"

interface SearchFiltersProps {
  initialFilters: {
    query: string
    location: string
    type: string
    minprice: string
    maxprice: string
    opennow: boolean
    radius: string
  }
}

export function SearchFilters({ initialFilters }: SearchFiltersProps) {
  const [filters, setFilters] = useState(initialFilters)
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFilters((prev) => ({ ...prev, opennow: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadiusChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, radius: value[0].toString() }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Build query params
    const queryParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        queryParams.append(key, value.toString())
      }
    })

    // Reset to page 1 when applying new filters
    queryParams.set("page", "1")

    // Remove any pagetoken when applying new filters
    queryParams.delete("pagetoken")

    router.push(`/search?${queryParams.toString()}`)
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md border-0 dark:border dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center dark:text-white">
          <Filter className="h-5 w-5 mr-2" />
          Search Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="query"
                name="query"
                value={filters.query}
                onChange={handleInputChange}
                placeholder="Restaurant, cuisine"
                className="pl-10 py-5 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="location"
                name="location"
                value={filters.location}
                onChange={handleInputChange}
                placeholder="Location (e.g., Sydney, Melbourne)"
                className="pl-10 py-5 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 py-1">
            <Checkbox id="opennow" checked={filters.opennow} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="opennow" className="flex items-center cursor-pointer dark:text-gray-200">
              <Clock className="h-4 w-4 mr-1" />
              Open Now Only
            </Label>
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-tablecheck-red font-medium flex items-center"
            >
              {isExpanded ? "Hide Advanced Filters" : "Show Advanced Filters"}
            </button>
          </div>

          {isExpanded && (
            <div className="space-y-5 pt-2">
              <div>
                <Label htmlFor="type" className="text-sm font-medium mb-1.5 block dark:text-gray-200">
                  Restaurant Type
                </Label>
                <Select value={filters.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger
                    id="type"
                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="cafe">Cafe</SelectItem>
                    <SelectItem value="bar">Bar</SelectItem>
                    <SelectItem value="bakery">Bakery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1.5 block dark:text-gray-200">Price Range</Label>
                <div className="flex items-center space-x-4">
                  {[1, 2, 3, 4].map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`flex items-center justify-center h-10 w-10 rounded-full border ${
                        Number.parseInt(filters.maxprice) === level
                          ? "bg-tablecheck-red text-white border-tablecheck-red"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:border-tablecheck-red"
                      }`}
                      onClick={() => handleSelectChange("maxprice", level.toString())}
                    >
                      {"$".repeat(level)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label htmlFor="radius" className="text-sm font-medium dark:text-gray-200">
                    Search Radius
                  </Label>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {Number.parseInt(filters.radius) / 1000}km
                  </span>
                </div>
                <Slider
                  id="radius"
                  defaultValue={[Number.parseInt(filters.radius)]}
                  max={50000}
                  min={1000}
                  step={1000}
                  onValueChange={handleRadiusChange}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>1km</span>
                  <span>50km</span>
                </div>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full bg-tablecheck-red hover:bg-red-700 text-white py-5 font-medium">
            Search
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

