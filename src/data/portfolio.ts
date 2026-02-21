export const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
export const focusRingDark =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"

export const categories = ["All", "SaaS", "DTC", "Real Estate", "Event", "Content", "B2B"]
export const services = ["All", "AI video production", "Motion Design", "Video Editing"]

export type CaseItem = {
  id: string
  client: string
  date: string
  category: string
  service: string[]
  format: "tall" | "wide" | "square"
  youtubeId: string
  thumbnail: string
}

// Конфігурація без текстового навантаження.
// Назви, описи та контент підтягуватимуться динамічно в компоненті через useTranslations('cases.items')
export const cases: CaseItem[] = [
  {
    id: "1",
    client: "TrySwitch",
    date: "10-Oct-2025 to 04-Nov-2025",
    category: "SaaS",
    service: ["Motion Design", "AI video production"],
    format: "wide",
    youtubeId: "voMfEtW0s68",
    thumbnail: "",
  },
  {
    id: "2",
    client: "AvoTechs",
    date: "24-Apr-2025 to 12-Jun-2025",
    category: "Content",
    service: ["AI video production"],
    format: "wide",
    youtubeId: "y_yynl64tX0",
    thumbnail: "",
  },
  {
    id: "3",
    client: "Onkar Gill",
    date: "29-Sep-2025 to 18-Jan-2026",
    category: "SaaS",
    service: ["AI video production", "Video Editing"],
    format: "tall",
    youtubeId: "6IolzCie1eQ",
    thumbnail: "",
  },
  {
    id: "4",
    client: "magick.house",
    date: "6-Oct-2025 to 28-Oct-2025",
    category: "DTC",
    service: ["AI video production"],
    format: "tall",
    youtubeId: "jr7zu96Jhfw",
    thumbnail: "",
  },
  {
    id: "5",
    client: "DigitalGenius",
    date: "13-Jan-2025 to 25-Feb-2025",
    category: "B2B",
    service: ["Motion Design"],
    format: "tall",
    youtubeId: "5U_G8C3UifQ",
    thumbnail: "",
  },
  {
    id: "6",
    client: "TrySwitch (Juan Montes)",
    date: "7-Nov-2025 to 18-Jan-2026",
    category: "Content",
    service: ["AI video production"],
    format: "wide",
    youtubeId: "jcK-e6DMI4o",
    thumbnail: "",
  },
  {
    id: "7",
    client: "Ervin Dhima",
    date: "28-Oct-2025",
    category: "DTC",
    service: ["AI video production", "Video Editing"],
    format: "tall",
    youtubeId: "E4nLr1leaZ4",
    thumbnail: "",
  },
  {
    id: "8",
    client: "Triviat AI",
    date: "13-Mar-2025 to 24-Mar-2025",
    category: "SaaS",
    service: ["AI video production", "Motion Design"],
    format: "tall",
    youtubeId: "9qWPbYbKhrU",
    thumbnail: "",
  },
  {
    id: "9",
    client: "Automators",
    date: "27-Jan-2025 to 14-Aug-2025",
    category: "SaaS",
    service: ["AI video production"],
    format: "tall",
    youtubeId: "v5PHvWJ5Tcc",
    thumbnail: "",
  },
  {
    id: "10",
    client: "Sam Habib",
    date: "10-Mar-2025 to 14-Apr-2025",
    category: "DTC",
    service: ["AI video production", "Motion Design"],
    format: "tall",
    youtubeId: "3Dup_O9X5XE",
    thumbnail: "",
  },
  {
    id: "11",
    client: "Creative Capital",
    date: "7-May-2025 to 12-Sep-2025",
    category: "Content",
    service: ["Video Editing"],
    format: "wide",
    youtubeId: "C37Dfmco4xM",
    thumbnail: "",
  },
  {
    id: "12",
    client: "Koo Inc (Rami Friedman)",
    date: "28-May-2025 to 25-Sep-2025",
    category: "SaaS",
    service: ["Video Editing"],
    format: "tall",
    youtubeId: "hBctxtg6LsI",
    thumbnail: "",
  },
  {
    id: "13",
    client: "Confidential",
    date: "2025",
    category: "Content",
    service: ["Video Editing"],
    format: "tall",
    youtubeId: "dRQoeSmDNOw",
    thumbnail: "",
  },
  {
    id: "14",
    client: "HBR Media Inc",
    date: "22-Jan-2026",
    category: "DTC",
    service: ["AI video production", "Video Editing"],
    format: "tall",
    youtubeId: "HTZniPkMVxg",
    thumbnail: "",
  },
  {
    id: "15",
    client: "Division Sixty Five LLC FZ",
    date: "12-Nov-2024 to 19-Dec-2024",
    category: "DTC",
    service: ["Motion Design"],
    format: "tall",
    youtubeId: "FXx3SdsM2hk",
    thumbnail: "",
  },
]
