"use client"
import { motion } from "framer-motion"

interface AnimatedCheckProps {
  checked: boolean
  size?: number
}

export function AnimatedCheck({ checked, size = 16 }: AnimatedCheckProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="text-current">
      <motion.path
        d="M5 12l5 5L20 7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={checked ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{
          pathLength: { type: "spring", duration: 0.6, bounce: 0 },
          opacity: { duration: 0.2 },
        }}
      />
    </svg>
  )
}
