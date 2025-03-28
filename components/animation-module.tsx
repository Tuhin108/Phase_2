"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IntroScreen } from "@/components/intro-screen"
import { RnnExplanation } from "@/components/rnn-explanation"
import { LstmExplanation } from "@/components/lstm-explanation"
import { TimeSeriesExplanation } from "@/components/time-series-explanation"
import { StockPrediction } from "@/components/stock-prediction"
import { McqTest } from "@/components/mcq-test"
import { Summary } from "@/components/summary"
import { ProgressBar } from "@/components/ui/progress-bar"
import { NavigationControls } from "@/components/navigation-controls"

type Section = "intro" | "rnn" | "lstm" | "timeseries" | "stockprediction" | "mcqtest" | "summary"

export function AnimationModule() {
  const [currentSection, setCurrentSection] = useState<Section>("intro")
  const [hasStarted, setHasStarted] = useState(false)
  const [testScore, setTestScore] = useState<number | undefined>(undefined)

  const sections: Section[] = ["intro", "rnn", "lstm", "timeseries", "stockprediction", "mcqtest", "summary"]
  const currentIndex = sections.indexOf(currentSection)
  const progress = (currentIndex / (sections.length - 1)) * 100

  const handleStart = () => {
    setHasStarted(true)
    setCurrentSection("rnn")
  }

  const handleNext = () => {
    const nextIndex = currentIndex + 1
    if (nextIndex < sections.length) {
      setCurrentSection(sections[nextIndex])
    }
  }

  const handlePrevious = () => {
    const prevIndex = currentIndex - 1
    if (prevIndex >= 0) {
      setCurrentSection(sections[prevIndex])
    }
  }

  const handleNavigate = (section: Section) => {
    setCurrentSection(section)
  }

  const handleTestComplete = (score: number) => {
    setTestScore(score)
    // Automatically move to summary after a short delay
    setTimeout(() => {
      handleNext()
    }, 1500)
  }

  // Map section IDs to display names for the navigation
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
    <div className="relative w-full min-h-screen flex flex-col">
      {/* Title Bar */}
      <div className="w-full py-6 px-8 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
          HEX
        </h1>
        {hasStarted && (
          <div className="w-1/2">
            <ProgressBar value={progress} />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            {currentSection === "intro" && <IntroScreen onStart={handleStart} />}
            {currentSection === "rnn" && <RnnExplanation />}
            {currentSection === "lstm" && <LstmExplanation />}
            {currentSection === "timeseries" && <TimeSeriesExplanation />}
            {currentSection === "stockprediction" && <StockPrediction />}
            {currentSection === "mcqtest" && <McqTest onComplete={handleTestComplete} />}
            {currentSection === "summary" && <Summary testScore={testScore} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls - Fixed at bottom */}
      {hasStarted && (
        <div className="w-full py-6 px-8 border-t border-gray-200 bg-white">
          <NavigationControls
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoPrevious={currentIndex > 0}
            canGoNext={currentIndex < sections.length - 1}
            sections={sections}
            currentSection={currentSection}
            onNavigate={handleNavigate}
          />
        </div>
      )}
    </div>
  )
}

