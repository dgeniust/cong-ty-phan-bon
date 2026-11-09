import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Phone, Quote, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/shared/container";
import { SmartImage } from "@/components/shared/smart-image";
import { SectionHeading } from "@/components/landing/section-heading";
import { getContent } from "@/lib/content/store";
import { formatDate } from "@/lib/format";
import { articleSections, getArticle, getArticles } from "@/lib/mock/articles";
import type { ArticleBlock, ArticleSection } from "@/lib/mock/types";
import { ArticleCard } from "./article-card";
import { Breadcrumbs } from "./breadcrumbs";
import { ShareButtons } from "./share-buttons";

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-8 text-xl font-bold text-brand-700 md:text-2xl">{block.text}</h2>;
    case "p":
      return <p className="mt-4 leading-relaxed text-ink">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-ink">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
              {it}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="relative mt-6 rounded-2xl bg-brand-50 px-6 py-5 pl-14">
          <Quote className="absolute left-5 top-5 size-6 text-brand-400" aria-hidden />
          <p className="font-script text-2xl leading-snug text-brand-800">{block.text}</p>
        </blockquote>
      );
    case "img":
      return (
        <figure className="mt-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <SmartImage src={block.src} alt={block.caption ?? ""} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
          </div>
          {block.caption && <figcaption className="mt-2 text-center text-sm italic text-ink-muted">{block.caption}</figcaption>}
        </figure>
      );
  }
}

export async function ArticleDetailPage({ section, slug }: { section: ArticleSection; slug: string }) {
  const article = getArticle(section, slug);
  if (!article) notFound();
  const { site } = await getContent();
  const meta = articleSections[section];
  const others = getArticles(section).filter((a) => a.slug !== slug);
  const latest = getArticles("tin-tuc").filter((a) => a.slug !== slug).slice(0, 4);

  return (
    <>
      <div className="border-b border-border/60 bg-brand-50 py-4">
        <Container>
          <Breadcrumbs items={[{ label: meta.title, href: `/${section}` }, { label: article.title }]} />
        </Container>
      </div>

      <Container className="grid gap-10 py-10 md:py-14 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0">
          <Badge variant="sun">{meta.title}</Badge>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-800 md:text-4xl">{article.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <UserRound className="size-4" aria-hidden /> {article.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" aria-hidden /> {formatDate(article.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden /> {article.readingMinutes} phút đọc
            </span>
          </div>

          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl shadow-soft">
            <SmartImage src={article.cover} alt={article.title} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
          </div>

          <p className="mt-6 text-lg font-medium leading-relaxed text-brand-800">{article.excerpt}</p>
          {article.content.map((b, i) => (
            <Block key={i} block={b} />
          ))}

          <Separator className="my-8" />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <Badge key={t} variant="outline">
                  <Link href={`/tim-kiem?q=${encodeURIComponent(t)}`}>#{t}</Link>
                </Badge>
              ))}
            </div>
            <ShareButtons title={article.title} />
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-border/70 bg-white p-5 shadow-soft">
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-700">Tin mới nhất</h2>
            <ul className="mt-4 space-y-4">
              {latest.map((a) => (
                <li key={a.slug}>
                  <Link href={`/${a.section}/${a.slug}`} className="group flex gap-3">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                      <SmartImage src={a.cover} alt="" fill sizes="64px" className="object-cover" />
                    </div>
                    <div>
                      <p className="line-clamp-2 text-sm font-semibold text-brand-800 group-hover:text-brand-600">{a.title}</p>
                      <p className="mt-1 text-xs text-ink-muted">{formatDate(a.date)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-brand-800 p-5 text-white shadow-soft">
            <p className="font-script text-2xl">Cần tư vấn kỹ thuật?</p>
            <p className="mt-1 text-sm text-white/80">Gọi ngay để được kỹ thuật viên hỗ trợ miễn phí.</p>
            <Button asChild variant="sun" className="mt-4 w-full">
              <a href={`tel:${site.phone}`}>
                <Phone className="fill-brand-700" /> {site.phone}
              </a>
            </Button>
          </div>
        </aside>
      </Container>

      {others.length > 0 && (
        <section className="bg-brand-50 py-14 md:py-20">
          <Container>
            <SectionHeading title="Bài viết liên quan" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.slice(0, 3).map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
