"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Brain, Target, Eye, Cpu, BarChart3, RefreshCw, Download } from "lucide-react"

export default function AIPredictionEngine() {
  const [predictions, setPredictions] = useState<any[]>([])
  const [modelAccuracy, setModelAccuracy] = useState(94.7)
  const [isTraining, setIsTraining] = useState(false)
  const [selectedModel, setSelectedModel] = useState("energy")
  const [predictionData, setPredictionData] = useState<any[]>([])

  const models = {
    energy: {
      name: "Energy Demand Forecasting",
      accuracy: 94.7,
      lastTrained: "2 hours ago",
      dataPoints: "2.4M",
      algorithm: "LSTM + Transformer",
      confidence: 92,
      nextUpdate: "6 hours",
    },
    traffic: {
      name: "Traffic Flow Prediction",
      accuracy: 89.3,
      lastTrained: "4 hours ago",
      dataPoints: "1.8M",
      algorithm: "CNN + Reinforcement Learning",
      confidence: 87,
      nextUpdate: "4 hours",
    },
    weather: {
      name: "Weather Impact Analysis",
      accuracy: 91.2,
      lastTrained: "1 hour ago",
      dataPoints: "3.1M",
      algorithm: "Random Forest + Neural Network",
      confidence: 89,
      nextUpdate: "8 hours",
    },
    emergency: {
      name: "Emergency Risk Assessment",
      accuracy: 96.1,
      lastTrained: "30 minutes ago",
      dataPoints: "890K",
      algorithm: "Anomaly Detection + Deep Learning",
      confidence: 95,
      nextUpdate: "2 hours",
    },
  }

  useEffect(() => {
    // Generate prediction data
    const generatePredictions = () => {
      const now = new Date()
      const predictions = []
      const chartData = []

      for (let i = 0; i < 24; i++) {
        const hour = new Date(now.getTime() + i * 60 * 60 * 1000)
        const baseValue =
          selectedModel === "energy" ? 2500 : selectedModel === "traffic" ? 75 : selectedModel === "weather" ? 22 : 15

        const variation = Math.sin((i * Math.PI) / 12) * 0.3 + Math.random() * 0.2 - 0.1
        const predicted = baseValue * (1 + variation)
        const confidence = 85 + Math.random() * 15

        chartData.push({
          time: hour.getHours() + ":00",
          predicted: Math.round(predicted),
          confidence: Math.round(confidence),
          actual: i < 2 ? Math.round(predicted * (0.95 + Math.random() * 0.1)) : null,
        })
      }

      setPredictionData(chartData)

      // Generate specific predictions
      const newPredictions = [
        {
          id: 1,
          type: "Energy Peak",
          prediction: "Energy demand will peak at 6 PM with 3,247 kWh consumption",
          confidence: 94,
          timeframe: "Next 8 hours",
          impact: "High",
          recommendation: "Activate battery storage and optimize solar panel output",
          model: "LSTM Energy Forecaster",
        },
        {
          id: 2,
          type: "Traffic Congestion",
          prediction: "Heavy traffic expected on Highway 2 between 5-7 PM",
          confidence: 87,
          timeframe: "Next 6 hours",
          impact: "Medium",
          recommendation: "Reroute traffic through Zone 3 and extend green light cycles",
          model: "Traffic Flow CNN",
        },
        {
          id: 3,
          type: "Weather Alert",
          prediction: "Rain probability 78% starting at 4 PM, lasting 3 hours",
          confidence: 89,
          timeframe: "Next 4 hours",
          impact: "Medium",
          recommendation: "Prepare drainage systems and alert outdoor event organizers",
          model: "Weather Impact Analyzer",
        },
        {
          id: 4,
          type: "Maintenance Required",
          prediction: "Water pump in Sector 5 showing anomalous patterns",
          confidence: 95,
          timeframe: "Next 72 hours",
          impact: "High",
          recommendation: "Schedule immediate inspection and prepare backup systems",
          model: "Anomaly Detection Engine",
        },
      ]

      setPredictions(newPredictions)
    }

    generatePredictions()
    const interval = setInterval(generatePredictions, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [selectedModel])

  const trainModel = async () => {
    setIsTraining(true)

    // Simulate model training
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setModelAccuracy((prev) => Math.min(99, prev + Math.random() * 2))
    setIsTraining(false)
  }

  const exportPredictions = () => {
    const dataToExport = {
      timestamp: new Date().toISOString(),
      model: selectedModel,
      predictions: predictions,
      chartData: predictionData,
      modelStats: models[selectedModel as keyof typeof models],
    }

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ai-predictions-${selectedModel}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-50 border-red-200 text-red-700"
      case "Medium":
        return "bg-yellow-50 border-yellow-200 text-yellow-700"
      case "Low":
        return "bg-green-50 border-green-200 text-green-700"
      default:
        return "bg-gray-50 border-gray-200 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">AI Prediction Engine</h2>
          <p className="text-gray-600">Machine learning models for city optimization and forecasting</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={trainModel} disabled={isTraining} className="bg-purple-600 hover:bg-purple-700">
            <Brain className="w-4 h-4 mr-2" />
            {isTraining ? "Training..." : "Retrain Models"}
          </Button>
          <Button onClick={exportPredictions} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Model Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(models).map(([key, model]) => (
          <Card
            key={key}
            className={`bg-white border-gray-200 cursor-pointer transition-all ${
              selectedModel === key ? "ring-2 ring-blue-500 border-blue-300" : "hover:shadow-md"
            }`}
            onClick={() => setSelectedModel(key)}
          >
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-lg font-bold text-gray-900">{model.accuracy}%</div>
              <div className="text-sm text-gray-600">{model.name}</div>
              <div className="text-xs text-blue-600 mt-1">Updated {model.lastTrained}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={selectedModel} onValueChange={setSelectedModel} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200">
          <TabsTrigger value="energy" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Energy
          </TabsTrigger>
          <TabsTrigger value="traffic" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Traffic
          </TabsTrigger>
          <TabsTrigger value="weather" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Weather
          </TabsTrigger>
          <TabsTrigger value="emergency" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Emergency
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prediction Chart */}
          <Card className="lg:col-span-2 bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                24-Hour Forecast: {models[selectedModel as keyof typeof models].name}
              </CardTitle>
              <CardDescription>AI predictions with confidence intervals</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    name="Predicted"
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Actual"
                    connectNulls={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Model Details */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-600" />
                Model Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-gray-600">Algorithm</div>
                <div className="font-medium text-gray-900">
                  {models[selectedModel as keyof typeof models].algorithm}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600">Training Data</div>
                <div className="font-medium text-gray-900">
                  {models[selectedModel as keyof typeof models].dataPoints} points
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">Model Accuracy</div>
                <Progress value={models[selectedModel as keyof typeof models].accuracy} className="h-2" />
                <div className="text-sm text-gray-900 mt-1">
                  {models[selectedModel as keyof typeof models].accuracy}%
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">Confidence Level</div>
                <Progress value={models[selectedModel as keyof typeof models].confidence} className="h-2" />
                <div className="text-sm text-gray-900 mt-1">
                  {models[selectedModel as keyof typeof models].confidence}%
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="text-sm text-gray-600">Next Update</div>
                <div className="font-medium text-gray-900">
                  {models[selectedModel as keyof typeof models].nextUpdate}
                </div>
              </div>

              <Button onClick={trainModel} disabled={isTraining} className="w-full bg-purple-600 hover:bg-purple-700">
                <RefreshCw className={`w-4 h-4 mr-2 ${isTraining ? "animate-spin" : ""}`} />
                {isTraining ? "Training..." : "Retrain Model"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Predictions List */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              AI Predictions & Recommendations
            </CardTitle>
            <CardDescription>Real-time insights and actionable recommendations from AI models</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictions.map((prediction) => (
                <Card key={prediction.id} className="bg-gray-50 border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{prediction.type}</h4>
                          <p className="text-sm text-gray-600">{prediction.timeframe}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getImpactColor(prediction.impact)}>{prediction.impact} Impact</Badge>
                        <Badge variant="outline" className="border-blue-200 text-blue-700">
                          {prediction.confidence}% confidence
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Prediction</div>
                        <div className="text-gray-900">{prediction.prediction}</div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600">Recommendation</div>
                        <div className="text-gray-900">{prediction.recommendation}</div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                        <div className="text-xs text-gray-500">Model: {prediction.model}</div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Implement
                          </Button>
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}
