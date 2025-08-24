"use client"

import * as React from "react"
import { Search, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle, LightDarkToggle } from "@/components/theme-toggle"
import { ThemeSettings } from "@/components/theme-settings"
import { cn } from "@/lib/utils"

interface TopbarProps {
  onOpenCommandPalette: () => void
}

export function Topbar({ onOpenCommandPalette }: TopbarProps) {
  const [isMac, setIsMac] = React.useState(false)

  React.useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0)
  }, [])

  return (
    <header className="hidden md:flex items-center justify-between px-6 py-4 bg-background border-b border-border">
      <div className="flex-1 max-w-md">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            "bg-background border-input",
          )}
          onClick={onOpenCommandPalette}
        >
          <Search className="mr-2 h-4 w-4" />
          <span>Sök recept, ingredienser...</span>
          <div className="ml-auto flex items-center gap-1">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              {isMac ? <Command className="h-3 w-3" /> : "Ctrl"}
              <span className="text-xs">K</span>
            </kbd>
          </div>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <LightDarkToggle />
        <ThemeToggle />
        <ThemeSettings />
      </div>
    </header>
  )
}
