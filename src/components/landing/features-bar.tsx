import { Container } from "@/components/shared/container";
import { LeafDecor } from "@/components/shared/leaf-decor";
import type { SiteContent } from "@/lib/content/schema";
import { getIcon } from "@/lib/icons";

export function FeaturesBar({ features }: { features: SiteContent["features"] }) {
  return (
    <section className="relative overflow-hidden bg-brand-50 py-8 md:py-10">
      <LeafDecor className="absolute -left-4 top-1/2 hidden w-20 -translate-y-1/2 text-brand-400/70 md:block" />
      <LeafDecor flip className="absolute -right-4 top-1/2 hidden w-20 -translate-y-1/2 text-brand-400/70 md:block" />
      <Container className="grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-brand-200">
        {features.map((f, i) => {
          const Icon = getIcon(f.icon);
          return (
            <div key={i} className="flex flex-col items-center px-4 text-center">
              <span className="grid size-16 place-items-center rounded-full bg-sun-300/70 text-brand-700 ring-4 ring-white">
                <Icon className="size-8" aria-hidden />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-brand-800 md:text-base">{f.title}</h3>
              <p className="mt-1 text-xs text-ink-muted md:text-sm">{f.description}</p>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
