import { ArrowUpRight, BarChart3, ShieldCheck } from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Market reference", value: "US", note: "US-listed company context" },
  { label: "Supported claims", value: "24", note: "Available on Solana" },
  { label: "Blockchain rail", value: "SOL", note: "Solana mainnet" },
  { label: "Claim structure", value: "USDC", note: "Vault-backed and non-transferable" },
  { label: "Price source", value: "Close", note: "Latest official regular-session close" },
  { label: "Network status", value: "Demo", note: "No real assets traded" },
]

export default function Stats() {
  return (
    <section className="bg-black px-6 py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-2 text-white/70">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.7} />
              <span className="text-sm font-medium uppercase tracking-[0.14em]">Know what you hold</span>
            </div>
            <h2 className="text-3xl font-medium leading-[1.08] tracking-[-0.04em] md:text-4xl">Clear context for every supported asset.</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/60">Review stock references, claim structure, wallet requirements, price sources, and risk disclosures before you interact.</p>
          </div>
          <Link href="/risk-disclosure" className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/80">
            Read the risk disclosure <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid border-l border-t border-white/20 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="group min-h-40 border-b border-r border-white/20 p-6 transition-colors hover:bg-white hover:text-black md:p-7">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-white/50 transition-colors group-hover:text-black/55">{stat.label}</p>
                <BarChart3 className="h-4 w-4 text-white/35 transition-colors group-hover:text-black/40" />
              </div>
              <p className="mt-6 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">{stat.value}</p>
              <p className="mt-3 text-sm text-white/50 transition-colors group-hover:text-black/55">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
