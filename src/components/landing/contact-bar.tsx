import { MapPin, Phone, PhoneCall } from "lucide-react";
import { Container } from "@/components/shared/container";
import { LeafDecor } from "@/components/shared/leaf-decor";
import type { SiteContent } from "@/lib/content/schema";

export function ContactBar({ site, contact }: { site: SiteContent["site"]; contact: SiteContent["contact"] }) {
  return (
    <section
      id="lien-he"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-r from-brand-50 via-sun-100 to-brand-50 py-8"
    >
      <LeafDecor className="absolute -left-2 top-1/2 hidden w-20 -translate-y-1/2 text-brand-400/70 md:block" />
      <LeafDecor flip className="absolute -right-2 top-1/2 hidden w-20 -translate-y-1/2 text-brand-400/70 md:block" />
      <Container className="grid items-center gap-6 md:grid-cols-3 md:divide-x md:divide-brand-200">
        <div className="flex items-center justify-center gap-3">
          <span className="grid size-12 place-items-center rounded-full bg-brand-700 text-white">
            <PhoneCall className="size-6" aria-hidden />
          </span>
          <div>
            <p className="text-lg font-bold uppercase text-brand-800">{contact.title}</p>
            <p className="text-sm text-ink-muted">{contact.subtitle}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <a
            href={`tel:${site.phone}`}
            className="inline-flex items-center gap-3 rounded-full bg-sun-200 px-8 py-3 text-2xl font-extrabold text-brand-800 shadow-soft transition hover:bg-sun-300 hover:shadow-lift md:text-3xl"
          >
            <Phone className="size-7 fill-brand-700" aria-hidden />
            {site.phone}
          </a>
        </div>
        <div className="flex items-center justify-center gap-3">
          <MapPin className="size-8 fill-brand-700 text-white" aria-hidden />
          <div>
            <p className="font-bold text-brand-800">{contact.addressLabel}</p>
            <p className="text-sm text-ink-muted">{site.address}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
