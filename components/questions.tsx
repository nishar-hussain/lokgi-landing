"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

const questions = [
  {
    q: "What is Lokgi?",
    a: "Lokgi is a Solana-based US equity reference desk and an educational demo, not a brokerage. You can explore US-listed companies and review frozen, non-transferable claims against a USDC vault.",
  },
  {
    q: "What is a Lokgi claim?",
    a: "A claim is a frozen, non-transferable token against USDC held in the Lokgi Solana vault. Buying sends USDC in and mints the claim. Selling burns the claim back to USDC.",
  },
  {
    q: "Does Lokgi hold the stock?",
    a: "No. The claim is against USDC in the vault. You do not receive company ownership, voting rights, dividends, or a right to the shares.",
  },
  {
    q: "What does an order cost?",
    a: "The platform fee is 0.10%. Orders are priced in USDC at the latest official close. The minimum is $1, the maximum is $10,000, daily notional is $25,000, and a quote lasts 60 seconds.",
  },
  {
    q: "Which names can I trade?",
    a: "24 names are supported as onchain claims. Other US-listed companies stay reference-only until a claim is available.",
  },
  {
    q: "What happens in demo mode?",
    a: "You can connect a wallet, review a quote, and walk through authorization. Demo orders are simulated. They do not buy or sell shares or execute a live stock trade.",
  },
  {
    q: "How do I authorize an order?",
    a: "Lokgi prepares the order and shows the quote. Your wallet signs it. The Solana program verifies it before confirmation. Lokgi never asks for a seed phrase.",
  },
]

export default function Questions() {
  const [open, setOpen] = useState(-1)

  return (
    <section id="questions" className="bg-[#f6f5f1] px-6 py-20 text-[#141414] md:py-24">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#141414]/45">Questions</p>
            <h2 className="mt-4 max-w-md text-4xl font-medium leading-[1.02] tracking-[-0.04em] md:text-5xl lg:text-[2.75rem]">
              Questions before you sign.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[#141414]/55 md:text-base">
              More in the{" "}
              <Link href="/docs" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[#141414]">
                docs
              </Link>{" "}
              or the{" "}
              <Link href="/risk-disclosure" className="underline underline-offset-4 hover:text-[#141414]">
                risk disclosure
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="border-t border-[#141414]/12">
          {questions.map((item, index) => {
            const isOpen = open === index
            return (
              <div key={item.q} className="border-b border-[#141414]/12">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-lg font-medium leading-7 tracking-[-0.02em] md:text-xl">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#141414]/45 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    strokeWidth={1.75}
                  />
                </button>
                <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="min-h-0 overflow-hidden">
                    <p className="max-w-2xl pb-5 text-base leading-7 text-[#141414]/65">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
