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
        <p className="mt-8 max-w-xl text-lg leading-8 text-white/60">Lokgi is a reference desk for US-listed companies. Settlement is on Solana mainnet. A claim is frozen USDC in the vault, priced off the official close, and it is not a share of the company.</p>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/20 py-8 text-base text-white/65 md:mt-28 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span>lokgi © 2026</span>
            <Link href="/docs" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Docs</Link>
            <Link href="/litepaper" className="transition-colors hover:text-white">Litepaper</Link>
            <Link href="/terms" className="transition-colors hover:text-white">Terms of Service</Link>
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/risk-disclosure" className="transition-colors hover:text-white">Risk Disclosure</Link>
          </div>

          <p className="max-w-2xl text-sm leading-6 text-white/45">Lokgi is not a broker, exchange, custodian, or adviser. Trades use mainnet USDC. A claim pays no dividend, carries no vote, and gives no right to the stock. Read the Terms and the Risk Disclosure before you use the desk.</p>

          <div className="flex items-center gap-6 text-white/75">
            <a href="https://x.com/Lokgihq" target="_blank" rel="noreferrer" aria-label="lokgi on X" className="text-xl transition-colors hover:text-white">𝕏</a>
            <a href="https://t.me" target="_blank" rel="noreferrer" aria-label="lokgi on Telegram" className="transition-colors hover:text-white">
              <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true" fill="currentColor">
                <path d="M21.94 4.3 18.7 19.7c-.24 1.07-.88 1.33-1.78.83l-4.92-3.63-2.37 2.28c-.26.26-.48.48-.98.48l.35-4.97 9.05-8.18c.39-.35-.09-.54-.61-.19L6.2 13.3 1.4 11.8c-1.04-.33-1.06-1.04.22-1.54L20.5 2.7c.87-.32 1.63.21 1.44 1.6Z" />
              </svg>
            </a>
            <a href="https://github.com/lokgi-hq" target="_blank" rel="noreferrer" aria-label="lokgi on GitHub" className="transition-colors hover:text-white"><Github size={21} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
