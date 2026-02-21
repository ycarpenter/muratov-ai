import { NextRequest, NextResponse } from "next/server"
import { routing } from "./routing"

/**
 * Edge Proxy Engine: Обробляє геолокацію та мовні префікси
 * без зайвого навантаження на основний потік виконання.
 */
export const handleLocaleProxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl

  // 1. Визначаємо локаль на основі країни (Rule: UA -> uk, else -> en)
  const country = request.headers.get("x-vercel-ip-country") || "US"
  const detectedLocale = country === "UA" ? "uk" : "en"

  // 2. Перевіряємо, чи шлях вже має локаль
  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return NextResponse.next()

  // 3. Редирект на основі проксі-логіки (SEO-friendly 307)
  const url = new URL(`/${detectedLocale}${pathname}`, request.url)

  // Зберігаємо query-параметри для маркетингових цілей (UTM)
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value)
  })

  return NextResponse.redirect(url)
}
