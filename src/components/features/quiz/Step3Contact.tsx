import React from "react"
import { Mail, MessageCircle, Phone } from "lucide-react"
import { getCountryInfo } from "./constants"
import { QuizFormData } from "./quizForm"

interface Step3ContactProps {
  formData: QuizFormData
  setFormData: React.Dispatch<React.SetStateAction<QuizFormData>>
  focusRing: string
}

export default function Step3Contact({ formData, setFormData }: Step3ContactProps) {
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

  const handleContactTypeChange = (type: "email" | "telegram" | "whatsapp") => {
    setFormData({
      ...formData,
      contactType: type,
      contactValue: type === "telegram" ? "@" : type === "whatsapp" ? "+" : "",
    })
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Останній крок</h2>
      <p className="text-slate-500 mb-8">Залиште контакти, і ми зв&apos;яжемося для обговорення деталей.</p>

      <div className="space-y-6">
        {/* Ім'я */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ваше ім&apos;я</label>
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

            {formData.contactType === "whatsapp" && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 pointer-events-none">
                {getCountryInfo(formData.contactValue).mask}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
