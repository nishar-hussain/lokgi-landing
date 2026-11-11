"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, Send } from "lucide-react"
import Image from "next/image"

export default function ContactSection() {
  const stockLogos = [
    { src: "/images/nvidia-logo.jpeg", alt: "NVIDIA logo", name: "NVIDIA · NVDA", scale: 0.92 },
    { src: "/images/tesla-logo.jpeg", alt: "Tesla logo", name: "Tesla · TSLA", scale: 1 },
    { src: "/images/openai-logo.jpeg", alt: "OpenAI logo", name: "OpenAI · AI", scale: 1.05 },
    { src: "/images/solana-logo.jpeg", alt: "Solana logo", name: "Solana · SOL", scale: 1.62 },
  ]
  const [activeLogo, setActiveLogo] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveLogo((current) => (current + 1) % stockLogos.length)
    }, 2000)

    return () => window.clearInterval(interval)
  }, [stockLogos.length])

  return (
    <section id="contact" className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <Send className="w-5 h-5 text-accent" strokeWidth={2} />
          <span className="text-sm font-medium text-foreground/70">YOUR TRADING DESK</span>
        </div>

          <p className="text-foreground/70 max-w-xl mb-12">
            Execute demo trades on supported stock-linked claims. Enter your details, check the quote, and confirm with a Solana wallet signature.
          </p>
        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative min-h-[300px] overflow-hidden bg-white lg:min-h-[360px]">
            <div
              key={stockLogos[activeLogo].src}
              className="stock-logo-frame"
              style={{ transform: `scale(${stockLogos[activeLogo].scale})` }}
            >
              <Image
                src={stockLogos[activeLogo].src}
                alt={stockLogos[activeLogo].alt}
                width={600}
                height={500}
                className="stock-logo-spin h-full w-full object-contain"
              />
            </div>
            <div className="absolute bottom-5 left-5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">
              {stockLogos[activeLogo].name}
            </div>
          </div>

          {/* Trading Desk */}
          <div className="bg-card p-8 border-border rounded-none border-0">
            <h3 className="mb-2 font-serif text-2xl text-foreground">Review your trade. Confirm onchain.</h3>
            <p className="text-foreground/70 mb-8">
              Execute demo trades on supported non-transferable claims against the Lokgi USDC vault. Every order preview shows the last official close, quantity, 0.10% platform fee, limits, and quote expiration.
            </p>

            <div className="space-y-4 border-y border-border py-6 text-sm text-foreground/70">
              <p>Minimum order: $1 · Maximum order: $10,000</p>
              <p>Daily notional limit: $25,000 · Quote lifetime: 60 seconds</p>
              <p>Demo Mode: orders are simulated for demonstration. No real assets or live stock trades are executed.</p>
            </div>

            <a
              href="https://app.lokgi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Open Trading Desk
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
