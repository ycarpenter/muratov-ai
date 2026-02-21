"use client"

import React, { useState } from "react"
import { ArrowRight, ArrowLeft, Send, CheckCircle2, X } from "lucide-react"
import Step1Services from "./Step1Services"
import Step2Duration from "./Step2Duration"
import Step3Contact from "./Step3Contact"
import SuccessScreen from "./SuccessScreen"

export interface QuizFormData {
  service: string
  duration: string
  name: string
  contactType: string
  contactValue: string
}

interface QuizFormProps {
  onClose: () => void
}

export default function QuizForm({ onClose }: QuizFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<QuizFormData>({
    service: "",
    duration: "",
    name: "",
    contactType: "email",
    contactValue: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const focusRing = "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
  const glassCard =
    "bg-white/70 backdrop-blur-xl border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 sm:p-10 w-full"

  const submitToNotion = async () => {
    setIsSubmitting(true)

    try {
      // Тут ваш Webhook URL (Make / Zapier)
      // await fetch(WEBHOOK_URL, { method: 'POST', body: JSON.stringify(finalData) });
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Імітація
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

  return (
    <div className="fixed inset-0 z-200 bg-[#fafafa] flex flex-col items-center justify-center p-4 font-sans text-slate-900 selection:bg-red-600 selection:text-white animate-in fade-in zoom-in-95 duration-500 overflow-y-auto">
      {/* Кнопка закриття */}
      <button
        onClick={onClose}
        className={`absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 shadow-sm transition-all z-10 ${focusRing}`}
        aria-label="Close Quiz"
      >
        <X size={24} />
      </button>

      <div className="w-full max-w-2xl relative my-auto py-12">
        {/* Progress Bar */}
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
          {/* Динамічний рендер кроків */}
          {step === 1 && (
            <Step1Services
              formData={formData}
              setFormData={setFormData}
              focusRing={focusRing}
            />
          )}
          {step === 2 && (
            <Step2Duration
              formData={formData}
              setFormData={setFormData}
              focusRing={focusRing}
            />
          )}
          {step === 3 && !isSuccess && (
            <Step3Contact
              formData={formData}
              setFormData={setFormData}
              focusRing={focusRing}
            />
          )}
          {isSuccess && (
            <SuccessScreen
              formData={formData}
              onClose={onClose}
              focusRing={focusRing}
            />
          )}

          {/* Навігація */}
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

        {/* Security Badge */}
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
