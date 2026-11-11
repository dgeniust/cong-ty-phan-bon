import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Doodle } from "@/components/shared/doodle";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import { getIcon } from "@/lib/icons";
import { resolveHref } from "@/lib/site";

/** Text left, photo bleeding off the right edge (design.md §5.7). */
export function AboutSplit({ about }: { about: SiteContent["about"] }) {
  return (
    <section id="gioi-thieu" aria-labelledby="gioi-thieu-title" className="overflow-hidden py-20 md:py-28">
      {/* Left column aligns with the 80rem container; right column runs to the viewport edge. */}
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative px-4 sm:px-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-0">
          <h2 id="gioi-thieu-title" className="display max-w-xl text-[2rem] md:text-[2.75rem]">
            {about.title}
          </h2>
          {about.quote && <p className="mt-5 whitespace-pre-line text-xl font-medium leading-snug text-brand-600">{about.quote}</p>}
          <div className="mt-6 max-w-lg space-y-4 text-base leading-relaxed text-ink-muted">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {about.highlights.length > 0 && (
            <ul className="mt-9 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4">
              {about.highlights.map((h, i) => {
                const Icon = getIcon(h.icon);
                return (
                  <li key={i} className="flex items-center gap-3 text-[15px] font-medium text-brand-900">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                      <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
                    </span>
                    {h.title}
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            {about.ctaLabel && (
              <Button asChild size="lg">
                <Link href={resolveHref(about.ctaHref)}>{about.ctaLabel}</Link>
              </Button>
            )}
            <Button asChild variant="outline" size="lg">
              <Link href="/lien-he">Liên hệ</Link>
            </Button>
          </div>
        </div>

        <div className="relative px-4 sm:px-6 lg:px-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-surface-strong lg:aspect-[5/4] lg:rounded-r-none">
            <SmartImage src={about.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <Doodle name="smile" className="absolute -left-14 bottom-10 w-12" />
        </div>
      </div>
    </section>
  );
}
