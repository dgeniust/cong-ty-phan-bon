import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Doodle } from "@/components/shared/doodle";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import { categories } from "@/lib/mock/categories";
import { normalize } from "@/lib/mock/search";
import { resolveHref } from "@/lib/site";
import { cn } from "@/lib/utils";

/** CMS bullets are plain text ("Phân bón NPK") – link them to the matching category when one exists. */
const categoryHref = (label: string) => {
  const c = categories.find((x) => normalize(x.name) === normalize(label));
  return c ? `/danh-muc/${c.slug}` : `/tim-kiem?q=${encodeURIComponent(label)}`;
};
const groupOf = (title: string) => categories.find((x) => !x.parent && normalize(x.name) === normalize(title));

/** Alternating image / text blocks, one per product group (design.md §5.4). */
export function ProductGroups({ products }: { products: SiteContent["products"] }) {
  return (
    <section id="san-pham" aria-labelledby="san-pham-title" className="bg-white py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <h2 id="san-pham-title" className="display text-[2rem] md:text-[2.75rem]">
            {products.title}
          </h2>
          {products.subtitle && <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">{products.subtitle}</p>}
        </div>

        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          {products.items.map((p, i) => {
            const flip = i % 2 === 1;
            const group = groupOf(p.title);
            const href = resolveHref(p.ctaHref || (group ? `/danh-muc/${group.slug}` : "/san-pham"));
            return (
              <article key={i} className="grid items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-24">
                <Link
                  href={href}
                  tabIndex={-1}
                  aria-hidden
                  className={cn("relative block aspect-[5/4] overflow-hidden rounded-[2rem] bg-surface-strong", flip && "md:order-2")}
                >
                  <SmartImage
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                  />
                </Link>

                <div className="relative">
                  <h3 className="display text-[1.75rem] md:text-[2.25rem]">{p.title}</h3>
                  {group?.description && <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">{group.description}</p>}
                  {p.bullets.length > 0 && (
                    <ul className="mt-7 max-w-md">
                      {p.bullets.map((b, j) => (
                        <li key={j}>
                          <Link
                            href={categoryHref(b)}
                            className="group flex min-h-12 items-center justify-between gap-4 rounded-xl px-1 text-[15px] font-medium text-brand-900 transition-colors hover:bg-surface hover:px-3"
                          >
                            <span className="flex items-center gap-3">
                              <span className="size-1.5 rounded-full bg-brand-500" aria-hidden />
                              {b}
                            </span>
                            <ArrowUpRight className="size-4 text-ink-subtle transition-colors group-hover:text-brand-700" aria-hidden />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button asChild className="mt-8">
                    <Link href={href}>{p.ctaLabel || `Xem ${p.title.toLocaleLowerCase("vi")}`}</Link>
                  </Button>
                  {i === 0 && <Doodle name="swirl" className="absolute -right-2 -top-6 w-14" />}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
