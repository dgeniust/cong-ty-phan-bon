import { PackageSearch } from "lucide-react";
import { Container } from "@/components/shared/container";
import { getContent } from "@/lib/content/store";
import { categories, categoryScope } from "@/lib/mock/categories";
import { products } from "@/lib/mock/products";
import type { Product } from "@/lib/mock/types";
import type { Crumb } from "./breadcrumbs";
import { CategorySidebar } from "./category-sidebar";
import { EmptyState } from "./empty-state";
import { PageHero } from "./page-hero";
import { Pagination, paginate } from "./pagination";
import { ProductCard } from "./product-card";
import { SortSelect } from "./sort-select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PER_PAGE = 9;

function sortProducts(items: Product[], sort: string) {
  const list = [...items];
  switch (sort) {
    case "moi-nhat":
      return list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    case "ten-az":
      return list.sort((a, b) => a.name.localeCompare(b.name, "vi"));
    case "ten-za":
      return list.sort((a, b) => b.name.localeCompare(a.name, "vi"));
    default:
      return list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }
}

function countByCategory() {
  const counts: Record<string, number> = { __all: products.length };
  for (const c of categories) {
    const scope = categoryScope(c.slug);
    counts[c.slug] = products.filter((p) => scope.includes(p.categorySlug)).length;
  }
  return counts;
}

type Props = {
  title: string;
  description?: string;
  crumbs: Crumb[];
  basePath: string;
  categorySlug?: string;
  searchParams: { page?: string; "sap-xep"?: string };
};

export async function ProductListing({ title, description, crumbs, basePath, categorySlug, searchParams }: Props) {
  const { site } = await getContent();
  const sort = searchParams["sap-xep"] ?? "noi-bat";
  const scope = categorySlug ? categoryScope(categorySlug) : null;
  const filtered = sortProducts(scope ? products.filter((p) => scope.includes(p.categorySlug)) : products, sort);
  const { items, page, totalPages } = paginate(filtered, Number(searchParams.page) || 1, PER_PAGE);

  return (
    <>
      <PageHero title={title} description={description} crumbs={crumbs} />
      <Container className="grid gap-8 py-10 md:py-14 lg:grid-cols-[280px_1fr]">
        <div className="order-2 lg:order-1">
          <CategorySidebar active={categorySlug} counts={countByCategory()} phone={site.phone} />
        </div>
        <div className="order-1 lg:order-2">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-white px-4 py-3 shadow-soft">
            <p className="text-sm text-ink-muted">
              Hiển thị <span className="font-semibold text-brand-800">{items.length}</span> / {filtered.length} sản phẩm
            </p>
            <SortSelect value={sort} />
          </div>
          {items.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <EmptyState title="Chưa có sản phẩm" description="Danh mục này đang được cập nhật. Vui lòng quay lại sau hoặc liên hệ để được tư vấn.">
              <Button asChild variant="sun">
                <Link href="/san-pham">
                  <PackageSearch /> Xem tất cả sản phẩm
                </Link>
              </Button>
            </EmptyState>
          )}
          <Pagination page={page} totalPages={totalPages} basePath={basePath} params={{ "sap-xep": searchParams["sap-xep"] }} />
        </div>
      </Container>
    </>
  );
}
