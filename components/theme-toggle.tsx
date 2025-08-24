"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Palette, Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme()

  const themeLabels: Record<string, string> = {
    "paper-green": "Paper Green",
    cocoa: "Cocoa",
    ocean: "Ocean",
    "high-contrast": "Hög kontrast",
    sepia: "Sepia",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-xl bg-transparent">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Växla tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl">
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption}
            onClick={() => setTheme(themeOption)}
            className={theme === themeOption ? "bg-accent" : ""}
          >
            {themeLabels[themeOption] || themeOption}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function LightDarkToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme?.includes("dark")

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "paper-green" : "dark")}
      className="rounded-xl"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">Växla ljus/mörk</span>
    </Button>
  )
}
