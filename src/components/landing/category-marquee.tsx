import Link from "next/link";
import { Sparkle } from "@/components/shared/la-non";
import { categories } from "@/lib/mock/categories";

const ITEMS = categories.filter((c) => c.parent);

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((c) => (
        <li key={c.slug} className="flex items-center">
          <Link
            href={`/danh-muc/${c.slug}`}
            tabIndex={hidden ? -1 : undefined}
            className="whitespace-nowrap px-6 font-serif text-xl font-medium text-brand-900 transition-colors hover:text-brand-500 md:text-2xl"
          >
            {c.name}
          </Link>
          <Sparkle className="size-4" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Running strip of category links (design.md §5.5). The list is rendered twice so
 * the loop is seamless; the copy is hidden from assistive tech. Pauses on hover/focus,
 * stands still (and scrolls by hand) with reduced motion.
 */
export function CategoryMarquee() {
  return (
    <nav aria-label="Danh mục sản phẩm" className="overflow-x-auto bg-lime-tint py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
        <Row />
        <Row hidden />
      </div>
    </nav>
  );
}
