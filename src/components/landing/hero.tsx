import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import { resolveHref } from "@/lib/site";
import { sentenceCase, titleCase } from "@/lib/text";
import { HeroSearch } from "./hero-search";

/**
 * Oversized serif headline + full-bleed photo band (design.md §5.2).
 * The brand name is painted white on the band; the real h1 carries the full text.
 */
export function Hero({ hero, site }: { hero: SiteContent["hero"]; site: SiteContent["site"] }) {
  const [main, second] = hero.slides;
  const lead = sentenceCase(main.eyebrow || "Đại lý phân bón");
  const brand = titleCase(site.companyName);
  const band = second?.image || main.image;

  return (
    <section aria-labelledby="hero-title" className="bg-white">
      <Container className="grid items-end gap-10 pb-10 pt-10 md:pt-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:pb-12">
        <h1
          id="hero-title"
          className="serif-caps text-[3.25rem] leading-[1.08] tracking-[-0.01em] sm:text-7xl lg:text-[6.25rem] xl:text-[7rem]"
        >
          {lead}
          <span className="sr-only"> {brand}</span>
        </h1>

        <div className="max-w-md lg:pb-3">
          {main.description && (
            <p className="text-base leading-relaxed text-ink-muted md:text-[17px]">{main.description.replace(/\.?$/, ".")}</p>
          )}
          <div className="mt-6">
            <HeroSearch />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button asChild variant="sun" size="lg">
              <Link href={resolveHref(main.ctaHref || "/san-pham")}>{main.ctaLabel || "Xem sản phẩm"}</Link>
            </Button>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-brand-900 hover:text-brand-700"
            >
              <Phone className="size-4" aria-hidden />
              {site.phone}
            </a>
          </div>
        </div>
      </Container>

      {/* Full-bleed band with the brand name painted on its top edge */}
      <div className="relative h-[300px] overflow-hidden bg-brand-900 sm:h-[380px] md:h-[460px] lg:h-[540px]">
        <SmartImage src={band} alt="" fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-brand-950/70 via-brand-950/15 to-transparent" />
        <Container className="relative pt-3 md:pt-4">
          <p aria-hidden className="serif-caps text-[3.25rem] leading-none text-white sm:text-7xl lg:text-[6.25rem] xl:text-[7rem]">
            {brand}
          </p>
        </Container>
      </div>
    </section>
  );
}
