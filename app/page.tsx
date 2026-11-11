import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import TokenizedFeatures from "@/components/tokenized-features"
import SelectedWorks from "@/components/selected-works"
import Services from "@/components/services"
import MarketRail from "@/components/market-rail"
import ContactSection from "@/components/contact-section"
import Stats from "@/components/stats"
import MarketIndex from "@/components/market-index"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <TokenizedFeatures />
      <SelectedWorks />
      <Services />
      <MarketRail />
      <ContactSection />
      <Stats />
      <MarketIndex />
      <Footer />
    </main>
  )
}
