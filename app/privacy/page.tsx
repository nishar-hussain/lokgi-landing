import LegalPage from "@/components/legal-page"

export default function PrivacyPage() {
  return <LegalPage
    eyebrow="LEGAL · PRIVACY"
    title="Privacy Policy"
    intro="This page describes the information the lokgi desk handles when you browse, sign in, or trade. It is a product-content draft, not a finished privacy notice for every jurisdiction."
    sections={[
      { title: "1. Information we may collect", body: "If you sign in, lokgi receives your email address, stores a hash of the six-digit code rather than the code itself, and sets a session cookie that lasts about thirty days. After you connect a wallet, lokgi stores the public address you proved with a signed message. The desk also stores orders, fills, saved prices, and notifications needed to run the book. Do not send a seed phrase or private key. Lokgi does not ask for one." },
      { title: "2. How information is used", body: "The email code is used to open a session. The wallet signature is used to bind one wallet to one account. Orders, fills, and saved prices are used to quote, settle, and show a portfolio. Technical logs are used to operate the desk and to limit abuse." },
      { title: "3. Blockchain information", body: "Public blockchain transactions and wallet addresses may be visible on the relevant network and may be difficult or impossible to delete. Connecting a wallet is optional for browsing features unless a supported blockchain action requires authorization." },
      { title: "4. Sharing and service providers", body: "Information may be shared with service providers that help host, secure, analyze, support, or operate lokgi, or when required to comply with law, protect rights, or prevent fraud. We do not ask for private wallet credentials." },
      { title: "5. Cookies and choices", body: "The site may use necessary storage and analytics technologies. You can manage browser settings and, where available, consent preferences. Disabling some technologies may affect functionality." },
      { title: "6. Your requests", body: "Depending on applicable law, you may have rights to request access, correction, deletion, restriction, portability, or objection. Contact details and verification steps should be added here before production launch." },
    ]}
  />
}
