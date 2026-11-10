"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  Check,
  CircleDollarSign,
  Info,
  Scale,
  ShieldCheck,
  Snowflake,
} from "lucide-react"

const features = [
  {
    id: "vault",
    title: "Vault Claim",
    description:
      "A buy transfers USDC into the program-controlled vault and mints a claim. A sale burns the claim and returns applicable USDC proceeds, subject to vault liquidity.",
    href: "/risk-disclosure",
    icon: CircleDollarSign,
    preview: {
      action: "Buy claim",
      status: "Vault settlement",
      steps: [
        { label: "USDC sent to vault", done: true },
        { label: "Claim minted on Solana", done: true },
        { label: "Held in your wallet", done: true },
      ],
    },
  },
  {
    id: "pricing",
    title: "Official Pricing",
    description:
      "Every Lokgi claim price is derived from the latest official US market close. Review verified closing prices before you buy or sell supported claims.",
    href: "#works",
    icon: Scale,
    preview: {
      action: "Review price",
      status: "Official close",
      steps: [
        { label: "US close ingested", done: true },
        { label: "Price locked at $198.42", done: true },
        { label: "Shown before signing", done: false },
      ],
    },
  },
  {
    id: "frozen",
    title: "Frozen Tokens",
    description:
      "Claims remain frozen and cannot be transferred to another wallet. A Lokgi token is a non-transferable claim against USDC held in the Lokgi Solana vault.",
    href: "/risk-disclosure",
    icon: Snowflake,
    preview: {
      action: "Hold claim",
      status: "Frozen",
      steps: [
        { label: "Transfer blocked", done: true },
        { label: "Wallet-bound claim", done: true },
        { label: "Sell burns back to USDC", done: false },
      ],
    },
  },
  {
    id: "rights",
    title: "No Ownership Rights",
    description:
      "It is not a share and does not provide company ownership, voting rights, or dividends. Know exactly what you hold before you trade.",
    href: "/risk-disclosure",
    icon: ShieldCheck,
    preview: {
      action: "Claim only",
      status: "Not a share",
      steps: [
        { label: "No voting rights", done: true },
        { label: "No dividends", done: true },
        { label: "Price-linked claim only", done: true },
      ],
    },
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
  const [activeId, setActiveId] = useState(features[0].id)
  const active = features.find((feature) => feature.id === activeId) ?? features[0]

  return (
    <section id="about" className="relative overflow-hidden py-16 px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:28px_28px] lg:block"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-6 flex items-center gap-2">
              <Info className="h-5 w-5 text-accent" strokeWidth={2} />
              <span className="text-sm font-medium text-foreground/70">ASSET STRUCTURE</span>
            </div>

            <h2 className="text-balance font-serif text-3xl leading-tight text-foreground md:text-4xl">
              Know exactly what you hold.
            </h2>

            <p className="mt-5 max-w-xl text-foreground/70">
              A Lokgi token is a frozen, non-transferable claim against USDC held in the Lokgi Solana vault.
            </p>

            <div className="mt-10 space-y-1">
              {features.map((feature) => {
                const Icon = feature.icon
                const isActive = feature.id === activeId

                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => setActiveId(feature.id)}
                    className={`w-full max-w-md text-left transition-all duration-300 ${
                      isActive
                        ? "rounded-2xl bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] ring-1 ring-black/5"
                        : "rounded-2xl px-5 py-4 hover:bg-black/[0.02]"
                    }`}
                  >
                    <div className={`flex items-center gap-3 ${isActive ? "mb-3" : ""}`}>
                      <Icon
                        className={`h-5 w-5 shrink-0 ${isActive ? "text-foreground" : "text-foreground/35"}`}
                        strokeWidth={1.75}
                      />
                      <span
                        className={`text-[15px] ${
                          isActive ? "font-semibold text-foreground" : "font-medium text-foreground/40"
                        }`}
                      >
                        {feature.title}
                      </span>
                    </div>

                    {isActive ? (
                      <div className="animate-in fade-in slide-in-from-top-1 duration-300">
                        <p className="pl-8 text-sm leading-6 text-foreground/65">{feature.description}</p>
                        <Link
                          href={feature.href}
                          className="mt-4 inline-flex items-center gap-1.5 pl-8 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                          onClick={(event) => event.stopPropagation()}
                        >
                          Learn more
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end lg:pt-4">
            <div className="relative w-full max-w-[340px] drop-shadow-[0_28px_50px_rgba(0,0,0,0.18)]">
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

                  <div key={active.id} className="mt-3 flex min-h-0 flex-1 flex-col animate-in fade-in duration-300">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[11px] font-medium text-foreground/45">AAPL · Apple</p>
                        <p className="mt-0.5 text-[28px] font-semibold leading-none tracking-tight text-foreground">
                          $198.42
                        </p>
                      </div>
                      <span className="rounded-full bg-[#14F195]/20 px-2 py-1 text-[10px] font-semibold text-[#0a7a4b]">
                        {active.preview.status}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-foreground/45">Official US close · USDC vault</p>

                    <svg viewBox="0 0 240 72" className="mt-3 h-20 w-full" aria-hidden="true">
                      <polyline
                        fill="none"
                        stroke="#111"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        points="0,46 22,42 40,48 58,34 78,38 96,22 118,28 136,16 158,24 176,12 198,18 220,8 240,14"
                      />
                    </svg>

                    <div className="mt-1 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-[12px] font-semibold text-foreground">{active.preview.action}</p>
                        <span className="text-[10px] text-foreground/40">0.10% fee</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="rounded-xl bg-[#f4f4f2] px-2.5 py-2">
                          <p className="text-[9px] uppercase tracking-wide text-foreground/40">You pay</p>
                          <p className="mt-0.5 font-semibold text-foreground">100 USDC</p>
                        </div>
                        <div className="rounded-xl bg-[#f4f4f2] px-2.5 py-2">
                          <p className="text-[9px] uppercase tracking-wide text-foreground/40">You receive</p>
                          <p className="mt-0.5 font-semibold text-foreground">0.504 AAPL</p>
                        </div>
                      </div>
                      <div className="mt-2.5 flex gap-1.5">
                        <span className="flex-1 rounded-full bg-black py-1.5 text-center text-[11px] font-medium text-white">
                          Buy
                        </span>
                        <span className="flex-1 rounded-full bg-[#f4f4f2] py-1.5 text-center text-[11px] font-medium text-foreground/70">
                          Sell
                        </span>
                      </div>
                    </div>

                    <ul className="mt-2.5 space-y-1.5 px-0.5">
                      {active.preview.steps.map((step) => (
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
                      <SolanaMark id="lokgi-solana-cta" className="h-4 w-4" />
                      Sign on Solana
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
