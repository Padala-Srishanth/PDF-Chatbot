import * as React from "react"

// Define the mobile breakpoint (in pixels)
const MOBILE_BREAKPOINT = 768

// useIsMobile: Custom hook to detect if the screen is mobile-sized
export function useIsMobile() {
  // State to track if the device is mobile
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Create a media query list for the mobile breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    // Handler to update state when the screen size changes
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    // Listen for changes to the media query
    mql.addEventListener("change", onChange)
    // Set initial state
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    // Cleanup listener on unmount
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Return true if mobile, false otherwise
  return !!isMobile
}