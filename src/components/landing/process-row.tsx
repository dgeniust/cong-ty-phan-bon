import Link from "next/link";
import { Container } from "@/components/shared/container";
import type { SiteContent } from "@/lib/content/schema";

/** One-line "how we work" strip, mirrors the reference's "The Production – process" row (design.md §5.3). */
export function ProcessRow({ stat }: { stat?: SiteContent["hero"]["stats"][number] }) {
  return (
    <section aria-labelledby="quy-trinh-title" className="bg-white pb-16 md:pb-24">
      <Container>
        <div className="grid items-center gap-6 rounded-3xl bg-lime-tint px-6 py-8 md:grid-cols-[auto_1fr_auto] md:gap-12 md:px-10">
          <h2 id="quy-trinh-title" className="leading-tight">
            <span className="block text-[13px] font-medium text-brand-600">Quy trình</span>
            <span className="serif-title mt-1 block text-[1.75rem] text-brand-900">Từ tư vấn đến tận vườn</span>
          </h2>
          <p className="max-w-2xl text-[15px] leading-relaxed text-ink-muted">
            Bạn cho biết cây trồng và diện tích, kỹ thuật viên gợi ý loại phân, liều lượng và thời điểm bón phù hợp. Đội xe Kim Ngoan
            giao hàng tận nơi khu vực Đồng Nai – Bình Phước.{" "}
            <Link href="/dich-vu/tu-van-ky-thuat-tai-vuon" className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900">
              Xem dịch vụ tư vấn
            </Link>
          </p>
          {stat && (
            <p className="md:text-right">
              <span className="block font-serif text-[2.5rem] font-medium leading-none text-brand-900">{stat.value}</span>
              <span className="mt-1 block text-[13px] text-brand-600">{stat.label}</span>
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
