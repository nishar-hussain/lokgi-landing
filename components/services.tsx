"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    eyebrow: "Market",
    title: "Explore US stocks.",
    points: [
      "Search US listings and open a company page.",
      "Twenty-four names have an order ticket. The rest are reference only.",
      "A reference listing shows the close and a chart, and nothing to buy.",
    ],
    cta: "Explore markets",
    href: "#works",
    image: "/images/slide-bull.jpg",
    alt: "Low-poly black bull standing on a gold coin",
  },
  {
    eyebrow: "Pricing",
    title: "Trade the official close.",
    points: [
      "Orders use the latest completed US regular-session close.",
      "The server sets the price. A quote more than 1% away is rejected.",
      "If the feed is down, the saved close stays and the change reads “Change unavailable.”",
    ],
    cta: "Review a quote",
    href: "/docs/quotes",
    image: "/images/slide-tesla.jpg",
    alt: "Black and white portrait collage on a red and cream grid",
  },
  {
    eyebrow: "Solana",
    title: "Signed by your wallet.",
    points: [
      "The desk builds the transaction. Your wallet signs and sends it.",
      "The program checks the signed price before it moves devnet USDC.",
      "A buy mints a frozen claim. A sell burns it and returns USDC.",
    ],
    cta: "See the flow",
    href: "#about",
    image: "/images/slide-capitol.jpg",
    alt: "Capitol building with Apple, Google, and Nvidia marks",
  },
  {
    eyebrow: "Holdings",
    title: "See what you hold.",
    points: [
      "Cash is the USDC in the connected wallet.",
      "Unrealized profit uses the on-chain cost basis. Realized profit comes from booked sells.",
      "History can be filtered and exported.",
    ],
    cta: "Open the desk",
    href: "https://app.lokgi.com",
    image: "/images/slide-nyse.jpg",
    alt: "New York Stock Exchange facade with an American flag",
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
      data-header="dark"
      className="bg-[#161616] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid min-h-[640px] lg:min-h-[680px] lg:grid-cols-2">
        <div className="relative min-h-[520px] lg:min-h-0">
          {slides.map((slide, slideIndex) => {
            const active = slideIndex === index
            const external = slide.href.startsWith("http") || slide.href.startsWith("/docs")
            return (
              <div
                key={slide.title}
                className={`absolute inset-0 flex flex-col justify-center px-6 py-16 transition-opacity duration-500 sm:px-12 lg:px-16 lg:py-20 ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
                aria-hidden={!active}
              >
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/55">{slide.eyebrow}</p>
                <h2 className="mt-4 max-w-md text-4xl font-medium leading-[1.02] tracking-[-0.04em] md:text-5xl">
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
          {slides.map((slide, slideIndex) => (
            <img
              key={slide.image}
              src={slide.image}
              alt={slide.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${slideIndex === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

