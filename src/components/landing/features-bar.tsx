import { Container } from "@/components/shared/container";
import { SketchOutline } from "@/components/shared/sketch";
import type { SiteContent } from "@/lib/content/schema";
import { getIcon } from "@/lib/icons";

/** Commitments – icons inside a pen-drawn ring, no frame around the row (design.md §5.3). */
export function FeaturesBar({ features }: { features: SiteContent["features"] }) {
  if (!features.length) return null;
  return (
    <section aria-label="Cam kết của Kim Ngoan" className="bg-white py-14 md:py-16">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = getIcon(f.icon);
            return (
              <li key={i} className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="relative grid size-14 shrink-0 place-items-center text-brand-700">
                  <SketchOutline className="inset-0" strokeWidth={1.5} />
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold leading-snug text-brand-900">{f.title}</h3>
                  {f.description && <p className="mt-0.5 text-[13px] text-ink-muted">{f.description}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
