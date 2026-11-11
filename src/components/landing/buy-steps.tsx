import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SketchOutline } from "@/components/shared/sketch";

const STEPS = [
  {
    title: "Cho biết cây trồng và diện tích",
    body: "Gọi điện hoặc để lại số. Chỉ cần nói bạn trồng cây gì, bao nhiêu gốc hay bao nhiêu sào.",
  },
  {
    title: "Nhận phác đồ từ kỹ thuật viên",
    body: "Kỹ thuật viên gợi ý loại phân, liều lượng và thời điểm bón phù hợp vườn của bạn. Miễn phí.",
  },
  {
    title: "Nhận hàng tận vườn",
    body: "Đội xe Kim Ngoan giao tận nơi khu vực Đồng Nai – Bình Phước, nhanh chóng và đúng hẹn.",
  },
];

/** Hand-drawn connector between steps (desktop only). */
function Connector() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute -right-16 top-6 hidden w-28 text-brand-900/70 lg:block"
    >
      <path d="M4 26C30 6 62 4 92 18c6 3 12 7 18 12" />
      <path d="M100 22l10 8-12 3" />
    </svg>
  );
}

/** "Mua hàng chỉ 3 bước" – a real sequence, so numbered (design.md §5.6). */
export function BuySteps({ phone }: { phone: string }) {
  return (
    <section aria-labelledby="ba-buoc-title" className="py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <h2 id="ba-buoc-title" className="display text-[2rem] md:text-[2.75rem]">
            Mua hàng chỉ 3 bước
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
            Lần đầu mua phân bón? Không cần biết tên sản phẩm – kỹ thuật viên sẽ chọn giúp bạn.
          </p>
        </div>

        <ol className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-24">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative flex gap-5 lg:flex-col">
              <span className="relative grid size-16 shrink-0 place-items-center">
                <SketchOutline className="inset-0" />
                <span className="text-2xl font-medium text-brand-900">{i + 1}</span>
              </span>
              <div>
                <h3 className="text-xl font-semibold leading-snug text-brand-900">{s.title}</h3>
                <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-ink-muted">{s.body}</p>
              </div>
              {i < STEPS.length - 1 && <Connector />}
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-wrap items-center gap-3">
          <Button asChild variant="sun" size="lg">
            <a href={`tel:${phone}`}>
              <Phone /> Bắt đầu: gọi {phone}
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/dich-vu/tu-van-ky-thuat-tai-vuon">Xem dịch vụ tư vấn tại vườn</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
