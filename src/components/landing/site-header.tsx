"use client";

import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import type { SiteContent } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

export function SiteHeader({ site, nav }: Pick<SiteContent, "site" | "nav" >) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(nav[0]?.href);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/95 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-6">
        <a href="#trang-chu" aria-label={site.companyName}>
          <Logo prefix={site.companyPrefix} name={site.companyName} slogan={site.slogan} logo={site.logo} />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Chính">
          {nav.map((item) => (
            <a
              key={item.href + item.label}
              href={item.href}
              onClick={() => setActive(item.href)}
              className={cn(
                "relative py-2 text-sm font-medium transition-colors hover:text-brand-600",
                "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-1 after:rounded-full after:bg-sun-300 after:transition-transform after:duration-300",
                active === item.href ? "text-brand-600 after:scale-x-100" : "text-ink after:scale-x-0"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="sun" className="hidden sm:inline-flex">
            <a href={`tel:${site.phone}`}>
              <Phone className="size-4 fill-brand-700" />
              <span className="text-base font-bold">{site.phone}</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Mở menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-border bg-white lg:hidden">
          <Container className="flex flex-col py-3">
            {nav.map((item) => (
              <a
                key={item.href + item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-ink hover:bg-muted hover:text-brand-700"
              >
                {item.label}
              </a>
            ))}
            <Button asChild variant="sun" className="mt-2 sm:hidden">
              <a href={`tel:${site.phone}`}>
                <Phone className="size-4" /> {site.phone}
              </a>
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
