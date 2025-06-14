import * as React from "react"

import { cn } from "@/lib/utils"

// Input: Custom input component with consistent styling and ref forwarding
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type} // Input type (e.g., text, password, email, etc.)
        className={cn(
          // Styles for input: height, width, border, background, padding, font, focus, disabled, file input
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref} // Forwarded ref for parent access
        {...props} // Spread any additional props (e.g., value, onChange)
      />
    )
  }
)
Input.displayName = "Input"

// Export Input component for use in the app
export { Input }