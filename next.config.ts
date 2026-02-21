import createNextIntlPlugin from "next-intl/plugin"

// Вказуємо точний шлях до вашого файлу конфігурації
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // прибираємо X-Powered-By для безпеки та швидкості
  poweredByHeader: false,
}

export default withNextIntl(nextConfig)
