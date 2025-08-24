"use client"

import * as React from "react"
import { Save, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AnimatedReveal } from "@/components/animated-reveal"
import { EnhancedGradientSpotlight } from "@/components/enhanced-gradient-spotlight"

interface RecipeForm {
  name: string
  description: string
  prepTime: number
  cookTime: number
  servings: number
  difficulty: "Lätt" | "Medel" | "Svår"
  category: string
  tags: string[]
  ingredients: Array<{ name: string; amount: string; unit: string; notes: string }>
  steps: Array<{ instruction: string; duration: string; notes: string }>
  image: string
}

export default function StudioPage() {
  const [recipe, setRecipe] = React.useState<RecipeForm>({
    name: "",
    description: "",
    prepTime: 0,
    cookTime: 0,
    servings: 4,
    difficulty: "Medel",
    category: "",
    tags: [],
    ingredients: [{ name: "", amount: "", unit: "st", notes: "" }],
    steps: [{ instruction: "", duration: "", notes: "" }],
    image: "",
  })

  const [newTag, setNewTag] = React.useState("")

  const addIngredient = () => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", amount: "", unit: "st", notes: "" }],
    }))
  }

  const removeIngredient = (index: number) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const updateIngredient = (index: number, field: string, value: string) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing)),
    }))
  }

  const addStep = () => {
    setRecipe((prev) => ({
      ...prev,
      steps: [...prev.steps, { instruction: "", duration: "", notes: "" }],
    }))
  }

  const removeStep = (index: number) => {
    setRecipe((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }))
  }

  const updateStep = (index: number, field: string, value: string) => {
    setRecipe((prev) => ({
      ...prev,
      steps: prev.steps.map((step, i) => (i === index ? { ...step, [field]: value } : step)),
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !recipe.tags.includes(newTag.trim())) {
      setRecipe((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setRecipe((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const saveRecipe = () => {
    console.log("Saving recipe:", recipe)
    // Here you would save to your backend
  }

  return (
    <EnhancedGradientSpotlight className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AnimatedReveal>
            <div className="flex items-center justify-between">
              <div>
                <h1>Receptstudio</h1>
                <p className="text-ink-soft mt-2">Skapa och redigera dina recept här.</p>
              </div>
              <Button onClick={saveRecipe} className="bg-brand text-brand-foreground hover:bg-brand/90">
                <Save className="h-4 w-4 mr-2" />
                Spara recept
              </Button>
            </div>
          </AnimatedReveal>

          {/* Basic Information */}
          <AnimatedReveal delay={0.1}>
            <div className="bg-card rounded-2xl shadow-card p-6">
              <h2 className="text-xl font-semibold text-ink mb-6">Grundinformation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="name">Receptnamn</Label>
                  <Input
                    id="name"
                    value={recipe.name}
                    onChange={(e) => setRecipe((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="T.ex. Mormors köttbullar"
                    className="mt-1 bg-background border-border rounded-xl"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="description">Beskrivning</Label>
                  <Textarea
                    id="description"
                    value={recipe.description}
                    onChange={(e) => setRecipe((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Beskriv ditt recept..."
                    rows={3}
                    className="mt-1 bg-background border-border rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <select
                    id="category"
                    value={recipe.category}
                    onChange={(e) => setRecipe((prev) => ({ ...prev, category: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-xl"
                  >
                    <option value="">Välj kategori</option>
                    <option value="Huvudrätt">Huvudrätt</option>
                    <option value="Förrätt">Förrätt</option>
                    <option value="Efterrätt">Efterrätt</option>
                    <option value="Mellanmål">Mellanmål</option>
                    <option value="Dryck">Dryck</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="difficulty">Svårighetsgrad</Label>
                  <select
                    id="difficulty"
                    value={recipe.difficulty}
                    onChange={(e) =>
                      setRecipe((prev) => ({ ...prev, difficulty: e.target.value as RecipeForm["difficulty"] }))
                    }
                    className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-xl"
                  >
                    <option value="Lätt">Lätt</option>
                    <option value="Medel">Medel</option>
                    <option value="Svår">Svår</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="servings">Portioner</Label>
                  <Input
                    id="servings"
                    type="number"
                    value={recipe.servings}
                    onChange={(e) => setRecipe((prev) => ({ ...prev, servings: Number.parseInt(e.target.value) || 0 }))}
                    min="1"
                    className="mt-1 bg-background border-border rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="prepTime">Förberedelsetid (min)</Label>
                  <Input
                    id="prepTime"
                    type="number"
                    value={recipe.prepTime}
                    onChange={(e) => setRecipe((prev) => ({ ...prev, prepTime: Number.parseInt(e.target.value) || 0 }))}
                    min="0"
                    className="mt-1 bg-background border-border rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="cookTime">Tillagningstid (min)</Label>
                  <Input
                    id="cookTime"
                    type="number"
                    value={recipe.cookTime}
                    onChange={(e) => setRecipe((prev) => ({ ...prev, cookTime: Number.parseInt(e.target.value) || 0 }))}
                    min="0"
                    className="mt-1 bg-background border-border rounded-xl"
                  />
                </div>
              </div>
            </div>
          </AnimatedReveal>

          {/* Tags */}
          <AnimatedReveal delay={0.2}>
            <div className="bg-card rounded-2xl shadow-card p-6">
              <h2 className="text-xl font-semibold text-ink mb-6">Taggar</h2>
              <div className="flex gap-2 mb-4">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                  placeholder="Lägg till tagg..."
                  className="flex-1 bg-background border-border rounded-xl"
                />
                <Button onClick={addTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-lg">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </AnimatedReveal>

          {/* Ingredients */}
          <AnimatedReveal delay={0.3}>
            <div className="bg-card rounded-2xl shadow-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-ink">Ingredienser</h2>
                <Button onClick={addIngredient} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Lägg till
                </Button>
              </div>
              <div className="space-y-4">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-start">
                    <div className="col-span-4">
                      <Input
                        value={ingredient.name}
                        onChange={(e) => updateIngredient(index, "name", e.target.value)}
                        placeholder="Ingrediens"
                        className="bg-background border-border rounded-xl"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        value={ingredient.amount}
                        onChange={(e) => updateIngredient(index, "amount", e.target.value)}
                        placeholder="Mängd"
                        className="bg-background border-border rounded-xl"
                      />
                    </div>
                    <div className="col-span-2">
                      <select
                        value={ingredient.unit}
                        onChange={(e) => updateIngredient(index, "unit", e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-xl"
                      >
                        <option value="st">st</option>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        <option value="ml">ml</option>
                        <option value="dl">dl</option>
                        <option value="l">l</option>
                        <option value="msk">msk</option>
                        <option value="tsk">tsk</option>
                        <option value="krm">krm</option>
                      </select>
                    </div>
                    <div className="col-span-3">
                      <Input
                        value={ingredient.notes}
                        onChange={(e) => updateIngredient(index, "notes", e.target.value)}
                        placeholder="Anteckningar"
                        className="bg-background border-border rounded-xl"
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeIngredient(index)}
                        disabled={recipe.ingredients.length === 1}
                        className="h-10 w-10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedReveal>

          {/* Instructions */}
          <AnimatedReveal delay={0.4}>
            <div className="bg-card rounded-2xl shadow-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-ink">Instruktioner</h2>
                <Button onClick={addStep} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Lägg till steg
                </Button>
              </div>
              <div className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-brand text-brand-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        value={step.instruction}
                        onChange={(e) => updateStep(index, "instruction", e.target.value)}
                        placeholder="Beskriv detta steg..."
                        rows={2}
                        className="bg-background border-border rounded-xl"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={step.duration}
                          onChange={(e) => updateStep(index, "duration", e.target.value)}
                          placeholder="Tid (minuter)"
                          className="bg-background border-border rounded-xl"
                        />
                        <Input
                          value={step.notes}
                          onChange={(e) => updateStep(index, "notes", e.target.value)}
                          placeholder="Tips eller anteckningar"
                          className="bg-background border-border rounded-xl"
                        />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeStep(index)}
                      disabled={recipe.steps.length === 1}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedReveal>

          {/* Image Upload */}
          <AnimatedReveal delay={0.5}>
            <div className="bg-card rounded-2xl shadow-card p-6">
              <h2 className="text-xl font-semibold text-ink mb-6">Bild</h2>\
