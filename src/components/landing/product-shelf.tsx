import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SmartImage } from "@/components/shared/smart-image";
import { getCategory } from "@/lib/mock/categories";
import type { Product } from "@/lib/mock/types";
import { SerifHeading } from "./serif-heading";

/** Card: square photo + dark name bar (the reference's product tile; packing replaces price). */
function ShelfCard({ product }: { product: Product }) {
  return (
    <li>
      <Link
        href={`/san-pham/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-lg bg-brand-900 shadow-soft transition-shadow hover:shadow-lift focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        <div className="relative aspect-square overflow-hidden bg-surface">
          <SmartImage
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 22vw, 46vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {(product.isNew || product.featured) && (
            <div className="absolute left-2 top-2 flex gap-1">
              {product.isNew && <Badge variant="sun">Mới</Badge>}
              {product.featured && <Badge variant="glass">Bán chạy</Badge>}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col px-3.5 py-3 md:px-4 md:py-3.5">
          <span className="text-[12px] text-sun-200">{getCategory(product.categorySlug)?.name}</span>
          <span className="mt-1 font-serif text-[15px] font-medium leading-snug text-white md:text-base">{product.name}</span>
          <span className="mt-auto pt-2 text-[12px] text-white/65">{product.packing.join(" / ")}</span>
        </div>
      </Link>
    </li>
  );
}

/** "100% chính hãng" – 4×2 product grid (design.md §5.6). */
export function ProductShelf({ items }: { items: Product[] }) {
  return (
    <section aria-labelledby="chinh-hang-title" className="bg-white py-20 md:py-28">
      <Container>
        <SerifHeading
          id="chinh-hang-title"
          title="100% hàng chính hãng"
          subtitle="Sản phẩm chính hãng, nguồn gốc rõ ràng. Liên hệ để nhận báo giá theo số lượng."
        />
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {items.map((p) => (
            <ShelfCard key={p.slug} product={p} />
          ))}
        </ul>
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/san-pham">Xem tất cả sản phẩm</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
