import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryGroups } from "@/lib/mock/categories";
import { cn } from "@/lib/utils";

const linkCls = (on: boolean) =>
  cn(
    "flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[15px] transition-colors",
    on ? "bg-white font-semibold text-brand-900 shadow-soft" : "text-ink-muted hover:bg-white/70 hover:text-brand-900"
  );

const Count = ({ n }: { n?: number }) => <span className="text-[13px] tabular-nums text-ink-subtle">{n ?? 0}</span>;

export function CategorySidebar({ active, counts, phone }: { active?: string; counts: Record<string, number>; phone: string }) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      <nav aria-label="Danh mục sản phẩm" className="rounded-3xl bg-surface p-4">
        <Link href="/san-pham" aria-current={!active ? "page" : undefined} className={linkCls(!active)}>
          Tất cả sản phẩm <Count n={counts.__all} />
        </Link>
        {categoryGroups.map((g) => (
          <div key={g.slug} className="mt-5">
            <Link
              href={`/danh-muc/${g.slug}`}
              aria-current={active === g.slug ? "page" : undefined}
              className={cn(linkCls(active === g.slug), "font-semibold text-brand-900")}
            >
              {g.name} <Count n={counts[g.slug]} />
            </Link>
            <ul className="mt-1 space-y-0.5 pl-3">
              {g.children.map((c) => (
                <li key={c.slug}>
                  <Link href={`/danh-muc/${c.slug}`} aria-current={active === c.slug ? "page" : undefined} className={linkCls(active === c.slug)}>
                    {c.name} <Count n={counts[c.slug]} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="rounded-3xl bg-brand-900 p-6 text-white">
        <p className="text-lg font-semibold">Chưa chắc nên chọn loại nào?</p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">Kỹ thuật viên tư vấn miễn phí theo loại cây, tuổi cây và tình trạng đất của vườn bạn.</p>
        <Button asChild variant="sun" className="mt-5 w-full">
          <a href={`tel:${phone}`}>
            <Phone /> {phone}
          </a>
        </Button>
      </div>
    </aside>
  );
}

/** Horizontal category chips for small screens (sidebar is shown on lg+). */
export function CategoryChips({ active }: { active?: string }) {
  const items = [{ slug: "", name: "Tất cả" }, ...categoryGroups.flatMap((g) => [g, ...g.children])];
  return (
    <nav aria-label="Danh mục sản phẩm" className="-mx-4 mb-8 overflow-x-auto px-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:hidden [&::-webkit-scrollbar]:hidden">
      <ul className="flex w-max gap-2">
        {items.map((c) => {
          const on = (active ?? "") === c.slug;
          return (
            <li key={c.slug || "all"}>
              <Link
                href={c.slug ? `/danh-muc/${c.slug}` : "/san-pham"}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "inline-flex h-10 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors",
                  on ? "bg-brand-800 text-white" : "bg-surface text-ink hover:bg-surface-strong"
                )}
              >
                {c.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
