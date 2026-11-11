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
      <PageHero title={meta.title} description={meta.description} crumbs={[{ label: meta.title }]}>
        <nav aria-label="Chuyên mục" className="mt-8 flex flex-wrap gap-2">
          {(Object.keys(articleSections) as ArticleSection[]).map((s) => (
            <Link
              key={s}
              href={`/${s}`}
              aria-current={s === section ? "page" : undefined}
              className={cn(
                "inline-flex h-10 items-center rounded-full px-5 text-sm font-medium transition-colors",
                s === section ? "bg-brand-800 text-white" : "bg-white text-ink hover:text-brand-900 hover:shadow-soft"
              )}
            >
              {articleSections[s].title}
            </Link>
          ))}
        </nav>
      </PageHero>

      <Container className="py-14 md:py-20">
        {first ? (
          <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            <ArticleCard article={first} featured={page === 1} headingLevel="h2" />
            {rest.map((a) => (
              <ArticleCard key={a.slug} article={a} headingLevel="h2" />
            ))}
          </div>
        ) : (
          <EmptyState title="Chuyên mục chưa có bài viết" description="Bài viết mới sẽ sớm được đăng. Trong lúc chờ, bạn có thể xem các chuyên mục khác." />
        )}
        <Pagination page={page} totalPages={totalPages} basePath={`/${section}`} />
      </Container>
    </>
  );
}
