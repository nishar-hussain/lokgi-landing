import type { Metadata } from "next"
import type { ReactNode } from "react"
import DocsShell from "@/components/docs/docs-shell"

export const metadata: Metadata = {
  title: "Lokgi Docs",
  description: "How the Lokgi desk prices a US close, settles a frozen claim on Solana mainnet, and books the fill.",
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <DocsShell>{children}</DocsShell>
}
