import type { Metadata } from "next";
import { ArticleListPage } from "@/components/site/article-list-page";

export const metadata: Metadata = { title: "Tin tức | Kim Ngoan" };

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return <ArticleListPage section="tin-tuc" page={(await searchParams).page} />;
}
