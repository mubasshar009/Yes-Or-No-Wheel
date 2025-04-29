import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AudioContextProvider } from "@/components/audio-context-provider"
import { SiteHeader } from "@/components/site-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yes or No Wheel - Make Quick Decisions",
  description:
    "Create and spin customizable wheels for decisions, games, or giveaways. Save your wheels, use templates, and enjoy animated spinning effects.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AudioContextProvider>
          <SiteHeader />
          {children}
          <Toaster />
        </AudioContextProvider>
      </body>
    </html>
  )
}
