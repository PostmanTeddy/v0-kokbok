"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Home, BookOpen, Plus, Calendar, ShoppingCart, Package, Settings, ChefHat } from "lucide-react"

const navigationItems = [
  { href: "/", label: "Hem", icon: Home, group: "Navigation" },
  { href: "/recipes", label: "Recept", icon: BookOpen, group: "Navigation" },
  { href: "/ingredients", label: "Råvaror", icon: Package, group: "Navigation" },
  { href: "/studio/new", label: "Studio", icon: Plus, group: "Navigation" },
  { href: "/pantry", label: "Skafferi", icon: ChefHat, group: "Navigation" },
  { href: "/planner", label: "Veckoplanering", icon: Calendar, group: "Navigation" },
  { href: "/list", label: "Inköpslista", icon: ShoppingCart, group: "Navigation" },
  { href: "/settings", label: "Inställningar", icon: Settings, group: "Navigation" },
]

// Mock data for recipes and ingredients
const mockRecipes = [
  { id: "1", name: "Köttbullar med gräddsås", category: "Huvudrätt" },
  { id: "2", name: "Pannkakor", category: "Efterrätt" },
  { id: "3", name: "Fiskgryta", category: "Huvudrätt" },
  { id: "4", name: "Äppelpaj", category: "Efterrätt" },
]

const mockIngredients = [
  { id: "1", name: "Köttfärs", category: "Kött" },
  { id: "2", name: "Mjöl", category: "Torrvaror" },
  { id: "3", name: "Ägg", category: "Mejeri" },
  { id: "4", name: "Mjölk", category: "Mejeri" },
]

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      onOpenChange(false)
      command()
    },
    [onOpenChange],
  )

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Sök recept, ingredienser eller navigera..." />
      <CommandList>
        <CommandEmpty>Inga resultat hittades.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <CommandItem key={item.href} value={item.label} onSelect={() => runCommand(() => router.push(item.href))}>
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandGroup heading="Recept">
          {mockRecipes.map((recipe) => (
            <CommandItem
              key={recipe.id}
              value={recipe.name}
              onSelect={() => runCommand(() => router.push(`/recipes/${recipe.id}`))}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              <span>{recipe.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{recipe.category}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Ingredienser">
          {mockIngredients.map((ingredient) => (
            <CommandItem
              key={ingredient.id}
              value={ingredient.name}
              onSelect={() => runCommand(() => router.push(`/ingredients?search=${ingredient.name}`))}
            >
              <Package className="mr-2 h-4 w-4" />
              <span>{ingredient.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{ingredient.category}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
