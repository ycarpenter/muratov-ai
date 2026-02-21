"use client"

import { useState, useEffect } from "react"
import { ShutterEyes } from "./shutter-eyes"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/Button"

export const ShutterEyesWrapper = () => {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations("nav")

  // Блокування скролу при відкритому меню (Rule 3: Focus trap & UX)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      {/* 1. Власне SVG Очі (Кнопка меню) */}
      <ShutterEyes
        isOpen={isOpen}
        toggleMenu={toggleMenu}
      />

      {/* 2. Fullscreen Overlay Menu */}
      <div
        className={`fixed inset-0 z-50 bg-white/98 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="container mx-auto px-6 h-full flex flex-col justify-center max-w-5xl">
          <nav className="flex flex-col gap-6 md:gap-10">
            {["brands", "creators", "cases"].map((key, index) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={toggleMenu}
                style={{ transitionDelay: `${index * 100}ms` }}
                className={`text-6xl md:text-8xl font-black tracking-tighter text-slate-400 hover:text-crimson-600 hover:translate-x-6 transition-all duration-500 ${
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                {t(key)}
              </a>
            ))}
          </nav>

          <div
            className={`mt-20 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 transition-all duration-1000 delay-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              variant="primary"
              className="px-10 py-5 text-lg"
              onClick={toggleMenu}
            >
              {t("cta")}{" "}
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </Button>

            <div className="flex gap-8 text-sm font-bold text-slate-400">
              <a
                href="#"
                className="hover:text-crimson-600 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="hover:text-crimson-600 transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
