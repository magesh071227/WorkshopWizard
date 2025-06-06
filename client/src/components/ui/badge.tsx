import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        technology: "border-transparent bg-blue-100 text-primary hover:bg-blue-200",
        design: "border-transparent bg-purple-100 text-accent hover:bg-purple-200",
        business: "border-transparent bg-green-100 text-green-700 hover:bg-green-200",
        marketing: "border-transparent bg-orange-100 text-orange-700 hover:bg-orange-200",
        "personal-development": "border-transparent bg-pink-100 text-pink-700 hover:bg-pink-200",
        upcoming: "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
        past: "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200",
        draft: "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
