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
  const requestRef = useRef<number>()
  const startTimeRef = useRef<number>(0)
  const rotationRef = useRef<number>(0)
  const targetRotationRef = useRef<number>(0)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const [finalResult, setFinalResult] = useState<string | null>(null)
  const resultReportedRef = useRef(false)
  const spinResultRef = useRef<number | null>(null)

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

    // If wheel has stopped spinning and we haven't reported the result yet
    if (!isSpinning && spinResultRef.current !== null && !resultReportedRef.current) {
      // Get the result based on the predetermined spin result
      const result = sections[spinResultRef.current].text
      setFinalResult(result)

      // Report the result via callback
      if (onResult) {
        onResult(result)
      }

      resultReportedRef.current = true
      console.log(`Wheel result determined: ${result}`)
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
    }

    drawWheel(rotationRef.current)

    if (progress < 1 && isSpinning) {
      requestRef.current = requestAnimationFrame(animate)
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

  // Reset state when spinning starts
  useEffect(() => {
    if (isSpinning) {
      resultReportedRef.current = false
      setFinalResult(null)

      // Determine the result before spinning
      // This ensures the visual result will match what we report
      spinResultRef.current = Math.floor(Math.random() * sections.length)
      console.log(`Predetermined spin result index: ${spinResultRef.current}`)

      // Calculate rotation to land on the predetermined result
      // The pointer is at the top (PI * 3/2), so we need to rotate to position the result there
      const sectionAngle = (2 * Math.PI) / sections.length
      const baseRotations = 5 + Math.random() * 5 // 5-10 full rotations for effect

      // Calculate the angle needed to position the selected section at the top
      // We add sections.length to ensure positive modulo
      const sectionOffset = (sections.length - spinResultRef.current) % sections.length
      const targetAngle = baseRotations * 2 * Math.PI + sectionOffset * sectionAngle

      targetRotationRef.current = targetAngle
      console.log(`Target rotation: ${targetAngle} radians`)
    }
  }, [isSpinning, sections])

  // Initialize and handle spinning
  useEffect(() => {
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

    // Initial size update
    updateCanvasSize()

    // Handle spin start
    if (isSpinning) {
      // Reset animation values
      startTimeRef.current = 0

      // Start animation
      requestRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }

      // Clean up resize observer
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
    }
  }, [isSpinning, spinDuration, sections])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ touchAction: "none" }} />
}
