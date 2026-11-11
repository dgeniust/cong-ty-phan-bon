"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import type { SiteContent } from "@/lib/content/schema";
import { resolveHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader({ site, nav }: Pick<SiteContent, "site" | "nav">) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open; close it with Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = nav.map((item) => ({ ...item, href: resolveHref(item.href) }));
  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <>
      <a
        href="#noi-dung"
        className="sr-only z-[60] rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Bỏ qua đến nội dung chính
      </a>
      <header
        className={cn(
          "sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300",
          scrolled && "shadow-[0_1px_0_rgb(20_63_27/0.06),0_8px_24px_-16px_rgb(20_63_27/0.18)]",
        )}
      >
        <Container className="flex h-[76px] items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.companyPrefix} ${site.companyName} – Trang chủ`} className="shrink-0 rounded-lg">
            <Logo prefix={site.companyPrefix} name={site.companyName} slogan={site.slogan} logo={site.logo} compact />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng chính">
            {links.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-md px-3.5 py-2 text-[15px] font-medium transition-colors",
                    active ? "text-brand-600" : "text-ink-muted hover:text-brand-900",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3.5 -bottom-0.5 h-[3px] rounded-full bg-sun-400 transition-opacity",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <Button asChild variant="ghost" size="icon" aria-label="Tìm kiếm">
              <Link href="/tim-kiem">
                <Search className="size-5" />
              </Link>
            </Button>
            <a
              href={`tel:${site.phone}`}
              aria-label={`Gọi ${site.phone}`}
              className="hidden items-center gap-2 px-3 text-[15px] font-semibold tabular-nums text-brand-900 hover:text-brand-700 xl:inline-flex"
            >
              <Phone className="size-4" />
              {site.phone}
            </a>
            <Button asChild className="hidden lg:inline-flex">
              <Link href="/lien-he">Liên hệ</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={open ? "Đóng menu" : "Mở menu"}
              aria-expanded={open}
              aria-controls="menu-di-dong"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </Container>

        {open && (
          <div id="menu-di-dong" className="fixed inset-x-0 bottom-0 top-[76px] overflow-y-auto bg-white lg:hidden">
            <Container className="flex flex-col py-6">
              <nav aria-label="Điều hướng di động" className="flex flex-col">
                {links.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href + item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-xl px-4 py-4 text-lg font-medium transition-colors",
                        active ? "bg-surface text-brand-900" : "text-ink hover:bg-surface",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <Button asChild variant="sun" size="lg" className="mt-6">
                <a href={`tel:${site.phone}`}>
                  <Phone /> Gọi {site.phone}
                </a>
              </Button>
            </Container>
          </div>
        )}
      </header>
    </>
  );
}
