"use client"

import { ArrowRight } from "lucide-react"
import { focusRing } from "@/data/portfolio"
import { useTranslations } from "next-intl"

interface FooterProps {
  onOpenQuiz: () => void
}

export function Footer({ onOpenQuiz }: FooterProps) {
  const t = useTranslations("common")

  return (
    <footer className="mt-32 border-t border-slate-200 bg-white pt-24 pb-8 relative z-10">
      <div className="container mx-auto px-6 text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]">
                Let&apos;s <span className="text-red-600">generate</span>
                <br /> your next winner.
              </h2>
            </div>
            <div className="relative max-w-2xl group mt-8 lg:mt-0">
              <form className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white border border-slate-200 p-2 focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600 transition-all shadow-sm rounded-3xl sm:rounded-full">
                <div className="flex items-center flex-1 px-4 py-3 sm:py-0">
                  <span className="text-red-600 font-mono font-bold mr-3">{">"}</span>
                  <input
                    type="text"
                    placeholder="Enter your brand URL..."
                    className="w-full bg-transparent outline-none font-mono text-sm text-slate-900"
                    aria-label="Enter your brand URL"
                  />
                </div>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault()
                    onOpenQuiz()
                  }}
                  className={`bg-red-600 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 ${focusRing}`}
                >
                  {t("footer.submit")} <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-100 text-xs text-slate-00 font-medium flex justify-between items-center">
          <p>© {new Date().getFullYear()} muratov.ai — Engineered in Kyiv.</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-red-600 transition-colors"
            >
              {t("footer.linkedin")}
            </a>
            <a
              href="#"
              className="hover:text-red-600 transition-colors"
            >
              {t("footer.instagram")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
