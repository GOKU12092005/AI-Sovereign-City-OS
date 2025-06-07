"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Star, Trophy, Crown, Users, Vote, Coins, TrendingUp, Target, Zap, Heart } from "lucide-react"

interface CitizenReputationProps {
  isConnected: boolean
}

export default function CitizenReputation({ isConnected }: CitizenReputationProps) {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null)

  const userProfile = {
    address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    reputationScore: 847,
    level: "Gold Citizen",
    rank: 234,
    totalCitizens: 12847,
    joinDate: "2024-01-15",
    votingPower: 1.8,
    contributionScore: 92,
  }

  const badges = [
    {
      id: "governance-champion",
      name: "Governance Champion",
      description: "Participated in 50+ governance votes",
      icon: Vote,
      rarity: "Epic",
      earned: true,
      progress: 100,
      rewards: "500 CITY + 2x Voting Power",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "eco-warrior",
      name: "Eco Warrior",
      description: "Reduced carbon footprint by 30%",
      icon: Heart,
      rarity: "Rare",
      earned: true,
      progress: 100,
      rewards: "300 CITY + Green Zone Access",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "ai-collaborator",
      name: "AI Collaborator",
      description: "Provided 1000+ data points to AI agents",
      icon: Zap,
      rarity: "Uncommon",
      earned: true,
      progress: 100,
      rewards: "200 CITY + AI Insights Access",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "community-builder",
      name: "Community Builder",
      description: "Referred 25+ new citizens",
      icon: Users,
      rarity: "Rare",
      earned: false,
      progress: 68,
      rewards: "400 CITY + Community Leader Badge",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "innovation-pioneer",
      name: "Innovation Pioneer",
      description: "Submitted 10 approved proposals",
      icon: Target,
      rarity: "Epic",
      earned: false,
      progress: 30,
      rewards: "750 CITY + Innovation Council Access",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "cross-chain-ambassador",
      name: "Cross-Chain Ambassador",
      description: "Facilitated 5 cross-city collaborations",
      icon: Crown,
      rarity: "Legendary",
      earned: false,
      progress: 20,
      rewards: "1000 CITY + Ambassador Status",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  const leaderboard = [
    { rank: 1, address: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty", score: 1247, level: "Platinum" },
    { rank: 2, address: "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy", score: 1156, level: "Platinum" },
    { rank: 3, address: "5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY", score: 1089, level: "Gold" },
    { rank: 234, address: userProfile.address, score: userProfile.reputationScore, level: userProfile.level },
  ]

  const activities = [
    { type: "vote", description: "Voted on Solar Panel Expansion", points: "+25", time: "2 hours ago" },
    { type: "proposal", description: "Submitted Traffic Optimization Proposal", points: "+100", time: "1 day ago" },
    { type: "ai-feedback", description: "Provided feedback to GridMaster AI", points: "+10", time: "2 days ago" },
    { type: "community", description: "Helped onboard new citizen", points: "+50", time: "3 days ago" },
    { type: "service", description: "Used eco-friendly transport", points: "+5", time: "5 days ago" },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-900/20 border-gray-500/30 text-gray-400"
      case "Uncommon":
        return "bg-green-900/20 border-green-500/30 text-green-400"
      case "Rare":
        return "bg-blue-900/20 border-blue-500/30 text-blue-400"
      case "Epic":
        return "bg-purple-900/20 border-purple-500/30 text-purple-400"
      case "Legendary":
        return "bg-yellow-900/20 border-yellow-500/30 text-yellow-400"
      default:
        return "bg-gray-900/20 border-gray-500/30 text-gray-400"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Bronze":
        return "text-orange-400"
      case "Silver":
        return "text-gray-400"
      case "Gold":
        return "text-yellow-400"
      case "Platinum":
        return "text-cyan-400"
      case "Diamond":
        return "text-purple-400"
      default:
        return "text-gray-400"
    }
  }

  const claimBadge = (badgeId: string) => {
    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }
    console.log(`Claiming badge: ${badgeId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Citizen Reputation</h2>
          <p className="text-gray-600">Soulbound NFTs and gamified engagement system</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Award className="w-4 h-4 mr-2" />
          View Profile NFT
        </Button>
      </div>

      {/* User Profile Card */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-gray-900 text-xl">{userProfile.level}</CardTitle>
                <CardDescription className="text-gray-600">
                  {userProfile.address.slice(0, 8)}...{userProfile.address.slice(-6)}
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{userProfile.reputationScore}</div>
              <div className="text-gray-600 text-sm">Reputation Score</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">#{userProfile.rank}</div>
              <div className="text-gray-600 text-sm">Global Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{userProfile.votingPower}x</div>
              <div className="text-gray-600 text-sm">Voting Power</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{userProfile.contributionScore}%</div>
              <div className="text-gray-600 text-sm">Contribution</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {Math.floor((Date.now() - new Date(userProfile.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="text-gray-600 text-sm">Days Active</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="badges" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 border-gray-200">
          <TabsTrigger value="badges" className="data-[state=active]:bg-blue-600">
            Badges & NFTs
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-blue-600">
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="activities" className="data-[state=active]:bg-blue-600">
            Activities
          </TabsTrigger>
          <TabsTrigger value="rewards" className="data-[state=active]:bg-blue-600">
            Rewards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => {
              const IconComponent = badge.icon
              return (
                <Card
                  key={badge.id}
                  className={`bg-white border-gray-200 hover:bg-gray-50 transition-all cursor-pointer ${
                    selectedBadge === badge.id ? "ring-2 ring-blue-500" : ""
                  } ${!badge.earned ? "opacity-75" : ""}`}
                  onClick={() => setSelectedBadge(selectedBadge === badge.id ? null : badge.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${badge.color} flex items-center justify-center ${
                          !badge.earned ? "grayscale" : ""
                        }`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge className={getRarityColor(badge.rarity)}>{badge.rarity}</Badge>
                    </div>
                    <CardTitle className="text-gray-900 text-lg">{badge.name}</CardTitle>
                    <CardDescription className="text-gray-600 text-sm">{badge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!badge.earned && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-gray-900">{badge.progress}%</span>
                        </div>
                        <Progress value={badge.progress} className="h-2" />
                      </div>
                    )}

                    <div className="text-sm">
                      <div className="text-gray-600 mb-1">Rewards</div>
                      <div className="text-gray-900 font-medium">{badge.rewards}</div>
                    </div>

                    {badge.earned && (
                      <Badge className="w-full justify-center bg-green-900/20 border-green-500/30 text-green-400">
                        <Trophy className="w-3 h-3 mr-1" />
                        Earned
                      </Badge>
                    )}

                    {!badge.earned && badge.progress === 100 && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          claimBadge(badge.id)
                        }}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                        disabled={!isConnected}
                      >
                        <Award className="w-4 h-4 mr-2" />
                        Claim Badge
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Global Reputation Leaderboard</CardTitle>
              <CardDescription className="text-gray-600">Top citizens by reputation score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((citizen, index) => (
                  <div
                    key={citizen.rank}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      citizen.address === userProfile.address
                        ? "bg-purple-900/40 border border-purple-500/30"
                        : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {citizen.rank <= 3 && (
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              citizen.rank === 1
                                ? "bg-yellow-500"
                                : citizen.rank === 2
                                  ? "bg-gray-400"
                                  : "bg-orange-500"
                            }`}
                          >
                            <Crown className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className="text-gray-900 font-bold text-lg">#{citizen.rank}</div>
                      </div>
                      <div>
                        <div className="text-gray-900 font-medium">
                          {citizen.address.slice(0, 8)}...{citizen.address.slice(-6)}
                          {citizen.address === userProfile.address && (
                            <Badge className="ml-2 bg-purple-900/20 border-purple-500/30 text-purple-400">You</Badge>
                          )}
                        </div>
                        <div className={`text-sm ${getLevelColor(citizen.level)}`}>{citizen.level} Citizen</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-900 font-bold text-lg">{citizen.score}</div>
                      <div className="text-gray-600 text-sm">Reputation</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Recent Activities</CardTitle>
              <CardDescription className="text-gray-600">Your contribution history and earned points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === "vote"
                            ? "bg-blue-400"
                            : activity.type === "proposal"
                              ? "bg-purple-400"
                              : activity.type === "ai-feedback"
                                ? "bg-cyan-400"
                                : activity.type === "community"
                                  ? "bg-green-400"
                                  : "bg-yellow-400"
                        }`}
                      ></div>
                      <div>
                        <div className="text-gray-900 text-sm">{activity.description}</div>
                        <div className="text-gray-600 text-xs">{activity.time}</div>
                      </div>
                    </div>
                    <div className="text-green-400 font-medium">{activity.points}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  Token Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Month</span>
                    <span className="text-yellow-400 font-medium">+1,247 CITY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">All Time</span>
                    <span className="text-yellow-400 font-medium">+8,934 CITY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Reward</span>
                    <span className="text-green-400 font-medium">+125 CITY</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-400" />
                  Special Perks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-900 text-sm">2x Voting Power</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-900 text-sm">AI Insights Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-900 text-sm">Green Zone Priority</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Next Level</span>
                      <span className="text-gray-900">73%</span>
                    </div>
                    <Progress value={73} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-600">
                    153 points to <span className="text-cyan-400 font-medium">Platinum Citizen</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
