import type { Metadata } from "next";
import { ArticleDetailPage } from "@/components/site/article-detail-page";
import { getArticle, getArticles } from "@/lib/mock/articles";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getArticles("tin-tuc").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const a = getArticle("tin-tuc", (await params).slug);
  return a ? { title: `${a.title} | Kim Ngoan`, description: a.excerpt } : {};
}

export default async function Page({ params }: { params: Params }) {
  return <ArticleDetailPage section="tin-tuc" slug={(await params).slug} />;
}
