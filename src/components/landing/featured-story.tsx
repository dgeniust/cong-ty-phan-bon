import Link from "next/link";
import { Quote } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SmartImage } from "@/components/shared/smart-image";
import { formatDate } from "@/lib/format";
import type { Article } from "@/lib/mock/types";

function SideThumb({ article }: { article: Article }) {
  return (
    <Link href={`/${article.section}/${article.slug}`} className="group hidden w-36 flex-col gap-3 lg:flex">
      <span className="relative block aspect-[3/4] overflow-hidden rounded-2xl bg-lime-tint">
        <SmartImage src={article.cover} alt="" fill sizes="144px" className="object-cover opacity-80 transition-opacity group-hover:opacity-100" />
      </span>
      <span className="line-clamp-3 text-[13px] leading-snug text-ink-muted group-hover:text-brand-800">{article.title}</span>
    </Link>
  );
}

/**
 * Takes the place of the reference's client-feedback block: same layout, real
 * content (a featured how-to article) instead of invented reviews (design.md §5.7).
 */
export function FeaturedStory({ articles }: { articles: Article[] }) {
  const [main, a, b] = articles;
  if (!main) return null;
  const href = `/${main.section}/${main.slug}`;
  return (
    <section aria-labelledby="kien-thuc-title" className="bg-white pb-20 md:pb-28">
      <Container>
        <h2 id="kien-thuc-title" className="serif-title text-right text-[2.25rem] text-brand-900 md:text-[2.75rem]">
          <span className="font-bold">Kiến thức</span>
          <br />
          canh tác nổi bật
        </h2>

        <div className="mt-12 flex items-center justify-between gap-8">
          {a && <SideThumb article={a} />}

          <article className="grid flex-1 items-center gap-8 rounded-3xl bg-lime-tint p-4 md:grid-cols-[0.9fr_1.1fr] md:gap-10 md:p-6 lg:max-w-4xl">
            <Link href={href} tabIndex={-1} aria-hidden className="relative block aspect-[4/3] overflow-hidden rounded-2xl md:aspect-[4/5]">
              <SmartImage src={main.cover} alt="" fill sizes="(min-width: 768px) 36vw, 90vw" className="object-cover" />
            </Link>
            <div className="pb-4 md:pb-0 md:pr-6">
              <Quote className="size-9 fill-brand-500 text-brand-500" aria-hidden />
              <h3 className="serif-title mt-4 text-2xl text-brand-900">
                <Link href={href} className="hover:text-brand-600">
                  {main.title}
                </Link>
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{main.excerpt}</p>
              <p className="mt-5 text-[13px] text-ink-subtle">
                <span className="font-medium text-brand-800">{main.author}</span>
                <span className="mx-2" aria-hidden>
                  /
                </span>
                <time dateTime={main.date}>{formatDate(main.date)}</time>
              </p>
              <Link
                href={href}
                className="mt-6 inline-flex min-h-11 items-center text-[15px] font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
              >
                Đọc bài viết
              </Link>
            </div>
          </article>

          {b && <SideThumb article={b} />}
        </div>
      </Container>
    </section>
  );
}
