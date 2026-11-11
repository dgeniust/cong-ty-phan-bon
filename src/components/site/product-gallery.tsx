"use client";

import { useState } from "react";
import { SmartImage } from "@/components/shared/smart-image";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-surface">
        <SmartImage
          key={images[active]}
          src={images[active]}
          alt={images.length > 1 ? `${alt} – ảnh ${active + 1}` : alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover animate-in fade-in duration-300"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3" role="group" aria-label="Chọn ảnh sản phẩm">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Xem ảnh ${i + 1}`}
              aria-pressed={i === active}
              className={cn(
                "relative aspect-square overflow-hidden rounded-2xl bg-surface outline-none transition focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
                i === active ? "ring-2 ring-brand-700 ring-offset-2" : "opacity-60 hover:opacity-100"
              )}
            >
              <SmartImage src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
