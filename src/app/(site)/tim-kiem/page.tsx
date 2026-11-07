import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/shared/container";
import { ArticleCard } from "@/components/site/article-card";
import { EmptyState } from "@/components/site/empty-state";
import { PageHero } from "@/components/site/page-hero";
import { ProductCard } from "@/components/site/product-card";
import { search } from "@/lib/mock/search";
import { cn } from "@/lib/utils";

type SP = Promise<{ q?: string; loai?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `Tìm kiếm "${q}" | Kim Ngoan` : "Tìm kiếm | Kim Ngoan", robots: { index: false } };
}

const TABS = [
  { value: "tat-ca", label: "Tất cả" },
  { value: "san-pham", label: "Sản phẩm" },
  { value: "bai-viet", label: "Bài viết" },
] as const;

const SUGGESTIONS = ["NPK", "phân hữu cơ", "sầu riêng", "cà phê", "vi sinh"];

export default async function SearchPage({ searchParams }: { searchParams: SP }) {
  const { q = "", loai = "tat-ca" } = await searchParams;
  const query = q.trim();
  const results = search(query);
  const counts = { "tat-ca": results.products.length + results.articles.length, "san-pham": results.products.length, "bai-viet": results.articles.length };
  const showProducts = loai !== "bai-viet" && results.products.length > 0;
  const showArticles = loai !== "san-pham" && results.articles.length > 0;

  return (
    <>
      <PageHero
        title="Tìm kiếm"
        description={query ? undefined : "Nhập tên sản phẩm, loại cây trồng hoặc chủ đề bạn quan tâm."}
        crumbs={[{ label: "Tìm kiếm" }]}
      />
      <Container className="py-10 md:py-14">
        <form action="/tim-kiem" role="search" className="relative mx-auto max-w-2xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-muted" aria-hidden />
          <Input
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Tìm sản phẩm, bài viết…"
            aria-label="Từ khoá tìm kiếm"
            className="h-14 rounded-full bg-white pl-12 pr-32 text-base shadow-soft"
          />
          <Button type="submit" variant="sun" className="absolute right-2 top-1/2 -translate-y-1/2">
            Tìm kiếm
          </Button>
        </form>

        {!query ? (
          <div className="mt-8 text-center">
            <p className="text-sm text-ink-muted">Gợi ý tìm kiếm:</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <Link key={s} href={`/tim-kiem?q=${encodeURIComponent(s)}`} className="rounded-full border bg-white px-4 py-1.5 text-sm hover:bg-muted hover:text-brand-700">
                  {s}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <p className="text-ink-muted">
                Tìm thấy <span className="font-bold text-brand-800">{counts["tat-ca"]}</span> kết quả cho{" "}
                <span className="font-semibold text-brand-700">“{query}”</span>
              </p>
              <nav aria-label="Lọc kết quả" className="flex gap-1 rounded-2xl border bg-white p-1 shadow-xs">
                {TABS.map((t) => (
                  <Link
                    key={t.value}
                    href={`/tim-kiem?q=${encodeURIComponent(query)}&loai=${t.value}`}
                    aria-current={loai === t.value ? "page" : undefined}
                    className={cn(
                      "rounded-xl px-3 py-1.5 text-sm font-medium transition",
                      loai === t.value ? "bg-brand-600 text-white" : "text-ink-muted hover:text-brand-700"
                    )}
                  >
                    {t.label} <span className="opacity-75">({counts[t.value]})</span>
                  </Link>
                ))}
              </nav>
            </div>

            {!showProducts && !showArticles && (
              <div className="mt-8">
                <EmptyState
                  title="Không tìm thấy kết quả phù hợp"
                  description="Hãy thử từ khoá khác, kiểm tra chính tả hoặc dùng từ ngắn gọn hơn (VD: “NPK”, “cà phê”)."
                >
                  <Button asChild variant="sun">
                    <Link href="/san-pham">Xem tất cả sản phẩm</Link>
                  </Button>
                </EmptyState>
              </div>
            )}

            {showProducts && (
              <section className="mt-10">
                <h2 className="mb-5 text-xl font-bold text-brand-700">Sản phẩm ({results.products.length})</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {results.products.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              </section>
            )}

            {showArticles && (
              <section className="mt-12">
                <h2 className="mb-5 text-xl font-bold text-brand-700">Bài viết ({results.articles.length})</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {results.articles.map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </Container>
    </>
  );
}
