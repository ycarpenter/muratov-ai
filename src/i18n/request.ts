import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  // Валідація локалі
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale
  }

  // Завантаження словників.
  // Групуємо їх у простори імен, щоб уникнути конфліктів ключів.
  // Виклик у компонентах буде: const t = useTranslations('common.nav') або useTranslations('cases...')
  return {
    locale,
    messages: {
      common: (await import(`./messages/${locale}/common.json`)).default,
      cases: (await import(`./messages/${locale}/cases.json`)).default,
    },
  }
})
