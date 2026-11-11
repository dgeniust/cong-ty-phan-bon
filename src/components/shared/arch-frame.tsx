import { cn } from "@/lib/utils";
import { SmartImage } from "./smart-image";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Tailwind aspect class, e.g. "aspect-[4/5]". */
  aspect?: string;
  className?: string;
  /** Colour of the arch background behind the picture. */
  tone?: "leaf" | "sage" | "white";
  children?: React.ReactNode;
};

const TONES = { leaf: "bg-brand-100", sage: "bg-surface-strong", white: "bg-white" };

/**
 * Arch-topped frame (signature shape of the "Vườn Xanh" style – see design.md §1).
 * Top radii use container units (50cqw) so the arch is a true semicircle and the
 * bottom 2rem corners are not scaled down by the browser.
 */
export function ArchFrame({ src, alt, sizes, priority, aspect = "aspect-[4/5]", className, tone = "leaf", children }: Props) {
  return (
    <div className={cn("@container relative", className)}>
      <div className={cn("relative overflow-hidden", aspect, TONES[tone])} style={{ borderRadius: "50cqw 50cqw 2rem 2rem" }}>
        <SmartImage src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
      {children}
    </div>
  );
}
