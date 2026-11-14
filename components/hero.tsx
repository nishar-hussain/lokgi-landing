"use client"

import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef } from "react"
import styles from "./hero.module.css"

export default function Hero() {
  const layersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layers = layersRef.current
    if (!layers) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    let frame = 0
    const onMove = (event: MouseEvent) => {
      const x = (event.clientX - window.innerWidth / 2) / window.innerWidth
      const y = (event.clientY - window.innerHeight / 2) / window.innerHeight
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        layers.style.setProperty("--px", x.toFixed(4))
        layers.style.setProperty("--py", y.toFixed(4))
      })
    }

    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id="home" data-header="dark" aria-labelledby="hero-title" className={styles.hero}>
      <div ref={layersRef} className={styles.layers}>
        <div className={`${styles.layer} ${styles.far}`}>
          <Image src="/images/cest/mars-1.png" alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className={`${styles.layer} ${styles.craft}`}>
          <Image src="/images/cest/starship.png" alt="" fill sizes="40vw" className="object-contain" />
        </div>
        <div className={styles.corner}>
          <svg viewBox="0 0 397 311" className={styles.mark} role="img" aria-label="Solana">
            <defs>
              <linearGradient id="hero-solana" x1="360" y1="0" x2="40" y2="311" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00FFA3" />
                <stop offset="1" stopColor="#DC1FFF" />
              </linearGradient>
            </defs>
            <path fill="url(#hero-solana)" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" />
            <path fill="url(#hero-solana)" d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" />
            <path fill="url(#hero-solana)" d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" />
          </svg>
        </div>
        <div className={styles.copy}>
          <h1 id="hero-title">
            A reference desk
            <br />
            for US stocks.
          </h1>
          <a href="https://app.lokgi.com" target="_blank" rel="noopener noreferrer" className={styles.cta}>
            Open the desk
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
