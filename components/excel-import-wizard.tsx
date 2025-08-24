"use client"

import * as React from "react"
import { Upload, FileSpreadsheet, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface ExcelImportWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type ImportStep = "upload" | "validate" | "map" | "preview" | "import" | "complete"

export function ExcelImportWizard({ open, onOpenChange }: ExcelImportWizardProps) {
  const [currentStep, setCurrentStep] = React.useState<ImportStep>("upload")
  const [progress, setProgress] = React.useState(0)
  const [fileName, setFileName] = React.useState("")

  const steps = [
    { id: "upload", label: "Ladda upp", icon: Upload },
    { id: "validate", label: "Validera", icon: CheckCircle },
    { id: "map", label: "Mappa kolumner", icon: FileSpreadsheet },
    { id: "preview", label: "Förhandsgranska", icon: CheckCircle },
    { id: "import", label: "Importera", icon: Upload },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setCurrentStep("validate")
      setProgress(20)

      // Simulate validation
      setTimeout(() => {
        setCurrentStep("map")
        setProgress(40)
      }, 1000)
    }
  }

  const handleNext = () => {
    switch (currentStep) {
      case "map":
        setCurrentStep("preview")
        setProgress(60)
        break
      case "preview":
        setCurrentStep("import")
        setProgress(80)
        // Simulate import
        setTimeout(() => {
          setCurrentStep("complete")
          setProgress(100)
        }, 2000)
        break
      case "complete":
        onOpenChange(false)
        // Reset for next time
        setTimeout(() => {
          setCurrentStep("upload")
          setProgress(0)
          setFileName("")
        }, 500)
        break
    }
  }

  const mockColumns = [
    { excel: "Namn", mapped: "name", status: "success" },
    { excel: "Kategori", mapped: "category", status: "success" },
    { excel: "Kalorier", mapped: "calories", status: "success" },
    { excel: "Protein", mapped: "protein", status: "success" },
    { excel: "Kolhydrater", mapped: "carbs", status: "warning" },
    { excel: "Fett", mapped: "fat", status: "success" },
  ]

  const mockPreviewData = [
    { name: "Broccoli", category: "Grönsaker", calories: 34, protein: 3, carbs: 7, fat: 0 },
    { name: "Kyckling", category: "Kött", calories: 165, protein: 31, carbs: 0, fat: 4 },
    { name: "Ris", category: "Torrvaror", calories: 130, protein: 3, carbs: 28, fat: 0 },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Importera ingredienser från Excel</DialogTitle>
          <DialogDescription>Följ stegen för att importera dina ingredienser från en Excel-fil.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                Steg {steps.findIndex((s) => s.id === currentStep) + 1} av {steps.length}
              </span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = steps.findIndex((s) => s.id === currentStep) > index
              return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                          ? "bg-brand text-brand-foreground"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-center">{step.label}</span>
                </div>
              )
            })}
          </div>

          {/* Step Content */}
          <div className="min-h-[300px] flex flex-col justify-center">
            {currentStep === "upload" && (
              <div className="text-center space-y-4">
                <div className="border-2 border-dashed border-border rounded-xl p-8">
                  <Upload className="h-12 w-12 mx-auto text-ink-muted mb-4" />
                  <p className="text-lg font-medium mb-2">Välj Excel-fil</p>
                  <p className="text-ink-muted mb-4">Stöder .xlsx och .xls filer</p>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
                      <span>Välj fil</span>
                    </Button>
                  </label>
                </div>
              </div>
            )}

            {currentStep === "validate" && (
              <div className="text-center space-y-4">
                <div className="animate-spin h-8 w-8 border-2 border-brand border-t-transparent rounded-full mx-auto"></div>
                <p className="text-lg font-medium">Validerar fil...</p>
                <p className="text-ink-muted">{fileName}</p>
              </div>
            )}

            {currentStep === "map" && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Mappa kolumner</h3>
                <p className="text-ink-muted">Kontrollera att kolumnerna mappas korrekt.</p>
                <div className="space-y-2">
                  {mockColumns.map((col, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{col.excel}</span>
                        <span className="text-ink-muted">→</span>
                        <span className="text-ink-soft">{col.mapped}</span>
                      </div>
                      <Badge
                        variant={col.status === "success" ? "default" : "secondary"}
                        className={col.status === "success" ? "bg-green-500" : "bg-yellow-500"}
                      >
                        {col.status === "success" ? "OK" : "Varning"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === "preview" && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Förhandsgranska data</h3>
                <p className="text-ink-muted">Kontrollera att datan ser korrekt ut innan import.</p>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-2">Namn</th>
                        <th className="text-left p-2">Kategori</th>
                        <th className="text-right p-2">Kcal</th>
                        <th className="text-right p-2">Protein</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPreviewData.map((row, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2">{row.name}</td>
                          <td className="p-2">{row.category}</td>
                          <td className="p-2 text-right">{row.calories}</td>
                          <td className="p-2 text-right">{row.protein}g</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-ink-muted">Visar 3 av 47 rader som kommer importeras.</p>
              </div>
            )}

            {currentStep === "import" && (
              <div className="text-center space-y-4">
                <div className="animate-spin h-8 w-8 border-2 border-brand border-t-transparent rounded-full mx-auto"></div>
                <p className="text-lg font-medium">Importerar ingredienser...</p>
                <p className="text-ink-muted">Detta kan ta en stund...</p>
              </div>
            )}

            {currentStep === "complete" && (
              <div className="text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                <p className="text-lg font-medium">Import slutförd!</p>
                <p className="text-ink-muted">47 ingredienser har importerats framgångsrikt.</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Avbryt
            </Button>
            {currentStep !== "upload" && currentStep !== "validate" && currentStep !== "import" && (
              <Button onClick={handleNext} className="bg-brand text-brand-foreground hover:bg-brand/90">
                {currentStep === "complete" ? "Stäng" : "Nästa"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
