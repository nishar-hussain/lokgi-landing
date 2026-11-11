"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, Search, X } from "lucide-react"
import { docPath, docsNav, getDoc, searchDocs } from "@/lib/docs"

export default function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [query, setQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const results = useMemo(() => searchDocs(query), [query])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setSearchOpen(true)
      }
      if (event.key === "Escape") setSearchOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-[#0c0d10] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0c0d10]/90 backdrop-blur-md">
        <div className="flex h-14 items-center gap-3 px-4 md:px-6">
          <button type="button" className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open docs menu">
            <Menu className="h-4 w-4" />
          </button>
          <Link href="/docs" className="flex items-center gap-2 font-semibold tracking-tight">
            <Image src="/images/logsi-mark.jpeg" alt="" width={28} height={28} className="h-7 w-7 rounded-md object-contain invert" />
            lokgi
          </Link>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="ml-auto flex h-9 w-full max-w-md items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-sm text-white/45 md:ml-6"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="flex-1 text-left">Search...</span>
            <kbd className="hidden rounded border border-white/15 px-1.5 text-[10px] text-white/50 sm:inline">⌘K</kbd>
          </button>
          <Link href="/docs/risks" className="hidden text-sm text-white/70 hover:text-white sm:inline">
            Support
          </Link>
        </div>
        <div className="flex gap-6 px-4 text-sm md:px-6">
          <Link href="/docs" className="border-b-2 border-white pb-2 font-medium text-white">
            Documentation
          </Link>
          <Link href="/" className="pb-2 text-white/45 hover:text-white">
            Website
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="sticky top-[89px] hidden h-[calc(100vh-89px)] overflow-y-auto px-4 py-6 lg:block">
          <DocsNav pathname={pathname} />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 bg-black/60 lg:hidden" onClick={() => setMenuOpen(false)}>
          <div className="h-full w-[min(100%,320px)] overflow-y-auto bg-[#0c0d10] p-4" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium">Documentation</p>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close docs menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <DocsNav pathname={pathname} />
          </div>
        </div>
      ) : null}

      {searchOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-start bg-black/70 px-4 pt-[12vh]" onClick={() => setSearchOpen(false)}>
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#16171b] shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center gap-2 border-b border-white/10 px-4">
              <Search className="h-4 w-4 text-white/40" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the docs"
                className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {(query.trim() ? results : flatPreview()).map((doc) => (
                <li key={doc.slug || "index"}>
                  <Link href={docPath(doc.slug)} className="flex w-full flex-col rounded-lg px-3 py-2 text-left hover:bg-white/10">
                    <span className="text-sm text-white">{doc.title}</span>
                    <span className="text-xs text-white/45">{doc.group}</span>
                  </Link>
                </li>
              ))}
              {query.trim() && results.length === 0 ? <li className="px-3 py-6 text-sm text-white/45">No matching pages.</li> : null}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function flatPreview() {
  return docsNav.flatMap((group) => group.slugs.map((slug) => getDoc(slug)!)).slice(0, 6)
}

function DocsNav({ pathname }: { pathname: string }) {
  return (
    <nav className="space-y-6">
      <Link href="/" className="block px-3 text-sm text-white/55 hover:text-white">
        Lokgi website
      </Link>
      {docsNav.map((group) => (
        <div key={group.title}>
          <p className="px-3 text-sm font-medium text-white">{group.title}</p>
          <ul className="mt-2 space-y-0.5">
            {group.slugs.map((slug) => {
              const doc = getDoc(slug)
              if (!doc) return null
              const href = docPath(slug)
              const active = pathname === href
              return (
                <li key={slug || "index"}>
                  <Link href={href} className={`block rounded-lg px-3 py-1.5 text-sm ${active ? "bg-white/10 text-white" : "text-white/55 hover:text-white"}`}>
                    {doc.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
