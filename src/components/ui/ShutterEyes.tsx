// src/components/ui/ShutterEyes.tsx

"use client"

import React, { useState, useEffect, useRef } from "react"

interface ShutterEyesProps {
  isOpen: boolean
  toggleMenu: () => void
  isScrolled: boolean
  isHidden: boolean
}

export const ShutterEyes = ({ isOpen, toggleMenu, isHidden }: ShutterEyesProps) => {
  const leftPupilRef = useRef<SVGGElement | null>(null)
  const rightPupilRef = useRef<SVGGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isFullyShrunk, setIsFullyShrunk] = useState(false)

  useEffect(() => {
    if (isHidden) return
    let rafId: number
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40
        const y = (e.clientY / window.innerHeight - 0.5) * 40
        const transform = `translate(${x}px, ${y}px)`
        if (leftPupilRef.current) leftPupilRef.current.style.transform = transform
        if (rightPupilRef.current) rightPupilRef.current.style.transform = transform
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [isHidden])

  useEffect(() => {
    if (isHidden) return
    let rafId: number
    const updateTransform = () => {
      const scrollY = window.scrollY
      const progress = Math.min(Math.max(scrollY / 250, 0), 1)
      const activeProgress = isOpen ? 1 : progress
      const scale = 1 - activeProgress * 0.85
      const translateY = 160 * (1 - activeProgress)
      if (containerRef.current) containerRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`
      setIsFullyShrunk(progress === 1)
    }
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateTransform)
    }
    updateTransform()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [isOpen, isHidden])

  if (isHidden) return null

  const eyeData = [
    { id: "left", cx: 250, ref: leftPupilRef },
    { id: "right", cx: 750, ref: rightPupilRef },
  ]

  return (
    <div className="fixed top-4 left-0 right-0 z-60 flex justify-center pointer-events-none">
      <div
        ref={containerRef}
        className="group origin-top pointer-events-auto cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-full"
        onClick={toggleMenu}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleMenu()}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
      >
        <svg
          className={`w-[90vw] sm:w-[600px] origin-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isFullyShrunk && !isOpen
              ? "drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover-wiggle group-hover:drop-shadow-[0_10px_25px_rgba(220,38,38,0.4)]"
              : "drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)]"
          }`}
          viewBox="0 0 1000 450"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient
              id="bodyGrad"
              cx="50%"
              cy="40%"
              r="70%"
            >
              <stop
                offset="0%"
                stopColor="#ffffff"
              />
              <stop
                offset="70%"
                stopColor="#f5f5f5"
              />
              <stop
                offset="100%"
                stopColor="#e0e0e0"
              />
            </radialGradient>
            <radialGradient
              id="bladeGrad"
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop
                offset="0%"
                stopColor="#3a3a3a"
              />
              <stop
                offset="100%"
                stopColor="#050505"
              />
            </radialGradient>
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
                offset="65%"
                stopColor="#b91c1c"
              />
              <stop
                offset="100%"
                stopColor="#7f1d1d"
              />
            </radialGradient>
          </defs>

          {eyeData.map((eye) => (
            <g
              key={eye.id}
              transform={`translate(${eye.cx}, 225)`}
            >
              <path
                d="M-200,0 C-200,-100 0,-115 200,0 C200,100 0,115 -200,0 Z"
                fill="url(#bodyGrad)"
                stroke="#eee"
                strokeWidth="1"
              />
              <circle
                cx="0"
                cy="0"
                r="92"
                fill="#ddd"
              />
              <circle
                cx="0"
                cy="0"
                r="88"
                fill="#000"
              />
              <circle
                cx="0"
                cy="0"
                r="82"
                fill="none"
                stroke="#dc2626"
                strokeWidth="4"
                className="red-ring-active"
              />
              <circle
                cx="0"
                cy="0"
                r="79"
                fill="none"
                stroke="#dc2626"
                strokeWidth="1"
                opacity="0.2"
              />
              <g transform="scale(0.95)">
                <circle
                  cx="0"
                  cy="0"
                  r="80"
                  fill="#050505"
                />
                <g>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <path
                      key={i}
                      d="M0,-80 A80,80 0 0,1 56,-56 L0,0 Z"
                      fill={i % 2 === 0 ? "url(#bladeGrad)" : "#111"}
                      stroke="#000"
                      strokeWidth="0.2"
                      transform={`rotate(${angle})`}
                    />
                  ))}
                </g>
              </g>
              <g
                className="pupil-core"
                ref={eye.ref}
              >
                <circle
                  cx="0"
                  cy="0"
                  r="30"
                  fill="url(#rubyCore)"
                />
                <ellipse
                  cx="-10"
                  cy="-12"
                  rx="10"
                  ry="6"
                  fill="white"
                  className={`transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-40"}`}
                  transform="rotate(-30, -10, -12)"
                />
                <circle
                  cx="8"
                  cy="12"
                  r="3"
                  fill="white"
                  className={`transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-10"}`}
                />
                <g
                  className={`transition-all duration-500 origin-center ${isOpen ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90"}`}
                >
                  <path
                    d="M-12,-12 L12,12 M12,-12 L-12,12"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </g>
              </g>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
