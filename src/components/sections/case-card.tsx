import Image from "next/image"

interface CaseProps {
  title: string
  category: string
  thumbnail: string
  format: "wide" | "tall" | "square"
}

export const CaseCard = ({ title, category, thumbnail, format }: CaseProps) => {
  const spans = {
    wide: "md:col-span-8 row-span-4",
    tall: "md:col-span-4 row-span-6",
    square: "md:col-span-4 row-span-4",
  }

  return (
    <article
      className={`group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-elevation-sm hover:shadow-elevation-md transition-all ${spans[format]}`}
    >
      <Image
        src={thumbnail}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
        <span className="text-crimson-500 text-xs font-bold uppercase tracking-widest mb-2">{category}</span>
        <h3 className="text-white text-2xl font-bold">{title}</h3>
      </div>
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold uppercase">
        {category}
      </div>
    </article>
  )
}
