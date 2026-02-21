//src/i18n/routing.ts

import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"

export const locales = ["en", "uk", "es"] as const
export type Locale = (typeof locales)[number]

// Конфігурація роутингу
export const routing = defineRouting({
  locales,
  defaultLocale: "en", // Фоллбек. Реальна логіка за замовчуванням буде в middleware
  localePrefix: "always", // Суворий формат /[locale]/
})

// Суворі обгортки для навігації.
// ПРАВИЛО: import Link from 'next/link' ЗАБОРОНЕНО. Використовуємо тільки ці імпорти.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
