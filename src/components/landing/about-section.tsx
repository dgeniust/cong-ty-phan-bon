import { ChevronRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import { getIcon } from "@/lib/icons";

export function AboutSection({ about }: { about: SiteContent["about"] }) {
  return (
    <section id="gioi-thieu" className="scroll-mt-20 bg-brand-50 py-14 md:py-16">
      <Container className="grid items-center gap-8 lg:grid-cols-[1.1fr_1.2fr_0.75fr]">
        <div className="relative aspect-16/10 overflow-hidden rounded-2xl shadow-soft">
          <SmartImage src={about.image} alt={about.title} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
          <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-white/90 via-white/50 to-transparent" />
          <p className="absolute left-6 top-5 whitespace-pre-line font-script text-2xl leading-tight text-brand-800 md:text-3xl">
            {about.quote}
          </p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold uppercase text-brand-700">
            <Leaf className="size-6 fill-brand-400 text-brand-600" aria-hidden />
            {about.title}
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {about.ctaLabel && (
            <Button asChild variant="sun" className="mt-6">
              <a href={about.ctaHref}>
                {about.ctaLabel} <ChevronRight />
              </a>
            </Button>
          )}
        </div>

        <ul className="grid gap-4 rounded-2xl bg-white/80 p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-1">
          {about.highlights.map((h, i) => {
            const Icon = getIcon(h.icon);
            return (
              <li key={i} className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sun-300/60 text-brand-700">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-sm font-medium text-brand-800">{h.title}</span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
