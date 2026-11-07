import { AboutSection } from "@/components/landing/about-section";
import { ContactBar } from "@/components/landing/contact-bar";
import { CropsSection } from "@/components/landing/crops-section";
import { FeaturesBar } from "@/components/landing/features-bar";
import { HeroCarousel } from "@/components/landing/hero-carousel";
import { ProductsSection } from "@/components/landing/products-section";
import { getContent } from "@/lib/content/store";

export default async function HomePage() {
  const content = await getContent();
  return (
    <>
      <HeroCarousel hero={content.hero} />
      <FeaturesBar features={content.features} />
      <ProductsSection products={content.products} />
      <CropsSection crops={content.crops} />
      <AboutSection about={content.about} />
      <ContactBar site={content.site} contact={content.contact} />
    </>
  );
}
