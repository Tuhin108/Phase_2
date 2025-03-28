"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface RnnDiagramProps {
  step: number
}

export function RnnDiagram({ step }: RnnDiagramProps) {
  const [dataFlow, setDataFlow] = useState(false)

  // Trigger data flow animation periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setDataFlow((prev) => !prev)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-md h-80 relative">
      <svg width="100%" height="100%" viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect x="150" y="100" width="100" height="100" rx="10" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2" />

        {/* Input Arrow with Animation */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <path d="M100 150 L150 150" stroke="#0ea5e9" strokeWidth="2" />
          <motion.circle
            cx="125"
            cy="150"
            r="4"
            fill="#0ea5e9"
            initial={{ x: -25 }}
            animate={{ x: dataFlow ? 25 : -25 }}
            transition={{ duration: 1, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <polygon points="145,145 155,150 145,155" fill="#0ea5e9" />
        </motion.g>

        {/* Output Arrow with Animation */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <path d="M250 150 L300 150" stroke="#0ea5e9" strokeWidth="2" />
          <motion.circle
            cx="275"
            cy="150"
            r="4"
            fill="#0ea5e9"
            initial={{ x: -25 }}
            animate={{ x: dataFlow ? 25 : -25 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.5,
            }}
          />
          <polygon points="295,145 305,150 295,155" fill="#0ea5e9" />
        </motion.g>

        {/* RNN Cell Label */}
        <text x="200" y="150" textAnchor="middle" fill="#0369a1" fontWeight="bold">
          RNN Cell
        </text>

        {/* Step 2+ - Recurrent Connection with Animation */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.g
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.path
                d="M200 100 L200 70 L250 70 L250 100"
                stroke="#7e22ce"
                strokeWidth="2"
                strokeDasharray={step === 3 ? "5,5" : "0"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
              />
              <motion.circle
                cx="225"
                cy="70"
                r="4"
                fill="#7e22ce"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  x: dataFlow ? [0, 25, 25, 0, 0] : 0,
                  y: dataFlow ? [0, 0, 30, 30, 0] : 0,
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  times: [0, 0.25, 0.5, 0.75, 1],
                }}
              />
              <polygon points="245,95 250,105 255,95" fill="#7e22ce" />
              <motion.text
                x="225"
                y="60"
                textAnchor="middle"
                fill="#7e22ce"
                fontWeight="bold"
                fontSize="12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Hidden State
              </motion.text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 3 - Vanishing Gradient Visualization with Animation */}
        <AnimatePresence>
          {step === 3 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {/* Unrolled RNN cells fading away - moved down to prevent overlap */}
              <motion.rect
                x="50"
                y="240"
                width="60"
                height="60"
                rx="5"
                fill="#f0f9ff"
                stroke="#0ea5e9"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <motion.rect
                x="120"
                y="240"
                width="60"
                height="60"
                rx="5"
                fill="#f0f9ff"
                stroke="#0ea5e9"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              <motion.rect
                x="190"
                y="240"
                width="60"
                height="60"
                rx="5"
                fill="#f0f9ff"
                stroke="#0ea5e9"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
              <motion.rect
                x="260"
                y="240"
                width="60"
                height="60"
                rx="5"
                fill="#f0f9ff"
                stroke="#0ea5e9"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />

              {/* Connecting arrows with animation */}
              <motion.g>
                <motion.path
                  d="M110 270 L120 270"
                  stroke="#0ea5e9"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                />
                <motion.path
                  d="M180 270 L190 270"
                  stroke="#0ea5e9"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                />
                <motion.path
                  d="M250 270 L260 270"
                  stroke="#0ea5e9"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                />
              </motion.g>

              {/* Gradient flow label - moved up to prevent overlap */}
              <motion.text
                x="200"
                y="220"
                textAnchor="middle"
                fill="#be185d"
                fontWeight="bold"
                fontSize="12"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Vanishing Gradient Over Time
              </motion.text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Input and Output Labels - repositioned to prevent overlap */}
        <text x="100" y="135" textAnchor="end" fill="#0369a1" fontSize="12">
          Input X(t)
        </text>
        <text x="300" y="135" textAnchor="start" fill="#0369a1" fontSize="12">
          Output Y(t)
        </text>
      </svg>
    </div>
  )
}

