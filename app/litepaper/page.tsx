import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Database, FileCheck2, Monitor, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Lokgi litepaper",
  description: "How a Lokgi claim is priced off the official US close, how the 0.10% fee is truncated, and how a fill is booked on Solana mainnet.",
}

const contents = [
  ["01", "The problem", "problem"],
  ["02", "The claim", "claim"],
  ["03", "Architecture", "architecture"],
  ["04", "The close", "close"],
  ["05", "The price check", "price"],
  ["06", "Fee and quantity", "fee"],
  ["07", "A worked buy", "example"],
  ["08", "Limits", "limits"],
  ["09", "Settlement", "settlement"],
  ["10", "Holdings", "holdings"],
  ["11", "Scope", "scope"],
] as const

function Eq({ kicker, lines }: { kicker: string; lines: string[] }) {
  return (
    <figure className="my-8 border-y border-black/10 py-5">
      <figcaption className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/45">{kicker}</figcaption>
      <pre className="mt-3 overflow-x-auto font-sans text-[15px] leading-8 tracking-[-0.03em] text-foreground">{lines.join("\n")}</pre>
    </figure>
  )
}

export default function LitepaperPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-medium tracking-[-0.03em]">
            <Image src="/images/logsi-mark.jpeg" alt="" width={28} height={28} className="h-7 w-7 rounded-md object-contain" />
            lokgi
          </Link>
          <div className="flex items-center gap-6 text-sm text-foreground/60">
            <Link href="/docs" className="hover:text-foreground">Docs</Link>
            <Link href="/" className="hover:text-foreground">← Back to site</Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-16 lg:grid-cols-[180px_minmax(0,1fr)] lg:py-20">
        <nav aria-label="Contents" className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/40">Contents</p>
          <ol className="mt-5 space-y-2.5">
            {contents.map(([num, label, id]) => (
              <li key={id}>
                <a href={`#${id}`} className="flex gap-3 text-sm text-foreground/55 hover:text-foreground">
                  <span className="w-6 tabular-nums text-foreground/35">{num}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/45">Lokgi litepaper</p>
          <h1 className="mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.04em] md:text-6xl">A reference desk for US stocks, settled on Solana.</h1>
          <p className="mt-8 text-lg leading-8 text-foreground/70">
            Lokgi shows the latest official close of a US listing and lets a signed-in account buy or sell a frozen claim on a USDC vault. The claim records USDC held against that name at the close used for the order. It is not a share of the company.
          </p>
          <p className="mt-8 border-t border-black/10 pt-4 text-sm text-foreground/50">Version 1.1 · Reviewed 16 November 2026 · Solana mainnet · USDC</p>

          <p className="mt-4 text-sm leading-6 text-foreground/60">
            The platform record dated 16 November 2026 reports initialized mainnet accounts and all 105 claim mints. Hosted deployment and a wallet-approved buy/sell with history verification remain pending. <Link href="/docs/status" className="underline underline-offset-4">Read the recorded platform status</Link>.
          </p>

          <section className="mt-10 rounded-2xl border border-black/10 p-6 md:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/45">Abstract</p>
            <p className="mt-4 text-base leading-7 text-foreground/75">
              The desk prices an order from the latest completed US regular-session close. Amounts are integers of micro-units, six decimal places, and the remainder is truncated, not rounded up. The fee is 10 basis points of the total buy debit or the gross sell value. A displayed price more than 100 basis points from the signed server price is rejected. The preview lasts 60 seconds. After the wallet signs, the program checks that signature before USDC moves. A buy mints a frozen claim. A sell burns it and returns USDC. The book records the fill only after the landed transaction has been read back.
            </p>
          </section>

          <section id="problem" className="scroll-mt-24 mt-20">
            <h2 className="text-2xl font-medium tracking-[-0.04em]"><span className="mr-3 text-foreground/35">01</span>The problem</h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-foreground/75">
              <p>A US listing has a close. A chart of that close is not a trade. People still want a way to take a price-linked position without being told they bought the stock.</p>
              <p>Lokgi keeps those two things apart. The page is a reference listing: the name, the close, the session, and a chart of the US market in New York time. An order, when one is offered, does not print on Nasdaq or the NYSE, and it does not move that chart. The thing that changes hands is USDC in a program vault, and a frozen token that records the claim.</p>
              <p>The catalog contains 105 supported claim types with initialized mainnet mints. Hosted trading verification remains pending in the platform record. The rest of the US directory can be searched. A reference listing has a price and a chart, and nothing to buy, because no claim exists for it yet.</p>
            </div>
          </section>

          <section id="claim" className="scroll-mt-24 mt-16">
            <h2 className="text-2xl font-medium tracking-[-0.04em]"><span className="mr-3 text-foreground/35">02</span>The claim</h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-foreground/75">
              <p>A Lokgi claim is a record that the vault holds USDC against a ticker, at the close used for that order. The token is frozen in the wallet that holds it. It cannot be sent onward. There is no secondary market in the token. The exit is a sell: the program burns the claim and returns USDC from the vault, subject to program checks and sufficient vault liquidity. A later price increase does not add USDC to the vault, and initialization alone does not demonstrate sufficient reserves.</p>
              <p>The holder does not receive a share of Apple, Microsoft, or any other company. A claim pays no dividend, carries no vote, and gives no right to the underlying stock. Lokgi is not a broker, an exchange, a custodian, or an adviser.</p>
            </div>
          </section>

          <section id="architecture" className="scroll-mt-24 mt-16">
            <h2 className="text-2xl font-medium tracking-[-0.04em]"><span className="mr-3 text-foreground/35">03</span>Architecture</h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-foreground/75">
              <p>The desk and the API share an origin. The browser calls that API. A first-party session cookie lasts about 30 days. Sign-in is an email and a six-digit code. Only a hash of the code is stored, and the code lasts about 10 minutes. There is no password.</p>
              <p>After the code, the account connects Phantom or Solflare and signs a message that names the wallet and a one-time nonce. That signature does not move funds. One wallet is bound to one account. A trade is a separate signature. Lokgi does not ask for a seed phrase.</p>
              <p>Three records have different jobs. The chain is the source of truth for whether USDC moved. The book is written only after that movement has been read back and checked. The screen prepares an order the program will accept. It does not choose the price.</p>
            </div>
            <figure className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-5 md:p-7">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/45">Order architecture</p>
              <div className="mt-5 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-2">
                {[
                  { icon: Monitor, title: "Desk", detail: "Builds the order" },
                  { icon: ShieldCheck, title: "Signed quote", detail: "Server price + 60s expiry" },
                  { icon: Database, title: "Solana program", detail: "Moves USDC, mints or burns" },
                  { icon: FileCheck2, title: "Verified book", detail: "Read back, then record once" },
                ].map(({ icon: Icon, title, detail }, index, steps) => (
                  <div key={title} className="contents">
                    <div className="flex min-h-[104px] flex-1 items-center gap-3 rounded-xl border border-black/10 bg-background p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/[0.04] text-foreground/70"><Icon size={19} /></span>
                      <span><span className="block text-sm font-medium">{title}</span><span className="mt-1 block text-xs leading-5 text-foreground/55">{detail}</span></span>
                    </div>
                    {index < steps.length - 1 && <ArrowRight aria-hidden="true" className="mx-auto rotate-90 text-foreground/30 md:rotate-0" size={18} />}
                  </div>
                ))}
              </div>
              <figcaption className="mt-4 text-sm leading-6 text-foreground/50">The chain confirms settlement. Lokgi writes the fill to history only after it reads back and verifies the landed transaction.</figcaption>
            </figure>
            <ol className="mt-8 divide-y divide-black/10 rounded-2xl border border-black/10">
              {[
                ["I", "Desk", "Search, the stock page, the order ticket, the portfolio, and history."],
                ["II", "Price", "The latest completed US regular-session close, labelled on the screen, and signed on the server."],
                ["III", "Program", "Checks the signed price, moves mainnet USDC, and mints or burns the frozen claim."],
                ["IV", "Book", "Books the fill once, keyed by the transaction signature, after the landed transaction is read."],
              ].map(([num, title, body]) => (
                <li key={num} className="grid gap-2 px-5 py-4 sm:grid-cols-[4rem_1fr]">
                  <span className="text-sm text-foreground/40">{num}</span>
                  <p className="text-sm leading-6 text-foreground/75"><span className="font-medium text-foreground">{title}. </span>{body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-sm text-foreground/45">Fig. 1. The four records an order passes through. The chain decides whether money moved. The book is second.</p>
          </section>

          <section id="close" className="scroll-mt-24 mt-16">
            <h2 className="text-2xl font-medium tracking-[-0.04em]"><span className="mr-3 text-foreground/35">04</span>The close</h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-foreground/75">
              <p>Prices come from Massive’s aggregates: the latest completed US regular session, 9:30 to 16:00 New York time, including holidays and early closes. A fresh close is labelled as the last official close. A live price is shown only when a plan includes the real-time snapshot, and the screen says so.</p>
              <p>If Massive does not answer, the desk keeps the last close it stored and marks it stale. The dollar price and the saved trend stay. The percent move is replaced with “Change unavailable.” A stale price, or one more than five days old, is refused for an order. If the price key is missing, the desk does not invent a market. A labelled sample feed is shown only when that mode is on.</p>
            </div>
          </section>

          <section id="price" className="scroll-mt-24 mt-16">
            <h2 className="text-2xl font-medium tracking-[-0.04em]"><span className="mr-3 text-foreground/35">05</span>The price check</h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-foreground/75">
              <p>The server signs the close with a key that never leaves the server. The browser cannot pick a price. Let p be the signed server price and p_s the price on the screen, both in the same units. The order is rejected when the gap is more than 100 basis points:</p>
            </div>
            <Eq kicker="Equation 1. Price band" lines={["reject when   |p_s − p| / p  >  1/100"]} />
            <p className="text-base leading-7 text-foreground/75">In integers, with both prices in micro-USDC per whole token, that test is |p_s − p| · 100 &gt; p. The signed preview is valid for 60 seconds. After that, request a new preview; the program rejects an expired signed price.</p>
          </section>

          <section id="fee" className="scroll-mt-24 mt-16">
            <h2 className="text-2xl font-medium tracking-[-0.04em]"><span className="mr-3 text-foreground/35">06</span>Fee and quantity</h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-foreground/75">
              <p>USDC amounts and claim quantities are integers of micro-units. One USDC is 1,000,000 micro-USDC. One whole claim token is 1,000,000 micro-tokens. Division that does not land on an integer is truncated. The result is never rounded up. In the equations, floor means that truncation.</p>
              <p>The fee is 10 basis points, 0.10 percent, of the full debit on a buy or the gross value on a sell. It stays in the vault. The Solana network fee is paid in SOL by the wallet. It is not part of this fee.</p>
            </div>
            <Eq
              kicker="Equation 2. Fee"
              lines={[
                "F(n) = floor(n / 1000)",
                "",
                "n    notional, in micro-USDC",
                "F    fee, in micro-USDC",
              ]}
            />
            <p className="text-base leading-7 text-foreground/75">A buy entered as a dollar amount sends a gross amount G of micro-USDC. The fee is taken from G. The quantity minted is the net divided by the close:</p>
            <Eq
              kicker="Equation 3. Buy quantity"
              lines={[
                "F = floor(G / 1000)",
                "q = floor( (G − F) · 1,000,000 / p )",
                "",
                "G    USDC sent, in micro-USDC",
                "p    signed close, in micro-USDC per whole token",
                "q    claim minted, in micro-tokens",
              ]}
            />
            <p className="text-base leading-7 text-foreground/75">A sell is a quantity q already held, not a dollar amount. The USDC that comes back is the close value of that quantity, after the same fee:</p>
            <Eq
              kicker="Equation 4. Sell proceeds"
              lines={[
                "n = floor( q · p / 1,000,000 )",
                "USDC returned = n − floor(n / 1000)",
              ]}
            />
          </section>

          <section id="example" className="scroll-mt-24 mt-16">
            <h2 className="text-2xl font-medium tracking-[-0.04em]"><span className="mr-3 text-foreground/35">07</span>A worked buy</h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-foreground/75">
              <p>Take a close of $198.42 and a buy of $100.00. In micro-units, p = 198,420,000 and G = 100,000,000.</p>
            </div>
            <Eq
              kicker="Equation 5. The $100 buy"
              lines={[
                "F = floor(100,000,000 / 1000) = 100,000",
                "q = floor(99,900,000 · 1,000,000 / 198,420,000) = 503,477",
              ]}
            />
            <div className="overflow-hidden rounded-2xl border border-black/10">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-black/10">
                  {[
                    ["USDC sent", "100.000000"],
                    ["Fee", "0.100000"],
                    ["Net after fee", "99.900000"],
                    ["Claim minted", "0.503477"],
                    ["Value of that claim at the same close", "99.899906"],
                    ["Truncated remainder, not minted", "0.000094"],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <th className="px-5 py-3 font-medium text-foreground/80">{label}</th>
                      <td className="px-5 py-3 text-right tabular-nums text-foreground/70">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-foreground/45">Fig. 2. One buy at an unchanged close. The fee is exactly ten cents. The quantity stops at the last micro-token that the net USDC can pay for.</p>
            <p className="mt-5 text-base leading-7 text-foreground/75">The next micro-token would have required rounding up. It is not minted. The preview shows these integers. The wallet prompt has to match them. If it does not, reject it.</p>
          </section>

          <section id="limits" className="scroll-mt-24 mt-16">
            <h2 className="text-2xl font-medium tracking-[-0.04em]"><span className="mr-3 text-foreground/35">08</span>Limits</h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-foreground/75">
              <p>Let n_i be the notional of order i, in micro-USDC, and let the sum run over the account’s orders for one UTC day.</p>
            </div>
            <Eq
              kicker="Equation 6. Size"
              lines={[
                "1,000,000  ≤  n  ≤  10,000,000,000",
                "sum of n_i  ≤  25,000,000,000",
                "",
                "One dollar minimum. Ten thousand dollars maximum.",
                "Twenty-five thousand dollars per account per UTC day.",
              ]}
            />
            <p className="text-base leading-7 text-foreground/75">A sell quantity cannot exceed the amount already held. An order that expires, or that fails a check, is cancelled or rejected. A daily job clears stale orders.</p>
          </section>

          <section id="settlement" className="scroll-mt-24 mt-16">
            <h2 className="text-2xl font-medium tracking-[-0.04em]"><span className="mr-3 text-foreground/35">09</span>Settlement</h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-foreground/75">
              <p>Review checks the session, the linked wallet, and the signed price. The desk then builds the transaction. The wallet signs and sends it. The account pays the network fee in mainnet SOL. The program checks the oracle signature before it moves USDC.</p>
              <p>On a buy, USDC enters the vault and the frozen claim is minted. On a sell, the claim is burned and USDC leaves the vault. The browser posts the signature. The API reads the landed transaction and checks the wallet, the program, the symbol, the amount, and the price. Only then is the fill booked, in one database transaction: the fill, the cash and token journals, the holding, the order marked filled, an audit line, and a notification.</p>
              <p>Booking is idempotent by signature. Posting the same signature again does not create a second fill. A confirmed mainnet transaction cannot be silently undone.</p>
            </div>
            <ol className="mt-8 space-y-3 border-l border-black/15 pl-5 text-sm leading-6 text-foreground/75">
              <li>Review. The server price is signed. The preview opens.</li>
              <li>Sign. The wallet signs the trade. This is not the login signature.</li>
              <li>Land. The program checks the price, then moves USDC.</li>
              <li>Read back. Wallet, program, symbol, amount, and price are checked.</li>
              <li>Book. One fill, one signature.</li>
            </ol>
            <p className="mt-3 text-sm text-foreground/45">Fig. 3. Settlement on Solana mainnet. The book is written after the chain, not before it.</p>
          </section>

          <section id="holdings" className="scroll-mt-24 mt-16">
            <h2 className="text-2xl font-medium tracking-[-0.04em]"><span className="mr-3 text-foreground/35">10</span>Holdings</h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-foreground/75">
              <p>Cash on the portfolio is the USDC in the linked wallet. A position stores quantity q and cost basis C, in micro-USDC, from the buy that minted it. For the worked buy, C is the 100 USDC that left the wallet.</p>
            </div>
            <Eq
              kicker="Equation 7. Mark and unrealized result"
              lines={[
                "V = floor( q · p / 1,000,000 )",
                "U = V − C",
              ]}
            />
            <p className="text-base leading-7 text-foreground/75">At the same close, V = 99,899,906 micro-USDC and C = 100,000,000, so U = −100,094. That loss is the 100,000 micro-USDC fee plus the 94 micro-USDC that truncation did not mint. Nothing in the market moved.</p>
            <p className="mt-5 text-base leading-7 text-foreground/75">Selling the whole position uses Equation 4. The notional is 99,899,906, the fee is floor(99,899,906 / 1000) = 99,899, and the USDC returned is 99,800,007. Against a cost of 100,000,000, the realized result is −199,993 micro-USDC: both fees, and the truncated remainder. Realized results elsewhere come from booked sells the same way. The first successful account read of a UTC day stores an equity snapshot when the required quotes are available and not stale. History supports side and symbol filters, pagination, and CSV export of up to the latest 5,000 rows across all filters.</p>
          </section>

          <section id="scope" className="scroll-mt-24 mt-16">
            <h2 className="text-2xl font-medium tracking-[-0.04em]"><span className="mr-3 text-foreground/35">11</span>Scope</h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-foreground/75">
              <p>This paper describes how the desk computes a preview and how a fill is booked. It is not an offer of securities, not a solicitation, and not legal, tax, or investment advice. A claim is not the stock. Read the Terms and the Risk Disclosure before using the desk.</p>
              <p>The equations in Sections 5 to 10 are the integer rules behind the preview. The signed transaction is the amount that moves. If the wallet prompt and the preview disagree, the preview wins: do not sign.</p>
            </div>
          </section>

          <section id="references" className="scroll-mt-24 mt-16">
            <h2 className="text-2xl font-medium tracking-[-0.04em]">References</h2>
            <p className="mt-6 text-base leading-7 text-foreground/75">The same rules, written as operating notes:</p>
            <ol className="mt-4 divide-y divide-black/10 rounded-2xl border border-black/10">
              {[
                ["/docs/status", "Platform status", "Recorded mainnet setup and pending hosted trading verification."],
                ["/docs/supported-assets", "Supported claims", "The 105 supported symbols by sector."],
                ["/docs/market", "The market", "Which names have a ticket, and which are reference only."],
                ["/docs/official-close", "Official close", "Where the price comes from, and what a stale quote looks like."],
                ["/docs/quotes", "Quotes, fees, and limits", "10 basis points, the size caps, and the 60-second preview."],
                ["/docs/orders", "Reviewing an order", "What is checked before a transaction is built."],
                ["/docs/settlement", "Settlement", "Sign, land, read back, book once."],
                ["/docs/vault", "The USDC vault", "What the token is a claim on."],
                ["/docs/restrictions", "Transfer restrictions", "Why the claim cannot be sent onward."],
                ["/docs/rights", "What you do not receive", "No dividend, no vote, no right to the stock."],
                ["/risk-disclosure", "Risk disclosure", "Mainnet, price, and claim risk."],
              ].map(([href, title, text], index) => (
                <li key={href}>
                  <Link href={href} className="grid gap-1 px-5 py-4 hover:bg-black/[0.02] sm:grid-cols-[2rem_1fr]">
                    <span className="text-sm text-foreground/35">{index + 1}</span>
                    <span className="text-sm leading-6"><span className="font-medium">{title}. </span><span className="text-foreground/60">{text}</span></span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-20 border-t border-black/10 pt-10 md:mt-24 md:pt-12">
            <h2 className="text-3xl font-medium tracking-[-0.04em] md:text-4xl">Explore Lokgi</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground/65">
              Learn how the desk works, review the order and settlement details, or open Lokgi to explore US-listed companies.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/docs" className="inline-flex min-h-14 items-center justify-center rounded-lg bg-[#080808] px-7 text-base font-medium text-white transition-colors hover:bg-black/80">
                Read the Docs
              </Link>
              <a href="https://app.lokgi.com" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center rounded-lg border border-black/10 bg-background px-7 text-base font-medium text-foreground/75 transition-colors hover:border-black/25 hover:text-foreground">
                Open App
              </a>
            </div>
          </section>
        </article>
      </div>

      <footer className="border-t border-black/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-7 text-sm text-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="font-medium uppercase tracking-[0.14em] text-foreground/55 hover:text-foreground">Lokgi</Link>
          <p>A reference desk for US-listed companies, settled on Solana.</p>
        </div>
      </footer>
    </main>
  )
}
