"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TimeSeriesDiagram } from "@/components/diagrams/time-series-diagram"
import { InfoCard } from "@/components/ui/info-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function TimeSeriesExplanation() {
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-200px)] p-8 flex flex-col">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold mb-2 tracking-wide text-gray-800">Time-Series Forecasting</h2>
        <p className="text-lg text-gray-600 mb-8">
          Using RNNs and LSTMs to predict future values based on historical patterns
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 flex-1 mt-8 mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex-1 flex items-center justify-center"
        >
          <TimeSeriesDiagram step={step} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex-1"
        >
          {step === 1 && (
            <InfoCard
              title="What is Time-Series Forecasting?"
              content={
                <>
                  <p className="mb-4">
                    Time-series forecasting is the process of using a model to predict future values based on previously
                    observed values.
                  </p>
                  <p className="mb-4">It's widely used in various domains:</p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Financial markets (stock prices, exchange rates)</li>
                    <li>Weather forecasting</li>
                    <li>Sales and demand prediction</li>
                    <li>Energy consumption forecasting</li>
                  </ul>
                  <p>
                    RNNs and LSTMs are particularly well-suited for this task due to their ability to capture temporal
                    dependencies.
                  </p>
                </>
              }
            />
          )}

          {step === 2 && (
            <InfoCard
              title="Preparing Time-Series Data"
              content={
                <>
                  <p className="mb-4">Before feeding data into an RNN or LSTM, we need to prepare it appropriately:</p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Normalize the data to a similar scale</li>
                    <li>Create sequences with a sliding window approach</li>
                    <li>Split into input (X) and target (y) values</li>
                    <li>Divide into training, validation, and test sets</li>
                  </ul>
                  <p>
                    The sliding window approach transforms the time series into a supervised learning problem by
                    creating input-output pairs.
                  </p>
                </>
              }
            />
          )}

          {step === 3 && (
            <InfoCard
              title="Model Training and Prediction"
              content={
                <>
                  <p className="mb-4">The training process involves:</p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Feeding sequences of historical data to the model</li>
                    <li>Comparing predictions with actual values</li>
                    <li>Adjusting model weights to minimize error</li>
                    <li>Validating on unseen data to prevent overfitting</li>
                  </ul>
                  <p className="mb-4">For prediction, we can use:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>One-step forecasting: predict the next value only</li>
                    <li>Multi-step forecasting: predict multiple future values</li>
                    <li>Recursive forecasting: use predictions as inputs for subsequent predictions</li>
                  </ul>
                </>
              }
            />
          )}

          <div className="flex justify-between mt-8">
            <Button
              onClick={prevStep}
              disabled={step === 1}
              variant="outline"
              className="border-cyan-500 text-cyan-600"
              size="sm"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous Step
            </Button>
            <div className="text-sm text-gray-500 flex items-center">
              Step {step} of {totalSteps}
            </div>
            <Button
              onClick={nextStep}
              disabled={step === totalSteps}
              className="bg-gradient-to-r from-cyan-500 to-purple-600"
              size="sm"
            >
              Next Step
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

