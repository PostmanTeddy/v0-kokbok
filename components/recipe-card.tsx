import Image from "next/image"
import Link from "next/link"
import { Clock, Users, ChefHat } from "lucide-react"
import type { Recipe } from "@/lib/recipe-data"
import { cn } from "@/lib/utils"

interface RecipeCardProps {
  recipe: Recipe
  className?: string
}

export function RecipeCard({ recipe, className }: RecipeCardProps) {
  const difficultyColors = {
    Lätt: "text-green-600 bg-green-50",
    Medel: "text-yellow-600 bg-yellow-50",
    Svår: "text-red-600 bg-red-50",
  }

  return (
    <Link href={`/recipes/${recipe.id}`} className={cn("group block", className)}>
      <div className="bg-card rounded-2xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={recipe.image || "/placeholder.svg"}
            alt={recipe.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <span className={cn("px-2 py-1 rounded-lg text-xs font-medium", difficultyColors[recipe.difficulty])}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-ink group-hover:text-brand transition-colors line-clamp-2">
              {recipe.name}
            </h3>
            <p className="text-ink-soft text-sm mt-1 line-clamp-2">{recipe.description}</p>
          </div>

          <div className="flex items-center gap-4 text-ink-muted text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.totalTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} port</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="h-4 w-4" />
              <span>{recipe.category}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-accent/50 text-accent-foreground text-xs rounded-lg">
                {tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-lg">
                +{recipe.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
