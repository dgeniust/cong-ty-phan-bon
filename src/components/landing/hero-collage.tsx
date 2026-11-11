import { OrganicImage } from "@/components/shared/sketch";

/** Granules "falling" from the bag to the plant – static, no animation. */
const GRANULES = [
  { x: 54, y: 44, s: 14, c: "bg-brand-500" },
  { x: 58, y: 49, s: 10, c: "bg-sun-300" },
  { x: 52, y: 53, s: 12, c: "bg-white ring-2 ring-brand-900/70" },
  { x: 57, y: 57, s: 16, c: "bg-brand-500" },
  { x: 53, y: 62, s: 9, c: "bg-sun-300" },
];

/**
 * Bag → granules → crop: the reference's teapot → petals → cup flow, retold for
 * fertiliser (design.md §5.2). Purely visual, hidden from assistive tech.
 */
export function HeroCollage({ bagImage, plantImage }: { bagImage: string; plantImage: string }) {
  return (
    <div aria-hidden className="relative mx-auto aspect-[5/6] w-full max-w-[560px] lg:mr-0">
      <OrganicImage
        src={bagImage}
        alt=""
        priority
        sizes="(min-width: 1024px) 26vw, 50vw"
        shape="pebble"
        rotate={-8}
        className="absolute right-[4%] top-[2%] aspect-square w-[54%]"
      />

      {/* pen trail the granules follow */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" className="absolute inset-0 size-full text-brand-900">
        <path
          vectorEffect="non-scaling-stroke"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="2 6"
          d="M62 40C50 46 64 50 55 55S50 62 56 66"
        />
      </svg>
      {GRANULES.map((g, i) => (
        <span
          key={i}
          className={`absolute rounded-full shadow-soft ${g.c}`}
          style={{ left: `${g.x}%`, top: `${g.y}%`, width: g.s, height: g.s }}
        />
      ))}

      <OrganicImage
        src={plantImage}
        alt=""
        sizes="(min-width: 1024px) 24vw, 46vw"
        shape="circle"
        rotate={4}
        outline="around"
        className="absolute bottom-[2%] left-[10%] aspect-square w-[50%]"
      />

      <span className="absolute left-[2%] top-[34%] -rotate-6 font-script text-2xl text-brand-800 md:text-[1.75rem]">bón đúng</span>
      <span className="absolute bottom-[10%] right-[4%] rotate-3 font-script text-2xl text-brand-800 md:text-[1.75rem]">cây khoẻ</span>
    </div>
  );
}
