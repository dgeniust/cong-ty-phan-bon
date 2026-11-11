import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import type { SiteContent } from "@/lib/content/schema";
import { categories } from "@/lib/mock/categories";
import { resolveHref } from "@/lib/site";

const FOOTER_CATEGORIES = categories.filter((c) => c.parent).slice(0, 6);

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[15px] font-semibold text-white">{children}</h2>;
}

const linkCls = "text-[15px] text-white/70 transition-colors hover:text-white";

export function SiteFooter({ site, footer }: { site: SiteContent["site"]; footer: SiteContent["footer"] }) {
  return (
    <footer className="bg-brand-900 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Thông tin {site.companyPrefix} {site.companyName}
      </h2>

      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-10 lg:py-20">
        <div className="max-w-sm">
          <Logo prefix={site.companyPrefix} name={site.companyName} slogan="" logo={site.logo} inverted />
          <p className="mt-6 text-[15px] leading-relaxed text-white/70">{site.seoDescription}</p>
          <p className="mt-6 font-script text-2xl leading-snug text-sun-200">
            {footer.sloganLine1}
            <br />
            {footer.sloganLine2}
          </p>
        </div>

        <nav aria-label="Danh mục sản phẩm">
          <FooterHeading>Sản phẩm</FooterHeading>
          <ul className="mt-5 space-y-3">
            {FOOTER_CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/danh-muc/${c.slug}`} className={linkCls}>
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/san-pham" className={linkCls}>
                Tất cả sản phẩm
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Liên kết">
          <FooterHeading>Kim Ngoan</FooterHeading>
          <ul className="mt-5 space-y-3">
            {footer.links.map((l, i) => (
              <li key={i}>
                <Link href={resolveHref(l.href)} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <FooterHeading>Liên hệ</FooterHeading>
          <address className="mt-5 space-y-4 not-italic">
            <p className="flex gap-3 text-[15px] text-white/70">
              <MapPin className="mt-0.5 size-[18px] shrink-0 text-sun-300" aria-hidden />
              {site.address}
            </p>
            <p className="flex gap-3">
              <Phone className="mt-0.5 size-[18px] shrink-0 text-sun-300" aria-hidden />
              <a href={`tel:${site.phone}`} className="text-[15px] font-semibold tabular-nums text-white hover:text-sun-200">
                {site.phone}
              </a>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-0.5 size-[18px] shrink-0 text-sun-300" aria-hidden />
              <a href={`mailto:${site.email}`} className={linkCls}>
                {site.email}
              </a>
            </p>
            <p className="flex gap-3 text-[15px] text-white/70">
              <Clock className="mt-0.5 size-[18px] shrink-0 text-sun-300" aria-hidden />
              Thứ 2 – Chủ nhật, 7:00 – 18:00
            </p>
          </address>
          {site.facebook && (
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
              </svg>
              Theo dõi trên Facebook
            </a>
          )}
        </div>
      </Container>

      <div className="bg-brand-950">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-[13px] text-white/55 sm:flex-row">
          <p>{footer.copyright}</p>
          <p>{site.slogan}</p>
        </Container>
      </div>
    </footer>
  );
}
