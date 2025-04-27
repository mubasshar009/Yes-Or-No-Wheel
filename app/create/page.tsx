"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Plus, Save, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Wheel } from "@/components/wheel"
import { WheelSection } from "@/components/wheel-section"
import { generateRandomColor } from "@/lib/utils"
import { Scoreboard } from "@/components/scoreboard"
import { useAudio } from "@/components/audio-context-provider"

export default function CreateWheel() {
  const router = useRouter()
  const [wheelName, setWheelName] = useState("My Wheel")
  const [sections, setSections] = useState([
    { id: "1", text: "Option 1", color: "#FF5733" },
    { id: "2", text: "Option 2", color: "#33FF57" },
    { id: "3", text: "Option 3", color: "#3357FF" },
    { id: "4", text: "Option 4", color: "#F3FF33" },
  ])
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinDuration, setSpinDuration] = useState(5)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showConfetti, setShowConfetti] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)
  const { playSound, isAudioEnabled, setAudioEnabled } = useAudio()

  // Check for template data on load
  useEffect(() => {
    const templateData = localStorage.getItem("currentTemplate")
    if (templateData) {
      try {
        const template = JSON.parse(templateData)
        setWheelName(template.name)
        setSections(template.sections)
        // Clear the template data after loading
        localStorage.removeItem("currentTemplate")
      } catch (e) {
        console.error("Failed to parse template data:", e)
      }
    }
  }, [])

  const addSection = () => {
    const newId = (sections.length + 1).toString()
    setSections([...sections, { id: newId, text: `Option ${newId}`, color: generateRandomColor() }])
  }

  const updateSection = (id: string, text: string, color: string) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, text, color } : section)))
  }

  const removeSection = (id: string) => {
    if (sections.length <= 2) {
      toast({
        title: "Cannot remove section",
        description: "A wheel must have at least 2 sections.",
        variant: "destructive",
      })
      return
    }
    setSections(sections.filter((section) => section.id !== id))
  }

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setWinner(null)

    // After spin duration, show the winner
    setTimeout(() => {
      const winnerIndex = Math.floor(Math.random() * sections.length)
      const winnerText = sections[winnerIndex].text
      setWinner(winnerText)
      setIsSpinning(false)

      if (showConfetti) {
        // Trigger confetti effect
        import("canvas-confetti").then((confetti) => {
          confetti.default({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
        })
      }

      if (soundEnabled) {
        // Play winning sound using our audio context provider
        playSound("win")
      }
    }, spinDuration * 1000)
  }

  const saveWheel = () => {
    // Save wheel to local storage
    const wheel = { name: wheelName, sections, id: Date.now().toString() }
    const savedWheels = JSON.parse(localStorage.getItem("savedWheels") || "[]")
    localStorage.setItem("savedWheels", JSON.stringify([...savedWheels, wheel]))

    toast({
      title: "Wheel saved",
      description: "Your wheel has been saved successfully.",
    })

    // Play click sound
    if (soundEnabled) {
      playSound("click")
    }
  }

  // Update the audio context when sound is toggled
  const handleSoundToggle = (enabled: boolean) => {
    setSoundEnabled(enabled)
    setAudioEnabled(enabled)
  }

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
          <h1 className="text-2xl font-bold ml-4">Create Your Wheel</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          <div className="flex flex-col items-center justify-center bg-zinc-900 rounded-xl p-6">
            <div className="mb-4">
              <Input
                className="text-center text-xl font-bold bg-transparent border-none text-white"
                value={wheelName}
                onChange={(e) => setWheelName(e.target.value)}
              />
            </div>

            <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
              <Wheel sections={sections} isSpinning={isSpinning} spinDuration={spinDuration} />
            </div>

            {winner && !isSpinning && (
              <div className="mt-6 text-center">
                <h2 className="text-xl font-bold">Winner:</h2>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  {winner}
                </p>
              </div>
            )}

            {/* Show scoreboard for Yes/No wheels */}
            {sections.length === 2 &&
              sections.some((s) => s.text.toLowerCase() === "yes") &&
              sections.some((s) => s.text.toLowerCase() === "no") && (
                <div className="mt-6 w-full max-w-md">
                  <Scoreboard />
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

          <div className="bg-zinc-900 rounded-xl p-6">
            <Tabs defaultValue="sections">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="sections">Sections</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="sections" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Wheel Sections</h2>
                  <Button onClick={addSection} size="sm" variant="outline" className="border-white/20 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {sections.map((section) => (
                    <WheelSection
                      key={section.id}
                      section={section}
                      onUpdate={updateSection}
                      onRemove={removeSection}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="spinDuration">Spin Duration (seconds)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="spinDuration"
                        min={1}
                        max={10}
                        step={0.5}
                        value={[spinDuration]}
                        onValueChange={(value) => setSpinDuration(value[0])}
                        className="flex-1"
                      />
                      <span className="w-12 text-center">{spinDuration}s</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="soundEnabled">Sound Effects</Label>
                    <div className="flex items-center gap-2">
                      {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      <Switch id="soundEnabled" checked={soundEnabled} onCheckedChange={handleSoundToggle} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="showConfetti">Confetti Effect</Label>
                    <Switch id="showConfetti" checked={showConfetti} onCheckedChange={setShowConfetti} />
                  </div>

                  <Button className="w-full mt-6" variant="outline" onClick={saveWheel}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Wheel
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
