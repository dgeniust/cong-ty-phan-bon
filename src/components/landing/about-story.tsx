import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { LineArt } from "@/components/shared/line-art";
import { OrganicImage } from "@/components/shared/sketch";
import type { SiteContent } from "@/lib/content/schema";
import { resolveHref } from "@/lib/site";

/** Story block: cut-out photo + pen line, statement, real numbers (design.md §5.8). */
export function AboutStory({ about, stats }: { about: SiteContent["about"]; stats: SiteContent["hero"]["stats"] }) {
  return (
    <section id="gioi-thieu" aria-labelledby="gioi-thieu-title" className="relative overflow-hidden py-20 md:py-28">
      <LineArt name="branch" className="absolute -right-10 top-10 hidden w-72 opacity-15 lg:block" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <OrganicImage
          src={about.image}
          alt=""
          sizes="(min-width: 1024px) 38vw, 90vw"
          shape="blob"
          rotate={-3}
          className="mx-auto aspect-[4/5] w-[86%] max-w-md"
        />

        <div>
          <h2 id="gioi-thieu-title" className="display text-[2rem] md:text-[2.75rem]">
            {about.title}
          </h2>
          {about.quote && <p className="mt-5 whitespace-pre-line font-script text-[1.75rem] leading-snug text-brand-700">{about.quote}</p>}
          <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-ink-muted md:text-[17px]">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {stats.length > 0 && (
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
              {stats.slice(0, 3).map((s, i) => (
                <div key={i} className="flex flex-col">
                  <dt className="order-2 mt-1 max-w-[12rem] text-[13px] leading-snug text-ink-muted">{s.label}</dt>
                  <dd className="display order-1 text-[2.5rem] tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            {about.ctaLabel && (
              <Button asChild size="lg">
                <Link href={resolveHref(about.ctaHref)}>{about.ctaLabel}</Link>
              </Button>
            )}
            <Button asChild variant="ghost" size="lg">
              <Link href="/lien-he">Liên hệ</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
