import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, BookOpen } from "lucide-react"

const articles = [
  {
    category: "Claim structure",
    date: "Guide",
    title: "What Lokgi claims are and how their rights differ",
    image: "/images/vision-ai.png",
    href: "#about",
  },
  {
    category: "Solana",
    date: "Guide",
    title: "How Solana supports verifiable settlement",
    image: "/images/chat.png",
    href: "#services",
  },
  {
    category: "Risk",
    date: "Guide",
    title: "Prices, liquidity, and claim risks to understand",
    image: "/images/motion-ai.png",
    href: "#blog",
  },
]

export default function LatestArticles() {
  return (
    <section id="blog" className="bg-black px-6 py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-white/65">
              <BookOpen className="h-5 w-5" strokeWidth={1.7} />
              <span className="text-sm font-medium uppercase tracking-[0.14em]">Learn before you trade</span>
            </div>
            <h2 className="max-w-2xl text-3xl font-medium leading-[1.08] tracking-[-0.04em] md:text-4xl">Understand the market and the asset.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/55">Clear guides to official closing prices, onchain settlement, non-transferable claims, and the risks behind every trade.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((article, index) => (
            <Link key={index} href={article.href} className="group rounded-2xl border border-white/15 bg-[#151515] p-3 transition-colors duration-300 hover:border-white/50">
              <div className="relative mb-5 aspect-[1.45] overflow-hidden rounded-xl bg-[#242424]">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-2 pb-2">
                <div className="flex items-center gap-3 text-xs text-white/50">
                  <span className="rounded-full border border-white/20 px-3 py-1 text-white/75">{article.category}</span>
                  <span>{article.date}</span>
                </div>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-white/70 transition-colors group-hover:bg-white group-hover:text-black"><ArrowUpRight size={15} /></span>
              </div>
              <h3 className="px-2 pb-4 pt-3 text-lg font-medium leading-6 text-white transition-colors group-hover:text-white/70">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
