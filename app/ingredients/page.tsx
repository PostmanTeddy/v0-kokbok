"use client"

import * as React from "react"
import { mockIngredients } from "@/lib/ingredient-data"
import { DataTable } from "@/components/data-table"
import { ExcelImportWizard } from "@/components/excel-import-wizard"
import { AnimatedReveal } from "@/components/animated-reveal"
import { EnhancedGradientSpotlight } from "@/components/enhanced-gradient-spotlight"

export default function IngredientsPage() {
  const [importWizardOpen, setImportWizardOpen] = React.useState(false)

  return (
    <EnhancedGradientSpotlight className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <AnimatedReveal>
            <div>
              <h1>Råvaror</h1>
              <p className="text-ink-soft mt-2">
                Hantera dina ingredienser, deras näringsinnehåll och håll koll på vad du har i skafferiet.
              </p>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.2}>
            <DataTable data={mockIngredients} onImportClick={() => setImportWizardOpen(true)} />
          </AnimatedReveal>
        </div>
      </div>

      <ExcelImportWizard open={importWizardOpen} onOpenChange={setImportWizardOpen} />
    </EnhancedGradientSpotlight>
  )
}
