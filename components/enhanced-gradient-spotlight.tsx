"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface EnhancedGradientSpotlightProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  followMouse?: boolean
  scrollBased?: boolean
}

export function EnhancedGradientSpotlight({
  children,
  className,
  intensity = 0.3,
  followMouse = true,
  scrollBased = false,
}: EnhancedGradientSpotlightProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = React.useState({ x: 50, y: 50 })
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)

  const { scrollYProgress } = useScroll()
  const scrollX = useTransform(scrollYProgress, [0, 1], [30, 70])
  const scrollY = useTransform(scrollYProgress, [0, 1], [40, 60])

  // Check for reduced motion preference
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Mouse following effect (desktop only)
  React.useEffect(() => {
    if (!followMouse || !containerRef.current || prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      requestAnimationFrame(() => {
        setMousePosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
      })
    }

    const container = containerRef.current
    container.addEventListener("mousemove", handleMouseMove)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [followMouse, prefersReducedMotion])

  const spotlightStyle = React.useMemo(() => {
    if (prefersReducedMotion) {
      return {
        "--spot-x": "50%",
        "--spot-y": "50%",
        "--spot-opacity": intensity * 0.5, // Reduced intensity for accessibility
      } as React.CSSProperties
    }

    if (scrollBased) {
      return {
        "--spot-x": `${scrollX.get()}%`,
        "--spot-y": `${scrollY.get()}%`,
        "--spot-opacity": intensity,
      } as React.CSSProperties
    }

    return {
      "--spot-x": `${mousePosition.x}%`,
      "--spot-y": `${mousePosition.y}%`,
      "--spot-opacity": intensity,
    } as React.CSSProperties
  }, [mousePosition, intensity, prefersReducedMotion, scrollBased, scrollX, scrollY])

  if (scrollBased && !prefersReducedMotion) {
    return (
      <motion.div
        ref={containerRef}
        className={cn("gradient-spotlight", className)}
        style={{
          ...spotlightStyle,
          "--spot-x": scrollX,
          "--spot-y": scrollY,
        }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div ref={containerRef} className={cn("gradient-spotlight", className)} style={spotlightStyle}>
      {children}
    </div>
  )
}
