"use client"

import { useState } from "react"
import { useNavigation } from "@/lib/navigation-context"
import { useBooking } from "@/lib/booking-context"
import { HALLS } from "@/lib/types"
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react"

export function EventDetails() {
  const {
    navigate,
    selectedHallId,
    selectedDate,
    selectedSlot,
    setLastBookingId,
  } = useNavigation()
  const { addBooking } = useBooking()

  const [formData, setFormData] = useState({
    facultyName: "",
    department: "",
    eventName: "",
    guestSpeaker: "",
    expectedAudience: "",
    additionalNotes: "",
  })

  const hall = HALLS.find((h) => h.id === selectedHallId)

  if (!hall || !selectedDate || !selectedSlot) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Missing booking details.</p>
      </main>
    )
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const booking = addBooking({
      hallId: hall!.id,
      hallName: hall!.name,
      date: selectedDate!,
      slot: selectedSlot!,
      ...formData,
    })
    setLastBookingId(booking.id)
    navigate("confirmation")
  }

  const isValid =
    formData.facultyName.trim() &&
    formData.department.trim() &&
    formData.eventName.trim() &&
    formData.expectedAudience.trim()

  const displayDate = new Date(selectedDate + "T00:00:00").toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )

  return (
    <main className="min-h-screen px-6 pb-16 pt-28 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <button
            onClick={() => navigate("slot-select")}
            className="mb-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Slots
          </button>
          <span className="block text-[10px] uppercase tracking-[0.3em] text-accent">
            Step 03
          </span>
          <h1 className="mt-2 text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
            Event Details
          </h1>
        </div>

        {/* Booking Summary Strip */}
        <div className="mb-8 flex flex-wrap gap-6 border border-border bg-card px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-foreground">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            {hall.name}
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground">
            <Calendar className="h-3.5 w-3.5 text-accent" />
            {displayDate}
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground">
            <Clock className="h-3.5 w-3.5 text-accent" />
            {selectedSlot}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 border border-border bg-card p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="facultyName"
                className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
              >
                Faculty Name <span className="text-accent">*</span>
              </label>
              <input
                id="facultyName"
                name="facultyName"
                type="text"
                required
                value={formData.facultyName}
                onChange={handleChange}
                placeholder="Dr. John Doe"
                className="w-full border border-border bg-background px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="department"
                className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
              >
                Department <span className="text-accent">*</span>
              </label>
              <input
                id="department"
                name="department"
                type="text"
                required
                value={formData.department}
                onChange={handleChange}
                placeholder="Computer Science"
                className="w-full border border-border bg-background px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="eventName"
              className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Event Name <span className="text-accent">*</span>
            </label>
            <input
              id="eventName"
              name="eventName"
              type="text"
              required
              value={formData.eventName}
              onChange={handleChange}
              placeholder="AI Workshop 2026"
              className="w-full border border-border bg-background px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="guestSpeaker"
                className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
              >
                Guest Speaker
              </label>
              <input
                id="guestSpeaker"
                name="guestSpeaker"
                type="text"
                value={formData.guestSpeaker}
                onChange={handleChange}
                placeholder="Prof. Jane Smith"
                className="w-full border border-border bg-background px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="expectedAudience"
                className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
              >
                Expected Audience <span className="text-accent">*</span>
              </label>
              <input
                id="expectedAudience"
                name="expectedAudience"
                type="number"
                required
                min={1}
                value={formData.expectedAudience}
                onChange={handleChange}
                placeholder="100"
                className="w-full border border-border bg-background px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="additionalNotes"
              className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              rows={3}
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Any special arrangements or requirements..."
              className="w-full resize-none border border-border bg-background px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full border border-foreground bg-foreground px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-background transition-all hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-30"
          >
            Submit Booking Request
          </button>
        </form>
      </div>
    </main>
  )
}
