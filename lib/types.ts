export type BookingStatus = "pending" | "approved" | "rejected"

export interface Booking {
  id: string
  hallId: string
  hallName: string
  date: string // ISO date string YYYY-MM-DD
  slot: string // e.g. "9:00 AM - 10:00 AM"
  facultyName: string
  department: string
  eventName: string
  guestSpeaker: string
  expectedAudience: string
  additionalNotes: string
  status: BookingStatus
  createdAt: string
}

export interface Hall {
  id: string
  name: string
  capacity: number
  facilities: string[]
  image: string
}

export const HALLS: Hall[] = [
  {
    id: "visvesvaraya",
    name: "Visvesvaraya Hall",
    capacity: 250,
    facilities: ["Projector", "AC", "Audio System", "Stage Lighting"],
    image: "/images/seminar-hall.jpg",
  },
  {
    id: "hall-2",
    name: "Hall 2",
    capacity: 120,
    facilities: ["Projector", "AC", "Audio System"],
    image: "/images/seminar-hall.jpg",
  },
]

export const TIME_SLOTS = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
]
