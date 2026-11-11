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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems: { name: string; href: string; blank?: boolean }[] = [
    { name: "HOME", href: "#home" },
    { name: "MARKET", href: "#works" },
    { name: "HOW IT WORKS", href: "#services" },
    { name: "SOLANA", href: "#about" },
    { name: "FAQ", href: "#blog" },
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
      <div className={`border-b bg-background transition-shadow ${scrolled ? "border-black/10 shadow-sm" : "border-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-xl font-bold text-foreground"
          >
            <span className="flex items-center gap-2">
              <Image src="/images/logsi-mark.jpeg" alt="lokgi mark" width={30} height={30} className="h-7 w-7 rounded-md object-contain" />
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
                  className="whitespace-nowrap text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={sectionHref(item.href)}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="whitespace-nowrap text-sm font-medium text-foreground/70 hover:text-accent transition-colors cursor-pointer"
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
            className="hidden shrink-0 items-center gap-2 rounded-full border border-foreground px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors cursor-pointer lg:flex"
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
                    className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={sectionHref(item.href)}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors cursor-pointer"
                  >
                    {item.name}
                  </a>
                ),
              )}
              <a
                href="https://app.lokgi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm font-medium text-foreground w-fit cursor-pointer"
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
