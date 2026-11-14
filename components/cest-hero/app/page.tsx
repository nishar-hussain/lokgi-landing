"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"

export default function Page() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [needsPermission, setNeedsPermission] = useState(false)
  const [gyroActive, setGyroActive] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const frameRef = useRef<number>()
  const lastUpdateRef = useRef<number>(0)

  const requestOrientation = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission()
        if (permissionState === "granted") {
          setNeedsPermission(false)
          setGyroActive(true)
          setShouldAnimate(true)
        }
      } catch (error) {
        console.error("Permission denied:", error)
      }
    } else {
      setNeedsPermission(false)
      setGyroActive(true)
      setShouldAnimate(true)
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight
      setMousePosition({ x, y })
    }

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const now = Date.now()
      if (now - lastUpdateRef.current < 16) {
        return
      }
      lastUpdateRef.current = now

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }

      frameRef.current = requestAnimationFrame(() => {
        const isLandscape = window.innerWidth > window.innerHeight

        let x = 0
        if (isLandscape) {
          const beta = e.beta || 0
          x = Math.max(-1, Math.min(1, beta / 45))
        } else {
          const gamma = e.gamma || 0
          x = Math.max(-1, Math.min(1, gamma / 45))
        }
        const y = 0

        setMousePosition({ x, y })
      })
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768
    const isTouchDevice = isMobile || isTablet || "ontouchstart" in window || navigator.maxTouchPoints > 0

    if (isTouchDevice) {
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        setNeedsPermission(true)
      } else {
        setGyroActive(true)
        setShouldAnimate(true)
      }
    } else {
      window.addEventListener("mousemove", handleMouseMove)
      setShouldAnimate(true)
    }

    if (gyroActive) {
      window.addEventListener("deviceorientation", handleOrientation)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("deviceorientation", handleOrientation)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [gyroActive])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black">
      {needsPermission && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80">
          <button
            onClick={requestOrientation}
            className="px-8 py-4 bg-orange-600 text-white text-xl font-bold rounded-lg hover:bg-orange-700 transition-colors"
          >
            Enable Parallax Effect
          </button>
        </div>
      )}

      <div
        className={`absolute inset-0 ${shouldAnimate ? "zoom-layer-1" : ""}`}
        style={{
          transform: `translate3d(${mousePosition.x * 30}px, ${mousePosition.y * 30}px, 0)`,
          willChange: "transform",
          width: "130%",
          height: "130%",
          left: "-15%",
          top: "-15%",
        }}
      >
        <Image src="/images/mars-1.png" alt="Mars planet from space" fill className="object-cover" priority />
      </div>

      <div
        className={`absolute z-5 ${shouldAnimate ? "zoom-layer-starship" : ""}`}
        style={{
          transform: `translate3d(${mousePosition.x * 50}px, ${mousePosition.y * 50}px, 0) scale(0.75)`,
          willChange: "transform",
          width: "800px",
          height: "800px",
          left: "20px",
          top: "20px",
        }}
      >
        <Image src="/images/starship.png" alt="Space station" fill className="object-contain" />
      </div>

      <div
        className={`absolute inset-0 z-10 ${shouldAnimate ? "zoom-layer-2" : ""}`}
        style={{
          transform: `translate3d(${mousePosition.x * 60}px, ${mousePosition.y * 60}px, 0)`,
          willChange: "transform",
          width: "130%",
          height: "130%",
          left: "-15%",
          top: "-15%",
        }}
      >
        <Image src="/images/mars-2.png" alt="Spacecraft interior window" fill className="object-cover" />
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center z-10 px-6 ${shouldAnimate ? "zoom-layer-text" : ""}`}
        style={{
          transform: `translate3d(${mousePosition.x * 90}px, ${mousePosition.y * 90}px, 0)`,
          willChange: "transform",
          perspective: "1000px",
        }}
      >
        <div className="flex text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px]">
          {"MARTIAN".split("").map((letter, index) => (
            <span
              key={index}
              className={`font-bold text-white ${shouldAnimate ? "letter-rotate" : ""}`}
              style={{
                display: "inline-block",
                transformStyle: "preserve-3d",
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`absolute inset-0 z-20 ${shouldAnimate ? "zoom-layer-3" : ""}`}
        style={{
          transform: `translate3d(${mousePosition.x * 120}px, ${mousePosition.y * 120}px, 0)`,
          willChange: "transform",
          width: "110%",
          height: "110%",
          left: "-5%",
          top: "calc(-5% + 150px)",
        }}
      >
        <Image src="/images/mars-3.png" alt="Astronaut in orange spacesuit" fill className="object-cover" />
      </div>

      <style jsx>{`
        .zoom-layer-1 {
          animation: zoomOut1 8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .zoom-layer-starship {
          animation: zoomOutStarship 8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .zoom-layer-2 {
          animation: zoomOut2 8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .zoom-layer-3 {
          animation: zoomOut3 8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .zoom-layer-text {
          animation: zoomOutText 8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes zoomOut1 {
          0% {
            scale: 1.3;
          }
          100% {
            scale: 1;
          }
        }

        @keyframes zoomOutStarship {
          0% {
            scale: 1.5;
          }
          100% {
            scale: 0.75;
          }
        }

        @keyframes zoomOut2 {
          0% {
            scale: 2.5;
            filter: blur(20px);
          }
          50% {
            filter: blur(10px);
          }
          100% {
            scale: 1;
            filter: blur(0px);
          }
        }

        @keyframes zoomOut3 {
          0% {
            scale: 8;
            filter: blur(40px);
            opacity: 0;
          }
          30% {
            filter: blur(25px);
            opacity: 0.3;
          }
          70% {
            filter: blur(10px);
            opacity: 0.7;
          }
          100% {
            scale: 1;
            filter: blur(0px);
            opacity: 1;
          }
        }

        @keyframes zoomOutText {
          0% {
            scale: 3.5;
            opacity: 0;
          }
          40% {
            opacity: 0.3;
          }
          70% {
            opacity: 0.7;
          }
          100% {
            scale: 1;
            opacity: 1;
          }
        }

        .letter-rotate {
          animation: rotateText 8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes rotateText {
          0% {
            transform: rotateY(90deg);
            filter: blur(30px);
            opacity: 0;
          }
          40% {
            filter: blur(15px);
            opacity: 0.5;
          }
          70% {
            filter: blur(5px);
            opacity: 0.8;
          }
          100% {
            transform: rotateY(0deg);
            filter: blur(0px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
