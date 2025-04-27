import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomColor(): string {
  const colors = [
    "#f87171", // red
    "#fb923c", // orange
    "#fbbf24", // amber
    "#facc15", // yellow
    "#a3e635", // lime
    "#4ade80", // green
    "#34d399", // emerald
    "#2dd4bf", // teal
    "#22d3ee", // cyan
    "#38bdf8", // sky
    "#60a5fa", // blue
    "#818cf8", // indigo
    "#a78bfa", // violet
    "#c084fc", // purple
    "#e879f9", // fuchsia
    "#f472b6", // pink
    "#fb7185", // rose
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}
