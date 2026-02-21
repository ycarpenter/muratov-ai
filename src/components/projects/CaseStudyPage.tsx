"use client"

import React, { useState } from "react"
import { ArrowLeft, Play, X } from "lucide-react"
import { useTranslations } from "next-intl"

import type { CaseItem } from "@/data/portfolio"

interface CaseStudyPageProps {
  selectedCase: CaseItem | null
  onClose: () => void
  openQuiz: () => void
}

export function CaseStudyPage({ selectedCase, onClose, openQuiz }: CaseStudyPageProps) {
  // Стан для повноекранного плеєра
  const [isFullVideoOpen, setIsFullVideoOpen] = useState(false)
  const tCases = useTranslations("cases")

  // Якщо кейс не обрано — нічого не рендеримо
  if (!selectedCase) return null

  const title = tCases(`items.${selectedCase.id}.title`)
  const desc = tCases(`items.${selectedCase.id}.desc`)
  const vision = tCases(`items.${selectedCase.id}.vision`)
  const execution = tCases(`items.${selectedCase.id}.execution`)
  const localizedCategory = tCases(`categories.${selectedCase.category}`)

  const focusRingDark =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"

  return (
    <div className="fixed inset-0 z-100 bg-[#050505] text-slate-300 font-sans selection:bg-red-600 selection:text-white animate-in fade-in duration-700 overflow-x-hidden overflow-y-auto">
      {/* Мінімалістична темна навігація */}
      <nav className="fixed top-0 left-0 right-0 h-24 px-6 md:px-12 flex items-center justify-between bg-linear-to-b from-[#050505]/90 to-transparent z-50 pointer-events-none">
        <button
          onClick={onClose}
          className={`flex items-center gap-3 font-medium text-sm text-slate-400 hover:text-white transition-all group pointer-events-auto ${focusRingDark} rounded-full`}
        >
          <div className="w-10 h-10 rounded-full border border-slate-800 bg-black/50 backdrop-blur-md flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600/10 transition-all">
            <ArrowLeft
              size={16}
              className="text-white transition-transform group-hover:-translate-x-1"
            />
          </div>
          <span className="hidden sm:inline tracking-widest uppercase text-xs">Close Project</span>
        </button>
      </nav>

      <main className="w-full relative">
        {/* 1. CINEMATIC HERO (Повноекранний фоновий плеєр) */}
        <section
          className={`relative w-full h-[65svh] sm:h-[100svh] sm:min-h-[600px] bg-black flex flex-col items-center justify-end overflow-hidden ${selectedCase.format === "tall" ? "pt-24, h-[100svh]" : ""}`}
        >
          {/* ФОНОВЕ ВІДЕО */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <iframe
              className={`absolute sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.05] ${
                selectedCase.format === "tall"
                  ? "top-1/2 w-[140vw] h-[140vh] md:w-[120vw] md:h-[150vh]" // Вертикальні відео: легкий зум на мобільному, сильний по висоті на десктопі
                  : selectedCase.format === "square"
                    ? "w-[250vw] h-[250vh] md:w-[150vw] md:h-[200vh]" // Квадратні відео
                    : "top-1/4 w-[150vw] h-[150vh] md:w-[120vw] md:h-[120vh]" // Горизонтальні відео: максимальний зум на мобільному для покриття фону
              }`}
              src={`https://www.youtube-nocookie.com/embed/${selectedCase.youtubeId}?autoplay=1&mute=1&modestbranding=1&rel=0&controls=0&showinfo=0&loop=1&playlist=${selectedCase.youtubeId}&color=white`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              style={{ border: "none" }}
            />
            {/* Градієнти для читабельності тексту */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.75)_100%)]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent"></div>
          </div>

          {/* КОНТЕНТ (Заголовок) */}
          <div className="relative z-10 container mx-auto px-6 md:px-12 pb-16 md:pb-32 flex flex-col items-start w-full">
            <div className="flex gap-4 mb-6 md:mb-8 flex-wrap">
              {/* Виводимо всі сервіси, якщо їх декілька */}
              {selectedCase.service.map((s) => (
                <span
                  key={s}
                  className="text-red-600 text-xs font-bold tracking-[0.2em] uppercase"
                >
                  {tCases(`services.${s}`)}
                </span>
              ))}
              <span className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase">{localizedCategory}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tighter leading-[0.9] max-w-6xl drop-shadow-2xl">
              {title}
            </h1>

            <button
              onClick={() => setIsFullVideoOpen(true)}
              className={`mt-8 md:mt-12 inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm transition-all duration-300 backdrop-blur-md shadow-xl ${focusRingDark}`}
            >
              <Play
                size={18}
                className="text-red-500 fill-red-500"
              />
              {tCases("seeFullVideo")}
            </button>
          </div>
        </section>

        {/* 2. THE NARRATIVE (Мінімалістичний сторітелінг) */}
        <section className="container mx-auto px-6 md:px-12 py-32 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            {/* Короткий опис (Лід) */}
            <div className="md:col-span-12 lg:col-span-10 lg:col-start-2 text-center">
              <p className="text-2xl md:text-4xl text-white font-light leading-snug">{desc}</p>
            </div>

            {/* Деталі */}
            <div className="md:col-span-12 lg:col-span-5 lg:col-start-2 flex flex-col gap-12 pt-16 border-t border-slate-900">
              <div>
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-6">{tCases("vision")}</h4>
                <p className="text-slate-400 leading-relaxed text-lg">{vision}</p>
              </div>
            </div>

            <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-12 pt-16 border-t border-slate-900">
              <div>
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-6">
                  {tCases("execution")}
                </h4>
                <p className="text-slate-400 leading-relaxed text-lg">{execution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ELEGANT NEXT STEP (Ініціалізація Квізу) */}
        <section className="container mx-auto px-6 md:px-12 pt-16 pb-40 border-t border-slate-900 text-center">
          <p className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-8">{tCases("endOfSequence")}</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-12">
            {tCases("readyToDirect")}
          </h2>
          <button
            onClick={openQuiz}
            className={`bg-transparent border border-slate-700 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-white hover:text-black hover:border-white transition-all duration-300 ${focusRingDark}`}
          >
            {tCases("initiateProject")}
          </button>
        </section>
      </main>

      {/* 4. FULL VIDEO MODAL */}
      {isFullVideoOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4 md:p-8 lg:p-12 animate-in fade-in duration-300">
          {/* Темний напівпрозорий backdrop */}
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
            onClick={() => setIsFullVideoOpen(false)}
          />

          {/* Контейнер відео — адаптується до формату (tall або wide) */}
          <div
            className={`relative w-full max-h-full bg-black rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-black/70 z-10 animate-in zoom-in-95 duration-300 ${
              selectedCase.format === "tall" ? "max-w-[45vh] aspect-9/16" : "max-w-6xl aspect-video"
            }`}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${selectedCase.youtubeId}?autoplay=1&rel=0&modestbranding=1&color=white`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              style={{ border: "none" }}
            />
          </div>

          {/* Кнопка закриття */}
          <button
            onClick={() => setIsFullVideoOpen(false)}
            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all z-20"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </div>
  )
}
