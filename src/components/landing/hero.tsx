import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { LeafScatter } from "@/components/shared/line-art";
import type { SiteContent } from "@/lib/content/schema";
import { resolveHref } from "@/lib/site";
import { HeroCollage } from "./hero-collage";
import { HeroSearch } from "./hero-search";

type Props = {
  hero: SiteContent["hero"];
  site: SiteContent["site"];
  bagImage: string;
};

/** Text left, cut-out collage right (design.md §5.2). Static – no carousel. */
export function Hero({ hero, site, bagImage }: Props) {
  const [main, second] = hero.slides;
  const headline = main.tagline || `${main.titleLine1} ${main.titleLine2}`;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-8 md:pb-24 md:pt-12">
      <LeafScatter />
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="max-w-xl">
          <p className="tagline">{site.slogan}</p>
          <h1 id="hero-title" className="display mt-5 whitespace-pre-line text-[2.25rem] md:text-5xl xl:text-[3.5rem]">
            {headline}
          </h1>
          {main.description && <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted md:text-[17px]">{main.description}</p>}

          <div className="mt-8">
            <HeroSearch />
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button asChild size="lg">
              <Link href={resolveHref(main.ctaHref || "/san-pham")}>{main.ctaLabel || "Chọn phân bón cho vườn"}</Link>
            </Button>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex min-h-11 items-center gap-2.5 text-[15px] font-semibold text-brand-900 underline decoration-sun-400 decoration-2 underline-offset-[6px] hover:text-brand-700"
            >
              <Phone className="size-4" aria-hidden />
              Gọi {site.phone}
            </a>
          </div>
        </div>

        <HeroCollage bagImage={bagImage} plantImage={second?.image ?? main.image} />
      </Container>
    </section>
  );
}
