"use client"

import { useState } from "react"
import { useNavigation } from "@/lib/navigation-context"
import { useBooking } from "@/lib/booking-context"
import { HALLS, TIME_SLOTS } from "@/lib/types"
import { Calendar } from "@/components/ui/calendar"
import { ArrowLeft, Clock, Info } from "lucide-react"
import { format } from "date-fns"

export function SlotSelection() {
  const { navigate, selectedHallId, setSelectedDate, setSelectedSlot } =
    useNavigation()
  const { getSlotStatus } = useBooking()
  const [date, setDate] = useState<Date | undefined>(new Date())

  const hall = HALLS.find((h) => h.id === selectedHallId)

  if (!hall) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">No hall selected.</p>
      </main>
    )
  }

  const dateStr = date ? format(date, "yyyy-MM-dd") : ""

  function handleSlotClick(slot: string) {
    if (!date) return
    const status = getSlotStatus(hall!.id, dateStr, slot)
    if (status === "approved") return
    setSelectedDate(dateStr)
    setSelectedSlot(slot)
    navigate("event-details")
  }

  return (
    <main className="min-h-screen px-6 pb-16 pt-28 sm:px-12 lg:px-20">
      <div className="mb-10">
        <button
          onClick={() => navigate("hall-select")}
          className="mb-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Halls
        </button>
        <span className="block text-[10px] uppercase tracking-[0.3em] text-accent">
          Step 02
        </span>
        <h1 className="mt-2 text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
          {hall.name}
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Select a date and available time slot
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[auto_1fr]">
        {/* Calendar */}
        <div className="border border-border bg-card p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
          />
        </div>

        {/* Slots */}
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wide text-foreground">
              {date ? format(date, "EEEE, MMMM d, yyyy") : "Select a date"}
            </span>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-6 border border-border bg-card px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-emerald-500" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-amber-500" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-red-500" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Booked</span>
            </div>
          </div>

          {date ? (
            <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
              {TIME_SLOTS.map((slot) => {
                const status = getSlotStatus(hall.id, dateStr, slot)
                const isApproved = status === "approved"
                const isPending = status === "pending"

                return (
                  <button
                    key={slot}
                    onClick={() => handleSlotClick(slot)}
                    disabled={isApproved}
                    className={`flex flex-col items-center gap-1 bg-card px-3 py-5 text-xs transition-colors ${
                      isApproved
                        ? "cursor-not-allowed text-red-400"
                        : isPending
                          ? "cursor-pointer text-amber-400 hover:bg-secondary"
                          : "cursor-pointer text-emerald-400 hover:bg-secondary"
                    }`}
                  >
                    <span className="font-bold text-foreground">{slot.split(" - ")[0]}</span>
                    <span className="text-muted-foreground">
                      {"to " + slot.split(" - ")[1]}
                    </span>
                    <span className={`mt-1 h-1 w-6 ${
                      isApproved ? "bg-red-500" : isPending ? "bg-amber-500" : "bg-emerald-500"
                    }`} />
                    {isPending && (
                      <span className="mt-1 inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-amber-400">
                        <Info className="h-2.5 w-2.5" />
                        Pending
                      </span>
                    )}
                    {isApproved && (
                      <span className="mt-1 text-[9px] uppercase tracking-wider text-red-400">Booked</span>
                    )}
                  </button>
                )
              })}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Please select a date to view available slots.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
