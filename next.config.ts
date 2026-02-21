import createNextIntlPlugin from "next-intl/plugin"

// Вказуємо точний шлях до вашого файлу конфігурації
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // прибираємо X-Powered-By для безпеки та швидкості
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default withNextIntl(nextConfig)
