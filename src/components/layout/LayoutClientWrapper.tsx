//src/components/layout/LayoutClientWrapper.tsx

"use client"

import React, { useState, useEffect } from "react"
import { Header } from "@/components/header/Header"
import { Footer } from "@/components/footer/Footer"
import ProjectQuiz from "@/components/features/quiz/quizForm"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  // Відстежуємо скрол для Header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // НОВЕ: Слухаємо глобальну подію для відкриття квізу з будь-якої сторінки
  useEffect(() => {
    const handleOpenQuiz = () => setIsQuizOpen(true)
    window.addEventListener("open-quiz", handleOpenQuiz)
    return () => window.removeEventListener("open-quiz", handleOpenQuiz)
  }, [])

  // Блокуємо скрол фону, тільки коли відкритий глобальний квіз
  useEffect(() => {
    if (isQuizOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isQuizOpen])

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden bg-[#fafafa] text-slate-900 font-sans selection:bg-red-600 selection:text-white">
      <Header
        isScrolled={isScrolled}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Основний контент сторінки */}
      <div className="grow">{children}</div>

      <Footer onOpenQuiz={() => setIsQuizOpen(true)} />

      {/* Глобальне модальне вікно Квізу */}
      {isQuizOpen && <ProjectQuiz onClose={() => setIsQuizOpen(false)} />}
    </div>
  )
}
