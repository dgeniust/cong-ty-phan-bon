import { Container } from "@/components/shared/container";
import type { SiteContent } from "@/lib/content/schema";
import { getIcon } from "@/lib/icons";

/** Commitments (CMS `features`) – a quiet row under the hero. */
export function FeaturesBar({ features }: { features: SiteContent["features"] }) {
  if (!features.length) return null;
  return (
    <section aria-label="Cam kết của Kim Ngoan" className="bg-white pb-12">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = getIcon(f.icon);
            return (
              <li key={i} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-lime-tint text-brand-600">
                  <Icon className="size-[22px]" strokeWidth={1.75} aria-hidden />
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
