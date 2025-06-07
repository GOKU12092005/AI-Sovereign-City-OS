"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Vote,
  Plus,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Users,
  Coins,
  Shield,
  Eye,
  MessageSquare,
  TrendingUp,
} from "lucide-react"

interface DAOGovernanceProps {
  isConnected: boolean
}

export default function DAOGovernance({ isConnected }: DAOGovernanceProps) {
  const [showCreateProposal, setShowCreateProposal] = useState(false)
  const [newProposal, setNewProposal] = useState({
    title: "",
    description: "",
    budget: "",
    duration: "",
  })

  const proposals = [
    {
      id: 1,
      title: "Expand Solar Panel Network in Zone 3",
      description: "Install 500 additional solar panels to increase renewable energy capacity by 25%",
      proposer: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
      status: "active",
      votesFor: 8420,
      votesAgainst: 1230,
      totalVotes: 9650,
      budget: "2,500,000 CITY",
      timeLeft: "5 days",
      category: "Infrastructure",
      aiRecommendation: "Positive - High ROI expected",
    },
    {
      id: 2,
      title: "Implement ZK-Privacy for All Voting",
      description: "Upgrade governance system to use zero-knowledge proofs for complete voting privacy",
      proposer: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
      status: "active",
      votesFor: 12340,
      votesAgainst: 890,
      totalVotes: 13230,
      budget: "750,000 CITY",
      timeLeft: "12 days",
      category: "Governance",
      aiRecommendation: "Highly Recommended - Privacy Enhancement",
    },
    {
      id: 3,
      title: "Cross-Chain Bridge to Neo Tokyo",
      description: "Establish XCM bridge for resource sharing and collaboration with Neo Tokyo smart city",
      proposer: "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy",
      status: "pending",
      votesFor: 0,
      votesAgainst: 0,
      totalVotes: 0,
      budget: "1,200,000 CITY",
      timeLeft: "30 days",
      category: "Cross-Chain",
      aiRecommendation: "Under Analysis",
    },
    {
      id: 4,
      title: "AI Agent Performance Rewards Program",
      description: "Create incentive system to reward top-performing AI agents with additional computational resources",
      proposer: "5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY",
      status: "passed",
      votesFor: 15670,
      votesAgainst: 2340,
      totalVotes: 18010,
      budget: "500,000 CITY",
      timeLeft: "Completed",
      category: "AI Enhancement",
      aiRecommendation: "Implemented Successfully",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-50 border-blue-200 text-blue-700"
      case "passed":
        return "bg-green-50 border-green-200 text-green-700"
      case "rejected":
        return "bg-red-50 border-red-200 text-red-700"
      case "pending":
        return "bg-yellow-50 border-yellow-200 text-yellow-700"
      default:
        return "bg-gray-50 border-gray-200 text-gray-700"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Infrastructure":
        return "bg-orange-50 border-orange-200 text-orange-700"
      case "Governance":
        return "bg-purple-50 border-purple-200 text-purple-700"
      case "Cross-Chain":
        return "bg-cyan-50 border-cyan-200 text-cyan-700"
      case "AI Enhancement":
        return "bg-pink-50 border-pink-200 text-pink-700"
      default:
        return "bg-gray-50 border-gray-200 text-gray-700"
    }
  }

  const handleCreateProposal = () => {
    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }
    // Handle proposal creation
    console.log("Creating proposal:", newProposal)
    setShowCreateProposal(false)
    setNewProposal({ title: "", description: "", budget: "", duration: "" })
  }

  const handleVote = (proposalId: number, vote: "for" | "against") => {
    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }
    console.log(`Voting ${vote} on proposal ${proposalId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">DAO Governance</h2>
          <p className="text-gray-600">Decentralized decision making with ZK-privacy and AI assistance</p>
        </div>
        <Button
          onClick={() => setShowCreateProposal(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          disabled={!isConnected}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Proposal
        </Button>
      </div>

      {/* Governance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Vote className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">15</div>
            <div className="text-xs text-blue-600">Active Proposals</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">8,247</div>
            <div className="text-xs text-green-600">Active Voters</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <Coins className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">12.4M</div>
            <div className="text-xs text-yellow-600">CITY Staked</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">94%</div>
            <div className="text-xs text-blue-600">Participation</div>
          </CardContent>
        </Card>
      </div>

      {/* Create Proposal Modal */}
      {showCreateProposal && (
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Create New Proposal</CardTitle>
            <CardDescription className="text-gray-600">
              Submit a proposal for community voting with ZK-privacy protection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-gray-900 text-sm font-medium mb-2 block">Title</label>
              <Input
                value={newProposal.title}
                onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                placeholder="Enter proposal title"
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>
            <div>
              <label className="text-gray-900 text-sm font-medium mb-2 block">Description</label>
              <Textarea
                value={newProposal.description}
                onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                placeholder="Detailed description of your proposal"
                className="bg-white border-gray-300 text-gray-900 min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-900 text-sm font-medium mb-2 block">Budget (CITY)</label>
                <Input
                  value={newProposal.budget}
                  onChange={(e) => setNewProposal({ ...newProposal, budget: e.target.value })}
                  placeholder="0"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
              <div>
                <label className="text-gray-900 text-sm font-medium mb-2 block">Duration (days)</label>
                <Input
                  value={newProposal.duration}
                  onChange={(e) => setNewProposal({ ...newProposal, duration: e.target.value })}
                  placeholder="30"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleCreateProposal} className="bg-gradient-to-r from-purple-600 to-pink-600">
                Submit Proposal
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateProposal(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Proposals List */}
      <div className="space-y-4">
        {proposals.map((proposal) => (
          <Card key={proposal.id} className="bg-white border-gray-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-gray-900 text-lg">{proposal.title}</CardTitle>
                    <Badge className={getStatusColor(proposal.status)}>{proposal.status}</Badge>
                    <Badge className={getCategoryColor(proposal.category)}>{proposal.category}</Badge>
                  </div>
                  <CardDescription className="text-gray-600 mb-3">{proposal.description}</CardDescription>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Proposer: {proposal.proposer.slice(0, 8)}...
                    </div>
                    <div className="flex items-center gap-1">
                      <Coins className="w-4 h-4" />
                      Budget: {proposal.budget}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {proposal.timeLeft}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {proposal.status === "active" && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Voting Progress</span>
                      <span className="text-gray-900">{proposal.totalVotes.toLocaleString()} votes</span>
                    </div>
                    <div className="relative">
                      <Progress value={(proposal.votesFor / proposal.totalVotes) * 100} className="h-3" />
                      <div className="absolute inset-0 flex justify-between items-center px-2 text-xs text-gray-900 font-medium">
                        <span>For: {proposal.votesFor.toLocaleString()}</span>
                        <span>Against: {proposal.votesAgainst.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 text-sm">ZK-Privacy Enabled</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleVote(proposal.id, "for")}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={!isConnected}
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        Vote For
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVote(proposal.id, "against")}
                        className="border-red-500/30 text-red-600 hover:bg-red-50"
                        disabled={!isConnected}
                      >
                        <ThumbsDown className="w-4 h-4 mr-1" />
                        Vote Against
                      </Button>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-600 text-sm">AI Recommendation: {proposal.aiRecommendation}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-50">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Discuss
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
