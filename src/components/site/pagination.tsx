import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** URL-driven pagination (?page=n), keeps other search params. */
export function Pagination({
  page,
  totalPages,
  basePath,
  params = {},
}: {
  page: number;
  totalPages: number;
  basePath: string;
  params?: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;
  const href = (p: number) => {
    const sp = new URLSearchParams(Object.entries(params).filter(([, v]) => v) as [string, string][]);
    if (p > 1) sp.set("page", String(p));
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };
  const item = "grid size-11 place-items-center rounded-full text-[15px] font-medium transition-colors";
  const edge = (disabled: boolean) => cn(item, "text-ink hover:bg-surface", disabled && "pointer-events-none opacity-30");

  return (
    <nav aria-label="Phân trang" className="mt-16 flex items-center justify-center gap-1.5">
      <Link href={href(Math.max(1, page - 1))} rel="prev" aria-label="Trang trước" aria-disabled={page === 1} tabIndex={page === 1 ? -1 : undefined} className={edge(page === 1)}>
        <ChevronLeft className="size-5" />
      </Link>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-label={`Trang ${p}`}
          aria-current={p === page ? "page" : undefined}
          className={cn(item, p === page ? "bg-brand-800 text-white" : "text-ink hover:bg-surface")}
        >
          {p}
        </Link>
      ))}
      <Link
        href={href(Math.min(totalPages, page + 1))}
        rel="next"
        aria-label="Trang sau"
        aria-disabled={page === totalPages}
        tabIndex={page === totalPages ? -1 : undefined}
        className={edge(page === totalPages)}
      >
        <ChevronRight className="size-5" />
      </Link>
    </nav>
  );
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  return { items: items.slice((current - 1) * perPage, current * perPage), page: current, totalPages };
}
