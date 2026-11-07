import Link from "next/link";
import { Container } from "@/components/shared/container";
import { articleSections, getArticles } from "@/lib/mock/articles";
import type { ArticleSection } from "@/lib/mock/types";
import { cn } from "@/lib/utils";
import { ArticleCard } from "./article-card";
import { EmptyState } from "./empty-state";
import { PageHero } from "./page-hero";
import { Pagination, paginate } from "./pagination";

const PER_PAGE = 7; // 1 featured + 6

export function ArticleListPage({ section, page: pageParam }: { section: ArticleSection; page?: string }) {
  const meta = articleSections[section];
  const all = getArticles(section);
  const { items, page, totalPages } = paginate(all, Number(pageParam) || 1, PER_PAGE);
  const [first, ...rest] = items;

  return (
    <>
      <PageHero title={meta.title} description={meta.description} crumbs={[{ label: meta.title }]} />
      <Container className="py-10 md:py-14">
        <nav aria-label="Chuyên mục" className="mb-8 flex flex-wrap gap-2">
          {(Object.keys(articleSections) as ArticleSection[]).map((s) => (
            <Link
              key={s}
              href={`/${s}`}
              aria-current={s === section ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                s === section ? "bg-brand-600 text-white" : "border bg-white text-ink hover:bg-muted hover:text-brand-700"
              )}
            >
              {articleSections[s].title}
            </Link>
          ))}
        </nav>

        {first ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ArticleCard article={first} featured={page === 1} />
            {rest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <EmptyState title="Chưa có bài viết" description="Chuyên mục đang được cập nhật, vui lòng quay lại sau." />
        )}
        <Pagination page={page} totalPages={totalPages} basePath={`/${section}`} />
      </Container>
    </>
  );
}
