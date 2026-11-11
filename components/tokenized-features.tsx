import { ArrowUpRight, ShieldCheck, Waves, Globe2 } from "lucide-react"

const features = [
  {
    icon: Globe2,
    title: "Official pricing.",
    description: "Review verified US market prices based on the latest official closing price used for every demo order.",
    className: "bg-[#21003e] text-[#d3a4ff]",
    art: "dots",
  },
  {
    icon: Waves,
    title: "Solana integration.",
    description: "Connect a Solana wallet to review and authorize orders before they are prepared for onchain settlement.",
    className: "bg-[#00352d] text-[#6ce0b0]",
    art: "bars",
  },
  {
    icon: ShieldCheck,
    title: "Verifiable settlement.",
    description: "Each order is prepared by Lokgi, signed by your wallet, and verified by the Solana program before confirmation.",
    className: "bg-[#0b1c3c] text-[#8bb8ff]",
    art: "squares",
  },
]

export default function TokenizedFeatures() {
  return (
    <section id="tokenized-stocks" className="bg-black px-6 py-16 text-white md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto mb-12 max-w-2xl text-center text-3xl font-medium leading-[1.05] tracking-[-0.04em] md:text-4xl">
          Market discovery, onchain settlement.
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <article key={feature.title} className={`group relative min-h-[380px] overflow-hidden rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-2 md:p-8 ${feature.className}`}>
                <div className="relative z-10 flex h-full flex-col">
                  <Icon className="mb-6 h-6 w-6 text-current" strokeWidth={1.5} />
                  <h3 className="max-w-md whitespace-pre-line text-2xl font-medium leading-[1.1] tracking-[-0.03em]">{feature.title}</h3>
                  <p className="mt-8 max-w-sm text-base leading-7 text-current/80">{feature.description}</p>
                  <a href="#about" className="mt-auto inline-flex w-fit items-center gap-2 pt-10 text-sm font-semibold text-white/90 transition-colors hover:text-white">
                    Learn more <ArrowUpRight size={16} />
                  </a>
                </div>
                <div aria-hidden="true" className={`pointer-events-none absolute -bottom-2 left-0 right-0 z-0 h-56 transition-transform duration-700 group-hover:scale-105 ${feature.art === "dots" ? "feature-dots" : feature.art === "bars" ? "feature-bars" : "feature-squares"}`} />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
