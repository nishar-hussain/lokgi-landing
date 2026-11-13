import { ArrowUpRight, BarChart3, ShieldCheck } from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Listings", value: "US", note: "Search the US directory" },
  { label: "Tradable names", value: "24", note: "A mint and an order ticket" },
  { label: "Settlement", value: "Devnet", note: "Solana devnet. Devnet USDC." },
  { label: "What you hold", value: "USDC", note: "Frozen claim on the vault" },
  { label: "Order price", value: "Close", note: "Last completed US session" },
  { label: "Fee", value: "0.10%", note: "$1 to $10,000 an order" },
]

export default function Stats() {
  return (
    <section data-header="dark" className="bg-black px-6 py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-2 text-white/70">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.7} />
              <span className="text-sm font-medium uppercase tracking-[0.14em]">Know what you hold</span>
            </div>
            <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.04em] md:text-5xl">The desk, in six facts.</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/60">A US listing, a labelled close, and a frozen claim on devnet. The chain shows whether USDC moved. The book records the fill only after that.</p>
          </div>
          <Link href="/risk-disclosure" className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/80">
            Read the risk disclosure <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid border-l border-t border-white/20 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="group min-h-52 border-b border-r border-white/20 p-7 transition-colors hover:bg-white hover:text-black md:min-h-64 md:p-9">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-white/50 transition-colors group-hover:text-black/55">{stat.label}</p>
                <BarChart3 className="h-4 w-4 text-white/35 transition-colors group-hover:text-black/40" />
              </div>
              <p className="mt-8 text-5xl font-medium tracking-[-0.05em] md:text-6xl lg:text-7xl">{stat.value}</p>
              <p className="mt-3 text-sm text-white/50 transition-colors group-hover:text-black/55">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
