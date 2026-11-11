import type { Metadata } from "next";
import { ArticleListPage } from "@/components/site/article-list-page";

export const metadata: Metadata = {
  title: "Tin tức & kiến thức canh tác",
  description: "Kỹ thuật bón phân, phòng trừ sâu bệnh cho cà phê, sầu riêng, tiêu, lúa và tin tức mới từ Kim Ngoan.",
  alternates: { canonical: "/tin-tuc" },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return <ArticleListPage section="tin-tuc" page={(await searchParams).page} />;
}
