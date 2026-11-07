import Link from "next/link";
import { CalendarDays, ChevronRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SmartImage } from "@/components/shared/smart-image";
import { formatDate } from "@/lib/format";
import { articleSections } from "@/lib/mock/articles";
import type { Article } from "@/lib/mock/types";
import { cn } from "@/lib/utils";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const href = `/${article.section}/${article.slug}`;
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift",
        featured && "md:col-span-2 lg:col-span-3 md:grid md:grid-cols-2"
      )}
    >
      <Link href={href} tabIndex={-1} className={cn("relative block aspect-16/10 overflow-hidden", featured && "md:aspect-auto md:min-h-80")}>
        <SmartImage
          src={article.cover}
          alt={article.title}
          fill
          sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <Badge variant="sun" className="absolute left-3 top-3">
          {articleSections[article.section].title}
        </Badge>
      </Link>
      <div className={cn("flex flex-1 flex-col p-5", featured && "md:justify-center md:p-8")}>
        <div className="flex items-center gap-4 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-3.5" aria-hidden /> {formatDate(article.date)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden /> {article.readingMinutes} phút đọc
          </span>
        </div>
        <h3 className={cn("mt-2 font-bold text-brand-800", featured ? "text-xl md:text-2xl" : "text-lg")}>
          <Link href={href} className="hover:text-brand-600">
            {article.title}
          </Link>
        </h3>
        <p className={cn("mt-2 text-sm leading-relaxed text-ink-muted", !featured && "line-clamp-3")}>{article.excerpt}</p>
        <Link href={href} className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand-600 hover:text-brand-700">
          Đọc tiếp <ChevronRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
