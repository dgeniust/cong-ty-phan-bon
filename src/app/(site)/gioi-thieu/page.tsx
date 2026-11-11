import type { Metadata } from "next";
import { ArticleListPage } from "@/components/site/article-list-page";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Câu chuyện, sứ mệnh và đội ngũ kỹ thuật của Công ty TNHH Kim Ngoan.",
  alternates: { canonical: "/gioi-thieu" },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return <ArticleListPage section="gioi-thieu" page={(await searchParams).page} />;
}
