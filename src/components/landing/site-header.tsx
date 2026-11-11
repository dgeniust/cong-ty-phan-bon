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
      {/* Floating pill bar (design.md §5.1) */}
      <header className={cn("sticky top-0 z-50 pt-3 transition-colors duration-300", scrolled ? "bg-transparent" : "bg-paper")}>
        <Container>
          <div
            className={cn(
              "flex h-16 items-center justify-between gap-4 rounded-full bg-white/95 pl-5 pr-2 backdrop-blur-md transition-shadow duration-300 md:h-[68px] md:pl-6",
              scrolled ? "shadow-lift" : "shadow-soft",
            )}
          >
            <Link href="/" aria-label={`${site.companyPrefix} ${site.companyName} – Trang chủ`} className="shrink-0 rounded-lg">
              <Logo
                prefix={site.companyPrefix}
                name={site.companyName}
                slogan=""
                logo={site.logo}
                compact
                className="[&_svg]:size-9 [&>div:first-child]:size-9"
              />
            </Link>

            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Điều hướng chính">
              {links.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                      active ? "bg-brand-50 text-brand-900" : "text-ink-muted hover:text-brand-900",
                    )}
                  >
                    {item.label}
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
              <Button asChild variant="sun" className="hidden lg:inline-flex">
                <a href={`tel:${site.phone}`} aria-label={`Gọi ${site.phone}`}>
                  <Phone className="size-4" />
                  <span className="tabular-nums">{site.phone}</span>
                </a>
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
          </div>
        </Container>

        {open && (
          <div id="menu-di-dong" className="fixed inset-x-0 bottom-0 top-[84px] overflow-y-auto bg-paper lg:hidden">
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
                        active ? "bg-white text-brand-900" : "text-ink hover:bg-white",
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
