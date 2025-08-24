"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Plus, Calendar, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Hem", icon: Home },
  { href: "/recipes", label: "Bläddra", icon: BookOpen },
  { href: "/studio/new", label: "Studio", icon: Plus },
  { href: "/planner", label: "Planera", icon: Calendar },
  { href: "/list", label: "Lista", icon: ShoppingCart },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors",
                isActive ? "text-brand bg-brand/10" : "text-ink-muted hover:text-ink-soft hover:bg-accent/50",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
