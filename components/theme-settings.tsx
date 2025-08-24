"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Palette, Type, Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

export function ThemeSettings() {
  const { theme, setTheme } = useTheme()
  const [fontSize, setFontSize] = React.useState(100)
  const [customColors, setCustomColors] = React.useState({
    brandHue: 150,
    brandSat: 45,
    brandLight: 55,
    oliveHue: 80,
    oliveSat: 20,
    oliveLight: 50,
  })

  // Apply custom colors to CSS variables
  React.useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--font-scale", `${fontSize}%`)

    // Update brand color
    const brandHsl = `hsl(${customColors.brandHue}, ${customColors.brandSat}%, ${customColors.brandLight}%)`
    root.style.setProperty("--brand", brandHsl)

    // Update olive color
    const oliveHsl = `hsl(${customColors.oliveHue}, ${customColors.oliveSat}%, ${customColors.oliveLight}%)`
    root.style.setProperty("--olive", oliveHsl)

    // Save to localStorage
    localStorage.setItem("theme-settings", JSON.stringify({ fontSize, customColors }))
  }, [fontSize, customColors])

  // Load from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("theme-settings")
    if (saved) {
      try {
        const { fontSize: savedFontSize, customColors: savedColors } = JSON.parse(saved)
        if (savedFontSize) setFontSize(savedFontSize)
        if (savedColors) setCustomColors(savedColors)
      } catch (e) {
        // Ignore parsing errors
      }
    }
  }, [])

  const presetThemes = [
    { id: "paper-green", name: "Paper Green", colors: ["#F8F5EF", "#57BB8A", "#7A816B"] },
    { id: "cocoa", name: "Cocoa", colors: ["#F5F1ED", "#8B4513", "#6D4C41"] },
    { id: "ocean", name: "Ocean", colors: ["#F0F4F8", "#0077BE", "#4A5568"] },
    { id: "sepia", name: "Sepia", colors: ["#F4F1E8", "#8B4513", "#6D4C41"] },
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-xl bg-transparent">
          <Sliders className="h-4 w-4" />
          <span className="sr-only">Temainställningar</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Temainställningar
          </SheetTitle>
          <SheetDescription>Anpassa utseendet efter dina preferenser</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Theme Presets */}
          <div>
            <Label className="text-sm font-medium">Färgteman</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {presetThemes.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setTheme(preset.id)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    theme === preset.id ? "border-brand" : "border-border hover:border-border/60"
                  }`}
                >
                  <div className="flex gap-1 mb-2">
                    {preset.colors.map((color, i) => (
                      <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <p className="text-xs font-medium">{preset.name}</p>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Typography Scale */}
          <div>
            <Label className="text-sm font-medium flex items-center gap-2">
              <Type className="h-4 w-4" />
              Textstorlek: {fontSize}%
            </Label>
            <Slider
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
              min={90}
              max={115}
              step={5}
              className="mt-2"
            />
          </div>

          <Separator />

          {/* Custom Colors */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Anpassa färger</Label>

            {/* Brand Color */}
            <div className="space-y-3 mb-4">
              <Label className="text-xs text-ink-muted">Primärfärg (Brand)</Label>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Nyans: {customColors.brandHue}°</Label>
                  <Slider
                    value={[customColors.brandHue]}
                    onValueChange={(value) => setCustomColors((prev) => ({ ...prev, brandHue: value[0] }))}
                    min={0}
                    max={360}
                    step={1}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Mättnad: {customColors.brandSat}%</Label>
                  <Slider
                    value={[customColors.brandSat]}
                    onValueChange={(value) => setCustomColors((prev) => ({ ...prev, brandSat: value[0] }))}
                    min={0}
                    max={100}
                    step={1}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Ljushet: {customColors.brandLight}%</Label>
                  <Slider
                    value={[customColors.brandLight]}
                    onValueChange={(value) => setCustomColors((prev) => ({ ...prev, brandLight: value[0] }))}
                    min={10}
                    max={90}
                    step={1}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Olive Color */}
            <div className="space-y-3">
              <Label className="text-xs text-ink-muted">Accentfärg (Olive)</Label>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Nyans: {customColors.oliveHue}°</Label>
                  <Slider
                    value={[customColors.oliveHue]}
                    onValueChange={(value) => setCustomColors((prev) => ({ ...prev, oliveHue: value[0] }))}
                    min={0}
                    max={360}
                    step={1}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Mättnad: {customColors.oliveSat}%</Label>
                  <Slider
                    value={[customColors.oliveSat]}
                    onValueChange={(value) => setCustomColors((prev) => ({ ...prev, oliveSat: value[0] }))}
                    min={0}
                    max={100}
                    step={1}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Ljushet: {customColors.oliveLight}%</Label>
                  <Slider
                    value={[customColors.oliveLight]}
                    onValueChange={(value) => setCustomColors((prev) => ({ ...prev, oliveLight: value[0] }))}
                    min={10}
                    max={90}
                    step={1}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Reset Button */}
          <Button
            variant="outline"
            onClick={() => {
              setFontSize(100)
              setCustomColors({
                brandHue: 150,
                brandSat: 45,
                brandLight: 55,
                oliveHue: 80,
                oliveSat: 20,
                oliveLight: 50,
              })
              localStorage.removeItem("theme-settings")
            }}
            className="w-full"
          >
            Återställ till standard
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
