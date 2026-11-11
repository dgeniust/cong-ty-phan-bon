import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { JsonLd } from "@/components/shared/json-ld";
import { getContent } from "@/lib/content/store";
import { absoluteUrl } from "@/lib/site";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  const { site } = content;
  const legalName = `${site.companyPrefix} ${site.companyName}`.trim();

  const organization = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": absoluteUrl("/#to-chuc"),
    name: legalName,
    description: site.seoDescription,
    slogan: site.slogan,
    url: absoluteUrl("/"),
    telephone: site.phone,
    email: site.email,
    image: site.logo ? absoluteUrl(site.logo) : undefined,
    address: { "@type": "PostalAddress", streetAddress: site.address, addressCountry: "VN" },
    openingHours: "Mo-Su 07:00-18:00",
    sameAs: site.facebook ? [site.facebook] : undefined,
  };

  return (
    <>
      <JsonLd data={organization} />
      <SiteHeader site={site} nav={content.nav} />
      <main id="noi-dung" tabIndex={-1} className="min-h-[60vh] outline-none">
        {children}
      </main>
      <SiteFooter site={site} footer={content.footer} />
    </>
  );
}
