"use client"

import { useState } from "react"
import { useBooking } from "@/lib/booking-context"
import { useNavigation } from "@/lib/navigation-context"
import type { BookingStatus } from "@/lib/types"
import {
  ArrowLeft,
  Check,
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  Building2,
} from "lucide-react"

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  approved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  rejected: "border-red-500/30 bg-red-500/10 text-red-400",
}

export function AdminDashboard() {
  const { navigate } = useNavigation()
  const { bookings, updateBookingStatus } = useBooking()
  const [filter, setFilter] = useState<BookingStatus | "all">("all")

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter)

  const pendingCount = bookings.filter((b) => b.status === "pending").length
  const approvedCount = bookings.filter((b) => b.status === "approved").length
  const rejectedCount = bookings.filter((b) => b.status === "rejected").length

  return (
    <main className="min-h-screen px-6 pb-16 pt-28 sm:px-12 lg:px-20">
      <div className="mb-10">
        <button
          onClick={() => navigate("landing")}
          className="mb-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </button>
        <span className="block text-[10px] uppercase tracking-[0.3em] text-accent">
          Administration
        </span>
        <h1 className="mt-2 text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
          Booking Requests
        </h1>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-3 gap-px bg-border">
        <div className="bg-card p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Pending</p>
          <p className="mt-2 text-3xl font-bold text-amber-400">
            {pendingCount}
          </p>
        </div>
        <div className="bg-card p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Approved</p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {approvedCount}
          </p>
        </div>
        <div className="bg-card p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Rejected</p>
          <p className="mt-2 text-3xl font-bold text-red-400">
            {rejectedCount}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6 flex gap-px bg-border">
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${
              filter === f
                ? "bg-foreground text-background"
                : "bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-border bg-card py-20 text-center">
          <p className="text-xs text-muted-foreground">
            No booking requests found.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-hidden border border-border bg-card md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Hall
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Slot
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Event
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Faculty
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((booking) => {
                    const displayDate = new Date(
                      booking.date + "T00:00:00"
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })

                    return (
                      <tr
                        key={booking.id}
                        className="border-b border-border last:border-0"
                      >
                        <td className="px-4 py-3 text-foreground">
                          {booking.hallName}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {displayDate}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {booking.slot}
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          {booking.eventName}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {booking.facultyName}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${STATUS_STYLES[booking.status]}`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {booking.status === "pending" ? (
                            <div className="flex gap-1.5">
                              <button
                                onClick={() =>
                                  updateBookingStatus(booking.id, "approved")
                                }
                                className="inline-flex items-center gap-1 bg-emerald-600 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-50 transition-colors hover:bg-emerald-500"
                                aria-label={`Approve booking for ${booking.eventName}`}
                              >
                                <Check className="h-3 w-3" />
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  updateBookingStatus(booking.id, "rejected")
                                }
                                className="inline-flex items-center gap-1 bg-red-600 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-red-50 transition-colors hover:bg-red-500"
                                aria-label={`Reject booking for ${booking.eventName}`}
                              >
                                <X className="h-3 w-3" />
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] text-muted-foreground">
                              --
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-px bg-border md:hidden">
            {filtered.map((booking) => {
              const displayDate = new Date(
                booking.date + "T00:00:00"
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })

              return (
                <div
                  key={booking.id}
                  className="bg-card p-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-foreground">
                      {booking.eventName}
                    </h3>
                    <span
                      className={`inline-block border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] ${STATUS_STYLES[booking.status]}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {booking.hallName}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {displayDate}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {booking.slot}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      {booking.facultyName}
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3 w-3" />
                      {booking.department}
                    </div>
                  </div>
                  {booking.status === "pending" && (
                    <div className="mt-4 flex gap-px bg-border">
                      <button
                        onClick={() =>
                          updateBookingStatus(booking.id, "approved")
                        }
                        className="flex-1 bg-emerald-600 px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-50 transition-colors hover:bg-emerald-500"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          updateBookingStatus(booking.id, "rejected")
                        }
                        className="flex-1 bg-red-600 px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-red-50 transition-colors hover:bg-red-500"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}
    </main>
  )
}
