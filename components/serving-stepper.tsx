"use client"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ServingStepperProps {
  servings: number
  onServingsChange: (servings: number) => void
  min?: number
  max?: number
}

export function ServingStepper({ servings, onServingsChange, min = 1, max = 12 }: ServingStepperProps) {
  const handleDecrease = () => {
    if (servings > min) {
      onServingsChange(servings - 1)
    }
  }

  const handleIncrease = () => {
    if (servings < max) {
      onServingsChange(servings + 1)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-ink-soft">Portioner:</span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrease}
          disabled={servings <= min}
          className="h-8 w-8 rounded-lg bg-transparent"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center font-semibold text-ink">{servings}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrease}
          disabled={servings >= max}
          className="h-8 w-8 rounded-lg"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
