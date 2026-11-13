"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

const questions = [
  {
    q: "What is Lokgi?",
    a: "Lokgi is a reference desk for US-listed companies. You look up a ticker, see a price from the official market close, and can buy or sell a frozen claim on a USDC vault. Settlement is on Solana mainnet. Lokgi is not a broker, an exchange, a custodian, or an adviser.",
  },
  {
    q: "What is a Lokgi claim?",
    a: "A claim is a record that the vault holds USDC against that name, at the close Lokgi used. Buying sends mainnet USDC in and mints the claim. Selling burns the claim and returns USDC from the vault. The token is frozen, so it cannot be sent to another wallet.",
  },
  {
    q: "Does Lokgi hold the stock?",
    a: "No. You do not receive a share of Apple, Microsoft, or any other company. A claim carries no dividend, no vote, and no right to the underlying stock. An order does not print a trade on Nasdaq or the NYSE.",
  },
  {
    q: "What does an order cost?",
    a: "The fee is 0.10%. Amounts are calculated in micro-units and the remainder is truncated. An order must be at least $1 and at most $10,000, with a $25,000 cap per account per UTC day. The preview is valid for 60 seconds. You also pay the Solana network fee in mainnet SOL.",
  },
  {
    q: "Which names can I trade?",
    a: "Twenty-four large companies, including Apple, Microsoft, and NVIDIA, have a Lokgi mint and an order ticket. Thousands of other US symbols can be searched. A reference listing shows a price and a chart, and no way to place an order.",
  },
  {
    q: "Where does the price come from?",
    a: "From the latest completed US regular session, 9:30 to 16:00 New York time, including holidays and early closes. A fresh close is labelled as the last official close. If the price source does not answer, the desk shows the last saved close and replaces the percent move with “Change unavailable.”",
  },
  {
    q: "How do I sign in and trade?",
    a: "Enter an email and a six-digit code. Then connect Phantom or Solflare and sign a message that names the wallet and a one-time nonce. That signature does not move funds. On a trade, the desk prepares the transaction, your wallet signs it, and the program checks the price before USDC moves. Lokgi never asks for a seed phrase.",
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
