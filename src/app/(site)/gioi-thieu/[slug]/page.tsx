import type { Metadata } from "next";
import { ArticleDetailPage } from "@/components/site/article-detail-page";
import { getArticle, getArticles } from "@/lib/mock/articles";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getArticles("gioi-thieu").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const a = getArticle("gioi-thieu", (await params).slug);
  if (!a) return {};
  const url = `/gioi-thieu/${a.slug}`;
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: a.title, description: a.excerpt, images: [a.cover], publishedTime: a.date, authors: [a.author] },
  };
}

export default async function Page({ params }: { params: Params }) {
  return <ArticleDetailPage section="gioi-thieu" slug={(await params).slug} />;
}
