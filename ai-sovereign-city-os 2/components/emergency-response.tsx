"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertTriangle,
  Flame,
  Zap,
  Droplets,
  Wind,
  Shield,
  MapPin,
  Clock,
  Users,
  Coins,
  CheckCircle,
  Activity,
  Siren,
} from "lucide-react"

export default function EmergencyResponse() {
  const [activeAlerts, setActiveAlerts] = useState(3)
  const [responseTime, setResponseTime] = useState(2.3)
  const [showReportForm, setShowReportForm] = useState(false)
  const [newReport, setNewReport] = useState({
    type: "",
    location: "",
    description: "",
    severity: "medium",
  })

  const emergencyStats = {
    totalFunds: 2450000,
    activeIncidents: 3,
    resolvedToday: 12,
    avgResponseTime: 2.3,
    citizenReports: 847,
    aiDetections: 1234,
  }

  const activeIncidents = [
    {
      id: "INC-2024-001",
      type: "fire",
      title: "Building Fire - Zone 3",
      location: "Commercial District, Block 7",
      severity: "high",
      status: "active",
      reportedAt: "14:23",
      responseTime: "1.2 min",
      assignedTeams: 3,
      estimatedCost: "45,000 CITY",
      aiConfidence: 97,
      description: "AI detected smoke and heat signatures in commercial building",
    },
    {
      id: "INC-2024-002",
      type: "power",
      title: "Power Grid Failure",
      location: "Residential Zone 2",
      severity: "medium",
      status: "responding",
      reportedAt: "13:45",
      responseTime: "0.8 min",
      assignedTeams: 2,
      estimatedCost: "12,000 CITY",
      aiConfidence: 89,
      description: "GridMaster AI detected voltage anomalies affecting 340 homes",
    },
    {
      id: "INC-2024-003",
      type: "water",
      title: "Water Main Break",
      location: "Park District",
      severity: "low",
      status: "resolved",
      reportedAt: "12:30",
      responseTime: "2.1 min",
      assignedTeams: 1,
      estimatedCost: "8,500 CITY",
      aiConfidence: 94,
      description: "AquaFlow AI detected pressure drop and flow irregularities",
    },
  ]

  const disasterFund = {
    totalBalance: 2450000,
    monthlyContributions: 125000,
    emergencyPayouts: 89000,
    contributors: 8247,
    averageContribution: 15.2,
  }

  const responseTeams = [
    { name: "Fire & Rescue", status: "available", members: 12, responseTime: "1.5 min" },
    { name: "Power Grid Team", status: "deployed", members: 8, responseTime: "2.1 min" },
    { name: "Water Systems", status: "available", members: 6, responseTime: "1.8 min" },
    { name: "Medical Emergency", status: "available", members: 15, responseTime: "1.2 min" },
    { name: "Cyber Security", status: "monitoring", members: 4, responseTime: "0.5 min" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setResponseTime((prev) => Math.max(1.0, Math.min(5.0, prev + (Math.random() - 0.5) * 0.2)))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-900/20 border-red-500/30 text-red-400"
      case "medium":
        return "bg-yellow-900/20 border-yellow-500/30 text-yellow-400"
      case "low":
        return "bg-green-900/20 border-green-500/30 text-green-400"
      default:
        return "bg-gray-900/20 border-gray-500/30 text-gray-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-900/20 border-red-500/30 text-red-400"
      case "responding":
        return "bg-yellow-900/20 border-yellow-500/30 text-yellow-400"
      case "resolved":
        return "bg-green-900/20 border-green-500/30 text-green-400"
      default:
        return "bg-gray-900/20 border-gray-500/30 text-gray-400"
    }
  }

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case "fire":
        return <Flame className="w-5 h-5" />
      case "power":
        return <Zap className="w-5 h-5" />
      case "water":
        return <Droplets className="w-5 h-5" />
      case "weather":
        return <Wind className="w-5 h-5" />
      default:
        return <AlertTriangle className="w-5 h-5" />
    }
  }

  const handleEmergencyReport = () => {
    console.log("Submitting emergency report:", newReport)
    setShowReportForm(false)
    setNewReport({ type: "", location: "", description: "", severity: "medium" })
  }

  const triggerEmergencyPayout = (incidentId: string) => {
    console.log(`Triggering emergency payout for incident: ${incidentId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Emergency Response</h2>
          <p className="text-gray-600">AI-powered emergency detection and disaster recovery DAO</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setShowReportForm(true)}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
          >
            <Siren className="w-4 h-4 mr-2" />
            Report Emergency
          </Button>
          <Button variant="outline" className="border-purple-800/30 text-gray-900 hover:bg-purple-900/20">
            <Shield className="w-4 h-4 mr-2" />
            Disaster Fund
          </Button>
        </div>
      </div>

      {/* Emergency Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{emergencyStats.activeIncidents}</div>
            <div className="text-xs text-red-300">Active</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{emergencyStats.resolvedToday}</div>
            <div className="text-xs text-green-300">Resolved Today</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{responseTime.toFixed(1)}min</div>
            <div className="text-xs text-blue-300">Avg Response</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Coins className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{(emergencyStats.totalFunds / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-yellow-300">Emergency Fund</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{emergencyStats.citizenReports}</div>
            <div className="text-xs text-purple-300">Citizen Reports</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Activity className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{emergencyStats.aiDetections}</div>
            <div className="text-xs text-cyan-300">AI Detections</div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Report Form */}
      {showReportForm && (
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Siren className="w-5 h-5 text-red-400" />
              Report Emergency
            </CardTitle>
            <CardDescription className="text-gray-600">
              Submit an emergency report for immediate AI analysis and response
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-900 text-sm font-medium mb-2 block">Emergency Type</label>
                <select
                  value={newReport.type}
                  onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                  className="w-full bg-white border-gray-300 text-gray-900 rounded-md p-2"
                >
                  <option value="">Select type</option>
                  <option value="fire">Fire</option>
                  <option value="power">Power Outage</option>
                  <option value="water">Water Emergency</option>
                  <option value="medical">Medical Emergency</option>
                  <option value="security">Security Incident</option>
                  <option value="weather">Weather Emergency</option>
                </select>
              </div>
              <div>
                <label className="text-gray-900 text-sm font-medium mb-2 block">Severity</label>
                <select
                  value={newReport.severity}
                  onChange={(e) => setNewReport({ ...newReport, severity: e.target.value })}
                  className="w-full bg-white border-gray-300 text-gray-900 rounded-md p-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-gray-900 text-sm font-medium mb-2 block">Location</label>
              <Input
                value={newReport.location}
                onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
                placeholder="Enter specific location or zone"
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>
            <div>
              <label className="text-gray-900 text-sm font-medium mb-2 block">Description</label>
              <Textarea
                value={newReport.description}
                onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                placeholder="Describe the emergency situation"
                className="bg-white border-gray-300 text-gray-900 min-h-[80px]"
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleEmergencyReport} className="bg-gradient-to-r from-red-600 to-orange-600">
                Submit Emergency Report
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowReportForm(false)}
                className="border-purple-800/30 text-gray-900 hover:bg-purple-900/20"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Incidents */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Active Incidents</CardTitle>
          <CardDescription className="text-gray-600">
            Real-time emergency monitoring with AI detection and automated response
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeIncidents.map((incident) => (
              <Card key={incident.id} className="bg-white border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${
                          incident.type === "fire"
                            ? "from-red-500 to-orange-500"
                            : incident.type === "power"
                              ? "from-yellow-500 to-orange-500"
                              : "from-blue-500 to-cyan-500"
                        } flex items-center justify-center`}
                      >
                        {getIncidentIcon(incident.type)}
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-semibold">{incident.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          {incident.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getSeverityColor(incident.severity)}>{incident.severity}</Badge>
                      <Badge className={getStatusColor(incident.status)}>{incident.status}</Badge>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{incident.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-gray-600 text-xs">Reported</div>
                      <div className="text-gray-900 font-medium">{incident.reportedAt}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 text-xs">Response Time</div>
                      <div className="text-green-400 font-medium">{incident.responseTime}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 text-xs">Teams Assigned</div>
                      <div className="text-blue-400 font-medium">{incident.assignedTeams}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 text-xs">AI Confidence</div>
                      <div className="text-cyan-400 font-medium">{incident.aiConfidence}%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-600">Estimated Cost: </span>
                      <span className="text-yellow-400 font-medium">{incident.estimatedCost}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => triggerEmergencyPayout(incident.id)}
                        className="bg-gradient-to-r from-green-600 to-emerald-600"
                      >
                        <Coins className="w-3 h-3 mr-1" />
                        Trigger Payout
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-800/30 text-gray-900 hover:bg-purple-900/20"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Response Teams & Disaster Fund */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Response Teams</CardTitle>
            <CardDescription className="text-gray-600">Emergency response team status and availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {responseTeams.map((team, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg">
                  <div>
                    <div className="text-gray-900 font-medium">{team.name}</div>
                    <div className="text-gray-600 text-sm">
                      {team.members} members • {team.responseTime}
                    </div>
                  </div>
                  <Badge
                    className={
                      team.status === "available"
                        ? "bg-green-900/20 border-green-500/30 text-green-400"
                        : team.status === "deployed"
                          ? "bg-red-900/20 border-red-500/30 text-red-400"
                          : "bg-yellow-900/20 border-yellow-500/30 text-yellow-400"
                    }
                  >
                    {team.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Disaster Recovery DAO</CardTitle>
            <CardDescription className="text-gray-600">
              Community-funded emergency response with instant payouts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-600 text-sm">Total Fund</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {(disasterFund.totalBalance / 1000000).toFixed(1)}M CITY
                </div>
              </div>
              <div>
                <div className="text-gray-600 text-sm">Contributors</div>
                <div className="text-2xl font-bold text-blue-400">{disasterFund.contributors.toLocaleString()}</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Monthly Contributions</span>
                <span className="text-green-400">+{(disasterFund.monthlyContributions / 1000).toFixed(0)}K CITY</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Emergency Payouts</span>
                <span className="text-red-400">-{(disasterFund.emergencyPayouts / 1000).toFixed(0)}K CITY</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg Contribution</span>
                <span className="text-gray-900">{disasterFund.averageContribution} CITY</span>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
              <Coins className="w-4 h-4 mr-2" />
              Contribute to Fund
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
