import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Podium, RoundStamp, Sparkle } from "@/components/shared/la-non";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import type { Product } from "@/lib/mock/types";
import { resolveHref } from "@/lib/site";
import { sentenceCase, titleCase } from "@/lib/text";
import { HeroSearch } from "./hero-search";

type Props = {
  hero: SiteContent["hero"];
  site: SiteContent["site"];
  bagImage: string;
  crop?: SiteContent["crops"]["items"][number];
  spotlight?: Product;
};

/** "10+" -> ["10", "+"], "5.000+" -> ["5.000", "+"] so the symbol can be styled small. */
const splitStat = (v: string) => {
  const m = v.match(/^([\d.,]+)(.*)$/);
  return m ? [m[1], m[2]] : [v, ""];
};

/** Pill CTA with the arrow-in-a-circle of the reference. */
export function ArrowPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex h-12 items-center gap-3 rounded-full bg-brand-500 pl-6 pr-1.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-600 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
    >
      {children}
      <span className="grid size-9 place-items-center rounded-full bg-white text-brand-700 transition-transform duration-200 group-hover:rotate-45">
        <ArrowUpRight className="size-4" aria-hidden />
      </span>
    </Link>
  );
}

/** Three zones: message | product on podium | crop + spotlight card (design.md §5.2). */
export function Hero({ hero, site, bagImage, crop, spotlight }: Props) {
  const [main, second] = hero.slides;
  const lead = second ?? main;
  const stats = hero.stats.slice(0, 3);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-white pb-16 pt-8 md:pb-20 md:pt-12">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr_0.6fr] lg:gap-8 xl:gap-12">
        {/* Message */}
        <div>
          <h1 id="hero-title" className="serif-title text-[2.5rem] text-brand-900 sm:text-[3.25rem] xl:text-[3.75rem]">
            {sentenceCase(lead.titleLine1 || "Mùa màng")}{" "}
            <span className="font-bold uppercase text-brand-500">{lead.titleLine2 || "bội thu"}</span>
            <br />
            <span className="whitespace-nowrap">cùng {titleCase(site.companyName)}</span>
          </h1>
          {main.description && (
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted md:text-[17px]">{main.description.replace(/\.?$/, ".")}</p>
          )}
          <div className="mt-7">
            <HeroSearch />
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ArrowPill href={resolveHref(main.ctaHref || "/san-pham")}>{main.ctaLabel || "Xem sản phẩm"}</ArrowPill>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-brand-900 hover:text-brand-600"
            >
              <Phone className="size-4" aria-hidden />
              {site.phone}
            </a>
          </div>

          {stats.length > 0 && (
            <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
              {stats.map((s, i) => {
                const [num, sym] = splitStat(s.value);
                return (
                  <div key={i} className="flex flex-col">
                    <dt className="order-2 mt-1 max-w-[10rem] text-[13px] leading-snug text-ink-muted">{s.label}</dt>
                    <dd className="order-1 font-serif text-[2.25rem] font-medium leading-none text-brand-900 md:text-[2.5rem]">
                      {num}
                      {sym && <span className="ml-0.5 align-super text-lg text-sun-500">{sym}</span>}
                    </dd>
                  </div>
                );
              })}
            </dl>
          )}
        </div>

        {/* Product on podium */}
        <div className="relative mx-auto w-full max-w-md">
          <Sparkle className="absolute right-6 top-2 size-5" />
          {/* blend mode on the wrapper (the stacking context), so white packshot backgrounds drop out over the podium */}
          <div className="relative z-10 mx-auto -mb-[18%] aspect-square w-[78%] mix-blend-multiply">
            <SmartImage src={bagImage} alt="" fill priority sizes="(min-width: 1024px) 26vw, 70vw" className="object-contain" />
          </div>
          <Podium />
          <RoundStamp text="PHÂN BÓN CHÍNH HÃNG • KIM NGOAN • " className="absolute left-0 top-[6%] z-20 size-20 md:size-24" />
        </div>

        {/* Crop + spotlight */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
          {crop && (
            <Link href="#cay-trong" className="group flex items-center gap-4 lg:flex-col lg:text-center">
              <span className="relative block size-20 shrink-0 overflow-hidden rounded-full bg-lime-tint ring-4 ring-lime-tint lg:size-24">
                <SmartImage src={crop.image} alt="" fill sizes="96px" className="object-cover" />
              </span>
              <span className="text-[13px] leading-relaxed text-ink-muted group-hover:text-brand-800">
                Chọn đúng phân cho từng loại cây – xem gợi ý theo cây trồng
              </span>
            </Link>
          )}

          {spotlight && (
            <Link
              href={`/san-pham/${spotlight.slug}`}
              className="group block rounded-3xl bg-lime-tint p-5 transition-shadow hover:shadow-soft focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <span className="text-[12px] font-medium text-brand-600">Bán chạy</span>
              <span className="mt-1 block font-serif text-lg font-medium leading-snug text-brand-900">{spotlight.name}</span>
              <span className="relative mt-3 block aspect-[4/3] overflow-hidden rounded-2xl bg-white">
                <SmartImage src={spotlight.images[0]} alt="" fill sizes="220px" className="object-cover" />
              </span>
              <span className="mt-3 block text-[13px] text-ink-muted">Quy cách: {spotlight.packing.join(", ")}</span>
              <span className="mt-1 block font-serif text-xl font-medium text-brand-600 group-hover:text-brand-700">Liên hệ báo giá</span>
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
