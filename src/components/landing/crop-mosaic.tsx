import Link from "next/link";
import { Container } from "@/components/shared/container";
import { SmartImage } from "@/components/shared/smart-image";
import type { SiteContent } from "@/lib/content/schema";
import { cropQuery } from "@/lib/text";
import { SerifHeading } from "./serif-heading";

const tile =
  "group relative block aspect-[4/3] overflow-hidden rounded-lg focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";

/** Photo mosaic of crops with one text tile in the grid (design.md §5.7). */
export function CropMosaic({ crops, phone }: { crops: SiteContent["crops"]; phone: string }) {
  const items = crops.items.slice(0, 5);
  const textAt = Math.min(4, items.length); // the text tile sits in row 2, like the reference

  const textTile = (
    <li key="text">
      <Link href="/lien-he" className={`${tile} grid place-items-center bg-brand-900 p-6 text-center`}>
        <span>
          <span className="block font-serif text-xl font-medium uppercase leading-snug tracking-[0.03em] text-white md:text-2xl">
            Chưa thấy cây
            <br />
            của bạn?
          </span>
          <span className="mt-3 block text-[13px] text-white/75">Hỏi kỹ thuật viên – {phone}</span>
        </span>
      </Link>
    </li>
  );

  return (
    <section id="cay-trong" aria-labelledby="cay-trong-title" className="bg-surface py-20 md:py-28">
      <Container>
        <SerifHeading id="cay-trong-title" title="Giải pháp theo cây trồng" subtitle={crops.subtitle} />
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
          {items.flatMap((c, i) => {
            const node = (
              <li key={c.name}>
                <Link href={`/tim-kiem?q=${encodeURIComponent(cropQuery(c.name))}`} className={tile}>
                  <SmartImage
                    src={c.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 30vw, 46vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/10 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-4">
                    <span className="block font-serif text-lg font-medium text-white md:text-xl">{c.name}</span>
                    {c.description && <span className="mt-0.5 block text-[12px] text-white/80 md:text-[13px]">{c.description}</span>}
                  </span>
                </Link>
              </li>
            );
            return i === textAt ? [textTile, node] : [node];
          })}
          {textAt >= items.length && textTile}
        </ul>
      </Container>
    </section>
  );
}
