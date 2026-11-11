import { cn } from "@/lib/utils";
import { SmartImage } from "./smart-image";

/**
 * Hand-drawn double loop that wraps any box (design.md §6). The SVG is stretched
 * to the box; `non-scaling-stroke` keeps the pen width constant at any size.
 */
export function SketchOutline({ className, strokeWidth = 1.75 }: { className?: string; strokeWidth?: number }) {
  // The wrapper takes the insets; an absolutely positioned <svg> would keep its intrinsic 1:1 ratio.
  return (
    <span aria-hidden className={cn("pointer-events-none absolute block text-brand-900", className)}>
      <svg
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        className="block size-full"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeWidth={strokeWidth}
          d="M100 6C150 4 196 40 194 98C192 154 150 196 98 194C46 192 6 152 8 100C10 48 46 10 104 8C120 8 128 12 134 15"
        />
        <path
          vectorEffect="non-scaling-stroke"
          strokeWidth={strokeWidth * 0.7}
          opacity={0.7}
          d="M92 13C146 8 190 48 187 103C184 152 146 189 101 188C52 187 13 151 15 97C17 54 50 18 90 15"
        />
      </svg>
    </span>
  );
}

const SHAPES = {
  blob: "64% 36% 55% 45% / 52% 44% 56% 48%",
  pebble: "38% 62% 68% 32% / 44% 40% 60% 56%",
  circle: "9999px",
};

type OrganicImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  shape?: keyof typeof SHAPES;
  /** Degrees – tilt the picture like a cut-out laid on paper. */
  rotate?: number;
  /** Where the pen line sits relative to the picture. */
  outline?: "around" | "offset" | "none";
  className?: string;
  imageClassName?: string;
};

/** Picture in an organic cut-out shape with a sketch line around it (the reference's collage look). */
export function OrganicImage({
  src,
  alt,
  sizes,
  priority,
  shape = "blob",
  rotate = 0,
  outline = "offset",
  className,
  imageClassName,
}: OrganicImageProps) {
  return (
    <div className={cn("relative", className)} style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}>
      {/* clip-path (not overflow + border-radius) clips reliably inside rotated parents */}
      <div className="absolute inset-0 bg-brand-100" style={{ clipPath: `inset(0 round ${SHAPES[shape]})` }}>
        <SmartImage src={src} alt={alt} fill priority={priority} sizes={sizes} className={cn("object-cover", imageClassName)} />
      </div>
      {outline !== "none" && (
        <SketchOutline className={outline === "offset" ? "-inset-[7%] translate-x-[4%] translate-y-[3%] rotate-[4deg]" : "-inset-[5%]"} />
      )}
    </div>
  );
}
