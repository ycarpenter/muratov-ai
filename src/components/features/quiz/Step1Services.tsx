import React from "react"
import { QUIZ_SERVICES } from "./constants"
import type { QuizFormData } from "./quizForm"

interface Step1ServicesProps {
  formData: QuizFormData
  setFormData: React.Dispatch<React.SetStateAction<QuizFormData>>
  focusRing: string
}

export default function Step1Services({ formData, setFormData, focusRing }: Step1ServicesProps) {
  return (
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
            <div className={`mb-4 ${formData.service === s.label ? "text-red-600" : "text-slate-400"}`}>{s.icon}</div>
            <span className="font-bold">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
