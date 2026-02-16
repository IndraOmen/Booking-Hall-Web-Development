"use client"

import { useNavigation } from "@/lib/navigation-context"
import { LogOut } from "lucide-react"

export function Navbar() {
  const { navigate, currentPage, userRole, userEmail, logout } = useNavigation()

  const isLoggedIn = !!userRole && !!userEmail

  return (
    <header className="fixed left-0 right-0 top-0 z-50 mix-blend-difference">
      <div className="flex h-20 items-center justify-between px-6 sm:px-12 lg:px-20">
        <button
          onClick={() => navigate("landing")}
          className="flex flex-col"
          aria-label="Go to home page"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
            BVCOE
          </span>
          <span className="text-[9px] uppercase tracking-[0.15em] text-white/60">
            Navi Mumbai
          </span>
        </button>

        <nav className="flex items-center gap-6">
          {isLoggedIn && currentPage !== "landing" && (
            <span className="hidden text-[10px] uppercase tracking-[0.15em] text-white/50 sm:inline">
              {userEmail}
            </span>
          )}
          {isLoggedIn && (
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
              aria-label="Sign out"
            >
              <LogOut className="h-3 w-3" />
              Logout
            </button>
          )}
          {!isLoggedIn && currentPage !== "landing" && currentPage !== "login" && (
            <button
              onClick={() => navigate("login")}
              className="text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
