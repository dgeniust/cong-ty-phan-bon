import { cn } from "@/lib/utils";

/** Centered serif-caps section title (design.md §4). Keep titles short – max ~5 words. */
export function SerifHeading({
  id,
  title,
  subtitle,
  inverted,
  className,
}: {
  id: string;
  title: string;
  subtitle?: string;
  inverted?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto mb-12 max-w-2xl text-center md:mb-14", className)}>
      <h2 id={id} className={cn("serif-caps text-[1.75rem] md:text-[2.5rem]", inverted && "text-white")}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-[15px] leading-relaxed md:text-base", inverted ? "text-white/75" : "text-ink-muted")}>{subtitle}</p>
      )}
    </div>
  );
}
