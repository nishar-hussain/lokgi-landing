import { ArrowUpRight } from "lucide-react"
const companies = [
  { name: "Apple", ticker: "AAPL", sector: "Technology", icon: "simple-icons:apple", color: "ffffff", tone: "bg-black" },
  { name: "Microsoft", ticker: "MSFT", sector: "Technology", icon: "logos:microsoft-icon", tone: "bg-[#eef1f7]" },
  { name: "NVIDIA", ticker: "NVDA", sector: "Technology", icon: "simple-icons:nvidia", color: "ffffff", tone: "bg-[#76b900]" },
  { name: "Amazon", ticker: "AMZN", sector: "Consumer", icon: "simple-icons:amazon", color: "111111", tone: "bg-white" },
  { name: "Alphabet", ticker: "GOOGL", sector: "Communication", icon: "logos:google-icon", tone: "bg-white" },
  { name: "Meta Platforms", ticker: "META", sector: "Communication", icon: "logos:meta-icon", tone: "bg-[#e4edf3]" },
  { name: "Tesla", ticker: "TSLA", sector: "Consumer", icon: "simple-icons:tesla", color: "ffffff", tone: "bg-[#df0000]" },
  { name: "Broadcom", ticker: "AVGO", sector: "Technology", icon: "simple-icons:broadcom", color: "ffffff", tone: "bg-[#c8102e]" },
  { name: "JPMorgan Chase", ticker: "JPM", sector: "Financials", mark: "JPM", tone: "bg-[#126bc5]" },
  { name: "Visa", ticker: "V", sector: "Financials", icon: "logos:visa", tone: "bg-[#1a36c7]" },
  { name: "Mastercard", ticker: "MA", sector: "Financials", icon: "logos:mastercard", tone: "bg-black" },
  { name: "UnitedHealth", ticker: "UNH", sector: "Health care", mark: "UNH", tone: "bg-[#0b5b8e]" },
  { name: "Johnson & Johnson", ticker: "JNJ", sector: "Health care", mark: "JNJ", tone: "bg-[#d71920]" },
  { name: "Eli Lilly", ticker: "LLY", sector: "Health care", mark: "LLY", tone: "bg-[#d52b1e]" },
  { name: "Exxon Mobil", ticker: "XOM", sector: "Energy", mark: "XOM", tone: "bg-[#ed1b2f]" },
  { name: "Walmart", ticker: "WMT", sector: "Consumer", icon: "simple-icons:walmart", color: "ffffff", tone: "bg-[#0071ce]" },
  { name: "Costco", ticker: "COST", sector: "Consumer", mark: "COST", tone: "bg-[#e31837]" },
  { name: "Home Depot", ticker: "HD", sector: "Consumer", mark: "HD", tone: "bg-[#f96302]" },
  { name: "Procter & Gamble", ticker: "PG", sector: "Consumer", mark: "PG", tone: "bg-[#003da5]" },
  { name: "Coca-Cola", ticker: "KO", sector: "Consumer", icon: "simple-icons:cocacola", color: "ffffff", tone: "bg-[#f40009]" },
  { name: "Netflix", ticker: "NFLX", sector: "Communication", icon: "simple-icons:netflix", color: "e50914", tone: "bg-black" },
]

function getLogoUrl(symbol: string) {
  const safeSymbol = symbol.replace(/[^a-zA-Z0-9]/g, "-")
  return `https://assets.parqet.com/logos/symbol/${encodeURIComponent(safeSymbol)}`
}

export default function MarketIndex() {
  return (
    <section id="market-index" className="bg-black px-6 py-12 text-white md:py-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-black text-white">
        <div className="grid lg:grid-cols-2">
          <div className="border-b border-white/15 p-7 md:p-10 lg:border-b-0 lg:border-r lg:p-12">
            <p className="text-[clamp(2.75rem,5vw,4.25rem)] font-semibold leading-[0.85] tracking-[-0.06em]">100+</p>
            <h2 className="mt-5 max-w-lg text-2xl font-medium leading-[1.05] tracking-[-0.04em] md:text-4xl">
              familiar companies.<br />one clear view.
            </h2>

            <div className="mt-12 grid grid-cols-4 gap-3 sm:grid-cols-7 sm:gap-5">
              {companies.map((company) => {
                return (
                  <div
                    key={company.name}
                    aria-label={`${company.name} · ${company.ticker} · ${company.sector} · Token · Last close`}
                    className={`group flex aspect-square items-center justify-center overflow-hidden rounded-full border border-white/10 p-0 text-center transition-transform duration-300 hover:-translate-y-1 hover:scale-105 ${company.tone}`}
                  >
                    <img
                      src={getLogoUrl(company.ticker)}
                      alt={`${company.name} (${company.ticker}) logo`}
                      loading="lazy"
                      className="h-full w-full rounded-full object-contain"
                    />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative min-h-[380px] overflow-hidden p-7 md:p-10">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(90deg,transparent_0,transparent_49%,rgba(255,255,255,.1)_50%,transparent_51%),linear-gradient(180deg,transparent_0,transparent_49%,rgba(255,255,255,.08)_50%,transparent_51%)] [background-size:160px_160px]" />
            <div aria-hidden="true" className="market-scan-line pointer-events-none absolute inset-y-0 left-0 w-px bg-white/40" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              {["8%", "19%", "31%", "43%", "55%", "67%", "79%", "91%"].map((left, index) => (
                <span
                  key={left}
                  className={`market-flow-bar ${index % 3 === 1 ? "market-flow-bar-accent" : ""}`}
                  style={{
                    left,
                    height: `${110 + (index % 4) * 42}px`,
                    animationDelay: `${index * -0.7}s`,
                  }}
                />
              ))}
            </div>
            <div className="absolute right-8 top-0 h-3 w-14 rounded-b-full bg-white/80 md:right-14" />
            <div className="relative z-10 flex h-full flex-col p-1">
              <div className="flex items-start justify-between gap-6">
                <h2 className="max-w-xl text-3xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-4xl">
                  One market<br />reference.<br />Built onchain.
                </h2>
                <span className="hidden whitespace-nowrap text-right text-sm font-semibold uppercase tracking-[0.14em] text-white/50 sm:block">Lokgi<br />Markets</span>
              </div>

              <div className="mt-auto max-w-xl pt-16">
                <p className="text-sm leading-6 text-white/65 md:text-base">
                  Explore US-listed companies, compare official closing prices, and discover which assets are available as supported claims on Solana.
                </p>
                <a href="#works" className="mt-7 inline-flex items-center gap-4 rounded-full bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-black transition-transform hover:-translate-y-1">
                  Explore market <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
