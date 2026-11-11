"use client"

import { FormEvent, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"

const PAIR = "65m5eb4ww7w18hjq9cbzhr1gqumor8rrmh1dkp2s8wln"
const DEX_URL = `https://dexscreener.com/solana/${PAIR}`
const DEX_EMBED = `${DEX_URL}?embed=1&theme=dark&chartTheme=dark`
const PREVIEW_BALANCE = 10_000

const TERMS = [
  { days: 7, rate: 0.035 },
  { days: 30, rate: 0.15 },
  { days: 90, rate: 0.45 },
  { days: 180, rate: 0.9 },
  { days: 360, rate: 1.8 },
]

const TAPE = ["AAPL", "MSFT", "NVDA", "AMZN", "GOOGL", "META", "TSLA", "AVGO", "JPM", "V", "MA", "UNH", "JNJ", "LLY", "XOM", "WMT", "COST", "HD", "PG", "KO", "NFLX"]

type Lock = {
  id: number
  amount: number
  days: number
  rate: number
  unlockAt: number
}

function formatRate(rate: number) {
  const pct = Math.round(rate * 1000) / 10
  return Number.isInteger(pct) ? `${pct}%` : `${pct}%`
}

function formatAmount(value: number) {
  return value.toLocaleString("en-US", { maximumFractionDigits: 2 })
}

function rewardFor(amount: number, rate: number) {
  return amount * rate
}

export default function StakeDesk() {
  const [days, setDays] = useState(30)
  const [amountText, setAmountText] = useState("")
  const [balance, setBalance] = useState(PREVIEW_BALANCE)
  const [locks, setLocks] = useState<Lock[]>([])
  const [chart, setChart] = useState<"dex" | "gmgn">("dex")
  const [nextId, setNextId] = useState(1)

  const term = TERMS.find((item) => item.days === days) ?? TERMS[1]
  const amount = Number(amountText)
  const amountOk = Number.isFinite(amount) && amount > 0
  const overBalance = amountOk && amount > balance
  const reward = amountOk ? rewardFor(amount, term.rate) : 0
  const receive = amountOk ? amount + reward : 0
  const unlockAt = useMemo(() => Date.now() + term.days * 24 * 60 * 60 * 1000, [term.days])
  const totalLocked = locks.reduce((sum, lock) => sum + lock.amount, 0)

  const applyShare = (share: number) => {
    const next = Math.floor(balance * share)
    setAmountText(next > 0 ? String(next) : "")
  }

  const onLock = (event: FormEvent) => {
    event.preventDefault()
    if (!amountOk || overBalance) return
    const lockedAt = Date.now()
    setLocks((current) => [
      {
        id: nextId,
        amount,
        days: term.days,
        rate: term.rate,
        unlockAt: lockedAt + term.days * 24 * 60 * 60 * 1000,
      },
      ...current,
    ])
    setNextId((id) => id + 1)
    setBalance((current) => Math.max(0, current - amount))
    setAmountText("")
  }

  return (
    <div className="min-h-screen bg-[#070708] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070708]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 md:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold tracking-tight">
            <Image src="/images/logsi-mark.jpeg" alt="" width={28} height={28} className="h-7 w-7 rounded-md object-contain invert" />
            lokgi
          </Link>
          <p className="hidden text-sm text-white/45 lg:block">Preview a term lock. Nothing is sent.</p>
          <nav className="ml-auto flex items-center gap-5 text-sm">
            <Link href="/" className="text-white/55 hover:text-white">Market</Link>
            <Link href="/stake" className="text-white">Stake</Link>
            <Link href="/docs" target="_blank" rel="noopener noreferrer" className="hidden text-white/55 hover:text-white sm:inline">Docs</Link>
            <a href="https://app.lokgi.com" target="_blank" rel="noopener noreferrer" className="hidden rounded-full border border-white/15 px-3 py-1.5 text-white/80 hover:text-white sm:inline">Desk</a>
          </nav>
        </div>
        <div className="logo-marquee border-t border-white/10">
          <div className="logo-marquee-track gap-8 py-2 pr-8 text-xs text-white/55">
            {[...TAPE, ...TAPE].map((ticker, index) => (
              <span key={`${ticker}-${index}`} className="whitespace-nowrap">
                <span className="text-white/80">{ticker}</span>
                <span className="ml-2 text-white/35">reference</span>
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <p className="text-sm text-white/45">Lokgi staking</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-[-0.04em] md:text-5xl">Lock a preview stake. Pick a term.</h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-white/55 md:text-base">
          Choose 7, 30, 90, 180, or 360 days. The reward on each card is illustrative and is not paid. This page does not connect a wallet or send a transaction.
        </p>

        <section className="mt-8 rounded-2xl border border-white/10 bg-[#101114] p-5 md:p-6">
          <p className="text-sm text-white/45">Total staked</p>
          <p className="mt-3 text-4xl font-medium tracking-[-0.04em]">{formatAmount(totalLocked)}</p>
          <p className="mt-3 text-sm text-white/45">Preview locks on this page {formatAmount(totalLocked)}</p>
        </section>

        <div id="stake-form" className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {TERMS.map((item) => {
            const selected = item.days === term.days
            const cardReceive = amountOk ? amount + rewardFor(amount, item.rate) : 0
            return (
              <button
                key={item.days}
                type="button"
                onClick={() => setDays(item.days)}
                className={`rounded-2xl border px-4 py-5 text-left ${selected ? "border-white bg-white text-black" : "border-white/10 bg-[#101114] text-white hover:border-white/30"}`}
              >
                <p className={`text-sm ${selected ? "text-black/55" : "text-white/45"}`}>{item.days} days</p>
                <p className="mt-3 text-3xl font-medium tracking-[-0.04em]">{formatRate(item.rate)}</p>
                <p className={`mt-1 text-sm ${selected ? "text-black/55" : "text-white/45"}`}>term reward</p>
                <p className={`mt-6 text-sm ${selected ? "text-black/70" : "text-white/55"}`}>
                  {amountOk ? `${formatAmount(cardReceive)} at unlock` : "Enter an amount"}
                </p>
              </button>
            )
          })}
        </div>

        <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
          <form id="stake-lock" onSubmit={onLock} className="rounded-2xl border border-white/10 bg-[#101114] p-5 md:p-6">
            <label htmlFor="stake-amount" className="text-sm text-white/45">Amount</label>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3">
              <input
                id="stake-amount"
                inputMode="decimal"
                value={amountText}
                onChange={(event) => setAmountText(event.target.value.replace(/[^0-9.]/g, ""))}
                placeholder="0"
                className="h-14 w-full bg-transparent text-2xl text-white outline-none placeholder:text-white/25"
              />
              <div className="flex shrink-0 gap-1">
                {[
                  ["25%", 0.25],
                  ["50%", 0.5],
                  ["Max", 1],
                ].map(([label, share]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => applyShare(Number(share))}
                    className="rounded-lg px-2 py-1 text-xs text-white/55 hover:bg-white/10 hover:text-white"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm text-white/45">Preview balance {formatAmount(balance)}</p>
            {overBalance ? <p className="mt-2 text-sm text-white/70">That amount is above the preview balance.</p> : null}

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="text-white/40">
                  <tr>
                    <th className="pb-3 font-normal">Term</th>
                    <th className="pb-3 font-normal">Reward</th>
                    <th className="pb-3 font-normal">Added</th>
                    <th className="pb-3 text-right font-normal">You receive</th>
                  </tr>
                </thead>
                <tbody>
                  {TERMS.map((item) => {
                    const selected = item.days === term.days
                    const rowReward = amountOk ? rewardFor(amount, item.rate) : 0
                    const rowReceive = amountOk ? amount + rowReward : 0
                    return (
                      <tr
                        key={item.days}
                        onClick={() => setDays(item.days)}
                        className={`cursor-pointer border-t border-white/10 ${selected ? "text-white" : "text-white/55"}`}
                      >
                        <td className="py-3">{item.days} days</td>
                        <td className="py-3">{formatRate(item.rate)}</td>
                        <td className={`py-3 ${amountOk ? "text-emerald-400" : ""}`}>{amountOk ? `+${formatAmount(rowReward)}` : "—"}</td>
                        <td className="py-3 text-right">{amountOk ? formatAmount(rowReceive) : "—"}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </form>

          <aside className="rounded-2xl border border-white/10 bg-[#101114] p-5 md:p-6">
            <div className="flex items-center gap-3">
              <Image src="/images/logsi-mark.jpeg" alt="" width={36} height={36} className="h-9 w-9 rounded-lg object-contain invert" />
              <div>
                <p className="text-sm text-white/45">Ticket</p>
                <p className="text-sm">{term.days} days · {formatRate(term.rate)}</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-white/45">You receive</p>
            <p className="mt-1 text-5xl font-medium tracking-[-0.05em]">{amountOk ? formatAmount(receive) : "0"}</p>
            <p className="mt-2 text-sm text-emerald-400">{amountOk ? `+${formatAmount(reward)} reward` : "+0 reward"}</p>
            <div className="mt-6 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
              <p className="text-sm text-white/45">Unlocks</p>
              <p className="mt-1 text-sm">
                {new Date(unlockAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
              </p>
              <p className="mt-2 text-xs leading-5 text-white/40">Preview only. Principal and reward are not paid and do not leave this page.</p>
            </div>
            <button
              type="submit"
              form="stake-lock"
              disabled={!amountOk || overBalance}
              className="mt-4 h-12 w-full rounded-xl bg-white text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              {amountOk ? `Lock ${formatAmount(amount)} · ${term.days}d` : "Enter an amount"}
            </button>
            <p className="mt-3 text-xs leading-5 text-white/40">Demo preview. No wallet prompt and no token transfer.</p>
          </aside>
        </div>

        <section className="mt-4 rounded-2xl border border-white/10 bg-[#101114] p-5 md:p-6">
          <h2 className="text-sm text-white/45">Locked preview</h2>
          {locks.length === 0 ? (
            <div className="mt-4">
              <p className="text-sm text-white/80">Nothing locked yet. Pick a term and enter an amount.</p>
              <a href="#stake-form" className="mt-3 inline-block text-sm text-white underline underline-offset-4">Open staking</a>
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-white/10">
              {locks.map((lock) => (
                <li key={lock.id} className="flex flex-wrap items-baseline justify-between gap-3 py-3 text-sm">
                  <span>{formatAmount(lock.amount)} · {lock.days} days · {formatRate(lock.rate)}</span>
                  <span className="text-white/45">
                    Unlocks {new Date(lock.unlockAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-sm text-white/80">Chart</h2>
              <p className="mt-1 text-sm text-white/45">OpenGap pair on PumpSwap. DexScreener is live. GMGN is optional and not connected.</p>
            </div>
            <div className="flex rounded-full bg-white/10 p-1 text-sm">
              <button
                type="button"
                onClick={() => setChart("dex")}
                className={`rounded-full px-4 py-1.5 ${chart === "dex" ? "bg-white text-black" : "text-white/70"}`}
              >
                DexScreener
              </button>
              <button
                type="button"
                onClick={() => setChart("gmgn")}
                className={`rounded-full px-4 py-1.5 ${chart === "gmgn" ? "bg-white text-black" : "text-white/70"}`}
              >
                GMGN
              </button>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#101114]">
            {chart === "dex" ? (
              <iframe
                title="OpenGap pair on DexScreener"
                src={DEX_EMBED}
                className="h-[720px] w-full border-0"
                allow="clipboard-write"
              />
            ) : (
              <div className="flex h-[720px] flex-col items-start justify-center px-8">
                <p className="text-lg">GMGN is optional.</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/50">No GMGN chart is loaded. The live chart on this page is the OpenGap pair on DexScreener.</p>
                <button type="button" onClick={() => setChart("dex")} className="mt-6 rounded-full bg-white px-4 py-2 text-sm font-medium text-black">
                  Show DexScreener
                </button>
              </div>
            )}
          </div>
          <a href={DEX_URL} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-white/55 underline underline-offset-4 hover:text-white">
            Open DexScreener
          </a>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/" className="hover:text-white">Market</Link>
            <Link href="/stake" className="hover:text-white">Stake</Link>
            <Link href="/docs" target="_blank" rel="noopener noreferrer" className="hover:text-white">Docs</Link>
            <Link href="/risk-disclosure" className="hover:text-white">Risk disclosure</Link>
          </div>
          <p className="max-w-xl text-xs leading-5">Lokgi is an educational demo. This stake view does not lock tokens, pay rewards, or trade the charted pair.</p>
        </div>
      </footer>
    </div>
  )
}
