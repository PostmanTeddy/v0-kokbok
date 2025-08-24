"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, Search, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { IngredientData } from "@/lib/ingredient-data"

interface DataTableProps {
  data: IngredientData[]
  onImportClick?: () => void
}

type SortField = keyof IngredientData
type SortDirection = "asc" | "desc"

export function DataTable({ data, onImportClick }: DataTableProps) {
  const [search, setSearch] = React.useState("")
  const [sortField, setSortField] = React.useState<SortField>("name")
  const [sortDirection, setSortDirection] = React.useState<SortDirection>("asc")
  const [categoryFilter, setCategoryFilter] = React.useState<string>("")

  const categories = Array.from(new Set(data.map((item) => item.category)))

  const filteredAndSortedData = React.useMemo(() => {
    const filtered = data.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !categoryFilter || item.category === categoryFilter
      return matchesSearch && matchesCategory
    })

    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })

    return filtered
  }, [data, search, sortField, sortDirection, categoryFilter])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ink-muted" />
            <Input
              placeholder="Sök ingredienser..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-background border-border rounded-xl"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-xl text-sm"
          >
            <option value="">Alla kategorier</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {onImportClick && (
          <Button onClick={onImportClick} className="bg-brand text-brand-foreground hover:bg-brand/90">
            <Upload className="h-4 w-4 mr-2" />
            Importera Excel
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead>
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 hover:text-brand transition-colors"
                >
                  Namn
                  <SortIcon field="name" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("category")}
                  className="flex items-center gap-1 hover:text-brand transition-colors"
                >
                  Kategori
                  <SortIcon field="category" />
                </button>
              </TableHead>
              <TableHead className="text-right">
                <button
                  onClick={() => handleSort("calories")}
                  className="flex items-center gap-1 hover:text-brand transition-colors ml-auto"
                >
                  Kcal/100g
                  <SortIcon field="calories" />
                </button>
              </TableHead>
              <TableHead className="text-right">Protein</TableHead>
              <TableHead className="text-right">Kolhydrater</TableHead>
              <TableHead className="text-right">Fett</TableHead>
              <TableHead>Allergener</TableHead>
              <TableHead className="text-center">I skafferiet</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.map((ingredient) => (
              <TableRow key={ingredient.id} className="border-border">
                <TableCell className="font-medium text-ink">{ingredient.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="rounded-lg">
                    {ingredient.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">{ingredient.calories}</TableCell>
                <TableCell className="text-right font-mono">{ingredient.protein}g</TableCell>
                <TableCell className="text-right font-mono">{ingredient.carbs}g</TableCell>
                <TableCell className="text-right font-mono">{ingredient.fat}g</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {ingredient.allergens.map((allergen) => (
                      <Badge key={allergen} variant="outline" className="text-xs rounded-lg">
                        {allergen}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {ingredient.inPantry ? (
                    <div className="flex flex-col items-center">
                      <span className="text-green-600 font-medium">✓</span>
                      <span className="text-xs text-ink-muted">
                        {ingredient.pantryAmount} {ingredient.unit}
                      </span>
                    </div>
                  ) : (
                    <span className="text-ink-muted">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-ink-muted">
        Visar {filteredAndSortedData.length} av {data.length} ingredienser
      </div>
    </div>
  )
}
