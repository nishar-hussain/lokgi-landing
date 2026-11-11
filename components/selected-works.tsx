"use client"

import { ArrowRight, Briefcase, Plus } from "lucide-react"
import { useState } from "react"

const panels = [
  {
    title: "Discover the companies behind the market",
    eyebrow: "US MARKET OVERVIEW · OFFICIAL CLOSE",
    body: "Explore US-listed companies, review historical price movements, and compare stock-market reference prices. Other companies remain reference-only until an onchain claim is available.",
  },
  {
    title: "Wallet-authorized settlement",
    eyebrow: "SOLANA MAINNET · SUPPORTED CLAIMS",
    body: "Connect a compatible Solana wallet and authorize supported buy or sell orders against the Lokgi USDC vault.",
  },
  {
    title: "Understand the claim",
    eyebrow: "NON-TRANSFERABLE · USDC VAULT · DISCLOSURES",
    body: "Lokgi claims are not company shares. Review the vault structure, price source, transfer restrictions, fees, limits, and demo status before trading.",
  },
]

export default function SelectedWorks() {
  const [openPanel, setOpenPanel] = useState(-1)

  return (
    <section id="works" className="bg-background px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-5xl">
          <div className="mb-5 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-accent" strokeWidth={2} />
            <span className="text-sm font-medium uppercase tracking-[0.14em] text-foreground/70">MARKET EXPLORER · LAST OFFICIAL CLOSE</span>
          </div>
          <h2 className="max-w-3xl text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground md:text-4xl">
            Explore US stocks with context.
          </h2>
        </div>

        <div className="space-y-3">
          {panels.map((panel, index) => {
            const isOpen = openPanel === index
            return (
              <article
                key={panel.title}
                className="group overflow-hidden rounded-br-[2.5rem] bg-[#f0f2f4] text-[#102326] transition-colors duration-500 hover:bg-black hover:text-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenPanel(isOpen ? -1 : index)}
                  className="flex w-full items-start justify-between gap-5 px-6 py-6 text-left md:px-8 md:py-7"
                  aria-expanded={isOpen}
                >
                  <span>
                    <span className="block text-xl font-medium tracking-[-0.03em] md:text-2xl">{panel.title}</span>
                    <span className="mt-4 block text-xs font-semibold tracking-[0.14em] text-[#52646b] transition-colors duration-500 group-hover:text-[#7d9298]">{panel.eyebrow}</span>
                  </span>
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#52646b] text-[#102326] transition-colors duration-500 group-hover:border-white/40 group-hover:text-white">
                    <Plus className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} size={20} strokeWidth={1.5} />
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="min-h-0 overflow-hidden px-7 md:px-11">
                    <div className="max-w-2xl pb-10">
                      <p className="text-base leading-7 text-[#52646b] transition-colors duration-500 group-hover:text-white/70">{panel.body}</p>
                      <a href="#contact" className="mt-6 inline-flex items-center gap-3 rounded-md border border-[#238b79] px-5 py-3 text-xs font-bold uppercase tracking-[0.13em] text-[#238b79] transition-colors duration-500 hover:opacity-80 group-hover:border-[#40d6b4] group-hover:bg-[#40d6b4] group-hover:text-[#102326]">
                        Explore details <ArrowRight size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
