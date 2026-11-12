import Link from "next/link"
import Image from "next/image"
import { Github } from "lucide-react"

export default function Footer() {
  return (
    <footer data-header="dark" className="bg-[#050505] text-white">
      <div className="mx-auto max-w-[1600px] px-6 pt-20 md:px-10 md:pt-24">
        <Link
          href="/"
          className="block overflow-visible text-[clamp(5.5rem,16vw,16rem)] font-medium leading-[0.85] tracking-[-0.06em] text-white transition-opacity hover:opacity-80"
        >
          <span className="flex items-center gap-6">
            <Image src="/images/logsi-mark.jpeg" alt="lokgi mark" width={220} height={220} className="h-[clamp(4rem,8vw,9rem)] w-[clamp(4rem,8vw,9rem)] rounded-2xl object-contain invert" />
            <span>lokgi</span>
          </span>
        </Link>
        <p className="mt-8 max-w-xl text-lg leading-8 text-white/60">Lokgi is a Solana-based US equity reference desk for exploring US-listed companies and trading frozen, non-transferable claims against a USDC vault at the latest official close.</p>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/20 py-8 text-base text-white/65 md:mt-28 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span>lokgi © 2026</span>
            <Link href="/stake" className="transition-colors hover:text-white">Stake</Link>
            <Link href="/docs" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Docs</Link>
            <Link href="/terms" className="transition-colors hover:text-white">Terms of Service</Link>
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/risk-disclosure" className="transition-colors hover:text-white">Risk Disclosure</Link>
          </div>

          <p className="max-w-2xl text-sm leading-6 text-white/45">Lokgi is an educational demo platform, not a brokerage or investment service. Its claims are against a USDC vault, not shares in US companies. Demo orders do not execute real trades. Read the Terms and Risk Disclosure before using the platform.</p>

          <div className="flex items-center gap-6 text-white/75">
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="lokgi on X" className="text-xl transition-colors hover:text-white">𝕏</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="lokgi on GitHub" className="transition-colors hover:text-white"><Github size={21} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
