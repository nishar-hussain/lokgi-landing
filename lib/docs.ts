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
  { title: "Getting Started", slugs: ["", "demo", "how-it-works"] },
  { title: "Pricing", slugs: ["official-close", "quotes"] },
  { title: "Claims", slugs: ["vault", "restrictions", "rights"] },
  { title: "Solana", slugs: ["wallet", "settlement", "holdings"] },
  { title: "Legal", slugs: ["risks"] },
]

export const docs: DocPage[] = [
  {
    slug: "",
    group: "Getting Started",
    title: "Lokgi Docs",
    description: "Guides for exploring US stocks, official closes, and frozen claims settled on Solana.",
    sections: [
      {
        id: "products",
        title: "Products",
        blocks: [
          {
            type: "p",
            text: "Lokgi is a Solana-based US equity reference desk. You can review US-listed companies and their latest official closing prices, then buy or sell a supported claim against USDC held in the Lokgi vault.",
          },
          {
            type: "note",
            title: "Demo mode",
            text: "The current desk is a demonstration. Orders are simulated. No real assets or live stock trades are executed. A Lokgi claim is not a share in the referenced company.",
          },
          {
            type: "cards",
            items: [
              { href: "/docs/official-close", title: "Official close", text: "Every order uses the latest completed US regular-session close, shown before you sign." },
              { href: "/docs/vault", title: "Vault claim", text: "A frozen, non-transferable claim against USDC in the Lokgi Solana vault." },
              { href: "/docs/wallet", title: "Wallet settlement", text: "Lokgi prepares the order. You authorize it. The Solana program verifies it." },
              { href: "/docs/holdings", title: "Holdings", text: "Review USDC balances, claim quantities, cost basis, and transaction history." },
            ],
          },
        ],
      },
      {
        id: "what-lokgi-is",
        title: "What Lokgi is",
        blocks: [
          {
            type: "p",
            text: "The directory covers a broader set of US-listed companies for reference. Only 24 names are available as supported claims. Other companies stay reference-only until an onchain claim is available.",
          },
          {
            type: "ul",
            items: [
              "Prices come from the latest official US regular-session close.",
              "Supported claims are priced in USDC against the Lokgi vault.",
              "Claims cannot be transferred to another wallet.",
              "A claim does not include company ownership, voting rights, or dividends.",
            ],
          },
        ],
      },
      {
        id: "stay-connected",
        title: "Stay connected",
        blocks: [
          {
            type: "links",
            items: [
              { href: "/", label: "lokgi.com" },
              { href: "https://app.lokgi.com", label: "Trading desk" },
              { href: "/risk-disclosure", label: "Risk disclosure" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "demo",
    group: "Getting Started",
    title: "Demo mode",
    description: "What the current Lokgi desk does, and what it does not execute.",
    sections: [
      {
        id: "current-desk",
        title: "The current desk",
        blocks: [
          {
            type: "p",
            text: "Lokgi runs on Solana mainnet as a demonstration. You can connect a wallet, review a quote, and walk through the authorization flow. The order is simulated.",
          },
          {
            type: "note",
            title: "No live stock trade",
            text: "Demo orders do not buy or sell shares, move real assets, or execute a live stock-market trade. Confirm the network, mint, price, fee, and transaction before you authorize anything.",
          },
        ],
      },
      {
        id: "what-you-can-review",
        title: "What you can review",
        blocks: [
          {
            type: "ul",
            items: [
              "Company context and the latest official close.",
              "The quote, 0.10% platform fee, and order limits before you sign.",
              "How a claim would be minted into your wallet or burned back to USDC.",
              "The disclosure that the token is frozen and non-transferable.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "how-it-works",
    group: "Getting Started",
    title: "From the close to the claim",
    description: "The path from a US market close to a wallet-authorized claim.",
    sections: [
      {
        id: "steps",
        title: "Steps",
        blocks: [
          {
            type: "ul",
            items: [
              "Open a US-listed company and compare the latest official close.",
              "Check whether that name is one of the 24 supported claims.",
              "Review the quote, fee, size limits, and 60-second quote lifetime.",
              "Sign the prepared order with your Solana wallet.",
              "The program verifies the order before it is confirmed.",
            ],
          },
          {
            type: "p",
            text: "On a buy, USDC is the amount you pay and the claim is the amount you receive. On a sell, the claim is burned and USDC is the amount you receive. In demo mode this flow is shown and simulated.",
          },
        ],
      },
      {
        id: "reference-only",
        title: "Reference-only names",
        blocks: [
          {
            type: "p",
            text: "Companies outside the supported set can still be explored, with historical movement and the official close. They cannot be traded as a Lokgi claim until a claim is available.",
          },
        ],
      },
    ],
  },
  {
    slug: "official-close",
    group: "Pricing",
    title: "Official close",
    description: "How Lokgi prices an order against the latest completed US session.",
    sections: [
      {
        id: "price-source",
        title: "Price source",
        blocks: [
          {
            type: "p",
            text: "Every Lokgi order uses the latest completed US regular-session close. The price is locked into the quote and shown before you sign. It is not a live intraday bid or ask.",
          },
          {
            type: "ul",
            items: [
              "The close is ingested after the regular session completes.",
              "The quote displays that close as the order price.",
              "You see the locked price, the fee, and the limits before the wallet prompt.",
            ],
          },
        ],
      },
      {
        id: "what-it-is-not",
        title: "What the close is not",
        blocks: [
          {
            type: "p",
            text: "The official close is a reference price for the Lokgi quote. It does not mean Lokgi routed an order to a US exchange, and a claim price can differ from a later market print because of fees, quote expiry, vault liquidity, and the demo status of the desk.",
          },
        ],
      },
    ],
  },
  {
    slug: "quotes",
    group: "Pricing",
    title: "Quotes, fees, and limits",
    description: "What is shown on an order before you authorize it.",
    sections: [
      {
        id: "quote",
        title: "The quote",
        blocks: [
          {
            type: "p",
            text: "A quote shows the official close, the quantity, the platform fee, the order limits, and when the quote expires. Claims are priced in USDC against the Lokgi vault.",
          },
          {
            type: "ul",
            items: [
              "Platform fee: 0.10%.",
              "Minimum order: $1.",
              "Maximum order: $10,000.",
              "Daily notional limit: $25,000.",
              "Quote lifetime: 60 seconds.",
            ],
          },
        ],
      },
      {
        id: "before-you-sign",
        title: "Before you sign",
        blocks: [
          {
            type: "p",
            text: "If the quote expires, request a new one. The wallet prompt should match the amount, the mint, and the fee you just reviewed. In demo mode the preview is still shown, and the order is not executed as a live trade.",
          },
        ],
      },
    ],
  },
  {
    slug: "vault",
    group: "Claims",
    title: "The USDC vault",
    description: "What a Lokgi token represents inside the vault.",
    sections: [
      {
        id: "structure",
        title: "Structure",
        blocks: [
          {
            type: "p",
            text: "A Lokgi token is a frozen, non-transferable claim against USDC held in the Lokgi Solana vault. Buying sends USDC toward the vault and mints a claim to your wallet. Selling burns the claim back toward USDC.",
          },
          {
            type: "note",
            title: "Vault-backed, not a share",
            text: "The claim is against the vault under Lokgi’s product rules. It is not a share, deposit at a broker, or a right to receive the referenced stock.",
          },
        ],
      },
      {
        id: "liquidity",
        title: "Liquidity",
        blocks: [
          {
            type: "p",
            text: "A sale depends on vault liquidity and the program rules. The vault may not fill a requested size at the expected price or time. Review the vault, the fee, and the limits before you trade.",
          },
        ],
      },
    ],
  },
  {
    slug: "restrictions",
    group: "Claims",
    title: "Transfer restrictions",
    description: "Why a Lokgi claim stays in the wallet that holds it.",
    sections: [
      {
        id: "frozen",
        title: "Frozen and non-transferable",
        blocks: [
          {
            type: "p",
            text: "A supported claim cannot be transferred to another wallet. The token is frozen. Sending it is blocked. The way out of a position is a sell that burns the claim back to USDC, subject to the quote, the vault, and demo rules.",
          },
          {
            type: "ul",
            items: [
              "Transfers to another address are blocked.",
              "The claim stays bound to the holding wallet.",
              "There is no secondary transfer market for the token.",
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
    description: "Ownership, voting, and dividends are outside a Lokgi claim.",
    sections: [
      {
        id: "not-a-share",
        title: "Not a share",
        blocks: [
          {
            type: "p",
            text: "Holding a Lokgi claim does not make you a shareholder of the referenced company. You do not receive voting rights, dividends, or the right to exchange the token for shares.",
          },
          {
            type: "ul",
            items: [
              "No company ownership.",
              "No voting rights.",
              "No dividends.",
              "The token tracks a price-linked vault claim, not equity.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "wallet",
    group: "Solana",
    title: "Wallet authorization",
    description: "Who prepares an order, and who has to sign it.",
    sections: [
      {
        id: "roles",
        title: "Roles",
        blocks: [
          {
            type: "p",
            text: "Lokgi prepares the order and shows the quote. Your wallet authorizes it. Nothing settles because a page button was clicked. The signature is the authorization.",
          },
          {
            type: "ul",
            items: [
              "Use a compatible Solana wallet.",
              "Read the account, amount, and mint in the wallet prompt.",
              "Reject the prompt if it does not match the quote on screen.",
              "Never share a seed phrase or private key. Lokgi will not ask for one.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "settlement",
    group: "Solana",
    title: "Onchain settlement",
    description: "How a signed order is checked before confirmation.",
    sections: [
      {
        id: "program",
        title: "Program check",
        blocks: [
          {
            type: "p",
            text: "After you sign, the Solana program verifies the order before confirmation. The check covers the prepared instruction, not a broker route to a US exchange.",
          },
          {
            type: "ul",
            items: [
              "Order prepared by Lokgi.",
              "Authorized by your wallet.",
              "Verified by the program before confirmation.",
              "Demo mode stops short of a live stock trade.",
            ],
          },
        ],
      },
      {
        id: "irreversible",
        title: "Chain finality",
        blocks: [
          {
            type: "p",
            text: "A confirmed Solana transaction is not something the desk can silently undo. Network congestion, a wrong account, or a signed transaction you did not intend can delay or lose funds. Read the prompt before you approve it.",
          },
        ],
      },
    ],
  },
  {
    slug: "holdings",
    group: "Solana",
    title: "Holdings",
    description: "Balances, claims, and the history shown on the desk.",
    sections: [
      {
        id: "what-you-see",
        title: "What you see",
        blocks: [
          {
            type: "p",
            text: "The holdings view is where you review USDC balances and claim quantities for supported names, along with cost basis, estimated profit and loss, and transaction history.",
          },
          {
            type: "ul",
            items: [
              "USDC balance in the connected wallet context.",
              "Quantity of each supported claim.",
              "Cost basis and estimated profit and loss.",
              "A single history of the transactions the desk records.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "risks",
    group: "Legal",
    title: "Risks and legal",
    description: "The short version of the disclosures, with links to the full pages.",
    sections: [
      {
        id: "summary",
        title: "Summary",
        blocks: [
          {
            type: "p",
            text: "Lokgi is an educational demo, not a brokerage or investment service. US stock prices move. A claim depends on the vault, the program, and the quote you accepted. Blockchain transactions can be irreversible. Availability and legal treatment vary by jurisdiction.",
          },
          {
            type: "ul",
            items: [
              "Market prices can fall quickly.",
              "The vault may not have liquidity for a sale.",
              "Wallet, program, and network failures can delay or lose a transaction.",
              "Nothing on this site is investment, legal, or tax advice.",
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
