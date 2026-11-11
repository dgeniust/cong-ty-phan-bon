import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SmartImage } from "@/components/shared/smart-image";
import { getCategory } from "@/lib/mock/categories";
import type { Product } from "@/lib/mock/types";

/** Whole card is one link target (stretched link on the title) – bigger hit area, single tab stop. */
export function ProductCard({ product, headingLevel = "h3" }: { product: Product; headingLevel?: "h2" | "h3" }) {
  const href = `/san-pham/${product.slug}`;
  const Heading = headingLevel;
  const category = getCategory(product.categorySlug)?.name;
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
        <SmartImage
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {(product.isNew || product.featured) && (
          <div className="absolute left-3 top-3 flex gap-1.5">
            {product.isNew && <Badge variant="sun">Mới</Badge>}
            {product.featured && <Badge variant="glass">Bán chạy</Badge>}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col pt-4 sm:pt-5">
        {category && <p className="text-[13px] font-medium text-brand-600">{category}</p>}
        <Heading className="mt-1.5 text-[15px] font-semibold leading-snug text-brand-900 sm:text-[17px]">
          <Link
            href={href}
            className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] group-hover:text-brand-700 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand-500 focus-visible:after:ring-offset-4"
          >
            {product.name}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-2 hidden text-sm leading-relaxed text-ink-muted sm:block">{product.shortDescription}</p>
        <p className="mt-auto pt-2 text-[13px] text-ink-subtle sm:pt-3">{product.packing.join(" / ")}</p>
      </div>
    </article>
  );
}
