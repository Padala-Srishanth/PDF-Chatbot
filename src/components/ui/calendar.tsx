import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// CalendarProps: All props supported by react-day-picker's DayPicker
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// Calendar: Custom calendar component using react-day-picker and custom styles
function Calendar({
  className,
  classNames,
  showOutsideDays = true, // Show days from previous/next month by default
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)} // Outer padding for calendar
      classNames={{
        // Custom class names for various calendar parts
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0", // Layout for months
        month: "space-y-4", // Spacing between weeks in a month
        caption: "flex justify-center pt-1 relative items-center", // Month/year header
        caption_label: "text-sm font-medium", // Month/year text
        nav: "space-x-1 flex items-center", // Navigation arrows container
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100" // Style for nav buttons
        ),
        nav_button_previous: "absolute left-1", // Position previous button
        nav_button_next: "absolute right-1", // Position next button
        table: "w-full border-collapse space-y-1", // Table layout for days
        head_row: "flex", // Header row for weekdays
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]", // Weekday cell
        row: "flex w-full mt-2", // Row for each week
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20", // Day cell with selection and focus styles
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100" // Style for each day button
        ),
        day_range_end: "day-range-end", // End of a selected range
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground", // Selected day
        day_today: "bg-accent text-accent-foreground", // Today highlight
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30", // Days outside current month
        day_disabled: "text-muted-foreground opacity-50", // Disabled days
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground", // Middle of a selected range
        day_hidden: "invisible", // Hidden days
        ...classNames, // Allow user to override/add classes
      }}
      components={{
        // Custom icons for navigation
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

// Export Calendar component for use in the app
export { Calendar };