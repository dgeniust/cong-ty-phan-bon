import { z } from "zod";

const text = z.string().trim();
const link = z.object({ label: text.min(1), href: text.min(1) });

export const heroSlideSchema = z.object({
  eyebrow: text,
  titleLine1: text,
  titleLine2: text,
  tagline: text,
  description: text,
  ctaLabel: text,
  ctaHref: text,
  image: text.min(1),
});

export const siteContentSchema = z.object({
  site: z.object({
    companyPrefix: text,
    companyName: text.min(1),
    slogan: text,
    logo: text, // empty string => default leaf logo
    phone: text,
    email: text,
    address: text,
    facebook: text,
    seoTitle: text,
    seoDescription: text,
  }),
  nav: z.array(link),
  hero: z.object({ autoplay: z.boolean(), slides: z.array(heroSlideSchema).min(1) }),
  features: z.array(z.object({ icon: text, title: text, description: text })),
  products: z.object({
    title: text,
    subtitle: text,
    items: z.array(
      z.object({
        title: text,
        bullets: z.array(text),
        image: text,
        ctaLabel: text,
        ctaHref: text,
      })
    ),
  }),
  crops: z.object({
    title: text,
    subtitle: text,
    items: z.array(z.object({ name: text, description: text, image: text })),
  }),
  about: z.object({
    title: text,
    quote: text,
    image: text,
    paragraphs: z.array(text),
    ctaLabel: text,
    ctaHref: text,
    highlights: z.array(z.object({ icon: text, title: text })),
  }),
  contact: z.object({ title: text, subtitle: text, addressLabel: text }),
  footer: z.object({ sloganLine1: text, sloganLine2: text, copyright: text, links: z.array(link) }),
});

export type SiteContent = z.infer<typeof siteContentSchema>;
export type HeroSlide = z.infer<typeof heroSlideSchema>;
