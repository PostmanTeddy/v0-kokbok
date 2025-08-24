"use client"

import * as React from "react"
import { mockRecipes } from "@/lib/recipe-data"
import { RecipeCard } from "@/components/recipe-card"
import { FilterBar, type FilterState } from "@/components/filter-bar"
import { StaggeredGrid } from "@/components/animated-reveal"
import { EnhancedGradientSpotlight } from "@/components/enhanced-gradient-spotlight"

export default function RecipesPage() {
  const [filters, setFilters] = React.useState<FilterState>({
    search: "",
    categories: [],
    difficulties: [],
    maxTime: null,
    tags: [],
  })

  // Get unique values for filter options
  const availableCategories = Array.from(new Set(mockRecipes.map((r) => r.category)))
  const availableTags = Array.from(new Set(mockRecipes.flatMap((r) => r.tags)))

  // Filter recipes based on current filters
  const filteredRecipes = React.useMemo(() => {
    return mockRecipes.filter((recipe) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          recipe.name.toLowerCase().includes(searchLower) ||
          recipe.description.toLowerCase().includes(searchLower) ||
          recipe.ingredients.some((ing) => ing.name.toLowerCase().includes(searchLower)) ||
          recipe.tags.some((tag) => tag.toLowerCase().includes(searchLower))

        if (!matchesSearch) return false
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(recipe.category)) {
        return false
      }

      // Difficulty filter
      if (filters.difficulties.length > 0 && !filters.difficulties.includes(recipe.difficulty)) {
        return false
      }

      // Time filter
      if (filters.maxTime && recipe.totalTime > filters.maxTime) {
        return false
      }

      // Tags filter
      if (filters.tags.length > 0 && !filters.tags.some((tag) => recipe.tags.includes(tag))) {
        return false
      }

      return true
    })
  }, [filters])

  return (
    <EnhancedGradientSpotlight className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1>Alla recept</h1>
            <p className="text-ink-soft mt-2">Upptäck dina sparade recept och hitta nya favoriter.</p>
          </div>

          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            availableCategories={availableCategories}
            availableTags={availableTags}
          />

          <div className="flex items-center justify-between">
            <p className="text-ink-muted">
              {filteredRecipes.length} av {mockRecipes.length} recept
            </p>
          </div>

          {filteredRecipes.length > 0 ? (
            <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </StaggeredGrid>
          ) : (
            <div className="p-8 bg-card rounded-2xl shadow-card text-center">
              <p className="text-ink-muted">Inga recept matchar dina filter. Prova att justera sökningen.</p>
            </div>
          )}
        </div>
      </div>
    </EnhancedGradientSpotlight>
  )
}
