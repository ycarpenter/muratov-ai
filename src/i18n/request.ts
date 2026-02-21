import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  // Валідація локалі
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    // Завантаження словників. Використовуємо динамічний імпорт для code splitting.
    messages: (await import(`./messages/${locale}/common.json`)).default,
  }
})
