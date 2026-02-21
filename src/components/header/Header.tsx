//src/components/header/Header.tsx

"use client"
import { useTranslations } from "next-intl"
import { focusRing } from "@/data/portfolio"

interface HeaderProps {
  isScrolled: boolean
  onOpenQuiz: () => void
}

export function Header({ isScrolled, onOpenQuiz }: HeaderProps) {
  const t = useTranslations("common")
  return (
    <header
      className={`fixed top-4 left-0 right-0 z-40 mx-auto max-w-6xl px-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled ? "opacity-0 -translate-y-8 pointer-events-none scale-95" : "opacity-100 translate-y-0 scale-100"
      }`}
    >
      <div className="h-16 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between px-6">
        <a
          href="#"
          className={`text-xl font-black tracking-tighter ${focusRing}`}
        >
          muratov<span className="text-red-600">.ai</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          <a
            href="#"
            className={`text-slate-900 hover:text-red-600 transition-colors ${focusRing}`}
          >
            {t("nav.brands")}
          </a>
          <a
            href="#"
            className={`text-slate-500 hover:text-red-600 transition-colors ${focusRing}`}
          >
            {t("nav.creators")}
          </a>
          <a
            href="#"
            className={`text-slate-500 hover:text-red-600 transition-colors ${focusRing}`}
          >
            {t("nav.cases")}
          </a>
        </nav>
        <button
          onClick={onOpenQuiz}
          className={`hidden md:flex bg-red-600 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-red-700 transition-colors items-center gap-2 shadow-sm ${focusRing}`}
        >
          {t("nav.cta")}
        </button>
      </div>
    </header>
  )
}
