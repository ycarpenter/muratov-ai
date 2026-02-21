import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing" // Відносний шлях до routing.ts
import "../globals.css"

// Оптимізація шрифтів Geist (усуває FOIT/CLS)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "muratov.ai | Creative Production Studio",
  description: "Visual Storytelling. High-converting video ads for SaaS and DTC brands.",
}

// Генерація статичних параметрів для 100/100 Performance
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }> // У Next.js 15+ params є Promise
}>) {
  const { locale } = await params

  // Валідація локалі. Якщо URL містить неіснуючу мову, віддаємо 404
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  // Обов'язково для статичної генерації сторінок
  setRequestLocale(locale)

  // Завантажуємо наші словники (common.json) на сервері
  const messages = await getMessages()

  return (
    // A11y: Динамічний атрибут lang для скрінрідерів та SEO
    <html lang={locale}>
      <body
        // Застосовуємо шрифти та наші токени Crimson & Alabaster
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900 selection:bg-crimson-600 selection:text-white min-h-screen`}
      >
        {/* Провайдер передає словники у клієнтські компоненти без зайвого JS-бандлу */}
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
