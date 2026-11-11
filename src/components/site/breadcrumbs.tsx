import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/shared/json-ld";
import { absoluteUrl } from "@/lib/site";

export type Crumb = { label: string; href?: string };

/** Visible trail + schema.org BreadcrumbList for rich results. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Trang chủ", href: "/" }, ...items];
  const structured = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absoluteUrl(c.href) } : {}),
    })),
  };

  return (
    <nav aria-label="Đường dẫn">
      <JsonLd data={structured} />
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-ink-subtle">
        {trail.map((c, i) => (
          <li key={i} className="flex min-w-0 items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />}
            {c.href && i < trail.length - 1 ? (
              <Link href={c.href} className="transition-colors hover:text-brand-800">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="max-w-[60vw] truncate font-medium text-ink-muted md:max-w-md">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
