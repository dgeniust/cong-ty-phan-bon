import { cn } from "@/lib/utils";

/**
 * Hand-drawn accents from the reference style. Decorative only: hidden from
 * assistive tech and from small screens, max one per section (design.md §1).
 */
const PATHS = {
  // looping arrow pointing down-right
  arrow: (
    <>
      <path d="M6 22c14-12 38-14 44-2 5 10-12 15-16 6-4-9 14-14 26-6 9 6 15 16 18 28" />
      <path d="M70 40l8 10 3-12" />
    </>
  ),
  swirl: <path d="M10 40c0-16 14-28 28-24 12 4 10 22-2 22-10 0-10-14 2-16 16-3 30 8 32 26" />,
  spark: (
    <>
      <path d="M30 6v48" />
      <path d="M8 30h44" />
      <path d="M14 14l32 32" />
      <path d="M46 14L14 46" />
    </>
  ),
  smile: (
    <>
      <path d="M8 26c6 12 30 14 40 0" />
      <circle cx="22" cy="12" r="1.6" fill="currentColor" />
      <circle cx="36" cy="10" r="1.6" fill="currentColor" />
    </>
  ),
};

export function Doodle({ name, className }: { name: keyof typeof PATHS; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox={name === "arrow" ? "0 0 90 60" : "0 0 60 60"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("pointer-events-none hidden text-brand-900 lg:block", className)}
    >
      {PATHS[name]}
    </svg>
  );
}
