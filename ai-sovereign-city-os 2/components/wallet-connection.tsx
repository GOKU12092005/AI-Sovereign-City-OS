"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut, CheckCircle } from "lucide-react"

interface WalletConnectionProps {
  isConnected: boolean
  setIsConnected: (connected: boolean) => void
  currentAccount: string
  setCurrentAccount: (account: string) => void
}

export default function WalletConnection({
  isConnected,
  setIsConnected,
  currentAccount,
  setCurrentAccount,
}: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [showWalletOptions, setShowWalletOptions] = useState(false)
  const [connectionError, setConnectionError] = useState("")

  const walletOptions = [
    { name: "Talisman", icon: "🔮", description: "Polkadot native wallet" },
    { name: "SubWallet", icon: "⚡", description: "Multi-chain support" },
    { name: "Polkadot.js", icon: "🟠", description: "Official extension" },
    { name: "WalletConnect", icon: "🔗", description: "Mobile & desktop" },
    { name: "Nova Wallet", icon: "⭐", description: "Mobile first" },
    { name: "Fearless Wallet", icon: "🦁", description: "DeFi focused" },
  ]

  // Check for existing connection on component mount
  useEffect(() => {
    const savedAccount = localStorage.getItem("connectedAccount")
    const savedWallet = localStorage.getItem("connectedWallet")

    if (savedAccount && savedWallet) {
      setCurrentAccount(savedAccount)
      setIsConnected(true)
    }
  }, [setCurrentAccount, setIsConnected])

  const connectWallet = async (walletName: string) => {
    setIsConnecting(true)
    setConnectionError("")

    try {
      // Simulate wallet connection with proper error handling
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random connection success/failure for demo
          if (Math.random() > 0.1) {
            // 90% success rate
            resolve(true)
          } else {
            reject(new Error("Connection failed"))
          }
        }, 2000)
      })

      const mockAccount = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"

      // Save connection to localStorage for persistence
      localStorage.setItem("connectedAccount", mockAccount)
      localStorage.setItem("connectedWallet", walletName)

      setCurrentAccount(mockAccount)
      setIsConnected(true)
      setShowWalletOptions(false)
    } catch (error) {
      setConnectionError("Failed to connect wallet. Please try again.")
      console.error("Wallet connection error:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    // Clear localStorage
    localStorage.removeItem("connectedAccount")
    localStorage.removeItem("connectedWallet")

    setIsConnected(false)
    setCurrentAccount("")
    setConnectionError("")
  }

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(currentAccount)
      // You could add a toast notification here
    } catch (error) {
      console.error("Failed to copy address:", error)
    }
  }

  if (isConnected && currentAccount) {
    return (
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
          <CheckCircle className="w-3 h-3 mr-1" />
          Connected
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
              <Wallet className="w-4 h-4 mr-2" />
              {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border-gray-200 shadow-lg">
            <DropdownMenuItem onClick={copyAddress} className="text-gray-700 hover:bg-gray-50">
              <Copy className="w-4 h-4 mr-2" />
              Copy Address
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Explorer
            </DropdownMenuItem>
            <DropdownMenuItem onClick={disconnectWallet} className="text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setShowWalletOptions(true)}
        disabled={isConnecting}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Wallet className="w-4 h-4 mr-2" />
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>

      {showWalletOptions && (
        <Card className="absolute top-12 right-0 w-80 bg-white border-gray-200 shadow-xl z-50">
          <CardContent className="p-4">
            <h3 className="text-gray-900 font-semibold mb-4">Choose Wallet</h3>

            {connectionError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm">{connectionError}</p>
              </div>
            )}

            <div className="space-y-2">
              {walletOptions.map((wallet) => (
                <Button
                  key={wallet.name}
                  variant="ghost"
                  className="w-full justify-start text-left hover:bg-gray-50 text-gray-700"
                  onClick={() => connectWallet(wallet.name)}
                  disabled={isConnecting}
                >
                  <span className="text-xl mr-3">{wallet.icon}</span>
                  <div>
                    <div className="font-medium">{wallet.name}</div>
                    <div className="text-sm text-gray-500">{wallet.description}</div>
                  </div>
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 text-gray-500 hover:bg-gray-50"
              onClick={() => {
                setShowWalletOptions(false)
                setConnectionError("")
              }}
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
