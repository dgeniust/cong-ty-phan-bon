import { Container } from "@/components/shared/container";
import type { SiteContent } from "@/lib/content/schema";
import { getIcon } from "@/lib/icons";

/** Commitments strip – a raised panel that overlaps the bottom of the hero. */
export function FeaturesBar({ features }: { features: SiteContent["features"] }) {
  if (!features.length) return null;
  return (
    <section aria-label="Cam kết của Kim Ngoan" className="relative z-10">
      <Container>
        <ul className="-mt-14 grid grid-cols-2 gap-x-5 gap-y-7 rounded-3xl bg-white px-5 py-7 shadow-lift sm:grid-cols-2 md:-mt-16 md:px-10 md:py-10 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = getIcon(f.icon);
            return (
              <li key={i} className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold leading-snug text-brand-900 sm:text-base">{f.title}</h3>
                  {f.description && <p className="mt-1 text-sm leading-relaxed text-ink-muted">{f.description}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
