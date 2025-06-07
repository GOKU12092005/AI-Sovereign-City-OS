"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Building, Home, Trees, Car, Zap, TrendingUp, BarChart3, Play, Save, Brain } from "lucide-react"

export default function UrbanPlanningSimulator() {
  const [simulationRunning, setSimulationRunning] = useState(false)
  const [timeHorizon, setTimeHorizon] = useState([10])
  const [population, setPopulation] = useState([50000])
  const [budget, setBudget] = useState([10000000])

  const [zoneAllocations, setZoneAllocations] = useState({
    residential: 40,
    commercial: 25,
    industrial: 15,
    green: 20,
  })

  const simulationResults = {
    populationGrowth: 23.5,
    economicGrowth: 18.2,
    sustainability: 87.3,
    citizenSatisfaction: 91.2,
    infrastructureCost: 8500000,
    energyEfficiency: 94.1,
    trafficFlow: 89.7,
    airQuality: 92.4,
  }

  const scenarios = [
    {
      name: "Green City Focus",
      description: "Maximize sustainability and green spaces",
      allocations: { residential: 35, commercial: 20, industrial: 10, green: 35 },
      expectedOutcome: "High sustainability, moderate growth",
    },
    {
      name: "Economic Growth",
      description: "Focus on commercial and industrial development",
      allocations: { residential: 30, commercial: 40, industrial: 25, green: 5 },
      expectedOutcome: "High economic growth, lower sustainability",
    },
    {
      name: "Balanced Development",
      description: "Balanced approach to all zones",
      allocations: { residential: 40, commercial: 25, industrial: 15, green: 20 },
      expectedOutcome: "Moderate growth across all metrics",
    },
    {
      name: "Residential Priority",
      description: "Focus on housing and quality of life",
      allocations: { residential: 55, commercial: 20, industrial: 10, green: 15 },
      expectedOutcome: "High citizen satisfaction, moderate growth",
    },
  ]

  const runSimulation = () => {
    setSimulationRunning(true)
    setTimeout(() => {
      setSimulationRunning(false)
    }, 3000)
  }

  const loadScenario = (scenario: any) => {
    setZoneAllocations(scenario.allocations)
  }

  const updateZoneAllocation = (zone: string, value: number) => {
    const remaining = 100 - value
    const otherZones = Object.keys(zoneAllocations).filter((z) => z !== zone)
    const otherTotal = otherZones.reduce((sum, z) => sum + zoneAllocations[z as keyof typeof zoneAllocations], 0)

    if (otherTotal > 0) {
      const newAllocations = { ...zoneAllocations, [zone]: value }
      otherZones.forEach((z) => {
        newAllocations[z as keyof typeof zoneAllocations] = Math.round(
          (zoneAllocations[z as keyof typeof zoneAllocations] / otherTotal) * remaining,
        )
      })
      setZoneAllocations(newAllocations)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">AI Urban Planning Simulator</h2>
          <p className="text-gray-600">Test city growth scenarios and budgets on-chain before deployment</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={runSimulation}
            disabled={simulationRunning}
            className="bg-gradient-to-r from-green-600 to-emerald-600"
          >
            <Play className="w-4 h-4 mr-2" />
            {simulationRunning ? "Running..." : "Run Simulation"}
          </Button>
          <Button variant="outline" className="border-purple-800/30 text-white hover:bg-purple-900/20">
            <Save className="w-4 h-4 mr-2" />
            Save Scenario
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simulation Parameters */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Simulation Parameters</CardTitle>
            <CardDescription className="text-gray-600">Configure your city planning scenario</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-gray-900 text-sm font-medium mb-3 block">
                Time Horizon: {timeHorizon[0]} years
              </label>
              <Slider value={timeHorizon} onValueChange={setTimeHorizon} max={50} min={5} step={5} className="w-full" />
            </div>

            <div>
              <label className="text-gray-900 text-sm font-medium mb-3 block">
                Target Population: {population[0].toLocaleString()}
              </label>
              <Slider
                value={population}
                onValueChange={setPopulation}
                max={200000}
                min={10000}
                step={5000}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-gray-900 text-sm font-medium mb-3 block">
                Budget: {(budget[0] / 1000000).toFixed(1)}M CITY
              </label>
              <Slider
                value={budget}
                onValueChange={setBudget}
                max={50000000}
                min={1000000}
                step={1000000}
                className="w-full"
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-gray-900 font-semibold">Zone Allocations</h4>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Home className="w-3 h-3" />
                    Residential
                  </span>
                  <span className="text-gray-900">{zoneAllocations.residential}%</span>
                </div>
                <Slider
                  value={[zoneAllocations.residential]}
                  onValueChange={(value) => updateZoneAllocation("residential", value[0])}
                  max={80}
                  min={10}
                  step={5}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    Commercial
                  </span>
                  <span className="text-gray-900">{zoneAllocations.commercial}%</span>
                </div>
                <Slider
                  value={[zoneAllocations.commercial]}
                  onValueChange={(value) => updateZoneAllocation("commercial", value[0])}
                  max={60}
                  min={5}
                  step={5}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Car className="w-3 h-3" />
                    Industrial
                  </span>
                  <span className="text-gray-900">{zoneAllocations.industrial}%</span>
                </div>
                <Slider
                  value={[zoneAllocations.industrial]}
                  onValueChange={(value) => updateZoneAllocation("industrial", value[0])}
                  max={40}
                  min={5}
                  step={5}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Trees className="w-3 h-3" />
                    Green Spaces
                  </span>
                  <span className="text-gray-900">{zoneAllocations.green}%</span>
                </div>
                <Slider
                  value={[zoneAllocations.green]}
                  onValueChange={(value) => updateZoneAllocation("green", value[0])}
                  max={50}
                  min={5}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Simulation Results */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              AI Simulation Results
            </CardTitle>
            <CardDescription className="text-gray-600">
              {simulationRunning ? "Running AI analysis..." : "Projected outcomes for your scenario"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {simulationRunning ? (
              <div className="space-y-3">
                <div className="animate-pulse">
                  <div className="h-4 bg-purple-900/40 rounded mb-2"></div>
                  <div className="h-2 bg-purple-900/20 rounded"></div>
                </div>
                <div className="animate-pulse">
                  <div className="h-4 bg-purple-900/40 rounded mb-2"></div>
                  <div className="h-2 bg-purple-900/20 rounded"></div>
                </div>
                <div className="animate-pulse">
                  <div className="h-4 bg-purple-900/40 rounded mb-2"></div>
                  <div className="h-2 bg-purple-900/20 rounded"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Population Growth</span>
                    <span className="text-green-400">+{simulationResults.populationGrowth}%</span>
                  </div>
                  <Progress value={simulationResults.populationGrowth * 2} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Economic Growth</span>
                    <span className="text-blue-400">+{simulationResults.economicGrowth}%</span>
                  </div>
                  <Progress value={simulationResults.economicGrowth * 3} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Sustainability Score</span>
                    <span className="text-green-400">{simulationResults.sustainability}%</span>
                  </div>
                  <Progress value={simulationResults.sustainability} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Citizen Satisfaction</span>
                    <span className="text-yellow-400">{simulationResults.citizenSatisfaction}%</span>
                  </div>
                  <Progress value={simulationResults.citizenSatisfaction} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Energy Efficiency</span>
                    <span className="text-cyan-400">{simulationResults.energyEfficiency}%</span>
                  </div>
                  <Progress value={simulationResults.energyEfficiency} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Traffic Flow</span>
                    <span className="text-orange-400">{simulationResults.trafficFlow}%</span>
                  </div>
                  <Progress value={simulationResults.trafficFlow} className="h-2" />
                </div>

                <div className="pt-3 border-t border-purple-800/30">
                  <div className="text-sm">
                    <div className="text-gray-600">Infrastructure Cost</div>
                    <div className="text-gray-900 font-medium">
                      {(simulationResults.infrastructureCost / 1000000).toFixed(1)}M CITY
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preset Scenarios */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Preset Scenarios</CardTitle>
            <CardDescription className="text-gray-600">Load pre-configured city planning scenarios</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {scenarios.map((scenario, index) => (
              <Card key={index} className="bg-white border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-gray-900 font-semibold">{scenario.name}</h4>
                    <Button
                      size="sm"
                      onClick={() => loadScenario(scenario)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600"
                    >
                      Load
                    </Button>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{scenario.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Residential:</span>
                      <span className="text-gray-900">{scenario.allocations.residential}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Commercial:</span>
                      <span className="text-gray-900">{scenario.allocations.commercial}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Industrial:</span>
                      <span className="text-gray-900">{scenario.allocations.industrial}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Green:</span>
                      <span className="text-gray-900">{scenario.allocations.green}%</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-cyan-400">{scenario.expectedOutcome}</div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            AI Recommendations
          </CardTitle>
          <CardDescription className="text-gray-600">
            Smart suggestions based on your current scenario and city goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">Optimization</span>
              </div>
              <p className="text-gray-900 text-sm">
                Increase green spaces by 5% to improve air quality and citizen satisfaction scores.
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-medium">Economic</span>
              </div>
              <p className="text-gray-900 text-sm">
                Consider adding mixed-use developments to boost commercial revenue while maintaining residential needs.
              </p>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-medium">Infrastructure</span>
              </div>
              <p className="text-gray-900 text-sm">
                Smart grid implementation could reduce energy costs by 15% with current population density.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
