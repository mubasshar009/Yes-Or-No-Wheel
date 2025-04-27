"use client"

import { useState, useEffect } from "react"
import { Plus, Minus, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ScoreboardProps {
  showReset?: boolean
  yesCount?: number
  noCount?: number
  onReset?: () => void
}

export function Scoreboard({
  showReset = true,
  yesCount: propYesCount,
  noCount: propNoCount,
  onReset,
}: ScoreboardProps) {
  const [yesCount, setYesCount] = useState(propYesCount || 0)
  const [noCount, setNoCount] = useState(propNoCount || 0)

  // Update counts when props change
  useEffect(() => {
    if (propYesCount !== undefined) setYesCount(propYesCount)
    if (propNoCount !== undefined) setNoCount(propNoCount)
  }, [propYesCount, propNoCount])

  const incrementYes = () => setYesCount(yesCount + 1)
  const incrementNo = () => setNoCount(noCount + 1)
  const decrementYes = () => setYesCount(Math.max(0, yesCount - 1))
  const decrementNo = () => setNoCount(Math.max(0, noCount - 1))
  const resetScores = () => {
    setYesCount(0)
    setNoCount(0)
    if (onReset) onReset()
  }

  const totalCount = yesCount + noCount
  const yesPercentage = totalCount > 0 ? Math.round((yesCount / totalCount) * 100) : 0
  const noPercentage = totalCount > 0 ? Math.round((noCount / totalCount) * 100) : 0

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center justify-between">
          Scoreboard
          {showReset && (
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={resetScores}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-green-400 font-medium">Yes</span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full border-zinc-700"
                    onClick={decrementYes}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-xl font-bold min-w-[30px] text-center">{yesCount}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full border-zinc-700"
                    onClick={incrementYes}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${yesPercentage}%` }}></div>
              </div>
              <div className="text-right text-xs text-gray-400">{yesPercentage}%</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-red-400 font-medium">No</span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full border-zinc-700"
                    onClick={decrementNo}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-xl font-bold min-w-[30px] text-center">{noCount}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full border-zinc-700"
                    onClick={incrementNo}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${noPercentage}%` }}></div>
              </div>
              <div className="text-right text-xs text-gray-400">{noPercentage}%</div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-400">Total spins: {totalCount}</div>
        </div>
      </CardContent>
    </Card>
  )
}
