import { Container } from "@/components/shared/container";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/** Quiet title band for inner pages: breadcrumb, h1, lead. */
export function PageHero({ title, description, crumbs, children }: { title: string; description?: string; crumbs: Crumb[]; children?: React.ReactNode }) {
  return (
    <section className="bg-surface pb-12 pt-8 md:pb-16 md:pt-10">
      <Container>
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-8 max-w-3xl text-[2.25rem] font-bold leading-[1.1] tracking-tight text-brand-900 md:text-5xl">{title}</h1>
        <span className="rule-sun" aria-hidden />
        {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">{description}</p>}
        {children}
      </Container>
    </section>
  );
}
