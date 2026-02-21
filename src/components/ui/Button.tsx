import { Link } from "@/i18n/routing"
import { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
  className?: string
}

export const Button = ({ children, href, onClick, variant = "primary", className = "" }: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-600 focus-visible:ring-offset-2 ring-offset-white active:scale-95"

  const variants = {
    primary: "bg-crimson-600 text-white hover:bg-crimson-700 shadow-sm",
    secondary: "bg-slate-900 text-white hover:bg-black shadow-md",
    ghost: "bg-transparent text-slate-600 hover:text-crimson-600 border border-slate-200 hover:border-crimson-600",
  }

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link
        href={href}
        className={combinedStyles}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={combinedStyles}
    >
      {children}
    </button>
  )
}
