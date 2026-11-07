import type { Metadata } from "next";
import { ArticleListPage } from "@/components/site/article-list-page";

export const metadata: Metadata = { title: "Giới thiệu | Kim Ngoan" };

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return <ArticleListPage section="gioi-thieu" page={(await searchParams).page} />;
}
