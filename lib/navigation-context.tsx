"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

export type Page =
  | "landing"
  | "login"
  | "hall-select"
  | "slot-select"
  | "event-details"
  | "confirmation"
  | "admin"

export type UserRole = "admin" | "faculty" | null

interface NavigationContextValue {
  currentPage: Page
  navigate: (page: Page) => void
  selectedHallId: string | null
  setSelectedHallId: (id: string | null) => void
  selectedDate: string | null
  setSelectedDate: (date: string | null) => void
  selectedSlot: string | null
  setSelectedSlot: (slot: string | null) => void
  lastBookingId: string | null
  setLastBookingId: (id: string | null) => void
  userRole: UserRole
  userEmail: string | null
  login: (email: string, role: UserRole) => void
  logout: () => void
}

const NavigationContext = createContext<NavigationContextValue | null>(null)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>("landing")
  const [selectedHallId, setSelectedHallId] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [lastBookingId, setLastBookingId] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as UserRole
    const storedEmail = localStorage.getItem("userEmail")
    if (storedRole && storedEmail) {
      setUserRole(storedRole)
      setUserEmail(storedEmail)
    }
  }, [])

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const login = useCallback((email: string, role: UserRole) => {
    setUserRole(role)
    setUserEmail(email)
    localStorage.setItem("userRole", role ?? "")
    localStorage.setItem("userEmail", email)
  }, [])

  const logout = useCallback(() => {
    setUserRole(null)
    setUserEmail(null)
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    setCurrentPage("landing")
  }, [])

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        navigate,
        selectedHallId,
        setSelectedHallId,
        selectedDate,
        setSelectedDate,
        selectedSlot,
        setSelectedSlot,
        lastBookingId,
        setLastBookingId,
        userRole,
        userEmail,
        login,
        logout,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
