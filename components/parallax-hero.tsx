"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ParallaxHeroProps {
  image: string
  title: string
  description: string
  className?: string
}

export function ParallaxHero({ image, title, description, className }: ParallaxHeroProps) {
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"])
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"])

  return (
    <div ref={ref} className={cn("relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden", className)}>
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <motion.div style={{ y: titleY }} className="absolute bottom-6 left-6 right-6 text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-2 text-shadow-subtle">{title}</h1>
        <p className="text-lg md:text-xl opacity-90">{description}</p>
      </motion.div>
    </div>
  )
}
