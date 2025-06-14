import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

// ToasterProps: Type for Sonner Toaster component props
type ToasterProps = React.ComponentProps<typeof Sonner>

// Toaster: Custom Toaster component that adapts to app theme and custom styles
const Toaster = ({ ...props }: ToasterProps) => {
  // Get current theme from next-themes (light, dark, or system)
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]} // Pass theme to Sonner
      className="toaster group" // Root class for styling
      toastOptions={{
        // Custom class names for toast elements
        classNames: {
          toast:
            // Toast container: background, text, border, shadow
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground", // Toast description text
          actionButton:
            // Action button: primary color
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            // Cancel button: muted color
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props} // Spread any additional props
    />
  )
}

// Export Toaster component and toast function for use in the app
export { Toaster, toast }