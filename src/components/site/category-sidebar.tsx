import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryGroups } from "@/lib/mock/categories";
import { cn } from "@/lib/utils";

export function CategorySidebar({ active, counts, phone }: { active?: string; counts: Record<string, number>; phone: string }) {
  const linkCls = (on: boolean) =>
    cn(
      "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition",
      on ? "bg-brand-600 font-semibold text-white" : "text-ink hover:bg-muted hover:text-brand-700"
    );
  return (
    <aside className="space-y-5">
      <div className="rounded-2xl border border-border/70 bg-white p-4 shadow-soft">
        <h2 className="mb-3 px-3 text-sm font-bold uppercase tracking-wide text-brand-700">Danh mục sản phẩm</h2>
        <Link href="/san-pham" className={linkCls(!active)}>
          Tất cả sản phẩm <span className="text-xs opacity-80">{counts.__all}</span>
        </Link>
        {categoryGroups.map((g) => (
          <div key={g.slug} className="mt-3">
            <Link href={`/danh-muc/${g.slug}`} className={cn(linkCls(active === g.slug), "font-semibold")}>
              {g.name} <span className="text-xs opacity-80">{counts[g.slug] ?? 0}</span>
            </Link>
            <ul className="mt-1 space-y-0.5 border-l-2 border-brand-100 pl-2 ml-3">
              {g.children.map((c) => (
                <li key={c.slug}>
                  <Link href={`/danh-muc/${c.slug}`} className={linkCls(active === c.slug)}>
                    <span className="flex items-center gap-1">
                      <ChevronRight className="size-3.5 opacity-60" aria-hidden />
                      {c.name}
                    </span>
                    <span className="text-xs opacity-80">{counts[c.slug] ?? 0}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-brand-800 p-5 text-white shadow-soft">
        <p className="font-script text-2xl">Cần tư vấn?</p>
        <p className="mt-1 text-sm text-white/80">Kỹ thuật viên hỗ trợ chọn sản phẩm phù hợp cho vườn của bạn.</p>
        <Button asChild variant="sun" className="mt-4 w-full">
          <a href={`tel:${phone}`}>
            <Phone className="fill-brand-700" /> {phone}
          </a>
        </Button>
      </div>
    </aside>
  );
}
