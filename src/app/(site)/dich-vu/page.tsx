import type { Metadata } from "next";
import { ArticleListPage } from "@/components/site/article-list-page";

export const metadata: Metadata = {
  title: "Dịch vụ",
  description: "Tư vấn kỹ thuật tại vườn và giao hàng tận nơi khu vực Đồng Nai – Bình Phước.",
  alternates: { canonical: "/dich-vu" },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return <ArticleListPage section="dich-vu" page={(await searchParams).page} />;
}
