"use client"

import { useNavigation } from "@/lib/navigation-context"
import { HALLS } from "@/lib/types"
import { Users, Monitor, Snowflake, Volume2, Lightbulb, ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"

const facilityIcons: Record<string, React.ReactNode> = {
  Projector: <Monitor className="h-3 w-3" />,
  AC: <Snowflake className="h-3 w-3" />,
  "Audio System": <Volume2 className="h-3 w-3" />,
  "Stage Lighting": <Lightbulb className="h-3 w-3" />,
}

export function HallSelection() {
  const { navigate, setSelectedHallId } = useNavigation()

  function handleSelect(hallId: string) {
    setSelectedHallId(hallId)
    navigate("slot-select")
  }

  return (
    <main className="min-h-screen px-6 pb-16 pt-28 sm:px-12 lg:px-20">
      <div className="mb-10">
        <button
          onClick={() => navigate("role-select")}
          className="mb-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </button>
        <span className="block text-[10px] uppercase tracking-[0.3em] text-accent">
          Step 01
        </span>
        <h1 className="mt-2 text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
          Select a Hall
        </h1>
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-2">
        {HALLS.map((hall, i) => (
          <button
            key={hall.id}
            onClick={() => handleSelect(hall.id)}
            className="group relative overflow-hidden bg-card text-left transition-colors hover:bg-secondary"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={hall.image}
                alt={`${hall.name} interior`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/40" />
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center gap-1.5 bg-background/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-foreground">
                  <Users className="h-3 w-3" />
                  {hall.capacity} seats
                </span>
              </div>
              <div className="absolute right-4 top-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/70">
                  0{i + 1}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {hall.name}
                </h2>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {hall.facilities.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1.5 border border-border px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                  >
                    {facilityIcons[f]}
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </main>
  )
}
