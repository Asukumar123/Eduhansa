"use client"

import { useState, useEffect } from "react"
import { Clock, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimerProps {
  initialTime: number // in seconds
  onTimeUp: () => void
  className?: string
}

export function Timer({ initialTime, onTimeUp, className }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const isWarning = timeLeft < 600 // Less than 10 minutes
  const isCritical = timeLeft < 300 // Less than 5 minutes

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-sm font-medium",
        isCritical
          ? "bg-red-100 text-red-700 animate-pulse"
          : isWarning
            ? "bg-orange-100 text-orange-700"
            : "bg-blue-100 text-blue-700",
        className,
      )}
    >
      {isCritical ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
      {formatTime(timeLeft)}
    </div>
  )
}
