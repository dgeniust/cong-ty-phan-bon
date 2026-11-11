import { AboutSection } from "@/components/landing/about-section";
import { ContactBar } from "@/components/landing/contact-bar";
import { CropsSection } from "@/components/landing/crops-section";
import { FeaturesBar } from "@/components/landing/features-bar";
import { HeroCarousel } from "@/components/landing/hero-carousel";
import { ProductsSection } from "@/components/landing/products-section";
import { SectionHeading } from "@/components/landing/section-heading";
import { Container } from "@/components/shared/container";
import { MoreLink } from "@/components/shared/more-link";
import { ArticleCard } from "@/components/site/article-card";
import { ProductCard } from "@/components/site/product-card";
import { getContent } from "@/lib/content/store";
import { getArticles } from "@/lib/mock/articles";
import { products } from "@/lib/mock/products";

export default async function HomePage() {
  const content = await getContent();
  const { site } = content;
  const featured = [...products].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, 4);
  const news = getArticles("tin-tuc").slice(0, 3);

  return (
    <>
      {/* One descriptive h1 for search engines & screen readers; the carousel is visual. */}
      <h1 className="sr-only">{site.seoTitle}</h1>
      <HeroCarousel hero={content.hero} phone={site.phone} />
      <FeaturesBar features={content.features} />
      <ProductsSection products={content.products} />

      <section aria-labelledby="noi-bat-title" className="pb-20 md:pb-28">
        <Container>
          <SectionHeading
            id="noi-bat-title"
            title="Sản phẩm được tin dùng"
            subtitle="Những dòng phân bón và thuốc bảo vệ thực vật bà con chọn nhiều nhất mùa vụ này."
            action={<MoreLink href="/san-pham">Xem toàn bộ</MoreLink>}
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Container>
      </section>

      <CropsSection crops={content.crops} />
      <AboutSection about={content.about} />

      {news.length > 0 && (
        <section aria-labelledby="tin-tuc-title" className="bg-surface py-20 md:py-28">
          <Container>
            <SectionHeading
              id="tin-tuc-title"
              title="Kiến thức canh tác"
              subtitle="Kỹ thuật bón phân, phòng trừ sâu bệnh và tin tức mới từ đội ngũ kỹ thuật Kim Ngoan."
              action={<MoreLink href="/tin-tuc">Xem tất cả bài viết</MoreLink>}
            />
            <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {news.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <div className="pt-20 md:pt-28">
        <ContactBar site={site} contact={content.contact} />
      </div>
    </>
  );
}
