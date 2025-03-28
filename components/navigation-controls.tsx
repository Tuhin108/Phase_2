"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"

interface NavigationControlsProps {
  onPrevious: () => void
  onNext: () => void
  canGoPrevious: boolean
  canGoNext: boolean
  sections: string[]
  currentSection: string
  onNavigate: (section: any) => void
}

export function NavigationControls({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  sections,
  currentSection,
  onNavigate,
}: NavigationControlsProps) {
  // Map section IDs to display names
  const sectionNames: Record<string, string> = {
    intro: "Introduction",
    rnn: "RNNs",
    lstm: "LSTMs",
    timeseries: "Time Series",
    stockprediction: "Stock Prediction",
    mcqtest: "Knowledge Check",
    summary: "Summary",
  }

  return (
    <TooltipProvider>
      <div className="w-full flex justify-between items-center">
        <Button onClick={onPrevious} disabled={!canGoPrevious} variant="outline" className="flex items-center px-6">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <div className="flex space-x-4">
          {sections.map((section) => (
            <Tooltip key={section} content={sectionNames[section]}>
              <button
                onClick={() => onNavigate(section)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSection === section
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={sectionNames[section]}
              />
            </Tooltip>
          ))}
        </div>

        <Button
          onClick={onNext}
          disabled={!canGoNext}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center px-6"
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </TooltipProvider>
  )
}

