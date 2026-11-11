import type { Metadata } from "next";
import { ArticleDetailPage } from "@/components/site/article-detail-page";
import { getArticle, getArticles } from "@/lib/mock/articles";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getArticles("tin-tuc").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const a = getArticle("tin-tuc", (await params).slug);
  if (!a) return {};
  const url = `/tin-tuc/${a.slug}`;
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: a.title, description: a.excerpt, images: [a.cover], publishedTime: a.date, authors: [a.author] },
  };
}

export default async function Page({ params }: { params: Params }) {
  return <ArticleDetailPage section="tin-tuc" slug={(await params).slug} />;
}
