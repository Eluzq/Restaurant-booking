import { HeroSection } from "@/components/hero-section"
import { CuisineSection } from "@/components/cuisine-section"
import { LocationSection } from "@/components/location-section"
import { FeaturedRestaurants } from "@/components/featured-restaurants"
import { PromotionCards } from "@/components/promotion-cards"

export default function Home() {
  return (
    <div>
      <HeroSection />

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="tablecheck-container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 dark:text-white">Popular Cuisines</h2>
          <CuisineSection />
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="tablecheck-container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 dark:text-white">Featured Restaurants</h2>
          <FeaturedRestaurants />
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="tablecheck-container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 dark:text-white">Special Promotions</h2>
          <PromotionCards />
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="tablecheck-container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 dark:text-white">Popular Locations</h2>
          <LocationSection />
        </div>
      </section>
    </div>
  )
}

