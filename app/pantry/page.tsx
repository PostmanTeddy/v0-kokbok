"use client"

import * as React from "react"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import { mockIngredients } from "@/lib/ingredient-data"
import { mockRecipes } from "@/lib/recipe-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedReveal } from "@/components/animated-reveal"
import { EnhancedGradientSpotlight } from "@/components/enhanced-gradient-spotlight"

export default function PantryPage() {
  const [pantryItems, setPantryItems] = React.useState(mockIngredients.filter((item) => item.inPantry))
  const [showRecipeMatches, setShowRecipeMatches] = React.useState(false)

  const updatePantryAmount = (id: string, change: number) => {
    setPantryItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              pantryAmount: Math.max(0, (item.pantryAmount || 0) + change),
            }
          : item,
      ),
    )
  }

  const addToPantry = (ingredient: (typeof mockIngredients)[0]) => {
    setPantryItems((prev) => {
      const existing = prev.find((item) => item.id === ingredient.id)
      if (existing) {
        return prev.map((item) => (item.id === ingredient.id ? { ...item, pantryAmount: 1 } : item))
      }
      return [...prev, { ...ingredient, inPantry: true, pantryAmount: 1 }]
    })
  }

  const removeFromPantry = (id: string) => {
    setPantryItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Calculate recipe matches
  const recipeMatches = React.useMemo(() => {
    return mockRecipes
      .map((recipe) => {
        const totalIngredients = recipe.ingredients.length
        const availableIngredients = recipe.ingredients.filter((recipeIngredient) => {
          const pantryItem = pantryItems.find((item) => item.name.toLowerCase() === recipeIngredient.name.toLowerCase())
          return pantryItem && (pantryItem.pantryAmount || 0) > 0
        }).length

        const matchPercentage = Math.round((availableIngredients / totalIngredients) * 100)
        const missingCount = totalIngredients - availableIngredients

        return {
          recipe,
          matchPercentage,
          availableIngredients,
          totalIngredients,
          missingCount,
        }
      })
      .filter((match) => match.matchPercentage > 0)
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
  }, [pantryItems])

  const availableIngredients = mockIngredients.filter((item) => !pantryItems.find((p) => p.id === item.id))

  return (
    <EnhancedGradientSpotlight className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <AnimatedReveal>
            <div>
              <h1>Skafferi</h1>
              <p className="text-ink-soft mt-2">
                Håll koll på vad du har hemma och hitta recept baserat på dina tillgängliga ingredienser.
              </p>
            </div>
          </AnimatedReveal>

          {/* Pantry Items */}
          <AnimatedReveal delay={0.1}>
            <div className="bg-card rounded-2xl shadow-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2>Ditt skafferi</h2>
                <Button
                  onClick={() => setShowRecipeMatches(!showRecipeMatches)}
                  className="bg-brand text-brand-foreground hover:bg-brand/90"
                >
                  {showRecipeMatches ? "Visa skafferi" : "Hitta rätter"}
                </Button>
              </div>

              {!showRecipeMatches ? (
                <div className="space-y-4">
                  {pantryItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pantryItems.map((item) => (
                        <div key={item.id} className="p-4 bg-background rounded-xl border border-border">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-medium text-ink">{item.name}</h3>
                              <Badge variant="secondary" className="text-xs mt-1">
                                {item.category}
                              </Badge>
                            </div>
                            <button
                              onClick={() => removeFromPantry(item.id)}
                              className="text-ink-muted hover:text-destructive transition-colors"
                            >
                              ×
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updatePantryAmount(item.id, -1)}
                                disabled={(item.pantryAmount || 0) <= 0}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-mono text-sm min-w-[60px] text-center">
                                {item.pantryAmount} {item.unit}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updatePantryAmount(item.id, 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-ink-muted">Ditt skafferi är tomt. Lägg till ingredienser nedan.</p>
                    </div>
                  )}

                  {/* Add Ingredients */}
                  <div className="border-t border-border pt-6">
                    <h3 className="font-medium text-ink mb-4">Lägg till ingredienser</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {availableIngredients.slice(0, 12).map((ingredient) => (
                        <button
                          key={ingredient.id}
                          onClick={() => addToPantry(ingredient)}
                          className="p-2 text-left bg-background hover:bg-accent/50 rounded-lg border border-border transition-colors"
                        >
                          <div className="text-sm font-medium text-ink">{ingredient.name}</div>
                          <div className="text-xs text-ink-muted">{ingredient.category}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Recipe Matches */
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-lg font-medium text-ink mb-2">Recept du kan laga</p>
                    <p className="text-ink-muted">Baserat på vad du har i skafferiet</p>
                  </div>

                  {recipeMatches.length > 0 ? (
                    <div className="space-y-4">
                      {recipeMatches.map((match) => (
                        <div key={match.recipe.id} className="p-4 bg-background rounded-xl border border-border">
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-medium text-ink">{match.recipe.name}</h3>
                                <Badge
                                  variant={match.matchPercentage === 100 ? "default" : "secondary"}
                                  className={
                                    match.matchPercentage === 100
                                      ? "bg-green-500 text-white"
                                      : match.matchPercentage >= 75
                                        ? "bg-yellow-500 text-white"
                                        : "bg-gray-500 text-white"
                                  }
                                >
                                  {match.matchPercentage}% match
                                </Badge>
                              </div>
                              <p className="text-sm text-ink-muted mb-2">{match.recipe.description}</p>
                              <div className="flex items-center gap-4 text-sm text-ink-soft">
                                <span>
                                  {match.availableIngredients}/{match.totalIngredients} ingredienser
                                </span>
                                {match.missingCount > 0 && <span>Saknas {match.missingCount}</span>}
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button size="sm" asChild>
                                <a href={`/recipes/${match.recipe.id}`}>Visa recept</a>
                              </Button>
                              {match.missingCount > 0 && (
                                <Button size="sm" variant="outline">
                                  <ShoppingCart className="h-3 w-3 mr-1" />
                                  Lägg på lista
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-ink-muted">
                        Inga recept matchar dina ingredienser. Lägg till fler ingredienser i skafferiet.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </EnhancedGradientSpotlight>
  )
}
