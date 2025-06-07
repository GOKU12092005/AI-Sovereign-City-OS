"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Activity,
  AlertTriangle,
  CheckCircle,
  Settings,
  Zap,
  TrendingUp,
  Eye,
  MessageSquare,
  Sparkles,
  Network,
  Code,
  Database,
} from "lucide-react"

export default function AIAgentDashboard() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    totalDecisions: 847392,
    avgResponseTime: 1.2,
    successRate: 97.8,
    energySaved: 23.4,
    learningRate: 89.2,
  })

  const agents = [
    {
      id: "gridmaster",
      name: "GridMaster AI",
      zone: "Energy Grid",
      status: "active",
      performance: 96,
      decisions: 12847,
      lastAction: "Optimized solar panel output based on weather prediction",
      uptime: "99.8%",
      learningRate: "High",
      specialization: "Energy Distribution & Smart Grid Management",
      currentTask: "Analyzing peak demand patterns with ML forecasting",
      confidence: 94,
      color: "from-yellow-500 to-orange-500",
      aiModel: "GPT-4 + Custom Energy Optimization",
      contractAddress: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
      recentDecisions: [
        { action: "Redistributed 2.5MW to Zone 3", impact: "+15% efficiency", time: "2 min ago" },
        { action: "Activated backup solar array", impact: "Prevented outage", time: "15 min ago" },
        { action: "Optimized battery storage", impact: "+8% capacity", time: "1 hour ago" },
      ],
    },
    {
      id: "flowmaster",
      name: "FlowMaster AI",
      zone: "Traffic Control",
      status: "active",
      performance: 94,
      decisions: 8934,
      lastAction: "Dynamically adjusted traffic light timing for rush hour",
      uptime: "99.9%",
      learningRate: "Medium",
      specialization: "Traffic Optimization & Autonomous Vehicle Coordination",
      currentTask: "Processing real-time congestion data with computer vision",
      confidence: 91,
      color: "from-blue-500 to-cyan-500",
      aiModel: "YOLO v8 + Reinforcement Learning",
      contractAddress: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
      recentDecisions: [
        { action: "Rerouted traffic via Highway 2", impact: "-23% congestion", time: "5 min ago" },
        { action: "Extended green light duration", impact: "+12% flow rate", time: "12 min ago" },
        { action: "Coordinated with AV fleet", impact: "Smooth merging", time: "25 min ago" },
      ],
    },
    {
      id: "ecosort",
      name: "EcoSort AI",
      zone: "Waste Management",
      status: "learning",
      performance: 89,
      decisions: 5672,
      lastAction: "Optimized collection routes using genetic algorithms",
      uptime: "98.7%",
      learningRate: "Very High",
      specialization: "Waste Optimization & Recycling Intelligence",
      currentTask: "Learning new recycling patterns from citizen behavior",
      confidence: 87,
      color: "from-green-500 to-emerald-500",
      aiModel: "Random Forest + Genetic Algorithm",
      contractAddress: "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy",
      recentDecisions: [
        { action: "Identified new recycling pattern", impact: "+5% efficiency", time: "8 min ago" },
        { action: "Optimized truck routes", impact: "-15% fuel usage", time: "30 min ago" },
        { action: "Predicted bin overflow", impact: "Prevented spillage", time: "1 hour ago" },
      ],
    },
    {
      id: "netoptim",
      name: "NetOptim AI",
      zone: "Telecom Network",
      status: "active",
      performance: 98,
      decisions: 15234,
      lastAction: "Balanced 5G network load across all cell towers",
      uptime: "99.9%",
      learningRate: "Medium",
      specialization: "5G Optimization & Network Load Balancing",
      currentTask: "Monitoring bandwidth usage with predictive scaling",
      confidence: 96,
      color: "from-purple-500 to-pink-500",
      aiModel: "LSTM + Network Optimization Algorithms",
      contractAddress: "5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY",
      recentDecisions: [
        { action: "Scaled bandwidth for Zone 2", impact: "+25% speed", time: "3 min ago" },
        { action: "Optimized 5G beam forming", impact: "Better coverage", time: "18 min ago" },
        { action: "Predicted network congestion", impact: "Proactive scaling", time: "45 min ago" },
      ],
    },
    {
      id: "homecare",
      name: "HomeCare AI",
      zone: "Smart Housing",
      status: "learning",
      performance: 85,
      decisions: 3421,
      lastAction: "Learned new energy-saving patterns from 500 homes",
      uptime: "97.2%",
      learningRate: "Very High",
      specialization: "Home Automation & Energy Management",
      currentTask: "Learning resident preferences with federated learning",
      confidence: 82,
      color: "from-indigo-500 to-purple-500",
      aiModel: "Federated Learning + IoT Analytics",
      contractAddress: "5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc",
      recentDecisions: [
        { action: "Adjusted 200 thermostats", impact: "-12% energy use", time: "10 min ago" },
        { action: "Optimized lighting schedules", impact: "Better comfort", time: "35 min ago" },
        { action: "Detected anomaly in Unit 47", impact: "Prevented damage", time: "2 hours ago" },
      ],
    },
    {
      id: "aquaflow",
      name: "AquaFlow AI",
      zone: "Water Systems",
      status: "maintenance",
      performance: 88,
      decisions: 6234,
      lastAction: "Detected and isolated water leak in Sector 5",
      uptime: "96.5%",
      learningRate: "Medium",
      specialization: "Water Management & Quality Control",
      currentTask: "Running system diagnostics and leak detection",
      confidence: 85,
      color: "from-cyan-500 to-blue-500",
      aiModel: "Anomaly Detection + Fluid Dynamics Simulation",
      contractAddress: "5Df6eXCcca4b59ML9D2gRCbxNQccjZhzWE7WP2iAowTCRujg",
      recentDecisions: [
        { action: "Isolated leak in Sector 5", impact: "Saved 1000L/hour", time: "20 min ago" },
        { action: "Optimized pressure zones", impact: "+5% efficiency", time: "1 hour ago" },
        { action: "Predicted maintenance need", impact: "Scheduled repair", time: "3 hours ago" },
      ],
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics((prev) => ({
        ...prev,
        totalDecisions: prev.totalDecisions + Math.floor(Math.random() * 10),
        avgResponseTime: Math.max(0.8, Math.min(2.0, prev.avgResponseTime + (Math.random() - 0.5) * 0.1)),
        learningRate: Math.max(80, Math.min(95, prev.learningRate + (Math.random() - 0.5) * 2)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-900/20 border-green-500/30 text-green-400"
      case "learning":
        return "bg-blue-900/20 border-blue-500/30 text-blue-400"
      case "maintenance":
        return "bg-yellow-900/20 border-yellow-500/30 text-yellow-400"
      case "offline":
        return "bg-red-900/20 border-red-500/30 text-red-400"
      default:
        return "bg-gray-900/20 border-gray-500/30 text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "learning":
        return <Brain className="w-4 h-4 animate-pulse" />
      case "maintenance":
        return <Settings className="w-4 h-4 animate-spin" />
      case "offline":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const getLearningRateColor = (rate: string) => {
    switch (rate) {
      case "Very High":
        return "text-red-400"
      case "High":
        return "text-orange-400"
      case "Medium":
        return "text-yellow-400"
      case "Low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">AI Agent Command Center</h2>
          <p className="text-gray-600 flex items-center gap-2">
            <Sparkles className="w-4 h-4 animate-pulse" />
            Real-time monitoring of autonomous AI agents with substrate integration
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
            <Code className="w-4 h-4 mr-2" />
            Deploy Agent
          </Button>
          <Button variant="outline" className="border-purple-500/30 text-white hover:bg-purple-900/20">
            <Database className="w-4 h-4 mr-2" />
            Smart Contracts
          </Button>
        </div>
      </div>

      {/* Real-time AI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Brain className="w-6 h-6 text-pink-400 mx-auto mb-2 animate-pulse" />
            <div className="text-2xl font-bold text-gray-900">{agents.length}</div>
            <div className="text-xs text-gray-600">Active Agents</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Activity className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{realTimeMetrics.totalDecisions.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Total Decisions</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Zap className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{realTimeMetrics.avgResponseTime.toFixed(1)}s</div>
            <div className="text-xs text-gray-600">Avg Response</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{realTimeMetrics.successRate}%</div>
            <div className="text-xs text-gray-600">Success Rate</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Network className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{realTimeMetrics.learningRate.toFixed(1)}%</div>
            <div className="text-xs text-gray-600">Learning Rate</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="agents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 border-gray-200">
          <TabsTrigger
            value="agents"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600"
          >
            AI Agents
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600"
          >
            Performance
          </TabsTrigger>
          <TabsTrigger
            value="contracts"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-green-600"
          >
            Smart Contracts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <Card
                key={agent.id}
                className={`bg-white border-gray-200 hover:bg-gray-50 transition-all cursor-pointer hover:border-pink-400/50 ${
                  selectedAgent === agent.id ? "ring-2 ring-blue-500 border-blue-200" : ""
                }`}
                onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${agent.color} flex items-center justify-center relative`}
                    >
                      <Brain className="w-6 h-6 text-white" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <Badge className={getStatusColor(agent.status)}>
                      {getStatusIcon(agent.status)}
                      <span className="ml-1 capitalize">{agent.status}</span>
                    </Badge>
                  </div>
                  <CardTitle className="text-gray-900 text-lg">{agent.name}</CardTitle>
                  <CardDescription className="text-gray-600 text-sm">{agent.zone}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Performance</span>
                      <span className="text-gray-900">{agent.performance}%</span>
                    </div>
                    <Progress value={agent.performance} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-600">Decisions</div>
                      <div className="text-gray-900 font-medium">{agent.decisions.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Uptime</div>
                      <div className="text-green-400 font-medium">{agent.uptime}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Learning</div>
                      <div className={`font-medium ${getLearningRateColor(agent.learningRate)}`}>
                        {agent.learningRate}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Confidence</div>
                      <div className="text-cyan-400 font-medium">{agent.confidence}%</div>
                    </div>
                  </div>

                  <div className="text-sm">
                    <div className="text-gray-600 mb-1">Current Task</div>
                    <div className="text-gray-900 font-medium text-xs leading-relaxed">{agent.currentTask}</div>
                  </div>

                  {selectedAgent === agent.id && (
                    <div className="mt-4 pt-4 border-t border-purple-800/30 space-y-4">
                      <div>
                        <div className="text-gray-600 text-sm mb-2">AI Model</div>
                        <div className="text-cyan-400 text-xs font-mono">{agent.aiModel}</div>
                      </div>

                      <div>
                        <div className="text-gray-600 text-sm mb-2">Contract Address</div>
                        <div className="text-pink-400 text-xs font-mono break-all">{agent.contractAddress}</div>
                      </div>

                      <div>
                        <div className="text-gray-600 text-sm mb-2">Recent Decisions</div>
                        <div className="space-y-2">
                          {agent.recentDecisions.map((decision, index) => (
                            <div key={index} className="p-2 bg-purple-900/20 rounded text-xs">
                              <div className="text-gray-900">{decision.action}</div>
                              <div className="flex justify-between text-xs mt-1">
                                <span className="text-green-400">{decision.impact}</span>
                                <span className="text-gray-600">{decision.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          Monitor
                        </Button>
                        <Button size="sm" variant="outline" className="border-purple-500/30 text-white text-xs">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Interact
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Agent Performance Metrics</CardTitle>
                <CardDescription className="text-gray-600">
                  Real-time performance analysis across all AI agents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{agent.name}</span>
                      <span className="text-gray-900">{agent.performance}%</span>
                    </div>
                    <Progress value={agent.performance} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Learning Progress</CardTitle>
                <CardDescription className="text-gray-600">
                  AI agents continuously improving through machine learning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Neural Network Updates</span>
                    <span className="text-gray-900">247/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Model Accuracy</span>
                    <span className="text-green-400">97.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Training Data Points</span>
                    <span className="text-gray-900">2.4M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prediction Confidence</span>
                    <span className="text-yellow-400">94.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Code className="w-5 h-5 text-green-400" />
                Smart Contract Integration
              </CardTitle>
              <CardDescription className="text-gray-600">
                Substrate-based smart contracts managing AI agent operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <h4 className="text-gray-900 font-semibold mb-2">AI Agent Registry</h4>
                  <p className="text-gray-600 text-sm mb-3">Manages agent registration and performance tracking</p>
                  <div className="text-xs font-mono text-green-400 break-all">
                    5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
                  </div>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h4 className="text-gray-900 font-semibold mb-2">Decision Validator</h4>
                  <p className="text-gray-600 text-sm mb-3">Validates and records AI agent decisions on-chain</p>
                  <div className="text-xs font-mono text-blue-400 break-all">
                    5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty
                  </div>
                </div>

                <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                  <h4 className="text-gray-900 font-semibold mb-2">Performance Oracle</h4>
                  <p className="text-gray-600 text-sm mb-3">Feeds real-world performance data to smart contracts</p>
                  <div className="text-xs font-mono text-purple-400 break-all">
                    5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy
                  </div>
                </div>

                <div className="p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                  <h4 className="text-gray-900 font-semibold mb-2">Reward Distribution</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Automatically distributes CITY tokens based on performance
                  </p>
                  <div className="text-xs font-mono text-orange-400 break-all">
                    5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
