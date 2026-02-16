"use client"

import { BookingProvider } from "@/lib/booking-context"
import { NavigationProvider, useNavigation } from "@/lib/navigation-context"
import { Navbar } from "@/components/navbar"
import { LandingPage } from "@/components/landing-page"
import { LoginPage } from "@/components/login-page"
import { HallSelection } from "@/components/hall-selection"
import { SlotSelection } from "@/components/slot-selection"
import { EventDetails } from "@/components/event-details"
import { ConfirmationPage } from "@/components/confirmation-page"
import { AdminDashboard } from "@/components/admin-dashboard"

function PageRouter() {
  const { currentPage } = useNavigation()

  switch (currentPage) {
    case "landing":
      return <LandingPage />
    case "login":
      return <LoginPage />
    case "hall-select":
      return <HallSelection />
    case "slot-select":
      return <SlotSelection />
    case "event-details":
      return <EventDetails />
    case "confirmation":
      return <ConfirmationPage />
    case "admin":
      return <AdminDashboard />
    default:
      return <LandingPage />
  }
}

export default function Home() {
  return (
    <BookingProvider>
      <NavigationProvider>
        <div className="min-h-screen bg-background">
          <Navbar />
          <PageRouter />
        </div>
      </NavigationProvider>
    </BookingProvider>
  )
}
