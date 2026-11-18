import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, BookOpen, Github, Landmark, LineChart, LockKeyhole, Play, Presentation, Send } from "lucide-react"

const quickLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Litepaper", href: "/litepaper" },
]

const legalLinks = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Risk disclosure", href: "/risk-disclosure" },
]

const principles = [
  { icon: LineChart, title: "US listings", detail: "Official market close" },
  { icon: LockKeyhole, title: "Frozen claims", detail: "USDC held in a vault" },
  { icon: Landmark, title: "Solana", detail: "Mainnet settlement" },
]

export default function Footer() {
  return (
    <footer data-header="dark" className="border-t border-white/10 bg-[#050505] text-white">
      <div className="mx-auto max-w-[1720px] px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[minmax(300px,0.8fr)_2fr] lg:gap-20">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 transition-opacity hover:opacity-75">
              <Image src="/images/logsi-mark.jpeg" alt="" width={64} height={64} className="h-16 w-16 rounded-2xl object-contain invert" />
              <span className="text-3xl font-semibold tracking-[-0.04em]">lokgi</span>
            </Link>
            <p className="mt-6 max-w-md text-lg leading-8 text-white/55">
              A reference desk for US-listed companies. See the official close and explore claims settled on Solana.
            </p>
          </div>

          <div>
            <p className="mb-5 text-base text-white/45">Explore</p>
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-2">
              {quickLinks.map(({ label, href }) => {
                const Icon = BookOpen
                return (
                  <Link key={label} href={href} className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-5 py-3 text-base text-white/70 transition-colors hover:bg-white/[0.12] hover:text-white">
                    <Icon size={17} />{label}
                  </Link>
                )
              })}
              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-5 py-3 text-base text-white/70" aria-label="Pitch deck link coming soon">
                <Presentation size={17} />Pitch deck
              </span>
              <a href="https://drive.google.com/file/d/1QE9W9M3yy1-Zq4MTyQ_NlF-7-vJ-4xdK/view?usp=drive_link" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-5 py-3 text-base text-white/70 transition-colors hover:bg-white/[0.12] hover:text-white"><Play size={17} />Demo <ArrowUpRight size={15} /></a>
              <a href="https://x.com/Lokgihq" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-5 py-3 text-base text-white/70 transition-colors hover:bg-white/[0.12] hover:text-white"><span className="text-lg leading-none">𝕏</span>X <ArrowUpRight size={15} /></a>
              <a href="https://t.me/lokgi_com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-5 py-3 text-base text-white/70 transition-colors hover:bg-white/[0.12] hover:text-white"><Send size={16} />Telegram <ArrowUpRight size={15} /></a>
              <a href="https://github.com/lokgi-hq" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-5 py-3 text-base text-white/70 transition-colors hover:bg-white/[0.12] hover:text-white"><Github size={17} />GitHub <ArrowUpRight size={15} /></a>
            </nav>

            <p className="mb-5 mt-12 text-base text-white/45">The desk</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {principles.map(({ icon: Icon, title, detail }) => (
                <div key={title} className="flex items-center gap-4 rounded-2xl border border-white/[0.08] p-5 md:p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-white/80"><Icon size={20} /></span>
                  <span><span className="block text-base text-white/85">{title}</span><span className="mt-1 block text-sm text-white/45">{detail}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="max-w-5xl text-xs leading-6 text-white/45">
            Lokgi is not a broker, exchange, custodian, or adviser. A claim records USDC held in a vault against a name at the close used for the order. It is not a share, pays no dividend, carries no vote, and gives no right to the stock. Trades use Solana mainnet USDC. Review the risk disclosure before using the desk.
          </p>
          <div className="mt-7 flex flex-col gap-4 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-2">© 2026 Lokgi <span className="mx-1 text-white/20">·</span><Image src="/images/solana-logo.jpeg" alt="Solana" width={20} height={20} className="h-5 w-5 rounded-full object-cover" /> Mainnet Solana</span>
            <nav aria-label="Legal links" className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map(({ label, href }) => <Link key={label} href={href} className="transition-colors hover:text-white/80">{label}</Link>)}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
