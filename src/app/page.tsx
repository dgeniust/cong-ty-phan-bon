import { AboutSection } from "@/components/landing/about-section";
import { ContactBar } from "@/components/landing/contact-bar";
import { CropsSection } from "@/components/landing/crops-section";
import { FeaturesBar } from "@/components/landing/features-bar";
import { HeroCarousel } from "@/components/landing/hero-carousel";
import { ProductsSection } from "@/components/landing/products-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { getContent } from "@/lib/content/store";

export const revalidate = false;

export default async function HomePage() {
  const content = await getContent();
  return (
    <>
      <SiteHeader site={content.site} nav={content.nav} />
      <main>
        <HeroCarousel hero={content.hero} />
        <FeaturesBar features={content.features} />
        <ProductsSection products={content.products} />
        <CropsSection crops={content.crops} />
        <AboutSection about={content.about} />
        <ContactBar site={content.site} contact={content.contact} />
      </main>
      <SiteFooter site={content.site} footer={content.footer} />
    </>
  );
}
