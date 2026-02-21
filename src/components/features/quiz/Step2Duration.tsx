import React from "react"
import { QUIZ_DURATIONS } from "./constants"
import { QuizFormData } from "./quizForm"

interface Step2DurationProps {
  formData: QuizFormData
  setFormData: React.Dispatch<React.SetStateAction<QuizFormData>>
  focusRing: string
}

export default function Step2Duration({ formData, setFormData, focusRing }: Step2DurationProps) {
  return (
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
  )
}
