import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ClipboardList, FlaskConical, MessageCircle, Phone, ShieldCheck, Sprout, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/landing/section-heading";
import { Breadcrumbs, type Crumb } from "@/components/site/breadcrumbs";
import { ProductCard } from "@/components/site/product-card";
import { ProductGallery } from "@/components/site/product-gallery";
import { getContent } from "@/lib/content/store";
import { getCategory } from "@/lib/mock/categories";
import { getProduct, products } from "@/lib/mock/products";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: `${p.name} | Kim Ngoan`, description: p.shortDescription } : {};
}

const TRUST = [
  { icon: ShieldCheck, label: "Chính hãng 100%" },
  { icon: Truck, label: "Giao hàng tận nơi" },
  { icon: Sprout, label: "Tư vấn kỹ thuật miễn phí" },
];

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

  return (
    <>
      <div className="border-b border-border/60 bg-brand-50 py-4">
        <Container>
          <Breadcrumbs items={crumbs} />
        </Container>
      </div>

      <Container className="grid gap-10 py-10 md:py-14 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.name} />

        <div>
          <div className="flex flex-wrap gap-2">
            {category && (
              <Badge variant="outline">
                <Link href={`/danh-muc/${category.slug}`}>{category.name}</Link>
              </Badge>
            )}
            {product.isNew && <Badge variant="sun">Mới</Badge>}
            {product.featured && <Badge variant="solid">Nổi bật</Badge>}
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-800 md:text-4xl">{product.name}</h1>
          <p className="mt-3 leading-relaxed text-ink-muted">{product.shortDescription}</p>

          <dl className="mt-6 divide-y divide-border rounded-2xl border border-border/70 bg-white text-sm shadow-soft">
            <div className="grid grid-cols-[130px_1fr] gap-3 px-5 py-3">
              <dt className="text-ink-muted">Mã sản phẩm</dt>
              <dd className="font-medium text-ink">{product.sku}</dd>
            </div>
            <div className="grid grid-cols-[130px_1fr] gap-3 px-5 py-3">
              <dt className="text-ink-muted">Quy cách</dt>
              <dd className="flex flex-wrap gap-1.5">
                {product.packing.map((p) => (
                  <Badge key={p} variant="outline">
                    {p}
                  </Badge>
                ))}
              </dd>
            </div>
            <div className="grid grid-cols-[130px_1fr] gap-3 px-5 py-3">
              <dt className="text-ink-muted">Xuất xứ</dt>
              <dd className="font-medium text-ink">{product.origin}</dd>
            </div>
            <div className="grid grid-cols-[130px_1fr] gap-3 px-5 py-3">
              <dt className="text-ink-muted">Cây trồng</dt>
              <dd className="flex flex-wrap gap-1.5">
                {product.crops.map((c) => (
                  <Badge key={c}>{c}</Badge>
                ))}
              </dd>
            </div>
            <div className="grid grid-cols-[130px_1fr] gap-3 px-5 py-3">
              <dt className="text-ink-muted">Giá bán</dt>
              <dd className="font-bold text-brand-600">Liên hệ để có giá tốt nhất</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="sun" size="lg">
              <a href={`tel:${site.phone}`}>
                <Phone className="fill-brand-700" /> Gọi đặt hàng: {site.phone}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/lien-he?san-pham=${product.slug}`}>
                <MessageCircle /> Nhận tư vấn
              </Link>
            </Button>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {TRUST.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 rounded-xl bg-brand-50 px-3 py-2.5 text-sm font-medium text-brand-800">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sun-300/70 text-brand-700">
                  <Icon className="size-4" aria-hidden />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <section className="bg-brand-50 py-10 md:py-14">
        <Container>
          <Tabs defaultValue="mo-ta">
            <TabsList className="mx-auto">
              <TabsTrigger value="mo-ta">Mô tả</TabsTrigger>
              <TabsTrigger value="thanh-phan">
                <FlaskConical /> Thành phần
              </TabsTrigger>
              <TabsTrigger value="cong-dung">
                <Sprout /> Công dụng
              </TabsTrigger>
              <TabsTrigger value="huong-dan">
                <ClipboardList /> Hướng dẫn sử dụng
              </TabsTrigger>
            </TabsList>
            <div className="mx-auto w-full max-w-4xl rounded-2xl border border-border/70 bg-white p-6 shadow-soft md:p-8">
              <TabsContent value="mo-ta" className="space-y-4 leading-relaxed text-ink">
                {product.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </TabsContent>
              <TabsContent value="thanh-phan">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-brand-50 hover:bg-brand-50">
                      <TableHead>Thành phần</TableHead>
                      <TableHead className="text-right">Hàm lượng</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {product.ingredients.map((r) => (
                      <TableRow key={r.name}>
                        <TableCell>{r.name}</TableCell>
                        <TableCell className="text-right font-semibold text-brand-700">{r.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="cong-dung">
                <ul className="space-y-3">
                  {product.uses.map((u, i) => (
                    <li key={i} className="flex gap-3 text-ink">
                      <Check className="mt-0.5 size-5 shrink-0 text-brand-500" strokeWidth={3} aria-hidden />
                      {u}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="huong-dan">
                <ol className="space-y-3">
                  {product.usage.map((u, i) => (
                    <li key={i} className="flex gap-3 text-ink">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      {u}
                    </li>
                  ))}
                </ol>
              </TabsContent>
            </div>
          </Tabs>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-14 md:py-20">
          <Container>
            <SectionHeading title="Sản phẩm liên quan" subtitle="Có thể bạn cũng quan tâm" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
