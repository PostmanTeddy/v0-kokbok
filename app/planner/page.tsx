"use client"

import * as React from "react"
import { Calendar, Plus, ShoppingCart, ChefHat } from "lucide-react"
import { mockRecipes } from "@/lib/recipe-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedReveal } from "@/components/animated-reveal"
import { EnhancedGradientSpotlight } from "@/components/enhanced-gradient-spotlight"

interface PlannedMeal {
  id: string
  recipeId: string
  day: string
  meal: "breakfast" | "lunch" | "dinner"
  servings: number
}

export default function PlannerPage() {
  const [plannedMeals, setPlannedMeals] = React.useState<PlannedMeal[]>([
    {
      id: "1",
      recipeId: "1",
      day: "måndag",
      meal: "dinner",
      servings: 4,
    },
    {
      id: "2",
      recipeId: "2",
      day: "tisdag",
      meal: "lunch",
      servings: 2,
    },
  ])

  const days = ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"]
  const meals = [
    { id: "breakfast", label: "Frukost", icon: "🌅" },
    { id: "lunch", label: "Lunch", icon: "☀️" },
    { id: "dinner", label: "Middag", icon: "🌙" },
  ]

  const getPlannedMeal = (day: string, meal: string) => {
    return plannedMeals.find((pm) => pm.day === day && pm.meal === meal)
  }

  const getRecipe = (recipeId: string) => {
    return mockRecipes.find((r) => r.id === recipeId)
  }

  const removeMeal = (id: string) => {
    setPlannedMeals((prev) => prev.filter((meal) => meal.id !== id))
  }

  const generateShoppingList = () => {
    const ingredients: Record<string, { amount: number; unit: string; name: string }> = {}

    plannedMeals.forEach((plannedMeal) => {
      const recipe = getRecipe(plannedMeal.recipeId)
      if (recipe) {
        const scale = plannedMeal.servings / recipe.servings
        recipe.ingredients.forEach((ingredient) => {
          const key = ingredient.name.toLowerCase()
          if (ingredients[key]) {
            ingredients[key].amount += ingredient.amount * scale
          } else {
            ingredients[key] = {
              name: ingredient.name,
              amount: ingredient.amount * scale,
              unit: ingredient.unit,
            }
          }
        })
      }
    })

    return Object.values(ingredients)
  }

  const shoppingList = generateShoppingList()

  return (
    <EnhancedGradientSpotlight className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <AnimatedReveal>
            <div className="flex items-center justify-between">
              <div>
                <h1>Veckoplanering</h1>
                <p className="text-ink-soft mt-2">Planera dina måltider för veckan och generera inköpslistor.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-transparent">
                  <Calendar className="h-4 w-4 mr-2" />
                  Denna vecka
                </Button>
                <Button className="bg-brand text-brand-foreground hover:bg-brand/90">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Skapa inköpslista ({shoppingList.length})
                </Button>
              </div>
            </div>
          </AnimatedReveal>

          {/* Week Planner Grid */}
          <AnimatedReveal delay={0.1}>
            <div className="bg-card rounded-2xl shadow-card overflow-hidden">
              <div className="grid grid-cols-8 gap-0">
                {/* Header */}
                <div className="p-4 bg-muted border-r border-border">
                  <span className="font-medium text-ink">Måltid</span>
                </div>
                {days.map((day) => (
                  <div key={day} className="p-4 bg-muted border-r border-border last:border-r-0">
                    <span className="font-medium text-ink capitalize">{day}</span>
                  </div>
                ))}

                {/* Meal Rows */}
                {meals.map((meal) => (
                  <React.Fragment key={meal.id}>
                    <div className="p-4 bg-background border-r border-t border-border">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{meal.icon}</span>
                        <span className="font-medium text-ink">{meal.label}</span>
                      </div>
                    </div>
                    {days.map((day) => {
                      const plannedMeal = getPlannedMeal(day, meal.id)
                      const recipe = plannedMeal ? getRecipe(plannedMeal.recipeId) : null

                      return (
                        <div
                          key={`${day}-${meal.id}`}
                          className="p-2 border-r border-t border-border last:border-r-0 min-h-[100px]"
                        >
                          {recipe ? (
                            <div className="bg-accent/20 rounded-lg p-3 h-full">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-sm text-ink line-clamp-2">{recipe.name}</h4>
                                <button
                                  onClick={() => removeMeal(plannedMeal.id)}
                                  className="text-ink-muted hover:text-destructive transition-colors text-xs"
                                >
                                  ×
                                </button>
                              </div>
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary" className="text-xs">
                                  {plannedMeal.servings} port
                                </Badge>
                                <span className="text-xs text-ink-muted">{recipe.totalTime}min</span>
                              </div>
                            </div>
                          ) : (
                            <button className="w-full h-full border-2 border-dashed border-border rounded-lg flex items-center justify-center hover:border-brand hover:bg-brand/5 transition-colors group">
                              <Plus className="h-5 w-5 text-ink-muted group-hover:text-brand" />
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </AnimatedReveal>

          {/* Quick Add Recipes */}
          <AnimatedReveal delay={0.2}>
            <div className="bg-card rounded-2xl shadow-card p-6">
              <h3 className="font-medium text-ink mb-4 flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                Snabbtillägg
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockRecipes.map((recipe) => (
                  <div key={recipe.id} className="p-4 bg-background rounded-xl border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-ink">{recipe.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {recipe.totalTime}min
                      </Badge>
                    </div>
                    <p className="text-sm text-ink-muted mb-3 line-clamp-2">{recipe.description}</p>
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      Lägg till i planering
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedReveal>

          {/* Shopping List Preview */}
          {shoppingList.length > 0 && (
            <AnimatedReveal delay={0.3}>
              <div className="bg-card rounded-2xl shadow-card p-6">
                <h3 className="font-medium text-ink mb-4 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Inköpslista förhandsvisning
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {shoppingList.slice(0, 8).map((item, index) => (
                    <div key={index} className="p-2 bg-background rounded-lg border border-border">
                      <div className="text-sm font-medium text-ink">{item.name}</div>
                      <div className="text-xs text-ink-muted">
                        {item.amount.toFixed(1)} {item.unit}
                      </div>
                    </div>
                  ))}
                </div>
                {shoppingList.length > 8 && (
                  <p className="text-sm text-ink-muted mt-3">...och {shoppingList.length - 8} till</p>
                )}
              </div>
            </AnimatedReveal>
          )}
        </div>
      </div>
    </EnhancedGradientSpotlight>
  )
}
