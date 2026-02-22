//src/app/page.tsx

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { routing } from "@/i18n/routing"

/**
 * Root Entry Point (Server Component)
 * Блискавичний редирект на базі геолокації та мови браузера.
 */
export default async function RootPage() {
  const headersList = await headers()

  // 1. Геолокація: Якщо користувач фізично в Україні -> uk
  const country = headersList.get("x-vercel-ip-country")
  if (country === "UA") {
    redirect("/uk")
  }

  // 2. Мова браузера: Якщо ОС або браузер налаштовані на іспанську -> es
  // Читаємо стандартний заголовок, наприклад: "es-ES,es;q=0.9"
  const acceptLanguage = headersList.get("accept-language") || ""
  if (acceptLanguage.toLowerCase().startsWith("es")) {
    redirect("/es")
  }

  // 3. Фолбек: Всі інші -> en (defaultLocale)
  redirect(`/${routing.defaultLocale}`)
}
