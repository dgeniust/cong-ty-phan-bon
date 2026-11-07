import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { getContent } from "@/lib/content/store";
import { categoryGroups } from "@/lib/mock/categories";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  return (
    <>
      <SiteHeader site={content.site} nav={content.nav} />
      <main className="min-h-[60vh]">{children}</main>
      <SiteFooter site={content.site} footer={content.footer} />
    </>
  );
}
