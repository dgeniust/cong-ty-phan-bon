import { cn } from "@/lib/utils";

/**
 * Large pen drawings used as background art (one per section max – design.md §2).
 * Paths are drawn slightly uneven on purpose to read as hand-made.
 */
const ART = {
  // seedling sprouting from a mound of soil
  seedling: {
    viewBox: "0 0 240 260",
    d: [
      "M20 236c30-14 64-20 100-19 38 1 72 8 100 20",
      "M48 240c18-6 40-9 70-9 28 0 52 3 74 10",
      "M120 218c2-34 0-66-6-96 -4-22-4-40 2-58",
      "M116 120c-30 4-58-6-76-30 -8-10-12-22-12-34 24-2 52 4 70 20 14 12 20 28 18 44",
      "M118 92c18-26 46-42 80-44 12 0 22 2 30 6 -6 26-24 46-48 56 -20 8-42 8-62 0",
      "M60 74c16 6 32 16 46 32",
      "M154 64c-12 8-24 18-34 30",
      "M114 62c-6-14-6-28 0-40 8-10 18-16 30-18 2 14-2 28-12 38 -6 6-12 10-18 12",
    ],
  },
  // leafy branch, diagonal
  branch: {
    viewBox: "0 0 260 200",
    d: [
      "M10 186c40-30 86-62 130-92 36-24 72-48 110-74",
      "M70 146c-6-22 0-42 18-56 8 20 2 42-18 56z",
      "M74 142c20 2 38 12 48 30 -20 4-38-6-48-30z",
      "M130 104c-4-24 4-44 24-58 6 22-2 44-24 58z",
      "M134 100c22-2 40 6 52 24 -22 6-40-2-52-24z",
      "M188 66c0-20 10-36 28-46 4 20-6 36-28 46z",
      "M192 62c18 0 32 8 42 22 -18 4-32-4-42-22z",
    ],
  },
} as const;

export function LineArt({ name, className, strokeWidth = 2 }: { name: keyof typeof ART; className?: string; strokeWidth?: number }) {
  const art = ART[name];
  return (
    <svg
      aria-hidden
      viewBox={art.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("pointer-events-none text-brand-900", className)}
    >
      {art.d.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/** Fixed positions (not random) so server and client render the same markup. */
const LEAVES = [
  { top: "8%", left: "4%", r: -30, s: 1 },
  { top: "22%", left: "38%", r: 40, s: 0.7 },
  { top: "62%", left: "2%", r: 15, s: 0.9 },
  { top: "90%", left: "40%", r: -55, s: 0.75 },
  { top: "12%", left: "56%", r: 70, s: 0.6 },
  { top: "48%", left: "48%", r: -10, s: 0.55 },
  { top: "88%", left: "58%", r: 25, s: 0.8 },
  { top: "34%", left: "94%", r: -40, s: 0.85 },
  { top: "70%", left: "90%", r: 60, s: 0.65 },
];

/** Young leaves scattered over the hero background (the reference's petals). */
export function LeafScatter({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {LEAVES.map((l, i) => (
        <svg
          key={i}
          viewBox="0 0 40 24"
          className="absolute w-8 text-brand-300/70 md:w-10"
          style={{ top: l.top, left: l.left, transform: `rotate(${l.r}deg) scale(${l.s})` }}
        >
          <path fill="currentColor" d="M2 12C8 3 22 0 38 6 32 18 18 24 2 12Z" />
          <path fill="none" stroke="#6db33f" strokeWidth="1" strokeOpacity=".5" d="M4 12C14 10 26 9 36 7" />
        </svg>
      ))}
    </div>
  );
}
