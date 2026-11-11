import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import type { SiteContent } from "@/lib/content/schema";

/** Closing call-to-action band. */
export function ContactBar({ site, contact }: { site: SiteContent["site"]; contact: SiteContent["contact"] }) {
  return (
    <section id="lien-he" aria-labelledby="lien-he-title" className="pb-20 md:pb-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-900 px-7 py-12 md:px-14 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand-700/40 blur-2xl"
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 id="lien-he-title" className="text-[1.75rem] font-bold leading-tight tracking-tight text-white md:text-[2.5rem]">
                {contact.title}
              </h2>
              {contact.subtitle && <p className="mt-3 text-lg text-white/75">{contact.subtitle}</p>}
              <p className="mt-6 flex items-start gap-2.5 text-[15px] text-white/70">
                <MapPin className="mt-0.5 size-[18px] shrink-0 text-sun-300" aria-hidden />
                <span>
                  <span className="sr-only">{contact.addressLabel}: </span>
                  {site.address}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <Button asChild variant="sun" size="lg" className="h-14 px-8 text-lg">
                <a href={`tel:${site.phone}`}>
                  <Phone className="size-5" />
                  <span className="tabular-nums">{site.phone}</span>
                </a>
              </Button>
              <Button asChild size="lg" className="h-14 bg-white/10 px-8 text-white hover:bg-white/15">
                <Link href="/lien-he">Gửi yêu cầu tư vấn</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
