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

/** Header with the logo centred between two halves of the menu (design.md §5.1). */
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

  // "Trang chủ" is the logo itself, so it is left out of the split menu.
  const links = nav.map((item) => ({ ...item, href: resolveHref(item.href) }));
  const menu = links.filter((l) => l.href !== "/");
  const half = Math.ceil(menu.length / 2);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  const navLink = (item: { href: string; label: string }) => {
    const active = isActive(item.href);
    return (
      <Link
        key={item.href + item.label}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "rounded-full px-3.5 py-2 text-[15px] transition-colors",
          active ? "bg-lime-tint font-semibold text-brand-900" : "text-ink-muted hover:text-brand-900"
        )}
      >
        {item.label}
      </Link>
    );
  };

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
          scrolled && "shadow-[0_8px_24px_-16px_rgb(20_63_27/0.22)]"
        )}
      >
        <Container className="grid h-[76px] grid-cols-[auto_1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
          {/* Left: menu button (mobile) / first half of the menu (desktop) */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="-ml-2 lg:hidden"
              aria-label={open ? "Đóng menu" : "Mở menu"}
              aria-expanded={open}
              aria-controls="menu-di-dong"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng chính">
              {menu.slice(0, half).map(navLink)}
            </nav>
          </div>

          <Link href="/" aria-label={`${site.companyPrefix} ${site.companyName} – Trang chủ`} className="justify-self-center rounded-lg">
            <Logo prefix={site.companyPrefix} name={site.companyName} slogan="" logo={site.logo} />
          </Link>

          {/* Right: second half of the menu + tools */}
          <div className="flex items-center justify-end gap-1">
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng phụ">
              {menu.slice(half).map(navLink)}
            </nav>
            <Button asChild variant="ghost" size="icon" aria-label="Tìm kiếm" className="lg:ml-2">
              <Link href="/tim-kiem">
                <Search className="size-5" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label={`Gọi ${site.phone}`} className="hidden lg:inline-flex">
              <a href={`tel:${site.phone}`}>
                <Phone className="size-5" />
              </a>
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
                        active ? "bg-lime-tint text-brand-900" : "text-ink hover:bg-lime-tint"
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
