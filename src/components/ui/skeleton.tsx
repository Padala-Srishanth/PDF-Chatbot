import { cn } from "@/lib/utils"

// Skeleton: Simple loading placeholder component with pulse animation
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      // Animate with pulse, rounded corners, muted background
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// Export Skeleton component for use in the app
export { Skeleton }