"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface LstmDiagramProps {
  step: number
}

export function LstmDiagram({ step }: LstmDiagramProps) {
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
        {/* LSTM Cell Container */}
        <rect x="100" y="50" width="200" height="200" rx="10" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2" />

        {/* Cell State Line with Animation */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <motion.path
            d="M100 80 L300 80"
            stroke="#7e22ce"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.circle
            cx="200"
            cy="80"
            r="4"
            fill="#7e22ce"
            initial={{ x: -100 }}
            animate={{ x: dataFlow ? 100 : -100 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <motion.text
            x="200"
            y="70"
            textAnchor="middle"
            fill="#7e22ce"
            fontWeight="bold"
            fontSize="12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Cell State
          </motion.text>
        </motion.g>

        {/* Input and Output Arrows with Animation */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <motion.path
            d="M50 150 L100 150"
            stroke="#0ea5e9"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.circle
            cx="75"
            cy="150"
            r="4"
            fill="#0ea5e9"
            initial={{ x: -25 }}
            animate={{ x: dataFlow ? 25 : -25 }}
            transition={{ duration: 1, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <polygon points="95,145 105,150 95,155" fill="#0ea5e9" />
          <text x="75" y="140" textAnchor="middle" fill="#0369a1" fontSize="12">
            X(t)
          </text>

          <motion.path
            d="M300 150 L350 150"
            stroke="#0ea5e9"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.circle
            cx="325"
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
          <polygon points="345,145 355,150 345,155" fill="#0ea5e9" />
          <text x="325" y="140" textAnchor="middle" fill="#0369a1" fontSize="12">
            h(t)
          </text>
        </motion.g>

        {/* LSTM Cell Label */}
        <motion.text
          x="200"
          y="40"
          textAnchor="middle"
          fill="#0369a1"
          fontWeight="bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          LSTM Cell
        </motion.text>

        {/* Step 1 - Basic LSTM Architecture with Animation */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hidden state recurrent connection */}
              <motion.path
                d="M300 220 L350 220 L350 100 L100 100 L100 120"
                stroke="#0ea5e9"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
              />
              <motion.circle
                cx="300"
                cy="220"
                r="4"
                fill="#0ea5e9"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  x: dataFlow ? [0, 50, 50, -200, -200, 0] : 0,
                  y: dataFlow ? [0, 0, -120, -120, 20, 0] : 0,
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                }}
              />
              <motion.text
                x="350"
                y="160"
                textAnchor="middle"
                fill="#0ea5e9"
                fontWeight="bold"
                fontSize="12"
                transform="rotate(90, 350, 160)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Previous h(t-1)
              </motion.text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 2 - Forget Gate with Animation */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.circle
                cx="140"
                cy="120"
                r="20"
                fill="#fef2f2"
                stroke="#ef4444"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.text
                x="140"
                y="124"
                textAnchor="middle"
                fill="#ef4444"
                fontWeight="bold"
                fontSize="14"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                ×
              </motion.text>
              <motion.text
                x="140"
                y="150"
                textAnchor="middle"
                fill="#ef4444"
                fontWeight="bold"
                fontSize="12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Forget
              </motion.text>

              {/* Connection to cell state with animation */}
              <motion.path
                d="M140 100 L140 80"
                stroke="#ef4444"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <motion.circle
                cx="140"
                cy="90"
                r="3"
                fill="#ef4444"
                animate={{ y: dataFlow ? [-10, 10] : 0 }}
                transition={{ duration: 1, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 3 - Input Gate with Animation */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.circle
                cx="200"
                cy="120"
                r="20"
                fill="#ecfdf5"
                stroke="#10b981"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.text
                x="200"
                y="124"
                textAnchor="middle"
                fill="#10b981"
                fontWeight="bold"
                fontSize="14"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                +
              </motion.text>
              <motion.text
                x="200"
                y="150"
                textAnchor="middle"
                fill="#10b981"
                fontWeight="bold"
                fontSize="12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Input
              </motion.text>

              {/* Connection to cell state with animation */}
              <motion.path
                d="M200 100 L200 80"
                stroke="#10b981"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <motion.circle
                cx="200"
                cy="90"
                r="3"
                fill="#10b981"
                animate={{ y: dataFlow ? [10, -10] : 0 }}
                transition={{ duration: 1, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 4 - Output Gate with Animation */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.circle
                cx="260"
                cy="120"
                r="20"
                fill="#eff6ff"
                stroke="#3b82f6"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.text
                x="260"
                y="124"
                textAnchor="middle"
                fill="#3b82f6"
                fontWeight="bold"
                fontSize="14"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                σ
              </motion.text>
              <motion.text
                x="260"
                y="150"
                textAnchor="middle"
                fill="#3b82f6"
                fontWeight="bold"
                fontSize="12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Output
              </motion.text>

              {/* Connection from cell state to output with animation */}
              <motion.path
                d="M260 80 L260 100"
                stroke="#3b82f6"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <motion.path
                d="M260 140 L260 180"
                stroke="#3b82f6"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              <motion.circle
                cx="260"
                cy="180"
                r="15"
                fill="#eff6ff"
                stroke="#3b82f6"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
              <motion.text
                x="260"
                y="184"
                textAnchor="middle"
                fill="#3b82f6"
                fontWeight="bold"
                fontSize="14"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                ×
              </motion.text>
              <motion.path
                d="M260 195 L260 220"
                stroke="#3b82f6"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
              <motion.path
                d="M260 220 L300 220"
                stroke="#3b82f6"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              />
              <motion.circle
                cx="260"
                cy="160"
                r="3"
                fill="#3b82f6"
                animate={{ y: dataFlow ? [-20, 20] : 0 }}
                transition={{ duration: 1, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  )
}

