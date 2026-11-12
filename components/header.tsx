"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowUpRight } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      setScrolled(window.scrollY > 50)
      const y = 32
      const stack = document.elementsFromPoint(window.innerWidth / 2, y)
      const zone = stack
        .map((node) => (node instanceof Element ? node.closest("[data-header]") : null))
        .find((node) => node)
      setDark(zone?.getAttribute("data-header") === "dark")
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(read)
    }
    read()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const linkClass = dark
    ? "whitespace-nowrap text-sm font-medium text-white/75 transition-colors hover:text-white"
    : "whitespace-nowrap text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
  const ctaClass = dark
    ? "border-white text-white hover:bg-white hover:text-black"
    : "border-foreground text-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground"

  const navItems: { name: string; href: string; blank?: boolean }[] = [
    { name: "HOME", href: "#home" },
    { name: "MARKET", href: "#works" },
    { name: "HOW IT WORKS", href: "#services" },
    { name: "SOLANA", href: "#about" },
    { name: "FAQ", href: "#questions" },
    { name: "STAKE", href: "/stake" },
    { name: "DOCS", href: "/docs", blank: true },
  ]

  const sectionHref = (href: string) => (pathname === "/" ? href : `/${href}`)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const element = document.querySelector(href)
    if (!element) {
      setMobileMenuOpen(false)
      return
    }
    e.preventDefault()
    element.scrollIntoView({ behavior: "smooth", block: "start" })
    setMobileMenuOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`border-b transition-colors duration-300 ${dark ? "border-white/10 bg-black text-white" : `bg-background text-foreground ${scrolled ? "border-black/10 shadow-sm" : "border-transparent"}`}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-6">
          {/* Logo */}
          <Link
            href="/"
            className={`shrink-0 text-xl font-medium tracking-[-0.03em] ${dark ? "text-white" : "text-foreground"}`}
          >
            <span className="flex items-center gap-2">
              <Image src="/images/logsi-mark.jpeg" alt="lokgi mark" width={30} height={30} className={`h-7 w-7 rounded-md object-contain ${dark ? "invert" : ""}`} />
              <span>lokgi</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden min-w-0 items-center gap-4 lg:flex xl:gap-6">
            {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.blank ? "_blank" : undefined}
                  rel={item.blank ? "noopener noreferrer" : undefined}
                  className={linkClass}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={sectionHref(item.href)}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`${linkClass} cursor-pointer`}
                >
                  {item.name}
                </a>
              ),
            )}
          </nav>

          {/* CTA Button */}
          <a
            href="https://app.lokgi.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors lg:flex ${ctaClass}`}
          >
            Explore platform
            <ArrowUpRight className="h-4 w-4" />
          </a>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="px-5 pb-4 lg:hidden">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.blank ? "_blank" : undefined}
                    rel={item.blank ? "noopener noreferrer" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={linkClass}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={sectionHref(item.href)}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`${linkClass} cursor-pointer`}
                  >
                    {item.name}
                  </a>
                ),
              )}
              <a
                href="https://app.lokgi.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex w-fit cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${ctaClass}`}
              >
                Explore platform
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
