import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/shared/smart-image";
import { getCategory } from "@/lib/mock/categories";
import type { Product } from "@/lib/mock/types";

export function ProductCard({ product }: { product: Product }) {
  const href = `/san-pham/${product.slug}`;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden" tabIndex={-1}>
        <SmartImage
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {product.isNew && <Badge variant="sun">Mới</Badge>}
          {product.featured && <Badge variant="solid">Nổi bật</Badge>}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-500">{getCategory(product.categorySlug)?.name}</p>
        <h3 className="mt-1 font-bold text-brand-800">
          <Link href={href} className="hover:text-brand-600">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{product.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="min-w-0 truncate text-xs text-ink-muted" title={product.packing.join(" · ")}>{product.packing.join(" · ")}</span>
          <Button asChild variant="brand" size="sm">
            <Link href={href}>
              Xem chi tiết <ChevronRight />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
