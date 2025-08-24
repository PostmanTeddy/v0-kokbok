"use client"

import * as React from "react"
import { Check, Clock, Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Step } from "@/lib/recipe-data"

interface StepChecklistProps {
  steps: Step[]
  className?: string
}

interface StepState {
  completed: boolean
  timerActive: boolean
  timeRemaining: number
}

export function StepChecklist({ steps, className }: StepChecklistProps) {
  const [stepStates, setStepStates] = React.useState<Record<string, StepState>>(() => {
    const initialState: Record<string, StepState> = {}
    steps.forEach((step) => {
      initialState[step.id] = {
        completed: false,
        timerActive: false,
        timeRemaining: (step.duration || 0) * 60, // Convert to seconds
      }
    })
    return initialState
  })

  // Timer effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setStepStates((prev) => {
        const updated = { ...prev }
        let hasActiveTimer = false

        Object.keys(updated).forEach((stepId) => {
          if (updated[stepId].timerActive && updated[stepId].timeRemaining > 0) {
            updated[stepId].timeRemaining -= 1
            hasActiveTimer = true

            // Auto-complete step when timer reaches 0
            if (updated[stepId].timeRemaining === 0) {
              updated[stepId].timerActive = false
              updated[stepId].completed = true
            }
          }
        })

        return hasActiveTimer ? updated : prev
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const toggleStepCompletion = (stepId: string) => {
    setStepStates((prev) => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        completed: !prev[stepId].completed,
        timerActive: false, // Stop timer when manually toggling
      },
    }))
  }

  const toggleTimer = (stepId: string) => {
    setStepStates((prev) => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        timerActive: !prev[stepId].timerActive,
      },
    }))
  }

  const resetTimer = (stepId: string, duration: number) => {
    setStepStates((prev) => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        timerActive: false,
        timeRemaining: duration * 60,
      },
    }))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className={cn("space-y-4", className)}>
      {steps.map((step, index) => {
        const state = stepStates[step.id]
        const isCompleted = state.completed
        const hasTimer = step.duration && step.duration > 0
        const timerActive = state.timerActive
        const timeRemaining = state.timeRemaining

        return (
          <div
            key={step.id}
            className={cn(
              "flex gap-4 p-4 rounded-xl border transition-all",
              isCompleted ? "bg-green-50 border-green-200" : "bg-card border-border",
            )}
          >
            {/* Step Number & Checkbox */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <button
                onClick={() => toggleStepCompletion(step.id)}
                className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-brand hover:border-brand/70 hover:bg-brand/10",
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </button>
            </div>

            {/* Step Content */}
            <div className="flex-1 space-y-3">
              <p className={cn("leading-relaxed", isCompleted ? "text-green-700 line-through" : "text-ink")}>
                {step.instruction}
              </p>

              {step.notes && (
                <p className="text-sm text-ink-muted italic">
                  <strong>Tips:</strong> {step.notes}
                </p>
              )}

              {/* Timer Controls */}
              {hasTimer && (
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                  <Clock className="h-4 w-4 text-brand" />
                  <span className="font-mono text-lg font-semibold text-ink">{formatTime(timeRemaining)}</span>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleTimer(step.id)}
                      disabled={isCompleted || timeRemaining === 0}
                      className="h-8 px-3"
                    >
                      {timerActive ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => resetTimer(step.id, step.duration!)}
                      className="h-8 px-3"
                    >
                      <RotateCcw className="h-3 w-3" />
                    </Button>
                  </div>

                  {timeRemaining === 0 && !isCompleted && (
                    <span className="text-sm font-medium text-green-600 animate-pulse">Klar!</span>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
