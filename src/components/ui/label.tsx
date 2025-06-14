import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// labelVariants: Utility for consistent label styling using class-variance-authority
const labelVariants = cva(
  // Base styles: small text, medium font, no line gap, disabled state styles
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

// Label: Custom label component with consistent styling and ref forwarding
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)} // Combine base and custom classes
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

// Export Label component for use in the app
export { Label }