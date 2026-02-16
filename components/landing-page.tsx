"use client"

import { useNavigation } from "@/lib/navigation-context"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function LandingPage() {
  const { navigate } = useNavigation()

  return (
    <div className="flex flex-col">
      {/* Hero Section - Full viewport, editorial style */}
      <section className="relative min-h-[100vh] overflow-hidden bg-background">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hall-wide.jpg"
            alt="Seminar hall with dramatic lighting"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-background/70" />
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Overlapping Typography - Paper Tiger inspired */}
        <div className="relative z-10 flex min-h-[100vh] flex-col justify-end px-6 pb-12 sm:px-12 lg:px-20">
          {/* Small label */}
          <div className="mb-6">
            <span className="inline-block border border-foreground/30 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-foreground/70">
              BVCOE Navi Mumbai
            </span>
          </div>

          {/* Giant overlapping headline */}
          <h1 className="relative text-balance">
            <span className="block text-[clamp(3rem,12vw,10rem)] font-bold uppercase leading-[0.85] tracking-tighter text-foreground">
              Seminar
            </span>
            <span className="block text-[clamp(3rem,12vw,10rem)] font-bold uppercase leading-[0.85] tracking-tighter text-foreground">
              Hall
            </span>
            <span className="mt-2 block text-[clamp(1.5rem,4vw,3.5rem)] font-light uppercase leading-[1] tracking-[0.15em] text-accent">
              Booking Portal
            </span>
          </h1>

          {/* Subtitle and CTA row */}
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Streamlined seminar hall reservation system for faculty.
              <br />
              Select. Schedule. Present.
            </p>
            <button
              onClick={() => navigate("login")}
              className="group inline-flex items-center gap-3 border border-foreground bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-background transition-all hover:bg-accent hover:text-accent-foreground"
            >
              Start Booking
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Overlapping image section - breaks the grid */}
      <section className="relative bg-background px-6 py-24 sm:px-12 lg:px-20">
        {/* Image that overlaps upward into the hero */}
        <div className="relative -mt-40 flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Left floating image */}
          <div className="relative aspect-[3/4] w-full overflow-hidden lg:w-1/3">
            <Image
              src="/images/hall-detail.jpg"
              alt="Seminar podium microphone detail"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-background/90 p-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                01 / Visvesvaraya Hall
              </span>
              <p className="mt-1 text-xs text-foreground">
                250 seats / Full AV setup
              </p>
            </div>
          </div>

          {/* Center floating image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:mt-20 lg:w-1/3">
            <Image
              src="/images/seminar-hall.jpg"
              alt="Seminar hall seating"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-background/90 p-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                02 / Hall 2
              </span>
              <p className="mt-1 text-xs text-foreground">
                120 seats / Compact venue
              </p>
            </div>
          </div>

          {/* Right text block */}
          <div className="flex flex-col justify-end lg:mt-40 lg:w-1/3">
            <h2 className="text-[clamp(1.25rem,3vw,2rem)] font-bold uppercase leading-tight tracking-tight text-foreground">
              Where Ideas
              <br />
              <span className="text-accent">Take The Stage</span>
            </h2>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Two state-of-the-art seminar halls equipped with projectors,
              sound systems, and modern seating. Book your slot for guest
              lectures, workshops, conferences, and academic presentations.
            </p>
          </div>
        </div>
      </section>

      {/* Feature strip - bold horizontal layout */}
      <section className="border-t border-border bg-background px-6 py-16 sm:px-12 lg:px-20">
        <div className="grid gap-px bg-border sm:grid-cols-3">
          <div className="flex flex-col gap-3 bg-background p-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent">
              01
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
              Easy Scheduling
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Select your preferred hall, date, and time slot in just a few
              clicks. No paperwork needed.
            </p>
          </div>
          <div className="flex flex-col gap-3 bg-background p-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent">
              02
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
              Admin Approval
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              All requests go through admin review to prevent scheduling
              conflicts and ensure availability.
            </p>
          </div>
          <div className="flex flex-col gap-3 bg-background p-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent">
              03
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
              Real-Time Status
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              View live slot availability and track your booking status
              from pending to approved.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background px-6 py-8 sm:px-12 lg:px-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Bharati Vidyapeeth College of Engineering, Navi Mumbai
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Seminar Hall Booking System
          </span>
        </div>
      </footer>
    </div>
  )
}
