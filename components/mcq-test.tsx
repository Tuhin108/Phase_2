"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, HelpCircle } from "lucide-react"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    text: "What is the key feature that distinguishes RNNs from traditional neural networks?",
    options: [
      "They use more layers",
      "They have connections that form directed cycles",
      "They only process numerical data",
      "They require less computational power",
    ],
    correctAnswer: 1,
    explanation:
      "RNNs have connections that form directed cycles, allowing them to maintain an internal state or 'memory' that can persist information across time steps.",
  },
  {
    id: 2,
    text: "What problem do basic RNNs face when dealing with long-term dependencies?",
    options: ["Vanishing/exploding gradient problem", "Overfitting", "Underfitting", "Computational complexity"],
    correctAnswer: 0,
    explanation:
      "Basic RNNs struggle with the vanishing/exploding gradient problem, which makes it difficult for them to learn and retain long-term dependencies in sequential data.",
  },
  {
    id: 3,
    text: "What is the purpose of the 'forget gate' in an LSTM network?",
    options: [
      "To add new information to the cell state",
      "To decide what information to throw away from the cell state",
      "To determine the final output",
      "To initialize the network weights",
    ],
    correctAnswer: 1,
    explanation:
      "The forget gate in an LSTM decides what information to throw away from the cell state. It outputs a number between 0 and 1 for each value in the cell state, where 1 means 'keep this completely' and 0 means 'get rid of this completely'.",
  },
  {
    id: 4,
    text: "What is the 'cell state' in an LSTM?",
    options: [
      "The final output of the network",
      "A conveyor belt of information that runs through the top of the LSTM",
      "The initial input to the network",
      "The learning rate parameter",
    ],
    correctAnswer: 1,
    explanation:
      "The cell state in an LSTM acts as a conveyor belt of information that runs through the top of the cell. It allows information to flow through the network with only minor linear interactions, regulated by gates.",
  },
  {
    id: 5,
    text: "What is time-series forecasting?",
    options: [
      "Predicting when a model will finish training",
      "Scheduling when to update model weights",
      "Predicting future values based on previously observed values",
      "Measuring how long a neural network takes to process data",
    ],
    correctAnswer: 2,
    explanation:
      "Time-series forecasting is the process of using a model to predict future values based on previously observed values in a time series.",
  },
  {
    id: 6,
    text: "Which of the following is NOT a common step in preparing time-series data for RNN/LSTM models?",
    options: [
      "Normalizing the data",
      "Creating sequences with a sliding window approach",
      "Randomizing the order of data points",
      "Splitting into training, validation, and test sets",
    ],
    correctAnswer: 2,
    explanation:
      "Randomizing the order of data points is NOT a common step in preparing time-series data, as it would destroy the temporal relationships in the data. Time-series data must maintain its sequential order.",
  },
  {
    id: 7,
    text: "What is the purpose of the 'input gate' in an LSTM?",
    options: [
      "To decide what information to throw away",
      "To decide what new information to store in the cell state",
      "To determine the final output",
      "To initialize the network",
    ],
    correctAnswer: 1,
    explanation:
      "The input gate in an LSTM decides what new information to store in the cell state. It involves a sigmoid layer that decides which values to update and a tanh layer that creates candidate values that could be added.",
  },
  {
    id: 8,
    text: "Which of the following is a limitation of using RNNs/LSTMs for stock price prediction?",
    options: [
      "They can only process numerical data",
      "They require too much memory",
      "Markets are influenced by unpredictable events that models can't account for",
      "They can only make predictions one day ahead",
    ],
    correctAnswer: 2,
    explanation:
      "A significant limitation of using RNNs/LSTMs for stock price prediction is that markets are influenced by unpredictable events (like news, policy changes, etc.) that models cannot account for based solely on historical price data.",
  },
  {
    id: 9,
    text: "What does the 'lookback window' parameter determine in time-series forecasting?",
    options: [
      "How far into the future to predict",
      "How many previous time steps to consider when making a prediction",
      "How often to update the model",
      "The learning rate for the model",
    ],
    correctAnswer: 1,
    explanation:
      "The lookback window parameter determines how many previous time steps (e.g., days of stock prices) the model considers when making a prediction.",
  },
  {
    id: 10,
    text: "Which type of forecasting uses predictions as inputs for subsequent predictions?",
    options: ["One-step forecasting", "Multi-step forecasting", "Recursive forecasting", "Parallel forecasting"],
    correctAnswer: 2,
    explanation:
      "Recursive forecasting uses predictions as inputs for subsequent predictions. This approach can be used to forecast multiple steps into the future by feeding each prediction back into the model.",
  },
]

interface McqTestProps {
  onComplete: (score: number) => void
}

export function McqTest({ onComplete }: McqTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1))
  const [showExplanation, setShowExplanation] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    if (testCompleted) return

    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newSelectedAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowExplanation(false)
    }
  }

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswer ? score + 1 : score
    }, 0)
  }

  const handleCompleteTest = () => {
    const score = calculateScore()
    setTestCompleted(true)
    onComplete(score)
  }

  const currentQuestionData = questions[currentQuestion]
  const isAnswered = selectedAnswers[currentQuestion] !== -1
  const isCorrect = isAnswered && selectedAnswers[currentQuestion] === currentQuestionData.correctAnswer

  return (
    <div className="w-full min-h-[calc(100vh-200px)] p-8 flex flex-col">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold mb-2 tracking-wide text-gray-800">Knowledge Check</h2>
        <p className="text-lg text-gray-600 mb-8">
          Test your understanding of RNNs, LSTMs, and Time-Series Forecasting
        </p>
      </motion.div>

      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-3xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {testCompleted ? `Score: ${calculateScore()}/${questions.length}` : ""}
            </span>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">{currentQuestionData.text}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentQuestionData.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedAnswers[currentQuestion] === index
                        ? isCorrect
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-cyan-500 hover:bg-cyan-50"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {selectedAnswers[currentQuestion] === index &&
                        (isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setShowExplanation(!showExplanation)}
                disabled={!isAnswered}
                className="flex items-center"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                {showExplanation ? "Hide Explanation" : "Show Explanation"}
              </Button>

              {isAnswered && currentQuestionData.correctAnswer !== selectedAnswers[currentQuestion] && (
                <div className="text-sm text-red-500">
                  Correct answer: {currentQuestionData.options[currentQuestionData.correctAnswer]}
                </div>
              )}
            </CardFooter>
          </Card>

          {showExplanation && isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <h3 className="font-medium text-blue-800 mb-2">Explanation:</h3>
              <p className="text-blue-700">{currentQuestionData.explanation}</p>
            </motion.div>
          )}

          <div className="flex justify-between">
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
              className="border-cyan-500 text-cyan-600"
            >
              Previous Question
            </Button>

            {currentQuestion < questions.length - 1 ? (
              <Button
                onClick={handleNextQuestion}
                disabled={!isAnswered}
                className="bg-gradient-to-r from-cyan-500 to-purple-600"
              >
                Next Question
              </Button>
            ) : (
              <Button
                onClick={handleCompleteTest}
                disabled={!isAnswered || testCompleted}
                className="bg-gradient-to-r from-cyan-500 to-purple-600"
              >
                Complete Test
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

