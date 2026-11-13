import LegalPage from "@/components/legal-page"

export default function RiskDisclosurePage() {
  return <LegalPage
    eyebrow="LEGAL · RISK DISCLOSURE"
    title="Risk Disclosure"
    intro="Lokgi settles frozen, non-transferable claims on Solana devnet. Prices come from the latest completed US regular-session close. A claim is not a share in the referenced company. The risks below are not exhaustive."
    sections={[
      { title: "Underlying-market risk", body: "US stock prices can rise or fall, sometimes rapidly. The order price is a close, not a live bid or offer, unless a live snapshot is explicitly labelled. A later market print can differ from the close you traded." },
      { title: "Claim structure and rights", body: "A Lokgi claim records USDC in the vault against a name at the close Lokgi used. It does not provide company ownership, voting rights, dividends, or a right to receive the shares." },
      { title: "Devnet and asset risk", body: "Settlement uses Solana devnet and devnet USDC. Devnet assets are not mainnet assets. A mainnet program is not part of the current product. Treat balances as devnet balances." },
      { title: "Price and stale-data risk", body: "If the price source does not answer, the desk can show a previously stored close and mark the move unavailable. The API refuses an order on a stale price or a price older than a few days. A displayed price more than 100 basis points from the server price is rejected. A preview expires in 60 seconds." },
      { title: "Vault and execution risk", body: "A sale returns USDC from the vault only if the program accepts the transaction. Size limits apply: at least $1, at most $10,000 an order, and $25,000 per account per UTC day. Amounts are truncated to six decimal places." },
      { title: "Blockchain and wallet risk", body: "You pay the network fee in devnet SOL. A confirmed transaction is not something the desk can silently undo. Program, network, wallet, and phishing failures can delay or lose a transaction. Never share a seed phrase. Signing the login message does not move funds. Signing a trade does." },
      { title: "Regulatory and jurisdictional risk", body: "Availability, tax treatment, and legal protections may vary by jurisdiction and may change. Do not use the desk where doing so is not permitted. Nothing here is investment, legal, or tax advice." },
    ]}
  />
}
