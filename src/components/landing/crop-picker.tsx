import Link from "next/link";
import { Container } from "@/components/shared/container";
import { OrganicImage } from "@/components/shared/sketch";
import type { SiteContent } from "@/lib/content/schema";
import { cropQuery } from "@/lib/text";
import { cn } from "@/lib/utils";

const TILT = [-4, 3, -2, 5, -3];

/** "Bạn trồng cây gì?" – cut-out circles laid loosely on paper (design.md §5.4). */
export function CropPicker({ crops }: { crops: SiteContent["crops"] }) {
  return (
    <section id="cay-trong" aria-labelledby="cay-trong-title" className="py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <h2 id="cay-trong-title" className="display text-[2rem] md:text-[2.75rem]">
            Bạn đang trồng cây gì?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
            Chọn loại cây để xem phân bón và thuốc phù hợp. {crops.subtitle}
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-10">
          {crops.items.map((c, i) => (
            <li key={c.name} className={cn(i % 2 === 1 && "lg:translate-y-10")}>
              <Link href={`/tim-kiem?q=${encodeURIComponent(cropQuery(c.name))}`} className="group block rounded-2xl text-center">
                <OrganicImage
                  src={c.image}
                  alt=""
                  sizes="(min-width: 1024px) 16vw, 40vw"
                  shape="circle"
                  rotate={TILT[i % TILT.length]}
                  outline={i % 2 ? "offset" : "around"}
                  className="mx-auto aspect-square w-[82%] transition-transform duration-300 group-hover:-translate-y-1"
                />
                <span className="mt-6 block text-lg font-medium text-brand-900 group-hover:text-brand-700">{c.name}</span>
                {c.description && <span className="mt-1 block text-[13px] text-ink-muted">{c.description}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
