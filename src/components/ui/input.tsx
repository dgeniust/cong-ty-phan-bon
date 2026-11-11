import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Form fields are the one place a hairline outline stays: an interactive control
 * needs a visible boundary to be recognisable (WCAG 1.4.11).
 */
export const fieldClass =
  "w-full min-w-0 rounded-xl border border-input bg-white px-4 text-[15px] text-ink transition-[border-color,box-shadow] outline-none placeholder:text-ink-subtle hover:border-brand-300 focus-visible:border-brand-500 focus-visible:ring-4 focus-visible:ring-brand-500/15 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/15";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        fieldClass,
        "flex h-12 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className
      )}
      {...props}
    />
  );
}

export { Input };
