//src/app/[locale]/page.tsx
"use client"
import { useState, useEffect } from "react"

import { ArrowRight, Play, Plus } from "lucide-react"
import { focusRing, services, categories, type CaseItem } from "@/data/portfolio"
import "@/app/globals.css"
import { cases } from "@/data/portfolio"
import { CaseStudyPage } from "@/components/projects/CaseStudyPage"
import Image from "next/image"
import { ShutterEyes } from "@/components/ui/ShutterEyes"
import { useTranslations } from "next-intl"

export default function App() {
  const t = useTranslations("common")
  const tCases = useTranslations("cases")

  const [activeCategory, setActiveCategory] = useState("All")
  const [activeService, setActiveService] = useState("All")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null)
  const [isQuizOpen, setIsQuizOpen] = useState(false) // Стан для керування Квізом

  const [visibleCount, setVisibleCount] = useState(6)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setVisibleCount(mobile ? 3 : 6)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredCases = cases.filter((c) => {
    const matchCategory = activeCategory === "All" || c.category === activeCategory
    const matchService = activeService === "All" || c.service.includes(activeService)
    return matchCategory && matchService
  })

  const displayedCases = filteredCases.slice(0, visibleCount)
  const hasMore = visibleCount < filteredCases.length

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-red-600 selection:text-white pb-24 overflow-x-hidden">
      <ShutterEyes
        isOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        isScrolled={isScrolled}
        isHidden={!!selectedCase || isQuizOpen}
      />

      {/* MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-50 bg-white/95 backdrop-blur-2xl transition-all duration-500 ease-out flex flex-col ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <a
            href="#"
            className="text-2xl font-black tracking-tighter"
          >
            muratov<span className="text-red-600">.ai</span>
          </a>
        </div>
        <div className="flex-1 container mx-auto px-6 flex flex-col justify-center max-w-4xl relative z-10">
          <nav className="flex flex-col gap-6 md:gap-8">
            <a
              href="#"
              className={`text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 hover:text-red-600 hover:translate-x-4 transition-all duration-300 ${isMenuOpen ? "opacity-100 translate-y-0 delay-100" : "opacity-0 translate-y-8"}`}
            >
              For Brands
            </a>
            <a
              href="#"
              className={`text-5xl md:text-7xl lg:text-8xl font-black text-slate-400 hover:text-red-600 hover:translate-x-4 transition-all duration-300 ${isMenuOpen ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-8"}`}
            >
              For Creators
            </a>
            <a
              href="#"
              className={`text-5xl md:text-7xl lg:text-8xl font-black text-slate-400 hover:text-red-600 hover:translate-x-4 transition-all duration-300 ${isMenuOpen ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-8"}`}
            >
              Cases & Work
            </a>
          </nav>
          <div
            className={`mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-8"}`}
          >
            <button
              onClick={() => {
                setIsMenuOpen(false)
                setIsQuizOpen(true)
              }}
              className={`bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors flex items-center gap-2 ${focusRing}`}
            >
              {t("hero.cta_primary")} <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 pt-32 relative z-10 flex flex-col items-center">
        <div className="h-[220px] md:h-[280px] w-full shrink-0"></div>

        <header className="max-w-4xl mb-12 text-center relative z-10">
          <p className="text-red-600 font-bold tracking-widest uppercase text-sm mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {t("hero.badge")}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            {t("hero.title_part1")} <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-800">
              {t("hero.title_accent")}
            </span>
          </h1>
          <p className="mt-8 text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            {t("hero.description")}
          </p>
        </header>

        {/* FILTERS */}
        <section className="mb-12 flex flex-col items-center gap-6 w-full max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {services.map((service) => (
              <button
                key={service}
                onClick={() => {
                  setActiveService(service)
                  setVisibleCount(isMobile ? 3 : 6)
                }}
                className={`px-5 py-2 text-sm font-semibold transition-all border rounded-full ${activeService === service ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105" : "bg-white text-slate-600 border-slate-200 hover:border-red-600 hover:text-red-600 shadow-sm"} ${focusRing}`}
              >
                {service}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 justify-center items-center bg-white/60 backdrop-blur-xl border border-slate-200 shadow-[0_4px_15px_rgb(0,0,0,0.03)] rounded-full p-1.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category)
                  setVisibleCount(isMobile ? 3 : 6)
                }}
                className={`px-4 py-1.5 text-xs font-bold transition-all rounded-full ${activeCategory === category ? "bg-white text-slate-900 shadow-[0_2px_8px_rgb(0,0,0,0.08)] scale-100" : "bg-transparent text-slate-500 hover:text-slate-900 scale-95 hover:scale-100"} ${focusRing}`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* BENTO GRID */}
        {displayedCases.length > 0 ? (
          <div className="w-full max-w-7xl flex flex-col items-center">
            <section className="w-full grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 auto-rows-[100px] gap-4 md:gap-6 grid-flow-dense text-left relative z-10">
              {displayedCases.map((item, index) => {
                const title = tCases(`items.${item.id}.title`)
                const desc = tCases(`items.${item.id}.desc`)
                const localizedCategory = tCases(`categories.${item.category}`)
                const localizedService = tCases(`services.${item.service[0]}`)
                let spanClasses = ""
                if (item.format === "wide")
                  spanClasses = "col-span-1 md:col-span-8 lg:col-span-8 row-span-4 lg:row-span-5"
                else if (item.format === "tall")
                  spanClasses = "col-span-1 md:col-span-4 lg:col-span-4 row-span-5 md:row-span-6 lg:row-span-6"
                else if (item.format === "square")
                  spanClasses = "col-span-1 md:col-span-4 lg:col-span-4 row-span-4 lg:row-span-4"

                return (
                  <article
                    key={item.id}
                    className={`group relative bg-white rounded-3xl p-2 sm:p-3 border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col cursor-pointer animate-cinematic ${spanClasses}`}
                    onClick={() => setSelectedCase(item)}
                    style={{ animationDelay: `${(index % 6) * 100}ms` }}
                  >
                    <div className="relative w-full flex-1 rounded-2xl overflow-hidden bg-slate-100">
                      <Image
                        src={item.thumbnail || `https://i.ytimg.com/vi/${item.youtubeId}/maxresdefault.jpg`}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300"></div>
                      <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-red-600 text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm z-20">
                        {localizedCategory}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 z-20">
                        <div className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-red-600 shadow-lg">
                          <Play
                            fill="currentColor"
                            size={24}
                            className="ml-1"
                          />
                        </div>
                      </div>
                      <div className="hidden md:flex absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/10 to-transparent flex-col justify-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight line-clamp-2">
                            {title}
                          </h3>
                          <p className="text-xs font-bold text-red-400 uppercase tracking-wide mt-2 mb-1">
                            {localizedService}
                          </p>
                          <p className="text-sm text-slate-300 line-clamp-2">{desc}</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 px-2 pb-2 md:hidden">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-1">{title}</h3>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1 mb-1">
                        {localizedService}
                      </p>
                    </div>
                    <button
                      className={`absolute inset-0 w-full h-full z-30 rounded-3xl ${focusRing}`}
                      aria-label={t("grid.aria_view_case", { title })}
                    />
                  </article>
                )
              })}
            </section>

            {hasMore && (
              <div className="mt-20 relative z-10 animate-in fade-in duration-1000">
                <button
                  onClick={() => setVisibleCount((prev) => prev + (isMobile ? 3 : 6))}
                  className={`group relative px-10 py-5 bg-white border border-slate-200 rounded-full font-bold text-slate-900 flex items-center gap-4 transition-all hover:border-red-600 hover:shadow-2xl hover:shadow-red-600/10 ${focusRing}`}
                >
                  <span className="tracking-widest uppercase text-xs">{t("grid.load_more")}</span>
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white transition-transform group-hover:rotate-90">
                    <Plus
                      size={18}
                      strokeWidth={3}
                    />
                  </div>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-2xl py-24 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-200 border-dashed relative z-10">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t("empty_state.title")}</h3>
            <button
              onClick={() => {
                setActiveCategory("All")
                setActiveService("All")
              }}
              className={`px-6 py-2 bg-red-600 text-white text-sm font-bold rounded-full shadow-md ${focusRing}`}
            >
              {t("empty_state.reset")}
            </button>
          </div>
        )}
      </main>
      {/* OVERLAYS (Case Study / Quiz) */}
      <CaseStudyPage
        selectedCase={selectedCase}
        onClose={() => setSelectedCase(null)}
        openQuiz={() => setIsQuizOpen(true)}
      />
    </div>
  )
}
