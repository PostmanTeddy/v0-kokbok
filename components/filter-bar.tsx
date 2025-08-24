"use client"

import * as React from "react"
import { Search, X, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export interface FilterState {
  search: string
  categories: string[]
  difficulties: string[]
  maxTime: number | null
  tags: string[]
}

interface FilterBarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  availableCategories: string[]
  availableTags: string[]
  className?: string
}

export function FilterBar({ filters, onFiltersChange, availableCategories, availableTags, className }: FilterBarProps) {
  const [searchValue, setSearchValue] = React.useState(filters.search)

  // Debounced search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, search: searchValue })
    }, 300)

    return () => clearTimeout(timer)
  }, [searchValue])

  const removeFilter = (type: keyof FilterState, value: string | number) => {
    if (type === "categories") {
      onFiltersChange({
        ...filters,
        categories: filters.categories.filter((c) => c !== value),
      })
    } else if (type === "difficulties") {
      onFiltersChange({
        ...filters,
        difficulties: filters.difficulties.filter((d) => d !== value),
      })
    } else if (type === "tags") {
      onFiltersChange({
        ...filters,
        tags: filters.tags.filter((t) => t !== value),
      })
    } else if (type === "maxTime") {
      onFiltersChange({ ...filters, maxTime: null })
    }
  }

  const clearAllFilters = () => {
    setSearchValue("")
    onFiltersChange({
      search: "",
      categories: [],
      difficulties: [],
      maxTime: null,
      tags: [],
    })
  }

  const hasActiveFilters =
    filters.search ||
    filters.categories.length > 0 ||
    filters.difficulties.length > 0 ||
    filters.maxTime ||
    filters.tags.length > 0

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ink-muted" />
        <Input
          placeholder="Sök recept, ingredienser..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10 bg-background border-border rounded-xl"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Category Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Kategori
              {filters.categories.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                  {filters.categories.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="rounded-xl">
            <DropdownMenuLabel>Kategorier</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableCategories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onFiltersChange({
                      ...filters,
                      categories: [...filters.categories, category],
                    })
                  } else {
                    onFiltersChange({
                      ...filters,
                      categories: filters.categories.filter((c) => c !== category),
                    })
                  }
                }}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Difficulty Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
              Svårighet
              {filters.difficulties.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                  {filters.difficulties.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="rounded-xl">
            <DropdownMenuLabel>Svårighetsgrad</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["Lätt", "Medel", "Svår"].map((difficulty) => (
              <DropdownMenuCheckboxItem
                key={difficulty}
                checked={filters.difficulties.includes(difficulty)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onFiltersChange({
                      ...filters,
                      difficulties: [...filters.difficulties, difficulty],
                    })
                  } else {
                    onFiltersChange({
                      ...filters,
                      difficulties: filters.difficulties.filter((d) => d !== difficulty),
                    })
                  }
                }}
              >
                {difficulty}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Time Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
              Tid
              {filters.maxTime && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                  1
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="rounded-xl">
            <DropdownMenuLabel>Max tid</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[15, 30, 45, 60, 90].map((time) => (
              <DropdownMenuCheckboxItem
                key={time}
                checked={filters.maxTime === time}
                onCheckedChange={(checked) => {
                  onFiltersChange({
                    ...filters,
                    maxTime: checked ? time : null,
                  })
                }}
              >
                {time} minuter
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Tags Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
              Taggar
              {filters.tags.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                  {filters.tags.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="rounded-xl max-h-60 overflow-y-auto">
            <DropdownMenuLabel>Taggar</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableTags.map((tag) => (
              <DropdownMenuCheckboxItem
                key={tag}
                checked={filters.tags.includes(tag)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onFiltersChange({
                      ...filters,
                      tags: [...filters.tags, tag],
                    })
                  } else {
                    onFiltersChange({
                      ...filters,
                      tags: filters.tags.filter((t) => t !== tag),
                    })
                  }
                }}
              >
                {tag}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-ink-muted hover:text-ink">
            Rensa alla
          </Button>
        )}
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.categories.map((category) => (
            <Badge key={category} variant="secondary" className="rounded-lg">
              {category}
              <button
                onClick={() => removeFilter("categories", category)}
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.difficulties.map((difficulty) => (
            <Badge key={difficulty} variant="secondary" className="rounded-lg">
              {difficulty}
              <button
                onClick={() => removeFilter("difficulties", difficulty)}
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.maxTime && (
            <Badge variant="secondary" className="rounded-lg">
              Max {filters.maxTime} min
              <button
                onClick={() => removeFilter("maxTime", filters.maxTime)}
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-lg">
              {tag}
              <button
                onClick={() => removeFilter("tags", tag)}
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
