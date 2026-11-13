import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const switzer = localFont({
  src: [
    { path: "../fonts/switzer-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/switzer-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/switzer-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/switzer-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
})

export const metadata: Metadata = {
  title: "lokgi — US stocks, settled on Solana devnet",
  description: "Look up US-listed companies at the official close, and buy or sell a frozen USDC-vault claim on Solana devnet.",
  icons: {
    icon: "/images/logsi-mark.jpeg",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${switzer.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
