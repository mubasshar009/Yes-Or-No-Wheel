"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AudioContextType {
  playSound: (soundType: "win" | "click" | "beep") => void
  isAudioEnabled: boolean
  setAudioEnabled: (enabled: boolean) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioContextProvider({ children }: { children: React.ReactNode }) {
  const [isAudioEnabled, setAudioEnabled] = useState(true)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [isUserInteracted, setIsUserInteracted] = useState(false)

  // Initialize AudioContext after user interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!isUserInteracted) {
        setIsUserInteracted(true)

        // Create AudioContext after user interaction
        try {
          const context = new (window.AudioContext || (window as any).webkitAudioContext)()
          setAudioContext(context)
        } catch (error) {
          console.error("Web Audio API is not supported in this browser", error)
        }

        // Remove event listeners after first interaction
        document.removeEventListener("click", handleInteraction)
        document.removeEventListener("touchstart", handleInteraction)
      }
    }

    document.addEventListener("click", handleInteraction)
    document.addEventListener("touchstart", handleInteraction)

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
    }
  }, [isUserInteracted])

  // Function to play a sound
  const playSound = (soundType: "win" | "click" | "beep") => {
    if (!isAudioEnabled || !audioContext) return

    try {
      // Generate sounds programmatically instead of loading files
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // Configure sound based on type
      switch (soundType) {
        case "win":
          // Celebratory sound
          oscillator.type = "sine"
          oscillator.frequency.setValueAtTime(587.33, audioContext.currentTime) // D5
          oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
          oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2) // G5
          gainNode.gain.setValueAtTime(0.5, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8)
          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 0.8)
          break

        case "click":
          // Click sound
          oscillator.type = "square"
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 0.1)
          break

        case "beep":
        default:
          // Simple beep
          oscillator.type = "sine"
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 0.3)
          break
      }
    } catch (error) {
      console.error("Error playing sound:", error)
    }
  }

  return (
    <AudioContext.Provider value={{ playSound, isAudioEnabled, setAudioEnabled }}>{children}</AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioContextProvider")
  }
  return context
}
