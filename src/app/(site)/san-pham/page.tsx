import type { Metadata } from "next";
import { ProductListing } from "@/components/site/product-listing";

export const metadata: Metadata = { title: "Sản phẩm | Kim Ngoan" };

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ page?: string; "sap-xep"?: string }> }) {
  return (
    <ProductListing
      title="Sản phẩm"
      description="Phân bón và thuốc bảo vệ thực vật chính hãng, đáp ứng mọi nhu cầu của nhà nông."
      crumbs={[{ label: "Sản phẩm" }]}
      basePath="/san-pham"
      searchParams={await searchParams}
    />
  );
}
