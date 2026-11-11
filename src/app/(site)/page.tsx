import { AboutStory } from "@/components/landing/about-story";
import { BuySteps } from "@/components/landing/buy-steps";
import { CropPicker } from "@/components/landing/crop-picker";
import { FeaturesBar } from "@/components/landing/features-bar";
import { Hero } from "@/components/landing/hero";
import { ProductGroups } from "@/components/landing/product-groups";
import { QuickConsult } from "@/components/landing/quick-consult";
import { SectionHeading } from "@/components/landing/section-heading";
import { Container } from "@/components/shared/container";
import { LineArt } from "@/components/shared/line-art";
import { MoreLink } from "@/components/shared/more-link";
import { ArticleCard } from "@/components/site/article-card";
import { ProductCard } from "@/components/site/product-card";
import { getContent } from "@/lib/content/store";
import { getArticles } from "@/lib/mock/articles";
import { products } from "@/lib/mock/products";

/** Landing page – "Phác Thảo" v1. Section order & rationale: design.md §5. */
export default async function HomePage() {
  const content = await getContent();
  const { site } = content;
  const featured = [...products].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, 4);
  const news = getArticles("tin-tuc").slice(0, 3);
  const bagImage = content.products.items[0]?.image || "/fertilize-img.jpg";

  return (
    <div className="bg-paper">
      <Hero hero={content.hero} site={site} bagImage={bagImage} />
      <FeaturesBar features={content.features} />
      <CropPicker crops={content.crops} />
      <ProductGroups products={content.products} />
      <BuySteps phone={site.phone} />

      <section aria-labelledby="noi-bat-title" className="bg-white py-20 md:py-28">
        <Container>
          <SectionHeading
            id="noi-bat-title"
            title="Sản phẩm được tin dùng"
            subtitle="Những dòng bà con chọn nhiều nhất mùa vụ này."
            action={<MoreLink href="/san-pham">Xem toàn bộ sản phẩm</MoreLink>}
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Container>
      </section>

      <AboutStory about={content.about} stats={content.hero.stats} />

      {news.length > 0 && (
        <section aria-labelledby="tin-tuc-title" className="bg-white py-20 md:py-28">
          <Container>
            <SectionHeading
              id="tin-tuc-title"
              title="Kiến thức canh tác"
              subtitle="Kỹ thuật bón phân và phòng trừ sâu bệnh từ đội ngũ kỹ thuật Kim Ngoan."
              action={<MoreLink href="/tin-tuc">Xem tất cả bài viết</MoreLink>}
            />
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {news.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <div className="relative overflow-hidden">
        <LineArt name="seedling" className="absolute -bottom-6 right-[4%] hidden w-56 opacity-20 lg:block" />
        <QuickConsult phone={site.phone} />
      </div>
    </div>
  );
}
