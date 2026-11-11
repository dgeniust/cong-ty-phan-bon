import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { OrganicImage } from "@/components/shared/sketch";
import type { SiteContent } from "@/lib/content/schema";
import { categories } from "@/lib/mock/categories";
import { normalize } from "@/lib/mock/search";
import { resolveHref } from "@/lib/site";

const categoryHref = (label: string) => {
  const c = categories.find((x) => normalize(x.name) === normalize(label));
  return c ? `/danh-muc/${c.slug}` : `/tim-kiem?q=${encodeURIComponent(label)}`;
};
const groupOf = (title: string) => categories.find((x) => !x.parent && normalize(x.name) === normalize(title));

/** Two product groups side by side; every sub-category is one tap away (design.md §5.5). */
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

        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10 lg:gap-16">
          {products.items.map((p, i) => {
            const group = groupOf(p.title);
            const href = resolveHref(p.ctaHref || (group ? `/danh-muc/${group.slug}` : "/san-pham"));
            return (
              <article key={i} className="flex flex-col rounded-[2rem] bg-paper p-6 sm:p-8 lg:p-10">
                <Link href={href} tabIndex={-1} aria-hidden className="block">
                  <OrganicImage
                    src={p.image}
                    alt=""
                    sizes="(min-width: 768px) 30vw, 70vw"
                    shape={i % 2 ? "pebble" : "blob"}
                    rotate={i % 2 ? 3 : -3}
                    outline="around"
                    className="mx-auto mt-4 aspect-[5/4] w-[64%]"
                  />
                </Link>
                <h3 className="display mt-12 text-[1.75rem] md:text-[2rem]">{p.title}</h3>
                {group?.description && <p className="mt-3 text-base leading-relaxed text-ink-muted">{group.description}</p>}
                {p.bullets.length > 0 && (
                  <ul className="mt-6 grid gap-1 sm:grid-cols-2 sm:gap-x-4">
                    {p.bullets.map((b, j) => (
                      <li key={j}>
                        <Link
                          href={categoryHref(b)}
                          className="group flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 text-[15px] font-medium text-brand-900 transition-colors hover:bg-white"
                        >
                          {b}
                          <ArrowUpRight className="size-4 shrink-0 text-ink-subtle group-hover:text-brand-700" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto pt-8">
                  <Button asChild>
                    <Link href={href}>{p.ctaLabel || `Xem ${p.title.toLocaleLowerCase("vi")}`}</Link>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
