"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import type { Booking, BookingStatus } from "./types"

interface BookingContextValue {
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, "id" | "status" | "createdAt">) => Booking
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void
  getSlotStatus: (
    hallId: string,
    date: string,
    slot: string
  ) => "available" | "pending" | "approved"
  getApprovedBooking: (
    hallId: string,
    date: string,
    slot: string
  ) => Booking | undefined
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "demo-1",
      hallId: "visvesvaraya",
      hallName: "Visvesvaraya Hall",
      date: new Date().toISOString().split("T")[0],
      slot: "10:00 AM - 11:00 AM",
      facultyName: "Dr. Rajesh Kumar",
      department: "Computer Science",
      eventName: "AI Workshop 2026",
      guestSpeaker: "Prof. Ananya Sharma",
      expectedAudience: "150",
      additionalNotes: "Requires extra seating arrangement",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: "demo-2",
      hallId: "hall-2",
      hallName: "Hall 2",
      date: new Date().toISOString().split("T")[0],
      slot: "2:00 PM - 3:00 PM",
      facultyName: "Prof. Meera Joshi",
      department: "Electronics",
      eventName: "IoT Seminar",
      guestSpeaker: "Dr. Vikram Patel",
      expectedAudience: "80",
      additionalNotes: "",
      status: "approved",
      createdAt: new Date().toISOString(),
    },
  ])

  const addBooking = useCallback(
    (data: Omit<Booking, "id" | "status" | "createdAt">) => {
      const newBooking: Booking = {
        ...data,
        id: `booking-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        status: "pending",
        createdAt: new Date().toISOString(),
      }
      setBookings((prev) => [...prev, newBooking])
      return newBooking
    },
    []
  )

  const updateBookingStatus = useCallback(
    (bookingId: string, status: BookingStatus) => {
      setBookings((prev) => {
        const target = prev.find((b) => b.id === bookingId)
        if (!target) return prev

        return prev.map((b) => {
          if (b.id === bookingId) {
            return { ...b, status }
          }
          // When approving, auto-reject other pending bookings for same hall/date/slot
          if (
            status === "approved" &&
            b.hallId === target.hallId &&
            b.date === target.date &&
            b.slot === target.slot &&
            b.status === "pending" &&
            b.id !== bookingId
          ) {
            return { ...b, status: "rejected" }
          }
          return b
        })
      })
    },
    []
  )

  const getSlotStatus = useCallback(
    (
      hallId: string,
      date: string,
      slot: string
    ): "available" | "pending" | "approved" => {
      const matching = bookings.filter(
        (b) => b.hallId === hallId && b.date === date && b.slot === slot
      )
      if (matching.some((b) => b.status === "approved")) return "approved"
      if (matching.some((b) => b.status === "pending")) return "pending"
      return "available"
    },
    [bookings]
  )

  const getApprovedBooking = useCallback(
    (hallId: string, date: string, slot: string): Booking | undefined => {
      return bookings.find(
        (b) =>
          b.hallId === hallId &&
          b.date === date &&
          b.slot === slot &&
          b.status === "approved"
      )
    },
    [bookings]
  )

  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, updateBookingStatus, getSlotStatus, getApprovedBooking }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}
