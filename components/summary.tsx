"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Award, BookOpen, Lightbulb, Brain } from "lucide-react"

interface SummaryProps {
  testScore?: number
}

export function Summary({ testScore }: SummaryProps) {
  const scorePercentage = testScore !== undefined ? (testScore / 10) * 100 : undefined

  return (
    <div className="w-full min-h-[calc(100vh-200px)] p-8 flex flex-col">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold mb-2 tracking-wide text-gray-800">Congratulations!</h2>
        <p className="text-lg text-gray-600 mb-8">
          You've completed the module on RNNs, LSTMs, and Time Series Forecasting.
          {testScore !== undefined && ` You scored ${testScore}/10 (${scorePercentage}%) on the knowledge check.`}
        </p>
      </motion.div>

      {testScore !== undefined && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12 flex justify-center"
        >
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke={
                    scorePercentage && scorePercentage >= 70
                      ? "#10b981"
                      : scorePercentage && scorePercentage >= 40
                        ? "#f59e0b"
                        : "#ef4444"
                  }
                  strokeWidth="12"
                  strokeDasharray="440"
                  strokeDashoffset={440 - (440 * (scorePercentage || 0)) / 100}
                  transform="rotate(-90 80 80)"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <Award
                  className={`h-8 w-8 mb-1 ${
                    scorePercentage && scorePercentage >= 70
                      ? "text-green-500"
                      : scorePercentage && scorePercentage >= 40
                        ? "text-amber-500"
                        : "text-red-500"
                  }`}
                />
                <span className="text-3xl font-bold">{testScore}/10</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Brain className="h-5 w-5 text-cyan-500 mr-2" />
                Recurrent Neural Networks
              </CardTitle>
              <CardDescription>The foundation of sequential data processing</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Process sequential data with internal memory</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Information flows through time steps</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Limited by vanishing/exploding gradients</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Lightbulb className="h-5 w-5 text-cyan-500 mr-2" />
                LSTM Networks
              </CardTitle>
              <CardDescription>Advanced recurrent architecture</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Specialized gates control information flow</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Better at capturing long-term dependencies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Solves the vanishing gradient problem</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <BookOpen className="h-5 w-5 text-cyan-500 mr-2" />
                Time-Series Forecasting
              </CardTitle>
              <CardDescription>Predicting future values</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Transforms time series into supervised learning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Sliding window approach for sequence creation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Applications in finance, weather, and more</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-lg p-10 border border-gray-200"
      >
        <h3 className="text-2xl font-bold mb-6 text-gray-800">What You've Learned</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-medium mb-3 text-gray-700">Key Concepts</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                <span>How RNNs maintain internal state to process sequences</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                <span>The architecture of LSTM cells and their specialized gates</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                <span>How to prepare time-series data for neural networks</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                <span>Techniques for forecasting future values in a sequence</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-3 text-gray-700">Practical Applications</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span>Financial market prediction and analysis</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span>Natural language processing and text generation</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span>Weather and climate forecasting</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span>Energy consumption prediction and optimization</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-6 text-gray-800">Further Learning Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Courses & Tutorials</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                <a href="#" className="text-cyan-600 hover:underline">
                  Deep Learning Specialization (Coursera)
                </a>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                <a href="#" className="text-cyan-600 hover:underline">
                  Time Series Forecasting with TensorFlow
                </a>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                <a href="#" className="text-cyan-600 hover:underline">
                  Practical Time Series Analysis
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Books & Papers</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <a href="#" className="text-purple-600 hover:underline">
                  Deep Learning by Goodfellow, Bengio, and Courville
                </a>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <a href="#" className="text-purple-600 hover:underline">
                  LSTM: A Search Space Odyssey
                </a>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <a href="#" className="text-purple-600 hover:underline">
                  Forecasting: Principles and Practice
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-6 text-lg">
            Start a New Project
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

