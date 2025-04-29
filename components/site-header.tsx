"use client"

import { useState } from "react"
import Link from "next/link"
import { Share2, RotateCcw, Menu, PenToolIcon as Tool } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

export function SiteHeader() {
  const [savedWheels, setSavedWheels] = useState<any[]>([])

  // Load saved wheels from localStorage
  useState(() => {
    if (typeof window !== "undefined") {
      const wheels = JSON.parse(localStorage.getItem("savedWheels") || "[]")
      setSavedWheels(wheels)
    }
  })

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-gray-500 to-gray-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-white"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 h-6 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-white rotate-45"></div>
            </div>
            <span className="text-xl font-bold text-white">Yes or No Wheel</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-white">
                <RotateCcw className="h-4 w-4" />
                <span>Switch Wheel</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800 text-white">
              <DropdownMenuLabel>Saved Wheels</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              {savedWheels.length > 0 ? (
                savedWheels.map((wheel) => (
                  <DropdownMenuItem
                    key={wheel.id}
                    className="cursor-pointer hover:bg-zinc-800"
                    onClick={() => {
                      localStorage.setItem("currentWheel", JSON.stringify(wheel))
                      window.location.href = "/create"
                    }}
                  >
                    {wheel.name}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem className="text-gray-400">No saved wheels</DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="bg-zinc-800" />
              <Link href="/templates">
                <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">Browse Templates</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-white" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-white">
                <Tool className="h-4 w-4" />
                <span>Tools</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800 text-white">
              <Link href="/">
                <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">Yes or No Wheel</DropdownMenuItem>
              </Link>
              <Link href="/tools/name-picker">
                <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">Name Picker</DropdownMenuItem>
              </Link>
              <Link href="/tools/random-number">
                <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">Random Number</DropdownMenuItem>
              </Link>
              <Link href="/tools/team-generator">
                <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">Team Generator</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <Link href="/create">
                <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">Custom Wheel Creator</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800 text-white">
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">
              <RotateCcw className="h-4 w-4 mr-2" />
              Switch Wheel
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">
              <Tool className="h-4 w-4 mr-2" />
              Tools
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
