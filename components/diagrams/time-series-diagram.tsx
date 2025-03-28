"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface TimeSeriesDiagramProps {
  step: number
}

export function TimeSeriesDiagram({ step }: TimeSeriesDiagramProps) {
  const [animate, setAnimate] = useState(false)

  // Trigger animation periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate((prev) => !prev)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Generate sample time series data
  const generateTimeSeriesData = () => {
    const points = []
    for (let i = 0; i < 20; i++) {
      // Create a sine wave with some noise
      const y = 100 + 50 * Math.sin(i / 3) + Math.random() * 10
      points.push({ x: i * 15 + 50, y })
    }
    return points
  }

  const data = generateTimeSeriesData()
  const pathData = data.map((point, i) => (i === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`)).join(" ")

  return (
    <div className="w-full max-w-md h-80 relative">
      <svg width="100%" height="100%" viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Step 1 - Basic Time Series */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* X and Y axes */}
              <motion.path
                d="M 50 250 L 350 250"
                stroke="#64748b"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.path
                d="M 50 250 L 50 50"
                stroke="#64748b"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />

              {/* Axis labels */}
              <motion.text
                x="200"
                y="280"
                textAnchor="middle"
                fill="#64748b"
                fontSize="12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Time
              </motion.text>
              <motion.text
                x="30"
                y="150"
                textAnchor="middle"
                fill="#64748b"
                fontSize="12"
                transform="rotate(-90, 30, 150)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Value
              </motion.text>

              {/* Time series line with animation */}
              <motion.path
                d={pathData}
                stroke="#0ea5e9"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />

              {/* Animated dot moving along the path */}
              <motion.circle
                cx="0"
                cy="0"
                r="5"
                fill="#0ea5e9"
                animate={{
                  cx: animate ? data.map((point) => point.x) : data[0].x,
                  cy: animate ? data.map((point) => point.y) : data[0].y,
                }}
                transition={{
                  duration: 3,
                  ease: "linear",
                  times: data.map((_, i) => i / (data.length - 1)),
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />

              <motion.text
                x="200"
                y="30"
                textAnchor="middle"
                fill="#0369a1"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Time Series Data
              </motion.text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 2 - Data Preparation */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {/* Sliding window visualization - repositioned to prevent overlap */}
              <motion.rect
                x="80"
                y="100"
                width="90"
                height="150"
                fill="rgba(14, 165, 233, 0.1)"
                stroke="#0ea5e9"
                strokeWidth="1"
                strokeDasharray="5,5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.text
                x="125"
                y="90"
                textAnchor="middle"
                fill="#0ea5e9"
                fontSize="10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Input Window
              </motion.text>

              <motion.rect
                x="170"
                y="100"
                width="30"
                height="150"
                fill="rgba(126, 34, 206, 0.1)"
                stroke="#7e22ce"
                strokeWidth="1"
                strokeDasharray="5,5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              <motion.text
                x="185"
                y="90"
                textAnchor="middle"
                fill="#7e22ce"
                fontSize="10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Target
              </motion.text>

              {/* Animated sliding window */}
              {animate && (
                <motion.g>
                  <motion.rect
                    x="80"
                    y="100"
                    width="90"
                    height="150"
                    fill="rgba(14, 165, 233, 0.2)"
                    stroke="#0ea5e9"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    animate={{ x: [0, 30, 60, 0] }}
                    transition={{
                      duration: 6,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                      times: [0, 0.3, 0.6, 1],
                    }}
                  />
                  <motion.rect
                    x="170"
                    y="100"
                    width="30"
                    height="150"
                    fill="rgba(126, 34, 206, 0.2)"
                    stroke="#7e22ce"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    animate={{ x: [0, 30, 60, 0] }}
                    transition={{
                      duration: 6,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                      times: [0, 0.3, 0.6, 1],
                    }}
                  />
                </motion.g>
              )}
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 3 - Model Training and Prediction */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {/* Prediction line extending beyond data with animation */}
              <motion.path
                d={`${pathData} L 350 ${data[data.length - 1].y - 20}`}
                stroke="#7e22ce"
                strokeWidth="2"
                strokeDasharray="5,5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
              />

              {/* Animated prediction point */}
              <motion.circle
                cx={data[data.length - 1].x}
                cy={data[data.length - 1].y}
                r="5"
                fill="#7e22ce"
                animate={{
                  cx: [data[data.length - 1].x, 350],
                  cy: [data[data.length - 1].y, data[data.length - 1].y - 20],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  repeatDelay: 1,
                }}
              />

              {/* Prediction label - repositioned to prevent overlap */}
              <motion.text
                x="320"
                y="80"
                textAnchor="middle"
                fill="#7e22ce"
                fontSize="12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Prediction
              </motion.text>
              <motion.path
                d="M 320 90 L 320 110"
                stroke="#7e22ce"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
              <motion.polygon
                points="315,105 320,115 325,105"
                fill="#7e22ce"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  )
}

