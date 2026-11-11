"use client"

import { FormEvent, useState } from "react"
import { Github } from "lucide-react"

export default function ContactSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.includes("@")) return
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative h-svh w-full overflow-hidden bg-black">
      <img
        src="/images/slide-nyse-facade.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
          {submitted ? (
            <p className="text-lg text-white">You&apos;re on the list.</p>
          ) : (
            <form onSubmit={onSubmit} className="flex w-full max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
              <label className="sr-only" htmlFor="desk-email">
                Email
              </label>
              <input
                id="desk-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                className="h-12 w-full rounded-full border border-white/10 bg-black/50 px-5 text-sm text-white outline-none backdrop-blur-md placeholder:text-white/55 sm:max-w-sm"
              />
              <button
                type="submit"
                className="h-12 shrink-0 rounded-full bg-white px-6 text-sm font-medium text-black transition-opacity hover:opacity-90"
              >
                Sign Up
              </button>
            </form>
          )}

          <div className="mt-12 flex items-center gap-6 text-white/80">
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="lokgi on X" className="text-xl transition-colors hover:text-white">
              𝕏
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="lokgi on GitHub" className="transition-colors hover:text-white">
              <Github size={20} />
            </a>
          </div>
      </div>
    </section>
  )
}
