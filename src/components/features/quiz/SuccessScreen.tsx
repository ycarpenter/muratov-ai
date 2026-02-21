import React from "react"
import { CheckCircle2 } from "lucide-react"
import { QuizFormData } from "./quizForm"

interface SuccessScreenProps {
  formData: QuizFormData
  onClose: () => void
  focusRing: string
}

export default function SuccessScreen({ formData, onClose, focusRing }: SuccessScreenProps) {
  return (
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
  )
}
