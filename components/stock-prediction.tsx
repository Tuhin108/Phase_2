"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Slider } from "@/components/ui/slider"
import { InfoCard } from "@/components/ui/info-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// Generate sample stock data
const generateStockData = (days = 100, volatility = 0.02, startPrice = 100) => {
  const data = []
  let price = startPrice

  for (let i = 0; i < days; i++) {
    // Random walk with drift
    const change = price * (volatility * (Math.random() - 0.5))
    price = Math.max(price + change, 1) // Ensure price doesn't go below 1
    data.push(price)
  }

  return data
}

// Simple prediction function (this is a placeholder - in a real app, this would use a trained model)
const predictStockPrices = (historicalData: number[], futureDays = 30, volatility = 0.02, trend = 0) => {
  const predictions = []
  let lastPrice = historicalData[historicalData.length - 1]

  for (let i = 0; i < futureDays; i++) {
    // Add trend bias and random noise
    const change = lastPrice * (volatility * (Math.random() - 0.5) + trend / 100)
    lastPrice = Math.max(lastPrice + change, 1)
    predictions.push(lastPrice)
  }

  return predictions
}

export function StockPrediction() {
  const [historicalData, setHistoricalData] = useState<number[]>([])
  const [predictions, setPredictions] = useState<number[]>([])
  const [volatility, setVolatility] = useState(2) // 2%
  const [trend, setTrend] = useState(0) // Neutral trend
  const [windowSize, setWindowSize] = useState(7) // 7-day window
  const [activeTab, setActiveTab] = useState("visualization")

  // Generate initial data
  useEffect(() => {
    const data = generateStockData(100, 0.02)
    setHistoricalData(data)
    setPredictions(predictStockPrices(data, 30, 0.02, 0))
  }, [])

  // Update predictions when parameters change
  useEffect(() => {
    if (historicalData.length > 0) {
      setPredictions(predictStockPrices(historicalData, 30, volatility / 100, trend))
    }
  }, [historicalData, volatility, trend])

  // Prepare chart data
  const chartData = {
    labels: [
      ...Array.from({ length: historicalData.length }, (_, i) => `Day ${i + 1}`),
      ...Array.from({ length: predictions.length }, (_, i) => `Pred ${i + 1}`),
    ],
    datasets: [
      {
        label: "Historical Stock Price",
        data: [...historicalData, ...Array(predictions.length).fill(null)],
        borderColor: "rgba(0, 200, 255, 1)",
        backgroundColor: "rgba(0, 200, 255, 0.1)",
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: "Predicted Stock Price",
        data: [...Array(historicalData.length).fill(null), ...predictions],
        borderColor: "rgba(170, 0, 255, 1)",
        backgroundColor: "rgba(170, 0, 255, 0.1)",
        borderDash: [5, 5],
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Stock Price Prediction",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Price ($)",
        },
      },
    },
  }

  return (
    <div className="w-full min-h-[calc(100vh-200px)] p-8 flex flex-col">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold mb-2 tracking-wide text-gray-800">Stock Price Prediction</h2>
        <p className="text-lg text-gray-600 mb-8">Hands-on application of RNNs and LSTMs for financial forecasting</p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="explanation">How It Works</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <Line data={chartData} options={chartOptions} height={80} />
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-medium mb-6">Model Parameters</h3>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Market Volatility</label>
                      <span className="text-sm text-gray-500">{volatility}%</span>
                    </div>
                    <Slider
                      value={[volatility]}
                      min={0.5}
                      max={5}
                      step={0.1}
                      onValueChange={(value) => setVolatility(value[0])}
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Market Trend</label>
                      <span className="text-sm text-gray-500">
                        {trend > 0 ? "+" : ""}
                        {trend}%
                      </span>
                    </div>
                    <Slider
                      value={[trend]}
                      min={-2}
                      max={2}
                      step={0.1}
                      onValueChange={(value) => setTrend(value[0])}
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Lookback Window</label>
                      <span className="text-sm text-gray-500">{windowSize} days</span>
                    </div>
                    <Slider
                      value={[windowSize]}
                      min={3}
                      max={30}
                      step={1}
                      onValueChange={(value) => setWindowSize(value[0])}
                      className="mt-2"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-medium mb-4">Prediction Insights</h3>
                <p className="text-sm text-gray-600 mb-4">Based on the current parameters, the model predicts:</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>30-Day Trend:</span>
                    <span className={trend >= 0 ? "text-green-500" : "text-red-500"}>
                      {trend >= 0 ? "Bullish" : "Bearish"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Confidence Level:</span>
                    <span>{100 - volatility * 20}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Predicted Change:</span>
                    <span
                      className={
                        predictions[predictions.length - 1] > historicalData[historicalData.length - 1]
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {(
                        (predictions[predictions.length - 1] / historicalData[historicalData.length - 1] - 1) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="explanation">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <InfoCard
              title="Data Preparation"
              content={
                <>
                  <p className="mb-4">
                    To train an RNN/LSTM model for stock price prediction, we first prepare the data:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 mb-4">
                    <li>Collect historical stock prices</li>
                    <li>Normalize the data (typically using min-max scaling)</li>
                    <li>Create sequences using a sliding window approach</li>
                    <li>Split into training, validation, and test sets</li>
                  </ol>
                  <p>
                    The lookback window parameter determines how many previous days of data the model considers when
                    making a prediction.
                  </p>
                </>
              }
            />

            <InfoCard
              title="Model Architecture"
              content={
                <>
                  <p className="mb-4">A typical LSTM model for stock prediction includes:</p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Input layer (shape determined by lookback window)</li>
                    <li>One or more LSTM layers with dropout to prevent overfitting</li>
                    <li>Dense (fully connected) output layer</li>
                  </ul>
                  <p>
                    The model learns to recognize patterns in the historical data that precede price movements, allowing
                    it to make predictions about future movements.
                  </p>
                </>
              }
            />

            <InfoCard
              title="Training Process"
              content={
                <>
                  <p className="mb-4">The model is trained by:</p>
                  <ol className="list-decimal pl-5 space-y-2 mb-4">
                    <li>Feeding sequences of historical prices</li>
                    <li>Comparing predictions with actual prices</li>
                    <li>Calculating loss (typically Mean Squared Error)</li>
                    <li>Adjusting weights through backpropagation</li>
                    <li>Repeating for multiple epochs until convergence</li>
                  </ol>
                  <p>
                    The trained model can then be used to predict future stock prices based on the most recent data.
                  </p>
                </>
              }
            />

            <InfoCard
              title="Limitations and Considerations"
              content={
                <>
                  <p className="mb-4">While powerful, stock prediction models have limitations:</p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Markets are influenced by unpredictable events</li>
                    <li>Past performance doesn't guarantee future results</li>
                    <li>Models can't account for all factors affecting prices</li>
                    <li>High volatility periods are particularly challenging to predict</li>
                  </ul>
                  <p>
                    For more robust predictions, advanced models often incorporate additional features beyond price
                    history, such as trading volume, technical indicators, and even sentiment analysis from news and
                    social media.
                  </p>
                </>
              }
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

