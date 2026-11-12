import Header from "@/components/header"
import MarketTape from "@/components/market-tape"
import Hero from "@/components/hero"
import About from "@/components/about"
import SelectedWorks from "@/components/selected-works"
import Services from "@/components/services"
import MarketRail from "@/components/market-rail"
import Stats from "@/components/stats"
import MarketIndex from "@/components/market-index"
import Questions from "@/components/questions"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <MarketTape />
      <Hero />
      <About />
      <MarketRail />
      <SelectedWorks />
      <Services />
      <Stats />
      <MarketIndex />
      <Questions />
      <Footer />
    </main>
  )
}
