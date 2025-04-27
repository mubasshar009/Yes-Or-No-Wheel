"use client"

import type React from "react"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface WheelSectionProps {
  section: {
    id: string
    text: string
    color: string
  }
  onUpdate: (id: string, text: string, color: string) => void
  onRemove: (id: string) => void
}

export function WheelSection({ section, onUpdate, onRemove }: WheelSectionProps) {
  const [text, setText] = useState(section.text)
  const [color, setColor] = useState(section.color)

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    onUpdate(section.id, e.target.value, color)
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
    onUpdate(section.id, text, e.target.value)
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
      <div className="w-6 h-6 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      <Input value={text} onChange={handleTextChange} className="flex-1 bg-zinc-700 border-zinc-600" />
      <Input
        type="color"
        value={color}
        onChange={handleColorChange}
        className="w-10 h-10 p-1 bg-transparent border-0"
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(section.id)}
        className="text-gray-400 hover:text-white hover:bg-red-500/20"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
