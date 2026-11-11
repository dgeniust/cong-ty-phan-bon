import Link from "next/link";
import { Search } from "lucide-react";

const QUICK = ["Phân NPK", "Phân hữu cơ", "Thuốc trừ sâu", "Kích ra hoa"];

/** Plain GET form → works without JavaScript and is the fastest path to a product. */
export function HeroSearch() {
  return (
    <div>
      <form action="/tim-kiem" role="search" className="relative max-w-lg">
        <label htmlFor="hero-search" className="sr-only">
          Tìm sản phẩm hoặc cây trồng
        </label>
        <Search className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-ink-subtle" aria-hidden />
        <input
          id="hero-search"
          name="q"
          type="search"
          autoComplete="off"
          placeholder="Tìm phân bón, cây trồng…"
          className="h-14 w-full rounded-full bg-lime-tint pl-13 pr-24 text-[15px] text-ink outline-none placeholder:text-ink-subtle focus-visible:ring-2 focus-visible:ring-brand-500"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 h-11 -translate-y-1/2 rounded-full bg-brand-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-800 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          Tìm
        </button>
      </form>
      <ul className="mt-4 flex flex-wrap items-center gap-2" aria-label="Tìm nhanh">
        {QUICK.map((q) => (
          <li key={q}>
            <Link
              href={`/tim-kiem?q=${encodeURIComponent(q)}`}
              className="inline-flex h-9 items-center rounded-full bg-lime-tint px-3.5 text-[13px] font-medium text-brand-800 transition-colors hover:bg-brand-100"
            >
              {q}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
