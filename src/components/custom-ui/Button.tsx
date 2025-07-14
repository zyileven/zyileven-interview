import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "success" | "gradient" | "neon"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  loading?: boolean
  children: React.ReactNode
}
// 明确泛型参数顺序：forwardRef<元素类型, 属性类型>(...)
const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(({
  variant = "primary",
  className,
  size = "md",
  loading = false,
  disabled,
  children,
  ...props
}, ref) => {

  const baseStyle = `
  relative inline-flex items-center justify-center 
  font-semibold transition-all duration-300 ease-in-out transform 
  focus:outline-none focus:ring-4 focus:ring-opacity-50 
  active:scale-95 
  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25 focus:ring-blue-500 border-0",
    secondary:
      "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 shadow-md hover:shadow-lg border border-gray-300 focus:ring-gray-400",
    tertiary:
      "bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900 border-2 border-gray-300 hover:border-gray-400 focus:ring-gray-300",
    danger:
      "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/25 focus:ring-red-500 border-0",
    success:
      "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:shadow-green-500/25 focus:ring-green-500 border-0",
    gradient:
      "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 focus:ring-purple-500 border-0 animate-gradient-x",
    neon: "bg-black text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black shadow-lg hover:shadow-xl hover:shadow-cyan-400/50 focus:ring-cyan-400 relative overflow-hidden",
  }

  const sizes = {
    xs: "px-2 py-1 text-xs rounded-md h-[24px]",
    sm: "px-3 py-1.5 text-sm rounded-md h-[32px]",
    md: "px-4 py-2 text-base rounded-lg h-[40px]",
    lg: "px-6 py-3 text-lg rounded-lg h-[48px]",
    xl: "px-8 py-4 text-xl rounded-xl h-[56px]",
  }

  return <button
    className={cn(baseStyle, variants[variant], sizes[size], className)}
    ref={ref}
    disabled={disabled || loading}
    {...props}
  >
    {variant === "neon" && (
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
    )}
    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
    <span className="relative z-10">{children}</span>
    {variant === "gradient" && (
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-inherit" />
    )}
  </button>
})

Button.displayName = "Button";

export default Button;