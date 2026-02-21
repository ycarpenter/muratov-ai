"use client"

import { useState, useEffect } from "react"
import ProjectQuiz from "@/components/features/quiz/quizForm"
import { Header } from "@/components/header/Header"
import { Footer } from "@/components/footer/Footer"

export function ClientPageShell({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    // Run once on mount
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <Header
        isScrolled={isScrolled}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />
      {children}
      <Footer onOpenQuiz={() => setIsQuizOpen(true)} />
      {isQuizOpen && <ProjectQuiz onClose={() => setIsQuizOpen(false)} />}
    </>
  )
}
