import * as React from "react"

import { cn } from "@/lib/utils"

// TextareaProps: Extends default textarea attributes for flexibility
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// Textarea: Custom textarea component with consistent styling and ref forwarding
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        // Styles: min height, full width, border, background, padding, font, focus, disabled
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref} // Forwarded ref for parent access
        {...props} // Spread any additional props (e.g., value, onChange)
      />
    )
  }
)
Textarea.displayName = "Textarea"

// Export Textarea component for use in the app
export { Textarea }