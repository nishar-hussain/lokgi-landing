import type { Metadata } from "next"
import type { ReactNode } from "react"
import DocsShell from "@/components/docs/docs-shell"

export const metadata: Metadata = {
  title: "Lokgi Docs",
  description: "Guides for Lokgi claims, official closes, wallet settlement, and demo trading on Solana.",
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <DocsShell>{children}</DocsShell>
}
