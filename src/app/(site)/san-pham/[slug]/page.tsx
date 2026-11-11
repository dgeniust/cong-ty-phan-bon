import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MessageCircle, Phone, ShieldCheck, Sprout, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { MoreLink } from "@/components/shared/more-link";
import { SectionHeading } from "@/components/landing/section-heading";
import { Breadcrumbs, type Crumb } from "@/components/site/breadcrumbs";
import { ProductCard } from "@/components/site/product-card";
import { ProductGallery } from "@/components/site/product-gallery";
import { getContent } from "@/lib/content/store";
import { getCategory } from "@/lib/mock/categories";
import { getProduct, products } from "@/lib/mock/products";
import { absoluteUrl } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  const url = `/san-pham/${p.slug}`;
  return {
    title: p.name,
    description: p.shortDescription,
    alternates: { canonical: url },
    openGraph: { url, title: p.name, description: p.shortDescription, images: [p.images[0]] },
  };
}

const TRUST = [
  { icon: ShieldCheck, label: "Hàng chính hãng, có nguồn gốc rõ ràng" },
  { icon: Truck, label: "Giao tận vườn khu vực Đồng Nai – Bình Phước" },
  { icon: Sprout, label: "Kỹ thuật viên tư vấn miễn phí" },
];

const SECTIONS = [
  { id: "mo-ta", label: "Mô tả" },
  { id: "thanh-phan", label: "Thành phần" },
  { id: "cong-dung", label: "Công dụng" },
  { id: "huong-dan", label: "Hướng dẫn sử dụng" },
];

function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_1fr] items-start gap-4 py-3.5 sm:grid-cols-[140px_1fr]">
      <dt className="text-[15px] text-ink-muted">{label}</dt>
      <dd className="text-[15px] font-medium text-brand-900">{children}</dd>
    </div>
  );
}

function DetailBlock({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <h2 id={`${id}-title`} className="text-2xl font-bold tracking-tight text-brand-900">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const { site } = await getContent();

  const category = getCategory(product.categorySlug);
  const parent = category?.parent ? getCategory(category.parent) : undefined;
  const crumbs: Crumb[] = [{ label: "Sản phẩm", href: "/san-pham" }];
  if (parent) crumbs.push({ label: parent.name, href: `/danh-muc/${parent.slug}` });
  if (category) crumbs.push({ label: category.name, href: `/danh-muc/${category.slug}` });
  crumbs.push({ label: product.name });

  const related = products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => Number(b.categorySlug === product.categorySlug) - Number(a.categorySlug === product.categorySlug))
    .filter((p) => getCategory(p.categorySlug)?.parent === category?.parent)
    .slice(0, 4);

  const structured = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: [product.shortDescription, ...product.description].join(" "),
    image: product.images.map((src) => absoluteUrl(src)),
    category: category?.name,
    brand: { "@type": "Brand", name: `${site.companyPrefix} ${site.companyName}`.trim() },
    countryOfOrigin: product.origin,
    url: absoluteUrl(`/san-pham/${product.slug}`),
  };

  return (
    <>
      <JsonLd data={structured} />
      <div className="bg-paper">
        <Container className="pt-8">
          <Breadcrumbs items={crumbs} />
        </Container>

        <Container className="grid gap-10 pb-16 pt-8 md:pb-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <ProductGallery images={product.images} alt={product.name} />

          <div className="lg:pt-2">
            <div className="flex flex-wrap items-center gap-2">
              {category && (
                <Link href={`/danh-muc/${category.slug}`} className="text-sm font-medium text-brand-600 hover:text-brand-800">
                  {category.name}
                </Link>
              )}
              {product.isNew && <Badge variant="sun">Mới</Badge>}
              {product.featured && <Badge>Bán chạy</Badge>}
            </div>
            <h1 className="display mt-3 text-[2rem] md:text-[2.75rem]">{product.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">{product.shortDescription}</p>

            <dl className="mt-8 rounded-2xl bg-white px-5 py-2 sm:px-6">
              <Spec label="Mã sản phẩm">
                <span className="tabular-nums">{product.sku}</span>
              </Spec>
              <Spec label="Quy cách">{product.packing.join(", ")}</Spec>
              <Spec label="Xuất xứ">{product.origin}</Spec>
              <Spec label="Phù hợp cho">{product.crops.join(", ")}</Spec>
              <Spec label="Giá bán">
                <span className="text-brand-700">Liên hệ để nhận báo giá theo số lượng</span>
              </Spec>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="sun" size="lg" className="sm:flex-1">
                <a href={`tel:${site.phone}`}>
                  <Phone /> Gọi đặt hàng <span className="tabular-nums">{site.phone}</span>
                </a>
              </Button>
              <Button asChild size="lg" className="sm:flex-1">
                <Link href={`/lien-he?san-pham=${product.slug}`}>
                  <MessageCircle /> Nhận tư vấn
                </Link>
              </Button>
            </div>

            <ul className="mt-8 space-y-3">
              {TRUST.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-[15px] text-ink-muted">
                  <Icon className="size-5 shrink-0 text-brand-600" strokeWidth={1.75} aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>

      {/* All detail content is rendered in the HTML (not hidden in tabs) so it's crawlable and scannable. */}
      <div className="bg-surface py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          <nav aria-label="Nội dung sản phẩm" className="hidden lg:block">
            <ul className="sticky top-28 space-y-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block rounded-xl px-4 py-2.5 text-[15px] text-ink-muted transition-colors hover:bg-white hover:text-brand-900"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="max-w-3xl space-y-14 rounded-3xl bg-white p-6 shadow-soft md:p-10">
            <DetailBlock id="mo-ta" title="Mô tả sản phẩm">
              <div className="prose-kn space-y-4">
                {product.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </DetailBlock>

            <DetailBlock id="thanh-phan" title="Thành phần">
              <div className="overflow-hidden rounded-2xl">
                <Table>
                  <TableHeader className="bg-brand-50">
                    <TableRow>
                      <TableHead scope="col">Thành phần</TableHead>
                      <TableHead scope="col" className="text-right">
                        Hàm lượng
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {product.ingredients.map((r) => (
                      <TableRow key={r.name} className="odd:bg-white even:bg-surface">
                        <TableCell className="text-[15px]">{r.name}</TableCell>
                        <TableCell className="text-right text-[15px] font-semibold tabular-nums text-brand-800">{r.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </DetailBlock>

            <DetailBlock id="cong-dung" title="Công dụng">
              <ul className="space-y-3.5">
                {product.uses.map((u, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed text-ink">
                    <Check className="mt-1 size-[18px] shrink-0 text-brand-500" strokeWidth={2.5} aria-hidden />
                    {u}
                  </li>
                ))}
              </ul>
            </DetailBlock>

            <DetailBlock id="huong-dan" title="Hướng dẫn sử dụng">
              <ul className="space-y-3.5">
                {product.usage.map((u, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed text-ink">
                    <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-sun-500" aria-hidden />
                    {u}
                  </li>
                ))}
              </ul>
            </DetailBlock>
          </div>
        </Container>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="lien-quan-title" className="py-20 md:py-28">
          <Container>
            <SectionHeading
              id="lien-quan-title"
              title="Sản phẩm cùng nhóm"
              action={category?.parent ? <MoreLink href={`/danh-muc/${category.parent}`}>Xem cả nhóm</MoreLink> : undefined}
            />
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
