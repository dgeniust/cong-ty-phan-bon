import { Sprout } from "lucide-react";

export function EmptyState({ title, description, children }: { title: string; description?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 px-6 py-14 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-sun-300/70 text-brand-700">
        <Sprout className="size-8" aria-hidden />
      </span>
      <h3 className="mt-4 text-lg font-bold text-brand-800">{title}</h3>
      {description && <p className="mt-1 max-w-md text-sm text-ink-muted">{description}</p>}
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}
