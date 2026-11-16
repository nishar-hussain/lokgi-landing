# Documentation source record

Reviewed on 16 November 2026 against the local platform repository at
`/Users/aditya/Coding/logsi`. Public documentation lives in `lib/docs.ts`;
the technical explanation also appears in `app/litepaper/page.tsx`.

This was a source review, not a hosted deployment, live-chain check, legal
review, or wallet-approved trading test. Status statements are dated because
account initialization and verified public trading are separate milestones.

| Documentation | Platform source, relative to `logsi` |
| --- | --- |
| Overview and recorded release status | `PRODUCT.md`, `docs/MAINNET_INITIALIZATION.md` |
| Supported symbols and sectors | `packages/domain/src/supported-symbols.json`, `docs/SUPPORTED_STOCKS.md` |
| Email codes, wallet nonce, session and account linking | `apps/api/src/http/app.ts`, `apps/api/src/db/index.ts`, `packages/domain/src/auth-message.ts` |
| Directory, active listings and search limits | `apps/api/src/market/feed.ts` |
| Provider data, candles, labels and caching | `apps/api/src/market/massive.ts`, `apps/api/src/market/hours.ts`, `apps/api/src/market/snapshots.ts`, `apps/web/lib/market.ts` |
| Fees, integer calculations and quantity buys | `packages/domain/src/chain.ts`, `packages/domain/src/engine.ts` (fee constant) |
| Size, daily activity and quote-age checks | `apps/api/src/orders/limits.ts`, `apps/api/src/ledger/money.ts`, `apps/api/src/http/app.ts` |
| Prepared transactions, expiry and landed-fill checks | `apps/api/src/chain/settlement.ts`, `apps/api/src/orders/book.ts` |
| Vault, frozen claims, position cost basis and redemption | `programs/lokgi/src/lib.rs`, `apps/api/src/chain/readiness.ts` |
| Atomic booking and subsequent notifications | `apps/api/src/orders/book.ts`, `apps/api/src/http/app.ts` |
| Ledger-job scope | `apps/api/src/ledger/job.ts`, `apps/api/src/ledger/post.ts` |
| Equity snapshots | `apps/api/src/ledger/snapshot.ts` |
| History filters, pagination and unfiltered CSV export | `apps/api/src/http/app.ts`, `apps/web/components/transactions-view.tsx` |
| Wallet connection, settings and sign out | `apps/web/components/wallet-panel.tsx`, `apps/web/components/settings-view.tsx` |
| Confirmation timeout and notifications polling | `apps/web/components/trading-provider.tsx` |

When updating:

- Compare supported symbols with the canonical JSON manifest. Directory size is
  approximate; displayed results depend on available prices.
- Keep status dated. Do not infer hosted deployment, liquidity, an audit, or a
  completed buy/sell check from initialized accounts.
- Check order math in `chain.ts` and the API path, rather than the separate
  floating-point account engine.
- Check transaction boundaries before claiming that a notification is atomic
  with a booked fill. Check job behavior before claiming automatic recovery.
- Keep the docs and litepaper consistent on fees, five-day quote age, the
  60-second preview, and the dependence of redemptions on vault liquidity.
- Review navigation, internal links, search and copied Markdown after adding
  pages; stable existing docs URLs should continue to work.
