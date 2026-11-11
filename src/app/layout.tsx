import type { Metadata, Viewport } from "next";
import "@fontsource/be-vietnam-pro/vietnamese-400.css";
import "@fontsource/be-vietnam-pro/vietnamese-500.css";
import "@fontsource/be-vietnam-pro/vietnamese-600.css";
import "@fontsource/be-vietnam-pro/vietnamese-700.css";
import "@fontsource/be-vietnam-pro/latin-400.css";
import "@fontsource/be-vietnam-pro/latin-500.css";
import "@fontsource/be-vietnam-pro/latin-600.css";
import "@fontsource/be-vietnam-pro/latin-700.css";
import "@fontsource/playfair-display/vietnamese-500.css";
import "@fontsource/playfair-display/latin-500.css";
import "@fontsource/dancing-script/vietnamese-600.css";
import "@fontsource/dancing-script/latin-600.css";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { getContent } from "@/lib/content/store";
import { SITE_URL } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#143f1b",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  // "KIM NGOAN" -> "Kim Ngoan" for the "%s | Kim Ngoan" title template
  const brand = site.companyName.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: site.seoTitle, template: `%s | ${brand || site.seoTitle}` },
    description: site.seoDescription,
    applicationName: `${site.companyPrefix} ${site.companyName}`.trim(),
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: `${site.companyPrefix} ${site.companyName}`.trim(),
      title: site.seoTitle,
      description: site.seoDescription,
      url: "/",
    },
    twitter: { card: "summary_large_image", title: site.seoTitle, description: site.seoDescription },
    formatDetection: { telephone: false },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
