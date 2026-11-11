import Link from "next/link";
import { Container } from "@/components/shared/container";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import { getCategory } from "@/lib/mock/categories";
import type { Product } from "@/lib/mock/types";
import { cropQuery } from "@/lib/text";
import { ArrowPill } from "./hero";

/** "Explore our collection": crop chips + lime product tiles (design.md §5.6). */
export function Collection({ items, crops }: { items: Product[]; crops: SiteContent["crops"]["items"] }) {
  return (
    <section id="cay-trong" aria-labelledby="bo-suu-tap-title" className="bg-white py-20 md:py-28">
      <Container>
        <div className="flex flex-col-reverse gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-muted">
            Phân bón và thuốc bảo vệ thực vật chính hãng cho cà phê, sầu riêng, tiêu, cao su và lúa. Chọn cây trồng để lọc nhanh.
          </p>
          <h2 id="bo-suu-tap-title" className="serif-title text-[2.25rem] text-brand-900 md:text-right md:text-[2.75rem]">
            <span className="font-bold">Khám phá</span>
            <br />
            sản phẩm của chúng tôi
          </h2>
        </div>

        {crops.length > 0 && (
          <nav aria-label="Lọc theo cây trồng" className="mt-10">
            <ul className="flex flex-wrap gap-2.5">
              {crops.map((c) => (
                <li key={c.name}>
                  <Link
                    href={`/tim-kiem?q=${encodeURIComponent(cropQuery(c.name))}`}
                    className="inline-flex h-11 items-center gap-2.5 rounded-full bg-lime-tint pl-1.5 pr-4 text-[15px] font-medium text-brand-900 transition-colors hover:bg-brand-100"
                  >
                    <span className="relative size-8 overflow-hidden rounded-full bg-white">
                      <SmartImage src={c.image} alt="" fill sizes="32px" className="object-cover" />
                    </span>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <ul className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {items.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/san-pham/${p.slug}`}
                className="group relative flex h-full flex-col rounded-3xl bg-lime-tint p-3 pb-5 transition-shadow hover:shadow-soft focus-visible:ring-2 focus-visible:ring-brand-500 md:p-4 md:pb-6"
              >
                {p.isNew && (
                  <span className="absolute right-3 top-3 z-10 grid size-11 place-items-center rounded-full bg-brand-900 text-[11px] font-semibold text-white">
                    MỚI
                  </span>
                )}
                <span className="relative block aspect-square overflow-hidden rounded-2xl bg-white">
                  <SmartImage
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 22vw, 46vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </span>
                <span className="mt-4 block px-1 text-[12px] text-brand-600">{getCategory(p.categorySlug)?.name}</span>
                <span className="mt-1 block px-1 font-serif text-base font-medium leading-snug text-brand-900 md:text-lg">{p.name}</span>
                <span className="mt-auto block px-1 pt-3 text-[13px] text-ink-muted">{p.packing.join(" / ")}</span>
                <span className="mt-1 block px-1 text-[15px] font-semibold text-brand-600">Liên hệ báo giá</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <ArrowPill href="/san-pham">Xem tất cả sản phẩm</ArrowPill>
        </div>
      </Container>
    </section>
  );
}
