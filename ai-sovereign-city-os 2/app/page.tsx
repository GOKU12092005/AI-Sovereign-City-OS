"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Zap,
  Vote,
  Coins,
  Users,
  AlertTriangle,
  TrendingUp,
  Globe,
  Cpu,
  Award,
  MessageSquare,
  Network,
  Shield,
  Building,
} from "lucide-react"
import WalletConnection from "@/components/wallet-connection"
import CityZones from "@/components/city-zones"
import DAOGovernance from "@/components/dao-governance"
import AIAgentDashboard from "@/components/ai-agent-dashboard"
import TokenEconomy from "@/components/token-economy"
import CitizenReputation from "@/components/citizen-reputation"
import EmergencyResponse from "@/components/emergency-response"
import CrossChainHub from "@/components/cross-chain-hub"
import UrbanPlanningSimulator from "@/components/urban-planning-simulator"
import RealTimeDashboard from "@/components/real-time-dashboard"
import SmartContractInterface from "@/components/smart-contract-interface"
import AIPredictionEngine from "@/components/ai-prediction-engine"

export default function HomePage() {
  const [isConnected, setIsConnected] = useState(false)
  const [currentAccount, setCurrentAccount] = useState<string>("")
  const [cityStats, setCityStats] = useState({
    totalCitizens: 12847,
    activeZones: 8,
    aiAgents: 24,
    governanceProposals: 15,
    tokenCirculation: 2847392,
    energyEfficiency: 87,
    citizenSatisfaction: 94,
    emergencyResponseTime: 2.3,
  })

  const [realTimeData, setRealTimeData] = useState({
    aiDecisions: 247,
    energySaved: 1247,
    crossChainMessages: 89,
    activeVotes: 12,
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setCityStats((prev) => ({
        ...prev,
        totalCitizens: prev.totalCitizens + Math.floor(Math.random() * 3),
        energyEfficiency: Math.max(80, Math.min(100, prev.energyEfficiency + (Math.random() - 0.5) * 1)),
        citizenSatisfaction: Math.max(85, Math.min(100, prev.citizenSatisfaction + (Math.random() - 0.5) * 0.5)),
      }))

      setRealTimeData((prev) => ({
        ...prev,
        aiDecisions: prev.aiDecisions + Math.floor(Math.random() * 2),
        energySaved: prev.energySaved + Math.floor(Math.random() * 5),
        crossChainMessages: prev.crossChainMessages + Math.floor(Math.random() * 1),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI-Sovereign City OS</h1>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Network className="w-4 h-4" />
                  Powered by Polkadot • Enterprise Smart City Platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>AI Decisions: {realTimeData.aiDecisions}/min</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <Zap className="w-4 h-4" />
                  <span>Energy Saved: {realTimeData.energySaved} kWh</span>
                </div>
              </div>
              <WalletConnection
                isConnected={isConnected}
                setIsConnected={setIsConnected}
                currentAccount={currentAccount}
                setCurrentAccount={setCurrentAccount}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Professional Stats Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{cityStats.totalCitizens.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Citizens</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Globe className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{cityStats.activeZones}</div>
                <div className="text-xs text-gray-600">Active Zones</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Cpu className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{cityStats.aiAgents}</div>
                <div className="text-xs text-gray-600">AI Agents</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Vote className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{cityStats.governanceProposals}</div>
                <div className="text-xs text-gray-600">Proposals</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Coins className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {(cityStats.tokenCirculation / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs text-gray-600">CITY Tokens</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Zap className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{cityStats.energyEfficiency}%</div>
                <div className="text-xs text-gray-600">Efficiency</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Award className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{cityStats.citizenSatisfaction}%</div>
                <div className="text-xs text-gray-600">Satisfaction</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{cityStats.emergencyResponseTime}min</div>
                <div className="text-xs text-gray-600">Response</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-12 bg-white border border-gray-200">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="contracts" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Contracts
            </TabsTrigger>
            <TabsTrigger
              value="ai-predictions"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              AI Predictions
            </TabsTrigger>
            <TabsTrigger value="zones" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              City Zones
            </TabsTrigger>
            <TabsTrigger value="governance" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              DAO
            </TabsTrigger>
            <TabsTrigger value="ai-agents" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              AI Agents
            </TabsTrigger>
            <TabsTrigger value="economy" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Economy
            </TabsTrigger>
            <TabsTrigger value="reputation" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Reputation
            </TabsTrigger>
            <TabsTrigger value="emergency" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Emergency
            </TabsTrigger>
            <TabsTrigger value="cross-chain" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Cross-Chain
            </TabsTrigger>
            <TabsTrigger value="simulator" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              AI Simulator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Real-time Activity Feed */}
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  Real-time AI Activity
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Live feed of AI agent decisions and city optimizations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-medium">GridMaster AI</span>
                    </div>
                    <p className="text-gray-900 text-sm">Optimized energy distribution</p>
                    <p className="text-green-600 text-xs">Saved 247 kWh • 12 seconds ago</p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-medium">FlowMaster AI</span>
                    </div>
                    <p className="text-gray-900 text-sm">Adjusted traffic signals</p>
                    <p className="text-blue-600 text-xs">Reduced congestion 15% • 28 seconds ago</p>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-700 font-medium">EcoSort AI</span>
                    </div>
                    <p className="text-gray-900 text-sm">Optimized waste routes</p>
                    <p className="text-purple-600 text-xs">Efficiency +8% • 45 seconds ago</p>
                  </div>

                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-orange-700 font-medium">NetOptim AI</span>
                    </div>
                    <p className="text-gray-900 text-sm">Balanced network load</p>
                    <p className="text-orange-600 text-xs">Latency -23ms • 1 minute ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    City Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Energy Efficiency</span>
                      <span className="text-gray-900">{cityStats.energyEfficiency}%</span>
                    </div>
                    <Progress value={cityStats.energyEfficiency} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Citizen Satisfaction</span>
                      <span className="text-gray-900">{cityStats.citizenSatisfaction}%</span>
                    </div>
                    <Progress value={cityStats.citizenSatisfaction} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">AI Automation</span>
                      <span className="text-gray-900">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Cross-Chain Integration</span>
                      <span className="text-gray-900">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Network Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-gray-900 text-sm">XCM message from Neo Tokyo</p>
                        <p className="text-green-600 text-xs">Resource sharing proposal • 1 min ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-gray-900 text-sm">New governance proposal</p>
                        <p className="text-blue-600 text-xs">Smart contract upgrade • 3 min ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-gray-900 text-sm">AI agent performance update</p>
                        <p className="text-purple-600 text-xs">Efficiency metrics improved • 5 min ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Overview */}
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Network className="w-5 h-5 text-blue-600" />
                  Enterprise Smart City Platform
                </CardTitle>
                <CardDescription className="text-gray-600">
                  AI-powered city management built on Polkadot's enterprise-grade infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Brain className="w-8 h-8 text-blue-600 mb-2" />
                    <h3 className="text-gray-900 font-semibold mb-1">AI Governance</h3>
                    <p className="text-gray-600 text-sm">24 autonomous AI agents with substrate integration</p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <Shield className="w-8 h-8 text-green-600 mb-2" />
                    <h3 className="text-gray-900 font-semibold mb-1">Secure DAO</h3>
                    <p className="text-gray-600 text-sm">Enterprise-grade governance with privacy protection</p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <Coins className="w-8 h-8 text-purple-600 mb-2" />
                    <h3 className="text-gray-900 font-semibold mb-1">Token Economy</h3>
                    <p className="text-gray-600 text-sm">CITY tokens on Polkadot Asset Hub</p>
                  </div>
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <Globe className="w-8 h-8 text-orange-600 mb-2" />
                    <h3 className="text-gray-900 font-semibold mb-1">Multi-City Network</h3>
                    <p className="text-gray-600 text-sm">Cross-chain collaboration infrastructure</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <RealTimeDashboard isConnected={isConnected} />
          </TabsContent>

          <TabsContent value="contracts">
            <SmartContractInterface isConnected={isConnected} currentAccount={currentAccount} />
          </TabsContent>

          <TabsContent value="ai-predictions">
            <AIPredictionEngine />
          </TabsContent>

          <TabsContent value="zones">
            <CityZones />
          </TabsContent>

          <TabsContent value="governance">
            <DAOGovernance isConnected={isConnected} />
          </TabsContent>

          <TabsContent value="ai-agents">
            <AIAgentDashboard />
          </TabsContent>

          <TabsContent value="economy">
            <TokenEconomy isConnected={isConnected} />
          </TabsContent>

          <TabsContent value="reputation">
            <CitizenReputation isConnected={isConnected} />
          </TabsContent>

          <TabsContent value="emergency">
            <EmergencyResponse />
          </TabsContent>

          <TabsContent value="cross-chain">
            <CrossChainHub />
          </TabsContent>

          <TabsContent value="simulator">
            <UrbanPlanningSimulator />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
