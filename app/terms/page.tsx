import LegalPage from "@/components/legal-page"

export default function TermsPage() {
  return <LegalPage
    eyebrow="LEGAL · TERMS OF SERVICE"
    title="Terms of Service"
    intro="These terms describe the basic rules for using the lokgi website and the desk at app.lokgi.com. By accessing lokgi, you agree to use the service lawfully and responsibly."
    sections={[
      { title: "1. The lokgi service", body: "lokgi is a reference desk for US-listed companies, with settlement on Solana mainnet. It shows official closing prices and lets a signed-in account buy or sell a frozen claim on a USDC vault for a name that has a Lokgi mint. Lokgi is not a broker, exchange, investment adviser, or custodian." },
      { title: "2. Mainnet settlement", body: "The current product settles on Solana mainnet with USDC. A fill moves USDC and mints or burns a frozen claim. It does not buy or sell shares, and it does not print a trade on Nasdaq or the NYSE. A claim is not equity in the referenced company and carries no dividend, vote, or right to the stock." },
      { title: "3. No investment advice", body: "Content on this site is for general information only. It is not investment, legal, tax, accounting, or financial advice, and it is not an offer or solicitation to buy or sell any security or digital asset." },
      { title: "4. Supported claims and third parties", body: "Only the names with a Lokgi mint, more than 100, can be traded. Other US symbols are reference listings. Wallet software, the price feed, and email delivery are third-party services with their own terms. Lokgi will not ask for a seed phrase." },
      { title: "5. Prohibited use", body: "You may not use lokgi to violate applicable law, misrepresent your identity, interfere with the service, attempt unauthorized access, or engage in fraud, market manipulation, money laundering, or sanctions evasion." },
      { title: "6. Changes and availability", body: "We may update, suspend, or discontinue features, content, or access. Market data, token information, liquidity, and blockchain services may be delayed, unavailable, or inaccurate." },
    ]}
  />
}
