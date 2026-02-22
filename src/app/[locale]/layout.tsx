//src/app/[locale]/layout.tsx

import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import "../globals.css"

import ClientLayout from "@/components/layout/LayoutClientWrapper"

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

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
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "icon", type: "image/png", sizes: "192x192", url: "/icons/icon-192x192.png" },
    { rel: "icon", type: "image/png", sizes: "512x512", url: "/icons/icon-512x512.png" },
    { rel: "apple-touch-icon", sizes: "192x192", url: "/icons/icon-192x192.png" },
    { rel: "apple-touch-icon", sizes: "512x512", url: "/icons/icon-512x512.png" },
  ],
  manifest: "/manifest.json",
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900 selection:bg-crimson-600 selection:text-white min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          {/* Обгортаємо додаток у клієнтський Layout */}
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
