const tape = [
  { symbol: "NFLX", price: 742.1, change: 1.9 },
  { symbol: "LLY", price: 812.4, change: -0.8 },
  { symbol: "MA", price: 498.22, change: 0.6 },
  { symbol: "UNH", price: 542.7, change: -1.4 },
  { symbol: "JNJ", price: 162.35, change: 0.3 },
  { symbol: "XOM", price: 118.64, change: -0.9 },
  { symbol: "WMT", price: 86.42, change: 1.1 },
  { symbol: "COST", price: 912.18, change: 0.5 },
]

function formatPrice(price: number) {
  return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function Quote({ symbol, price, change }: { symbol: string; price: number; change: number }) {
  const up = change > 0
  return (
    <span className="flex items-baseline gap-2 whitespace-nowrap text-[13px] leading-none">
      <span className="font-medium tracking-tight text-white">{symbol}</span>
      <span className="text-white/85">${formatPrice(price)}</span>
      <span className={up ? "text-[#3dde84]" : "text-[#ff5d5d]"}>
        {up ? "+" : ""}
        {change.toFixed(1)}%
      </span>
    </span>
  )
}

export default function MarketTape() {
  const items = [...tape, ...tape]
  return (
    <div data-header="dark" className="mt-[5.25rem] overflow-hidden bg-black text-white" aria-label="Latest closes">
      <div className="market-tape-track gap-8 py-2.5 pr-8">
        {items.map((quote, index) => (
          <Quote key={`${quote.symbol}-${index}`} {...quote} />
        ))}
      </div>
    </div>
  )
}
