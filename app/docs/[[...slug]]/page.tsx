import { notFound, redirect } from "next/navigation"
import DocArticle from "@/components/docs/doc-article"
import { docNeighbors, docs, getDoc } from "@/lib/docs"

type Params = { slug?: string[] }

export function generateStaticParams(): Params[] {
  return docs.map((doc) => ({ slug: doc.slug ? [doc.slug] : [] }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug = [] } = await params
  const doc = getDoc(slug.join("/"))
  if (!doc) return {}
  return { title: `${doc.title} — Lokgi Docs`, description: doc.description }
}

export default async function DocsPage({ params }: { params: Promise<Params> }) {
  const { slug = [] } = await params
  const key = slug.join("/")
  if (key === "demo") redirect("/docs/devnet")
  const doc = getDoc(key)
  if (!doc) notFound()
  const { prev, next } = docNeighbors(key)
  return <DocArticle doc={doc} prev={prev} next={next} />
}
