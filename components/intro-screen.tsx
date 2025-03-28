"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { NeuralNetworkIcon } from "@/components/icons/neural-network-icon"

interface IntroScreenProps {
  onStart: () => void
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl text-center"
      >
        <div className="mb-8 flex justify-center">
          <NeuralNetworkIcon className="w-32 h-32 text-cyan-500" />
        </div>
        <h2 className="text-4xl font-bold mb-6 tracking-wide text-gray-800">RNNs & Time Series Forecasting</h2>
        <p className="text-xl mb-8 text-gray-600 leading-relaxed">
          Explore the fascinating world of Recurrent Neural Networks (RNNs) and Long Short-Term Memory networks (LSTMs).
          Learn how these powerful architectures process sequential data and enable accurate time-series forecasting.
        </p>
        <div className="space-y-4">
          <p className="text-lg text-gray-700">In this interactive module, you'll discover:</p>
          <ul className="space-y-2 text-left max-w-md mx-auto">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
              <span>How RNNs process sequential information</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
              <span>The architecture of LSTM networks</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
              <span>Time-series forecasting techniques</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              <span>Hands-on: Stock price prediction</span>
            </li>
          </ul>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12"
        >
          <Button
            onClick={onStart}
            className="px-8 py-6 text-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-md"
          >
            Begin Learning
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

