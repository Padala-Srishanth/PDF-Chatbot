import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Define badge style variants using class-variance-authority (cva)
const badgeVariants = cva(
  // Base styles for badge: rounded, inline-flex, border, padding, font, focus ring
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      // Different visual variants for the badge
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground", // Outline style, no background
      },
    },
    defaultVariants: {
      variant: "default", // Use default variant if none specified
    },
  }
)

// BadgeProps: Props for the Badge component, includes HTML div props and variant
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// Badge: Main badge component, renders a styled div
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// Export Badge component and badgeVariants utility
export { Badge, badgeVariants }