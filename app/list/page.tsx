"use client"

import * as React from "react"
import { Check, Plus, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AnimatedReveal } from "@/components/animated-reveal"
import { EnhancedGradientSpotlight } from "@/components/enhanced-gradient-spotlight"

interface ShoppingItem {
  id: string
  name: string
  amount: number
  unit: string
  category: string
  checked: boolean
  fromRecipe?: string
}

export default function ShoppingListPage() {
  const [items, setItems] = React.useState<ShoppingItem[]>([
    { id: "1", name: "Köttfärs", amount: 500, unit: "g", category: "Kött", checked: false, fromRecipe: "Köttbullar" },
    { id: "2", name: "Mjölk", amount: 1, unit: "l", category: "Mejeri", checked: false, fromRecipe: "Pannkakor" },
    { id: "3", name: "Ägg", amount: 6, unit: "st", category: "Mejeri", checked: true, fromRecipe: "Pannkakor" },
    { id: "4", name: "Lax", amount: 600, unit: "g", category: "Fisk", checked: false, fromRecipe: "Laxgryta" },
    { id: "5", name: "Potatis", amount: 1, unit: "kg", category: "Grönsaker", checked: false },
    { id: "6", name: "Bröd", amount: 1, unit: "st", category: "Bakverk", checked: false },
  ])

  const [newItem, setNewItem] = React.useState("")

  const toggleItem = (id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const addItem = () => {
    if (newItem.trim()) {
      const item: ShoppingItem = {
        id: Date.now().toString(),
        name: newItem.trim(),
        amount: 1,
        unit: "st",
        category: "Övrigt",
        checked: false,
      }
      setItems((prev) => [...prev, item])
      setNewItem("")
    }
  }

  const clearChecked = () => {
    setItems((prev) => prev.filter((item) => !item.checked))
  }

  // Group items by category
  const groupedItems = React.useMemo(() => {
    const groups: Record<string, ShoppingItem[]> = {}
    items.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = []
      }
      groups[item.category].push(item)
    })
    return groups
  }, [items])

  const checkedCount = items.filter((item) => item.checked).length
  const totalCount = items.length

  return (
    <EnhancedGradientSpotlight className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <AnimatedReveal>
            <div className="flex items-center justify-between">
              <div>
                <h1>Inköpslista</h1>
                <p className="text-ink-soft mt-2">
                  Din automatiskt genererade inköpslista baserad på planerade måltider.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {checkedCount}/{totalCount} klara
                </Badge>
                {checkedCount > 0 && (
                  <Button variant="outline" size="sm" onClick={clearChecked}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Rensa klara
                  </Button>
                )}
              </div>
            </div>
          </AnimatedReveal>

          {/* Add New Item */}
          <AnimatedReveal delay={0.1}>
            <div className="bg-card rounded-2xl shadow-card p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Lägg till vara..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addItem()}
                  className="flex-1 bg-background border-border rounded-xl"
                />
                <Button onClick={addItem} className="bg-brand text-brand-foreground hover:bg-brand/90">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </AnimatedReveal>

          {/* Shopping List */}
          <div className="space-y-4">
            {Object.entries(groupedItems).map(([category, categoryItems]) => (
              <AnimatedReveal key={category} delay={0.2}>
                <div className="bg-card rounded-2xl shadow-card p-6">
                  <h3 className="font-medium text-ink mb-4 flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    {category}
                    <Badge variant="secondary" className="text-xs">
                      {categoryItems.length}
                    </Badge>
                  </h3>

                  <div className="space-y-2">
                    {categoryItems.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                          item.checked
                            ? "bg-green-50 border-green-200 opacity-60"
                            : "bg-background border-border hover:border-brand/50"
                        }`}
                      >
                        <button
                          onClick={() => toggleItem(item.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            item.checked
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-brand hover:border-brand/70 hover:bg-brand/10"
                          }`}
                        >
                          {item.checked && <Check className="h-4 w-4" />}
                        </button>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-medium ${item.checked ? "line-through text-ink-muted" : "text-ink"}`}
                            >
                              {item.name}
                            </span>
                            <span className="text-sm text-ink-soft">
                              {item.amount} {item.unit}
                            </span>
                            {item.fromRecipe && (
                              <Badge variant="outline" className="text-xs">
                                {item.fromRecipe}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-ink-muted hover:text-destructive transition-colors p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedReveal>
            ))}
          </div>

          {items.length === 0 && (
            <AnimatedReveal delay={0.3}>
              <div className="bg-card rounded-2xl shadow-card p-8 text-center">
                <ShoppingCart className="h-12 w-12 text-ink-muted mx-auto mb-4" />
                <p className="text-ink-muted">Din inköpslista är tom. Lägg till varor eller planera måltider.</p>
              </div>
            </AnimatedReveal>
          )}
        </div>
      </div>
    </EnhancedGradientSpotlight>
  )
}
