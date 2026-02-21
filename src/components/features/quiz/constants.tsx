import React from "react"
import { MonitorPlay, Film, Scissors } from "lucide-react"

export const QUIZ_SERVICES = [
  { id: "ai_video", label: "ШІ відео", icon: <MonitorPlay size={24} /> },
  { id: "video_editing", label: "Відео монтаж", icon: <Scissors size={24} /> },
  { id: "motion_design", label: "Моушн дизайн", icon: <Film size={24} /> },
]

export const QUIZ_DURATIONS = ["10-20 секунд", "21-45 секунд", "90 секунд", "90+ секунд", "11+ хвилин", "1+ годин"]

export const getCountryInfo = (phone: string) => {
  if (phone.startsWith("+380")) return { flag: "🇺🇦", mask: "+380 (XX) XXX-XX-XX" }
  if (phone.startsWith("+1")) return { flag: "🇺🇸", mask: "+1 (XXX) XXX-XXXX" }
  if (phone.startsWith("+44")) return { flag: "🇬🇧", mask: "+44 XXXX XXXXXX" }
  if (phone.startsWith("+48")) return { flag: "🇵🇱", mask: "+48 XXX XXX XXX" }
  if (phone.startsWith("+49")) return { flag: "🇩🇪", mask: "+49 XXXX XXXXXXX" }
  if (phone.startsWith("+33")) return { flag: "🇫🇷", mask: "+33 X XX XX XX XX" }
  if (phone.length > 1) return { flag: "🌍", mask: "Міжнародний номер" }
  return { flag: "🏳️", mask: "Введіть код країни" }
}
