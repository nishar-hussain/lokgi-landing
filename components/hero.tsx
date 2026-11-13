"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = 500 // Maximum scroll distance for the effect
      const progress = Math.min(scrolled / maxScroll, 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      video.pause()
      return
    }
    video.play().catch(() => {})
  }, [])

  const scale = 1 - scrollProgress * 0.15 // Scale from 1 to 0.85
  const borderRadius = scrollProgress * 24 // Border radius from 0 to 24px

  return (
    <section id="home" className="pt-8 pb-16">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Product introduction */}
          <div className="lg:max-w-3xl pt-0">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.14em] text-foreground/60">US listings. Solana devnet.</p>
            <h1 className="text-balance text-left text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-accent md:text-[42px]">
              A reference desk for US stocks.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-foreground/70">
              Look up a ticker, see the latest official close, and buy or sell a frozen claim on a USDC vault. The claim records USDC held against that name. It is not a share of the company.
            </p>

            <a
              href="https://app.lokgi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
            >
              Open the desk
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              href="#services"
              className="mt-8 ml-3 inline-flex items-center gap-2 rounded-full border border-foreground px-6 py-3 text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              How Lokgi Works
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="max-w-[260px] pt-8 lg:pt-12">
            <p className="text-sm leading-6 text-foreground/70">
              Twenty-four names can be traded. The rest of the US directory can be looked up, with a price and a chart, and no order ticket.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 px-6">
        <div
          className="relative overflow-hidden transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
          }}
        >
          <video
            ref={videoRef}
            src="/media/hero-sunrise.mp4"
            className="h-auto w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Sunrise over the mountains"
          />

        </div>
      </div>
    </section>
  )
}
