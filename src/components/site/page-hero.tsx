import { Leaf } from "lucide-react";
import { Container } from "@/components/shared/container";
import { LeafDecor } from "@/components/shared/leaf-decor";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/** Banner for inner pages (design.md §12.2). */
export function PageHero({ title, description, crumbs }: { title: string; description?: string; crumbs: Crumb[] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sun-100 via-brand-50 to-brand-100 py-10 md:py-14">
      <LeafDecor className="absolute -left-4 top-2 hidden w-24 text-brand-400/50 md:block" />
      <LeafDecor flip className="absolute -right-4 bottom-0 hidden w-24 text-brand-400/50 md:block" />
      <Container className="relative">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-4 flex items-center gap-2 text-3xl font-extrabold uppercase tracking-tight text-brand-700 md:text-4xl">
          <Leaf className="size-7 fill-brand-400 text-brand-600" aria-hidden />
          {title}
        </h1>
        {description && <p className="mt-2 max-w-2xl text-ink-muted md:text-lg">{description}</p>}
      </Container>
    </section>
  );
}
