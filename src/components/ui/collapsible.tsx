// Import all primitives from Radix UI Collapsible
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

// Collapsible: Root component that manages open/close state
const Collapsible = CollapsiblePrimitive.Root

// CollapsibleTrigger: Button or element that toggles the collapsible
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

// CollapsibleContent: Content area that expands/collapses
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

// Export all collapsible components for use in the app
export { Collapsible, CollapsibleTrigger, CollapsibleContent }