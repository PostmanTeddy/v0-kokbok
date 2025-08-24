"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  blur?: number
}

export function AnimatedReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 12,
  blur = 6,
}: AnimatedRevealProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y, filter: `blur(${blur}px)` }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1], // easeOut
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

interface StaggeredGridProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggeredGrid({ children, className, staggerDelay = 0.06 }: StaggeredGridProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
