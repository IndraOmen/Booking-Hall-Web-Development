"use client"

import { useState } from "react"
import { useNavigation } from "@/lib/navigation-context"
import { ArrowRight, Lock, Mail, AlertCircle } from "lucide-react"

const ADMIN_CREDENTIALS: Record<string, string> = {
  "aveek@gmail.com": "1234",
}

export function LoginPage() {
  const { navigate, login } = useNavigation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const isAdminEmail = ADMIN_CREDENTIALS[email.toLowerCase().trim()] !== undefined

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const trimmedEmail = email.toLowerCase().trim()

    if (!trimmedEmail) {
      setError("Email is required.")
      return
    }

    if (isAdminEmail) {
      if (!password) {
        setError("Password is required for admin access.")
        return
      }
      if (ADMIN_CREDENTIALS[trimmedEmail] !== password) {
        setError("Incorrect admin password.")
        return
      }
      login(trimmedEmail, "admin")
      navigate("admin")
    } else {
      login(trimmedEmail, "faculty")
      navigate("hall-select")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent">
            Authentication
          </span>
          <h1 className="mt-3 text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
            Sign In
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Faculty members are signed in directly. Admin access requires a
            password.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-px bg-border">
          {/* Email Field */}
          <div className="bg-card p-6">
            <label
              htmlFor="email"
              className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError(null)
                }}
                placeholder="your.email@bvcoe.edu.in"
                className="w-full border border-border bg-secondary py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          {/* Password Field -- only shown when email matches admin */}
          {isAdminEmail && (
            <div className="bg-card p-6">
              <label
                htmlFor="password"
                className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-accent"
              >
                <Lock className="h-3 w-3" />
                Admin Password Required
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError(null)
                  }}
                  placeholder="Enter admin password"
                  className="w-full border border-border bg-secondary py-3 pl-10 pr-20 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 px-6 py-3">
              <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 text-red-400" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="group flex items-center justify-center gap-3 bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {isAdminEmail ? "Sign In as Admin" : "Continue as Faculty"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        {/* Role indicator */}
        <div className="mt-6 border border-border bg-card p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Detected role
          </p>
          <p className="mt-1 text-sm font-bold uppercase tracking-wide text-foreground">
            {isAdminEmail ? (
              <span className="text-accent">Administrator</span>
            ) : email.trim() ? (
              "Faculty Member"
            ) : (
              <span className="text-muted-foreground">Enter email to detect</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
