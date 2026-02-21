"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  ArrowRight,
  Play,
  ArrowLeft,
  Plus,
  ExternalLink,
  Send,
  CheckCircle2,
  MonitorPlay,
  Film,
  Scissors,
  Mail,
  MessageCircle,
  Phone,
  X,
} from "lucide-react"

// ==========================================
// ---> Глобальні стилі (global.css)
// ==========================================
const globalStyles = `
  @keyframes glow {
      0% { filter: drop-shadow(0 0 2px #dc2626) brightness(1); opacity: 0.8; }
      50% { filter: drop-shadow(0 0 10px #dc2626) brightness(1.3); opacity: 1; }
      100% { filter: drop-shadow(0 0 2px #dc2626) brightness(1); opacity: 0.8; }
  }
  @keyframes wiggle {
      0%, 100% { transform: scale(1.1) rotate(0deg); }
      25% { transform: scale(1.1) rotate(-15deg); }
      75% { transform: scale(1.1) rotate(15deg); }
  }
  .group:hover .hover-wiggle {
      animation: wiggle 0.4s ease-in-out infinite;
  }
  .red-ring-active { animation: glow 4s infinite ease-in-out; }
  .pupil-core { transition: transform 0.15s ease-out; }
  
  /* Cinematic Fade In for Grid Items */
  @keyframes cinematicFade {
    from { opacity: 0; transform: translateY(30px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .animate-cinematic {
    animation: cinematicFade 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
`

const GlobalStyles = () => <style>{globalStyles}</style>

// ==========================================
// ---> Дані та Константи (src/lib/data.js)
// ==========================================
export const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
export const focusRingDark =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"

export const categories = ["All", "SaaS", "DTC", "Real Estate", "Event", "Content", "B2B"]
export const services = ["All", "AI video production", "Motion Design", "Video Editing"]

export const cases = [
  {
    id: "1",
    title: "Short motion graphics video",
    client: "Division Sixty Five LLC FZ",
    category: "Content",
    service: "Motion Design",
    format: "tall",
    youtubeId: "FXx3SdsM2hk",
    thumbnail: "https://img.youtube.com/vi/FXx3SdsM2hk/hqdefault.jpg",
    desc: "High-paced vertical motion graphics optimized for social media.",
    content: {
      vision: "To deliver a fast-paced, visually engaging sequence optimized for vertical scrolling feeds.",
      execution:
        "Utilized advanced motion tracking, 3D elements, and kinetic typography to capture attention in the first 3 seconds.",
    },
  },
  {
    id: "2",
    title: "Animated video for Instagram and LinkedIn advertising",
    client: "Iain Moss",
    category: "B2B",
    service: "Motion Design",
    format: "tall",
    youtubeId: "5U_G8C3UifQ",
    thumbnail: "https://img.youtube.com/vi/5U_G8C3UifQ/hqdefault.jpg",
    desc: "Engaging animated advertisement tailored for professional networks.",
    content: {
      vision:
        "Translating complex value propositions into a clean, professional animation suitable for LinkedIn and Instagram.",
      execution:
        "Designed a sleek, corporate-friendly vector animation with smooth transitions and clear calls to action.",
    },
  },
  {
    id: "3",
    title: "Brut marketing",
    client: "Confidential",
    category: "Content",
    service: "Video Editing",
    format: "tall",
    youtubeId: "dRQoeSmDNOw",
    thumbnail: "https://img.youtube.com/vi/dRQoeSmDNOw/hqdefault.jpg",
    desc: "Raw, authentic marketing format inspired by the Brut video style.",
    content: {
      vision: "To create a highly shareable, news-style informational video using bold typography and rapid pacing.",
      execution:
        "Combined striking yellow/white text overlays with high-contrast footage to maximize readability on mobile.",
    },
  },
  {
    id: "4",
    title: "AI Generated Video Ad for Linkedin",
    client: "Automators",
    category: "SaaS",
    service: "AI video production",
    format: "tall",
    youtubeId: "v5PHvWJ5Tcc",
    thumbnail: "https://img.youtube.com/vi/v5PHvWJ5Tcc/hqdefault.jpg",
    desc: "AI-synthesized video advertisement targeted at B2B decision makers.",
    content: {
      vision:
        "Leveraging cutting-edge AI generation to showcase automation services in a futuristic, high-tech aesthetic.",
      execution:
        "Integrated AI-generated avatars and synthetic voiceovers with dynamic B-roll specific to the SaaS industry.",
    },
  },
  {
    id: "5",
    title: "Social Media Video for Instagram and TikTok",
    client: "Sam Habib",
    category: "DTC",
    service: "Video Editing",
    format: "tall",
    youtubeId: "3Dup_O9X5XE",
    thumbnail: "https://img.youtube.com/vi/3Dup_O9X5XE/hqdefault.jpg",
    desc: "High-retention social media edit built around current platform trends.",
    content: {
      vision: "Creating a native-feeling piece of content that blends organically into the For You Page.",
      execution:
        "Applied aggressive jump-cutting, sound effect layering, and trending audio to ensure maximum viewer retention.",
    },
  },
  {
    id: "6",
    title: "Video for Triviat AI",
    client: "Olga Rotanenko",
    category: "SaaS",
    service: "AI video production",
    format: "tall",
    youtubeId: "9qWPbYbKhrU",
    thumbnail: "https://img.youtube.com/vi/9qWPbYbKhrU/hqdefault.jpg",
    desc: "Promotional short-form content explaining the Triviat AI platform.",
    content: {
      vision:
        "Simplifying an AI product's features into an easily digestible and visually stimulating vertical format.",
      execution: "Used glassmorphism UI mockups combined with fast, engaging voiceover and kinetic text.",
    },
  },
  {
    id: "7",
    title: "AI-generated motivational video for programmers",
    client: "AvoTechs",
    category: "Content",
    service: "AI video production",
    format: "wide",
    youtubeId: "y_yynl64tX0",
    thumbnail: "https://img.youtube.com/vi/y_yynl64tX0/hqdefault.jpg",
    desc: "Cinematic, AI-crafted motivational piece aimed at the developer community.",
    content: {
      vision: "To inspire and resonate with software engineers through abstract, cyberpunk-inspired visual metaphors.",
      execution:
        "Stitched together Midjourney and Runway Gen-2 outputs, color-graded to a dark, neon aesthetic with epic sound design.",
    },
  },
  {
    id: "8",
    title: "Documentary style editing for high-retention YouTube channel",
    client: "Creative Capital",
    category: "Content",
    service: "Video Editing",
    format: "wide",
    youtubeId: "C37Dfmco4xM",
    thumbnail: "https://img.youtube.com/vi/C37Dfmco4xM/hqdefault.jpg",
    desc: "Long-form, narrative-driven editing designed for high watch-time.",
    content: {
      vision:
        "Applying Netflix-tier documentary pacing and storytelling to YouTube content to maximize average view duration.",
      execution: "Extensive use of J-cuts, L-cuts, archival footage sourcing, and emotional music scoring.",
    },
  },
  {
    id: "9",
    title: "Creative Video for Humorous Tech Marketing",
    client: "Koo Inc",
    category: "SaaS",
    service: "Video Editing",
    format: "tall",
    youtubeId: "hBctxtg6LsI",
    thumbnail: "https://img.youtube.com/vi/hBctxtg6LsI/hqdefault.jpg",
    desc: "Comedy-driven marketing campaign to humanize a tech brand.",
    content: {
      vision: "To break the 'boring corporate' stereotype through witty, perfectly timed comedic editing.",
      execution: "Focused on comedic timing, awkward zooms, and deadpan sound effects to enhance the script's humor.",
    },
  },
  {
    id: "10",
    title: "AI Video Creating for Short Scripted Videos",
    client: "10103454 Canada Inc",
    category: "Content",
    service: "AI video production",
    format: "tall",
    youtubeId: "6IolzCie1eQ",
    thumbnail: "https://img.youtube.com/vi/6IolzCie1eQ/hqdefault.jpg",
    desc: "Bringing written scripts to life entirely through AI generative tools.",
    content: {
      vision:
        "To establish a fully synthetic production pipeline capable of turning text prompts into polished social videos.",
      execution:
        "Combined AI script-doctoring, synthetic voiceover, and generative video clips seamlessly edited together.",
    },
  },
  {
    id: "11",
    title: "Ai videos ads",
    client: "magick.house",
    category: "DTC",
    service: "AI video production",
    format: "tall",
    youtubeId: "jr7zu96Jhfw",
    thumbnail: "https://img.youtube.com/vi/jr7zu96Jhfw/hqdefault.jpg",
    desc: "Direct-response advertising utilizing AI visuals to lower CPA.",
    content: {
      vision: "Testing highly creative, impossible-to-film concepts using AI to see what stops the scroll best.",
      execution: "Produced hyper-realistic, surreal product visuals that immediately capture attention.",
    },
  },
  {
    id: "12",
    title: "Explainer video for AI tool for EMS documentation",
    client: "TrySwitch",
    category: "SaaS",
    service: "Motion Design",
    format: "wide",
    youtubeId: "voMfEtW0s68",
    thumbnail: "https://img.youtube.com/vi/voMfEtW0s68/hqdefault.jpg",
    desc: "Clear, professional explainer breaking down a complex healthcare AI tool.",
    content: {
      vision: "To communicate efficiency, compliance, and ease-of-use to medical professionals.",
      execution: "Created a clean, diagram-based motion graphic style using a trustworthy medical color palette.",
    },
  },
  {
    id: "13",
    title: "Explainer video and comic-style AI video series",
    client: "TrySwitch",
    category: "Content",
    service: "AI video production",
    format: "wide",
    youtubeId: "jcK-e6DMI4o",
    thumbnail: "https://img.youtube.com/vi/jcK-e6DMI4o/hqdefault.jpg",
    desc: "A unique, comic-book inspired narrative series powered by AI.",
    content: {
      vision: "To build a recurring, recognizable character and visual style that audiences look forward to.",
      execution:
        "Generated consistent character designs via AI, animating them with a halftone comic-book overlay style.",
    },
  },
  {
    id: "14",
    title: "Video Creation from Audio for Facebook Ad",
    client: "Ervin Dhima",
    category: "DTC",
    service: "Video Editing",
    format: "tall",
    youtubeId: "E4nLr1leaZ4",
    thumbnail: "https://img.youtube.com/vi/E4nLr1leaZ4/hqdefault.jpg",
    desc: "Turning a raw voiceover track into a high-converting Facebook Ad.",
    content: {
      vision:
        "To source and edit high-quality stock and B-roll that perfectly matches the inflection and tone of the audio track.",
      execution:
        "Rigorous sourcing of visual assets, paired with dynamic captions to catch viewers watching without sound.",
    },
  },
  {
    id: "15",
    title: "Facebook Ad Video Editor / UGC Compilation",
    client: "HBR Media Inc",
    category: "DTC",
    service: "Video Editing",
    format: "tall",
    youtubeId: "HTZniPkMVxg",
    thumbnail: "https://img.youtube.com/vi/HTZniPkMVxg/hqdefault.jpg",
    desc: "Mashup of User Generated Content optimized for paid social.",
    content: {
      vision: "Creating trust through volume. Compiling multiple positive reviews into a fast, persuasive ad.",
      execution:
        "Spliced the best hooks from various creators, leveled the audio, and added a unifying brand graphics package.",
    },
  },
]

const QUIZ_SERVICES = [
  { id: "ai_video", label: "ШІ відео", icon: <MonitorPlay size={24} /> },
  { id: "video_editing", label: "Відео монтаж", icon: <Scissors size={24} /> },
  { id: "motion_design", label: "Моушн дизайн", icon: <Film size={24} /> },
]

const QUIZ_DURATIONS = ["10-20 секунд", "21-45 секунд", "90 секунд", "90+ секунд", "11+ хвилин", "1+ годин"]

// ==========================================
// ---> src/components/ProjectQuiz.jsx
// ==========================================
const getCountryInfo = (phone: string) => {
  if (phone.startsWith("+380")) return { flag: "🇺🇦", mask: "+380 (XX) XXX-XX-XX" }
  if (phone.startsWith("+1")) return { flag: "🇺🇸", mask: "+1 (XXX) XXX-XXXX" }
  if (phone.startsWith("+44")) return { flag: "🇬🇧", mask: "+44 XXXX XXXXXX" }
  if (phone.startsWith("+48")) return { flag: "🇵🇱", mask: "+48 XXX XXX XXX" }
  if (phone.startsWith("+49")) return { flag: "🇩🇪", mask: "+49 XXXX XXXXXXX" }
  if (phone.startsWith("+33")) return { flag: "🇫🇷", mask: "+33 X XX XX XX XX" }
  if (phone.length > 1) return { flag: "🌍", mask: "Міжнародний номер" }
  return { flag: "🏳️", mask: "Введіть код країни" }
}

const ProjectQuiz = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    service: "",
    duration: "",
    name: "",
    contactType: "email",
    contactValue: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    if (formData.contactType === "telegram") {
      val = val.replace(/\s+/g, "").replace(/@/g, "")
      setFormData({ ...formData, contactValue: val.length > 0 ? `@${val}` : "@" })
    } else if (formData.contactType === "whatsapp") {
      val = val.replace(/[^\d+]/g, "")
      if (!val.startsWith("+")) {
        val = "+" + val.replace(/\+/g, "")
      }
      setFormData({ ...formData, contactValue: val })
    } else {
      setFormData({ ...formData, contactValue: val })
    }
  }

  const handleContactTypeChange = (type: string) => {
    setFormData({
      ...formData,
      contactType: type,
      contactValue: type === "telegram" ? "@" : type === "whatsapp" ? "+" : "",
    })
  }

  const submitToNotion = async () => {
    setIsSubmitting(true)
    const finalData = {
      name: formData.name.trim(),
      service: formData.service,
      duration: formData.duration,
      contactMethod: formData.contactType,
      contactDetails:
        formData.contactType === "telegram" ? `t.me/${formData.contactValue.replace("@", "")}` : formData.contactValue,
    }

    console.log("Дані готові для відправки у Webhook (Notion):", finalData)

    try {
      // Імітація відправки даних
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSuccess(true)
    } catch (error) {
      console.error("Помилка відправки:", error)
      alert("Сталася помилка. Будь ласка, спробуйте пізніше.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const canGoNext = () => {
    if (step === 1) return formData.service !== ""
    if (step === 2) return formData.duration !== ""
    if (step === 3) {
      if (formData.name.trim().length < 2) return false
      if (formData.contactType === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactValue)) return false
      if (formData.contactType === "telegram" && formData.contactValue.length < 3) return false
      if (formData.contactType === "whatsapp" && formData.contactValue.length < 5) return false
      return true
    }
    return false
  }

  const glassCard =
    "bg-white/70 backdrop-blur-xl border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 sm:p-10 w-full"

  return (
    <div className="fixed inset-0 z-[200] bg-[#fafafa] flex flex-col items-center justify-center p-4 font-sans text-slate-900 selection:bg-red-600 selection:text-white animate-in fade-in zoom-in-95 duration-500 overflow-y-auto">
      {/* Кнопка закриття */}
      <button
        onClick={onClose}
        className={`absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 shadow-sm transition-all z-10 ${focusRing}`}
        aria-label="Close Quiz"
      >
        <X size={24} />
      </button>

      <div className="w-full max-w-2xl relative my-auto py-12">
        {!isSuccess && (
          <div className="mb-8 px-4">
            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              <span>Крок {step} з 3</span>
              <span className="text-red-600">{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-red-600 h-full transition-all duration-500 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className={`${glassCard} transition-all duration-500 relative overflow-hidden`}>
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Що будемо створювати?</h2>
              <p className="text-slate-500 mb-8">Оберіть основний напрямок для вашого проєкту.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {QUIZ_SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setFormData({ ...formData, service: s.label })}
                    className={`flex flex-col items-center justify-center text-center p-6 rounded-2xl border-2 transition-all duration-200 ${
                      formData.service === s.label
                        ? "border-red-600 bg-red-50 text-red-700 shadow-md"
                        : "border-slate-100 bg-white hover:border-red-200 hover:bg-slate-50 text-slate-600"
                    } ${focusRing}`}
                  >
                    <div className={`mb-4 ${formData.service === s.label ? "text-red-600" : "text-slate-400"}`}>
                      {s.icon}
                    </div>
                    <span className="font-bold">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Який хронометраж?</h2>
              <p className="text-slate-500 mb-8">Орієнтовна тривалість фінального відео.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {QUIZ_DURATIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setFormData({ ...formData, duration: d })}
                    className={`py-4 px-4 rounded-xl border-2 font-bold text-sm transition-all duration-200 ${
                      formData.duration === d
                        ? "border-red-600 bg-red-600 text-white shadow-md"
                        : "border-slate-100 bg-white hover:border-slate-200 text-slate-600"
                    } ${focusRing}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && !isSuccess && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Останній крок</h2>
              <p className="text-slate-500 mb-8">Залиште контакти, і ми зв&apos;яжемося для обговорення деталей.</p>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Ваше ім&apos;я
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Джон Доу"
                    className={`w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-300 outline-none transition-shadow focus:border-red-600 focus:ring-1 focus:ring-red-600 shadow-sm`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Зручний спосіб зв&apos;язку
                  </label>
                  <div className="flex p-1 bg-slate-100 rounded-xl mb-4">
                    <button
                      onClick={() => handleContactTypeChange("email")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${formData.contactType === "email" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      <Mail size={16} /> Пошта
                    </button>
                    <button
                      onClick={() => handleContactTypeChange("telegram")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${formData.contactType === "telegram" ? "bg-[#2AABEE] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      <MessageCircle size={16} /> Telegram
                    </button>
                    <button
                      onClick={() => handleContactTypeChange("whatsapp")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${formData.contactType === "whatsapp" ? "bg-[#25D366] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      <Phone size={16} /> WhatsApp
                    </button>
                  </div>
                  <div className="relative">
                    {formData.contactType === "whatsapp" && (
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl pointer-events-none">
                        {getCountryInfo(formData.contactValue).flag}
                      </div>
                    )}
                    <input
                      type={formData.contactType === "email" ? "email" : "text"}
                      value={formData.contactValue}
                      onChange={handleContactChange}
                      placeholder={
                        formData.contactType === "email"
                          ? "hello@company.com"
                          : formData.contactType === "telegram"
                            ? "@username"
                            : "+380..."
                      }
                      className={`w-full bg-white border border-slate-200 rounded-xl py-3 text-slate-900 placeholder:text-slate-300 outline-none transition-shadow focus:border-red-600 focus:ring-1 focus:ring-red-600 shadow-sm ${formData.contactType === "whatsapp" ? "pl-12 pr-4" : "px-4"}`}
                    />
                    {formData.contactType === "whatsapp" && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 pointer-events-none">
                        {getCountryInfo(formData.contactValue).mask}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {isSuccess && (
            <div className="animate-in zoom-in-95 fade-in duration-500 flex flex-col items-center justify-center text-center py-8">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2
                  size={40}
                  className="text-green-500"
                />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Бриф прийнято!</h2>
              <p className="text-slate-500 max-w-sm mb-8">
                Ми вже отримали ваші дані в системі. Зв&apos;яжемося з вами найближчим часом через{" "}
                {formData.contactType === "telegram"
                  ? "Telegram"
                  : formData.contactType === "whatsapp"
                    ? "WhatsApp"
                    : "електронну пошту"}
                .
              </p>
              <button
                onClick={onClose}
                className={`bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-colors ${focusRing}`}
              >
                Повернутись на головну
              </button>
            </div>
          )}

          {!isSuccess && (
            <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className={`flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors ${focusRing} px-3 py-2 rounded-lg`}
                >
                  <ArrowLeft size={16} /> Назад
                </button>
              ) : (
                <div></div>
              )}
              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canGoNext()}
                  className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${canGoNext() ? "bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5" : "bg-slate-100 text-slate-400 cursor-not-allowed"} ${focusRing}`}
                >
                  Далі <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={submitToNotion}
                  disabled={!canGoNext() || isSubmitting}
                  className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${canGoNext() && !isSubmitting ? "bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5" : "bg-slate-100 text-slate-400 cursor-not-allowed"} ${focusRing}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Відправка...
                    </span>
                  ) : (
                    <>
                      Відправити <Send size={16} />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {!isSuccess && (
          <div className="text-center mt-6 text-xs font-medium text-slate-400 flex items-center justify-center gap-2">
            <CheckCircle2
              size={12}
              className="text-green-500"
            />
            Дані передаються захищеним з&apos;єднанням.
          </div>
        )}
      </div>
    </div>
  )
}

// ==========================================
// ---> Інші компоненти (ShutterEyes, Filter, Header...)
// ==========================================
const ShutterEyes = ({
  isOpen,
  toggleMenu,
  isScrolled,
  isHidden,
}: {
  isOpen: boolean
  toggleMenu: () => void
  isScrolled: boolean
  isHidden: boolean
}) => {
  const leftPupilRef = useRef<SVGGElement | null>(null)
  const rightPupilRef = useRef<SVGGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isFullyShrunk, setIsFullyShrunk] = useState(false)

  useEffect(() => {
    if (isHidden) return
    let rafId: number
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40
        const y = (e.clientY / window.innerHeight - 0.5) * 40
        const transform = `translate(${x}px, ${y}px)`
        if (leftPupilRef.current) leftPupilRef.current.style.transform = transform
        if (rightPupilRef.current) rightPupilRef.current.style.transform = transform
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [isHidden])

  useEffect(() => {
    if (isHidden) return
    let rafId: number
    const updateTransform = () => {
      const scrollY = window.scrollY
      const progress = Math.min(Math.max(scrollY / 250, 0), 1)
      const activeProgress = isOpen ? 1 : progress
      const scale = 1 - activeProgress * 0.85
      const translateY = 160 * (1 - activeProgress)
      if (containerRef.current) containerRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`
      setIsFullyShrunk(progress === 1)
    }
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateTransform)
    }
    updateTransform()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [isOpen, isHidden])

  if (isHidden) return null

  const eyeData = [
    { id: "left", cx: 250, ref: leftPupilRef },
    { id: "right", cx: 750, ref: rightPupilRef },
  ]

  return (
    <div className="fixed top-4 left-0 right-0 z-[60] flex justify-center pointer-events-none">
      <div
        ref={containerRef}
        className="group origin-top pointer-events-auto cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-full"
        onClick={toggleMenu}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleMenu()}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
      >
        <svg
          className={`w-[90vw] sm:w-[600px] origin-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isFullyShrunk && !isOpen
              ? "drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover-wiggle group-hover:drop-shadow-[0_10px_25px_rgba(220,38,38,0.4)]"
              : "drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)]"
          }`}
          viewBox="0 0 1000 450"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient
              id="bodyGrad"
              cx="50%"
              cy="40%"
              r="70%"
            >
              <stop
                offset="0%"
                stopColor="#ffffff"
              />
              <stop
                offset="70%"
                stopColor="#f5f5f5"
              />
              <stop
                offset="100%"
                stopColor="#e0e0e0"
              />
            </radialGradient>
            <radialGradient
              id="bladeGrad"
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop
                offset="0%"
                stopColor="#3a3a3a"
              />
              <stop
                offset="100%"
                stopColor="#050505"
              />
            </radialGradient>
            <radialGradient
              id="rubyCore"
              cx="35%"
              cy="35%"
              r="65%"
            >
              <stop
                offset="0%"
                stopColor="#ef4444"
              />
              <stop
                offset="65%"
                stopColor="#b91c1c"
              />
              <stop
                offset="100%"
                stopColor="#7f1d1d"
              />
            </radialGradient>
          </defs>

          {eyeData.map((eye) => (
            <g
              key={eye.id}
              transform={`translate(${eye.cx}, 225)`}
            >
              <path
                d="M-200,0 C-200,-100 0,-115 200,0 C200,100 0,115 -200,0 Z"
                fill="url(#bodyGrad)"
                stroke="#eee"
                strokeWidth="1"
              />
              <circle
                cx="0"
                cy="0"
                r="92"
                fill="#ddd"
              />
              <circle
                cx="0"
                cy="0"
                r="88"
                fill="#000"
              />
              <circle
                cx="0"
                cy="0"
                r="82"
                fill="none"
                stroke="#dc2626"
                strokeWidth="4"
                className="red-ring-active"
              />
              <circle
                cx="0"
                cy="0"
                r="79"
                fill="none"
                stroke="#dc2626"
                strokeWidth="1"
                opacity="0.2"
              />
              <g transform="scale(0.95)">
                <circle
                  cx="0"
                  cy="0"
                  r="80"
                  fill="#050505"
                />
                <g>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <path
                      key={i}
                      d="M0,-80 A80,80 0 0,1 56,-56 L0,0 Z"
                      fill={i % 2 === 0 ? "url(#bladeGrad)" : "#111"}
                      stroke="#000"
                      strokeWidth="0.2"
                      transform={`rotate(${angle})`}
                    />
                  ))}
                </g>
              </g>
              <g
                className="pupil-core"
                ref={eye.ref}
              >
                <circle
                  cx="0"
                  cy="0"
                  r="30"
                  fill="url(#rubyCore)"
                />
                <ellipse
                  cx="-10"
                  cy="-12"
                  rx="10"
                  ry="6"
                  fill="white"
                  className={`transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-40"}`}
                  transform="rotate(-30, -10, -12)"
                />
                <circle
                  cx="8"
                  cy="12"
                  r="3"
                  fill="white"
                  className={`transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-10"}`}
                />
                <g
                  className={`transition-all duration-500 origin-center ${isOpen ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90"}`}
                >
                  <path
                    d="M-12,-12 L12,12 M12,-12 L-12,12"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </g>
              </g>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}

// ==========================================
// ---> src/components/CaseStudyPage.jsx
// ==========================================
type CaseType = (typeof cases)[0]

const CaseStudyPage = ({
  selectedCase,
  onClose,
  openQuiz,
}: {
  selectedCase: CaseType | null
  onClose: () => void
  openQuiz: () => void
}) => {
  if (!selectedCase) return null

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] text-slate-300 font-sans selection:bg-red-600 selection:text-white animate-in fade-in duration-700 overflow-y-auto">
      <nav className="fixed top-0 left-0 right-0 h-24 px-6 md:px-12 flex items-center justify-between z-50 pointer-events-none">
        <button
          onClick={onClose}
          className={`flex items-center gap-3 font-medium text-sm text-slate-400 hover:text-white transition-all group pointer-events-auto ${focusRingDark} rounded-full`}
        >
          <div className="w-10 h-10 rounded-full border border-slate-800 bg-black/50 backdrop-blur-md flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600/10 transition-all">
            <ArrowLeft
              size={16}
              className="text-white transition-transform group-hover:-translate-x-1"
            />
          </div>
          <span className="hidden sm:inline tracking-widest uppercase text-xs drop-shadow-md">Close Project</span>
        </button>
      </nav>

      <main className="w-full relative pb-32">
        <section className="relative w-full h-screen bg-black flex flex-col justify-end overflow-hidden border-b border-slate-900">
          <div className="absolute inset-0 w-full h-full">
            <iframe
              className="absolute w-[300vw] h-[300vh] sm:w-[150vw] sm:h-[150vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-[1.05]"
              src={`https://www.youtube.com/embed/${selectedCase.youtubeId}?autoplay=1&rel=0&modestbranding=1&color=white`}
              title={selectedCase.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              style={{ border: "none" }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.85)_100%)] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-linear-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none"></div>
          </div>
          <div className="relative z-10 container mx-auto px-6 md:px-12 pb-16 md:pb-24">
            <div className="flex gap-4 mb-6">
              <span className="text-red-500 text-xs font-bold tracking-[0.2em] uppercase">{selectedCase.service}</span>
              <span className="text-slate-600 text-xs font-bold tracking-[0.2em] uppercase">
                {selectedCase.category}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] max-w-5xl">
              {selectedCase.title}
            </h1>
          </div>
        </section>

        <section className="container mx-auto px-6 md:px-12 py-32 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            <div className="md:col-span-12 lg:col-span-10 lg:col-start-2 text-center">
              <p className="text-2xl md:text-4xl text-white font-light leading-snug">{selectedCase.desc}</p>
            </div>
            <div className="md:col-span-12 lg:col-span-5 md:col-start-2 flex flex-col gap-12 pt-16 border-t border-slate-900">
              <div>
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-6">The Vision</h4>
                <p className="text-slate-400 leading-relaxed text-lg">{selectedCase.content?.vision}</p>
              </div>
            </div>
            <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-12 pt-16 border-t border-slate-900">
              <div>
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-6">Execution</h4>
                <p className="text-slate-400 leading-relaxed text-lg">{selectedCase.content?.execution}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 md:px-12 pt-16 border-t border-slate-900 text-center">
          <p className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-8">End of Sequence</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-12">
            Ready to direct your <br className="hidden md:block" /> own narrative?
          </h2>
          <button
            onClick={openQuiz}
            className={`bg-transparent border border-slate-700 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-white hover:text-black hover:border-white transition-all duration-300 ${focusRingDark}`}
          >
            Initiate Project
          </button>
        </section>
      </main>
    </div>
  )
}

// ==========================================
// ---> src/app/page.jsx (Головний файл App)
// ==========================================
export default function App() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeService, setActiveService] = useState("All")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCase, setSelectedCase] = useState<CaseType | null>(null)
  const [isQuizOpen, setIsQuizOpen] = useState(false) // Стан для керування Квізом

  const [visibleCount, setVisibleCount] = useState(6)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setVisibleCount(mobile ? 3 : 6)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Блокуємо скрол коли відкрито меню, сторінку кейсу або Квіз
  useEffect(() => {
    document.body.style.overflow = isMenuOpen || selectedCase || isQuizOpen ? "hidden" : "unset"
  }, [isMenuOpen, selectedCase, isQuizOpen])

  const filteredCases = cases.filter((c) => {
    const matchCategory = activeCategory === "All" || c.category === activeCategory
    const matchService = activeService === "All" || c.service === activeService
    return matchCategory && matchService
  })

  const displayedCases = filteredCases.slice(0, visibleCount)
  const hasMore = visibleCount < filteredCases.length

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-red-600 selection:text-white pb-24 overflow-x-hidden">
      <GlobalStyles />

      {/* HEADER */}
      <header
        className={`fixed top-4 left-0 right-0 z-40 mx-auto max-w-6xl px-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isScrolled ? "opacity-0 -translate-y-8 pointer-events-none scale-95" : "opacity-100 translate-y-0 scale-100"}`}
      >
        <div className="h-16 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between px-6">
          <a
            href="#"
            className={`text-xl font-black tracking-tighter ${focusRing}`}
          >
            muratov<span className="text-red-600">.ai</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
            <a
              href="#"
              className={`text-slate-900 hover:text-red-600 transition-colors ${focusRing}`}
            >
              For Brands
            </a>
            <a
              href="#"
              className={`text-slate-500 hover:text-red-600 transition-colors ${focusRing}`}
            >
              For Creators
            </a>
            <a
              href="#"
              className={`text-slate-500 hover:text-red-600 transition-colors ${focusRing}`}
            >
              Cases
            </a>
          </nav>
          <button
            onClick={() => setIsQuizOpen(true)}
            className={`hidden md:flex bg-red-600 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-red-700 transition-colors items-center gap-2 shadow-sm ${focusRing}`}
          >
            Get Started
          </button>
        </div>
      </header>

      <ShutterEyes
        isOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        isScrolled={isScrolled}
        isHidden={!!selectedCase || isQuizOpen}
      />

      {/* MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-50 bg-white/95 backdrop-blur-2xl transition-all duration-500 ease-out flex flex-col ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <a
            href="#"
            className="text-2xl font-black tracking-tighter"
          >
            muratov<span className="text-red-600">.ai</span>
          </a>
        </div>
        <div className="flex-1 container mx-auto px-6 flex flex-col justify-center max-w-4xl relative z-10">
          <nav className="flex flex-col gap-6 md:gap-8">
            <a
              href="#"
              className={`text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 hover:text-red-600 hover:translate-x-4 transition-all duration-300 ${isMenuOpen ? "opacity-100 translate-y-0 delay-100" : "opacity-0 translate-y-8"}`}
            >
              For Brands
            </a>
            <a
              href="#"
              className={`text-5xl md:text-7xl lg:text-8xl font-black text-slate-400 hover:text-red-600 hover:translate-x-4 transition-all duration-300 ${isMenuOpen ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-8"}`}
            >
              For Creators
            </a>
            <a
              href="#"
              className={`text-5xl md:text-7xl lg:text-8xl font-black text-slate-400 hover:text-red-600 hover:translate-x-4 transition-all duration-300 ${isMenuOpen ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-8"}`}
            >
              Cases & Work
            </a>
          </nav>
          <div
            className={`mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-8"}`}
          >
            <button
              onClick={() => {
                setIsMenuOpen(false)
                setIsQuizOpen(true)
              }}
              className={`bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors flex items-center gap-2 ${focusRing}`}
            >
              Start a Project <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 pt-32 relative z-10 flex flex-col items-center">
        <div className="h-[220px] md:h-[280px] w-full shrink-0"></div>

        <header className="max-w-4xl mb-12 text-center relative z-10">
          <p className="text-red-600 font-bold tracking-widest uppercase text-sm mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
            Selected Work — 2026
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Visual <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              Storytelling.
            </span>
          </h1>
          <p className="mt-8 text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            High-converting video ads for SaaS & DTC brands. AI-powered production for a fixed monthly fee.
          </p>
        </header>

        {/* FILTERS */}
        <section className="mb-12 flex flex-col items-center gap-6 w-full max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {services.map((service) => (
              <button
                key={service}
                onClick={() => {
                  setActiveService(service)
                  setVisibleCount(isMobile ? 3 : 6)
                }}
                className={`px-5 py-2 text-sm font-semibold transition-all border rounded-full ${activeService === service ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105" : "bg-white text-slate-600 border-slate-200 hover:border-red-600 hover:text-red-600 shadow-sm"} ${focusRing}`}
              >
                {service}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 justify-center items-center bg-white/60 backdrop-blur-xl border border-slate-200 shadow-[0_4px_15px_rgb(0,0,0,0.03)] rounded-full p-1.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category)
                  setVisibleCount(isMobile ? 3 : 6)
                }}
                className={`px-4 py-1.5 text-xs font-bold transition-all rounded-full ${activeCategory === category ? "bg-white text-slate-900 shadow-[0_2px_8px_rgb(0,0,0,0.08)] scale-100" : "bg-transparent text-slate-500 hover:text-slate-900 scale-95 hover:scale-100"} ${focusRing}`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* BENTO GRID */}
        {displayedCases.length > 0 ? (
          <div className="w-full max-w-7xl flex flex-col items-center">
            <section className="w-full grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 auto-rows-[100px] gap-4 md:gap-6 grid-flow-dense text-left relative z-10">
              {displayedCases.map((item, index) => {
                let spanClasses = ""
                if (item.format === "wide")
                  spanClasses = "col-span-1 md:col-span-8 lg:col-span-8 row-span-4 lg:row-span-5"
                else if (item.format === "tall")
                  spanClasses = "col-span-1 md:col-span-4 lg:col-span-4 row-span-5 md:row-span-6 lg:row-span-6"
                else if (item.format === "square")
                  spanClasses = "col-span-1 md:col-span-4 lg:col-span-4 row-span-4 lg:row-span-4"

                return (
                  <article
                    key={item.id}
                    className={`group relative bg-white rounded-3xl p-2 sm:p-3 border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col cursor-pointer animate-cinematic ${spanClasses}`}
                    onClick={() => setSelectedCase(item)}
                    style={{ animationDelay: `${(index % 6) * 100}ms` }}
                  >
                    <div className="relative w-full flex-1 rounded-2xl overflow-hidden bg-slate-100">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300"></div>
                      <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-red-600 text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm z-20">
                        {item.category}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 z-20">
                        <div className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-red-600 shadow-lg">
                          <Play
                            fill="currentColor"
                            size={24}
                            className="ml-1"
                          />
                        </div>
                      </div>
                      <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent flex-col justify-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-xs font-bold text-red-400 uppercase tracking-wide mt-2 mb-1">
                            {item.service}
                          </p>
                          <p className="text-sm text-slate-300 line-clamp-2">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 px-2 pb-2 md:hidden">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-1">{item.title}</h3>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1 mb-1">
                        {item.service}
                      </p>
                    </div>
                    <button
                      className={`absolute inset-0 w-full h-full z-30 rounded-3xl ${focusRing}`}
                      aria-label={`View case study: ${item.title}`}
                    />
                  </article>
                )
              })}
            </section>

            {hasMore && (
              <div className="mt-20 relative z-10 animate-in fade-in duration-1000">
                <button
                  onClick={() => setVisibleCount((prev) => prev + (isMobile ? 3 : 6))}
                  className={`group relative px-10 py-5 bg-white border border-slate-200 rounded-full font-bold text-slate-900 flex items-center gap-4 transition-all hover:border-red-600 hover:shadow-2xl hover:shadow-red-600/10 ${focusRing}`}
                >
                  <span className="tracking-widest uppercase text-xs">Explore More Artifacts</span>
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white transition-transform group-hover:rotate-90">
                    <Plus
                      size={18}
                      strokeWidth={3}
                    />
                  </div>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-2xl py-24 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-200 border-dashed relative z-10">
            <h3 className="text-xl font-bold text-slate-900 mb-2">No projects found</h3>
            <button
              onClick={() => {
                setActiveCategory("All")
                setActiveService("All")
              }}
              className={`px-6 py-2 bg-red-600 text-white text-sm font-bold rounded-full shadow-md ${focusRing}`}
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      <footer className="mt-32 border-t border-slate-200 bg-white pt-24 pb-8 relative z-10">
        <div className="container mx-auto px-6 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]">
                  Let&apos;s <span className="text-red-600">generate</span>
                  <br /> your next winner.
                </h2>
              </div>
              <div className="relative max-w-2xl group mt-8 lg:mt-0">
                <form className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white border border-slate-200 p-2 focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600 transition-all shadow-sm rounded-3xl sm:rounded-full">
                  <div className="flex items-center flex-1 px-4 py-3 sm:py-0">
                    <span className="text-red-600 font-mono font-bold mr-3">{">"}</span>
                    <input
                      type="text"
                      placeholder="Enter your brand URL..."
                      className="w-full bg-transparent outline-none font-mono text-sm text-slate-900"
                      aria-label="Enter your brand URL"
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsQuizOpen(true)
                    }}
                    className={`bg-red-600 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 ${focusRing}`}
                  >
                    Initialize <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 text-xs text-slate-400 font-medium flex justify-between items-center">
            <p>© {new Date().getFullYear()} muratov.ai — Engineered in Kyiv.</p>
            <div className="flex gap-6">
              <a
                href="#"
                className="hover:text-red-600 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="hover:text-red-600 transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* OVERLAYS (Case Study / Quiz) */}
      <CaseStudyPage
        selectedCase={selectedCase}
        onClose={() => setSelectedCase(null)}
        openQuiz={() => setIsQuizOpen(true)}
      />

      {isQuizOpen && <ProjectQuiz onClose={() => setIsQuizOpen(false)} />}
    </div>
  )
}
