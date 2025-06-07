"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  ArrowRightLeft,
  Zap,
  Wifi,
  Database,
  MessageSquare,
  TrendingUp,
  Coins,
  Clock,
  CheckCircle,
  Send,
  Download,
} from "lucide-react"

export default function CrossChainHub() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [transferAmount, setTransferAmount] = useState("")
  const [messageText, setMessageText] = useState("")

  const connectedCities = [
    {
      id: "neo-tokyo",
      name: "Neo Tokyo",
      chain: "Polkadot Parachain",
      status: "connected",
      latency: "12ms",
      throughput: "1,247 TPS",
      sharedResources: ["Energy", "Bandwidth", "Compute"],
      totalExchanges: 89234,
      lastExchange: "2 min ago",
      trustScore: 98,
      color: "from-pink-500 to-purple-500",
    },
    {
      id: "cyber-singapore",
      name: "Cyber Singapore",
      chain: "Kusama Parachain",
      status: "connected",
      latency: "8ms",
      throughput: "2,156 TPS",
      sharedResources: ["Water", "Transport", "Data"],
      totalExchanges: 156789,
      lastExchange: "5 min ago",
      trustScore: 96,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "smart-dubai",
      name: "Smart Dubai",
      chain: "Polkadot Parachain",
      status: "connecting",
      latency: "45ms",
      throughput: "892 TPS",
      sharedResources: ["Energy", "Finance"],
      totalExchanges: 23456,
      lastExchange: "1 hour ago",
      trustScore: 89,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "digital-london",
      name: "Digital London",
      chain: "Ethereum L2",
      status: "connected",
      latency: "23ms",
      throughput: "1,567 TPS",
      sharedResources: ["Finance", "Governance", "Data"],
      totalExchanges: 67890,
      lastExchange: "8 min ago",
      trustScore: 94,
      color: "from-green-500 to-emerald-500",
    },
  ]

  const recentTransactions = [
    {
      type: "resource",
      from: "AI-Sovereign City",
      to: "Neo Tokyo",
      resource: "Surplus Energy",
      amount: "2.5 GWh",
      value: "12,500 CITY",
      status: "completed",
      time: "3 min ago",
    },
    {
      type: "message",
      from: "Cyber Singapore",
      to: "AI-Sovereign City",
      resource: "Governance Proposal",
      amount: "Cross-City Transport",
      value: "0 CITY",
      status: "pending",
      time: "15 min ago",
    },
    {
      type: "resource",
      from: "Digital London",
      to: "AI-Sovereign City",
      resource: "Compute Power",
      amount: "500 GPU hours",
      value: "8,750 CITY",
      status: "completed",
      time: "1 hour ago",
    },
    {
      type: "token",
      from: "AI-Sovereign City",
      to: "Smart Dubai",
      resource: "CITY Tokens",
      amount: "50,000 CITY",
      value: "66,000 USD",
      status: "completed",
      time: "2 hours ago",
    },
  ]

  const resourceMarket = [
    {
      resource: "Energy",
      available: "15.7 GWh",
      price: "5,000 CITY/GWh",
      demand: "High",
      suppliers: 3,
      trend: "up",
    },
    {
      resource: "Bandwidth",
      available: "2.3 Tbps",
      price: "100 CITY/Gbps/day",
      demand: "Medium",
      suppliers: 4,
      trend: "stable",
    },
    {
      resource: "Compute",
      available: "1,250 GPU hours",
      price: "17.5 CITY/hour",
      demand: "Very High",
      suppliers: 2,
      trend: "up",
    },
    {
      resource: "Storage",
      available: "45.2 TB",
      price: "2 CITY/TB/month",
      demand: "Low",
      suppliers: 5,
      trend: "down",
    },
  ]

  const xcmStats = {
    totalMessages: 234567,
    successRate: 99.7,
    avgLatency: 18,
    dailyVolume: 1247,
    connectedChains: 8,
    totalValue: 12450000,
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-900/20 border-green-500/30 text-green-400"
      case "connecting":
        return "bg-yellow-900/20 border-yellow-500/30 text-yellow-400"
      case "disconnected":
        return "bg-red-900/20 border-red-500/30 text-red-400"
      default:
        return "bg-gray-900/20 border-gray-500/30 text-gray-400"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-green-400" />
      case "down":
        return <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />
      default:
        return <div className="w-3 h-3 bg-yellow-400 rounded-full" />
    }
  }

  const sendCrossChainMessage = () => {
    console.log(`Sending XCM message: ${messageText}`)
    setMessageText("")
  }

  const initiateResourceTransfer = (cityId: string) => {
    console.log(`Initiating resource transfer to ${cityId}: ${transferAmount}`)
    setTransferAmount("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Cross-Chain Hub</h2>
          <p className="text-gray-600">XCM integration for multi-city collaboration and resource sharing</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
            <Send className="w-4 h-4 mr-2" />
            Send XCM Message
          </Button>
          <Button variant="outline" className="border-purple-800/30 text-gray-900 hover:bg-purple-900/20">
            <Globe className="w-4 h-4 mr-2" />
            Connect City
          </Button>
        </div>
      </div>

      {/* XCM Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <MessageSquare className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">{(xcmStats.totalMessages / 1000).toFixed(0)}K</div>
            <div className="text-xs text-blue-300">XCM Messages</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">{xcmStats.successRate}%</div>
            <div className="text-xs text-green-300">Success Rate</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">{xcmStats.avgLatency}ms</div>
            <div className="text-xs text-yellow-300">Avg Latency</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">{xcmStats.dailyVolume}</div>
            <div className="text-xs text-purple-300">Daily Volume</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Globe className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">{xcmStats.connectedChains}</div>
            <div className="text-xs text-cyan-300">Connected</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Coins className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">{(xcmStats.totalValue / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-orange-300">Total Value</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cities" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 border-gray-200">
          <TabsTrigger value="cities" className="data-[state=active]:bg-blue-600">
            Connected Cities
          </TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-blue-600">
            Resource Market
          </TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-blue-600">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="messaging" className="data-[state=active]:bg-blue-600">
            XCM Messaging
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {connectedCities.map((city) => (
              <Card
                key={city.id}
                className={`bg-white border-gray-200 hover:bg-gray-50 transition-all cursor-pointer ${
                  selectedCity === city.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedCity(selectedCity === city.id ? null : city.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${city.color} flex items-center justify-center`}
                      >
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-gray-900 text-lg">{city.name}</CardTitle>
                        <CardDescription className="text-gray-600 text-sm">{city.chain}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(city.status)}>{city.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Latency</div>
                      <div className="text-green-400 font-medium">{city.latency}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Throughput</div>
                      <div className="text-blue-400 font-medium">{city.throughput}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Trust Score</div>
                      <div className="text-yellow-400 font-medium">{city.trustScore}%</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Exchanges</div>
                      <div className="text-gray-900 font-medium">{city.totalExchanges.toLocaleString()}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-600 text-sm mb-2">Shared Resources</div>
                    <div className="flex flex-wrap gap-1">
                      {city.sharedResources.map((resource) => (
                        <Badge
                          key={resource}
                          variant="outline"
                          className="bg-purple-900/20 border-purple-500/30 text-purple-300 text-xs"
                        >
                          {resource}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedCity === city.id && (
                    <div className="pt-3 border-t border-purple-800/30 space-y-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Transfer amount"
                          value={transferAmount}
                          onChange={(e) => setTransferAmount(e.target.value)}
                          className="bg-white border-gray-300 text-gray-900"
                        />
                        <Button
                          onClick={() => initiateResourceTransfer(city.id)}
                          className="bg-gradient-to-r from-green-600 to-emerald-600"
                        >
                          <ArrowRightLeft className="w-4 h-4 mr-1" />
                          Transfer
                        </Button>
                      </div>
                      <div className="text-xs text-gray-600">Last exchange: {city.lastExchange}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Cross-City Resource Marketplace</CardTitle>
              <CardDescription className="text-gray-600">
                Trade surplus resources with other smart cities via XCM
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resourceMarket.map((resource, index) => (
                  <Card key={index} className="bg-white border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            {resource.resource === "Energy" && <Zap className="w-5 h-5 text-white" />}
                            {resource.resource === "Bandwidth" && <Wifi className="w-5 h-5 text-white" />}
                            {resource.resource === "Compute" && <Database className="w-5 h-5 text-white" />}
                            {resource.resource === "Storage" && <Database className="w-5 h-5 text-white" />}
                          </div>
                          <div>
                            <h3 className="text-gray-900 font-semibold">{resource.resource}</h3>
                            <div className="text-gray-600 text-sm">Available: {resource.available}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-900 font-medium">{resource.price}</div>
                          <div className="flex items-center gap-1 text-sm">
                            {getTrendIcon(resource.trend)}
                            <span
                              className={
                                resource.demand === "Very High"
                                  ? "text-red-400"
                                  : resource.demand === "High"
                                    ? "text-orange-400"
                                    : resource.demand === "Medium"
                                      ? "text-yellow-400"
                                      : "text-green-400"
                              }
                            >
                              {resource.demand} Demand
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600">
                            <Download className="w-3 h-3 mr-1" />
                            Buy
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-800/30 text-gray-900 hover:bg-purple-900/20"
                          >
                            <Send className="w-3 h-3 mr-1" />
                            Sell
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Recent Cross-Chain Transactions</CardTitle>
              <CardDescription className="text-gray-600">XCM transfers and resource exchanges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          tx.status === "completed"
                            ? "bg-green-400"
                            : tx.status === "pending"
                              ? "bg-yellow-400"
                              : "bg-red-400"
                        }`}
                      ></div>
                      <div>
                        <div className="text-gray-900 text-sm">
                          {tx.from} → {tx.to}
                        </div>
                        <div className="text-gray-600 text-xs">
                          {tx.resource}: {tx.amount} • {tx.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-900 font-medium">{tx.value}</div>
                      <Badge
                        className={
                          tx.status === "completed"
                            ? "bg-green-900/20 border-green-500/30 text-green-400"
                            : tx.status === "pending"
                              ? "bg-yellow-900/20 border-yellow-500/30 text-yellow-400"
                              : "bg-red-900/20 border-red-500/30 text-red-400"
                        }
                      >
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messaging" className="space-y-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">XCM Messaging Console</CardTitle>
              <CardDescription className="text-gray-600">
                Send cross-chain messages for governance and coordination
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter XCM message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900"
                />
                <Button onClick={sendCrossChainMessage} className="bg-gradient-to-r from-blue-600 to-cyan-600">
                  <Send className="w-4 h-4 mr-2" />
                  Send XCM
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                Send governance proposals, resource requests, or coordination messages to connected cities
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
