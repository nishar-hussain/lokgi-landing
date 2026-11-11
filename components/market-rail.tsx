"use client"

import { useEffect, useRef, type PointerEvent } from "react"

type RailAsset = { ticker: string; color: string; gold?: boolean }

const palette: RailAsset[] = [
  { ticker: "AAPL", color: "#1d4e89" },
  { ticker: "MSFT", color: "#16325c" },
  { ticker: "NVDA", color: "#3c8c28" },
  { ticker: "AMZN", color: "#e07a14" },
  { ticker: "GOOGL", color: "#1a6eb5" },
  { ticker: "META", color: "#7a2348" },
  { ticker: "TSLA", color: "#d24a1e" },
  { ticker: "JPM", color: "#24324a" },
  { ticker: "V", color: "#2451b8" },
  { ticker: "NFLX", color: "#9b1d3a" },
  { ticker: "AVGO", color: "#8a4b12" },
  { ticker: "LLY", color: "#0f766e" },
  { ticker: "ORCL", color: "#5b3d86" },
]

// Three laps of the same set, plus one gilded card so it passes the crown once per turn.
const assets: RailAsset[] = [...palette, ...palette, ...palette]
assets.splice(6, 0, { ticker: "GLD", color: "#d4af37", gold: true })

const AUTO = (-12.4 * Math.PI) / 180

const stories = [
  {
    label: "Market",
    caption: "Review familiar US companies, then open a claim against the Lokgi vault.",
    card: (
      <div className="relative aspect-square overflow-hidden bg-[#2f7cf6]">
        <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[11px] font-medium tracking-[0.02em] text-[#03060D]">
          Market
        </span>
        <p className="absolute left-5 right-4 top-[18%] text-[22px] font-medium leading-[1.08] tracking-[-0.03em] text-white sm:text-[24px]">
          U.S. stocks.
          <br />
          On Solana.
        </p>
        <div className="absolute inset-x-0 bottom-0 flex translate-y-3 flex-wrap gap-2 px-4 pb-1">
          {["AAPL", "MSFT", "NVDA", "AMZN", "GOOGL", "META", "TSLA", "JPM", "V", "NFLX"].map((ticker) => (
            <span key={ticker} className="rounded-[4px] bg-white/20 px-2 py-1 text-[12px] font-medium text-white">
              {ticker}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Price",
    caption: "Every order uses the latest completed US regular-session close.",
    card: (
      <div className="relative aspect-square overflow-hidden bg-[#6d4aff]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 300" aria-hidden="true">
          {Array.from({ length: 14 }, (_, index) => (
            <circle
              key={index}
              cx="150"
              cy="168"
              r={28 + index * 16}
              fill="none"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="1"
            />
          ))}
        </svg>
        <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[11px] font-medium tracking-[0.02em] text-[#03060D]">
          Price
        </span>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <p className="text-[32px] font-medium leading-none tracking-[-0.04em] sm:text-[36px]">$198.42</p>
          <p className="mt-3 text-[13px] tracking-[0.04em] text-white/80">Official close</p>
        </div>
      </div>
    ),
  },
  {
    label: "Claim",
    caption: "No company ownership, voting rights, or dividends. The token stays frozen.",
    card: (
      <div className="relative aspect-square overflow-hidden bg-white">
        <svg className="absolute inset-x-0 bottom-0 h-[46%] w-full" viewBox="0 0 300 140" aria-hidden="true">
          <path d="M0 90 C 70 20, 150 20, 220 78 C 250 104, 280 110, 300 96 L 300 140 L 0 140 Z" fill="#f3f3f3" />
          <path d="M0 108 C 80 60, 160 70, 300 40" fill="none" stroke="#e4e4e4" strokeWidth="1.5" />
        </svg>
        <span className="absolute left-3 top-3 bg-[#f3f3f3] px-2 py-1 text-[11px] font-medium tracking-[0.02em] text-[#03060D]">
          Claim
        </span>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-[22px] font-medium leading-[1.12] tracking-[-0.03em] text-[#03060D]">
            A vault claim.
            <br />
            Not a share.
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "Settlement",
    caption: "Lokgi prepares the order. You authorize it. The Solana program verifies it.",
    card: (
      <div className="relative aspect-square overflow-hidden bg-[#071433]">
        <div className="absolute -right-10 -top-16 h-[80%] w-[80%] rounded-full bg-[radial-gradient(circle,#2f7cf6_0%,rgba(47,124,246,0)_70%)]" />
        <div className="absolute -bottom-16 -left-10 h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,#14f195_0%,rgba(20,241,149,0)_68%)] opacity-70" />
        <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[11px] font-medium tracking-[0.02em] text-[#03060D]">
          Settlement
        </span>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <svg viewBox="0 0 397 311" className="h-10 w-12" aria-hidden="true">
            <defs>
              <linearGradient id="lokgi-rail-sol" x1="360" y1="0" x2="40" y2="311" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00FFA3" />
                <stop offset="1" stopColor="#DC1FFF" />
              </linearGradient>
            </defs>
            <path fill="url(#lokgi-rail-sol)" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" />
            <path fill="url(#lokgi-rail-sol)" d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" />
            <path fill="url(#lokgi-rail-sol)" d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" />
          </svg>
          <p className="mt-3 text-[20px] font-medium leading-[1.12] tracking-[-0.03em]">
            Signed by
            <br />
            your wallet.
          </p>
        </div>
      </div>
    ),
  },
]

function wrap(angle: number) {
  const tau = Math.PI * 2
  let value = (angle + Math.PI) % tau
  if (value < 0) value += tau
  return value - Math.PI
}

export default function MarketRail() {
  const stageRef = useRef<HTMLDivElement>(null)
  const arcRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const rotation = useRef(0)
  const velocity = useRef(AUTO)
  const dragging = useRef(false)
  const lastX = useRef(0)
  const lastTime = useRef(0)
  const radius = useRef(900)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let frame = 0
    let previous = performance.now()
    let metrics = { count: assets.length, step: 0, r: 900, cardSize: 160, origin: 120 }

    const measure = () => {
      const stage = stageRef.current
      if (!stage) return
      const width = stage.clientWidth
      const narrow = width < 800
      const count = narrow ? 16 : assets.length
      const cardSize = narrow ? Math.min(96, width * 0.24) : Math.min(188, width * 0.1)
      const r = cardSize * (narrow ? 3.15 : 1335 / 187)
      const origin = cardSize * 0.62 + (narrow ? 20 : 64)
      const edge = Math.asin(Math.min(0.98, (width * 0.52) / r))
      const height = origin + r * (1 - Math.cos(edge)) + cardSize * 0.58
      metrics = { count, step: (Math.PI * 2) / count, r, cardSize, origin }
      radius.current = r
      stage.style.height = `${Math.round(height)}px`

      const arc = arcRef.current
      if (arc) {
        arc.style.width = `${r * 2}px`
        arc.style.height = `${r * 2}px`
        arc.style.top = `${origin + cardSize * 0.06}px`
      }

      cardsRef.current.forEach((card, index) => {
        if (!card) return
        card.style.width = `${cardSize}px`
        card.style.height = `${cardSize}px`
        card.style.top = `${origin}px`
        if (index >= count) card.style.visibility = "hidden"
      })
    }

    const paint = () => {
      const { count, step, r } = metrics
      for (let index = 0; index < count; index += 1) {
        const card = cardsRef.current[index]
        if (!card) continue
        const theta = wrap(index * step + rotation.current)
        const shown = Math.abs(theta) < 1.22
        const closeness = Math.max(0, 1 - Math.abs(theta) / 0.72)
        const scale = 1 + closeness * (assets[index]?.gold ? 0.16 : 0.08)
        const x = Math.sin(theta) * r
        const y = (1 - Math.cos(theta)) * r
        card.style.visibility = shown ? "visible" : "hidden"
        card.style.zIndex = String(120 + Math.round(closeness * 40))
        card.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) rotate(${theta}rad) scale(${scale})`
        card.style.setProperty("--shine", `${(-theta / 1.22) * 42}`)
      }
    }

    const loop = (now: number) => {
      const dt = Math.min(0.032, (now - previous) / 1000)
      previous = now
      if (!dragging.current && !reduced) {
        velocity.current += (AUTO - velocity.current) * (1 - Math.exp(-dt * 1.8))
        rotation.current += velocity.current * dt
      }
      paint()
      frame = window.requestAnimationFrame(loop)
    }

    measure()
    paint()
    frame = window.requestAnimationFrame(loop)
    window.addEventListener("resize", measure)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("resize", measure)
    }
  }, [])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    lastX.current = event.clientX
    lastTime.current = performance.now()
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const now = performance.now()
    const dt = Math.max(0.008, (now - lastTime.current) / 1000)
    lastTime.current = now
    const delta = event.clientX - lastX.current
    lastX.current = event.clientX
    const step = delta / radius.current
    rotation.current += step
    velocity.current = Math.max(-1.6, Math.min(1.6, step / dt))
  }

  const onPointerUp = () => {
    dragging.current = false
  }

  return (
    <section id="market-rail" className="overflow-hidden bg-[#F3F3F3] pb-12 pt-8 md:pb-16 md:pt-12">
      <div
        ref={stageRef}
        className="relative cursor-grab touch-none select-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={arcRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full border border-[#03060D]/10"
        />
        {assets.map((asset, index) => (
          <div
            key={`${asset.ticker}-${index}`}
            ref={(node) => {
              cardsRef.current[index] = node
            }}
            aria-hidden="true"
            className="absolute left-1/2 will-change-transform [--shine:0]"
          >
            <div
              className={`relative h-full w-full overflow-hidden rounded-[12%] ${asset.gold ? "shadow-[0_18px_36px_rgba(120,84,10,0.32),inset_0_0_0_1px_rgba(255,236,170,0.7)]" : "shadow-[0_16px_30px_rgba(20,24,40,0.16)]"}`}
              style={{
                background: asset.gold
                  ? "linear-gradient(145deg, #f8e7a2 0%, #e0bf55 22%, #a67c1d 48%, #f3d98a 62%, #8d6412 100%)"
                  : asset.color,
              }}
            >
              <div
                className="pointer-events-none absolute inset-y-[-10%] w-[55%] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                style={{ transform: "translateX(calc(var(--shine) * 1.6%))" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: asset.gold
                    ? "linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0) 40%, rgba(80,48,0,0.18) 100%)"
                    : "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 42%, rgba(0,0,0,0.14) 100%)",
                }}
              />
              <svg className="absolute inset-[8%] h-[62%] w-[84%]" viewBox="0 0 100 78" aria-hidden="true">
                <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <g stroke="rgba(0,0,0,0.22)" strokeWidth="1.15">
                    <path d="M68 6 H94" />
                    <path d="M68 6 V72" />
                    <path d="M6 28 H94" />
                    <path d="M6 50 H94" />
                  </g>
                  <g stroke="rgba(255,255,255,0.34)" strokeWidth="1.15">
                    <path d="M68 7 H94" />
                    <path d="M69.1 6 V72" />
                    <path d="M6 29 H94" />
                    <path d="M6 51 H94" />
                  </g>
                </g>
              </svg>
              <span
                className={`absolute bottom-[11%] left-[11%] text-[clamp(16px,1.7vw,28px)] font-semibold leading-none tracking-[-0.04em] ${asset.gold ? "text-[#3a2808]" : "text-white"}`}
              >
                {asset.ticker}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto mt-8 max-w-[1440px] px-5 md:mt-12 lg:px-[60px]">
        <h2 className="text-[28px] font-normal leading-none tracking-[-0.02em] text-[#03060D] md:text-[36px]">
          From the close to the claim.
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {stories.map((story) => (
            <article key={story.label} className="group flex flex-col gap-4">
              <div className="overflow-hidden">{story.card}</div>
              <p className="text-[15px] leading-[1.4] text-[#03060D]">{story.caption}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
