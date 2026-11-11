import Link from "next/link";
import { SmartImage } from "@/components/shared/smart-image";
import { formatDate } from "@/lib/format";
import { articleSections } from "@/lib/mock/articles";
import type { Article } from "@/lib/mock/types";
import { cn } from "@/lib/utils";

export function ArticleCard({
  article,
  featured = false,
  headingLevel = "h3",
}: {
  article: Article;
  featured?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const href = `/${article.section}/${article.slug}`;
  return (
    <article
      className={cn(
        "group relative flex flex-col",
        featured && "md:col-span-2 lg:col-span-3 md:grid md:grid-cols-[1.2fr_1fr] md:items-center md:gap-12"
      )}
    >
      <div className={cn("relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface", featured && "md:aspect-[4/3]")}>
        <SmartImage
          src={article.cover}
          alt=""
          fill
          sizes={featured ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className={cn("flex flex-1 flex-col pt-5", featured && "md:pt-0")}>
        <p className="flex flex-wrap items-center gap-x-3 text-[13px] text-ink-subtle">
          <span className="font-medium text-brand-600">{articleSections[article.section].title}</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span>{article.readingMinutes} phút đọc</span>
        </p>
        <Heading
          className={cn(
            "mt-2 font-semibold leading-snug text-brand-900",
            featured ? "text-2xl md:text-[2rem] md:leading-tight" : "text-lg"
          )}
        >
          <Link
            href={href}
            className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] group-hover:text-brand-700 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand-500 focus-visible:after:ring-offset-4"
          >
            {article.title}
          </Link>
        </Heading>
        <p className={cn("mt-3 text-[15px] leading-relaxed text-ink-muted", featured ? "md:text-base" : "line-clamp-2")}>
          {article.excerpt}
        </p>
        {featured && <p className="mt-6 text-[15px] font-semibold text-brand-800 underline decoration-sun-400 underline-offset-[6px]">Đọc bài viết</p>}
      </div>
    </article>
  );
}
