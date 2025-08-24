"use client"

import * as React from "react"
import { notFound, useParams } from "next/navigation"
import { Clock, Users, ChefHat, AlertTriangle } from "lucide-react"
import { mockRecipes } from "@/lib/recipe-data"
import { ServingStepper } from "@/components/serving-stepper"
import { IngredientRow } from "@/components/ingredient-row"
import { StepChecklist } from "@/components/step-checklist"
import { ParallaxHero } from "@/components/parallax-hero"
import { AnimatedReveal } from "@/components/animated-reveal"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RecipePage() {
  const params = useParams()
  const [servings, setServings] = React.useState(4)

  const id = params.id as string
  const recipe = mockRecipes.find((r) => r.id === id)

  if (!recipe) {
    notFound()
  }

  const scale = servings / recipe.servings

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Parallax Hero Section */}
      <AnimatedReveal>
        <ParallaxHero
          image={recipe.image || "/placeholder.svg"}
          title={recipe.name}
          description={recipe.description}
          className="mb-8"
        />
      </AnimatedReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recipe Info */}
          <AnimatedReveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-6 p-6 bg-card rounded-2xl shadow-card">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand" />
                <div>
                  <p className="text-sm text-ink-muted">Total tid</p>
                  <p className="font-semibold text-ink">{recipe.totalTime} min</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-brand" />
                <div>
                  <p className="text-sm text-ink-muted">Portioner</p>
                  <p className="font-semibold text-ink">{recipe.servings}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-brand" />
                <div>
                  <p className="text-sm text-ink-muted">Svårighetsgrad</p>
                  <p className="font-semibold text-ink">{recipe.difficulty}</p>
                </div>
              </div>
            </div>
          </AnimatedReveal>

          {/* Ingredients */}
          <AnimatedReveal delay={0.2}>
            <div className="p-6 bg-card rounded-2xl shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h2>Ingredienser</h2>
                <ServingStepper servings={servings} onServingsChange={setServings} />
              </div>
              <div className="space-y-1">
                {recipe.ingredients.map((ingredient) => (
                  <IngredientRow key={ingredient.id} ingredient={ingredient} scale={scale} />
                ))}
              </div>
            </div>
          </AnimatedReveal>

          {/* Instructions with Tabs */}
          <AnimatedReveal delay={0.3}>
            <div className="p-6 bg-card rounded-2xl shadow-card">
              <Tabs defaultValue="instructions" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="instructions">Instruktioner</TabsTrigger>
                  <TabsTrigger value="checklist">Steg-för-steg</TabsTrigger>
                </TabsList>

                <TabsContent value="instructions" className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <div key={step.id} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-brand text-brand-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-ink leading-relaxed">{step.instruction}</p>
                        {step.duration && (
                          <p className="text-sm text-ink-muted mt-1">
                            <Clock className="inline h-4 w-4 mr-1" />
                            {step.duration} minuter
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="checklist">
                  <StepChecklist steps={recipe.steps} />
                </TabsContent>
              </Tabs>
            </div>
          </AnimatedReveal>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Nutrition */}
          <AnimatedReveal delay={0.4}>
            <div className="p-6 bg-card rounded-2xl shadow-card">
              <h3 className="font-semibold text-ink mb-4">Näringsvärden per portion</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-ink-soft">Kalorier</span>
                  <span className="font-semibold text-ink">{Math.round(recipe.nutrition.calories * scale)} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Protein</span>
                  <span className="font-semibold text-ink">{Math.round(recipe.nutrition.protein * scale)} g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Kolhydrater</span>
                  <span className="font-semibold text-ink">{Math.round(recipe.nutrition.carbs * scale)} g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Fett</span>
                  <span className="font-semibold text-ink">{Math.round(recipe.nutrition.fat * scale)} g</span>
                </div>
              </div>
            </div>
          </AnimatedReveal>

          {/* Allergens */}
          {recipe.allergens.length > 0 && (
            <AnimatedReveal delay={0.5}>
              <div className="p-6 bg-card rounded-2xl shadow-card">
                <h3 className="font-semibold text-ink mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Allergener
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.allergens.map((allergen) => (
                    <span
                      key={allergen}
                      className="px-3 py-1 bg-yellow-50 text-yellow-700 text-sm rounded-lg border border-yellow-200"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedReveal>
          )}

          {/* Tags */}
          <AnimatedReveal delay={0.6}>
            <div className="p-6 bg-card rounded-2xl shadow-card">
              <h3 className="font-semibold text-ink mb-4">Taggar</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-accent/50 text-accent-foreground text-sm rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedReveal>

          {/* Actions */}
          <AnimatedReveal delay={0.7}>
            <div className="space-y-3">
              <Button className="w-full bg-brand text-brand-foreground hover:bg-brand/90">Lägg i planering</Button>
              <Button variant="outline" className="w-full bg-transparent">
                Skriv ut recept
              </Button>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </div>
  )
}
