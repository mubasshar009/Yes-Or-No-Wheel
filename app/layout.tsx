import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AudioContextProvider } from "@/components/audio-context-provider"
import { SiteHeader } from "@/components/site-header"

const inter = Inter({ subsets: ["latin"] })
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" })

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
      <head>
      <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-2JQ4Z2GLF0"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-2JQ4Z2GLF0');
</script>
      </head>
      <body className={`${inter.className} ${orbitron.variable}`}>
        <AudioContextProvider>
          <SiteHeader />
          {children}
          <Toaster />
        </AudioContextProvider>
      </body>
    </html>
  )
}
