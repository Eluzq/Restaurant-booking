"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, User } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="tablecheck-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-40">
              <Image
                src="/placeholder.svg?height=32&width=160&text=TableCheck"
                alt="TableCheck Australia"
                fill
                className="object-contain dark:invert"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium ${
                pathname === "/"
                  ? "text-tablecheck-red"
                  : "text-gray-700 dark:text-gray-200 hover:text-tablecheck-red dark:hover:text-tablecheck-red"
              } transition-colors`}
            >
              Home
            </Link>
            <Link
              href="/search?location=Sydney"
              className={`text-sm font-medium ${
                pathname.startsWith("/search")
                  ? "text-tablecheck-red"
                  : "text-gray-700 dark:text-gray-200 hover:text-tablecheck-red dark:hover:text-tablecheck-red"
              } transition-colors`}
            >
              Find Restaurants
            </Link>
            <Link
              href="/reservations"
              className={`text-sm font-medium ${
                pathname.startsWith("/reservations")
                  ? "text-tablecheck-red"
                  : "text-gray-700 dark:text-gray-200 hover:text-tablecheck-red dark:hover:text-tablecheck-red"
              } transition-colors`}
            >
              My Reservations
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700"
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button className="bg-tablecheck-red hover:bg-red-700 text-white">Sign Up</Button>
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-gray-700 dark:text-gray-200 ml-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4">
          <div className="tablecheck-container space-y-4">
            <Link
              href="/"
              className={`block py-2 text-base font-medium ${
                pathname === "/" ? "text-tablecheck-red" : "text-gray-700 dark:text-gray-200"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/search?location=Sydney"
              className={`block py-2 text-base font-medium ${
                pathname.startsWith("/search") ? "text-tablecheck-red" : "text-gray-700 dark:text-gray-200"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Find Restaurants
            </Link>
            <Link
              href="/reservations"
              className={`block py-2 text-base font-medium ${
                pathname.startsWith("/reservations") ? "text-tablecheck-red" : "text-gray-700 dark:text-gray-200"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              My Reservations
            </Link>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col space-y-3">
              <Button
                variant="outline"
                className="justify-center text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button className="bg-tablecheck-red hover:bg-red-700 text-white justify-center">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

