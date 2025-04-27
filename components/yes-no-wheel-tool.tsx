"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Wheel } from "@/components/wheel"
import { Scoreboard } from "@/components/scoreboard"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAudio } from "@/components/audio-context-provider"

export function YesNoWheelTool() {
  const [question, setQuestion] = useState("Should I do it?")
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [spinDuration, setSpinDuration] = useState(3)
  const [history, setHistory] = useState<{ question: string; answer: string; timestamp: number }[]>([])
  const [yesCount, setYesCount] = useState(0)
  const [noCount, setNoCount] = useState(0)
  const { playSound } = useAudio()
  const wheelContainerRef = useRef<HTMLDivElement>(null)
  const [wheelSize, setWheelSize] = useState({ width: 500, height: 500 })
  const [isClient, setIsClient] = useState(false)
  const spinCountRef = useRef(0)
  const wheelResultRef = useRef<string | null>(null)

  // Yes/No wheel sections
  const sections = [
    { id: "1", text: "Yes", color: "#4ade80" },
    { id: "2", text: "No", color: "#f87171" },
  ]

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load history and counts from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("yesNoHistory")
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory)
        setHistory(parsedHistory)

        // Calculate counts from history
        const yes = parsedHistory.filter((item: any) => item.answer === "Yes").length
        const no = parsedHistory.filter((item: any) => item.answer === "No").length
        setYesCount(yes)
        setNoCount(no)
      } catch (e) {
        console.error("Failed to parse history:", e)
      }
    }
  }, [])

  // Set wheel size based on screen size
  useEffect(() => {
    const updateWheelSize = () => {
      if (wheelContainerRef.current) {
        const isMobile = window.innerWidth < 768
        const size = isMobile ? 320 : 500
        setWheelSize({ width: size, height: size })
      }
    }

    // Initial size update
    updateWheelSize()

    // Update on resize
    window.addEventListener("resize", updateWheelSize)
    return () => window.removeEventListener("resize", updateWheelSize)
  }, [isClient])

  // Handle wheel result callback
  const handleWheelResult = (result: string) => {
    wheelResultRef.current = result
    console.log(`Wheel visually stopped at: ${result}`)
  }

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setWinner(null)
    wheelResultRef.current = null

    // Increment spin count for debugging
    spinCountRef.current += 1
    console.log(`Spin #${spinCountRef.current} started`)

    // After spin duration, show the winner
    setTimeout(() => {
      try {
        // Use the actual wheel result from the visual wheel
        const answer = wheelResultRef.current || "Yes" // Fallback to Yes if somehow undefined
        console.log(`Spin #${spinCountRef.current} final result: ${answer}`)

        setWinner(answer)
        setIsSpinning(false)

        // Update counts based on the actual wheel result
        if (answer === "Yes") {
          console.log(`Spin #${spinCountRef.current}: Incrementing Yes count`)
          setYesCount((prev) => prev + 1)
        } else {
          console.log(`Spin #${spinCountRef.current}: Incrementing No count`)
          setNoCount((prev) => prev + 1)
        }

        // Add to history
        const newHistory = [
          { question, answer, timestamp: Date.now() },
          ...history.slice(0, 19), // Keep only last 20 entries
        ]

        setHistory(newHistory)

        // Save to localStorage
        localStorage.setItem("yesNoHistory", JSON.stringify(newHistory))

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
      } catch (error) {
        console.error("Error in spin result handling:", error)
      }
    }, spinDuration * 1000)
  }

  // Function to reset both counts and history
  const handleReset = () => {
    setYesCount(0)
    setNoCount(0)
    setHistory([])
    localStorage.removeItem("yesNoHistory")
  }

  return (
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

        <div
          ref={wheelContainerRef}
          className="relative mx-auto"
          style={{
            width: `${wheelSize.width}px`,
            height: `${wheelSize.height}px`,
            maxWidth: "100%",
            aspectRatio: "1/1",
          }}
        >
          {isClient && (
            <Wheel
              sections={sections}
              isSpinning={isSpinning}
              spinDuration={spinDuration}
              onResult={handleWheelResult}
            />
          )}
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
        <Scoreboard showReset={true} yesCount={yesCount} noCount={noCount} onReset={handleReset} />

        <Tabs defaultValue="history">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="how-to">How to Use</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
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

          <TabsContent value="how-to">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6 space-y-4">
                <p>
                  <strong>1.</strong> Type your yes/no question in the input field
                </p>
                <p>
                  <strong>2.</strong> Click the "Spin the Wheel" button
                </p>
                <p>
                  <strong>3.</strong> Wait for the wheel to stop spinning
                </p>
                <p>
                  <strong>4.</strong> Get your answer and make your decision!
                </p>
                <p className="text-sm text-gray-400 mt-4">
                  The wheel gives a perfect 50/50 chance for Yes or No, making it completely fair and random.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
