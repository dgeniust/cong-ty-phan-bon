import type { MetadataRoute } from "next";
import { articles } from "@/lib/mock/articles";
import { categories } from "@/lib/mock/categories";
import { products } from "@/lib/mock/products";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/san-pham"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/dich-vu"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/tin-tuc"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/gioi-thieu"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/lien-he"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];
  return [
    ...statics,
    ...categories.map((c) => ({
      url: absoluteUrl(`/danh-muc/${c.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: c.parent ? 0.7 : 0.8,
    })),
    ...products.map((p) => ({
      url: absoluteUrl(`/san-pham/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: absoluteUrl(`/${a.section}/${a.slug}`),
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
