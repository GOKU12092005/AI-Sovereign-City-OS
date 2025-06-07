"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Zap,
  Recycle,
  Car,
  Wifi,
  Home,
  Building,
  Trees,
  Droplets,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Settings,
} from "lucide-react"

export default function CityZones() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null)

  const zones = [
    {
      id: "energy",
      name: "Energy Grid",
      icon: Zap,
      status: "optimal",
      efficiency: 94,
      aiAgent: "GridMaster AI",
      description: "Smart energy distribution and renewable integration",
      metrics: {
        consumption: "2.4 GWh",
        renewable: "78%",
        savings: "$124K",
        co2Reduced: "340 tons",
      },
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      id: "waste",
      name: "Waste Management",
      icon: Recycle,
      status: "good",
      efficiency: 87,
      aiAgent: "EcoSort AI",
      description: "Automated waste collection and recycling optimization",
      metrics: {
        recycled: "89%",
        collected: "450 tons",
        routes: "12 optimized",
        emissions: "-23%",
      },
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: "traffic",
      name: "Traffic Control",
      icon: Car,
      status: "optimal",
      efficiency: 91,
      aiAgent: "FlowMaster AI",
      description: "Dynamic traffic optimization and congestion management",
      metrics: {
        avgSpeed: "45 km/h",
        congestion: "-34%",
        accidents: "-67%",
        fuelSaved: "890L",
      },
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: "telecom",
      name: "Telecom Network",
      icon: Wifi,
      status: "excellent",
      efficiency: 96,
      aiAgent: "NetOptim AI",
      description: "5G network optimization and bandwidth allocation",
      metrics: {
        uptime: "99.9%",
        bandwidth: "10 Gbps",
        latency: "2ms",
        coverage: "98%",
      },
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      id: "housing",
      name: "Smart Housing",
      icon: Home,
      status: "good",
      efficiency: 85,
      aiAgent: "HomeCare AI",
      description: "Residential automation and energy management",
      metrics: {
        units: "12,847",
        automated: "76%",
        energySaved: "23%",
        satisfaction: "94%",
      },
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
    {
      id: "commercial",
      name: "Commercial District",
      icon: Building,
      status: "optimal",
      efficiency: 89,
      aiAgent: "BizOptim AI",
      description: "Business district optimization and resource allocation",
      metrics: {
        businesses: "2,340",
        footfall: "+12%",
        revenue: "+8%",
        efficiency: "89%",
      },
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
    },
    {
      id: "parks",
      name: "Green Spaces",
      icon: Trees,
      status: "excellent",
      efficiency: 93,
      aiAgent: "EcoGreen AI",
      description: "Park maintenance and environmental monitoring",
      metrics: {
        parks: "45",
        airQuality: "Good",
        biodiversity: "+15%",
        visitors: "89K/month",
      },
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: "water",
      name: "Water Systems",
      icon: Droplets,
      status: "good",
      efficiency: 88,
      aiAgent: "AquaFlow AI",
      description: "Water distribution and quality management",
      metrics: {
        quality: "99.8%",
        pressure: "Optimal",
        leaks: "-45%",
        consumption: "2.1M L/day",
      },
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-50 border-green-200 text-green-700"
      case "optimal":
        return "bg-blue-50 border-blue-200 text-blue-700"
      case "good":
        return "bg-yellow-50 border-yellow-200 text-yellow-700"
      default:
        return "bg-red-50 border-red-200 text-red-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
      case "optimal":
        return <CheckCircle className="w-4 h-4" />
      case "good":
        return <TrendingUp className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">City Zones</h2>
          <p className="text-gray-600">AI-powered infrastructure management across all city sectors</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Settings className="w-4 h-4 mr-2" />
          Zone Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {zones.map((zone) => {
          const IconComponent = zone.icon
          return (
            <Card
              key={zone.id}
              className={`bg-white border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                selectedZone === zone.id ? "ring-2 ring-blue-500 border-blue-300" : ""
              }`}
              onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-lg ${zone.bgColor} ${zone.borderColor} border flex items-center justify-center`}
                  >
                    <IconComponent className={`w-5 h-5 ${zone.color}`} />
                  </div>
                  <Badge className={getStatusColor(zone.status)}>
                    {getStatusIcon(zone.status)}
                    <span className="ml-1 capitalize">{zone.status}</span>
                  </Badge>
                </div>
                <CardTitle className="text-gray-900 text-lg">{zone.name}</CardTitle>
                <CardDescription className="text-gray-600 text-sm">{zone.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Efficiency</span>
                    <span className="text-gray-900">{zone.efficiency}%</span>
                  </div>
                  <Progress value={zone.efficiency} className="h-2" />
                </div>

                <div className="text-sm">
                  <div className="text-gray-600 mb-1">AI Agent</div>
                  <div className="text-gray-900 font-medium">{zone.aiAgent}</div>
                </div>

                {selectedZone === zone.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {Object.entries(zone.metrics).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-gray-600 capitalize">{key}</div>
                          <div className="text-gray-900 font-medium">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedZone && (
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">Zone Analytics & Controls</CardTitle>
            <CardDescription className="text-gray-600">
              Real-time monitoring and AI agent management for {zones.find((z) => z.id === selectedZone)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="text-gray-900 font-semibold">Performance Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uptime</span>
                    <span className="text-green-600">99.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="text-blue-600">1.2s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost Savings</span>
                    <span className="text-green-600">$45K</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-gray-900 font-semibold">AI Agent Status</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-900">Active & Learning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-900">Processing 247 events/min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-900">Last optimization: 3min ago</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-gray-900 font-semibold">Quick Actions</h4>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-gray-700 border-gray-200 hover:bg-gray-50"
                  >
                    Adjust Parameters
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-gray-700 border-gray-200 hover:bg-gray-50"
                  >
                    View Detailed Logs
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-gray-700 border-gray-200 hover:bg-gray-50"
                  >
                    Schedule Maintenance
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
