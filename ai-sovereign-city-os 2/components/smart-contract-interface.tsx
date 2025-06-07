"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, CheckCircle, AlertTriangle, Coins, Vote, Copy, ExternalLink, Activity } from "lucide-react"

interface SmartContractInterfaceProps {
  isConnected: boolean
  currentAccount: string
}

export default function SmartContractInterface({ isConnected, currentAccount }: SmartContractInterfaceProps) {
  const [contractCalls, setContractCalls] = useState<any[]>([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [selectedContract, setSelectedContract] = useState("governance")
  const [proposalTitle, setProposalTitle] = useState("")
  const [proposalDescription, setProposalDescription] = useState("")
  const [voteAmount, setVoteAmount] = useState("")
  const [stakeAmount, setStakeAmount] = useState("")

  const contracts = {
    governance: {
      name: "City Governance",
      address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
      abi: "ink! Smart Contract",
      functions: ["createProposal", "vote", "executeProposal", "getCitizenProfile"],
      description: "Decentralized governance with ZK-privacy voting",
    },
    aiRegistry: {
      name: "AI Agent Registry",
      address: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
      abi: "ink! Smart Contract",
      functions: ["registerAgent", "recordDecision", "updatePerformance", "getAgent"],
      description: "AI agent management and performance tracking",
    },
    emergency: {
      name: "Emergency DAO",
      address: "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy",
      abi: "ink! Smart Contract",
      functions: ["reportEmergency", "contributeFund", "votePayout", "executePayout"],
      description: "Emergency response and disaster recovery fund",
    },
    tokenEconomy: {
      name: "Token Economy",
      address: "5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY",
      abi: "Asset Hub Integration",
      functions: ["transfer", "stake", "unstake", "claimRewards"],
      description: "CITY token management on Polkadot Asset Hub",
    },
  }

  // Simulate contract execution
  const executeContract = async (contractName: string, functionName: string, params: any) => {
    if (!isConnected) {
      alert("Please connect your wallet first!")
      return
    }

    setIsExecuting(true)

    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newCall = {
        id: Date.now(),
        contract: contractName,
        function: functionName,
        params: params,
        txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        status: Math.random() > 0.1 ? "success" : "failed",
        gasUsed: Math.floor(Math.random() * 1000000) + 100000,
        timestamp: new Date().toLocaleTimeString(),
        blockNumber: Math.floor(Math.random() * 1000000) + 5000000,
      }

      setContractCalls((prev) => [newCall, ...prev.slice(0, 9)]) // Keep last 10 calls

      // Reset form fields
      setProposalTitle("")
      setProposalDescription("")
      setVoteAmount("")
      setStakeAmount("")
    } catch (error) {
      console.error("Contract execution failed:", error)
    } finally {
      setIsExecuting(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Smart Contract Interface</h2>
          <p className="text-gray-600">Interact with ink! smart contracts on Polkadot</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className={isConnected ? "border-green-200 text-green-700" : "border-red-200 text-red-700"}
          >
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
          {isConnected && (
            <Badge variant="outline" className="border-blue-200 text-blue-700">
              {currentAccount.slice(0, 8)}...
            </Badge>
          )}
        </div>
      </div>

      <Tabs value={selectedContract} onValueChange={setSelectedContract} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200">
          <TabsTrigger value="governance" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Governance
          </TabsTrigger>
          <TabsTrigger value="aiRegistry" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            AI Registry
          </TabsTrigger>
          <TabsTrigger value="emergency" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Emergency DAO
          </TabsTrigger>
          <TabsTrigger value="tokenEconomy" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Token Economy
          </TabsTrigger>
        </TabsList>

        {/* Governance Contract */}
        <TabsContent value="governance" className="space-y-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Vote className="w-5 h-5 text-blue-600" />
                City Governance Contract
              </CardTitle>
              <CardDescription>Create proposals, vote, and manage city governance</CardDescription>
              <div className="flex items-center gap-2 text-sm">
                <Code className="w-4 h-4 text-gray-500" />
                <span className="font-mono text-gray-600">{contracts.governance.address}</span>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(contracts.governance.address)}>
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Create Proposal</h4>
                  <Input
                    placeholder="Proposal title"
                    value={proposalTitle}
                    onChange={(e) => setProposalTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="Proposal description"
                    value={proposalDescription}
                    onChange={(e) => setProposalDescription(e.target.value)}
                    rows={3}
                  />
                  <Button
                    onClick={() =>
                      executeContract("governance", "createProposal", {
                        title: proposalTitle,
                        description: proposalDescription,
                      })
                    }
                    disabled={!isConnected || isExecuting || !proposalTitle}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isExecuting ? "Creating..." : "Create Proposal"}
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Vote on Proposal</h4>
                  <Input placeholder="Proposal ID" type="number" />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => executeContract("governance", "vote", { proposalId: 1, vote: true })}
                      disabled={!isConnected || isExecuting}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Vote For
                    </Button>
                    <Button
                      onClick={() => executeContract("governance", "vote", { proposalId: 1, vote: false })}
                      disabled={!isConnected || isExecuting}
                      variant="outline"
                      className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                    >
                      Vote Against
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Registry Contract */}
        <TabsContent value="aiRegistry" className="space-y-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                AI Agent Registry Contract
              </CardTitle>
              <CardDescription>Register AI agents and track their performance</CardDescription>
              <div className="flex items-center gap-2 text-sm">
                <Code className="w-4 h-4 text-gray-500" />
                <span className="font-mono text-gray-600">{contracts.aiRegistry.address}</span>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(contracts.aiRegistry.address)}>
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Register AI Agent</h4>
                  <Input placeholder="Agent name" />
                  <Input placeholder="Zone assignment" />
                  <Input placeholder="Specialization" />
                  <Button
                    onClick={() =>
                      executeContract("aiRegistry", "registerAgent", {
                        name: "GridMaster AI",
                        zone: "Energy Grid",
                        specialization: "Energy Optimization",
                      })
                    }
                    disabled={!isConnected || isExecuting}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {isExecuting ? "Registering..." : "Register Agent"}
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Update Performance</h4>
                  <Input placeholder="Agent ID" type="number" />
                  <Input placeholder="Energy saved (kWh)" type="number" />
                  <Input placeholder="Cost reduction ($)" type="number" />
                  <Button
                    onClick={() =>
                      executeContract("aiRegistry", "updatePerformance", {
                        agentId: 1,
                        energySaved: 1000,
                        costReduction: 5000,
                      })
                    }
                    disabled={!isConnected || isExecuting}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Update Performance
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Emergency DAO Contract */}
        <TabsContent value="emergency" className="space-y-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Emergency DAO Contract
              </CardTitle>
              <CardDescription>Report emergencies and manage disaster recovery fund</CardDescription>
              <div className="flex items-center gap-2 text-sm">
                <Code className="w-4 h-4 text-gray-500" />
                <span className="font-mono text-gray-600">{contracts.emergency.address}</span>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(contracts.emergency.address)}>
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Report Emergency</h4>
                  <select className="w-full p-2 border border-gray-200 rounded-md">
                    <option>Fire</option>
                    <option>Flood</option>
                    <option>Power Outage</option>
                    <option>Medical Emergency</option>
                  </select>
                  <Input placeholder="Location" />
                  <Textarea placeholder="Description" rows={2} />
                  <Button
                    onClick={() =>
                      executeContract("emergency", "reportEmergency", {
                        type: "Fire",
                        location: "Zone 3",
                        description: "Building fire detected",
                      })
                    }
                    disabled={!isConnected || isExecuting}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Report Emergency
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Contribute to Fund</h4>
                  <Input
                    placeholder="Amount (CITY tokens)"
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                  />
                  <div className="text-sm text-gray-600">Current fund balance: 2.45M CITY</div>
                  <Button
                    onClick={() =>
                      executeContract("emergency", "contributeFund", {
                        amount: stakeAmount,
                      })
                    }
                    disabled={!isConnected || isExecuting || !stakeAmount}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Contribute to Fund
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Token Economy Contract */}
        <TabsContent value="tokenEconomy" className="space-y-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-600" />
                Token Economy Contract
              </CardTitle>
              <CardDescription>Manage CITY tokens on Polkadot Asset Hub</CardDescription>
              <div className="flex items-center gap-2 text-sm">
                <Code className="w-4 h-4 text-gray-500" />
                <span className="font-mono text-gray-600">{contracts.tokenEconomy.address}</span>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(contracts.tokenEconomy.address)}>
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Stake Tokens</h4>
                  <Input
                    placeholder="Amount to stake"
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                  />
                  <div className="text-sm text-gray-600">Current APR: 12.5% • Your balance: 12,847 CITY</div>
                  <Button
                    onClick={() =>
                      executeContract("tokenEconomy", "stake", {
                        amount: stakeAmount,
                      })
                    }
                    disabled={!isConnected || isExecuting || !stakeAmount}
                    className="w-full bg-yellow-600 hover:bg-yellow-700"
                  >
                    Stake Tokens
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Transfer Tokens</h4>
                  <Input placeholder="Recipient address" />
                  <Input placeholder="Amount" type="number" />
                  <div className="text-sm text-gray-600">Transfer fee: 0.1 CITY</div>
                  <Button
                    onClick={() =>
                      executeContract("tokenEconomy", "transfer", {
                        to: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
                        amount: 100,
                      })
                    }
                    disabled={!isConnected || isExecuting}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Transfer Tokens
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction History */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Recent Contract Calls</CardTitle>
          <CardDescription>Transaction history and execution results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contractCalls.map((call) => (
              <div key={call.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${call.status === "success" ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {call.contract}.{call.function}()
                    </div>
                    <div className="text-sm text-gray-600">
                      Gas: {call.gasUsed.toLocaleString()} • Block: {call.blockNumber.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      call.status === "success"
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-red-50 border-red-200 text-red-700"
                    }
                  >
                    {call.status === "success" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertTriangle className="w-3 h-3 mr-1" />
                    )}
                    {call.status}
                  </Badge>
                  <span className="text-sm text-gray-500">{call.timestamp}</span>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(call.txHash)}>
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
            {contractCalls.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No contract calls yet. Connect your wallet and start interacting!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
