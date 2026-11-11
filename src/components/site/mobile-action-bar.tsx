import Link from "next/link";
import { MessageCircle, Phone, Search } from "lucide-react";

/** Always-visible actions on phones & tablets (design.md §5.11). */
export function MobileActionBar({ phone }: { phone: string }) {
  const item =
    "flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl py-2 text-[12px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-brand-500";
  return (
    <>
      {/* Spacer so the bar never covers the end of the page */}
      <div aria-hidden className="h-20 bg-brand-950 lg:hidden" />
      <nav aria-label="Thao tác nhanh" className="pb-safe fixed inset-x-0 bottom-0 z-40 bg-white/95 shadow-[0_-8px_24px_-12px_rgb(20_63_27/0.18)] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex h-16 max-w-md items-stretch gap-1 px-2 py-1.5">
          <Link href="/tim-kiem" className={`${item} text-ink-muted hover:bg-surface hover:text-brand-900`}>
            <Search className="size-5" aria-hidden />
            Tìm sản phẩm
          </Link>
          <Link href="/lien-he" className={`${item} text-ink-muted hover:bg-surface hover:text-brand-900`}>
            <MessageCircle className="size-5" aria-hidden />
            Nhận tư vấn
          </Link>
          <a href={`tel:${phone}`} className={`${item} flex-[1.3] bg-sun-300 text-brand-950 hover:bg-sun-400`}>
            <Phone className="size-5" aria-hidden />
            Gọi ngay
          </a>
        </div>
      </nav>
    </>
  );
}
