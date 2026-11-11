import Link from "next/link";
import { AboutOffset } from "@/components/landing/about-offset";
import { CategoryHexGrid } from "@/components/landing/category-hex-grid";
import { CropMosaic } from "@/components/landing/crop-mosaic";
import { FeaturesBar } from "@/components/landing/features-bar";
import { Hero } from "@/components/landing/hero";
import { ProductShelf } from "@/components/landing/product-shelf";
import { QuickConsult } from "@/components/landing/quick-consult";
import { SerifHeading } from "@/components/landing/serif-heading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { ArticleCard } from "@/components/site/article-card";
import { getContent } from "@/lib/content/store";
import { getArticles } from "@/lib/mock/articles";
import { products } from "@/lib/mock/products";

/** Landing page – "Mùa Vàng" v1. Section order & rationale: design.md §5. */
export default async function HomePage() {
  const content = await getContent();
  const { site } = content;
  const shelf = [...products].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, 8);
  const news = getArticles("tin-tuc").slice(0, 3);

  return (
    <>
      <Hero hero={content.hero} site={site} />
      <FeaturesBar features={content.features} />
      <AboutOffset about={content.about} stats={content.hero.stats} />
      <CategoryHexGrid />
      <ProductShelf items={shelf} />
      <CropMosaic crops={content.crops} phone={site.phone} />

      {news.length > 0 && (
        <section aria-labelledby="tin-tuc-title" className="bg-white py-20 md:py-28">
          <Container>
            <SerifHeading
              id="tin-tuc-title"
              title="Kiến thức canh tác"
              subtitle="Kỹ thuật bón phân và phòng trừ sâu bệnh từ đội ngũ kỹ thuật Kim Ngoan."
            />
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {news.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/tin-tuc">Xem tất cả bài viết</Link>
              </Button>
            </div>
          </Container>
        </section>
      )}

      <QuickConsult phone={site.phone} image={content.hero.slides[0].image} />
    </>
  );
}
