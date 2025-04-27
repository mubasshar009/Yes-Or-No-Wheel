"use client"

import { useRef, useEffect } from "react"

interface MiniWheelProps {
  sections: {
    id: string
    text: string
    color: string
  }[]
}

export function MiniWheel({ sections }: MiniWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ensure 1:1 aspect ratio
    const size = Math.min(canvas.offsetWidth, canvas.offsetHeight)
    canvas.width = size * window.devicePixelRatio
    canvas.height = size * window.devicePixelRatio
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 5

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw wheel sections
    const sectionAngle = (2 * Math.PI) / sections.length

    sections.forEach((section, index) => {
      const startAngle = index * sectionAngle
      const endAngle = (index + 1) * sectionAngle

      // Draw section
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = section.color
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI)
    ctx.fillStyle = "#ffffff"
    ctx.fill()
  }, [sections])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
