import { Sprout } from "lucide-react";

export function EmptyState({ title, description, children }: { title: string; description?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-3xl bg-surface px-6 py-16 text-center md:py-20">
      <span className="grid size-14 place-items-center rounded-2xl bg-white text-brand-700 shadow-soft">
        <Sprout className="size-7" strokeWidth={1.75} aria-hidden />
      </span>
      <h2 className="mt-5 text-xl font-semibold text-brand-900">{title}</h2>
      {description && <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-muted">{description}</p>}
      {children && <div className="mt-7 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}
