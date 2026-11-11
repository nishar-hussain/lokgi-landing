"use client"

import { useEffect, useState, type ReactNode } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    eyebrow: "Market",
    title: "Explore US stocks.",
    points: [
      "Review company information, price changes, and historical charts.",
      "Compare the latest official close before you trade.",
      "See which names are available as supported claims.",
    ],
    cta: "Explore markets",
    href: "#works",
    media: "sunrise",
  },
  {
    eyebrow: "Pricing",
    title: "Trade the official close.",
    points: [
      "Every order uses the latest completed US regular-session close.",
      "The quote, fee, and limits are shown before you sign.",
      "Claims are priced in USDC against the Lokgi vault.",
    ],
    cta: "Review a quote",
    href: "#contact",
    media: "phone",
  },
  {
    eyebrow: "Solana",
    title: "Signed by your wallet.",
    points: [
      "Lokgi prepares the order. You authorize it.",
      "The Solana program verifies it before confirmation.",
      "Demo mode does not execute a live stock trade.",
    ],
    cta: "See the flow",
    href: "#about",
    media: "settlement",
  },
  {
    eyebrow: "Holdings",
    title: "See what you hold.",
    points: [
      "Review USDC balances and claim quantities.",
      "Track cost basis and estimated profit and loss.",
      "Read the full transaction history in one place.",
    ],
    cta: "Open the desk",
    href: "https://app.lokgi.com",
    media: "portfolio",
  },
] as const

export default function Services() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [paused, index])

  const go = (direction: -1 | 1) => {
    setIndex((current) => (current + direction + slides.length) % slides.length)
  }

  return (
    <section
      id="services"
      className="bg-[#161616] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid min-h-[640px] lg:min-h-[680px] lg:grid-cols-2">
        <div className="relative min-h-[520px] lg:min-h-0">
          {slides.map((slide, slideIndex) => {
            const active = slideIndex === index
            const external = slide.href.startsWith("http")
            return (
              <div
                key={slide.title}
                className={`absolute inset-0 flex flex-col justify-center px-6 py-16 transition-opacity duration-500 sm:px-12 lg:px-16 lg:py-20 ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
                aria-hidden={!active}
              >
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/55">{slide.eyebrow}</p>
                <h2 className="mt-4 max-w-md text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-5xl">
                  {slide.title}
                </h2>
                <ul className="mt-6 max-w-md space-y-3 text-sm leading-6 text-white/75">
                  {slide.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {external ? (
                  <a
                    href={slide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-opacity hover:opacity-85"
                  >
                    {slide.cta}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    href={slide.href}
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-opacity hover:opacity-85"
                  >
                    {slide.cta}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            )
          })}

          <div className="absolute bottom-8 left-6 flex items-center gap-3 sm:left-12 lg:bottom-10 lg:left-16">
            <button
              type="button"
              onClick={() => go(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/35 text-white transition-colors hover:bg-white hover:text-black"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/35 text-white transition-colors hover:bg-white hover:text-black"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden bg-[#0e0e0e] lg:min-h-0">
          <Media name="sunrise" active={slides[index].media === "sunrise"}>
            <video
              src="/media/hero-sunrise.mp4"
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </Media>
          <Media name="phone" active={slides[index].media === "phone"}>
            <PhoneSlide />
          </Media>
          <Media name="settlement" active={slides[index].media === "settlement"}>
            <SettlementSlide />
          </Media>
          <Media name="portfolio" active={slides[index].media === "portfolio"}>
            <PortfolioSlide />
          </Media>
        </div>
      </div>
    </section>
  )
}

function Media({ active, children }: { name: string; active: boolean; children: ReactNode }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
      aria-hidden={!active}
    >
      {children}
    </div>
  )
}

function PhoneSlide() {
  return (
    <div className="flex h-full items-end justify-center bg-[#1b1b1b] pt-10">
      <div className="relative w-[min(70%,280px)] translate-y-8">
        <img src="/images/iphone-frame.png" alt="" className="relative z-10 block h-auto w-full" />
        <div className="absolute inset-x-[6%] bottom-[3%] top-[8%] z-20 overflow-hidden rounded-[1.6rem] bg-[#111] text-white">
          <div className="px-4 pb-4 pt-6">
            <div className="flex items-center justify-between text-[10px] text-white/50">
              <span>AAPL · Apple</span>
              <span>Official close</span>
            </div>
            <p className="mt-2 text-3xl font-semibold tracking-tight">$198.42</p>
            <div className="mt-4 space-y-2 text-[11px]">
              <div className="flex justify-between rounded-lg bg-white/10 px-3 py-2">
                <span className="text-white/50">You pay</span>
                <span>100 USDC</span>
              </div>
              <div className="flex justify-between rounded-lg bg-white/10 px-3 py-2">
                <span className="text-white/50">You receive</span>
                <span>0.504 AAPL</span>
              </div>
            </div>
            <div className="mt-4 rounded-full bg-white py-2 text-center text-[11px] font-medium text-black">
              Review quote
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettlementSlide() {
  return (
    <div className="flex h-full items-center justify-center bg-[#101410] p-8">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#171c18] p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-white/45">Solana · Demo</p>
        <p className="mt-3 text-2xl font-medium tracking-tight">Wallet signature</p>
        <ul className="mt-5 space-y-3 text-sm text-white/70">
          <li className="flex items-center justify-between border-b border-white/10 pb-3">
            <span>Order prepared</span>
            <span className="text-white">Ready</span>
          </li>
          <li className="flex items-center justify-between border-b border-white/10 pb-3">
            <span>Fee</span>
            <span className="text-white">0.10%</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Program check</span>
            <span className="text-white">Verified</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function PortfolioSlide() {
  const rows = [
    ["AAPL", "0.504", "+1.8%"],
    ["MSFT", "0.210", "+0.6%"],
    ["NVDA", "0.080", "+3.1%"],
    ["USDC", "1,240", "Cash"],
  ]
  return (
    <div className="flex h-full items-center justify-center bg-[#121212] p-8">
      <div className="w-full max-w-sm">
        <p className="text-xs uppercase tracking-[0.16em] text-white/45">Holdings</p>
        <p className="mt-2 text-3xl font-medium tracking-tight">$1,438.20</p>
        <div className="mt-6 divide-y divide-white/10">
          {rows.map(([ticker, amount, change]) => (
            <div key={ticker} className="flex items-center justify-between py-3 text-sm">
              <span className="font-medium">{ticker}</span>
              <span className="text-white/70">{amount}</span>
              <span className="text-white/55">{change}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
