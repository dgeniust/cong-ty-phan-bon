import type { Metadata } from "next";
import { ArticleListPage } from "@/components/site/article-list-page";

export const metadata: Metadata = { title: "Dịch vụ | Kim Ngoan" };

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return <ArticleListPage section="dich-vu" page={(await searchParams).page} />;
}
