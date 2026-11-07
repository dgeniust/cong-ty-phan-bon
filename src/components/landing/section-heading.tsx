import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({ title, subtitle, className }: { title: string; subtitle?: string; className?: string }) {
  return (
    <div className={cn("mb-8 text-center md:mb-10", className)}>
      <h2 className="inline-flex items-center gap-2 text-2xl font-bold uppercase tracking-tight text-brand-700 md:text-3xl">
        <Leaf className="size-6 fill-brand-400 text-brand-600" aria-hidden />
        {title}
      </h2>
      {subtitle && <p className="mx-auto mt-2 max-w-2xl text-sm text-ink-muted md:text-lg">{subtitle}</p>}
    </div>
  );
}
