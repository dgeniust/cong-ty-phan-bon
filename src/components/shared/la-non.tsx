import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Decorative pieces of the "Lá Non" style (design.md §6). All are aria-hidden.
 */

/** Round lime podium the product stands on. Scales with its width. */
export function Podium({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg aria-hidden viewBox="0 0 320 120" className={cn("block w-full", className)}>
      <defs>
        <linearGradient id={`${id}-side`} x1="0" x2="1">
          <stop offset="0" stopColor="#8fbf3c" />
          <stop offset="0.45" stopColor="#c9e27a" />
          <stop offset="1" stopColor="#7fb23a" />
        </linearGradient>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef6d2" />
          <stop offset="1" stopColor="#d4e98f" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="100" rx="150" ry="18" fill="#143f1b" opacity="0.08" />
      <path d="M12 34v52c0 14 66 26 148 26s148-12 148-26V34z" fill={`url(#${id}-side)`} />
      <ellipse cx="160" cy="34" rx="148" ry="26" fill={`url(#${id}-top)`} />
    </svg>
  );
}

/** Circular stamp with text running around a star (rotates slowly unless reduced motion). */
export function RoundStamp({ text, className }: { text: string; className?: string }) {
  const id = useId();
  return (
    <svg aria-hidden viewBox="0 0 120 120" className={cn("block", className)}>
      <circle cx="60" cy="60" r="58" fill="#143f1b" />
      <defs>
        <path id={`${id}-ring`} d="M60 60m-42 0a42 42 0 1 1 84 0a42 42 0 1 1 -84 0" />
      </defs>
      <g className="origin-center motion-safe:animate-[spin_24s_linear_infinite]">
        <text fill="#ffffff" fontSize="9.5" fontWeight="600" letterSpacing="1.4" fontFamily="var(--font-sans)">
          <textPath href={`#${id}-ring`}>{text}</textPath>
        </text>
      </g>
      <path d="M60 44l4.5 11.5L76 60l-11.5 4.5L60 76l-4.5-11.5L44 60l11.5-4.5z" fill="#f6e27a" />
    </svg>
  );
}

/** Four-point sparkle accent. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={cn("pointer-events-none block text-sun-500", className)} fill="currentColor">
      <path d="M12 0c.8 6.4 4.6 10.6 12 12-7.4 1.4-11.2 5.6-12 12-.8-6.4-4.6-10.6-12-12C7.4 10.6 11.2 6.4 12 0z" />
    </svg>
  );
}
