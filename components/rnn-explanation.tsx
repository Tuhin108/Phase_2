"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { RnnDiagram } from "@/components/diagrams/rnn-diagram"
import { InfoCard } from "@/components/ui/info-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function RnnExplanation() {
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
        <h2 className="text-3xl font-bold mb-2 tracking-wide text-gray-800">Recurrent Neural Networks (RNNs)</h2>
        <p className="text-lg text-gray-600 mb-8">Understanding how neural networks process sequential data</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 flex-1 mt-8 mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex-1 flex items-center justify-center"
        >
          <RnnDiagram step={step} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex-1"
        >
          {step === 1 && (
            <InfoCard
              title="The Recurrent Structure"
              content={
                <>
                  <p className="mb-4">
                    Unlike traditional neural networks, RNNs have connections that form directed cycles, allowing them
                    to maintain an internal state or "memory".
                  </p>
                  <p>
                    This memory enables RNNs to process sequences of inputs, making them ideal for tasks involving
                    sequential data like text, speech, or time series.
                  </p>
                </>
              }
            />
          )}

          {step === 2 && (
            <InfoCard
              title="Information Flow Through Time"
              content={
                <>
                  <p className="mb-4">
                    RNNs process data sequentially, one element at a time, while maintaining information about what came
                    before.
                  </p>
                  <p className="mb-4">At each time step, the network:</p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Takes the current input</li>
                    <li>Combines it with the previous hidden state</li>
                    <li>Produces a new hidden state and output</li>
                  </ul>
                  <p>This recurrent connection allows information to persist across time steps.</p>
                </>
              }
            />
          )}

          {step === 3 && (
            <InfoCard
              title="Limitations of Basic RNNs"
              content={
                <>
                  <p className="mb-4">
                    While powerful, basic RNNs struggle with long-term dependencies due to the vanishing gradient
                    problem.
                  </p>
                  <p className="mb-4">As the sequence length increases, gradients either:</p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Vanish (approach zero) - making it hard to learn long-range dependencies</li>
                    <li>Explode (grow extremely large) - making training unstable</li>
                  </ul>
                  <p>This limitation led to the development of more advanced architectures like LSTMs.</p>
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

