import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/routing"
import { ArrowLeft } from "lucide-react"
import { cases } from "@/data/cases"

// Імітація бази даних / CMS. У реальному проекті це буде fetch()
const getCaseBySlug = async (slug: string) => {
  return cases.find((c) => c.id === slug) || null
}

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function CasePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const selectedCase = await getCaseBySlug(slug)

  if (!selectedCase) {
    notFound()
  }

  // A11y: Rule 3 Focus Ring
  const focusRing =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
  const focusRingDark =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-600 focus-visible:ring-offset-2 focus-visible:ring-offset-black"

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-crimson-600 selection:text-white overflow-x-hidden">
      <section className="relative w-full h-[100vh] bg-black flex flex-col justify-end overflow-hidden">
        <nav className="absolute top-0 left-0 right-0 h-24 px-6 md:px-12 flex items-center justify-between bg-linear-to-b from-black/80 to-transparent z-50 pointer-events-none">
          <Link
            href="/"
            className={`flex items-center gap-3 font-medium text-sm text-slate-300 hover:text-white transition-all group pointer-events-auto ${focusRingDark} rounded-full`}
            aria-label="Back to projects"
          >
            <div className="w-10 h-10 rounded-full border border-slate-700 bg-black/50 backdrop-blur-md flex items-center justify-center group-hover:border-crimson-600 group-hover:bg-crimson-600/20 transition-all shadow-elevation-sm">
              <ArrowLeft
                size={16}
                className="text-white transition-transform group-hover:-translate-x-1"
              />
            </div>
            <span className="hidden sm:inline tracking-widest uppercase text-xs font-bold">Close Project</span>
          </Link>
        </nav>

        <div className="absolute inset-0 w-full h-full">
          <iframe
            className="absolute w-[300vw] h-[300vh] sm:w-[150vw] sm:h-[150vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60"
            src={`https://www.youtube.com/embed/${selectedCase.youtubeId}?autoplay=1&mute=1&modestbranding=1&rel=0&controls=0&showinfo=0&loop=1&playlist=${selectedCase.youtubeId}`}
            title={`${selectedCase.title} background video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
            style={{ border: "none" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-white via-white/10 to-transparent pointer-events-none"></div>
        </div>

        {/* Заголовок поверх відео */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 pb-20 md:pb-32">
          <div className="flex gap-4 mb-8">
            <span className="text-crimson-600 text-xs font-bold tracking-[0.2em] uppercase">
              {selectedCase.service}
            </span>
            <span className="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase">{selectedCase.category}</span>
          </div>
          {/* Rule 7: Єдиний H1 на сторінці */}
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] max-w-5xl drop-shadow-2xl">
            {selectedCase.title}
          </h1>
        </div>
      </section>

      {/* 2. THE NARRATIVE (Crimson & Alabaster Aesthetic) */}
      <section className="container mx-auto px-6 md:px-12 py-32 max-w-6xl bg-white relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          {/* Короткий опис (Лід) */}
          <div className="md:col-span-12 lg:col-span-10 lg:col-start-2 text-center">
            <p className="text-3xl md:text-5xl text-slate-900 font-light leading-[1.1] tracking-tight">
              {selectedCase.desc}
            </p>
          </div>

          {/* Деталі (Чистий Alabaster стиль) */}
          <div className="md:col-span-12 lg:col-span-5 lg:col-start-2 flex flex-col gap-12 pt-16 border-t border-slate-200">
            <div>
              <h2 className="text-xs font-bold text-crimson-600 uppercase tracking-widest mb-6">The Vision</h2>
              <p className="text-slate-600 leading-relaxed text-lg">{selectedCase.content.vision}</p>
            </div>
          </div>

          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-12 pt-16 border-t border-slate-200">
            <div>
              <h2 className="text-xs font-bold text-crimson-600 uppercase tracking-widest mb-6">Execution</h2>
              <p className="text-slate-600 leading-relaxed text-lg">{selectedCase.content.execution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ELEGANT NEXT STEP (CTA) */}
      <section className="container mx-auto px-6 md:px-12 pt-16 pb-40 border-t border-slate-100 text-center bg-white relative z-20">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">End of Sequence</p>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-12">
          Ready to direct your <br className="hidden md:block" /> own narrative?
        </h2>
        <Link
          href="/#contact"
          className={`inline-block bg-crimson-600 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-crimson-700 hover:shadow-elevation-md transition-all duration-300 ${focusRing}`}
        >
          Initiate Project
        </Link>
      </section>
    </div>
  )
}
