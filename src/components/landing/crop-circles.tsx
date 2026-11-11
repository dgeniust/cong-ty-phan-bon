import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Doodle } from "@/components/shared/doodle";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import { cropQuery } from "@/lib/text";

/** Centered row of round crop photos – the "lid variants" row of the reference (design.md §5.5). */
export function CropCircles({ crops }: { crops: SiteContent["crops"] }) {
  return (
    <section id="cay-trong" aria-labelledby="cay-trong-title" className="relative py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="cay-trong-title" className="display text-[2rem] md:text-[2.75rem]">
            {crops.title}
          </h2>
          {crops.subtitle && <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">{crops.subtitle}</p>}
        </div>

        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 md:mt-16 lg:grid-cols-5">
          {crops.items.map((c) => (
            <li key={c.name} className="w-full max-w-[11rem]">
              <Link href={`/tim-kiem?q=${encodeURIComponent(cropQuery(c.name))}`} className="group block text-center">
                <span className="relative mx-auto block aspect-square w-full overflow-hidden rounded-full bg-brand-100 shadow-soft ring-8 ring-white transition-transform duration-300 group-hover:-translate-y-1">
                  <SmartImage src={c.image} alt="" fill sizes="176px" className="object-cover" />
                </span>
                <span className="mt-5 block text-lg font-medium text-brand-900 group-hover:text-brand-700">{c.name}</span>
                {c.description && <span className="mt-1 block text-[13px] text-ink-muted">{c.description}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
      <Doodle name="spark" className="absolute bottom-16 right-[8%] w-10 text-brand-500" />
    </section>
  );
}
