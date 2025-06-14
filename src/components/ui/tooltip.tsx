import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

// TooltipProvider: Context provider for tooltips (handles delay, etc.)
const TooltipProvider = TooltipPrimitive.Provider

// Tooltip: Root component for a single tooltip instance
const Tooltip = TooltipPrimitive.Root

// TooltipTrigger: Element that triggers the tooltip (e.g., a button)
const TooltipTrigger = TooltipPrimitive.Trigger

// TooltipContent: The floating content shown when the tooltip is open
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset} // Distance from the trigger element
    className={cn(
      // Styles: z-index, rounded, border, background, padding, text, shadow, animation
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Export all tooltip components for use in the app
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }