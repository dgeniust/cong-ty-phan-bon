import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import type { SiteContent } from "@/lib/content/schema";

export function SiteFooter({ site, footer }: { site: SiteContent["site"]; footer: SiteContent["footer"] }) {
  return (
    <footer className="bg-brand-800 text-white">
      <Container className="grid items-center gap-8 py-10 md:grid-cols-[1.2fr_1fr_1fr_auto]">
        <Logo prefix={site.companyPrefix} name={site.companyName} slogan={site.slogan} logo={site.logo} inverted />
        <ul className="space-y-2 text-sm text-white/85">
          <li className="flex items-center gap-3">
            <Phone className="size-4 text-sun-300" aria-hidden />
            <a href={`tel:${site.phone}`} className="hover:text-white">{site.phone}</a>
          </li>
          <li className="flex items-center gap-3">
            <MapPin className="size-4 text-sun-300" aria-hidden />
            {site.address}
          </li>
          <li className="flex items-center gap-3">
            <Mail className="size-4 text-sun-300" aria-hidden />
            <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
          </li>
        </ul>
        <p className="font-script text-2xl leading-tight text-white/90">
          {footer.sloganLine1}
          <br />
          <span className="pl-6">{footer.sloganLine2}</span>
        </p>
        {site.facebook && (
          <a
            href={site.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="grid size-10 place-items-center rounded-full bg-white text-brand-800 transition hover:bg-sun-200"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" /></svg>
          </a>
        )}
      </Container>
      <div className="bg-white text-ink-muted">
        <Container className="flex flex-col items-center justify-between gap-2 py-3 text-xs sm:flex-row">
          <p>{footer.copyright}</p>
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-1" aria-label="Footer">
            {footer.links.map((l, i) => (
              <a key={i} href={l.href} className="hover:text-brand-700">
                {l.label}
              </a>
            ))}
          </nav>
        </Container>
      </div>
    </footer>
  );
}
