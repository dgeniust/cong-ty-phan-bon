import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import { SectionHeading } from "./section-heading";

export function ProductsSection({ products }: { products: SiteContent["products"] }) {
  return (
    <section id="san-pham" className="scroll-mt-20 py-14 md:py-20">
      <Container>
        <SectionHeading title={products.title} subtitle={products.subtitle} />
        <div className="grid gap-6 md:grid-cols-2">
          {products.items.map((p, i) => (
            <article
              key={i}
              className="group grid overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-r from-white to-brand-50 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:grid-cols-[1.1fr_1fr]"
            >
              <div className="relative aspect-4/3 overflow-hidden sm:aspect-auto sm:min-h-56">
                <SmartImage
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-r from-transparent to-white/90 sm:block" />
              </div>
              <div className="flex flex-col justify-center p-6">
                <h3 className="text-lg font-bold uppercase text-brand-700 md:text-xl">{p.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {p.bullets.map((b, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-ink">
                      <Check className="size-4 shrink-0 text-brand-500" strokeWidth={3} aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                {p.ctaLabel && (
                  <Button asChild variant="brand" size="sm" className="mt-5 w-fit">
                    <a href={p.ctaHref}>
                      {p.ctaLabel} <ChevronRight />
                    </a>
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
