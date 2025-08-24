import { AnimatedReveal } from "@/components/animated-reveal"
import { EnhancedGradientSpotlight } from "@/components/enhanced-gradient-spotlight"

export default function HomePage() {
  return (
    <EnhancedGradientSpotlight className="min-h-screen" followMouse scrollBased>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          <AnimatedReveal>
            <h1 className="text-shadow-subtle">Din digitala kokbok</h1>
          </AnimatedReveal>

          <AnimatedReveal delay={0.2}>
            <p className="ingress max-w-2xl mx-auto text-ink-soft">
              Välkommen till din personliga receptsamling där varje måltid blir en upptäckt. Här samlar du dina
              favoritrecept och skapar nya kulinariska minnen.
            </p>
          </AnimatedReveal>

          <AnimatedReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button className="px-6 py-3 bg-brand text-brand-foreground rounded-xl font-medium hover:opacity-90 transition-opacity shadow-card">
                Överraska mig
              </button>
              <button className="px-6 py-3 bg-olive text-paper rounded-xl font-medium hover:opacity-90 transition-opacity shadow-card">
                Bläddra recept
              </button>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.6}>
            <div className="mt-16 p-8 bg-card rounded-2xl shadow-card max-w-md mx-auto">
              <p className="text-ink-muted text-sm">Inga recept ännu – skapa ditt första i Studio.</p>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </EnhancedGradientSpotlight>
  )
}
