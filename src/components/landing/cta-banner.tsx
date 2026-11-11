import { Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Sparkle } from "@/components/shared/la-non";
import { SmartImage } from "@/components/shared/smart-image";
import { ArrowPill } from "./hero";

/** Closing cream banner with the product (design.md §5.8). */
export function CtaBanner({ phone, bagImage }: { phone: string; bagImage: string }) {
  return (
    <section aria-labelledby="cta-title" className="bg-white pb-20 md:pb-28">
      <Container>
        <div className="relative grid items-center gap-8 overflow-hidden rounded-3xl bg-sun-100 px-6 py-10 md:grid-cols-[1.2fr_1fr] md:px-12 md:py-12">
          <div>
            <h2 id="cta-title" className="serif-title text-[2rem] text-brand-900 md:text-[2.5rem]">
              Muốn vườn cây <span className="font-bold uppercase text-brand-500">xanh tốt</span> hơn?
              <br />
              Kim Ngoan luôn sẵn sàng.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
              Kỹ thuật viên tư vấn miễn phí theo loại cây, tuổi cây và tình trạng đất. Gọi ngay hoặc để lại lời nhắn.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ArrowPill href="/lien-he">Gửi yêu cầu tư vấn</ArrowPill>
              <a href={`tel:${phone}`} className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-brand-900 hover:text-brand-600">
                <Phone className="size-4" aria-hidden />
                {phone}
              </a>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-xs md:max-w-sm">
            <SmartImage src={bagImage} alt="" fill sizes="(min-width: 768px) 30vw, 80vw" className="rotate-6 object-contain mix-blend-multiply" />
            <Sparkle className="absolute left-4 top-6 size-6" />
          </div>
        </div>
      </Container>
    </section>
  );
}
