"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Phone, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import { resolveHref } from "@/lib/site";
import { cn } from "@/lib/utils";

const INTERVAL = 6500;

export function HeroCarousel({ hero, phone }: { hero: SiteContent["hero"]; phone?: string }) {
  const { slides, autoplay } = hero;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const count = slides.length;

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    if (!autoplay || stopped || hovered || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), INTERVAL);
    return () => clearInterval(t);
  }, [autoplay, stopped, hovered, count, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Giới thiệu Kim Ngoan"
      className="relative isolate overflow-hidden bg-brand-950"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <div className="relative min-h-[600px] md:min-h-[640px] lg:min-h-[700px]">
        {slides.map((s, i) => {
          const active = i === index;
          // The page's h1 lives outside the carousel (hidden slides are inert);
          // slide titles are presentational display text.
          const Title = "p";
          return (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}`}
              aria-hidden={!active}
              inert={!active}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-out",
                active ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <SmartImage
                src={s.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className={cn(
                  "object-cover transition-transform duration-[7000ms] ease-out",
                  active ? "scale-100" : "scale-105"
                )}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/65 to-brand-950/10"
              />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-950/60 to-transparent" />

              <Container className="relative flex h-full items-center pb-40 pt-14 md:pb-44">
                <div className="max-w-xl text-white">
                  {s.eyebrow && <p className="text-[15px] font-medium text-sun-200">{s.eyebrow}</p>}
                  <Title className="mt-4 text-white">
                    {s.titleLine1 && (
                      <span className="block text-xl font-semibold text-white/85 md:text-2xl">{s.titleLine1}</span>
                    )}
                    <span className="mt-1 block text-[3.25rem] font-bold leading-[1.02] tracking-tight md:text-7xl lg:text-[5.5rem]">
                      {s.titleLine2}
                    </span>
                  </Title>
                  {s.tagline && (
                    <p className="mt-6 whitespace-pre-line font-script text-[1.75rem] leading-snug text-sun-200 md:text-[2rem]">
                      {s.tagline}
                    </p>
                  )}
                  {s.description && <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 md:text-lg">{s.description}</p>}
                  <div className="mt-9 flex flex-wrap items-center gap-3">
                    {s.ctaLabel && (
                      <Button asChild variant="sun" size="lg">
                        <Link href={resolveHref(s.ctaHref)}>{s.ctaLabel}</Link>
                      </Button>
                    )}
                    {phone && (
                      <Button asChild size="lg" className="bg-white/10 text-white backdrop-blur hover:bg-white/20">
                        <a href={`tel:${phone}`}>
                          <Phone /> {phone}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Container>
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <Container className="absolute inset-x-0 bottom-[84px] z-10 flex items-center gap-4 md:bottom-[96px]">
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Đến slide ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className="group grid h-8 place-items-center rounded-full px-1"
              >
                <span
                  className={cn(
                    "block h-1 rounded-full transition-all duration-300",
                    i === index ? "w-10 bg-sun-300" : "w-5 bg-white/40 group-hover:bg-white/70"
                  )}
                />
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1">
            {autoplay && (
              <button
                type="button"
                onClick={() => setStopped((v) => !v)}
                aria-label={stopped ? "Tiếp tục tự chuyển slide" : "Tạm dừng tự chuyển slide"}
                className="grid size-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {stopped ? <Play className="size-4" /> : <Pause className="size-4" />}
              </button>
            )}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Slide trước"
              className="grid size-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Slide tiếp theo"
              className="grid size-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </Container>
      )}
    </section>
  );
}
