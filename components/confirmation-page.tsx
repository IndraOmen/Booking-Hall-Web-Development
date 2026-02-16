"use client"

import { useNavigation } from "@/lib/navigation-context"
import { useBooking } from "@/lib/booking-context"
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  User,
  Building2,
  ArrowRight,
} from "lucide-react"

export function ConfirmationPage() {
  const { navigate, lastBookingId } = useNavigation()
  const { bookings } = useBooking()

  const booking = bookings.find((b) => b.id === lastBookingId)

  if (!booking) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">No booking found.</p>
      </main>
    )
  }

  const displayDate = new Date(
    booking.date + "T00:00:00"
  ).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="w-full max-w-lg space-y-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center border border-emerald-500/30 bg-emerald-500/10">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight text-foreground">
            Request Submitted
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Your booking request has been submitted and is awaiting admin
            approval.
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="border border-border bg-card p-6 text-left">
          <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            Booking Summary
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="text-foreground">{booking.hallName}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="text-foreground">{displayDate}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <Clock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="text-foreground">{booking.slot}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <User className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="text-foreground">{booking.facultyName}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <Building2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="text-foreground">{booking.eventName}</span>
            </div>
          </div>

          <div className="mt-5 border border-amber-500/30 bg-amber-500/10 px-4 py-2.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-400">
              Status: Awaiting Admin Approval
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate("hall-select")}
            className="group inline-flex items-center justify-center gap-2 border border-foreground bg-foreground px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-background transition-all hover:bg-accent hover:text-accent-foreground"
          >
            Book Another Hall
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => navigate("role-select")}
            className="inline-flex items-center justify-center border border-border bg-card px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-secondary"
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  )
}
