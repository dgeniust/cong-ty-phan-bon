import { articles } from "./articles";
import { getCategory } from "./categories";
import { products } from "./products";

/** Lowercase + strip Vietnamese diacritics so "phan bon" matches "Phân bón". */
export function normalize(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "d").toLowerCase().trim();
}

export function search(query: string) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return { products: [], articles: [] };
  const match = (haystack: string) => {
    const h = normalize(haystack);
    return terms.every((t) => h.includes(t));
  };
  return {
    products: products.filter((p) =>
      match([p.name, p.shortDescription, getCategory(p.categorySlug)?.name, ...p.crops].join(" "))
    ),
    articles: articles.filter((a) => match([a.title, a.excerpt, ...a.tags].join(" "))),
  };
}
