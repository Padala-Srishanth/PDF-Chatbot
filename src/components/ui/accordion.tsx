import * as React from "react"
// Import all primitives from Radix UI Accordion
import * as AccordionPrimitive from "@radix-ui/react-accordion"
// Import ChevronDown icon from lucide-react
import { ChevronDown } from "lucide-react"

// Import utility function for conditional classNames
import { cn } from "@/lib/utils"

// Export the Accordion root component from Radix
const Accordion = AccordionPrimitive.Root

// AccordionItem: A single item in the accordion
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(
  // Forward ref and props to Radix Accordion.Item, add border and custom classes
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b", className)}
      {...props}
    />
  )
)
AccordionItem.displayName = "AccordionItem"

// AccordionTrigger: The clickable header that toggles the accordion item
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(
  // Forward ref and props to Radix Accordion.Trigger, wrap in Header for semantics
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          // Flex layout, hover underline, rotate icon when open
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        {/* ChevronDown icon rotates when open */}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
)
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

// AccordionContent: The collapsible content area for each item
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(
  // Forward ref and props to Radix Accordion.Content, animate open/close
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      {/* Padding for content */}
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
)

AccordionContent.displayName = AccordionPrimitive.Content.displayName

// Export all custom accordion components
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }