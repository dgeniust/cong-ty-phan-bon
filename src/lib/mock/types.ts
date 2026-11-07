/** Domain types for client pages. Mock data lives next to this file; swap for API/CMS later. */

export type Category = {
  slug: string;
  name: string;
  description: string;
  parent?: string; // slug of parent group
};

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  shortDescription: string;
  images: string[];
  sku: string;
  packing: string[];
  origin: string;
  ingredients: { name: string; value: string }[];
  uses: string[];
  usage: string[];
  crops: string[];
  description: string[];
  featured?: boolean;
  isNew?: boolean;
};

export type ArticleSection = "gioi-thieu" | "dich-vu" | "tin-tuc";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "img"; src: string; caption?: string };

export type Article = {
  slug: string;
  section: ArticleSection;
  title: string;
  excerpt: string;
  cover: string;
  date: string; // ISO
  author: string;
  readingMinutes: number;
  tags: string[];
  content: ArticleBlock[];
};
