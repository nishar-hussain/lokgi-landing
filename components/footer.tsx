import Link from "next/link"
import Image from "next/image"
import { Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white">
      <div className="mx-auto max-w-6xl px-6 pt-14 md:px-10 md:pt-16">
        <Link
          href="/"
          className="block overflow-visible text-[clamp(3.25rem,10vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-white transition-opacity hover:opacity-80"
        >
          <span className="flex items-center gap-4">
            <Image src="/images/logsi-mark.jpeg" alt="lokgi mark" width={120} height={120} className="h-[clamp(2.25rem,5vw,5rem)] w-[clamp(2.25rem,5vw,5rem)] rounded-xl object-contain invert" />
            <span>lokgi</span>
          </span>
        </Link>
        <p className="mt-6 max-w-md text-sm leading-6 text-white/60">Lokgi is a Solana-based US equity reference desk for exploring US-listed companies and trading frozen, non-transferable claims against a USDC vault at the latest official close.</p>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/20 py-7 text-sm text-white/65 md:mt-24 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span>lokgi © 2026</span>
            <Link href="/terms" className="transition-colors hover:text-white">Terms of Service</Link>
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/risk-disclosure" className="transition-colors hover:text-white">Risk Disclosure</Link>
          </div>

          <p className="max-w-2xl text-xs leading-5 text-white/45">Lokgi is an educational demo platform, not a brokerage or investment service. Its claims are against a USDC vault, not shares in US companies. Demo orders do not execute real trades. Read the Terms and Risk Disclosure before using the platform.</p>

          <div className="flex items-center gap-6 text-white/75">
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="lokgi on X" className="text-xl transition-colors hover:text-white">𝕏</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="lokgi on GitHub" className="transition-colors hover:text-white"><Github size={21} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
