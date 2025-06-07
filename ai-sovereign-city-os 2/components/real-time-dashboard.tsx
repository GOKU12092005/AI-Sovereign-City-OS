"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Activity,
  TrendingUp,
  Zap,
  Users,
  AlertTriangle,
  Download,
  RefreshCw,
  Bell,
  Eye,
  BarChart3,
} from "lucide-react"

interface RealTimeDashboardProps {
  isConnected: boolean
}

export default function RealTimeDashboard({ isConnected }: RealTimeDashboardProps) {
  const [realTimeData, setRealTimeData] = useState({
    energyConsumption: 2847,
    activeUsers: 12847,
    aiDecisions: 247,
    networkLatency: 23,
    alerts: 3,
    efficiency: 94.2,
  })

  const [chartData, setChartData] = useState<any[]>([])
  const [energyData, setEnergyData] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [isLive, setIsLive] = useState(true)

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        const now = new Date()
        const timeStr = now.toLocaleTimeString()

        // Update real-time metrics
        setRealTimeData((prev) => ({
          energyConsumption: prev.energyConsumption + Math.floor(Math.random() * 20 - 10),
          activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
          aiDecisions: prev.aiDecisions + Math.floor(Math.random() * 5),
          networkLatency: Math.max(10, Math.min(50, prev.networkLatency + Math.random() * 4 - 2)),
          alerts: Math.max(0, prev.alerts + Math.floor(Math.random() * 3 - 1)),
          efficiency: Math.max(85, Math.min(100, prev.efficiency + Math.random() * 2 - 1)),
        }))

        // Update chart data
        setChartData((prev) => {
          const newData = [
            ...prev,
            {
              time: timeStr,
              energy: realTimeData.energyConsumption,
              users: realTimeData.activeUsers / 100,
              efficiency: realTimeData.efficiency,
            },
          ].slice(-20) // Keep last 20 points
          return newData
        })

        // Update energy distribution data
        setEnergyData([
          { name: "Solar", value: 45, color: "#10B981" },
          { name: "Wind", value: 25, color: "#3B82F6" },
          { name: "Grid", value: 20, color: "#F59E0B" },
          { name: "Battery", value: 10, color: "#8B5CF6" },
        ])

        // Random notifications
        if (Math.random() > 0.8) {
          const newNotification = {
            id: Date.now(),
            type: Math.random() > 0.5 ? "success" : "warning",
            message: Math.random() > 0.5 ? "AI optimized traffic flow in Zone 3" : "Energy consumption spike detected",
            time: timeStr,
          }
          setNotifications((prev) => [newNotification, ...prev.slice(0, 4)])
        }
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isLive, realTimeData])

  const exportData = () => {
    const dataToExport = {
      timestamp: new Date().toISOString(),
      realTimeMetrics: realTimeData,
      chartData: chartData,
      energyDistribution: energyData,
    }

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `city-data-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Real-Time Analytics Dashboard</h2>
          <p className="text-gray-600">Live city metrics with AI-powered insights</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setIsLive(!isLive)}
            variant={isLive ? "default" : "outline"}
            className={isLive ? "bg-green-600 hover:bg-green-700" : ""}
          >
            <Activity className="w-4 h-4 mr-2" />
            {isLive ? "Live" : "Paused"}
          </Button>
          <Button onClick={exportData} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Zap className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{realTimeData.energyConsumption}</div>
            <div className="text-xs text-gray-600">kWh/hour</div>
            <div className="text-xs text-green-600 mt-1">↓ 12% from yesterday</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{realTimeData.activeUsers.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Active Users</div>
            <div className="text-xs text-green-600 mt-1">↑ 5% from yesterday</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Activity className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{realTimeData.aiDecisions}</div>
            <div className="text-xs text-gray-600">AI Decisions/min</div>
            <div className="text-xs text-blue-600 mt-1">Real-time</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <RefreshCw className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{realTimeData.networkLatency.toFixed(1)}</div>
            <div className="text-xs text-gray-600">ms latency</div>
            <div className="text-xs text-green-600 mt-1">Excellent</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{realTimeData.alerts}</div>
            <div className="text-xs text-gray-600">Active Alerts</div>
            <div className="text-xs text-orange-600 mt-1">Monitor</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{realTimeData.efficiency.toFixed(1)}%</div>
            <div className="text-xs text-gray-600">Efficiency</div>
            <div className="text-xs text-green-600 mt-1">↑ 2.3%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Line Chart */}
        <Card className="lg:col-span-2 bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Live Performance Metrics
            </CardTitle>
            <CardDescription>Real-time city performance data</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
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
                <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} name="Energy (kWh)" />
                <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} name="Users (x100)" />
                <Line type="monotone" dataKey="efficiency" stroke="#f59e0b" strokeWidth={2} name="Efficiency %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Live Notifications */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Live Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border ${
                    notification.type === "success" ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"
                  }`}
                >
                  <div
                    className={`text-sm font-medium ${
                      notification.type === "success" ? "text-green-800" : "text-orange-800"
                    }`}
                  >
                    {notification.message}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="text-center text-gray-500 py-8">No recent notifications</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Energy Distribution & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Energy Source Distribution</CardTitle>
            <CardDescription>Real-time renewable energy mix</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={energyData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {energyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">AI Predictions</CardTitle>
            <CardDescription>Machine learning insights for next 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">Energy Prediction</span>
              </div>
              <p className="text-sm text-blue-700">
                Peak demand expected at 6 PM. Recommend activating battery storage.
              </p>
              <div className="mt-2">
                <Progress value={78} className="h-2" />
                <span className="text-xs text-blue-600">78% confidence</span>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Traffic Optimization</span>
              </div>
              <p className="text-sm text-green-700">
                AI suggests rerouting traffic through Zone 2 to reduce congestion by 23%.
              </p>
              <div className="mt-2">
                <Progress value={92} className="h-2" />
                <span className="text-xs text-green-600">92% confidence</span>
              </div>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-purple-800">Maintenance Alert</span>
              </div>
              <p className="text-sm text-purple-700">Water system in Sector 5 requires maintenance within 72 hours.</p>
              <div className="mt-2">
                <Progress value={85} className="h-2" />
                <span className="text-xs text-purple-600">85% confidence</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
