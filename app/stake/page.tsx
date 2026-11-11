import type { Metadata } from "next"
import StakeDesk from "@/components/stake-desk"

export const metadata: Metadata = {
  title: "Stake — Lokgi",
  description: "Preview a Lokgi term lock. Demo only. The chart shows the OpenGap pair on DexScreener.",
}

export default function StakePage() {
  return <StakeDesk />
}
