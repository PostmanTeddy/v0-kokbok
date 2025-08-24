"use client"

import * as React from "react"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { BottomNav } from "@/components/bottom-nav"
import { CommandPalette } from "@/components/command-palette"
import { GradientSpotlight } from "@/components/gradient-spotlight"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandPaletteOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

        <main className="flex-1 overflow-auto">
          <GradientSpotlight className="min-h-full">
            <div className="pb-20 md:pb-0">{children}</div>
          </GradientSpotlight>
        </main>
      </div>

      <BottomNav />

      <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
    </div>
  )
}
