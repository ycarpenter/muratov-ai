"use client"

import { useEffect, useRef, useState } from "react"

export const ShutterEyes = ({ isOpen, toggleMenu }: { isOpen: boolean; toggleMenu: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftPupilRef = useRef<SVGCircleElement>(null)
  const rightPupilRef = useRef<SVGCircleElement>(null)
  const [isFullyShrunk, setIsFullyShrunk] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      const transform = `translate(${x}px, ${y}px)`

      requestAnimationFrame(() => {
        if (leftPupilRef.current) leftPupilRef.current.style.transform = transform
        if (rightPupilRef.current) rightPupilRef.current.style.transform = transform
      })
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const progress = Math.min(Math.max(scrollY / 250, 0), 1)
      const activeProgress = isOpen ? 1 : progress

      const scale = 1 - activeProgress * 0.85
      const translateY = 140 * (1 - activeProgress)

      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`
      }
      setIsFullyShrunk(progress === 1)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isOpen])

  return (
    <div className="fixed top-4 left-0 right-0 z-60 flex justify-center pointer-events-none">
      <div
        ref={containerRef}
        onClick={toggleMenu}
        role="button"
        tabIndex={0}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        className="group origin-top pointer-events-auto cursor-pointer focus-visible:ring-2 focus-visible:ring-crimson-600 rounded-full transition-shadow duration-500"
      >
        <svg
          className={`w-[85vw] sm:w-[540px] transition-all duration-500 ${isFullyShrunk && !isOpen ? "hover:scale-110 drop-shadow-xl" : "drop-shadow-sm"}`}
          viewBox="0 0 1000 450"
        >
          {/* SVG Elements here... (Same logic as yours but cleaner styles) */}
          <defs>
            <radialGradient
              id="rubyCore"
              cx="35%"
              cy="35%"
              r="65%"
            >
              <stop
                offset="0%"
                stopColor="#ef4444"
              />
              <stop
                offset="100%"
                stopColor="#7f1d1d"
              />
            </radialGradient>
          </defs>
          {[250, 750].map((cx, i) => (
            <g
              key={i}
              transform={`translate(${cx}, 225)`}
            >
              <path
                d="M-200,0 C-200,-100 0,-115 200,0 C200,100 0,115 -200,0 Z"
                fill="#ffffff"
                stroke="#f1f5f9"
              />
              <circle
                r="85"
                fill="#0f172a"
              />
              <circle
                ref={i === 0 ? leftPupilRef : rightPupilRef}
                r="32"
                fill="url(#rubyCore)"
                className="transition-transform duration-150 ease-out"
              />
              {isOpen && (
                <path
                  d="M-12,-12 L12,12 M12,-12 L-12,12"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              )}
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
