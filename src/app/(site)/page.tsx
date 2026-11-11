import { CareShowcase } from "@/components/landing/care-showcase";
import { CategoryMarquee } from "@/components/landing/category-marquee";
import { Collection } from "@/components/landing/collection";
import { CtaBanner } from "@/components/landing/cta-banner";
import { FeaturedStory } from "@/components/landing/featured-story";
import { FeaturesBar } from "@/components/landing/features-bar";
import { Hero } from "@/components/landing/hero";
import { ProcessRow } from "@/components/landing/process-row";
import { getContent } from "@/lib/content/store";
import { getArticles } from "@/lib/mock/articles";
import { products } from "@/lib/mock/products";

/** Landing page – "Lá Non" v1. Section order & rationale: design.md §5. */
export default async function HomePage() {
  const content = await getContent();
  const { site, hero, crops } = content;
  const bagImage = content.products.items[0]?.image || "/fertilize-img.jpg";
  const spotlight = products.find((p) => p.featured) ?? products[0];
  const collection = [...products].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)).slice(0, 4);

  return (
    <>
      <Hero hero={hero} site={site} bagImage={bagImage} crop={crops.items[0]} spotlight={spotlight} />
      <FeaturesBar features={content.features} />
      <ProcessRow stat={hero.stats[1] ?? hero.stats[0]} />
      <CareShowcase bagImage={bagImage} crops={crops.items} product={spotlight} />
      <CategoryMarquee />
      <Collection items={collection} crops={crops.items} />
      <FeaturedStory articles={getArticles("tin-tuc").slice(0, 3)} />
      <CtaBanner phone={site.phone} bagImage={bagImage} />
    </>
  );
}
