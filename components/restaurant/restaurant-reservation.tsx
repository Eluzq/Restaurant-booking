"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { GooglePlaceDetails } from "@/lib/google-places-api"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Users, Clock, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface RestaurantReservationProps {
  restaurant: GooglePlaceDetails
}

export function RestaurantReservation({ restaurant }: RestaurantReservationProps) {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string>("")
  const [partySize, setPartySize] = useState<string>("2")
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [specialRequests, setSpecialRequests] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !time || !name || !email || !phone) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    // In a real app, you would submit this to your backend
    // For now, we'll just simulate a submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to confirmation page
    router.push(
      `/reservations/confirmation?restaurant=${encodeURIComponent(restaurant.name)}&date=${date.toISOString()}&time=${time}&party=${partySize}`,
    )
  }

  // Generate time slots from 11:00 to 22:00 with 30-minute intervals
  const timeSlots = []
  for (let hour = 11; hour <= 22; hour++) {
    for (const minute of ["00", "30"]) {
      timeSlots.push(`${hour}:${minute}`)
    }
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="bg-tablecheck-red text-white rounded-t-lg">
        <CardTitle className="text-center">Make a Reservation</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date" className="text-sm font-medium block mb-1.5">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-gray-300 py-5",
                    !date && "text-gray-500",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "MMMM d, yyyy") : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="time" className="text-sm font-medium block mb-1.5">
                Time
              </Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger id="time" className="border-gray-300 py-5">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="Select time" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="partySize" className="text-sm font-medium block mb-1.5">
                Party Size
              </Label>
              <Select value={partySize} onValueChange={setPartySize}>
                <SelectTrigger id="partySize" className="border-gray-300 py-5">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="Select party size" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size} {size === 1 ? "person" : "people"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="name" className="text-sm font-medium block mb-1.5">
              Full Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-gray-300 py-5"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium block mb-1.5">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 py-5"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium block mb-1.5">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-gray-300 py-5"
              required
            />
          </div>

          <div>
            <Label htmlFor="specialRequests" className="text-sm font-medium block mb-1.5 flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              Special Requests (optional)
            </Label>
            <Textarea
              id="specialRequests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={3}
              className="border-gray-300"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-tablecheck-red hover:bg-red-700 text-white py-5 font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Confirm Reservation"}
          </Button>
        </form>

        <div className="mt-4 text-xs text-gray-500 text-center">
          By confirming your reservation, you agree to our{" "}
          <a href="#" className="text-tablecheck-red hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-tablecheck-red hover:underline">
            Privacy Policy
          </a>
          .
        </div>
      </CardContent>
    </Card>
  )
}

