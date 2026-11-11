import { Container } from "@/components/shared/container";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/** Quiet title band for inner pages: breadcrumb, h1, lead. */
export function PageHero({ title, description, crumbs, children }: { title: string; description?: string; crumbs: Crumb[]; children?: React.ReactNode }) {
  return (
    <section className="bg-paper pb-12 pt-8 md:pb-16 md:pt-10">
      <Container>
        <Breadcrumbs items={crumbs} />
        <h1 className="display mt-8 max-w-3xl text-[2.25rem] md:text-[3.25rem]">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">{description}</p>}
        {children}
      </Container>
    </section>
  );
}
