"use client"

import React, { useState } from "react"
import { ArrowLeft, Play, X } from "lucide-react"

// Якщо у вас типи лежать в іншому файлі, імпортуйте їх звідти.
// Наприклад: import type { CaseItem } from "@/lib/data/portfolio"
export interface CaseItem {
  id: string
  title: string
  client: string
  category: string
  service: string[]
  format: "tall" | "wide" | "square"
  youtubeId: string
  thumbnail: string
  desc: string
  content: {
    vision: string
    execution: string
  }
}

interface CaseStudyPageProps {
  selectedCase: CaseItem | null
  onClose: () => void
  openQuiz: () => void
}

export function CaseStudyPage({ selectedCase, onClose, openQuiz }: CaseStudyPageProps) {
  // Стан для повноекранного плеєра
  const [isFullVideoOpen, setIsFullVideoOpen] = useState(false)

  // Якщо кейс не обрано — нічого не рендеримо
  if (!selectedCase) return null

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
        <section className="relative w-full h-100vh bg-black flex flex-col justify-end overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            {/* Трюк з масштабуванням iframe, щоб приховати рамки YouTube */}
            <iframe
              className="absolute w-[300vw] h-[300vh] sm:w-[150vw] sm:h-[150vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-[1.05]"
              src={`https://www.youtube.com/embed/${selectedCase.youtubeId}?autoplay=1&mute=1&modestbranding=1&rel=0&controls=0&showinfo=0&loop=1&playlist=${selectedCase.youtubeId}&color=white`}
              title={selectedCase.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              style={{ border: "none" }}
            />
            {/* Віньєтка для глибини та кіно-ефекту */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.85)_100%)] pointer-events-none"></div>
            {/* Градієнт знизу, щоб текст ідеально читався */}
            <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-linear-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none"></div>
          </div>

          {/* Заголовок поверх відео */}
          <div className="relative z-10 container mx-auto px-6 md:px-12 pb-20 md:pb-32">
            <div className="flex gap-4 mb-8">
              <span className="text-red-600 text-xs font-bold tracking-[0.2em] uppercase">{selectedCase.service}</span>
              <span className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase">
                {selectedCase.category}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-6xl font-black text-white tracking-tighter leading-[0.85] max-w-5xl drop-shadow-2xl">
              {selectedCase.title}
            </h1>

            {/* Кнопка "See full video" */}
            <button
              onClick={() => setIsFullVideoOpen(true)}
              className={`mt-10 inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 backdrop-blur-md ${focusRingDark}`}
            >
              <Play
                size={18}
                className="text-red-500 fill-red-500"
              />
              See full video
            </button>
          </div>
        </section>

        {/* 2. THE NARRATIVE (Мінімалістичний сторітелінг) */}
        <section className="container mx-auto px-6 md:px-12 py-32 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            {/* Короткий опис (Лід) */}
            <div className="md:col-span-12 lg:col-span-10 lg:col-start-2 text-center">
              <p className="text-2xl md:text-4xl text-white font-light leading-snug">{selectedCase.desc}</p>
            </div>

            {/* Деталі */}
            <div className="md:col-span-12 lg:col-span-5 lg:col-start-2 flex flex-col gap-12 pt-16 border-t border-slate-900">
              <div>
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-6">The Vision</h4>
                <p className="text-slate-400 leading-relaxed text-lg">{selectedCase.content?.vision}</p>
              </div>
            </div>

            <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-12 pt-16 border-t border-slate-900">
              <div>
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-6">Execution</h4>
                <p className="text-slate-400 leading-relaxed text-lg">{selectedCase.content?.execution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ELEGANT NEXT STEP (Ініціалізація Квізу) */}
        <section className="container mx-auto px-6 md:px-12 pt-16 pb-40 border-t border-slate-900 text-center">
          <p className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-8">End of Sequence</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-12">
            Ready to direct your <br className="hidden md:block" /> own narrative?
          </h2>
          <button
            onClick={openQuiz}
            className={`bg-transparent border border-slate-700 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-white hover:text-black hover:border-white transition-all duration-300 ${focusRingDark}`}
          >
            Initiate Project
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
              title={selectedCase.title}
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
