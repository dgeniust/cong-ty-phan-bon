import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductListing } from "@/components/site/product-listing";
import type { Crumb } from "@/components/site/breadcrumbs";
import { categories, getCategory } from "@/lib/mock/categories";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const category = getCategory((await params).slug);
  return { title: category ? `${category.name} | Kim Ngoan` : "Danh mục" };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Promise<{ page?: string; "sap-xep"?: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const parent = category.parent ? getCategory(category.parent) : undefined;

  const crumbs: Crumb[] = [{ label: "Sản phẩm", href: "/san-pham" }];
  if (parent) crumbs.push({ label: parent.name, href: `/danh-muc/${parent.slug}` });
  crumbs.push({ label: category.name });

  return (
    <ProductListing
      title={category.name}
      description={category.description}
      crumbs={crumbs}
      basePath={`/danh-muc/${slug}`}
      categorySlug={slug}
      searchParams={await searchParams}
    />
  );
}
