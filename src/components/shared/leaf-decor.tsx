import { cn } from "@/lib/utils";

/** Decorative leaf sprig (design.md §6.5). */
export function LeafDecor({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 160"
      aria-hidden
      className={cn("pointer-events-none", flip && "-scale-x-100", className)}
      fill="currentColor"
    >
      <path d="M60 158 C58 120 52 80 30 40" stroke="currentColor" strokeWidth="3" fill="none" opacity=".6" />
      <path d="M30 40 C10 30 4 10 8 0 C26 6 40 22 30 40Z" opacity=".9" />
      <path d="M44 72 C20 72 6 58 2 44 C22 42 40 52 44 72Z" opacity=".75" />
      <path d="M40 66 C46 44 64 32 80 30 C78 50 62 64 40 66Z" opacity=".85" />
      <path d="M54 108 C30 112 14 100 8 88 C28 82 48 92 54 108Z" opacity=".7" />
      <path d="M52 100 C60 80 80 70 96 70 C92 90 74 102 52 100Z" opacity=".8" />
    </svg>
  );
}
