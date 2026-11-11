import Link from "next/link";
import { Container } from "@/components/shared/container";
import { MoreLink } from "@/components/shared/more-link";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import { resolveHref } from "@/lib/site";
import { SectionHeading } from "./section-heading";

export function ProductsSection({ products }: { products: SiteContent["products"] }) {
  return (
    <section id="san-pham" aria-labelledby="san-pham-title" className="pb-20 pt-24 md:pb-28 md:pt-32">
      <Container>
        <SectionHeading
          id="san-pham-title"
          title={products.title}
          subtitle={products.subtitle}
          action={<MoreLink href="/san-pham">Xem tất cả sản phẩm</MoreLink>}
        />
        <div className="grid gap-8 md:grid-cols-2">
          {products.items.map((p, i) => {
            const href = resolveHref(p.ctaHref || "/san-pham");
            return (
              <article key={i} className="group flex flex-col overflow-hidden rounded-3xl bg-surface">
                <Link href={href} tabIndex={-1} aria-hidden className="relative block aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-7 md:p-9">
                  <h3 className="text-2xl font-bold tracking-tight text-brand-900">
                    <Link href={href} className="hover:text-brand-700">
                      {p.title}
                    </Link>
                  </h3>
                  {p.bullets.length > 0 && (
                    <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {p.bullets.map((b, j) => (
                        <li key={j} className="flex items-center gap-3 text-[15px] text-ink">
                          <span className="size-1.5 shrink-0 rounded-full bg-sun-500" aria-hidden />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {p.ctaLabel && (
                    <div className="mt-auto pt-8">
                      <MoreLink href={href}>{p.ctaLabel}</MoreLink>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
