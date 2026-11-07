import { Container } from "@/components/shared/container";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import { SectionHeading } from "./section-heading";

export function CropsSection({ crops }: { crops: SiteContent["crops"] }) {
  return (
    <section id="cay-trong" className="scroll-mt-20 pb-14 md:pb-20">
      <Container>
        <SectionHeading title={crops.title} subtitle={crops.subtitle} />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {crops.items.map((c, i) => (
            <article
              key={i}
              className="group overflow-hidden rounded-xl border border-border/70 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <SmartImage
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-3 py-4 text-center">
                <h3 className="font-semibold text-brand-800">{c.name}</h3>
                <p className="mt-1 text-xs text-ink-muted">{c.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
