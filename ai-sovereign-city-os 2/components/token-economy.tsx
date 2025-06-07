"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Coins,
  TrendingUp,
  ArrowUpDown,
  Zap,
  Wifi,
  Car,
  Home,
  Award,
  Users,
  DollarSign,
  PiggyBank,
  CreditCard,
  Wallet,
} from "lucide-react"

interface TokenEconomyProps {
  isConnected: boolean
}

export default function TokenEconomy({ isConnected }: TokenEconomyProps) {
  const [userBalance, setUserBalance] = useState(12847)
  const [stakingAmount, setStakingAmount] = useState("")
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const tokenStats = {
    totalSupply: 100000000,
    circulating: 67500000,
    staked: 45200000,
    burned: 2300000,
    marketCap: 89400000,
    price: 1.32,
    apr: 12.5,
  }

  const services = [
    {
      id: "ev-charging",
      name: "EV Charging",
      icon: Zap,
      price: "0.15 CITY/kWh",
      usage: "2,340 sessions today",
      revenue: "8,450 CITY",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "wifi",
      name: "Public WiFi",
      icon: Wifi,
      price: "0.01 CITY/hour",
      usage: "15,670 connections",
      revenue: "1,890 CITY",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "parking",
      name: "Smart Parking",
      icon: Car,
      price: "0.25 CITY/hour",
      usage: "5,430 spots used",
      revenue: "12,340 CITY",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "housing",
      name: "Smart Home Services",
      icon: Home,
      price: "2.5 CITY/month",
      usage: "8,920 homes",
      revenue: "22,300 CITY",
      color: "from-green-500 to-emerald-500",
    },
  ]

  const recentTransactions = [
    { type: "reward", amount: "+125 CITY", description: "Governance participation reward", time: "2 min ago" },
    { type: "payment", amount: "-0.45 CITY", description: "EV charging session", time: "15 min ago" },
    { type: "staking", amount: "+89 CITY", description: "Staking rewards", time: "1 hour ago" },
    { type: "service", amount: "-2.5 CITY", description: "Smart home subscription", time: "3 hours ago" },
    { type: "reward", amount: "+50 CITY", description: "AI agent performance bonus", time: "6 hours ago" },
  ]

  const stakingPools = [
    { name: "Governance Pool", apr: 15.2, staked: "12.4M CITY", risk: "Low" },
    { name: "Infrastructure Pool", apr: 18.7, staked: "8.9M CITY", risk: "Medium" },
    { name: "AI Development Pool", apr: 22.1, staked: "5.2M CITY", risk: "High" },
    { name: "Cross-Chain Pool", apr: 25.5, staked: "3.1M CITY", risk: "High" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setUserBalance((prev) => prev + Math.floor(Math.random() * 5))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleStake = (poolName: string) => {
    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }
    console.log(`Staking ${stakingAmount} CITY in ${poolName}`)
  }

  const handleServicePayment = (serviceId: string) => {
    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }
    console.log(`Paying for service: ${serviceId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Token Economy</h2>
          <p className="text-gray-600">CITY tokens on Polkadot Asset Hub - Powering the smart city ecosystem</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
            <PiggyBank className="w-4 h-4 mr-2" />
            Stake Tokens
          </Button>
          <Button variant="outline" className="border-purple-800/30 text-gray-900 hover:bg-purple-900/20">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Trade
          </Button>
        </div>
      </div>

      {/* Token Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Coins className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">${tokenStats.price}</div>
            <div className="text-xs text-yellow-300">CITY Price</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">${(tokenStats.marketCap / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-green-300">Market Cap</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">{(tokenStats.circulating / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-blue-300">Circulating</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <PiggyBank className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">{(tokenStats.staked / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-purple-300">Staked</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Award className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">{tokenStats.apr}%</div>
            <div className="text-xs text-orange-300">Staking APR</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">24.7K</div>
            <div className="text-xs text-cyan-300">Holders</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Wallet className="w-6 h-6 text-pink-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">{userBalance.toLocaleString()}</div>
            <div className="text-xs text-pink-300">Your Balance</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 border-gray-200">
          <TabsTrigger value="services" className="data-[state=active]:bg-blue-600">
            Tokenized Services
          </TabsTrigger>
          <TabsTrigger value="staking" className="data-[state=active]:bg-blue-600">
            Staking Pools
          </TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-blue-600">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Pay-Per-Use City Services</CardTitle>
              <CardDescription className="text-gray-600">
                Micropayments for city services using CITY tokens on Polkadot Asset Hub
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {services.map((service) => {
                  const IconComponent = service.icon
                  return (
                    <Card
                      key={service.id}
                      className="bg-white border-gray-200 hover:bg-gray-100 transition-all cursor-pointer"
                      onClick={() => setSelectedService(service.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center`}
                          >
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleServicePayment(service.id)
                            }}
                            className="bg-gradient-to-r from-purple-600 to-pink-600"
                            disabled={!isConnected}
                          >
                            <CreditCard className="w-3 h-3 mr-1" />
                            Pay
                          </Button>
                        </div>
                        <h3 className="text-gray-900 font-semibold mb-2">{service.name}</h3>
                        <div className="space-y-1 text-sm">
                          <div className="text-gray-600">Price: {service.price}</div>
                          <div className="text-blue-300">{service.usage}</div>
                          <div className="text-green-300">Revenue: {service.revenue}</div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staking" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stakingPools.map((pool, index) => (
              <Card key={index} className="bg-white border-gray-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900">{pool.name}</CardTitle>
                    <Badge
                      className={
                        pool.risk === "Low"
                          ? "bg-green-900/20 border-green-500/30 text-green-400"
                          : pool.risk === "Medium"
                            ? "bg-yellow-900/20 border-yellow-500/30 text-yellow-400"
                            : "bg-red-900/20 border-red-500/30 text-red-400"
                      }
                    >
                      {pool.risk} Risk
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600">
                    APR: {pool.apr}% • Staked: {pool.staked}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Amount to stake"
                      value={stakingAmount}
                      onChange={(e) => setStakingAmount(e.target.value)}
                      className="bg-white border-gray-300 text-gray-900"
                    />
                    <Button
                      onClick={() => handleStake(pool.name)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600"
                      disabled={!isConnected}
                    >
                      Stake
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600">
                    Estimated rewards:{" "}
                    {stakingAmount ? ((Number.parseFloat(stakingAmount) * pool.apr) / 100).toFixed(2) : "0"} CITY/year
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Recent Transactions</CardTitle>
              <CardDescription className="text-gray-600">Your latest CITY token activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          tx.type === "reward"
                            ? "bg-green-400"
                            : tx.type === "payment"
                              ? "bg-red-400"
                              : tx.type === "staking"
                                ? "bg-blue-400"
                                : "bg-yellow-400"
                        }`}
                      ></div>
                      <div>
                        <div className="text-gray-900 text-sm">{tx.description}</div>
                        <div className="text-gray-600 text-xs">{tx.time}</div>
                      </div>
                    </div>
                    <div className={`font-medium ${tx.amount.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                      {tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Token Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Staked</span>
                    <span className="text-gray-900">45.2%</span>
                  </div>
                  <Progress value={45.2} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Circulating</span>
                    <span className="text-gray-900">67.5%</span>
                  </div>
                  <Progress value={67.5} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Treasury</span>
                    <span className="text-gray-900">30.2%</span>
                  </div>
                  <Progress value={30.2} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Service Revenue</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center">
                    <span className="text-gray-600">{service.name}</span>
                    <span className="text-gray-900 font-medium">{service.revenue}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
