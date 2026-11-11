import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import { getIcon } from "@/lib/icons";
import { resolveHref } from "@/lib/site";

/** Photo with an offset colour block behind it, text on the right (design.md §5.4). */
export function AboutOffset({ about, stats }: { about: SiteContent["about"]; stats: SiteContent["hero"]["stats"] }) {
  return (
    <section id="gioi-thieu" aria-labelledby="gioi-thieu-title" className="bg-white py-20 md:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-lg pl-6 pt-6 sm:pl-8 sm:pt-8">
          <div aria-hidden className="absolute left-0 top-0 h-[78%] w-[62%] rounded-lg bg-sun-300" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface shadow-lift">
            <SmartImage src={about.image} alt="" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </div>
        </div>

        <div>
          <h2 id="gioi-thieu-title" className="serif-caps text-[1.75rem] md:text-[2.5rem]">
            {about.title}
          </h2>
          {about.quote && (
            <p className="mt-4 whitespace-pre-line font-serif text-xl leading-snug text-brand-700 md:text-2xl">{about.quote}</p>
          )}
          <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-relaxed text-ink-muted md:text-base">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {about.highlights.length > 0 && (
            <ul className="mt-8 grid max-w-xl gap-x-6 gap-y-4 sm:grid-cols-2">
              {about.highlights.map((h, i) => {
                const Icon = getIcon(h.icon);
                return (
                  <li key={i} className="flex items-center gap-3 text-[15px] font-medium text-brand-900">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sun-300 text-brand-900">
                      <Icon className="size-4" strokeWidth={2} aria-hidden />
                    </span>
                    {h.title}
                  </li>
                );
              })}
            </ul>
          )}

          {stats.length > 0 && (
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
              {stats.slice(0, 3).map((s, i) => (
                <div key={i} className="flex flex-col">
                  <dt className="order-2 mt-1 max-w-[12rem] text-[13px] leading-snug text-ink-muted">{s.label}</dt>
                  <dd className="order-1 font-serif text-[2.5rem] font-medium leading-none tabular-nums text-brand-900">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {about.ctaLabel && (
            <Button asChild variant="sun" size="lg" className="mt-10">
              <Link href={resolveHref(about.ctaHref)}>{about.ctaLabel}</Link>
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
