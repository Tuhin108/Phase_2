"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LstmDiagram } from "@/components/diagrams/lstm-diagram"
import { InfoCard } from "@/components/ui/info-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function LstmExplanation() {
  const [step, setStep] = useState(1)
  const totalSteps = 4

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
        <h2 className="text-3xl font-bold mb-2 tracking-wide text-gray-800">Long Short-Term Memory Networks (LSTMs)</h2>
        <p className="text-lg text-gray-600 mb-8">
          Advanced recurrent networks designed to overcome the limitations of standard RNNs
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 flex-1 mt-8 mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex-1 flex items-center justify-center"
        >
          <LstmDiagram step={step} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex-1"
        >
          {step === 1 && (
            <InfoCard
              title="LSTM Architecture"
              content={
                <>
                  <p className="mb-4">
                    LSTMs are a special kind of RNN designed to remember information for long periods of time.
                  </p>
                  <p className="mb-4">
                    The key innovation is the cell state (the horizontal line running through the top of the diagram),
                    which acts as a conveyor belt of information.
                  </p>
                  <p>
                    LSTMs can add or remove information to this cell state through carefully regulated structures called
                    gates.
                  </p>
                </>
              }
            />
          )}

          {step === 2 && (
            <InfoCard
              title="Forget Gate"
              content={
                <>
                  <p className="mb-4">The forget gate decides what information to throw away from the cell state.</p>
                  <p className="mb-4">
                    It looks at the previous hidden state and current input, and outputs a number between 0 and 1 for
                    each value in the cell state.
                  </p>
                  <p>
                    A value of 1 means "keep this completely" while a value of 0 means "get rid of this completely."
                  </p>
                </>
              }
            />
          )}

          {step === 3 && (
            <InfoCard
              title="Input Gate"
              content={
                <>
                  <p className="mb-4">The input gate decides what new information to store in the cell state.</p>
                  <p className="mb-4">This happens in two steps:</p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>A sigmoid layer decides which values to update</li>
                    <li>A tanh layer creates candidate values that could be added</li>
                  </ul>
                  <p>These two are combined to update the cell state with new information.</p>
                </>
              }
            />
          )}

          {step === 4 && (
            <InfoCard
              title="Output Gate"
              content={
                <>
                  <p className="mb-4">The output gate decides what parts of the cell state to output.</p>
                  <p className="mb-4">First, a sigmoid layer decides what parts of the cell state to output.</p>
                  <p className="mb-4">
                    Then, the cell state is put through a tanh function and multiplied by the sigmoid output.
                  </p>
                  <p>
                    This ensures that we only output the parts we decided to, creating a filtered version of the cell
                    state as the hidden state.
                  </p>
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

