"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { LeafDecor } from "@/components/shared/leaf-decor";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

export function HeroCarousel({ hero }: { hero: SiteContent["hero"] }) {
  const { slides, autoplay } = hero;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    if (!autoplay || paused || count < 2) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [autoplay, paused, count, go]);

  return (
    <section
      id="trang-chu"
      className="relative overflow-hidden bg-gradient-to-br from-sun-100 via-brand-50 to-brand-100"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <LeafDecor className="absolute -left-6 top-4 hidden w-28 text-brand-400/60 md:block" />
      <div className="relative min-h-[560px] md:min-h-[480px] lg:min-h-[520px]">
        {slides.map((s, i) => (
          <div
            key={i}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none",
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            {/* Image (bleeds to the right edge) */}
            <div className="absolute inset-y-0 right-0 hidden w-[56%] md:block">
              <div className="clip-diagonal absolute inset-0">
                <SmartImage
                  src={s.image}
                  alt={`${s.titleLine1} ${s.titleLine2}`}
                  fill
                  priority={i === 0}
                  sizes="56vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text */}
            <Container className="relative z-10 flex h-full flex-col justify-center py-12">
              <div className="md:max-w-[46%]">
                <p className="text-xl font-semibold tracking-wide text-brand-800 md:text-2xl">{s.eyebrow}</p>
                <h1 className="mt-3">
                  <span className="block text-2xl font-bold text-brand-800 md:text-4xl">{s.titleLine1}</span>
                  <span className="block text-5xl font-extrabold tracking-tight text-brand-500 md:text-6xl lg:text-7xl">
                    {s.titleLine2}
                  </span>
                </h1>
                <p className="mt-4 whitespace-pre-line font-script text-2xl leading-snug text-brand-800 md:text-3xl">
                  {s.tagline}
                </p>
                {s.description && (
                  <p className="mt-5 flex max-w-sm items-start gap-3 text-base text-ink">
                    <Leaf className="mt-0.5 size-6 shrink-0 fill-brand-400 text-brand-600" aria-hidden />
                    {s.description}
                  </p>
                )}
                {s.ctaLabel && (
                  <Button asChild variant="sun" size="lg" className="mt-7 w-fit">
                    <a href={s.ctaHref} tabIndex={i === index ? 0 : -1}>
                      {s.ctaLabel} <ChevronRight />
                    </a>
                  </Button>
                )}
              </div>
            </Container>
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Slide trước"
            className="absolute left-3 top-1/2 z-20 hidden md:grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-800 shadow-soft transition hover:bg-white"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Slide tiếp theo"
            className="absolute right-3 top-1/2 z-20 hidden md:grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-800 shadow-soft transition hover:bg-white"
          >
            <ChevronRight className="size-5" />
          </button>
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full bg-white/50 px-3 py-1.5 backdrop-blur">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Đến slide ${i + 1}`}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  i === index ? "w-6 bg-brand-600" : "w-2.5 bg-white hover:bg-brand-200"
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
