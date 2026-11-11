import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { SmartImage } from "@/components/shared/smart-image";
import { SectionHeading } from "@/components/landing/section-heading";
import { getContent } from "@/lib/content/store";
import { formatDate } from "@/lib/format";
import { articleSections, getArticle, getArticles } from "@/lib/mock/articles";
import type { ArticleBlock, ArticleSection } from "@/lib/mock/types";
import { absoluteUrl } from "@/lib/site";
import { ArticleCard } from "./article-card";
import { Breadcrumbs } from "./breadcrumbs";
import { ShareButtons } from "./share-buttons";

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-12 text-2xl font-bold leading-snug tracking-tight text-brand-900 md:text-[1.75rem]">{block.text}</h2>;
    case "p":
      return <p className="mt-5">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3.5">
              <span className="mt-[13px] size-1.5 shrink-0 rounded-full bg-sun-500" aria-hidden />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-10 rounded-2xl bg-surface px-7 py-6 md:px-9 md:py-8">
          <p className="font-script text-[1.75rem] leading-snug text-brand-800 md:text-[2rem]">{block.text}</p>
        </blockquote>
      );
    case "img":
      return (
        <figure className="my-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-surface">
            <SmartImage src={block.src} alt={block.caption ?? ""} fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
          </div>
          {block.caption && <figcaption className="mt-3 text-center text-sm text-ink-subtle">{block.caption}</figcaption>}
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
  const url = absoluteUrl(`/${section}/${slug}`);

  const structured = {
    "@context": "https://schema.org",
    "@type": section === "tin-tuc" ? "NewsArticle" : "Article",
    headline: article.title,
    description: article.excerpt,
    image: [absoluteUrl(article.cover)],
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: `${site.companyPrefix} ${site.companyName}`.trim(), url: absoluteUrl("/") },
    mainEntityOfPage: url,
    keywords: article.tags.join(", "),
    inLanguage: "vi-VN",
  };

  return (
    <>
      <JsonLd data={structured} />
      <article>
        <header className="bg-paper pb-20 pt-8 md:pb-28 md:pt-10">
          <Container className="max-w-6xl">
            <Breadcrumbs items={[{ label: meta.title, href: `/${section}` }, { label: article.title }]} />
            <div className="mt-10 max-w-3xl">
              <Link href={`/${section}`} className="text-sm font-medium text-brand-600 hover:text-brand-800">
                {meta.title}
              </Link>
              <h1 className="mt-3 text-[2rem] font-bold leading-[1.15] tracking-tight text-brand-900 md:text-[2.75rem]">{article.title}</h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted md:text-xl">{article.excerpt}</p>
              <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-subtle">
                <span className="font-medium text-ink-muted">{article.author}</span>
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                <span>{article.readingMinutes} phút đọc</span>
              </p>
            </div>
          </Container>
        </header>

        <Container className="max-w-6xl">
          <div className="relative -mt-12 aspect-[16/9] overflow-hidden rounded-3xl bg-surface md:-mt-16">
            <SmartImage src={article.cover} alt={article.title} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          </div>
        </Container>

        <Container className="grid gap-14 py-14 md:py-20 max-w-6xl lg:grid-cols-[1fr_300px] lg:gap-16">
          <div className="prose-kn min-w-0">
            {article.content.map((b, i) => (
              <Block key={i} block={b} />
            ))}

            <footer className="mt-14 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-surface px-5 py-4">
              {article.tags.length > 0 && (
                <ul className="flex flex-wrap gap-2" aria-label="Chủ đề">
                  {article.tags.map((t) => (
                    <li key={t}>
                      <Link
                        href={`/tim-kiem?q=${encodeURIComponent(t)}`}
                        className="inline-flex h-8 items-center rounded-full bg-white px-3.5 text-[13px] font-medium text-brand-800 transition-shadow hover:shadow-soft"
                      >
                        {t}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <ShareButtons title={article.title} />
            </footer>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start" aria-label="Thông tin thêm">
            <div className="rounded-3xl bg-brand-900 p-6 text-white">
              <p className="text-lg font-semibold">Cần kỹ thuật viên hỗ trợ?</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">Gọi để được tư vấn miễn phí cho vườn của bạn.</p>
              <Button asChild variant="sun" className="mt-5 w-full">
                <a href={`tel:${site.phone}`}>
                  <Phone /> {site.phone}
                </a>
              </Button>
            </div>

            {latest.length > 0 && (
              <div>
                <h2 className="text-base font-semibold text-brand-900">Bài viết mới</h2>
                <ul className="mt-5 space-y-5">
                  {latest.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/${a.section}/${a.slug}`} className="group flex gap-4">
                        <div className="relative size-[72px] shrink-0 overflow-hidden rounded-xl bg-surface">
                          <SmartImage src={a.cover} alt="" fill sizes="72px" className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="line-clamp-2 text-[15px] font-medium leading-snug text-brand-900 group-hover:text-brand-700">{a.title}</p>
                          <time dateTime={a.date} className="mt-1.5 block text-[13px] text-ink-subtle">
                            {formatDate(a.date)}
                          </time>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </Container>
      </article>

      {others.length > 0 && (
        <section aria-labelledby="lien-quan-title" className="bg-surface py-20 md:py-28">
          <Container>
            <SectionHeading id="lien-quan-title" title="Bài viết cùng chuyên mục" />
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
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
