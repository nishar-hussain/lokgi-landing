"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Copy, Landmark, Lock, Wallet, Layers } from "lucide-react"
import { docMarkdown, docPath, type DocPage } from "@/lib/docs"

const cardIcons = [Landmark, Lock, Wallet, Layers]

export default function DocArticle({
  doc,
  prev,
  next,
}: {
  doc: DocPage
  prev?: DocPage
  next?: DocPage
}) {
  const [copied, setCopied] = useState(false)

  const copyPage = async () => {
    try {
      await navigator.clipboard.writeText(docMarkdown(doc))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-10">
      <article className="min-w-0 px-5 py-10 md:px-10 md:py-12">
        <p className="text-sm font-medium text-white/45">{doc.group}</p>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">{doc.title}</h1>
          <button
            type="button"
            onClick={copyPage}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 px-3 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy page"}
          </button>
        </div>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">{doc.description}</p>

        <div className="mt-10 max-w-3xl space-y-12">
          {doc.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="text-2xl font-semibold tracking-tight text-white">{section.title}</h2>
              <div className="mt-4 space-y-4">
                {section.blocks.map((block, index) => {
                  if (block.type === "p") {
                    return (
                      <p key={index} className="text-base leading-7 text-white/70">
                        {block.text}
                      </p>
                    )
                  }
                  if (block.type === "note") {
                    return (
                      <div key={index} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                        <p className="text-sm font-medium text-white">{block.title}</p>
                        <p className="mt-1 text-sm leading-6 text-white/65">{block.text}</p>
                      </div>
                    )
                  }
                  if (block.type === "ul") {
                    return (
                      <ul key={index} className="list-disc space-y-2 pl-5 text-base leading-7 text-white/70">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )
                  }
                  if (block.type === "cards") {
                    return (
                      <div key={index} className="grid gap-4 sm:grid-cols-2">
                        {block.items.map((item, cardIndex) => {
                          const Icon = cardIcons[cardIndex % cardIcons.length]
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]"
                            >
                              <Icon className="h-5 w-5 text-white/80" strokeWidth={1.5} />
                              <p className="mt-4 text-base font-medium text-white">{item.title}</p>
                              <p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p>
                            </Link>
                          )
                        })}
                      </div>
                    )
                  }
                  return (
                    <ul key={index} className="space-y-2">
                      {block.items.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="text-sm text-white/80 underline-offset-4 hover:underline">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 flex max-w-3xl items-center justify-between gap-4 border-t border-white/10 pt-6">
          {prev ? (
            <Link href={docPath(prev.slug)} className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={docPath(next.slug)} className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
              Next: {next.title}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </article>

      <aside className="hidden xl:block">
        <div className="sticky top-28 pt-12">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">On this page</p>
          <ul className="mt-4 space-y-2">
            {doc.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-sm text-white/55 transition-colors hover:text-white">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
