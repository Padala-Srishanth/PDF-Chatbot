import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

// Toaster: Renders all active toasts using the ToastProvider context
export function Toaster() {
  const { toasts } = useToast() // Get current toasts from custom hook

  return (
    <ToastProvider>
      {/* Render each toast in the toasts array */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            {/* Toast content: title and description */}
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {/* Optional action button (e.g., Undo) */}
            {action}
            {/* Close button for dismissing the toast */}
            <ToastClose />
          </Toast>
        )
      })}
      {/* Viewport: where toasts are displayed on the screen */}
      <ToastViewport />
    </ToastProvider>
  )
}