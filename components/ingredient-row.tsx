import type { Ingredient } from "@/lib/recipe-data"

interface IngredientRowProps {
  ingredient: Ingredient
  scale: number
}

export function IngredientRow({ ingredient, scale }: IngredientRowProps) {
  const scaledAmount = ingredient.amount * scale

  // Format the scaled amount nicely
  const formatAmount = (amount: number) => {
    if (amount < 1 && amount > 0) {
      return (amount * 1000).toFixed(0) + " g" // Convert to grams for small amounts
    }
    if (amount % 1 === 0) {
      return amount.toString()
    }
    return amount.toFixed(1)
  }

  return (
    <div className="flex items-start gap-3 py-2">
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-medium text-brand">
            {formatAmount(scaledAmount)} {ingredient.unit}
          </span>
          <span className="text-ink">{ingredient.name}</span>
        </div>
        {ingredient.notes && <p className="text-sm text-ink-muted mt-1">{ingredient.notes}</p>}
      </div>
    </div>
  )
}
