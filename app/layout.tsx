import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import Script from "next/script"
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
  generator: "v0.dev",
  metadataBase: new URL('https://yesno-wheel.com'),
  alternates: {
    canonical: 'https://yesno-wheel.com',
  },
  other: {
    'google-site-verification': 'your-verification-code-here', // Replace with your actual verification code
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: "Yes or No Wheel - Make Quick Decisions",
    description: "Stuck on a decision? Let our random Yes or No Wheel decide for you. Simple, fast, and completely random.",
    url: 'https://yesno-wheel.com',
    siteName: 'Yes or No Wheel',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/favicon.png',
        width: 192,
        height: 192,
        alt: 'Yes or No Wheel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Yes or No Wheel - Make Quick Decisions",
    description: "Stuck on a decision? Let our random Yes or No Wheel decide for you. Simple, fast, and completely random.",
    site: '@yesnowheel', // Replace with your actual Twitter handle if you have one
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-2JQ4Z2GLF0" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2JQ4Z2GLF0');
          `}
        </Script>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#A855F7" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
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
