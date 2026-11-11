import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArchFrame } from "@/components/shared/arch-frame";
import { Container } from "@/components/shared/container";
import { Doodle } from "@/components/shared/doodle";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import { resolveHref } from "@/lib/site";
import { cropQuery, sentenceCase, titleCase } from "@/lib/text";
import { HeroSearch } from "./hero-search";

type Props = {
  hero: SiteContent["hero"];
  site: SiteContent["site"];
  crops: SiteContent["crops"]["items"];
};

/**
 * Static three-column hero (design.md §5.2). No auto-rotating carousel:
 * slide 1 fills the large arch, slide 2 (if any) the small arch on the right.
 */
export function Hero({ hero, site, crops }: Props) {
  const [main, second] = hero.slides;
  const stats = hero.stats.slice(0, 3);
  const headline = main.tagline || `${main.titleLine1} ${main.titleLine2}`;
  const ctaHref = resolveHref(main.ctaHref || "/san-pham");

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-14">
      <Container className="grid items-start gap-12 lg:grid-cols-[1.35fr_1fr_0.72fr] lg:gap-10 xl:gap-14">
        {/* Left – message, search, proof */}
        <div className="relative lg:pt-6">
          <h1 id="hero-title">
            <span className="block text-[15px] font-medium text-brand-600">
              {sentenceCase(main.eyebrow || "Đại lý phân bón")} {titleCase(site.companyName)}
            </span>
            <span className="display mt-4 block whitespace-pre-line text-[2.375rem] md:text-5xl xl:text-[3.5rem]">{headline}</span>
          </h1>
          {main.description && <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted md:text-[17px]">{main.description}</p>}

          <div className="mt-8">
            <HeroSearch />
          </div>

          {stats.length > 0 && (
            <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <dt className="order-2 mt-1 max-w-[11rem] text-[13px] leading-snug text-ink-muted">{s.label}</dt>
                  <dd className="display order-1 text-[2.25rem] tabular-nums md:text-5xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <Doodle name="spark" className="absolute bottom-2 right-6 w-9 text-brand-500" />
        </div>

        {/* Centre – the signature arch */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <ArchFrame src={main.image} alt={`${main.titleLine1} ${main.titleLine2}`.trim()} priority sizes="(min-width: 1024px) 30vw, 90vw" aspect="aspect-[3/4]">
            <Link
              href={ctaHref}
              className="absolute -right-3 top-[38%] grid size-28 place-items-center rounded-full bg-brand-900 text-center text-[13px] font-medium leading-tight text-white shadow-lift transition-transform duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 md:-right-6"
            >
              <span>
                {main.ctaLabel || "Xem sản phẩm"}
                <ArrowUpRight className="mx-auto mt-1 size-4" aria-hidden />
              </span>
            </Link>
          </ArchFrame>
        </div>

        {/* Right – second visual, direct contact, shop by crop */}
        <div className="flex flex-col gap-10 lg:pt-2">
          {second && (
            <Link href={resolveHref(second.ctaHref || "/lien-he")} className="group hidden w-40 lg:block xl:w-44">
              <ArchFrame src={second.image} alt="" sizes="180px" aspect="aspect-[4/5]" tone="sage" />
              <span className="mt-3 block text-[13px] font-medium leading-snug text-brand-900 group-hover:text-brand-700">
                {sentenceCase(`${second.titleLine1} ${second.titleLine2}`)}
              </span>
            </Link>
          )}

          <div>
            <p className="text-[15px] text-ink-muted">Đặt hàng & tư vấn miễn phí</p>
            <a href={`tel:${site.phone}`} className="display mt-1 block text-[2rem] tabular-nums hover:text-brand-700 md:text-[2.5rem]">
              {site.phone}
            </a>
            <Button asChild variant="sun" size="lg" className="mt-5">
              <a href={`tel:${site.phone}`}>
                <Phone /> Gọi đặt hàng
              </a>
            </Button>
          </div>

          {crops.length > 0 && (
            <nav aria-label="Tìm theo cây trồng">
              <p className="text-[15px] font-medium text-brand-900">Bạn trồng cây gì?</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {crops.slice(0, 5).map((c) => (
                  <li key={c.name}>
                    <Link
                      href={`/tim-kiem?q=${encodeURIComponent(cropQuery(c.name))}`}
                      title={c.name}
                      className="group relative block size-11 overflow-hidden rounded-full bg-brand-100 ring-2 ring-white transition-transform hover:-translate-y-0.5 focus-visible:ring-brand-500"
                    >
                      <SmartImage src={c.image} alt={c.name} fill sizes="44px" className="object-cover" />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[13px] text-ink-subtle">Chạm vào ảnh để xem sản phẩm phù hợp</p>
            </nav>
          )}
        </div>
      </Container>
    </section>
  );
}
