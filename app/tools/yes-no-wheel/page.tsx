"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Wheel } from "@/components/wheel"
import { Scoreboard } from "@/components/scoreboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAudio } from "@/components/audio-context-provider"

export default function YesNoWheel() {
  const [question, setQuestion] = useState("Should I do it?")
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [spinDuration, setSpinDuration] = useState(3)
  const [history, setHistory] = useState<{ question: string; answer: string; timestamp: number }[]>([])
  const { playSound } = useAudio()

  // Yes/No wheel sections
  const sections = [
    { id: "1", text: "Yes", color: "#4ade80" },
    { id: "2", text: "No", color: "#f87171" },
  ]

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setWinner(null)

    // After spin duration, show the winner
    setTimeout(() => {
      const winnerIndex = Math.floor(Math.random() * sections.length)
      const answer = sections[winnerIndex].text
      setWinner(answer)
      setIsSpinning(false)

      // Add to history
      setHistory((prev) => [
        { question, answer, timestamp: Date.now() },
        ...prev.slice(0, 19), // Keep only last 20 entries
      ])

      // Trigger confetti effect
      import("canvas-confetti").then((confetti) => {
        confetti.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      })

      // Play sound using our audio context provider
      playSound("win")
    }, spinDuration * 1000)
  }

  // Save history to localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("yesNoHistory", JSON.stringify(history))
    }
  }, [history])

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("yesNoHistory")
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error("Failed to parse history:", e)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-white">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold ml-4">Yes or No Wheel</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          <div className="flex flex-col items-center justify-center bg-zinc-900 rounded-xl p-6">
            <div className="mb-6 w-full max-w-md">
              <Label htmlFor="question" className="text-lg mb-2 block">
                Your Question:
              </Label>
              <Input
                id="question"
                className="text-center text-xl font-bold bg-zinc-800 border-zinc-700 text-white"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here..."
              />
            </div>

            <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
              <Wheel sections={sections} isSpinning={isSpinning} spinDuration={spinDuration} />
            </div>

            {winner && !isSpinning && (
              <div className="mt-6 text-center">
                <h2 className="text-xl font-bold">Answer:</h2>
                <p className={`text-3xl font-bold ${winner === "Yes" ? "text-green-400" : "text-red-400"}`}>{winner}</p>
              </div>
            )}

            <Button
              className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg"
              onClick={handleSpin}
              disabled={isSpinning}
            >
              {isSpinning ? "Spinning..." : "Spin the Wheel"}
            </Button>
          </div>

          <div className="space-y-6">
            <Scoreboard />

            <Tabs defaultValue="history">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>

              <TabsContent value="history">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white">Decision History</CardTitle>
                    <CardDescription>Your past questions and answers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {history.length === 0 ? (
                      <p className="text-gray-400 text-center py-4">No history yet. Spin the wheel!</p>
                    ) : (
                      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                        {history.map((item, index) => (
                          <div key={index} className="border border-zinc-800 rounded-lg p-3">
                            <p className="text-sm text-gray-400">{new Date(item.timestamp).toLocaleString()}</p>
                            <p className="font-medium">{item.question}</p>
                            <p className={`font-bold ${item.answer === "Yes" ? "text-green-400" : "text-red-400"}`}>
                              {item.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="about">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-white">About Yes/No Wheel</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      The Yes/No Wheel is a simple but powerful decision-making tool. When you're stuck between two
                      choices, let the wheel decide for you!
                    </p>
                    <p>
                      Simply type your question, spin the wheel, and get your answer. The wheel is completely random,
                      giving you a 50/50 chance for either outcome.
                    </p>
                    <p>
                      Use the scoreboard to keep track of your Yes and No results over time. Your question history is
                      saved locally on your device.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
