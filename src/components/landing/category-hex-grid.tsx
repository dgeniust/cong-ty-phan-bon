import Link from "next/link";
import { Bug, FlaskConical, Flower2, Layers, Leaf, Microscope, Scissors, ShieldPlus, type LucideIcon } from "lucide-react";
import { Container } from "@/components/shared/container";
import { categories, categoryScope } from "@/lib/mock/categories";
import { products } from "@/lib/mock/products";
import { SerifHeading } from "./serif-heading";

const ICONS: Record<string, LucideIcon> = {
  "phan-bon-huu-co": Leaf,
  "phan-bon-vo-co": FlaskConical,
  "phan-bon-npk": Layers,
  "phan-bon-vi-sinh": Microscope,
  "thuoc-tru-sau": Bug,
  "thuoc-tru-benh": ShieldPlus,
  "thuoc-diet-co": Scissors,
  "kich-thich-sinh-truong": Flower2,
};

const HEX = "polygon(25% 4%, 75% 4%, 100% 50%, 75% 96%, 25% 96%, 0% 50%)";

/** Dark band of hexagon badges – one per sub-category (design.md §5.5). */
export function CategoryHexGrid() {
  const subs = categories.filter((c) => c.parent);
  return (
    <section aria-labelledby="danh-muc-title" className="bg-brand-900 py-20 md:py-24">
      <Container>
        <SerifHeading
          id="danh-muc-title"
          inverted
          title="Danh mục sản phẩm"
          subtitle="Chọn đúng nhóm sản phẩm bạn cần – mỗi danh mục có mô tả ngắn để dễ phân biệt."
        />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 md:gap-x-6">
          {subs.map((c) => {
            const Icon = ICONS[c.slug] ?? Leaf;
            const scope = categoryScope(c.slug);
            const count = products.filter((p) => scope.includes(p.categorySlug)).length;
            return (
              <li key={c.slug}>
                <Link
                  href={`/danh-muc/${c.slug}`}
                  className="group flex h-full flex-col items-center rounded-lg px-3 py-6 text-center transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-sun-300"
                >
                  <span
                    aria-hidden
                    className="grid h-14 w-16 place-items-center bg-sun-300 text-brand-950 transition-transform duration-300 group-hover:-translate-y-0.5"
                    style={{ clipPath: HEX }}
                  >
                    <Icon className="size-6" strokeWidth={1.75} />
                  </span>
                  <span className="mt-4 font-serif text-lg font-medium uppercase tracking-[0.03em] text-white">{c.name}</span>
                  <span className="mt-2 max-w-[16rem] text-[13px] leading-relaxed text-white/70">{c.description}</span>
                  <span className="mt-3 text-[13px] font-medium text-sun-200">{count > 0 ? `${count} sản phẩm` : "Đang cập nhật"}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
