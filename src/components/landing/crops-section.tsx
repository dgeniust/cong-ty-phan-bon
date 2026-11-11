import Link from "next/link";
import { Container } from "@/components/shared/container";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import { SectionHeading } from "./section-heading";

export function CropsSection({ crops }: { crops: SiteContent["crops"] }) {
  return (
    <section id="cay-trong" aria-labelledby="cay-trong-title" className="bg-surface py-20 md:py-28">
      <Container>
        <SectionHeading id="cay-trong-title" title={crops.title} subtitle={crops.subtitle} />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
          {crops.items.map((c, i) => {
            // Crop names like "Cây cà phê" -> search "cà phê" to surface matching products & articles.
            const q = c.name.replace(/^cây\s+/i, "");
            return (
              <li key={i}>
                <Link
                  href={`/tim-kiem?q=${encodeURIComponent(q)}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-brand-900"
                >
                  <SmartImage
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 46vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <h3 className="text-lg font-semibold text-white">{c.name}</h3>
                    {c.description && <p className="mt-1 text-[13px] leading-snug text-white/75">{c.description}</p>}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
