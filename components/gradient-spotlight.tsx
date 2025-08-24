"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface GradientSpotlightProps {
  children: React.ReactNode
  className?: string
  followMouse?: boolean
  intensity?: number
}

export function GradientSpotlight({
  children,
  className,
  followMouse = true,
  intensity = 0.3,
}: GradientSpotlightProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = React.useState({ x: 50, y: 50 })

  React.useEffect(() => {
    if (!followMouse || !containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      requestAnimationFrame(() => {
        setMousePosition({ x, y })
      })
    }

    const container = containerRef.current
    container.addEventListener("mousemove", handleMouseMove)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [followMouse])

  return (
    <div
      ref={containerRef}
      className={cn("gradient-spotlight", className)}
      style={
        {
          "--spot-x": `${mousePosition.x}%`,
          "--spot-y": `${mousePosition.y}%`,
          "--spot-opacity": intensity,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}
