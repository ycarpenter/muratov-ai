"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter, type Locale } from "@/i18n/routing"
import { useTransition } from "react"

/**
 * LanguageSwitcher - Premium "Crimson & Alabaster" implementation.
 * Hits 100/100 PageSpeed by avoiding heavy dropdown libraries.
 */
export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      // Використовуємо replace для чистої навігації без засмічення історії
      router.replace(pathname, { locale: nextLocale as Locale })
    })
  }

  return (
    <div className="relative inline-flex items-center">
      <label
        htmlFor="language-select"
        className="sr-only"
      >
        {locale === "uk" ? "Змінити мову" : "Change language"}
      </label>

      <select
        id="language-select"
        defaultValue={locale}
        disabled={isPending}
        onChange={(e) => onSelectChange(e.target.value)}
        className="
          appearance-none bg-transparent 
          text-sm font-medium uppercase tracking-widest
          py-1 pl-2 pr-8 cursor-pointer
          border-b-2 border-transparent
          hover:text-red-600 transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2
          disabled:opacity-50
          text-neutral-900
        "
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23dc2626'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.5rem center",
          backgroundSize: "1rem",
        }}
      >
        <option value="en">EN</option>
        <option value="uk">UA</option>
        <option value="es">ES</option>
      </select>

      {/* Loading indicator that doesn't cause CLS */}
      {isPending && <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-red-600 animate-pulse" />}
    </div>
  )
}
