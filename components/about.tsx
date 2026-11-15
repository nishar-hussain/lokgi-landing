"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Info } from "lucide-react"

const scenes = [
  {
    id: "lookup",
    status: "Last official close",
    ticker: "AAPL",
    name: "Apple",
    price: "$198.42",
    note: "The listing shows the latest completed US session, 9:30 to 16:00 New York.",
    action: "Open listing",
    fee: "US session",
    payLabel: "Session",
    pay: "9:30–16:00",
    receiveLabel: "On screen",
    receive: "Official close",
    chart: "0,58 28,54 52,50 80,46 108,40 136,36 164,30 192,26 220,20 240,16",
    button: "View the close",
    steps: [
      { label: "Close is labelled", done: true },
      { label: "Chart is the US listing", done: true },
      { label: "A trade here does not move it", done: true },
    ],
  },
  {
    id: "mint",
    status: "Claim minted",
    ticker: "AAPL",
    name: "Apple",
    price: "0.504 AAPL",
    note: "USDC is in the vault. The frozen claim is in your wallet.",
    action: "Buy filled",
    fee: "0.10% fee",
    payLabel: "Vault in",
    pay: "100 USDC",
    receiveLabel: "Minted",
    receive: "0.504 AAPL",
    chart: "0,46 22,42 40,48 58,34 78,38 96,22 118,28 136,16 158,24 176,12 198,18 220,8 240,14",
    button: "Holding updated",
    steps: [
      { label: "USDC entered the vault", done: true },
      { label: "Claim minted, frozen", done: true },
      { label: "Booked after the chain", done: true },
    ],
  },
  {
    id: "rights",
    status: "Not a share",
    ticker: "AAPL",
    name: "Apple",
    price: "$198.42",
    note: "No company ownership, no vote, no dividend, and no right to the stock.",
    action: "Claim only",
    fee: "No dividend",
    payLabel: "You hold",
    pay: "The claim",
    receiveLabel: "Outside",
    receive: "The stock",
    chart: "0,50 28,44 56,48 84,36 112,40 140,26 168,30 196,16 224,20 240,12",
    button: "Read the risks",
    steps: [
      { label: "No voting rights", done: true },
      { label: "No dividends", done: true },
      { label: "No Nasdaq or NYSE print", done: true },
    ],
  },
]

function SolanaMark({ className, id }: { className?: string; id: string }) {
  return (
    <svg viewBox="0 0 397 311" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="360" y1="0" x2="40" y2="311" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
      </defs>
      <path fill={`url(#${id})`} d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" />
      <path fill={`url(#${id})`} d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" />
      <path fill={`url(#${id})`} d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" />
    </svg>
  )
}

function sceneIndex(position: number) {
  const last = scenes.length - 1
  if (position <= 0) return 0
  return Math.min(last, Math.floor((position / last) * scenes.length))
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const scenePos = useRef(0)
  const [visual, setVisual] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let frame = 0
    const readTarget = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) return 0
      const traveled = Math.min(Math.max(-rect.top, 0), scrollable)
      return (traveled / scrollable) * (scenes.length - 1)
    }

    const tick = () => {
      frame = 0
      const target = readTarget()
      const next = scenePos.current + (target - scenePos.current) * 0.065
      scenePos.current = Math.abs(next - target) < 0.002 ? target : next
      setVisual(scenePos.current)
      if (scenePos.current !== target) frame = window.requestAnimationFrame(tick)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(tick)
    }

    tick()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const active = sceneIndex(visual)
  const scene = scenes[active]

  return (
    <section ref={sectionRef} id="about" className="relative h-[340vh] max-lg:h-[300vh]">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden px-6 pb-6 pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:28px_28px] lg:block"
        />

        <div className="relative mx-auto grid min-h-0 w-full max-w-7xl flex-1 grid-rows-[auto_minmax(0,1fr)] items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-none lg:gap-16">
          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-2 lg:mb-6">
              <Info className="h-5 w-5 text-accent" strokeWidth={2} />
              <span className="text-sm font-medium text-foreground/70">ASSET STRUCTURE</span>
            </div>

            <h2 className="text-balance text-3xl font-medium leading-[1.02] tracking-[-0.04em] text-foreground md:text-[34px]">
              Know exactly what you hold.
            </h2>

            <p className="mt-4 max-w-xl text-foreground/70 lg:mt-5">
              A Lokgi claim records USDC in the vault against that name, at the close used for the order. The token stays frozen in the wallet that holds it.
            </p>

            <div key={scene.id} className="screen-in mt-5 max-w-xl border-l-2 border-foreground pl-4" aria-live="polite">
              <p className="text-sm font-medium text-foreground">{scene.status}</p>
              <p className="mt-1 text-sm leading-6 text-foreground/70">{scene.note}</p>
            </div>

            <div className="mt-5 flex items-center gap-2" aria-hidden="true">
              {scenes.map((item, index) => (
                <span
                  key={item.id}
                  className="h-1 rounded-full bg-foreground/15 transition-[width,background-color] duration-300"
                  style={{
                    width: index === active ? 32 : 16,
                    backgroundColor: index === active ? "#111" : "rgba(0,0,0,0.15)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex h-full min-h-0 items-end justify-center overflow-hidden lg:items-center lg:pr-2">
            <div className="phone-float relative aspect-[418/850] h-full max-h-full w-auto drop-shadow-[0_28px_50px_rgba(0,0,0,0.18)] lg:max-h-[min(70svh,640px)]">
              <img
                src="/images/iphone-frame.png"
                alt=""
                className="pointer-events-none relative z-10 block h-full w-full select-none"
              />
              <div className="absolute inset-x-[5.8%] bottom-[2.5%] top-[7.6%] z-20 overflow-hidden rounded-[11%] bg-white">
                <div className="flex h-full flex-col px-3.5 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <SolanaMark id="lokgi-solana-header" className="h-7 w-7" />
                      <div>
                        <p className="text-[12px] font-semibold leading-none text-foreground">Solana</p>
                        <p className="mt-1 text-[9px] leading-none text-foreground/45">Mainnet · USDC</p>
                      </div>
                    </div>
                    <span className="shrink-0 whitespace-nowrap rounded-full bg-black px-2 py-1 text-[9px] font-medium leading-none text-white">
                      8xK2…4fQa
                    </span>
                  </div>

                  <div key={scene.id} className="screen-in mt-2.5 flex min-h-0 flex-1 flex-col overflow-hidden">
                    <div className="flex shrink-0 items-center justify-between gap-2">
                      <p className="min-w-0 truncate text-[11px] font-medium text-foreground/45">{scene.ticker} · {scene.name}</p>
                      <span className="shrink-0 whitespace-nowrap rounded-full bg-[#14F195]/20 px-1.5 py-1 text-[9px] font-semibold leading-none text-[#0a7a4b]">
                        {scene.status}
                      </span>
                    </div>
                    <p className="mt-0.5 shrink-0 truncate text-[22px] font-semibold leading-none tracking-tight text-foreground">{scene.price}</p>
                    <p className="mt-1 line-clamp-2 shrink-0 text-[10px] leading-[1.35] text-foreground/45">{scene.note}</p>

                    <svg viewBox="0 0 240 72" className="mt-2 h-14 w-full shrink-0 sm:h-16" aria-hidden="true">
                      <polyline
                        fill="none"
                        stroke="#111"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        points={scene.chart}
                      />
                    </svg>

                    <div className="mt-1 shrink-0 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/5">
                      <div className="mb-1.5 flex items-center justify-between gap-2">
                        <p className="min-w-0 truncate text-[12px] font-semibold leading-none text-foreground">{scene.action}</p>
                        <span className="shrink-0 text-[10px] text-foreground/40">{scene.fee}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                        <div className="min-w-0 rounded-xl bg-[#f4f4f2] px-1.5 py-1.5">
                          <p className="text-[8px] uppercase tracking-wide text-foreground/40">{scene.payLabel}</p>
                          <p className="mt-0.5 truncate font-semibold leading-tight text-foreground">{scene.pay}</p>
                        </div>
                        <div className="min-w-0 rounded-xl bg-[#f4f4f2] px-1.5 py-1.5">
                          <p className="text-[8px] uppercase tracking-wide text-foreground/40">{scene.receiveLabel}</p>
                          <p className="mt-0.5 truncate font-semibold leading-tight text-foreground">{scene.receive}</p>
                        </div>
                      </div>
                    </div>

                    <ul className="mt-auto shrink-0 space-y-1.5 px-0.5 pt-3">
                      {scene.steps.map((step) => (
                        <li key={step.label} className="flex items-center gap-2">
                          <span
                            className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full ${
                              step.done ? "bg-black text-white" : "border border-foreground/25"
                            }`}
                          >
                            {step.done ? <Check className="h-2 w-2" strokeWidth={3} /> : null}
                          </span>
                          <span className={`text-[10px] leading-tight ${step.done ? "text-foreground" : "text-foreground/40"}`}>
                            {step.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="shrink-0 bg-white pb-3 pt-1.5">
                    <div className="sign-pulse flex items-center justify-center gap-1.5 rounded-full bg-black px-3 py-2.5 text-[11px] font-medium leading-none text-white">
                      <SolanaMark id="lokgi-solana-sign" className="h-3.5 w-3.5 shrink-0" />
                      <span key={scene.id} className="truncate">{scene.button}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
