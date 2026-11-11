"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Info } from "lucide-react"

const scenes = [
  {
    id: "vault",
    status: "Vault settlement",
    action: "Buy claim",
    note: "USDC moves into the vault and a claim is minted.",
    pay: "100 USDC",
    receive: "0.504 AAPL",
    chart: "0,46 22,42 40,48 58,34 78,38 96,22 118,28 136,16 158,24 176,12 198,18 220,8 240,14",
    steps: [
      { label: "USDC sent to vault", done: true },
      { label: "Claim minted on Solana", done: true },
      { label: "Held in your wallet", done: true },
    ],
  },
  {
    id: "pricing",
    status: "Official close",
    action: "Review price",
    note: "Order price is the latest official US market close.",
    pay: "Close $198.42",
    receive: "Locked quote",
    chart: "0,40 24,40 48,28 72,28 96,18 120,18 144,30 168,30 192,14 216,14 240,22",
    steps: [
      { label: "US close ingested", done: true },
      { label: "Price locked at $198.42", done: true },
      { label: "Shown before signing", done: false },
    ],
  },
  {
    id: "frozen",
    status: "Frozen",
    action: "Hold claim",
    note: "The claim cannot be transferred to another wallet.",
    pay: "0.504 AAPL",
    receive: "Non-transferable",
    chart: "0,24 30,24 50,36 80,36 110,20 140,20 170,32 200,32 240,18",
    steps: [
      { label: "Transfer blocked", done: true },
      { label: "Wallet-bound claim", done: true },
      { label: "Sell burns back to USDC", done: false },
    ],
  },
  {
    id: "rights",
    status: "Not a share",
    action: "Claim only",
    note: "No company ownership, voting rights, or dividends.",
    pay: "Price-linked",
    receive: "Vault claim",
    chart: "0,50 28,44 56,48 84,36 112,40 140,26 168,30 196,16 224,20 240,12",
    steps: [
      { label: "No voting rights", done: true },
      { label: "No dividends", done: true },
      { label: "Price-linked claim only", done: true },
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
      const next = scenePos.current + (target - scenePos.current) * 0.16
      scenePos.current = Math.abs(next - target) < 0.004 ? target : next
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

  return (
    <section ref={sectionRef} id="about" className="relative h-[320vh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:28px_28px] lg:block"
        />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 pt-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-6 flex items-center gap-2">
              <Info className="h-5 w-5 text-accent" strokeWidth={2} />
              <span className="text-sm font-medium text-foreground/70">ASSET STRUCTURE</span>
            </div>

            <h2 className="text-balance font-serif text-3xl leading-tight text-foreground md:text-[34px]">
              Know exactly what you hold.
            </h2>

            <p className="mt-5 max-w-xl text-foreground/70">
              A Lokgi token is a frozen, non-transferable claim against USDC held in the Lokgi Solana vault.
            </p>

            <div className="mt-8 flex items-center gap-2" aria-hidden="true">
              {scenes.map((scene, index) => {
                const proximity = Math.max(0, 1 - Math.abs(visual - index))
                return (
                  <span
                    key={scene.id}
                    className="h-1 rounded-full bg-foreground/15"
                    style={{ width: 16 + proximity * 16, backgroundColor: `rgba(0,0,0,${0.15 + proximity * 0.85})` }}
                  />
                )
              })}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[min(64vw,250px)] drop-shadow-[0_22px_40px_rgba(0,0,0,0.16)] lg:w-[min(22vw,270px)]">
              <img
                src="/images/iphone-frame.png"
                alt=""
                className="pointer-events-none relative z-10 block h-auto w-full select-none"
              />
              <div className="absolute inset-x-[5.8%] bottom-[2.5%] top-[7.6%] z-20 overflow-hidden rounded-[2.15rem] bg-white">
                <div className="flex h-full flex-col px-3.5 pb-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <SolanaMark id="lokgi-solana-header" className="h-7 w-7" />
                      <div>
                        <p className="text-[12px] font-semibold leading-none text-foreground">Solana</p>
                        <p className="mt-1 text-[9px] leading-none text-foreground/45">Mainnet · Demo</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-black px-2 py-1 text-[9px] font-medium text-white">
                      8xK2…4fQa
                    </span>
                  </div>

                  <div className="relative mt-3 min-h-0 flex-1">
                    {scenes.map((scene, index) => {
                      const opacity = Math.max(0, 1 - Math.abs(visual - index))
                      return (
                      <div
                        key={scene.id}
                        className={`absolute inset-0 flex flex-col ${opacity < 0.5 ? "pointer-events-none" : ""}`}
                        style={{ opacity }}
                        aria-hidden={opacity < 0.5}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[11px] font-medium text-foreground/45">AAPL · Apple</p>
                            <p className="mt-0.5 text-[26px] font-semibold leading-none tracking-tight text-foreground">
                              $198.42
                            </p>
                          </div>
                          <span className="rounded-full bg-[#14F195]/20 px-2 py-1 text-[10px] font-semibold text-[#0a7a4b]">
                            {scene.status}
                          </span>
                        </div>
                        <p className="mt-1 text-[10px] leading-4 text-foreground/45">{scene.note}</p>

                        <svg viewBox="0 0 240 72" className="mt-2 h-14 w-full shrink-0" aria-hidden="true">
                          <polyline
                            fill="none"
                            stroke="#111"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            points={scene.chart}
                          />
                        </svg>

                        <div className="mt-1 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
                          <div className="mb-2 flex items-center justify-between">
                            <p className="text-[12px] font-semibold text-foreground">{scene.action}</p>
                            <span className="text-[10px] text-foreground/40">0.10% fee</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div className="rounded-xl bg-[#f4f4f2] px-2.5 py-2">
                              <p className="text-[9px] uppercase tracking-wide text-foreground/40">You pay</p>
                              <p className="mt-0.5 font-semibold text-foreground">{scene.pay}</p>
                            </div>
                            <div className="rounded-xl bg-[#f4f4f2] px-2.5 py-2">
                              <p className="text-[9px] uppercase tracking-wide text-foreground/40">You receive</p>
                              <p className="mt-0.5 font-semibold text-foreground">{scene.receive}</p>
                            </div>
                          </div>
                        </div>

                        <ul className="mt-2.5 space-y-1.5 px-0.5">
                          {scene.steps.map((step) => (
                            <li key={step.label} className="flex items-center gap-2">
                              <span
                                className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${
                                  step.done ? "bg-black text-white" : "border border-foreground/25"
                                }`}
                              >
                                {step.done ? <Check className="h-2 w-2" strokeWidth={3} /> : null}
                              </span>
                              <span className={`text-[11px] ${step.done ? "text-foreground" : "text-foreground/40"}`}>
                                {step.label}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto flex items-center justify-center gap-1.5 rounded-full bg-black py-2.5 text-[11px] font-medium text-white">
                          <SolanaMark id={`lokgi-solana-${scene.id}`} className="h-4 w-4" />
                          Sign on Solana
                        </div>
                      </div>
                      )
                    })}
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
