export type DocBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; title: string; text: string }
  | { type: "cards"; items: { href: string; title: string; text: string }[] }
  | { type: "links"; items: { href: string; label: string }[] }

export type DocSection = {
  id: string
  title: string
  blocks: DocBlock[]
}

export type DocPage = {
  slug: string
  group: string
  title: string
  description: string
  sections: DocSection[]
}

export const docsNav: { title: string; slugs: string[] }[] = [
  { title: "Getting started", slugs: ["", "status", "sign-in", "how-it-works"] },
  { title: "Market", slugs: ["market", "supported-assets", "official-close", "quotes"] },
  { title: "Claims", slugs: ["vault", "restrictions", "rights"] },
  { title: "Trading", slugs: ["orders", "settlement", "holdings"] },
  { title: "Reference", slugs: ["wallet", "settings", "mainnet", "records", "glossary"] },
  { title: "Help", slugs: ["troubleshooting"] },
  { title: "Legal", slugs: ["risks"] },
]

export const docs: DocPage[] = [
  {
    slug: "",
    group: "Getting started",
    title: "Lokgi",
    description: "A reference desk for US-listed companies, with settlement on Solana mainnet.",
    sections: [
      {
        id: "what-it-is",
        title: "What Lokgi is",
        blocks: [
          {
            type: "p",
            text: "Lokgi lets a person look up a US ticker, see a price taken from the official market close, and buy or sell a frozen claim on a USDC vault. That claim is a record that the vault holds USDC against that name at the close Lokgi used.",
          },
          {
            type: "p",
            text: "It is not a share of Apple, Microsoft, or any other company. It carries no dividend, no vote, and no right to the underlying stock. The token is frozen in the holder’s wallet, so it cannot be sent onward. Selling it burns it and returns USDC from the vault.",
          },
          {
            type: "note",
            title: "What Lokgi is not",
            text: "Lokgi is not a broker, an exchange, a custodian, or an adviser. Settlement is on Solana mainnet, with USDC. An order does not print a trade on Nasdaq or the NYSE.",
          },
          {
            type: "cards",
            items: [
              { href: "/docs/market", title: "The directory", text: "Thousands of US symbols can be searched. The catalog contains 105 supported claim types; other listings are reference-only." },
              { href: "/docs/official-close", title: "The close", text: "Orders use the latest completed US regular-session close, labelled on the screen." },
              { href: "/docs/orders", title: "An order", text: "The server sets the price. The wallet signs. The program checks it before USDC moves." },
              { href: "/docs/mainnet", title: "Mainnet", text: "Fills move USDC on Solana mainnet. You pay the network fee in SOL." },
            ],
          },
        ],
      },
      {
        id: "desk",
        title: "The desk",
        blocks: [
          {
            type: "p",
            text: "The product is one website. The desk is at app.lokgi.com. After sign-in it has a market, a stock page, a portfolio, a transaction history, and account settings. The session cookie stays on that site.",
          },
          {
            type: "links",
            items: [
              { href: "https://app.lokgi.com", label: "Open the desk" },
              { href: "/docs/sign-in", label: "Sign in" },
              { href: "/risk-disclosure", label: "Risk disclosure" },
            ],
          },
        ],
      },
      {
        id: "implementation-status",
        title: "Current implementation status",
        blocks: [
          {
            type: "note",
            title: "Reviewed against platform source on 16 November 2026",
            text: "The platform repository records mainnet initialization and verification of all 105 claim mints. Hosted deployment and a wallet-approved buy/sell with history verification remain pending in that record. These docs describe implemented behavior, not a confirmation that public trading is live."
          },
          {
            type: "links",
            items: [
              {
                href: "/docs/status",
                label: "Platform status and remaining verification"
              }
            ]
          }
        ]
      },
    ],
  },
  {
    slug: "sign-in",
    group: "Getting started",
    title: "Sign in",
    description: "Email code, then a wallet signature that does not move funds.",
    sections: [
      {
        id: "email",
        title: "Email code",
        blocks: [
          {
            type: "p",
            text: "There is no password. You enter an email address. The desk creates a six-digit code, stores only a hash of it, and emails the code. The code expires after ten minutes. After it is accepted, a session opens.",
          },
        ],
      },
      {
        id: "wallet",
        title: "Wallet",
        blocks: [
          {
            type: "p",
            text: "You then connect a Solana wallet, typically Phantom or Solflare, and sign a short message. The message names the wallet address and a one-time nonce that expires after five minutes. The desk checks that signature and binds the wallet to the account. One wallet belongs to one account.",
          },
          {
            type: "note",
            title: "This signature does not pay for a trade",
            text: "Signing the login message proves you control the wallet that will later pay for trades. It does not move USDC or SOL. A trade is a separate signature. Lokgi never asks for a seed phrase.",
          },
          {
            type: "ul",
            items: [
              "The session cookie lasts thirty days and is HttpOnly, SameSite=Lax, and Secure in production.",
              "The cookie is first-party, because the desk and its API share one site.",
              "If the wallet prompt does not match the address you intend to use, reject it.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "how-it-works",
    group: "Getting started",
    title: "From the close to the claim",
    description: "What happens between looking up a ticker and holding a claim.",
    sections: [
      {
        id: "path",
        title: "The path",
        blocks: [
          {
            type: "ul",
            items: [
              "Sign in with email, then bind a Solana wallet.",
              "Open a US listing and read the labelled close.",
              "If the name has a Lokgi mint, open the order ticket. If it does not, there is no ticket.",
              "Press review. The server prices the order and builds a transaction that is valid for 60 seconds.",
              "Your wallet signs and sends it. You pay the network fee in SOL.",
              "On a buy, USDC enters the vault and a frozen claim is minted. On a sell, the claim is burned and USDC comes back.",
              "The desk books the fill only after it has read the landed transaction and checked it.",
            ],
          },
        ],
      },
      {
        id: "four-parties",
        title: "Who does what",
        blocks: [
          {
            type: "p",
            text: "A trade is a conversation among the browser, the API, the account book, and the Solana program. The browser cannot choose the price. The program will not move USDC until it has checked the price signature. The book does not record a fill until the chain has the transaction.",
          },
          {
            type: "ul",
            items: [
              "The screen shows the close and prepares an order the program will accept.",
              "The chain is the source of truth for whether money moved.",
              "The account book is the source of truth for the account after that movement has been verified.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "market",
    group: "Market",
    title: "The market",
    description: "A US directory. 105 supported claim types, plus a searchable US listing directory.",
    sections: [
      {
        id: "two-kinds",
        title: "Two kinds of listing",
        blocks: [
          {
            type: "p",
            text: "The market is built from US listings. The catalog contains 105 supported claim types, including AAPL, MSFT, and NVDA. Other symbols in the roughly 5,700-name US directory are reference-only. A supported symbol still needs an initialized mint and a working trading configuration before an order can settle.",
          },
          {
            type: "p",
            text: "The market shows up to 48 other active US listings, ranked by dollar volume in the latest session. Search matches company names and tickers and returns up to 30 listings with available price data. A reference listing has no order ticket because it has no supported claim mint.",
          },
        ],
      },
      {
        id: "stock-page",
        title: "The stock page",
        blocks: [
          {
            type: "p",
            text: "The stock page shows the name, reference price, daily change, as-of time, session, and a candlestick chart with volume. Ranges are 1D, 1W, 1M, 1Y, and 5Y. Company descriptions, exchange, employee count, and homepage appear when the data provider supplies them. The chart is a picture of the US listing in New York time. It does not move because someone on Lokgi traded. An order on Lokgi does not print on the US exchange.",
          },
          {
            type: "ul",
            items: [
              "A tokenized name has an order ticket under the chart.",
              "A buy can be entered as a dollar amount or a quantity.",
              "A sell is a quantity, up to the amount already held.",
              "A reference name stops at the chart.",
            ],
          },
        ],
      },
      {
        id: "refresh",
        title: "Refresh and data labels",
        blocks: [
          {
            type: "p",
            text: "The market refreshes every 60 seconds, while the provider caches session data for 15 minutes. Refreshing the page does not turn an official close into a live quote. Read the source label and as-of timestamp."
          },
          {
            type: "links",
            items: [
              {
                href: "/docs/supported-assets",
                label: "All 105 supported symbols"
              },
              {
                href: "/docs/official-close",
                label: "Price sources and stale data"
              }
            ]
          }
        ]
      },
    ],
  },
  {
    slug: "official-close",
    group: "Market",
    title: "Official close",
    description: "How a price gets onto the screen, and what a stale quote looks like.",
    sections: [
      {
        id: "source",
        title: "Where the price comes from",
        blocks: [
          {
            type: "p",
            text: "Prices come from Massive’s aggregates: the latest completed US regular-session close, not a live bid or offer. The regular session is 9:30 to 16:00 New York time, with holidays and early closes accounted for. Each quote is labelled. A fresh close is described as the last official close.",
          },
          {
            type: "p",
            text: "If a plan includes the real-time snapshot, the desk can show a live price, and it says so. The browser does not invent that label.",
          },
        ],
      },
      {
        id: "stale",
        title: "When the feed does not answer",
        blocks: [
          {
            type: "p",
            text: "If Massive does not answer, the desk returns the last close it already stored and marks it stale. On a stale quote the cards keep the dollar price and the saved trend, and they replace the percent move with “Change unavailable,” so an old close is not presented as today’s change.",
          },
          {
            type: "note",
            title: "No invented market",
            text: "If the Massive key is missing, the desk does not invent prices. It can only show a clearly labelled sample feed when that mode is turned on.",
          },
          {
            type: "ul",
            items: [
              "An order is refused if the price is marked stale, its timestamp is invalid, or it is more than five days old.",
              "The server price is signed with a key that never leaves the server.",
              "If a supplied client price is more than 100 basis points (1%) away from the server price, the order is rejected. This check compares prices; it does not make the close a live execution price.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "quotes",
    group: "Market",
    title: "Quotes, fees, and limits",
    description: "The numbers on a preview, and how long they last.",
    sections: [
      {
        id: "numbers",
        title: "The numbers",
        blocks: [
          {
            type: "ul",
            items: [
              "Fee: 10 basis points, 0.10 percent.",
              "Minimum order: $1.",
              "Maximum order: $10,000.",
              "Daily cap: $25,000 per account per UTC day.",
              "Preview lifetime: 60 seconds.",
              "Client price tolerance: 100 basis points (1%) from the server price, when a client price is supplied.",
            ],
          },
          {
            type: "p",
            text: "Amounts are calculated in integer micro-units, six decimal places. The remainder is truncated rather than rounded up. Claims are priced in USDC.",
          },
        ],
      },
      {
        id: "preview",
        title: "What the preview includes",
        blocks: [
          {
            type: "p",
            text: "Review shows the close, the fee, the quantity, and the transaction you are about to sign. If the preview expires, start again. The wallet prompt should match the amount and the mint on the screen. Reject it if it does not.",
          },
        ],
      },
      {
        id: "fee-math",
        title: "How fees affect a buy and sell",
        blocks: [
          {
            type: "p",
            text: "For a buy by dollar amount, the 0.10% fee is taken from the total USDC debit before calculating the claim quantity. For a sell, it is taken from the gross value of the quantity sold. Fees stay in the vault. Network fees and any account-creation rent are paid separately in SOL."
          },
          {
            type: "p",
            text: "At a $50 price, a 1,000 USDC buy has a 1 USDC fee and mints 19.98 claims. Selling 19.98 claims at the same price has a gross value of 999 USDC, a 0.999 USDC fee, and returns 998.001 USDC. An unchanged reference price still leaves a loss from fees."
          },
          {
            type: "p",
            text: "Buy-by-quantity calculates the required total debit with upward micro-unit adjustments so the minted quantity covers the requested quantity. The fee and mint calculations use integer division."
          },
          {
            type: "note",
            title: "The daily cap includes buys and sells",
            text: "The API checks new orders against the account’s booked fill notionals since 00:00 UTC. Buy size is checked using the full debit; sell size uses gross proceeds before the fee. Both sides contribute to daily activity, so selling does not reset the cap."
          }
        ]
      },
    ],
  },
  {
    slug: "vault",
    group: "Claims",
    title: "The USDC vault",
    description: "What the token is a claim on.",
    sections: [
      {
        id: "record",
        title: "The record",
        blocks: [
          {
            type: "p",
            text: "A Lokgi claim is a record that the vault holds USDC against a name, at the close used for that order. On a buy, USDC leaves the wallet and enters the program’s vault, and the program mints the frozen claim. On a sell, the program burns the claim and sends USDC back out of the vault.",
          },
          {
            type: "note",
            title: "Not a share, and not a brokerage balance",
            text: "The claim is against USDC in the Lokgi vault under the program’s rules. It is not a deposit at a broker, and it is not a right to receive the referenced stock.",
          },
        ],
      },
      {
        id: "position",
        title: "The position",
        blocks: [
          {
            type: "p",
            text: "When a buy lands, the program records a position for that person and that symbol: the quantity and the cost basis. A later sell uses that position. The portfolio reads the same cost basis when it shows unrealized profit.",
          },
        ],
      },
      {
        id: "liquidity",
        title: "Redemption depends on vault liquidity",
        blocks: [
          {
            type: "p",
            text: "A claim does not guarantee that the vault can pay every position at a later reference price. A sell requires enough USDC in the shared vault for the program transfer to succeed. The reference price can rise without adding USDC to the vault."
          },
          {
            type: "p",
            text: "The initialization record reports account setup, not a liquidity deposit. It does not establish reserves sufficient for future redemptions. See the platform status before treating setup as launch readiness."
          }
        ]
      },
    ],
  },
  {
    slug: "restrictions",
    group: "Claims",
    title: "Transfer restrictions",
    description: "Why the token cannot be sent to another wallet.",
    sections: [
      {
        id: "frozen",
        title: "Frozen",
        blocks: [
          {
            type: "p",
            text: "The token is frozen in the holder’s wallet. A transfer to another address is blocked. There is no secondary market in the token itself. The way out of a position is a sell, which burns the claim and returns USDC from the vault, subject to the quote, the limits, and the program.",
          },
          {
            type: "ul",
            items: [
              "You cannot send the claim onward.",
              "One wallet is bound to one account, and the claim stays in that wallet.",
              "A sell quantity cannot exceed the amount already held.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "rights",
    group: "Claims",
    title: "What you do not receive",
    description: "Ownership, voting, and dividends sit outside a Lokgi claim.",
    sections: [
      {
        id: "not-a-share",
        title: "Not a share",
        blocks: [
          {
            type: "p",
            text: "Holding a Lokgi claim does not make you a shareholder. You do not receive dividends. You do not vote. You cannot exchange the token for shares of the company. The chart on the stock page is the US listing. Your order does not move it.",
          },
          {
            type: "ul",
            items: [
              "No company ownership.",
              "No voting rights.",
              "No dividends.",
              "No right to the underlying stock.",
              "No print on Nasdaq or the NYSE.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "orders",
    group: "Trading",
    title: "Reviewing an order",
    description: "What the desk checks before it will build a transaction.",
    sections: [
      {
        id: "review",
        title: "Review",
        blocks: [
          {
            type: "p",
            text: "You press review. The desk checks the session and the linked wallet, reads the server price, and refuses a stale price or one more than five days old. It opens an order row, builds a Solana transaction, and signs the price with an oracle key that stays on the server.",
          },
          {
            type: "ul",
            items: [
              "A buy is a dollar amount or a quantity. A sell is a quantity you already hold.",
              "The fee, quantity, and transaction in the preview are valid for 60 seconds.",
              "If the client supplies a price more than 100 basis points from the server price, the order is rejected.",
              "Orders that expire, or that fail a check, are cancelled or rejected.",
            ],
          },
        ],
      },
      {
        id: "after-send",
        title: "After you send",
        blocks: [
          {
            type: "p",
            text: "The wallet signs and sends the transaction. You pay the network fee in SOL. After it lands, the browser posts the signature back. The desk reads the landed transaction and checks that the right wallet, program, symbol, amount, and price were used. Only then does it book the fill.",
          },
        ],
      },
      {
        id: "states",
        title: "Order states and delayed confirmation",
        blocks: [
          {
            type: "ul",
            items: [
              "Created: an order row exists, but the transaction has not been prepared.",
              "Validated: the prepared transaction and quote are stored. The preview lasts 60 seconds.",
              "Filled: a matching landed transaction has been verified and booked.",
              "Rejected: an order failed validation.",
              "Cancelled: the preparation or quote window expired; validated orders expire after 60 seconds and created orders after 120 seconds."
            ]
          },
          {
            type: "p",
            text: "Expiry does not undo a transaction that already landed. The API can book a matching landed transaction for a cancelled order. A timeout in the browser is not proof of failure. Check the wallet signature and Transactions before submitting another order."
          },
          {
            type: "links",
            items: [
              {
                href: "/docs/troubleshooting",
                label: "Resolve a pending or missing fill"
              }
            ]
          }
        ]
      },
    ],
  },
  {
    slug: "settlement",
    group: "Trading",
    title: "Settlement",
    description: "What the program does, and what gets written down afterward.",
    sections: [
      {
        id: "program",
        title: "On the program",
        blocks: [
          {
            type: "p",
            text: "The program checks the oracle’s signature before it moves anything. On a buy it takes USDC into the vault, mints the frozen claim into the wallet, and records the position. On a sell it burns the claim and sends USDC back out of the vault.",
          },
          {
            type: "ul",
            items: [
              "The user pays the network fee in SOL.",
              "USDC in the trade is mainnet USDC.",
              "If the transaction fails, its USDC transfer and claim changes are rolled back. Solana may still charge the network fee.",
            ],
          },
        ],
      },
      {
        id: "booking",
        title: "Booking the fill",
        blocks: [
          {
            type: "p",
            text: "Booking uses one database transaction for the fill, cash and token journals, holding, transaction-history row, order marked filled, and audit entry. The API then creates the fill notification. A fill is idempotent by signature, so a retry does not book it twice.",
          },
          {
            type: "p",
            text: "The ledger job clears stale orders and checks ledger consistency. It does not discover and book every unreported wallet transaction. If a transaction has landed but confirmation to the API fails, wallet balances can change before a booked fill appears in history.",
          },
        ],
      },
    ],
  },
  {
    slug: "holdings",
    group: "Trading",
    title: "Portfolio and history",
    description: "Cash, cost basis, and the record of what landed.",
    sections: [
      {
        id: "portfolio",
        title: "Portfolio",
        blocks: [
          {
            type: "p",
            text: "The portfolio reads cash from the linked wallet’s USDC account and values holdings using the latest available quotes, normally the official close. Unrealized profit uses the on-chain cost basis, including the full buy debit and its fee. Realized profit comes from booked sells. Equity is cash plus holdings value; allocation shows the share held in cash and each position.",
          },
        ],
      },
      {
        id: "history",
        title: "History and notices",
        blocks: [
          {
            type: "p",
            text: "Transactions can be filtered by buy or sell and symbol, with 25 rows per page and pagination to older activity. Each row shows side, symbol, quantity, price, fee, notional, cash change, status, and time. CSV export includes up to the latest 5,000 transactions across all filters, rather than just the visible filtered rows. A row appears after the landed transaction has been verified and booked.",
          },
          {
            type: "ul",
            items: [
              "Cash: USDC in the connected wallet.",
              "Quantity and cost basis: the position recorded on the program.",
              "Realized profit: sells that have been booked.",
              "A missing percent on a quote means the change was unavailable, not that the price was zero.",
            ],
          },
        ],
      },
      {
        id: "equity-history",
        title: "Equity history and notifications",
        blocks: [
          {
            type: "p",
            text: "The first successful account read of a UTC day saves an equity snapshot if the required holding quotes are available and not stale. Later visits that day do not overwrite it. Days without a successful snapshot may be missing; this is not continuous intraday performance history."
          },
          {
            type: "p",
            text: "Notifications cover wallet linking and filled orders. The client polls them every 15 seconds while signed in. A notification is separate from the chain confirmation and the accounting transaction."
          }
        ]
      },
    ],
  },
  {
    slug: "wallet",
    group: "Reference",
    title: "Wallet",
    description: "Two different signatures, and what each one does.",
    sections: [
      {
        id: "two-signatures",
        title: "Two signatures",
        blocks: [
          {
            type: "p",
            text: "The first signature binds the wallet. It is a message with your address and a nonce. It does not move funds. The second signature, on a trade, sends the transaction the desk prepared. That one moves USDC on mainnet and pays the network fee in SOL.",
          },
          {
            type: "ul",
            items: [
              "Phantom and Solflare are the wallets people typically use.",
              "Read the account, amount, and mint in the wallet prompt.",
              "Reject a prompt that does not match the preview.",
              "Never share a seed phrase or private key. The desk will not ask for one.",
            ],
          },
        ],
      },
      {
        id: "linked-wallet",
        title: "Linked wallet and browser connection",
        blocks: [
          {
            type: "p",
            text: "The linked wallet belongs to your signed-in account. The browser’s currently connected wallet can be disconnected or different. The Wallet page shows both states and warns about a mismatch. Reconnect the linked address before trading. Disconnecting the browser wallet does not remove the account link or sell holdings."
          },
          {
            type: "p",
            text: "Cash comes from Circle USDC in that linked wallet on Solana mainnet. Hold enough mainnet SOL for transaction fees and any required account creation. Signing out leaves on-chain holdings in the wallet."
          }
        ]
      },
    ],
  },
  {
    slug: "mainnet",
    group: "Reference",
    title: "Solana mainnet",
    description: "The network this product settles on.",
    sections: [
      {
        id: "network",
        title: "This product",
        blocks: [
          {
            type: "p",
            text: "Settlement is on Solana mainnet. The USDC in a trade is mainnet USDC. The network fee is SOL. Confirm the wallet is on mainnet before you sign.",
          },
          {
            type: "note",
            title: "The chart is still the US listing",
            text: "Mainnet settlement does not mean the order is a share trade. The close is the US regular-session close. What settles on mainnet is the USDC and the claim, not a share.",
          },
        ],
      },
      {
        id: "confirm",
        title: "Before you sign a trade",
        blocks: [
          {
            type: "ul",
            items: [
              "Confirm the wallet is on mainnet.",
              "Confirm the mint, the amount, and the fee in the prompt.",
              "A confirmed mainnet transaction is not something the desk can silently undo.",
            ],
          },
        ],
      },
      {
        id: "addresses",
        title: "Recorded mainnet addresses",
        blocks: [
          {
            type: "p",
            text: "The platform initialization record dated 16 November 2026 lists these public addresses. They are reference values from the repository, not a fresh live-chain verification."
          },
          {
            type: "ul",
            items: [
              "Program: 4tqWTbWZXhSRj2buCJV8EUvgBMbhbKfGkWSZYvCm7kPw",
              "Config: 6k1BLg8BpftRG9JB5QPG87pk2zTKCBnxZGfo6HoV6VXg",
              "USDC vault: F7H4y4wJCf6F35aHpedHpJEEYCHuW2XwsLnKpjB1o13t",
              "Circle USDC mint: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
            ]
          },
          {
            type: "links",
            items: [
              {
                href: "/docs/status",
                label: "What setup has and has not verified"
              }
            ]
          }
        ]
      },
    ],
  },
  {
    slug: "records",
    group: "Reference",
    title: "What is recorded where",
    description: "The chain, the book, and the screen each have a different job.",
    sections: [
      {
        id: "split",
        title: "Three records",
        blocks: [
          {
            type: "p",
            text: "The chain is the source of truth for whether money moved. Postgres is the source of truth for the account book after that movement has been verified: accounts, orders, fills, and saved prices. The screen’s job is to show the close honestly, prepare an order the program will accept, and then report only what actually landed.",
          },
          {
            type: "ul",
            items: [
              "Sign-in stores a hash of the email code, not the code.",
              "The session is a cookie on the same site as the API.",
              "Saved prices let the desk show a last close when Massive does not answer, marked stale.",
              "A fill is stored once per signature.",
              "The ledger job expires stale orders and checks ledger consistency; it does not automatically recover all unreported chain fills.",
            ],
          },
        ],
      },
      {
        id: "same-site",
        title: "One site",
        blocks: [
          {
            type: "p",
            text: "The desk and the API are deployed together. The browser calls /v1 on the same site. That is why the session cookie can stay first-party. Abuse and rate checks sit in front of the API. Email delivery is only for the sign-in code.",
          },
        ],
      },
    ],
  },
  {
    slug: "risks",
    group: "Legal",
    title: "Risks",
    description: "The short version, with links to the full pages.",
    sections: [
      {
        id: "summary",
        title: "Read this before a trade",
        blocks: [
          {
            type: "p",
            text: "US stock prices move. The order price is a close, unless a live price is explicitly labelled. A claim depends on the vault, the program, and the quote you accepted. Settlement is on Solana mainnet. A confirmed transaction can be irreversible. Nothing on this site is investment, legal, or tax advice.",
          },
          {
            type: "ul",
            items: [
              "A claim is not a share and pays no dividend.",
              "The token cannot be transferred.",
              "A stale close is labelled. The percent may read “Change unavailable.”",
              "Size, fee, and the 60-second preview are hard limits.",
              "You pay network fees in SOL.",
            ],
          },
        ],
      },
      {
        id: "full-pages",
        title: "Full pages",
        blocks: [
          {
            type: "links",
            items: [
              { href: "/terms", label: "Terms of Service" },
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/risk-disclosure", label: "Risk Disclosure" },
            ],
          },
        ],
      },
      {
        id: "liquidity-and-booking",
        title: "Liquidity and delayed records",
        blocks: [
          {
            type: "p",
            text: "Redemption requires enough USDC in the vault. Account initialization does not prove sufficient liquidity, a completed audit, or public launch readiness. Price gains on a chart do not fund the vault. A network timeout or a failed API confirmation can also leave history behind a transaction that already settled."
          },
          {
            type: "links",
            items: [
              {
                href: "/docs/vault",
                label: "Vault liquidity"
              },
              {
                href: "/docs/troubleshooting",
                label: "Pending confirmation"
              }
            ]
          }
        ]
      },
    ],
  },
  {
    slug: "status",
    group: "Getting started",
    title: "Platform status",
    description: "What the repository records as complete, and what still needs verification.",
    sections: [
      {
        id: "as-of",
        title: "As of 16 November 2026",
        blocks: [
          {
            type: "p",
            text: "These docs were checked against the local Lokgi platform repository on 16 November 2026. Deployment status here reflects its written initialization record; it has not been independently checked against the hosted app or current chain state."
          }
        ]
      },
      {
        id: "complete",
        title: "Recorded as complete",
        blocks: [
          {
            type: "ul",
            items: [
              "An executable Solana mainnet program is recorded.",
              "The config and Circle USDC vault accounts were initialized.",
              "All 105 supported claim mints were initialized and checked for the expected authorities and six-decimal precision.",
              "The recorded readiness check passed for the program, oracle, config, USDC mint, vault, fee, and claim mints."
            ]
          }
        ]
      },
      {
        id: "pending",
        title: "Still pending in the record",
        blocks: [
          {
            type: "ul",
            items: [
              "Apply the production environment to the actual hosting project and verify the rebuilt deployment.",
              "Complete a wallet-approved mainnet buy and sell, then verify portfolio and transaction history.",
              "The initialization performed no user trade and deposited no USDC liquidity."
            ]
          },
          {
            type: "note",
            title: "Setup is not trading verification",
            text: "Account initialization is not a contract audit or evidence that the hosted trading flow has completed. Successful redemption also depends on available vault USDC."
          },
          {
            type: "links",
            items: [
              {
                href: "/docs/mainnet",
                label: "Network and public addresses"
              },
              {
                href: "/docs/how-it-works",
                label: "Implemented order flow"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "supported-assets",
    group: "Market",
    title: "Supported claims",
    description: "The 105 supported claim symbols, grouped by sector.",
    sections: [
      {
        id: "coverage",
        title: "Coverage and availability",
        blocks: [
          {
            type: "p",
            text: "This list matches the platform’s supported-symbol manifest reviewed on 16 November 2026. These symbols represent frozen claims against the Lokgi USDC vault. They are not company shares. Other directory listings remain reference-only."
          },
          {
            type: "p",
            text: "All 105 mints are recorded as initialized. Trading still requires a working hosted configuration, a tradable quote, a linked wallet, sufficient funds, and successful program checks. A listing’s presence does not confirm that public trading is live."
          },
          {
            type: "links",
            items: [
              {
                href: "/docs/status",
                label: "Recorded platform status"
              }
            ]
          }
        ]
      },
      {
        id: "technology",
        title: "Technology",
        blocks: [
          {
            type: "p",
            text: "AAPL, MSFT, NVDA, AVGO, AMD, CRM, ORCL, CSCO, ADBE, INTC, QCOM, TXN, AMAT, MU, INTU, IBM, ACN, NOW, PANW, ADI, LRCX, KLAC, ANET, CRWD, PLTR, ADP, SNPS, CDNS, PYPL, FTNT, MRVL"
          }
        ]
      },
      {
        id: "consumer",
        title: "Consumer",
        blocks: [
          {
            type: "p",
            text: "AMZN, TSLA, WMT, COST, HD, PG, KO, MCD, PEP, NKE, SBUX, LOW, TGT, TJX, BKNG"
          }
        ]
      },
      {
        id: "communication",
        title: "Communication",
        blocks: [
          {
            type: "p",
            text: "GOOGL, META, NFLX, DIS, CMCSA, T, VZ, TMUS"
          }
        ]
      },
      {
        id: "financials",
        title: "Financials",
        blocks: [
          {
            type: "p",
            text: "JPM, V, MA, BAC, WFC, GS, MS, AXP, BLK, C, SCHW, SPGI, CB, PGR, ICE, CME, BX, COF, USB, PNC, AON"
          }
        ]
      },
      {
        id: "health-care",
        title: "Health care",
        blocks: [
          {
            type: "p",
            text: "UNH, JNJ, LLY, ABBV, MRK, TMO, ABT, DHR, PFE, AMGN, ISRG, SYK, BSX, GILD, MDT, REGN, BMY, ZTS, VRTX"
          }
        ]
      },
      {
        id: "energy",
        title: "Energy",
        blocks: [
          {
            type: "p",
            text: "XOM, CVX, COP"
          }
        ]
      },
      {
        id: "industrials",
        title: "Industrials",
        blocks: [
          {
            type: "p",
            text: "CAT, GE, RTX, BA, UNP"
          }
        ]
      },
      {
        id: "materials",
        title: "Materials",
        blocks: [
          {
            type: "p",
            text: "LIN"
          }
        ]
      },
      {
        id: "utilities",
        title: "Utilities",
        blocks: [
          {
            type: "p",
            text: "NEE"
          }
        ]
      },
      {
        id: "real-estate",
        title: "Real estate",
        blocks: [
          {
            type: "p",
            text: "PLD"
          }
        ]
      }
    ]
  },
  {
    slug: "settings",
    group: "Reference",
    title: "Account and settings",
    description: "Appearance, wallet details, and the browser session.",
    sections: [
      {
        id: "appearance",
        title: "Appearance and sidebar",
        blocks: [
          {
            type: "p",
            text: "Settings lets you choose a light or dark theme and whether the sidebar starts open or closed. These preferences are saved in this browser when local storage is available."
          }
        ]
      },
      {
        id: "account",
        title: "Account details",
        blocks: [
          {
            type: "p",
            text: "Your account shows the signed-in email, configured network, and linked wallet address with a copy action. The Wallet page shows connection status, the linked address, USDC balance, and network and token details."
          },
          {
            type: "links",
            items: [
              {
                href: "/docs/wallet",
                label: "Wallet linking and reconnection"
              }
            ]
          }
        ]
      },
      {
        id: "session",
        title: "Sign out",
        blocks: [
          {
            type: "p",
            text: "Choose Sign out of this browser to end the session. Holdings remain in the wallet. Returning requires email sign-in and connecting the appropriate linked wallet for trading."
          }
        ]
      }
    ]
  },
  {
    slug: "troubleshooting",
    group: "Help",
    title: "Troubleshooting",
    description: "Resolve sign-in, quote, wallet, and confirmation errors.",
    sections: [
      {
        id: "sign-in",
        title: "Email code or wallet challenge expired",
        blocks: [
          {
            type: "p",
            text: "Email codes expire after ten minutes; wallet challenges expire after five. Request a fresh code or restart the wallet connection. If requests are rate limited, wait before retrying. Check that the signing wallet matches the address in the challenge."
          }
        ]
      },
      {
        id: "connection",
        title: "Wallet mismatch or insufficient funds",
        blocks: [
          {
            type: "p",
            text: "Compare the linked address with the browser connection on the Wallet page and reconnect the linked wallet. Trades require Circle USDC and SOL on Solana mainnet. A USDC balance on another network cannot fund this transaction. SOL pays network fees and required account rent."
          }
        ]
      },
      {
        id: "quotes",
        title: "Stale price, changed price, or expired quote",
        blocks: [
          {
            type: "p",
            text: "Wait for a fresh quote when the feed is marked stale or the close is more than five days old. Refresh and review again if the displayed price fails the 1% comparison with the server. A prepared trade expires after 60 seconds; an unsigned expired preview needs a new review."
          }
        ]
      },
      {
        id: "unavailable",
        title: "Reference listing or trading unavailable",
        blocks: [
          {
            type: "p",
            text: "Reference listings have no order ticket. Supported symbols can also be unavailable when the program, oracle, vault, or mint configuration is missing or fails validation. Mainnet account initialization alone does not verify the hosted deployment."
          },
          {
            type: "links",
            items: [
              {
                href: "/docs/supported-assets",
                label: "Supported symbols"
              },
              {
                href: "/docs/status",
                label: "Recorded launch status"
              }
            ]
          }
        ]
      },
      {
        id: "pending",
        title: "Confirmation pending or fill missing",
        blocks: [
          {
            type: "p",
            text: "The client waits up to 90 seconds for confirmation. If it times out, check the transaction signature in your wallet and check Transactions before placing another order. A timeout does not cancel a transaction that landed."
          },
          {
            type: "p",
            text: "If the wallet shows a successful transaction but history is missing, the API may not have received or booked its confirmation. Preserve the signature and order details for investigation. Refreshing can read updated wallet balances, but the scheduled ledger check does not automatically book every unreported fill."
          },
          {
            type: "note",
            title: "Avoid duplicate orders",
            text: "A new order can create a second trade. Do not treat an absent history row as proof that no funds moved."
          }
        ]
      },
      {
        id: "failed",
        title: "Failed transaction or sale",
        blocks: [
          {
            type: "p",
            text: "A failed transaction rolls back its trade changes, but a network fee may still be charged. Check the quote expiry, configured network, funds, and reported error. A sell also requires enough USDC in the vault; a chart price does not guarantee redemption liquidity."
          }
        ]
      }
    ]
  },
  {
    slug: "glossary",
    group: "Reference",
    title: "Glossary",
    description: "Terms used across the desk and these docs.",
    sections: [
      {
        id: "terms",
        title: "Core terms",
        blocks: [
          {
            type: "ul",
            items: [
              "Claim: a frozen SPL token for a supported ticker, redeemable only through the program’s sell flow, subject to its checks and vault liquidity.",
              "Vault: the shared program-controlled Circle USDC token account receiving buy debits and paying sell proceeds.",
              "Position: the on-chain record of a wallet’s quantity and cost basis for a symbol.",
              "Official close: the latest completed US regular-session close from the market-data provider.",
              "Oracle: the server key that signs the price, symbol, trade side, and expiry for the program to verify.",
              "Preview: the prepared order details and transaction with a 60-second validity window.",
              "Fill: a landed trade that the API has verified and booked.",
              "Basis point (bps): one hundredth of a percentage point; 10 bps is 0.10%.",
              "Micro-unit: one millionth of a USDC or claim unit; settlement math uses six decimal places.",
              "Cost basis: the full USDC debit of buys, including fees, reduced proportionally as claims are sold.",
              "Reference listing: a US listing with market information but no supported claim to trade."
            ]
          }
        ]
      }
    ]
  },
]

const bySlug = new Map(docs.map((doc) => [doc.slug, doc]))

export function getDoc(slug: string) {
  return bySlug.get(slug)
}

export function docPath(slug: string) {
  return slug ? `/docs/${slug}` : "/docs"
}

export function flatDocs() {
  return docsNav.flatMap((group) => group.slugs.map((slug) => bySlug.get(slug)!))
}

export function docNeighbors(slug: string) {
  const list = flatDocs()
  const index = list.findIndex((doc) => doc.slug === slug)
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  }
}

export function searchDocs(query: string) {
  const needle = query.trim().toLowerCase()
  if (!needle) return []
  return docs
    .map((doc) => {
      const haystack = [doc.title, doc.description, doc.group, ...doc.sections.flatMap((section) => [section.title, ...textOf(section)])]
        .join(" ")
        .toLowerCase()
      return haystack.includes(needle) ? doc : null
    })
    .filter((doc): doc is DocPage => doc !== null)
    .slice(0, 8)
}

function textOf(section: DocSection) {
  return section.blocks.flatMap((block) => {
    if (block.type === "p" || block.type === "note") return [block.type === "p" ? block.text : `${block.title} ${block.text}`]
    if (block.type === "ul") return block.items
    if (block.type === "cards") return block.items.flatMap((item) => [item.title, item.text])
    return block.items.map((item) => item.label)
  })
}

export function docMarkdown(doc: DocPage) {
  const parts = [`# ${doc.title}`, "", doc.description, ""]
  for (const section of doc.sections) {
    parts.push(`## ${section.title}`, "")
    for (const block of section.blocks) {
      if (block.type === "p") parts.push(block.text, "")
      if (block.type === "note") parts.push(`> ${block.title}: ${block.text}`, "")
      if (block.type === "ul") parts.push(...block.items.map((item) => `- ${item}`), "")
      if (block.type === "cards") parts.push(...block.items.map((item) => `- ${item.title}: ${item.text}`), "")
      if (block.type === "links") parts.push(...block.items.map((item) => `- ${item.label}: ${item.href}`), "")
    }
  }
  return parts.join("\n")
}
