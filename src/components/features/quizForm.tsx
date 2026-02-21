//src/components/features/quizForm.tsx

import React, { useState, useEffect } from "react"
import {
  ArrowRight,
  ArrowLeft,
  Send,
  CheckCircle2,
  MonitorPlay,
  Film,
  Scissors,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react"

const SERVICES = [
  { id: "ai_video", label: "ШІ відео", icon: <MonitorPlay size={24} /> },
  { id: "video_editing", label: "Відео монтаж", icon: <Scissors size={24} /> },
  { id: "motion_design", label: "Моушн дизайн", icon: <Film size={24} /> },
]

const DURATIONS = ["10-20 секунд", "21-45 секунд", "90 секунд", "90+ секунд", "11+ хвилин", "1+ годин"]

// Легкий словник для визначення країни за кодом (для WhatsApp)
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

export default function ProjectQuiz() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    service: "",
    duration: "",
    name: "",
    contactType: "email", // 'email', 'telegram', 'whatsapp'
    contactValue: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // --- Обробники розумних полів ---

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value

    if (formData.contactType === "telegram") {
      // Видаляємо всі пробіли та зайві @
      val = val.replace(/\s+/g, "").replace(/@/g, "")
      setFormData({ ...formData, contactValue: val.length > 0 ? `@${val}` : "@" })
    } else if (formData.contactType === "whatsapp") {
      // Залишаємо тільки цифри та плюс
      val = val.replace(/[^\d+]/g, "")
      // Гарантуємо, що завжди є + на початку
      if (!val.startsWith("+")) {
        val = "+" + val.replace(/\+/g, "")
      }
      setFormData({ ...formData, contactValue: val })
    } else {
      // Звичайна пошта
      setFormData({ ...formData, contactValue: val })
    }
  }

  // Коли змінюється тип контакту, форматуємо значення за замовчуванням
  const handleContactTypeChange = (type: "email" | "telegram" | "whatsapp") => {
    setFormData({
      ...formData,
      contactType: type,
      contactValue: type === "telegram" ? "@" : type === "whatsapp" ? "+" : "",
    })
  }

  // --- Логіка відправки форми ---

  const submitToNotion = async () => {
    setIsSubmitting(true)

    // Форматуємо фінальні дані для відправки
    const finalData = {
      name: formData.name.trim(),
      service: formData.service,
      duration: formData.duration,
      contactMethod: formData.contactType,
      // Форматуємо Telegram лінк
      contactDetails: formData.contactType === "telegram" ? `t.me/${formData.contactValue}` : formData.contactValue,
    }

    console.log("Дані готові для відправки у Webhook (Notion):", finalData)

    try {
      // ТУТ БУДЕ ВАШ WEBHOOK URL ВІД MAKE.COM АБО ZAPIER
      // const WEBHOOK_URL = 'https://hook.eu2.make.com/your-webhook-id';
      // await fetch(WEBHOOK_URL, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(finalData)
      // });

      // Імітація затримки мережі (2 секунди)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsSuccess(true)
    } catch (error) {
      console.error("Помилка відправки:", error)
      alert("Сталася помилка. Будь ласка, спробуйте пізніше.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // --- Валідація кроків ---
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

  // Універсальні класи
  const focusRing = "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
  const glassCard =
    "bg-white/70 backdrop-blur-xl border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 sm:p-10"

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-4 font-sans text-slate-900 selection:bg-red-600 selection:text-white">
      {/* Логотип */}
      <div className="absolute top-8 left-8">
        <span className="text-xl font-black tracking-tighter">
          muratov<span className="text-red-600">.ai</span>
        </span>
      </div>

      <div className="w-full max-w-2xl relative">
        {/* Прогрес бар */}
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

        {/* --- КОНТЕЙНЕР КВІЗУ (GLASSMORPHISM) --- */}
        <div className={`${glassCard} transition-all duration-500 relative overflow-hidden`}>
          {/* КРОК 1: ПОСЛУГА */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Що будемо створювати?</h2>
              <p className="text-slate-500 mb-8">Оберіть основний напрямок для вашого проєкту.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SERVICES.map((s) => (
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

          {/* КРОК 2: ТРИВАЛІСТЬ */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Який хронометраж?</h2>
              <p className="text-slate-500 mb-8">Орієнтовна тривалість фінального відео.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {DURATIONS.map((d) => (
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

          {/* КРОК 3: КОНТАКТИ */}
          {step === 3 && !isSuccess && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Останній крок</h2>
              <p className="text-slate-500 mb-8">Залиште контакти, і ми зв&apos;яжемося для обговорення деталей.</p>

              <div className="space-y-6">
                {/* Ім'я */}
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

                {/* Тип контакту (Таби) */}
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

                  {/* Смарт-Поле вводу контакту */}
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

                    {/* Підказка маски для WhatsApp */}
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

          {/* ЕКРАН УСПІХУ */}
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
                onClick={() => window.location.reload()}
                className={`bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-colors ${focusRing}`}
              >
                Повернутись на головну
              </button>
            </div>
          )}

          {/* --- НАВІГАЦІЯ (КНОПКИ ВНИЗУ) --- */}
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
                <div></div> // Пустий блок для вирівнювання Flex
              )}

              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canGoNext()}
                  className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                    canGoNext()
                      ? "bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  } ${focusRing}`}
                >
                  Далі <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={submitToNotion}
                  disabled={!canGoNext() || isSubmitting}
                  className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                    canGoNext() && !isSubmitting
                      ? "bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  } ${focusRing}`}
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

        {/* Секюріті бейдж під формою */}
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
