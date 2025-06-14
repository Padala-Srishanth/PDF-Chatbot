import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// cn: Utility function to combine class names conditionally and merge Tailwind classes
// - Accepts any number of class values (strings, arrays, objects, etc.)
// - Uses clsx to conditionally join class names
// - Uses twMerge to resolve Tailwind CSS class conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}