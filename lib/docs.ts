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
  { title: "Getting started", slugs: ["", "sign-in", "how-it-works"] },
  { title: "Market", slugs: ["market", "official-close", "quotes"] },
  { title: "Claims", slugs: ["vault", "restrictions", "rights"] },
  { title: "Trading", slugs: ["orders", "settlement", "holdings"] },
  { title: "Reference", slugs: ["wallet", "mainnet", "records"] },
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
              { href: "/docs/market", title: "The directory", text: "Thousands of US symbols can be searched. Twenty-four have a mint and an order ticket." },
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
            text: "There is no password. You enter an email address. The desk creates a six-digit code, stores only a hash of it, and emails the code. The code lives for about ten minutes. After it is accepted, a session opens.",
          },
        ],
      },
      {
        id: "wallet",
        title: "Wallet",
        blocks: [
          {
            type: "p",
            text: "You then connect a Solana wallet, typically Phantom or Solflare, and sign a short message. The message names the wallet address and a one-time nonce. The desk checks that signature and binds the wallet to the account. One wallet belongs to one account.",
          },
          {
            type: "note",
            title: "This signature does not pay for a trade",
            text: "Signing the login message proves you control the wallet that will later pay for trades. It does not move USDC or SOL. A trade is a separate signature. Lokgi never asks for a seed phrase.",
          },
          {
            type: "ul",
            items: [
              "The session cookie lasts about thirty days.",
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
    description: "A US directory, with a small set of names that can actually be traded.",
    sections: [
      {
        id: "two-kinds",
        title: "Two kinds of listing",
        blocks: [
          {
            type: "p",
            text: "The market is built from US listings. A small set of names, currently twenty-four large companies such as Apple, Microsoft, and NVIDIA, have a Lokgi mint and can be traded. The rest of the directory, thousands of US symbols, can be searched and viewed.",
          },
          {
            type: "p",
            text: "The busiest of those are shown as reference listings. A reference listing has a price and a chart, but no order ticket, because no claim token exists for it yet.",
          },
        ],
      },
      {
        id: "stock-page",
        title: "The stock page",
        blocks: [
          {
            type: "p",
            text: "The stock page shows the name, the reference price, the session, and a chart. The chart is a picture of the US listing in New York time. It does not move because someone on Lokgi traded. An order on Lokgi does not print on the US exchange.",
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
              "An order is refused if the price is stale, or older than a few days.",
              "The server price is signed with a key that never leaves the server.",
              "If the price on your screen is more than 100 basis points away from that server price, the order is rejected.",
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
              "Price tolerance: 100 basis points from the server price.",
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
            text: "You press review. The desk checks the session and the linked wallet, reads the server price, and refuses a stale price or one older than a few days. It opens an order row, builds a Solana transaction, and signs the price with an oracle key that stays on the server.",
          },
          {
            type: "ul",
            items: [
              "A buy is a dollar amount or a quantity. A sell is a quantity you already hold.",
              "The fee, quantity, and transaction in the preview are valid for 60 seconds.",
              "If your displayed price is more than 100 basis points from the server price, the order is rejected.",
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
              "A failed program check moves nothing.",
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
            text: "Booking is one database transaction: the fill, the cash and token journals, the holding, the order marked filled, an audit line, and a notification. A fill is idempotent by signature, so a retry does not book it twice.",
          },
          {
            type: "p",
            text: "A daily job clears stale orders and reconciles the ledger. Until a transaction has landed and been checked, the portfolio does not treat it as a fill.",
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
            text: "The portfolio reads cash from the wallet’s USDC account and values holdings at the latest close. Unrealized profit uses the on-chain cost basis. Realized profit comes from booked sells. The first visit of a UTC day stores an equity snapshot.",
          },
        ],
      },
      {
        id: "history",
        title: "History and notices",
        blocks: [
          {
            type: "p",
            text: "Transaction history can be filtered and exported. Notifications for a linked wallet and for fills are polled while you are signed in. A row appears after the fill is booked, which is after the chain transaction has been checked.",
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
              "A daily job clears stale orders and reconciles the ledger.",
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
    ],
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
