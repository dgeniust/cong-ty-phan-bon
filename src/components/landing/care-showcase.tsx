import Link from "next/link";
import { Container } from "@/components/shared/container";
import { RoundStamp, Sparkle } from "@/components/shared/la-non";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import type { Product } from "@/lib/mock/types";

type Props = {
  bagImage: string;
  crops: SiteContent["crops"]["items"];
  product: Product;
};

/** Oval product centre-stage, crop photos around it, real usage guide on the right (design.md §5.4). */
export function CareShowcase({ bagImage, crops, product }: Props) {
  const [left, right] = [crops[1] ?? crops[0], crops[2] ?? crops[0]];
  return (
    <section aria-labelledby="cham-soc-title" className="bg-white py-20 md:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.1fr_0.9fr] lg:gap-10">
        <div className="flex flex-col gap-10">
          <h2 id="cham-soc-title" className="serif-title relative text-[2.25rem] text-brand-900 md:text-[2.75rem]">
            <span className="font-bold">Cây khoẻ,</span>
            <br />
            trái sai!
            <Sparkle className="absolute -top-3 left-24 size-5" />
          </h2>
          {left && (
            <figure className="max-w-[12rem]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-full bg-lime-tint">
                <SmartImage src={left.image} alt={left.name} fill sizes="192px" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-center text-[13px] text-ink-muted">
                {left.name}: {left.description.toLocaleLowerCase("vi")}
              </figcaption>
            </figure>
          )}
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[50%] bg-lime-tint">
            <SmartImage src={bagImage} alt="" fill sizes="(min-width: 1024px) 34vw, 80vw" className="object-contain p-10 mix-blend-multiply" />
          </div>
          <RoundStamp text="BÁN CHẠY • TIN DÙNG • " className="absolute right-2 top-6 size-20 md:size-24" />
        </div>

        <div>
          {right && (
            <div className="relative mb-8 size-36 overflow-hidden rounded-full bg-lime-tint md:size-44">
              <SmartImage src={right.image} alt={right.name} fill sizes="176px" className="object-cover" />
            </div>
          )}
          <h3 className="serif-title text-[1.75rem] text-brand-900">Hướng dẫn bón</h3>
          <p className="mt-2 text-[13px] font-medium text-brand-600">{product.name}</p>
          <ul className="mt-4 space-y-3">
            {product.usage.slice(0, 3).map((u, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink-muted">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
                {u}
              </li>
            ))}
          </ul>
          <Link
            href={`/san-pham/${product.slug}#huong-dan`}
            className="mt-6 inline-flex min-h-11 items-center text-[15px] font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
          >
            Xem đầy đủ cách dùng
          </Link>
        </div>
      </Container>
    </section>
  );
}
