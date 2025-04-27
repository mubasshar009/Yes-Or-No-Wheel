"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MiniWheel } from "@/components/mini-wheel"

// Template definitions
const templates = [
  {
    id: "yes-no",
    name: "Yes or No",
    description: "A simple wheel for yes/no decisions",
    sections: [
      { id: "1", text: "Yes", color: "#4ade80" },
      { id: "2", text: "No", color: "#f87171" },
    ],
  },
  {
    id: "name-picker",
    name: "Name Picker",
    description: "Pick a random name from a group",
    sections: [
      { id: "1", text: "John", color: "#60a5fa" },
      { id: "2", text: "Sarah", color: "#f472b6" },
      { id: "3", text: "Mike", color: "#34d399" },
      { id: "4", text: "Emma", color: "#a78bfa" },
      { id: "5", text: "David", color: "#fbbf24" },
    ],
  },
  {
    id: "magic-eight",
    name: "Magic Eight Ball",
    description: "Get answers to your questions",
    sections: [
      { id: "1", text: "Yes", color: "#4ade80" },
      { id: "2", text: "No", color: "#f87171" },
      { id: "3", text: "Maybe", color: "#fbbf24" },
      { id: "4", text: "Ask again", color: "#60a5fa" },
      { id: "5", text: "Definitely", color: "#a78bfa" },
      { id: "6", text: "Not likely", color: "#f472b6" },
      { id: "7", text: "Certainly", color: "#34d399" },
      { id: "8", text: "Cannot predict", color: "#94a3b8" },
    ],
  },
  {
    id: "roulette",
    name: "Roulette",
    description: "Classic roulette wheel with numbers",
    sections: Array.from({ length: 36 }, (_, i) => ({
      id: (i + 1).toString(),
      text: (i + 1).toString(),
      color: i % 2 === 0 ? "#f87171" : "#000000",
    })),
  },
  {
    id: "truth-dare",
    name: "Truth or Dare",
    description: "Fun party game wheel",
    sections: [
      { id: "1", text: "Truth", color: "#60a5fa" },
      { id: "2", text: "Dare", color: "#f87171" },
      { id: "3", text: "Truth", color: "#60a5fa" },
      { id: "4", text: "Dare", color: "#f87171" },
    ],
  },
  {
    id: "dinner",
    name: "Dinner Ideas",
    description: "Can't decide what to eat?",
    sections: [
      { id: "1", text: "Pizza", color: "#f87171" },
      { id: "2", text: "Sushi", color: "#60a5fa" },
      { id: "3", text: "Burgers", color: "#fbbf24" },
      { id: "4", text: "Pasta", color: "#a78bfa" },
      { id: "5", text: "Salad", color: "#4ade80" },
      { id: "6", text: "Tacos", color: "#f472b6" },
    ],
  },
]

export default function TemplatesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const useTemplate = useCallback(
    (templateId: string) => {
      const template = templates.find((t) => t.id === templateId)
      if (template) {
        // Store template in localStorage to be loaded in create page
        localStorage.setItem("currentTemplate", JSON.stringify(template))
        router.push("/create")
      }
    },
    [router],
  )

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
          <h1 className="text-2xl font-bold ml-4">Wheel Templates</h1>
        </div>

        <div className="mb-8">
          <Input
            className="bg-zinc-900 border-zinc-800 text-white"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="bg-zinc-900 border-zinc-800 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-6">
                <div className="w-[120px] h-[120px]">
                  <MiniWheel sections={template.sections} />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-white text-black hover:bg-gray-200"
                  onClick={() => useTemplate(template.id)}
                >
                  Use This Template
                </Button>
              </CardFooter>
            </Card>
          ))}

          {filteredTemplates.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400">No templates found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
