import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import { getIcon } from "@/lib/icons";
import { resolveHref } from "@/lib/site";

export function AboutSection({ about }: { about: SiteContent["about"] }) {
  return (
    <section id="gioi-thieu" aria-labelledby="gioi-thieu-title" className="py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <figure className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface sm:aspect-[4/3] lg:aspect-[4/5]">
            <SmartImage src={about.image} alt={about.title} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          {about.quote && (
            <figcaption className="absolute -bottom-6 left-6 right-6 rounded-2xl bg-brand-900 px-7 py-6 shadow-lift sm:right-auto sm:max-w-sm lg:-right-10 lg:left-auto">
              <p className="whitespace-pre-line font-script text-[1.75rem] leading-snug text-sun-200">{about.quote}</p>
            </figcaption>
          )}
        </figure>

        <div className="pt-6 lg:pt-0">
          <h2 id="gioi-thieu-title" className="text-[1.75rem] font-bold leading-tight tracking-tight text-brand-900 md:text-[2.25rem]">
            {about.title}
          </h2>
          <span className="rule-sun" aria-hidden />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted md:text-[17px]">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {about.highlights.length > 0 && (
            <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {about.highlights.map((h, i) => {
                const Icon = getIcon(h.icon);
                return (
                  <li key={i} className="flex items-center gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="text-[15px] font-medium text-brand-900">{h.title}</span>
                  </li>
                );
              })}
            </ul>
          )}

          {about.ctaLabel && (
            <Button asChild className="mt-10">
              <Link href={resolveHref(about.ctaHref)}>{about.ctaLabel}</Link>
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
