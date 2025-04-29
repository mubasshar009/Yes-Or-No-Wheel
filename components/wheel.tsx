"use client"

import { useRef, useEffect, useState } from "react"

interface WheelProps {
  sections: {
    id: string
    text: string
    color: string
  }[]
  isSpinning: boolean
  spinDuration: number
  onResult?: (result: string) => void
}

export function Wheel({ sections, isSpinning, spinDuration, onResult }: WheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const startTimeRef = useRef<number>(0)
  const rotationRef = useRef<number>(0)
  const targetRotationRef = useRef<number>(0)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const resultReportedRef = useRef(false)
  const hasSpunRef = useRef(false)
  const previousSpinningState = useRef(false)
  const spinCountRef = useRef(0)
  const [isInitialized, setIsInitialized] = useState(false)

  // For debugging
  const [debugInfo, setDebugInfo] = useState<any>(null)

  // Draw the wheel on the canvas
  const drawWheel = (rotation: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 10

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw wheel sections
    const sectionAngle = (2 * Math.PI) / sections.length

    sections.forEach((section, index) => {
      const startAngle = index * sectionAngle + rotation
      const endAngle = (index + 1) * sectionAngle + rotation

      // Draw section
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = section.color
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(startAngle + sectionAngle / 2)
      ctx.textAlign = "right"
      ctx.fillStyle = "#ffffff"

      // Scale font size based on text length
      const fontSize = Math.min(18, 240 / Math.max(section.text.length, 5))
      ctx.font = `bold ${fontSize}px Arial`

      // Add text shadow for better readability
      ctx.shadowColor = "rgba(0, 0, 0, 0.7)"
      ctx.shadowBlur = 3
      ctx.fillText(section.text, radius - 25, 6)
      ctx.restore()
    })

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI)
    ctx.fillStyle = "#ffffff"
    ctx.fill()

    // Draw pointer
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - radius - 10)
    ctx.lineTo(centerX - 10, centerY - radius + 10)
    ctx.lineTo(centerX + 10, centerY - radius + 10)
    ctx.closePath()
    ctx.fillStyle = "#ffffff"
    ctx.fill()
  }

  // Determine which section is at the pointer position
  const getWinningSection = (rotation: number) => {
    // The pointer is at the top (270 degrees or -90 degrees or -π/2 radians)
    const pointerAngle = -Math.PI / 2

    // Normalize the rotation to be between 0 and 2π
    const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)

    // Calculate the actual angle to check (considering the rotation)
    const actualAngle = (pointerAngle - normalizedRotation + 2 * Math.PI) % (2 * Math.PI)

    // Find which section contains this angle
    const sectionAngle = (2 * Math.PI) / sections.length
    let sectionIndex = Math.floor(actualAngle / sectionAngle)

    // Safety check to ensure we have a valid index
    if (sectionIndex < 0) {
      console.warn(`Correcting invalid section index: ${sectionIndex}`)
      sectionIndex = 0
    } else if (sectionIndex >= sections.length) {
      console.warn(`Correcting invalid section index: ${sectionIndex}`)
      sectionIndex = sections.length - 1
    }

    return {
      index: sectionIndex,
      text: sections[sectionIndex].text,
    }
  }

  // Animation loop
  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp
    }

    const elapsed = timestamp - startTimeRef.current
    const progress = Math.min(elapsed / (spinDuration * 1000), 1)

    // Easing function for smooth deceleration
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    if (isSpinning) {
      // Calculate rotation based on progress
      rotationRef.current = targetRotationRef.current * easeOutCubic(progress)

      // Draw the wheel with the current rotation
      drawWheel(rotationRef.current)

      // Continue animation if not complete
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }
  }

  // Function to update canvas size
  const updateCanvasSize = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Get the parent container's dimensions
    const parent = canvas.parentElement
    if (!parent) return

    const parentWidth = parent.clientWidth
    const parentHeight = parent.clientHeight

    // Set canvas dimensions to match parent (maintaining 1:1 aspect ratio)
    const size = Math.min(parentWidth, parentHeight)

    // Set the actual canvas dimensions, accounting for device pixel ratio
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr

    // Set the display size
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`

    // Initial draw
    drawWheel(rotationRef.current)
  }

  // Initialize the wheel
  useEffect(() => {
    // Initial size update
    updateCanvasSize()

    // Set up resize observer to handle container size changes
    if (!resizeObserverRef.current && canvasRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        updateCanvasSize()
      })

      const parent = canvasRef.current.parentElement
      if (parent) {
        resizeObserverRef.current.observe(parent)
      }
    }

    setIsInitialized(true)

    return () => {
      // Clean up resize observer
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }

      // Cancel any ongoing animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Handle spinning state changes
  useEffect(() => {
    // Skip if not initialized yet
    if (!isInitialized) return

    // Handle spin start
    if (isSpinning && !previousSpinningState.current) {
      // Increment spin count
      spinCountRef.current += 1
      console.log(`Spin #${spinCountRef.current} started`)

      // Mark that the wheel has spun at least once
      hasSpunRef.current = true

      // Reset result reported flag
      resultReportedRef.current = false

      // Reset animation start time
      startTimeRef.current = 0

      // Set a random target rotation (5-10 full rotations)
      const fullRotations = 5 + Math.random() * 5
      targetRotationRef.current = fullRotations * 2 * Math.PI

      // Start animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      animationFrameRef.current = requestAnimationFrame(animate)

      console.log(`Animation started for spin #${spinCountRef.current}`)
    }

    // Handle spin end
    if (previousSpinningState.current && !isSpinning && hasSpunRef.current && !resultReportedRef.current) {
      console.log(`Spin #${spinCountRef.current} ended, determining result`)

      // Get the winning section based on the final rotation
      const { text, index } = getWinningSection(rotationRef.current)

      // Log the result for debugging
      const debugData = {
        spinCount: spinCountRef.current,
        finalRotation: rotationRef.current,
        winningSection: text,
        winningIndex: index,
      }
      console.log("Wheel result:", debugData)
      setDebugInfo(debugData)

      // Report the result
      if (onResult) {
        console.log(`Reporting result: ${text} (Spin #${spinCountRef.current})`)
        onResult(text)
        resultReportedRef.current = true
      }
    }

    // Update previous spinning state
    previousSpinningState.current = isSpinning
  }, [isSpinning, isInitialized, sections, onResult, spinDuration])

  return (
    <>
      <canvas ref={canvasRef} className="w-full h-full" style={{ touchAction: "none" }} />
      {/* Debug info - uncomment for debugging */}
      {/* {debugInfo && (
        <div className="absolute bottom-0 left-0 bg-black/80 text-white text-xs p-2 max-w-xs overflow-auto">
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      )} */}
    </>
  )
}
